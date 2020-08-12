// Copyright 2010 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// {{PRE_JSES}}

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = function(status, toThrow) {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_HAS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
// A web environment like Electron.js can have Node enabled, so we must
// distinguish between Node-enabled environments and Node environments per se.
// This will allow the former to do things like mount NODEFS.
// Extended check using process.versions fixes issue #8816.
// (Also makes redundant the original check that 'require' is a function.)
ENVIRONMENT_HAS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;



// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)




// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

if (ENVIRONMENT_IS_NODE) {
  scriptDirectory = __dirname + '/';

  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  var nodeFS;
  var nodePath;

  read_ = function shell_read(filename, binary) {
    var ret;
    ret = tryParseAsDataURI(filename);
    if (!ret) {
      if (!nodeFS) nodeFS = require('fs');
      if (!nodePath) nodePath = require('path');
      filename = nodePath['normalize'](filename);
      ret = nodeFS['readFileSync'](filename);
    }
    return binary ? ret : ret.toString();
  };

  readBinary = function readBinary(filename) {
    var ret = read_(filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };

  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
} else
if (ENVIRONMENT_IS_SHELL) {


  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      var data = tryParseAsDataURI(f);
      if (data) {
        return intArrayToString(data);
      }
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    var data;
    data = tryParseAsDataURI(f);
    if (data) {
      return data;
    }
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit === 'function') {
    quit_ = function(status) {
      quit(status);
    };
  }

  if (typeof print !== 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console === 'undefined') console = {};
    console.log = print;
    console.warn = console.error = typeof printErr !== 'undefined' ? printErr : print;
  }
} else
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }


  read_ = function shell_read(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
    } catch (err) {
      var data = tryParseAsDataURI(url);
      if (data) {
        return intArrayToString(data);
      }
      throw err;
    }
  };

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = function readBinary(url) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(xhr.response);
      } catch (err) {
        var data = tryParseAsDataURI(url);
        if (data) {
          return data;
        }
        throw err;
      }
    };
  }

  readAsync = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      var data = tryParseAsDataURI(url);
      if (data) {
        onload(data.buffer);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

  setWindowTitle = function(title) { document.title = title };
} else
{
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module['arguments']) arguments_ = Module['arguments'];
if (Module['thisProgram']) thisProgram = Module['thisProgram'];
if (Module['quit']) quit_ = Module['quit'];

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message

// TODO remove when SDL2 is fixed (also see above)



// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;


function dynamicAlloc(size) {
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  if (end > _emscripten_get_heap_size()) {
    abort();
  }
  HEAP32[DYNAMICTOP_PTR>>2] = end;
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

var asm2wasmImports = { // special asm2wasm imports
    "f64-rem": function(x, y) {
        return x % y;
    },
    "debugger": function() {
    }
};



var jsCallStartIndex = 1;
var functionPointers = new Array(0);

// Wraps a JS function as a wasm function with a given signature.
// In the future, we may get a WebAssembly.Function constructor. Until then,
// we create a wasm module that takes the JS function as an import with a given
// signature, and re-exports that as a wasm function.
function convertJsFunctionToWasm(func, sig) {

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    e: {
      f: func
    }
  });
  var wrappedFunc = instance.exports.f;
  return wrappedFunc;
}

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;
  var ret = table.length;

  // Grow the table
  try {
    table.grow(1);
  } catch (err) {
    if (!err instanceof RangeError) {
      throw err;
    }
    throw 'Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.';
  }

  // Insert new element
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!err instanceof TypeError) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction');
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  return ret;
}

function removeFunctionWasm(index) {
  // TODO(sbc): Look into implementing this to allow re-using of table slots
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {


  var base = 0;
  for (var i = base; i < base + 0; i++) {
    if (!functionPointers[i]) {
      functionPointers[i] = func;
      return jsCallStartIndex + i;
    }
  }
  throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';

}

function removeFunction(index) {

  functionPointers[index-jsCallStartIndex] = null;
}

var funcWrappers = {};

function getFuncWrapper(func, sig) {
  if (!func) return; // on null pointer, return undefined
  assert(sig);
  if (!funcWrappers[sig]) {
    funcWrappers[sig] = {};
  }
  var sigCache = funcWrappers[sig];
  if (!sigCache[func]) {
    // optimize away arguments usage in common cases
    if (sig.length === 1) {
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func);
      };
    } else if (sig.length === 2) {
      sigCache[func] = function dynCall_wrapper(arg) {
        return dynCall(sig, func, [arg]);
      };
    } else {
      // general case
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func, Array.prototype.slice.call(arguments));
      };
    }
  }
  return sigCache[func];
}


function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

function dynCall(sig, ptr, args) {
  if (args && args.length) {
    return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
  } else {
    return Module['dynCall_' + sig].call(null, ptr);
  }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};


var Runtime = {
};

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;




// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


var wasmBinary;if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
var noExitRuntime;if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];


if (typeof WebAssembly !== 'object') {
  err('no native wasm support detected');
}


// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @type {function(number, number, string, boolean=)} */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @type {function(number, string, boolean=)} */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}





// Wasm globals

var wasmMemory;

// In fastcomp asm.js, we don't need a wasm Table at all.
// In the wasm backend, we polyfill the WebAssembly object,
// so this creates a (non-native-wasm) table for us.
var wasmTable = new WebAssembly.Table({
  'initial': 508,
  'maximum': 508,
  'element': 'anyfunc'
});


//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
  argTypes = argTypes || [];
  // When the function takes numbers and returns a number, we can just return
  // the original function
  var numericArgs = argTypes.every(function(type){ return type === 'number'});
  var numericRet = returnType !== 'string';
  if (numericRet && numericArgs && !opts) {
    return getCFunc(ident);
  }
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}




/** @type {function(number, number=)} */
function Pointer_stringify(ptr, length) {
  abort("this function has been removed - you should use UTF8ToString(ptr, maxBytesToRead) instead!");
}

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}


// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = u8Array[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = u8Array[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = u8Array[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}


// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
function UTF16ToString(ptr) {
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  while (HEAP16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}




// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}


var STATIC_BASE = 1024,
    STACK_BASE = 29296,
    STACKTOP = STACK_BASE,
    STACK_MAX = 5272176,
    DYNAMIC_BASE = 5272176,
    DYNAMICTOP_PTR = 29088;




var TOTAL_STACK = 5242880;

var INITIAL_TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;







// In standalone mode, the wasm creates the memory, and the user can't provide it.
// In non-standalone/normal mode, we create the memory here.

// Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
// memory is created in the wasm, not in JS.)

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
    });
  }


if (wasmMemory) {
  buffer = wasmMemory.buffer;
}

// If the user provides an incorrect length, just use that length instead rather than providing the user to
// specifically provide the memory length with Module['TOTAL_MEMORY'].
INITIAL_TOTAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;










function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  runtimeExited = true;
}

function postRun() {

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}



var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what += '';
  out(what);
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  throw 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.';
}


var memoryInitializer = null;







// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return String.prototype.startsWith ?
      filename.startsWith(dataURIPrefix) :
      filename.indexOf(dataURIPrefix) === 0;
}




var wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAAByQM3YAJ/fwF/YAN/f38Bf2AFf39+f38AYAZ/f39/f38Bf2AGf3x/f39/AX9gAn9/AGADf35/AX5gBH9/f38AYAZ/f39/f38AYAV/f39/fwBgAABgA39/fwBgAX8Bf2AFf39/f38Bf2AFf39/f3wBf2AIf39/f39/f38Bf2ABfwBgBH9/f38Bf2AGf39/f398AX9gB39/f39/f38Bf2AFf39/f34Bf2AAAX9gAn9/AXxgAX8BfGADf31/AX1gA39/fwF8YAR/f39/AXxgBX9/f398AXxgBX9/f398AGAHf39/f39/fwBgBH9/f38BfmAEf39/fgF+YAJ/fgBgA35/fwF/YAJ+fwF/YAJ8fwF8YAV/f39/fwF8YAZ/f39/f38BfGACf38BfmACfHwBfGADfHx/AXxgAnx/AX9gA39/fgBgAXwBfGABfQF/YAp/f39/f39/f39/AX9gDH9/f39/f39/f39/fwF/YAN/f38BfWALf39/f39/f39/f38Bf2AKf39/f39/f39/fwBgD39/f39/f39/f39/f39/fwBgCH9/f39/f39/AGAHf398f39/fwF/YAd/f39/f398AX9gCX9/f39/f39/fwF/AsMGJANlbnYFYWJvcnQAEANlbnYZX19fY3hhX2FsbG9jYXRlX2V4Y2VwdGlvbgAMA2VudgxfX19jeGFfdGhyb3cACwNlbnYHX19fbG9jawAQA2VudgtfX19tYXBfZmlsZQAAA2Vudg1fX19zeXNjYWxsMTQwAAADZW52DV9fX3N5c2NhbGwxNDUAAANlbnYMX19fc3lzY2FsbDkxAAADZW52CV9fX3VubG9jawAQA2VudhBfX193YXNpX2ZkX2Nsb3NlAAwDZW52EF9fX3dhc2lfZmRfd3JpdGUAEQNlbnYWX19lbWJpbmRfcmVnaXN0ZXJfYm9vbAAJA2VudhdfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbAAFA2VudhdfX2VtYmluZF9yZWdpc3Rlcl9mbG9hdAALA2VudhpfX2VtYmluZF9yZWdpc3Rlcl9mdW5jdGlvbgAIA2VudhlfX2VtYmluZF9yZWdpc3Rlcl9pbnRlZ2VyAAkDZW52HV9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3AAsDZW52HF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcABQNlbnYdX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcACwNlbnYWX19lbWJpbmRfcmVnaXN0ZXJfdm9pZAAFA2VudgZfYWJvcnQACgNlbnYXX2Vtc2NyaXB0ZW5fYXNtX2NvbnN0X2kADANlbnYZX2Vtc2NyaXB0ZW5fZ2V0X2hlYXBfc2l6ZQAVA2VudhZfZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAEDZW52F19lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAwDZW52BV9leGl0ABADZW52B19nZXRlbnYADANlbnYSX2xsdm1fc3RhY2tyZXN0b3JlABADZW52D19sbHZtX3N0YWNrc2F2ZQAVA2Vudgtfc3RyZnRpbWVfbAANA2VudgtzZXRUZW1wUmV0MAAQA2VudgxfX3RhYmxlX2Jhc2UDfwAGZ2xvYmFsA05hTgN8AAZnbG9iYWwISW5maW5pdHkDfAADZW52Bm1lbW9yeQIAgAIDZW52BXRhYmxlAXAB/AP8AwONBosGDAoMFRAFBwULBwUFCwUFBQsBAwUFBQUQBwsHBwcHEAUQEAUFEQsLCwUNBQUFBwcFBQUFBQ0BBQsLCwsLCwsLCxAFBQMFEAUHCwoFBQUQEAIHDAAAEBAQEBAQBQAABQAFBRAQEAUMBQkQBQUFBQULBQUFCAULEBAFCwUHCwUFCwcFCwsHCQsWFxYJCwsLEBAMEAsICwsHBRAFGAwMBQwMDAwFGQUQBRAQEBALEAsJCxoWGwccBQUFBQgICAcIHQsHHAkJAxMFAAwBBhUBDAYeHyAfDAwMHgABEQQFAQ0LDAshIiIBCQAAAQwjAQwZJCUmIycjJwwFABARABUAEAsoJykREQwMDAEBAQEAKgENEREBBQUMDAEAGQwMDAsLKysrKysQEAEICQcBCwcACAkHEBAMEAEBAAAACAkHBwgJDAEMCgoKCgoKCgoKCgoKChAQEBAQEAoKCgoKDBUQEBAQEAUBAgcBDAwAAQsQEAEMAQsQEBAQEBAQEBAQEBAQEAUQEBAFEAUALAUKEBALCwUMAQAFAQAFDAwAAAUMDAAAEA0HAQsNBwELAwMDAwMDAwMDAwAQLRUBDBAQEA0JLhkHDRkNLw0LHg0RDRENHg0REwMDAwMDAwMDAwMtDQkuDQ0NAAsADQ0NDRMNDRQNFA4ODQ0BAREdBx0NDRQNFA4ODQMdHQwDAwMDAw8MDAwMDAwMCgoKCAgPCQkJCQkJBwgJCQkJBw0DAwMDAw8MDAwMDAwMCgoKCAgPCQkJCQkJBwgJCQkJBw0QEBMIEBMIDAUFBQwFExMwCzELCxMTMAsxEgMxMhIDMTIBCAgPDw0NDAEDAw8MDQ8PDQwNDBAQDw8NAQMDEBAQEBAAAQABABEBDRAQDAwFBQUQEAwMBQUFAREREQABAAEAEQENCgoFEBAQCwUQEAoKChUVEAUQEAULEAsHEAULCzMFBQsIAQUFCwALCwszBQkLBQwQAAAFDBUBAQEANAERDRIDNRMPNhAFCwcJCB0MBAABEQ4NEgMTDxQGChAFCwcJCAITDR0GEAJ/AUHw5AELfwFB8OTBAgsH4AUpEF9fZ3Jvd1dhc21NZW1vcnkAHxdfX1oyc1BQS2NQY1MwX1MwX1MxX1MxXwDiARpfX1pTdDE4dW5jYXVnaHRfZXhjZXB0aW9udgD5AhBfX19jeGFfY2FuX2NhdGNoAN4CFl9fX2N4YV9pc19wb2ludGVyX3R5cGUA3wIrX19fZW1iaW5kX3JlZ2lzdGVyX25hdGl2ZV9hbmRfYnVpbHRpbl90eXBlcwDgAhFfX19lcnJub19sb2NhdGlvbgDpAQ5fX19nZXRUeXBlTmFtZQD4AhhfZW1zY3JpcHRlbl9nZXRfc2Jya19wdHIA/AUFX2ZyZWUA9wUFX21haW4A5QEHX21hbGxvYwD2BQdfbWVtY3B5AP0FCF9tZW1tb3ZlAP4FB19tZW1zZXQA/wUKZHluQ2FsbF9paQCABg9keW5DYWxsX2lpZGlpaWkAgQYLZHluQ2FsbF9paWkAggYMZHluQ2FsbF9paWlpAIMGDWR5bkNhbGxfaWlpaWkAhAYOZHluQ2FsbF9paWlpaWQAhQYOZHluQ2FsbF9paWlpaWkAhgYPZHluQ2FsbF9paWlpaWlkAIcGD2R5bkNhbGxfaWlpaWlpaQCIBhBkeW5DYWxsX2lpaWlpaWlpAIkGEWR5bkNhbGxfaWlpaWlpaWlpAIoGDmR5bkNhbGxfaWlpaWlqAKcGDGR5bkNhbGxfamlqaQCoBglkeW5DYWxsX3YAiwYKZHluQ2FsbF92aQCMBgtkeW5DYWxsX3ZpaQCNBgxkeW5DYWxsX3ZpaWkAjgYNZHluQ2FsbF92aWlpaQCPBg5keW5DYWxsX3ZpaWlpaQCQBg9keW5DYWxsX3ZpaWlpaWkAkQYOZHluQ2FsbF92aWlqaWkAqQYTZXN0YWJsaXNoU3RhY2tTcGFjZQAkC2dsb2JhbEN0b3JzACAKc3RhY2tBbGxvYwAhDHN0YWNrUmVzdG9yZQAjCXN0YWNrU2F2ZQAiCfIHAQAjAAv8A5IG6wHrAXCFA+YB6wHQAoQD6wHrAYQDjAOtA60DtAO1A7kDugOhBKgEqQSqBKsErAStBK4EoQTJBMoEywTMBM0EzgTPBOsE6wTrAesE6wTrAe8E7wTrAe8E7wTrAesB6wGMBZYF6wGYBbAFsQW3BbgFkQWRBZEF6wHrAYwFkgaTBvgBlAZxcoYDhgOGA4YDrwOyA7YDuwOmBagFqgXABcIFxAWUBpQGlAaUBpQGlAaUBpQGlAaUBpQGlAaUBpQGlAaVBoADgwOHA+cB6gGJAsMC0gLTAoADiwONA64DsQPAA8QDhQWFBacFqQWsBbwFwQXDBcYFpwKVBpUGlQaVBpUGlgarBb0FvgW/BcUFlgaWBpcGjASNBJsEnASXBpcGlwaYBr4DwgOHBIgEigSOBJYElwSZBJ0EigWLBZUFlwWtBccFigWSBYoFnQWYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmQb9BIEFmQaaBsYDxwPIA8kDygPKA8sDzAPNA84DzwPuA+8D8APxA/ID8gPzA/QD9QP2A/cDogSjBKQEpQSmBMMExATFBMYExwT+BIIF4gGaBpoGmgaaBpoGmgaaBpoGmgaaBpoGmgaaBpoGmgaaBpoGmgaaBpoGmgaaBpoGmgaaBpoGmgaaBpsG5gTpBPEE8gT4BPkE4wGcBqcEyASIBYkFkwWUBZAFkAWbBZwFnAacBpwGnAacBp0GiQSLBJgEmgSdBp0GnQaeBugB7AGeBp8GoAZzdHV2d3iPA5ADkQOSA2xtlwOYA5kDmgObA5wDkwOUA5UDlgPFAcYBxwHIAcECwgLBAsECwgLOAs8CzwLCAsICwgL6AvwC/QL+AokDigOPA5ADkQOSA5MDlAOVA5YDigP+AooD/gLBAsICvQPBAsICwQLCAsECwgLBAsICwQLCAsECwgLBAsIC5ATlBOQE5QTBAsICwQLCAsECwgLBAsICwQLCAsECwgLBAsICwQLCAsEC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KAIAQQA6AAAgAkEANgIEIAIsAAtBAEgEQCACKAIAEPcFIAJBADYCCAsFIAJBADoAACACQQA6AAsLIAIgAykCADcCACACIAMoAgg2AgggACACKAIAIAIgAiwAC0EASBsQtwI2AhggAyAAQQxBBBDfBSAALAAnQQBIBEAgACgCHEEAOgAAIABBADYCICAALAAnQQBIBEAgACgCHBD3BSAAQQA2AiQLBSAAQQA6ABwgAEEAOgAnCyAAIAMpAgA3AhwgACADKAIINgIkIAAgASwAEDoAKCADIABBEUEDEN8FIAAsADdBAEgEQCAAKAIsQQA6AAAgAEEANgIwIAAsADdBAEgEQCAAKAIsEPcFIABBADYCNAsFIABBADoALCAAQQA6ADcLIAAgAykCADcCLCAAIAMoAgg2AjQgACABLAAVOgA4IAMgAEEWQQQQ3wUgAiwAC0EASARAIAIoAgBBADoAACACQQA2AgQgAiwAC0EASARAIAIoAgAQ9wUgAkEANgIICwUgAkEAOgAAIAJBADoACwsgAiADKQIANwIAIAIgAygCCDYCCCAAIAIoAgAgAiACLAALQQBIGxC3AjYCPCAAQUBrIAEsABo6AAAgAyAAQR5BCBDfBSACLAALQQBIBEAgAigCAEEAOgAAIAJBADYCBCACLAALQQBIBEAgAigCABD3BSACQQA2AggLBSACQQA6AAAgAkEAOgALCyACIAMpAgA3AgAgAiADKAIINgIIIAIoAgAgAiACLAALQQBIGyEBIAQgAEHgAGo2AgAgAUH7+wAgBBClAhogACAAKwNgOQNIIAQgAEEmQQgQ3wUgAiwAC0EASARAIAIoAgBBADoAACACQQA2AgQgAiwAC0EASARAIAIoAgAQ9wUgAkEANgIICwUgAkEAOgAAIAJBADoACwsgAiAEKQIANwIAIAIgBCgCCDYCCCACKAIAIAIgAiwAC0EASBshASAHIABB6ABqNgIAIAFB+/sAIAcQpQIaIAAgACsDaDkDUCAHIABBLkEIEN8FIAIsAAtBAEgEQCACKAIAQQA6AAAgAkEANgIEIAIsAAtBAEgEQCACKAIAEPcFIAJBADYCCAsFIAJBADoAACACQQA6AAsLIAIgBykCADcCACACIAcoAgg2AgggAigCACACIAIsAAtBAEgbIQEgBiAAQfAAajYCACABQfv7ACAGEKUC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IAAoAgAhASAAKAIEIQIgACAENgIAIAMgATYCBCAAIAk2AgQgAyACNgIIIAAoAgghAiAAIAMoAgw2AgggAyACNgIMIAMgATYCACADEIABIAMkAwuhAQEEfyAAKAIIIgEgACgCBCIERwRAA0AgACABQfB+aiIDNgIIIAFBnH9qIgIsAAtBAEgEQCACKAIAEPcFCyABQYx/aiICLAALQQBIBEAgAigCABD3BQsgAUH8fmoiASwAC0EASARAIAEoAgAQ9wULIAMsAAtBAEgEQCADKAIAEPcFCyAEIAAoAggiAUcNAAsLIAAoAgAiAEUEQA8LIAAQ9wULuE0BBn8jAyEBIwNBEGokAyAAQQA2AgwgAEEANgIQIAAgAEEMajYCCCAAQQA2AhggAEEANgIcIABBFGoiBSAAQRhqNgIAIABBADYCICAAQQA2AiQgAEEANgIoIABBADYCnAEgAEEANgKgASAAQQA2AqQBIABBADYCBCAAQQA6AAAgAEIANwIwIABCADcCOCAAQgA3AkAgAEIANwJMIABCADcCVCAAQgA3AlwgAEIANwJkIABCADcCbCAAQgA3AnQgAEIANwKAASAAQgA3AogBIABCADcCkAEgAUIANwIEIAFBAzoACyABQYb9AC4AADsAACABQYj9ACwAADoAAiABQQA6AAMgBSABQQxqIgYgARBUIgMoAgAiAkUEQEEgEN0CIgIgASkCADcCECACIAEoAgg2AhggAUIANwIAIAFBADYCCCACQQA6ABwgBigCACEEIAJBADYCACACQQA2AgQgAiAENgIIIAMgAjYCACAFKAIAKAIAIgQEfyAFIAQ2AgAgAygCAAUgAgshAyAAKAIYIAMQSSAAIAAoAhxBAWo2AhwLIAJBwQA6ABwgASwAC0EASARAIAEoAgAQ9wULIAFCADcCBCABQQM6AAsgAUGK/QAuAAA7AAAgAUGM/QAsAAA6AAIgAUEAOgADIAUgBiABEFQiAygCACICRQRAQSAQ3QIiAiABKQIANwIQIAIgASgCCDYCGCABQgA3AgAgAUEANgIIIAJBADoAHCAGKAIAIQQgAkEANgIAIAJBADYCBCACIAQ2AgggAyACNgIAIAUoAgAoAgAiBAR/IAUgBDYCACADKAIABSACCyEDIAAoAhggAxBJIAAgACgCHEEBajYCHAsgAkHSADoAHCABLAAL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AUEAOgADIAUgBiABEFQiAygCACICRQRAQSAQ3QIiAiABKQIANwIQIAIgASgCCDYCGCABQgA3AgAgAUEANgIIIAJBADoAHCAGKAIAIQYgAkEANgIAIAJBADYCBCACIAY2AgggAyACNgIAIAUoAgAoAgAiBgR/IAUgBjYCACADKAIABSACCyEDIAAoAhggAxBJIAAgACgCHEEBajYCHAsgAkEjOgAcIAEsAAtBAE4EQCAAQQA2AiwgAEEAOgB9IABBADoAfCAAQQA6AEggABCCASABJAMPCyABKAIAEPcFIABBADYCLCAAQQA6AH0gAEEAOgB8IABBADoASCAAEIIBIAEkAwvPWgEDfyMDIQEjA0EQaiQDIABBnAFqIQMgAUIANwIAIAFBADYCCCABQQQ6AAsgAUHj8oXzBjYCACABQQA6AAQgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEJOgALIAFBsv4AKQAANwAAIAFBuv4ALAAAOgAIIAFBADoACSAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUgAyABEIMBIAEsAAtBAEgEQCABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQU6AAsgAUG8/gAoAAA2AAAgAUHA/gAsAAA6AAQgAUEAOgAFIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBSADIAEQgwEgASwAC0EASARAIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBjoACyABQcL+ACgAADYAACABQcb+AC4AADsABCABQQA6AAYgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFBADYCCCABQQc6AAsgAUHJ/gAoAAA2AAAgAUHN/gAuAAA7AAQgAUHP/gAsAAA6AAYgAUEAOgAHIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBSADIAEQgwEgASwAC0EASARAIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBCToACyABQdH+ACkAADcAACABQdn+ACwAADoACCABQQA6AAkgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFCADcDACABQQA2AgggAUEIOgALIAFC98LJ64aumrfrADcDACABQQA6AAggACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcDACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEGOgALIAFB2/4AKAAANgAAIAFB3/4ALgAAOwAEIAFBADoABiAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUgAyABEIMBIAEsAAtBAEgEQCABKAIAEPcFCwsgAUIANwIEIAFBAzoACyABQeL+AC4AADsAACABQeT+ACwAADoAAiABQQA6AAMgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEEOgALIAFB8uqJywc2AgAgAUEAOgAEIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBSADIAEQgwEgASwAC0EASARAIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBDoACyABQfTKheMGNgIAIAFBADoABCAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUgAyABEIMBIAEsAAtBAEgEQCABKAIAEPcFCwsgAUEANgIIIAFBBzoACyABQeb+ACgAADYAACABQer+AC4AADsABCABQez+ACwAADoABiABQQA6AAcgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEGOgALIAFB7v4AKAAANgAAIAFB8v4ALgAAOwAEIAFBADoABiAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUgAyABEIMBIAEsAAtBAEgEQCABKAIAEPcFCwsgAUIANwMAIAFBADYCCCABQQg6AAsgAULwwrGrtqzesO4ANwMAIAFBADoACCAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwMAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUgAyABEIMBIAEsAAtBAEgEQCABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQQ6AAsgAUHkws3DBjYCACABQQA6AAQgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFCADcCBCABQQM6AAsgAUH1/gAuAAA7AAAgAUH3/gAsAAA6AAIgAUEAOgADIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBSADIAEQgwEgASwAC0EASARAIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBCToACyABQfn+ACkAADcAACABQYH/ACwAADoACCABQQA6AAkgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFIAMgARCDASABLAALQQBIBEAgASgCABD3BQsLIAFBADYCCCABQQc6AAsgAUGD/wAoAAA2AAAgAUGH/wAuAAA7AAQgAUGJ/wAsAAA6AAYgAUEAOgAHIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBSADIAEQgwEgASwAC0EASARAIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBCToACyABQYv/ACkAADcAACABQZP/ACwAADoACCABQQA6AAkgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQk6AAsgAUGV/wApAAA3AAAgAUGd/wAsAAA6AAggAUEAOgAJIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEEOgALIAFB7NK1qwY2AgAgAUEAOgAEIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcDACABQQA2AgggAUEIOgALIAFC7tLRk/ft2bLuADcDACABQQA6AAggACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcDACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQQ6AAsgAUHn5IXLBzYCACABQQA6AAQgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQk6AAsgAUGf/wApAAA3AAAgAUGn/wAsAAA6AAggAUEAOgAJIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFBADYCCCABQQc6AAsgAUGp/wAoAAA2AAAgAUGt/wAuAAA7AAQgAUGv/wAsAAA6AAYgAUEAOgAHIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFBCjoACyABQbH/ACkAADcAACABQbn/AC4AADsACCABQQA6AAogACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIEIAFBAzoACyABQbz/AC4AADsAACABQb7/ACwAADoAAiABQQA6AAMgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQY6AAsgAUHA/wAoAAA2AAAgAUHE/wAuAAA7AAQgAUEAOgAGIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEJOgALIAFBx/8AKQAANwAAIAFBz/8ALAAAOgAIIAFBADoACSAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBToACyABQdH/ACgAADYAACABQdX/ACwAADoABCABQQA6AAUgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQU6AAsgAUHX/wAoAAA2AAAgAUHb/wAsAAA6AAQgAUEAOgAFIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEJOgALIAFB3f8AKQAANwAAIAFB5f8ALAAAOgAIIAFBADoACSAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBDoACyABQfPCuaMGNgIAIAFBADoABCAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQQo6AAsgAUHn/wApAAA3AAAgAUHv/wAuAAA7AAggAUEAOgAKIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEJOgALIAFB8v8AKQAANwAAIAFB+v8ALAAAOgAIIAFBADoACSAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AwAgAUEANgIIIAFBCDoACyABQvTs/bqmrtmy7gA3AwAgAUEAOgAIIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AwAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFBCjoACyABQfz/ACkAADcAACABQYSAAS4AADsACCABQQA6AAogACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQY6AAsgAUGHgAEoAAA2AAAgAUGLgAEuAAA7AAQgAUEAOgAGIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFBEBDdAiICNgIAIAFBkICAgHg2AgggAUELNgIEIAJBjoABKQAANwAAIAJBloABLgAAOwAIIAJBmIABLAAAOgAKIAJBADoACyAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBToACyABQZqAASgAADYAACABQZ6AASwAADoABCABQQA6AAUgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwMAIAFBADYCCCABQQg6AAsgAULkypWDp4zbuuUANwMAIAFBADoACCAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwMAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgQgAUEDOgALIAFBoIABLgAAOwAAIAFBooABLAAAOgACIAFBADoAAyAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBToACyABQaSAASgAADYAACABQaiAASwAADoABCABQQA6AAUgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEANgIIIAFBBzoACyABQaqAASgAADYAACABQa6AAS4AADsABCABQbCAASwAADoABiABQQA6AAcgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEQEN0CIgI2AgAgAUGQgICAeDYCCCABQQw2AgQgAkGygAEpAAA3AAAgAkG6gAEoAAA2AAggAkEAOgAMIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEEOgALIAFB8NK52wY2AgAgAUEAOgAEIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcDACABQQA2AgggAUEIOgALIAFC6PKRk/ft2bLuADcDACABQQA6AAggACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcDACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQk6AAsgAUG/gAEpAAA3AAAgAUHHgAEsAAA6AAggAUEAOgAJIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcDACABQQA2AgggAUEIOgALIAFC5MqVg8eu2bDsADcDACABQQA6AAggACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcDACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEQEN0CIgI2AgAgAUGQgICAeDYCCCABQQw2AgQgAkHJgAEpAAA3AAAgAkHRgAEoAAA2AAggAkEAOgAMIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEGOgALIAFB1oABKAAANgAAIAFB2oABLgAAOwAEIAFBADoABiAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgQgAUEDOgALIAFB3YABLgAAOwAAIAFB34ABLAAAOgACIAFBADoAAyAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBjoACyABQeGAASgAADYAACABQeWAAS4AADsABCABQQA6AAYgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEKOgALIAFB6IABKQAANwAAIAFB8IABLgAAOwAIIAFBADoACiAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQQo6AAsgAUHzgAEpAAA3AAAgAUH7gAEuAAA7AAggAUEAOgAKIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEEOgALIAFB5+SVywc2AgAgAUEAOgAEIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFBCjoACyABQfz/ACkAADcAACABQYSAAS4AADsACCABQQA6AAogACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQY6AAsgAUH+gAEoAAA2AAAgAUGCgQEuAAA7AAQgAUEAOgAGIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEEOgALIAFB4tjVqwY2AgAgAUEAOgAEIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCBCABQQM6AAsgAUGFgQEuAAA7AAAgAUGHgQEsAAA6AAIgAUEAOgADIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCBCABQQM6AAsgAUGJgQEuAAA7AAAgAUGLgQEsAAA6AAIgAUEAOgADIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEJOgALIAFBjYEBKQAANwAAIAFBlYEBLAAAOgAIIAFBADoACSAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBjoACyABQZeBASgAADYAACABQZuBAS4AADsABCABQQA6AAYgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIEIAFBAzoACyABQZ6BAS4AADsAACABQaCBASwAADoAAiABQQA6AAMgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEKOgALIAFBooEBKQAANwAAIAFBqoEBLgAAOwAIIAFBADoACiAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBjoACyABQa2BASgAADYAACABQbGBAS4AADsABCABQQA6AAYgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQk6AAsgAUG0gQEpAAA3AAAgAUG8gQEsAAA6AAggAUEAOgAJIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFBEBDdAiICNgIAIAFBkICAgHg2AgggAUEMNgIEIAJBvoEBKQAANwAAIAJBxoEBKAAANgAIIAJBADoADCAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBToACyABQcuBASgAADYAACABQc+BASwAADoABCABQQA6AAUgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEQEN0CIgI2AgAgAUGQgICAeDYCCCABQQw2AgQgAkHRgQEpAAA3AAAgAkHZgQEoAAA2AAggAkEAOgAMIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCACABQQA2AgggAUEFOgALIAFB3oEBKAAANgAAIAFB4oEBLAAAOgAEIAFBADoABSAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBCToACyABQeSBASkAADcAACABQeyBASwAADoACCABQQA6AAkgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEKOgALIAFB7oEBKQAANwAAIAFB9oEBLgAAOwAIIAFBADoACiAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgQgAUEDOgALIAFB+YEBLgAAOwAAIAFB+4EBLAAAOgACIAFBADoAAyAAKAKgASICIAAoAqQBSQRAIAIgASkCADcCACACIAEoAgg2AgggAUIANwIAIAFBADYCCCAAIAAoAqABQQxqNgKgAQUCQCADIAEQgwEgASwAC0EATg0AIAEoAgAQ9wULCyABQgA3AgAgAUEANgIIIAFBBjoACyABQf2BASgAADYAACABQYGCAS4AADsABCABQQA6AAYgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIAIAFBADYCCCABQQY6AAsgAUGEggEoAAA2AAAgAUGIggEuAAA7AAQgAUEAOgAGIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcDACABQQA2AgggAUEIOgALIAFC8+Cxy8aO3LLhADcDACABQQA6AAggACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcDACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUIANwIEIAFBAzoACyABQYuCAS4AADsAACABQY2CASwAADoAAiABQQA6AAMgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEFAkAgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFCwsgAUEQEN0CIgI2AgAgAUGQgICAeDYCCCABQQs2AgQgAkGPggEpAAA3AAAgAkGXggEuAAA7AAggAkGZggEsAAA6AAogAkEAOgALIAAoAqABIgIgACgCpAFJBEAgAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAAgACgCoAFBDGo2AqABBQJAIAMgARCDASABLAALQQBODQAgASgCABD3BQsLIAFCADcCBCABQQM6AAsgAUGbggEuAAA7AAAgAUGdggEsAAA6AAIgAUEAOgADAkAgACgCoAEiAiAAKAKkAUkEQCACIAEpAgA3AgAgAiABKAIINgIIIAFCADcCACABQQA2AgggACAAKAKgAUEMajYCoAEMAQsgAyABEIMBIAEsAAtBAE4NACABKAIAEPcFIAAgACgCoAEgAygCAGtBDG02ApgBIAEkAw8LIAAgACgCoAEgAygCAGtBDG02ApgBIAEkAwvuAgEFfyAAKAIEIAAoAgAiAmtBDG0iBkEBaiIDQdWq1aoBSwRAEBQLIAMgACgCCCACa0EMbSICQQF0IgUgBSADSRtB1arVqgEgAkGq1arVAEkbIgMEQCADQdWq1aoBSwRAQQgQASICENoFIAJBlOEANgIAIAJBwM0AQSAQAgUgA0EMbBDdAiEECwsgA0EMbCAEaiEFIAZBDGwgBGoiAiABKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAJBDGohBCAAKAIEIgEgACgCACIDRgR/IAMiAQUDQCACQXRqIgIgAUF0aiIBKQIANwIAIAIgASgCCDYCCCABQgA3AgAgAUEANgIIIAEgA0cNAAsgACgCACEBIAAoAgQLIQMgACACNgIAIAAgBDYCBCAAIAU2AgggASADRwRAIAMhAANAIABBdGoiACwAC0EASARAIAAoAgAQ9wULIAAgAUcNAAsLIAFFBEAPCyABEPcFC5UCAQV/IwMhBCMDQRBqJANB+MQBLAAARQRAQfjEASwAAEEAR0EBcwRAQfjEAUEANgIAQfjEAUH4xAEoAgBBAXI2AgALCyAEIgFCADcCACABQQA2AghB/NoBEJMCIgJBb0sEQBAUCwJAAkAgAkELSQR/IAEgAjoACyACBH8gASEDDAIFIAELBSABIAJBEGpBcHEiBRDdAiIDNgIAIAEgBUGAgICAeHI2AgggASACNgIEDAELIQMMAQsgA0H82gEgAhD9BRoLIAIgA2pBADoAAEGkygEgAEEIaiABEH0iAzYCACABLAALQQBOBEAgBCQDIABBDGogA0cPCyABKAIAEPcFQaTKASgCACAAQQxqRyEAIAQkAyAAC8UEAQp/IAAoAgQiAyAAKAIAIgprQQxtIgRBAWoiBUHVqtWqAUsEQBAUCyAFIAAoAgggCmtBDG0iBkEBdCICIAIgBUkbQdWq1aoBIAZBqtWq1QBJGyIHBEAgB0HVqtWqAUsEQEEIEAEiAhDaBSACQZThADYCACACQcDNAEEgEAIFIAdBDGwQ3QIhCwsLIARBDGwgC2oiAkEANgIAIARBDGwgC2oiCEEANgIEIARBDGwgC2oiBUEANgIIIAEoAgQgASgCACIGayIJQQN1IQEgCQRAIAFB/////wFLBEAQFAsgCCAJEN0CIgQ2AgQgAiAENgIAIAUgAUEDdCAEajYCCCAJQQBKBEAgCUEDdkEDdCAEaiEBIAQgBiAJEP0FGiAIIAE2AgQLCyAHQQxsIAtqIQcgAkEMaiEIIAMgCkYEfyAAIAI2AgAgACAINgIEIAAgBzYCCCAKBSACIQEDQCABQXRqIgZBADYCACABQXhqIgVBADYCACABQXxqIgFBADYCACAGIANBdGoiAigCADYCACAFIANBeGoiBSgCADYCACABIANBfGoiASgCADYCACABQQA2AgAgBUEANgIAIAJBADYCACACIApHBEAgBiEBIAIhAwwBCwsgACgCACEDIAAoAgQhASAAIAY2AgAgACAINgIEIAAgBzYCCCABIANGBH8gAwUgASEAA38gAEF0aiIBKAIAIgIEQCAAQXhqIAI2AgAgAhD3BQsgASADRgR/IAMFIAEhAAwBCwsLCyIARQRADwsgABD3BQvyBgEPfyMDIQYjA0HQAWokAyAGQcgBaiEOIAZBqAFqIQcgBkGcAWohCiAGQZABaiEIIAZBuAFqIgxCADcCACAMQQA2AgggDEECOgALIAxBw4IBOwEAIAxBADoAAiAGQbQBaiILQQA2AgACQCAAKAIERQ0AIAZByABqIREgBkHQAGohDyAGQdgAaiEQAkADQCAGIAAoAiAgBUHQAGxqIAwQehBSIAYsAIgBRQRAIAdBADYCACAHQQA2AgQgB0EANgIIIAcgERB5IAcoAggiCSAHKAIEIgVGBEAgByAPEHkgBygCBCEFIAcoAgghCQUgBSAPKwMAOQMAIAcgBUEIaiIFNgIECyAFIAlGBEAgByAQEHkFIAUgECsDADkDACAHIAVBCGo2AgQLIAEoAgQiBSABKAIIRgRAIAEgBxCFAQUgBUEANgIAIAVBADYCBCAFQQA2AgggBygCBCAHKAIAayIJQQN1IQ0gCQRAIA1B/////wFLDQQgBSAJEN0CIgk2AgQgBSAJNgIAIAUgDUEDdCAJajYCCCAHKAIEIAcoAgAiEmsiDUEASgRAIA1BA3ZBA3QgCWohEyAJIBIgDRD9BRogBSATNgIECwsgASABKAIEQQxqNgIECyACIAAoAiAgCygCAEHQAGxqLAAIEOoFIAAsAAAhBSAIIAAoAiAgCygCAEHQAGxqEHwgBiAIKAIAIAggCCwAC0EASBs2AsQBIA4gBigCxAE2AgAgCCAOIAUQ7AUgCiAIKQIANwIAIAogCCgCCDYCCCAIQgA3AgAgCEEANgIIIAMoAgQiBSADKAIISQRAIAUgCikCADcCACAFIAooAgg2AgggCkIANwIAIApBADYCCCADIAMoAgRBDGo2AgQFIAMgChCDASAKLAALQQBIBEAgCigCABD3BQsLIAgsAAtBAEgEQCAIKAIAEPcFCyAEKAIEIgUgBCgCCEYEQCAEIAsQLAUgBSALKAIANgIAIAQgBUEEajYCBAsgBygCACIFBEAgByAFNgIEIAUQ9wULCyAGLAA3QQBIBEAgBigCLBD3BQsgBiwAJ0EASARAIAYoAhwQ9wULIAYsABdBAEgEQCAGKAIMEPcFCyAGLAALQQBIBEAgBigCABD3BQsgCyALKAIAQQFqIgU2AgAgBSAAKAIESQ0ACwwBCxAUDwsgBiQDC+kEAhB/A3wjAyEHIwNBIGokAyAHQRBqIQ0gB0EIaiEOIAAoAgQhAiACRQRAIAckAw8LIAAoAiAhBANAIAZB0ABsIARqIQUgBUGfggEQeyEKIAVBooIBEHshCCAFQaaCARB7IQkgBkUiAQR/QQAFIAZBf2ohBSAFQdAAbCAEaiEFIAVBpoIBEHsLIQ8gAkF/aiEQIAYgEEkhAiAGQQFqIQUgBUHQAGwgBGohAyACBEAgA0GqggEQeyEEIANBooIBEHshAiADQaaCARB7GgVBACECQQAhBAsgByMCOQMAIA4jAjkDACANIwI5AwAgAQRAIApBAEchASAIQQBHIQsgASALcSEBIAlBAEchDCABIAxxIQEgBEEARyEDIAEgA3EEQCAKIAggCSAEIA4QowELIAsgDHEhASABIANxIQMgAkEARyEBIAEgA3EEQCAIIAkgBCACIAcQowELBQJAIAlBAEciCyAIQQBHIgwgCkEARyIBIA9BAEdxcXEhAyAGIBBGBEAgA0UNASAPIAogCCAJIA0QowEMAQsgAwRAIA8gCiAIIAkgDRCjAQsgASAMcSEBIAEgC3EhASAEQQBHIQMgASADcQRAIAogCCAJIAQgDhCjAQsgCyAMcSEBIAEgA3EhAyACQQBHIQEgASADcQRAIAggCSAEIAIgBxCjAQsLCyAAKAIgIQQgDSsDACERIA4rAwAhEiAHKwMAIRMgBkHQAGwgBGohAiACIBE5AyggBkHQAGwgBGohAiACIBI5AzAgBkHQAGwgBGohAiACIBM5AzggACgCBCECIAUgAkkEQCAFIQYMAQsLIAckAwvkCQEHfyMDIQMjA0HwAGokA0GAxQEsAABFBEBBgMUBLAAAQQBHQQFzBEBBgMUBQQA2AgBBgMUBQYDFASgCAEEBcjYCAAsLIANB4ABqIQYgA0HQAGohBUHx2gEgARCwAkH32gFBADoAAEH42gEgASwAESICQd8AcSACIAJBn39qQRpJGzoAAEH52gEgASwAEiICQd8AcSACIAJBn39qQRpJGzoAAEH62gEgASwAEyICQd8AcSACIAJBn39qQRpJGzoAAEH72gFBADoAAAJAQfHaAUGuggEQ9QEEQEHx2gFBtYIBEPUBDQFB+NoBQc79ABD1AQ0BC0H82gEgASwAFjoAAEH92gEgASwAFzoAAEH+2gEgASwAGDoAAEH/2gEgASwAGToAAEGA2wEgASwAGjoAAEGB2wFBADoAACAGQgA3AgAgBkEANgIIQfjaARCTAiIEQW9LBEAQFAsCQAJAIARBC0kEfyAGIAQ6AAsgBAR/IAYhAgwCBSAGCwUgBiAEQRBqQXBxIggQ3QIiAjYCACAGIAhBgICAgHhyNgIIIAYgBDYCBAwBCyECDAELIAJB+NoBIAQQ/QUaCyACIARqQQA6AABBqMoBIABBFGogBhB9IgI2AgAgAEEYaiACRgR/QYjOAUG8ggFBCxAwGiADQYjOASAGKAIAIAYgBiwACyICQQBIIgQbIAYoAgQgAkH/AXEgBBsQMCICIAIoAgBBdGooAgBqKAIcIgQ2AgAgBCAEKAIEQQFqNgIEIANByNMBENADIgRBCiAEKAIAKAIcQR9xQcIAahEAACEEIAMQ0QMgAiAEEKYDIAIQoANBqMoBKAIABSACCywAHCEIIAAoAgQhAiAAEIQBIQQgAkF/aiECIARFBEAgBUIANwIAIAVBADYCCEH82gEQkwIiBEFvSwRAEBQLAkACQCAEQQtJBH8gBSAEOgALIAQEfyAFIQIMAgUgBQsFIAUgBEEQakFwcSIHEN0CIgI2AgAgBSAHQYCAgIB4cjYCCCAFIAQ2AgQMAQshAgwBCyACQfzaASAEEP0FGgsgAiAEakEAOgAAIAUgACgCBDYCDCAAQQhqIAMgBRBUIgQoAgBFBEBBIBDdAiICIAUpAgA3AhAgAiAFKAIINgIYIAVCADcCACAFQQA2AgggAiAFKAIMNgIcIAMoAgAhByACQQA2AgAgAkEANgIEIAIgBzYCCCAEIAI2AgAgACgCCCgCACIHBEAgACAHNgIIIAQoAgAhAgsgACgCDCACEEkgACAAKAIQQQFqNgIQCyAFLAALQQBIBEAgBSgCABD3BQsgACAAKAIEQQFqNgIEIANBADYCECADQQA2AhQgAyADQRBqNgIMIANBADYCGCADQQA2AhwgA0EANgIgIANBADYCACADQS06AEggA0EAOgBJIAMjAjkDOCADIwI5AzAgAyMCOQMoIANBfzYCRCADQUBrQX82AgAgAEEgaiECIAAoAiQiBSAAKAIoRgRAIAIgAxCJAQUgBSADEFEgACAAKAIkQdAAajYCJAsgAigCACIFIAAoAgRBf2oiAkHQAGxqQQRqEJsCIAJB0ABsIAVqIAg6AAggA0EYahBAIANBDGogAygCEBBBCyAAKAIgIAJB0ABsaiABEH4gBiwAC0EASARAIAYoAgAQ9wULIAMkAw8LIAMkAwuCBQEMfyAAKAIEIAAoAgAiA2tB0ABtIghBAWoiAkGz5swZSwRAEBQLIAIgACgCCCADa0HQAG0iA0EBdCIEIAQgAkkbQbPmzBkgA0GZs+YMSRsiAgRAIAJBs+bMGUsEQEEIEAEiAxDaBSADQZThADYCACADQcDNAEEgEAIFIAJB0ABsEN0CIQULCyACQdAAbCAFaiEJIAhB0ABsIAVqIgIgARBRIAJB0ABqIQogACgCACIIIAAoAgQiA0YEfyAIIgEFIAIhASADIQIDQCABQbB/aiIDIAJBsH9qIgUpAwA3AwAgAyAFLAAIOgAIIAFBvH9qIgYgAkG8f2oiBygCADYCACABQUBqIAJBQGooAgAiCzYCACABQURqIAJBRGoiDCgCACINNgIAIAFBQGohBCANBEAgCyAENgIIIAcgAkFAaiIENgIAIARBADYCACAMQQA2AgAFIAYgBDYCAAsgAUFIaiIEQQA2AgAgAUFMaiIGQQA2AgAgAUFQaiIHQQA2AgAgBCACQUhqIgQoAgA2AgAgBiACQUxqIgYoAgA2AgAgByACQVBqIgcoAgA2AgAgB0EANgIAIAZBADYCACAEQQA2AgAgAUFYaiIBIAJBWGoiAikDADcDACABIAIpAwg3AwggASACKQMQNwMQIAEgAikDGDcDGCABIAIuASA7ASAgBSAIRwRAIAMhASAFIQIMAQsLIAMhAiAAKAIAIQEgACgCBAshAyAAIAI2AgAgACAKNgIEIAAgCTYCCCABIgIgA0cEQCADIQADQCAAQbB/aiEBIABBSGoQQCAAQbx/aiAAQUBqKAIAEEEgASACRwRAIAEhAAwBCwsLIAJFBEAPCyACEPcFC4IFAQh/IwMhByMDQbABaiQDQYLbASABELACQYjbAUEAOgAAQYLbAUGuggEQ9QEEQEGC2wFBtYIBEPUBBEAgByQDDwsLQYnbASABLAAVIgg6AABBiMUBLAAARQRAQYjFASwAAEEAR0EBcwRAQYjFAUEANgIAQYjFAUGIxQEoAgBBAXI2AgALCwJAAn8CQCAAQQxqIgIoAgAiBUUiBARAQazKASACNgIAIABBCGohCEGJ2wEsAAAhCSAAKAIAIQYMAQUCQCACIQMgBSEGA0AgAyAGIAYsABAgCEgiCRshAyAGQQRqIAYgCRsoAgAiBg0ACyACIANHBEAgAywAECAITARAQazKASADNgIAIAAhBQwCCwtBrMoBIAI2AgAgAEEIaiEIQYnbASwAACEJIAAoAgAhBiAEDQIgBSEDIABBDGohAgJAAkADQAJAIAkgAywAECIFSAR/IAMoAgAiAkUNASADBSAFIAlODQQgA0EEaiIEKAIAIgJFDQMgBAshBSACIQMgBSECDAELCyADIQIgAAwFCyAEIQIgAAwECyAADAMLCwwCCyACIQMgAAsiBSACKAIABH8gBgVBGBDdAiIEIAk6ABAgBCAGNgIUIARBADYCACAEQQA2AgQgBCADNgIIIAIgBDYCACAIKAIAKAIAIgMEQCAIIAM2AgAgAigCACEECyAAKAIMIAQQSSAAIAAoAhBBAWo2AhAgBSgCAAtBAWo2AgAgBxCBASAHQYnbASwAADoAACAAKAIYIgIgACgCHEYEQCAAQRRqIAcQiwEFIAIgBxBLIAAgACgCGEGoAWo2AhgLIAcQPQsgACgCFCAFKAIAQX9qQagBbGogARCIASAHJAMLyQIBBX8gACgCBCAAKAIAIgNrQagBbSIGQQFqIgRB4bCYDEsEQBAUCyAEIAAoAgggA2tBqAFtIgJBAXQiAyADIARJG0HhsJgMIAJBsJiMBkkbIgIEQCACQeGwmAxLBEBBCBABIgMQ2gUgA0GU4QA2AgAgA0HAzQBBIBACBSACQagBbBDdAiEFCwsgAkGoAWwgBWohBCAGQagBbCAFaiICIAEQSyACQagBaiEFIAAoAgAiBiAAKAIEIgNGBH8gACACNgIAIAAgBTYCBCAAIAQ2AgggBgUgAiEBA0AgAUHYfmoiASADQdh+aiIDEIwBIAMgBkcNAAsgACgCACECIAAoAgQhAyAAIAE2AgAgACAFNgIEIAAgBDYCCCACIANGBH8gAgUgAyEAA38gAEHYfmoiABA9IAAgAkcNACACCwsLIgBFBEAPCyAAEPcFC5QJAgN/AX4gASkCACEFIAAgBTcCACABKAIIIQIgACACNgIIIAEoAgwhAiAAIAI2AgwgASgCECEDIAAgAzYCECADRSEEIABBDGohAyAEBEAgACADNgIIBSACIAM2AgggAUEMaiECIAEgAjYCCCABQQA2AgwgAUEANgIQCyABKAIUIQIgACACNgIUIAEoAhghAiAAIAI2AhggASgCHCEDIAAgAzYCHCADRSEEIABBGGohAyAEBEAgACADNgIUBSACIAM2AgggAUEYaiECIAEgAjYCFCABQQA2AhggAUEANgIcCyAAQQA2AiAgAEEANgIkIABBADYCKCABKAIgIQIgACACNgIgIAEoAiQhAiAAIAI2AiQgASgCKCECIAAgAjYCKCABQQA2AiggAUEANgIkIAFBADYCICABKAIsIQIgACACNgIsIABBADYCMCAAQQA2AjQgAEEANgI4IAEoAjAhAiAAIAI2AjAgASgCNCECIAAgAjYCNCABKAI4IQIgACACNgI4IAFBADYCOCABQQA2AjQgAUEANgIwIABBADYCPCAAQUBrIQIgAkEANgIAIABBADYCRCABKAI8IQMgACADNgI8IAFBQGshAyADKAIAIQQgAiAENgIAIAEoAkQhAiAAIAI2AkQgAUEANgJEIANBADYCACABQQA2AjwgASwASCECIAAgAjoASCAAQQA2AkwgAEEANgJQIABBADYCVCABKAJMIQIgACACNgJMIAEoAlAhAiAAIAI2AlAgASgCVCECIAAgAjYCVCABQQA2AlQgAUEANgJQIAFBADYCTCAAQQA2AlggAEEANgJcIABBADYCYCABKAJYIQIgACACNgJYIAEoAlwhAiAAIAI2AlwgASgCYCECIAAgAjYCYCABQQA2AmAgAUEANgJcIAFBADYCWCAAQQA2AmQgAEEANgJoIABBADYCbCABKAJkIQIgACACNgJkIAEoAmghAiAAIAI2AmggASgCbCECIAAgAjYCbCABQQA2AmwgAUEANgJoIAFBADYCZCAAQQA2AnAgAEEANgJ0IABBADYCeCABKAJwIQIgACACNgJwIAEoAnQhAiAAIAI2AnQgASgCeCECIAAgAjYCeCABQQA2AnggAUEANgJ0IAFBADYCcCABLgF8IQIgACACOwF8IABBADYCgAEgAEEANgKEASAAQQA2AogBIAEoAoABIQIgACACNgKAASABKAKEASECIAAgAjYChAEgASgCiAEhAiAAIAI2AogBIAFBADYCiAEgAUEANgKEASABQQA2AoABIABBADYCjAEgAEEANgKQASAAQQA2ApQBIAEoAowBIQIgACACNgKMASABKAKQASECIAAgAjYCkAEgASgClAEhAiAAIAI2ApQBIAFBADYClAEgAUEANgKQASABQQA2AowBIAEoApgBIQIgACACNgKYASAAQQA2ApwBIABBADYCoAEgAEEANgKkASABKAKcASECIAAgAjYCnAEgASgCoAEhAiAAIAI2AqABIAEoAqQBIQIgACACNgKkASABQQA2AqQBIAFBADYCoAEgAUEANgKcAQu8AQEEfyAAQgA3AgAgAEIANwIIIABCADcCECAAQgA3AhggAEIANwIgIAAgARCOASAAKAIYIQEgAUUEQCAAIAIQ4QUPCwNAIAAoAhwhBSAEQQV0IAVqIQYgBigCACEDIAMEQCAEQQV0IAVqIQVBACEBA0AgBSgCFCEDIAFBqAFsIANqIQMgAxCHASABQQFqIQEgBigCACEDIAEgA0kNAAsgACgCGCEBCyAEQQFqIQQgBCABSQ0ACyAAIAIQ4QUL/gIBB38jAyECIwNBMGokAyABEKICELkCIgFFBEAgAiQDDwsgAkEgaiEFIAJBDGohBiAAQRxqIQcgAkEIaiEIQQEhAwNA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BEAgACAGEGUFIAEgBhDbBSAAIAAoAgRBDGo2AgQLIAYsAAtBAEgEQCAGKAIAEPcFCwsgDygCDCIABEAgDyAANgIQIAAQ9wULIA8oAgAiAUUEQCAHJAMPCyABIA8oAgQiAEYEfyABBQNAIABB1HRqKAIAIgIEQCAAQdh0aiACNgIAIAIQ9wULIABBxHRqKAIAIgIEQCAAQch0aiACNgIAIAIQ9wULIABBwHRqIgAgAUcNAAsgDygCAAshACAPIAE2AgQgABD3BSAHJAMLmAEBA38gACABECogAEEANgIMIABBADYCECAAQQA2AhQgASgCECABKAIMayICRQRADwsgAkECdSIDQf////8DSwRAEBQLIAAgAhDdAiICNgIQIAAgAjYCDCAAIANBAnQgAmo2AhQgASgCECABKAIMIgNrIgFBAEwEQA8LIAFBAnZBAnQgAmohBCACIAMgARD9BRogACAENgIQC4QCAQN/IwMhAyMDQSBqJAMgACgCCEEFdCABTwRAIAMkAw8LIANBEGoiAkEANgIAIAJBADYCBCACQQA2AgggAUEASARAEBQLIANBCGohBCACIAFBf2pBBXZBAWoiAUECdBDdAjYCACACQQA2AgQgAiABNgIIIAQgACgCACIBNgIAIARBADYCBCADIAEgACgCBCIBQQV2QQJ0ajYCACADIAFBH3E2AgQgAiAEIAMQnQEgACgCACEBIAAgAigCADYCACACIAE2AgAgACgCBCEEIAAgAigCBDYCBCACIAQ2AgQgACgCCCEEIAAgAigCCDYCCCACIAQ2AgggAQRAIAEQ9wULIAMkAwuRBQELfyMDIQcjA0EgaiQDIAdBGGohCyAHQRBqIQwgB0EIaiENIAAoAgQhCSABKAIAIQUgASgCBCEDIAIoAgAhCCACKAIEIQYgCCAFayEBIAFBA3QhAiAGIANrIQEgASACaiECIAIgCWohCiAAIAo2AgQCQAJAIAlFDQAgCUF/aiEEIApBf2ohASABIARzIQEgAUEfSw0AIAAoAgAhAAwBCyAAKAIAIQAgCkEhSQRAIABBADYCAAUgCkF/aiEBIAFBBXYhASABQQJ0IABqIQEgAUEANgIACwsgCUEFdiEBIAFBAnQgAGohACAJQR9xIQEgASADRwRAIAsgBTYCACALIAM2AgQgDCAINgIAIAwgBjYCBCANIAA2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IQcDQCABIAZqIQMgA0EMbCACaiEDIAMoAgAhAyADKwMQIQkgCSAHoCEHIAFBAWohASABIAVJDQALIAcgCKMhByAAIAc5A/ABC4oIAhV/G3wgAEHgCWohCyAAQdgJaiEFIABB0AlqIQYgAEHICWohByAAQcAJaiEMIABBuAlqIQ0gAEGwCWohCCAAQagJaiEJIABBoAlqIQ4gAEGYCWohDyAAQZAJaiEQIABBiAlqIQogAEGACWohESAAQfgIaiESIABB8AhqIRMgAEHoCGohAyAAQZALaiEEIANCADcDACADQgA3AwggA0IANwMQIANCADcDGCADQgA3AyAgA0IANwMoIANCADcDMCADQgA3AzggA0FAa0IANwMAIANCADcDSCADQgA3A1AgA0IANwNYIANCADcDYCADQgA3A2ggA0IANwNwIANCADcDeCAEKAIAIQQgBEUEQCAKRAAAAAAAAAAAOQMAIAlEAAAAAAAAAAA5AwAgCEQAAAAAAAAAADkDACAHRAAAAAAAAAAAOQMAIAZEAAAAAAAAAAA5AwAgBUQAAAAAAAAAADkDAA8LIAAoAvgBIRQgASgCACEVIAAoAvwBIRYgAigCACEXIAArA8gBIS0gACsD4AEhLiAAKwPQASEvIAArA+gBITAgACsD2AEhMSAAKwPwASEyQQAhAANAIAAgFGohASABQQxsIBVqIQEgASgCACEBIAErAwAhGSAZIC2hIRwgACAWaiECIAJBDGwgF2ohAiACKAIAIQIgAisDACEZIBkgLqEhHiAcIB6hIRkgASsDCCEbIBsgL6EhHyACKwMIIRsgGyAwoSEYIB8gGKEhGyABKwMQIR0gHSAxoSEaIAIrAxAhHSAdIDKhISEgGiAhoSEdIB4gHKAhHCAYIB+gIR4gISAaoCEfIBkgGaIhGCAbIBuiIRogGiAYoCEoIB0gHaIhISAoICCgISAgICAhoCEgIAMgIDkDACAeIB6iISggHyAfoiEsICggGKAhGCAYICygIRggGCApoCEpIBAgKTkDACAcIByiIRggGiAYoCEaIBogLKAhGiAaICqgISogDSAqOQMAICggGKAhGCAYICGgIRggGCAroCErIAsgKzkDACAdIB6iIRggHyAboiEaIBggGqEhGCAYICKgISIgEyAiOQMAIB8gGaIhGCAdIByiIRogGCAaoSEYIBgg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ACEGIABB+AlqIQEgASsDACEFIAUgBmZFIQFBAUECIAEbIQQgBiAFIAEbIQUgAEGACmohASABKwMAIQcgByAFZkUhAyAEQQMgAxshASABQQFHBEAgBSAHIAMbIQUgAEHoCWogAUEDdGohAyADIAY5AwAgAiAFOQMAIABBkApqIQIgAisDACEGIABBiApqIAFBA3RqIQMgAysDACEFIAIgBTkDACADIAY5AwAgAEGwCmohAiACKwMAIQYgAEGoCmogAUEDdGohAyADKwMAIQUgAiAFOQMAIAMgBjkDACAAQdAKaiECIAIrAwAhBiAAQcgKaiABQQN0aiEDIAMrAwAhBSACIAU5AwAgAyAGOQMAIABB8ApqIQIgAisDACEGIABB6ApqIAFBA3RqIQEgASsDACEFIAIgBTkDACABIAY5AwALIABB+AlqIQIgAisDACEGIABBgApqIQEgASsDACEFIAUgBmZFIQEgAQRADwtBAkEDIAEbIQEgAEHoCWogAUEDdGohAyADIAY5AwAgAiAFOQMAIABBmApqIQIgAisDACEGIABBiApqIAFBA3RqIQMgAysDACEFIAIgBTkDACADIAY5AwAgAEG4CmohAiACKwMAIQYgAEGoCmogAUEDdGohAyADKwMAIQUgAiAFOQMAIAMgBjkDACAAQdgKaiECIAIrAwAhBiAAQcgKaiABQQN0aiEDIAMrAwAhBSACIAU5AwAgAyAGOQMAIABB+ApqIQIgAisDACEGIABB6ApqIAFBA3RqIQAgACsDACEFIAIgBTkDACAAIAY5AwALlxICG38KfCMDIQMjA0EgaiQDIABB6AlqIQsgAEGICmohByAAQYALaiECIABBkApqIgFCADcDACABQgA3AwggAUIANwMQIAFCADcDGCABQgA3AyAgAUIANwMoIAFCADcDMCABQgA3AzggAUFAa0IANwMAIAFCADcDSCABQgA3A1AgAUIANwNYIAFCADcDYCABQgA3A2ggAkQAAAAAAADwPzkDACAAQdgKaiEBIAFEAAAAAAAA8D85AwAgAEGwCmohASABRAAAAAAAAPA/OQMAIAdEAAAAAAAA8D85AwAgA0IANwMAIANCADcDCCADQgA3AxAgA0IANwMYIABB6AhqIQEgASsDACEhIAsgITkDACAAQZAJaiEBIAErAwAhIiAAQfAJaiEMIAwg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OgAAIAdBADoACwsgByAKKQIANwIAIAcgCigCCDYCCEEAIQADQCAAQQNHBEAgAEECdCAKakEANgIAIABBAWohAAwBCwsgChDgBSADIAEgASgCACgCDEE/cREMADoAACAEIAEgASgCACgCEEE/cREMADoAACAKIAEgASgCACgCFEE/cUGbA2oRBQAgBSwAC0EASARAIAUoAgAhACAKQQA6AAwgACAKLAAMOgAAIAVBADYCBCAFLAALQQBIBEAgBSgCCBogBSgCABD3BSAFQQA2AggLBSAKQQA6AAwgBSAKLAAMOgAAIAVBADoACwsgBSAKKQIANwIAIAUgCigCCDYCCEEAIQADQCAAQQNHBEAgAEECdCAKakEANgIAIABBAWohAAwBCwsgChDgBSAKIAEgASgCACgCGEE/cUGbA2oRBQAgBiwAC0EASARAIAYoAgAhACAKQQA6AAwgACAKLAAMOgAAIAZBADYCBCAGLAALQQBIBEAgBigCCBogBigCABD3BSAGQQA2AggLBSAKQQA6AAwgBiAKLAAMOgAAIAZBADoACwsgBiAKKQIANwIAIAYgCigCCDYCCEEAIQADQCAAQQNHBEAgAEECdCAKakEANgIAIABBAWohAAwBCwsgChDgBSAJIAEgASgCACgCJEE/cREMADYCACAKJAMLrAEBBH8gAigCACAAKAIAIgMiBGsiBUEBdCIGQQEgBhtBfyAFQf////8HSRshBSABKAIAIARrIQYgA0EAIAAoAgRB9QBHIgQbIAUQ+AUiA0UEQBAUCyAEBEAgACADNgIABSAAKAIAIQQgACADNgIAIAQEQCAEIAAoAgRB/wBxQZsCahEQACAAKAIAIQMLCyAAQfYANgIEIAEgAyAGajYCACACIAUgACgCAGo2AgALuAEBBH8gAigCACAAKAIAIgMiBGsiBUEBdCIGQQQgBhtBfyAFQf////8HSRshBSABKAIAIARrQQJ1IQYgA0EAIAAoAgRB9QBHIgQbIAUQ+AUiA0UEQBAUCyAEBEAgACADNgIABSAAKAIAIQQgACADNgIAIAQEQCAEIAAoAgRB/wBxQZsCahEQACAAKAIAIQMLCyAAQfYANgIEIAEgBkECdCADajYCACACIAAoAgAgBUECdkECdGo2AgALtwUBDH8jAyEHIwNB0ARqJAMgB0GABGohCiAHQagEaiEQ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ACAAEK4FIAAQ9wULBwAgACwACAsHACAALAAJCwwAIAAgAUEMahDbBQsgACAAQgA3AgAgAEEANgIIIABBlasBQZWrARCTAhDcBQsgACAAQgA3AgAgAEEANgIIIABBj6sBQY+rARCTAhDcBQsTACAAQdj4ADYCACAAQRBqEOAFCwwAIAAQtQUgABD3BQsHACAAKAIICwcAIAAoAgwLDAAgACABQRBqENsFCyAAIABCADcCACAAQQA2AgggAEGQ+QBBkPkAEIoCEO4FCyAAIABCADcCACAAQQA2AgggAEH4+ABB+PgAEIoCEO4FCykAIAJBgAFJBH8gAUGU4AAoAgAgAkEBdGouAQBxQf//A3FBAEcFQQALC0YAA0AgASACRwRAIAMgASgCAEGAAUkEf0GU4AAoAgAgASgCAEEBdGovAQAFQQALOwEAIAFBBGohASADQQJqIQMMAQsLIAILSgADQAJAIAIgA0YEQCADIQIMAQsgAigCAEGAAUkEQCABQZTgACgCACACKAIAQQF0ai4BAHFB//8DcQ0BCyACQQRqIQIMAQsLIAILSgADQAJAIAIgA0YEQCADIQIMAQsgAigCAEGAAU8NACABQZTgACgCACACKAIAQQF0ai4BAHFB//8DcQRAIAJBBGohAgwCCwsLIAILHgAgAUGAAUkEf0Gc4AAoAgAgAUECdGooAgAFIAELC0EAA0AgASACRwRAIAEgASgCACIAQYABSQR/QZzgACgCACABKAIAQQJ0aigCAAUgAAs2AgAgAUEEaiEBDAELCyACCx4AIAFBgAFJBH9BmOAAKAIAIAFBAnRqKAIABSABCwtBAANAIAEgAkcEQCABIAEoAgAiAEGAAUkEf0GY4AAoAgAgASgCAEECdGooAgAFIAALNgIAIAFBBGohAQwBCwsgAgsKACABQRh0QRh1CykAA0AgASACRwRAIAMgASwAADYCACADQQRqIQMgAUEBaiEBDAELCyACCxEAIAFB/wFxIAIgAUGAAUkbC04BAn8gAiABa0ECdiEFIAEhAANAIAAgAkcEQCAEIAAoAgAiBkH/AXEgAyAGQYABSRs6AAAgBEEBaiEEIABBBGohAAwBCwsgBUECdCABagv3CABB/MgBQQA2AgBB+MgBQej3ADYCABDJBUGIygFCADcCAEGQygFBADYCAEGIygFBiJsBQYibARCT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3QIiBTYCACAAIARBgICAgHhyNgIIIAAgAjYCBCAFIQALIAAgASACEIgDIANBADoAACAAIAJqIAMsAAA6AAAgAyQDCzQBAX8jAyEBIwNBEGokAyAAQQE6AAsgAEEBQS0Q3gUgAUEAOgAAIAAgASwAADoAASABJAMLFQAgAQRAIAAgAkH/AXEgARD/BRoLC1gBAn8gAEIANwIAIABBADYCCCABLAALIgRBAEghBSABKAIEIARB/wFxIAUbIgQgAkkEQBAUBSAAIAIgASgCACABIAUbaiAEIAJrIgAgAyAAIANJGxDcBQsLGwAgACwAC0EASARAIAAoAggaIAAoAgAQ9wULCzMBAX8gACABRwRAIAAgASgCACABIAEsAAsiAEEASCICGyABKAIEIABB/wFxIAIbEOIFCwuoAQEEfyMDIQQjA0EQaiQDIAAsAAsiBkEASCIDBH8gACgCCEH/////B3FBf2oFQQoLIgUgAkkEQCAAIAUgAiAFayADBH8gACgCBAUgBkH/AXELIgBBACAAIAIgARDkBQUgAwR/IAAoAgAFIAALIgMgASACEOMFIARBADoAACACIANqIAQsAAA6AAAgACwAC0EASARAIAAgAjYCBAUgACACOgALCwsgBCQDCxEAIAIEQCAAIAEgAhD+BRoLC/QBAQN/IwMhCCMDQRBqJANBbiABayACSQRAEBQLIAAsAAtBAEgEfyAAKAIABSAACyEJIAFB5////wdJBH9BCyABQQF0IgogASACaiICIAIgCkkbIgJBEGpBcHEgAkELSRsFQW8LIgoQ3QIhAiAEBEAgAiAJIAQQiAMLIAYEQCACIARqIAcgBhCIAwsgAyAFayIDIARrIgcEQCAGIAIgBGpqIAUgBCAJamogBxCIAwsgAUEKRwRAIAkQ9wULIAAgAjYCACAAIApBgICAgHhyNgIIIAAgAyAGaiIANgIEIAhBADoAACAAIAJqIAgsAAA6AAAgCCQDCw4AIAAgASABEJMCEOIFC4YBAQN/IwMhAiMDQRBqJAMgACwACyIDQQBIIgQEfyAAKAIEBSADQf8BcQsiAyABSQRAIAAgASADa0EAEOcFBSAEBEAgASAAKAIAaiEDIAJBADoAACADIAIsAAA6AAAgACABNgIEBSACQQA6AAAgACABaiACLAAAOgAAIAAgAToACwsLIAIkAwu9AQEEfyMDIQUjA0EQaiQDIAEEQCAALAALIgRBAEgEfyAAKAIEIQMgACgCCEH/////B3FBf2oFIARB/wFxIQNBCgsiBiADayABSQR/IAAgBiABIANqIAZrIAMgA0EAEOgFIAAsAAsFIAQLQQBIBH8gACgCAAUgAAsiBCADaiABIAIQ3gUgASADaiEBIAAsAAtBAEgEQCAAIAE2AgQFIAAgAToACwsgBUEAOgAAIAEgBGogBSwAADoAAAsgBSQDC6wBAQJ/QW8gAWsgAkkEQBAUCyAALAALQQBIBH8gACgCAAUgAAshBiABQef///8HSQR/QQsgAUEBdCIHIAEgAmoiAiACIAdJGyICQRBqQXBxIAJBC0kbBUFvCyIHEN0CIQIgBARAIAIgBiAEEIgDCyADIARrIgMEQCAFIAIgBGpqIAQgBmogAxCIAwsgAUEKRwRAIAYQ9wULIAAgAjYCACAAIAdBgICAgHhyNgIIC70BAQR/IwMhBSMDQRBqJAMgACwACyIEQQBIIgYEfyAAKAIEIQMgACgCCEH/////B3FBf2oFIARB/wFxIQNBCgsiBCADayACSQRAIAAgBCACIANqIARrIAMgA0EAIAIgARDkBQUgAgRAIAMgBgR/IAAoAgAFIAALIgRqIAEgAhCIAyACIANqIQEgACwAC0EASARAIAAgATYCBAUgACABOgALCyAFQQA6AAAgASAEaiAFLAAAOgAACwsgBSQDIAALvAEBBH8jAyEDIwNBEGokAyADQQFqIgQgAToAAAJAAkAgACwACyIBQQBIIgUEfyAAKAIEIQIgACgCCEH/////B3FBf2oFIAFB/wFxIQJBCgsiASACRgRAIAAgAUEBIAEgAUEAEOgFIAAsAAtBAEgNAQUgBQ0BCyAAIAJBAWo6AAsMAQsgACgCACEBIAAgAkEBajYCBCABIQALIAAgAmoiACAELAAAOgAAIANBADoAACAAIAMsAAA6AAEgAyQDC9UBAQR/IwMhBCMDQRBqJAMgACwACyICQQBIIgMEfyAAKAIEBSACQf8BcQsiAkEASQRAEBQLIAMEfyAAKAIIQf////8HcUF/agVBCgsiBSACa0EBSQRAIAAgBSACQQFqIAVrIAJBAEEBEOgFIAAoAgAhAwUgAwR/IAAoAgAFIAALIQMgAgRAIANBAWogAyACEOMFCwsgA0EBIAEQ3gUgAkEBaiEBIAAsAAtBAEgEQCAAIAE2AgQFIAAgAToACwsgBEEAOgAAIAEgA2ogBCwAADoAACAEJAMLlAIBBX8jAyEEIwNBEGokAyAEQQFqIgcgAjoAACAALAALIgNBAEgiBgR/IAAoAghB/////wdxQX9qIQUgASgCACAAKAIAayECIAAoAgQFQQohBSABKAIAIABrIQIgA0H/AXELIQMgAyAFRgRAIAAgA0EBIAMgAkEBEOgFIAAoAgAhAQUgBgR/IAAoAgAFIAALIQEgAyACayIFBEAgASACaiIGQQFqIAYgBRDjBQsLIAEgAmogBywAADoAACAEQQA6AAAgASADQQFqIgJqIAQsAAA6AAACQAJAIAAsAAtBAEgEQCAAIAI2AgQMAQUgACACQf8BcSIBOgALIAFBGHRBGHVBAEgNAQsMAQsgACgCABoLIAQkAwtrAQJ/IwMhAyMDQRBqJAMgACwACyICQQBIBEAgACgCBCECIAAoAgAhAAUgAkH/AXEhAgsgAyABOgAAIAJBAEsEfyACBH8gACADLQAAIAIQggIFQQALIgEgAGtBfyABGwVBfwshACADJAMgAAuQAQEDfyMDIQMjA0EQaiQDIAJB7////wNLBEAQFAsgAkECSQRAIAAgAjoACyAAIQQFIAJBBGpBfHEiBUH/////A0sEQBAUBSAAIAVBAnQQ3QIiBDYCACAAIAVBgICAgHhyNgIIIAAgAjYCBAsLIAQgASACEI4DIANBADYCACACQQJ0IARqIAMoAgA2AgAgAyQDC5UBAQN/IwMhAyMDQRBqJAMgAUHv////A0sEQBAUCyABQQJJBEAgACABOgALIAAhBAUgAUEEakF8cSIFQf////8DSwRAEBQFIAAgBUECdBDdAiIENgIAIAAgBUGAgICAeHI2AgggACABNgIECwsgAQRAIAQgAiABELoCCyADQQA2AgAgAUECdCAEaiADKAIANgIAIAMkAwu0AQEEfyMDIQUjA0EQaiQDIAAsAAsiBkEASCIDBH8gACgCCEH/////B3FBf2oFQQELIgQgAkkEQCAAIAQgAiAEayADBH8gACgCBAUgBkH/AXELIgBBACAAIAIgARDxBQUgAwR/IAAoAgAFIAALIgMhBCACBEAgBCABIAIQuwILIAVBADYCACACQQJ0IANqIAUoAgA2AgAgACwAC0EASARAIAAgAjYCBAUgACACOgALCwsgBSQDC6YCAQR/IwMhCCMDQRBqJANB7v///wMgAWsgAkkEQBAUCyAALAALQQBIBH8gACgCAAUgAAshCSABQef///8BSQRAQQIgAUEBdCILIAEgAmoiAiACIAtJGyICQQRqQXxxIAJBAkkbIgJB/////wNLBEAQFAUgAiEKCwVB7////wMhCgsgCkECdBDdAiECIAQEQCACIAkgBBCOAwsgBgRAIARBAnQgAmogByAGEI4DCyADIAVrIgMgBGsiBwRAIARBAnQgAmogBkECdGogBEECdCAJaiAFQQJ0aiAHEI4DCyABQQFHBEAgCRD3BQsgACACNgIAIAAgCkGAgICAeHI2AgggACADIAZqIgA2AgQgCEEANgIAIABBAnQgAmogCCgCADYCACAIJAMLDgAgACABIAEQigIQ8AULzwEBA39B7////wMgAWsgAkkEQBAUCyAALAALQQBIBH8gACgCAAUgAAshBSABQef///8BSQRAQQIgAUEBdCIHIAEgAmoiAiACIAdJGyICQQRqQXxxIAJBAkkbIgJB/////wNLBEAQFAUgAiEGCwVB7////wMhBgsgBkECdBDdAiECIAQEQCACIAUgBBCOAwsgAyAEayIDBEAgAiAEQQJ0aiAFIARBAnRqIAMQjgMLIAFBAUcEQCAFEPcFCyAAIAI2AgAgACAGQYCAgIB4cjYCCAvBAQEEfyMDIQUjA0EQaiQDIAAsAAsiBEEASCIGBH8gACgCBCEDIAAoAghB/////wdxQX9qBSAEQf8BcSEDQQELIgQgA2sgAkkEQCAAIAQgAiADaiAEayADIANBACACIAEQ8QUFIAIEQCAGBH8gACgCAAUgAAsiBCADQQJ0aiABIAIQjgMgAiADaiEBIAAsAAtBAEgEQCAAIAE2AgQFIAAgAToACwsgBUEANgIAIAFBAnQgBGogBSgCADYCAAsLIAUkAwu9AQEEfyMDIQMjA0EQaiQDIANBBGoiBCABNgIAAkACQCAALAALIgFBAEgiBQR/IAAoAgQhAiAAKAIIQf////8HcUF/agUgAUH/AXEhAkEBCyIBIAJGBEAgACABQQEgASABEPMFIAAsAAtBAEgNAQUgBQ0BCyAAIAJBAWo6AAsMAQsgACgCACEBIAAgAkEBajYCBCABIQALIAJBAnQgAGoiACAE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IAA2AhggAiACNgIMIAIgAjYCCAs3AQF/IABBoOMBKAIAIgFqIgAQFksEQCAAEBhFBEBBiMsBQTA2AgBBfw8LC0Gg4wEgADYCACABCwYAQaDjAQvGAwEDfyACQYDAAE4EQCAAIAEgAhAXGiAADwsgACEEIAAgAmohAyAAQQNxIAFBA3FGBEADQCAAQQNxBEAgAkUEQCAEDwsgACABLAAAOgAAIABBAWohACABQQFqIQEgAkEBayECDAELCyADQXxxIgJBQGohBQNAIAAgBUwEQCAAIAEoAgA2AgAgACABKAIENgIEIAAgASgCCDYCCCAAIAEoAgw2AgwgACABKAIQNgIQIAAgASgCFDYCFCAAIAEoAhg2AhggACABKAIcNgIcIAAgASgCIDYCICAAIAEoAiQ2AiQgACABKAIoNgIoIAAgASgCLDYCLCAAIAEoAjA2AjAgACABKAI0NgI0IAAgASgCODYCOCAAIAEoAjw2AjwgAEFAayEAIAFBQGshAQwBCwsDQCAAIAJIBEAgACABKAIANgIAIABBBGohACABQQRqIQEMAQsLBSADQQRrIQIDQCAAIAJIBEAgACABLAAAOgAAIAAgASwAAToAASAAIAEsAAI6AAIgACABLAADOgADIABBBGohACABQQRqIQEMAQsLCwNAIAAgA0gEQCAAIAEsAAA6AAAgAEEBaiEAIAFBAWohAQwBCwsgBAteAQF/IAEgAEggACABIAJqSHEEQCABIAJqIQEgACIDIAJqIQADQCACQQBKBEAgAkEBayECIABBAWsiACABQQFrIgEsAAA6AAAMAQsLIAMhAAUgACABIAIQ/QUaCyAAC5gCAQR/IAAgAmohBCABQf8BcSEDIAJBwwBOBEADQCAAQQNxBEAgACADOgAAIABBAWohAAwBCwsgA0EIdCADciADQRB0ciADQRh0ciEBIARBfHEiBUFAaiEGA0AgACAGTARAIAAgATYCACAAIAE2AgQgACABNgIIIAAgATYCDCAAIAE2AhAgACABNgIUIAAgATYCGCAAIAE2AhwgACABNgIgIAAgATYCJCAAIAE2AiggACABNgIsIAAgATYCMCAAIAE2AjQgACABNgI4IAAgATYCPCAAQUBrIQAMAQsLA0AgACAFSARAIAAgATYCACAAQQRqIQAMAQsLCwNAIAAgBEgEQCAAIAM6AAAg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i1NAbxKDwMohPUCQ0wBz5wBTQLmkNKQU8Og/Nlh7iupV4z9bgD00oUHFP+I1tOyFdbO/4ys3mfwExr+7hRW60G3vP7NAUPGl5+M/spTvDKjl6L8ML0f5a4e2v4QSZtr+lYU/iUFg5dACXUCe76fGS/dJQG+rD9rhclxActgXd+V16T8DJC/uLDnjP7vZJraB9bO/Tr+FagMmzL/7N7b1jwnaP9U6tHpVX+w/Da/szk8T4j/UOJFlrALmv2rv7N83Ld0/626e6pCboT8Sg8DKoUUiQJzeMpigRRJApdnrxoNZIkCoIb2vKWvlP7hjbXlMkNc/zJIZG3Wm5L/tyirN5qi7vwf2TrtOCe0//loZd7z+2T8xpFLKNYbnP6MGdJpV3Mm/i3d6AC+15D/RrkLKT6q1P05iEFg5ZFNA9ihcj8IlQkBtpsZ0NvJSQDp9M6QgzeQ/1mzYRBxK6L8ZKiXZ4W6iv+Hjw9g49d+/7HKNOCT62L+D6T0XwsDov88FfmjwVOI/sLTUhQ2r4D+d6gWpWEDkvwAAAAAAAABAJwAAUCcAAEAnAABQJwAAUCcAAEAnAABAJwAAAAAAAN4SBJUAAAAA////////////////AEGgGwvRAwIAAMADAADABAAAwAUAAMAGAADABwAAwAgAAMAJAADACgAAwAsAAMAMAADADQAAwA4AAMAPAADAEAAAwBEAAMASAADAEwAAwBQAAMAVAADAFgAAwBcAAMAYAADAGQAAwBoAAMAbAADAHAAAwB0AAMAeAADAHwAAwAAAALMBAADDAgAAwwMAAMMEAADDBQAAwwYAAMMHAADDCAAAwwkAAMMKAADDCwAAwwwAAMMNAADTDgAAww8AAMMAAAy7AQAMwwIADMMDAAzDBAAM0wAAAAD/////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBBgB8LGBEACgAREREAAAAABQAAAAAAAAkAAAAACwBBoB8LIREADwoREREDCgcAARMJCwsAAAkGCwAACwAGEQAAABEREQBB0R8LAQsAQdofCxgRAAoKERERAAoAAAIACQsAAAAJAAsAAAsAQYsgCwEMAEGXIAsVDAAAAAAMAAAAAAkMAAAAAAAMAAAMAEHFIAsBDgBB0SALFQ0AAAAEDQAAAAAJDgAAAAAADgAADgBB/yALARAAQYshCx4PAAAAAA8AAAAACRAAAAAAABAAABAAABIAAAASEhIAQcIhCw4SAAAAEhISAAAAAAAACQBB8yELAQsAQf8hCxUKAAAAAAoAAAAACQsAAAAAAAsAAAsAQa0iCwEMAEG5IgsnDAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGAEHgJAv/AQIAAgACAAIAAgACAAIAAgACAAMgAiACIAIgAiACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgABYATABMAEwATABMAEwATABMAEwATABMAEwATABMAEwAjYCNgI2AjYCNgI2AjYCNgI2AjYBMAEwATABMAEwATABMAI1QjVCNUI1QjVCNUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFBMAEwATABMAEwATACNYI1gjWCNYI1gjWCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgTABMAEwATAAgBB5CwL+QMBAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAYQAAAGIAAABjAAAAZAAAAGUAAABmAAAAZwAAAGgAAABpAAAAagAAAGsAAABsAAAAbQAAAG4AAABvAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAHoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAYgAAAGMAAABkAAAAZQAAAGYAAABnAAAAaAAAAGkAAABqAAAAawAAAGwAAABtAAAAbgAAAG8AAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAegAAAHsAAAB8AAAAfQAAAH4AAAB/AEHkOAv5AwEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABEAAAARQAAAEYAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABNAAAATgAAAE8AAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAEEAAABCAAAAQwAAAEQAAABFAAAARgAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAE0AAABOAAAATwAAAFAAAABRAAAAUgAAAFMAAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAewAAAHwAAAB9AAAAfgAAAH8AQeDAAAtnCgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QVMQ19DVFlQRQAAAABMQ19OVU1FUklDAABMQ19USU1FAAAAAABMQ19DT0xMQVRFAABMQ19NT05FVEFSWQBMQ19NRVNTQUdFUwBB0MEAC5cCAwAAAAQAAAAEAAAABgAAAIP5ogBETm4A/CkVANFXJwDdNPUAYtvAADyZlQBBkEMAY1H+ALveqwC3YcUAOm4kANJNQgBJBuAACeouAByS0QDrHf4AKbEcAOg+pwD1NYIARLsuAJzphAC0JnAAQX5fANaROQBTgzkAnPQ5AItfhAAo+b0A+B87AN7/lwAPmAUAES/vAApaiwBtH20Az342AAnLJwBGT7cAnmY/AC3qXwC6J3UA5evHAD178QD3OQcAklKKAPtr6gAfsV8ACF2NADADVgB7/EYA8KtrACC8zwA29JoA46kdAF5hkQAIG+YAhZllAKAUXwCNQGgAgNj/ACdzTQAGBjEAylYVAMmocwB74mAAa4zAAEHzwwALckD7Ifk/AAAAAC1EdD4AAACAmEb4PAAAAGBRzHg7AAAAgIMb8DkAAABAICV6OAAAAIAiguM2AAAAAB3zaTUAAAAAAADgPwAAAAAAAOC/BAAAAAAAAADgKAAAEwAAABQAAAD8/////P///+AoAAAVAAAAFgBB8MQACyAwMTIzNDU2Nzg5YWJjZGVmQUJDREVGeFgrLXBQaUluTgBBoMUAC4EBJQAAAG0AAAAvAAAAJQAAAGQAAAAvAAAAJQAAAHkAAAAlAAAAWQAAAC0AAAAlAAAAbQAAAC0AAAAlAAAAZAAAACUAAABJAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABwAAAAAAAAACUAAABIAAAAOgAAACUAAABNAEGwxgALgQIlAAAASAAAADoAAAAlAAAATQAAADoAAAAlAAAAUwAAACUAAABIAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAQAAAAAAAAACwKAAABwAAAAgAAADA////wP///7AoAAAJAAAACgAAAFgwAAD/PQAAoCgAAAAAAABAAAAAAAAAABApAAANAAAADgAAADgAAAD4////ECkAAA8AAAAQAAAAwP///8D///8QKQAAEQAAABIAAAAAAAAAWDAAAEE+AAAQKQAAAAAAADgAAAAAAAAA4CgAABMAAAAUAAAAyP///8j////gKAAAFQAAABYAAABYMAAAdkEAAOAoAAAAAAAABQBBvMgACwEFAEHUyAALCgQAAAABAAAAkm0AQezIAAsBAgBB+8gACwX//////wBBwMkACwEJAEHMyQALAQUAQeDJAAsSBQAAAAAAAAABAAAA6FUAAAAEAEGMygALBP////8A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cGxlAHJlZAB2aW9sZXQAbGltZWdyZWVuAG9saXZlAHdoZWF0AHJhc3BiZXJyeQBwYWxleWVsbG93AGRlZXBvbGl2ZQBkZWVwc2FsbW9uAG9yYW5nZQBkaXJ0eXZpb2xldABsaW1vbgBicjEAYnJvd24AbWFnZW50YQB2aW9sZXRwdXJwbGUAdHZfb3JhbmdlAHllbGxvd29yYW5nZQBveHlnZW4AYnI4AHN1bGZ1cgBkYXJrc2FsbW9uAGNoYXJ0cmV1c2UAeWVsbG93AGJyNABicjIAYmx1ZXdoaXRlAHR2X3JlZABicjcAYXF1YW1hcmluZQBwdXJwbGUAbGlnaHR0ZWFsAGxpZ2h0bWFnZW50YQBibGFjawBicmlnaHRvcmFuZ2UAc2xhdGUAY2hvY29sYXRlAHB1cnBsZWJsdWUAYnIzAGNhcmJvbgBmb3Jlc3QAYnI5AGxpZ2h0b3JhbmdlAGJyNQAgTgAgQ0EAIEMgACBOIABBVE9NICAASEVUQVRNAFNUUkFOR0UhISEgAAoAUk1TRF9WQVJZSU5HAFsgG1szMjs0bQAbWzBtIF0AIBtbADs0bQAbWzBtIABOU3QzX18yMTliYXNpY19vc3RyaW5nc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUACCAIACwgAFN0cnVjdHVyZSBTaXplcyA9ICAgAENvdmVyYWdlICAgICAgICA9ICAgAFJNU0QgICAgICAgICAgICA9IAAgQQBJKEEpICAgICAgICAgICAgPSAAIGJpdHMATlVMTChTICYgVCkgICAgID0gAEkoQSAmIDxTLFQ+KSAgICA9IABDb21wcmVzc2lvbiAgICAgPSAAIGJpdHMgKCt2ZSBiZXR0ZXI7IC12ZSB3b3JzZSkAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQBzUABpaWlpaWlpaQAgICBbbm9uZSBvZiB0aGUgcmVzdWx0YW50IGFsaWdubWVudHMgYXJlIHNpZ25pZmljYW50XQoAICAgW29ubHkgMSByZXN1bHRhbnQgYWxpZ25tZW50IGlzIHNpZ25pZmljYW50XQoAICAgW29ubHkgACByZXN1bHRhbnQgYWxpZ25tZW50cyBhcmUgc2lnbmlmaWNhbnRdCgAvAGFsbFJlYWR5KCkAAAECBAcDBgUALSsgICAwWDB4AChudWxsKQAtMFgrMFggMFgtMHgrMHggMHgAaW5mAElORgBOQU4ALgBpbmZpbml0eQBuYW4ATENfQUxMAExBTkcAQy5VVEYtOABQT1NJWABNVVNMX0xPQ1BBVEgAU3Q5ZXhjZXB0aW9uAE4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAFN0OXR5cGVfaW5mbwBOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAFN0MTFsb2dpY19lcnJvcgBTdDEybGVuZ3RoX2Vycm9yAE4xMF9fY3h4YWJpdjExN19fcGJhc2VfdHlwZV9pbmZvRQBOMTBfX2N4eGFiaXYxMTlfX3BvaW50ZXJfdHlwZV9pbmZvRQBOMTBfX2N4eGFiaXYxMjBfX2Z1bmN0aW9uX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTI5X19wb2ludGVyX3RvX21lbWJlcl90eXBlX2luZm9FAE4xMF9fY3h4YWJpdjEyM19fZnVuZGFtZW50YWxfdHlwZV9pbmZvRQB2AERuAGIAYwBQYwBQS2MAaABhAHMAdABpAGoAbQBmAGQATjEwX19jeHhhYml2MTIxX192bWlfY2xhc3NfdHlwZV9pbmZvRQB2b2lkAGJvb2wAY2hhcgBzaWduZWQgY2hhcgB1bnNpZ25lZCBjaGFyAHNob3J0AHVuc2lnbmVkIHNob3J0AGludAB1bnNpZ25lZCBpbnQAbG9uZwB1bnNpZ25lZCBsb25nAGZsb2F0AGRvdWJsZQBzdGQ6OnN0cmluZwBzdGQ6OmJhc2ljX3N0cmluZzx1bnNpZ25lZCBjaGFyPgBzdGQ6OndzdHJpbmcAZW1zY3JpcHRlbjo6dmFsAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZmxvYXQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGRvdWJsZT4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZyBkb3VibGU+AE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWVFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZkVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SW1FRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lsRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJakVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWlFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJc0VFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWhFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJY0VFAE4xMGVtc2NyaXB0ZW4zdmFsRQBOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQBOU3QzX18yMjFfX2Jhc2ljX3N0cmluZ19jb21tb25JTGIxRUVFAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAE5TdDNfXzI4aW9zX2Jhc2VFAE5TdDNfXzI5YmFzaWNfaW9zSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAE5TdDNfXzI5YmFzaWNfaW9zSXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFAE5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQBOU3QzX18yMTViYXNpY19zdHJlYW1idWZJd05TXzExY2hhcl90cmFpdHNJd0VFRUUATlN0M19fMjEzYmFzaWNfaXN0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQBOU3QzX18yMTNiYXNpY19pc3RyZWFtSXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFAE5TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUUATlN0M19fMjEzYmFzaWNfb3N0cmVhbUl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRQBOU3QzX18yMTRiYXNpY19pb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQBOU3QzX18yMTFfX3N0ZG91dGJ1Zkl3RUUATlN0M19fMjExX19zdGRvdXRidWZJY0VFAHVuc3VwcG9ydGVkIGxvY2FsZSBmb3Igc3RhbmRhcmQgaW5wdXQATlN0M19fMjEwX19zdGRpbmJ1Zkl3RUUATlN0M19fMjEwX19zdGRpbmJ1ZkljRUUATlN0M19fMjdjb2xsYXRlSWNFRQBOU3QzX18yNmxvY2FsZTVmYWNldEUATlN0M19fMjdjb2xsYXRlSXdFRQAlcABDAE5TdDNfXzI3bnVtX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjlfX251bV9nZXRJY0VFAE5TdDNfXzIxNF9fbnVtX2dldF9iYXNlRQBOU3QzX18yN251bV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzI5X19udW1fZ2V0SXdFRQAlcAAAAABMAGxsACUAAAAAAGwATlN0M19fMjdudW1fcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yOV9fbnVtX3B1dEljRUUATlN0M19fMjE0X19udW1fcHV0X2Jhc2VFAE5TdDNfXzI3bnVtX3B1dEl3TlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUATlN0M19fMjlfX251bV9wdXRJd0VFACVIOiVNOiVTACVtLyVkLyV5ACVJOiVNOiVTICVwACVhICViICVkICVIOiVNOiVTICVZAEFNAFBNAEphbnVhcnkARmVicnVhcnkATWFyY2gAQXByaWwATWF5AEp1bmUASnVseQBBdWd1c3QAU2VwdGVtYmVyAE9jdG9iZXIATm92ZW1iZXIARGVjZW1iZXIASmFuAEZlYgBNYXIAQXByAEp1bgBKdWwAQXVnAFNlcABPY3QATm92AERlYwBTdW5kYXkATW9uZGF5AFR1ZXNkYXkAV2VkbmVzZGF5AFRodXJzZGF5AEZyaWRheQBTYXR1cmRheQBTdW4ATW9uAFR1ZQBXZWQAVGh1AEZyaQBTYXQAJW0vJWQvJXklWS0lbS0lZCVJOiVNOiVTICVwJUg6JU0lSDolTTolUyVIOiVNOiVTTlN0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjIwX190aW1lX2dldF9jX3N0b3JhZ2VJY0VFAE5TdDNfXzI5dGltZV9iYXNlRQBOU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RUUATlN0M19fMjh0aW1lX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjEwX190aW1lX3B1dEUATlN0M19fMjh0aW1lX3B1dEl3TlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUATlN0M19fMjEwbW9uZXlwdW5jdEljTGIwRUVFAE5TdDNfXzIxMG1vbmV5X2Jhc2VFAE5TdDNfXzIxMG1vbmV5cHVuY3RJY0xiMUVFRQBOU3QzX18yMTBtb25leXB1bmN0SXdMYjBFRUUATlN0M19fMjEwbW9uZXlwdW5jdEl3TGIxRUVFADAxMjM0NTY3ODkAJUxmAE5TdDNfXzI5bW9uZXlfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X2dldEljRUUAMDEyMzQ1Njc4OQBOU3QzX18yOW1vbmV5X2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUATlN0M19fMjExX19tb25leV9nZXRJd0VFACUuMExmAE5TdDNfXzI5bW9uZXlfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEljRUUATlN0M19fMjltb25leV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzIxMV9fbW9uZXlfcHV0SXdFRQBOU3QzX18yOG1lc3NhZ2VzSWNFRQBOU3QzX18yMTNtZXNzYWdlc19iYXNlRQBOU3QzX18yMTdfX3dpZGVuX2Zyb21fdXRmOElMbTMyRUVFAE5TdDNfXzI3Y29kZWN2dElEaWMxMV9fbWJzdGF0ZV90RUUATlN0M19fMjEyY29kZWN2dF9iYXNlRQBOU3QzX18yMTZfX25hcnJvd190b191dGY4SUxtMzJFRUUATlN0M19fMjhtZXNzYWdlc0l3RUUATlN0M19fMjdjb2RlY3Z0SWNjMTFfX21ic3RhdGVfdEVFAE5TdDNfXzI3Y29kZWN2dEl3YzExX19tYnN0YXRlX3RFRQBOU3QzX18yN2NvZGVjdnRJRHNjMTFfX21ic3RhdGVfdEVFAE5TdDNfXzI2bG9jYWxlNV9faW1wRQBOU3QzX18yNWN0eXBlSWNFRQBOU3QzX18yMTBjdHlwZV9iYXNlRQBOU3QzX18yNWN0eXBlSXdFRQBmYWxzZQB0cnVlAE5TdDNfXzI4bnVtcHVuY3RJY0VFAE5TdDNfXzI4bnVtcHVuY3RJd0VFAE5TdDNfXzIxNF9fc2hhcmVkX2NvdW50RQDUoQMEbmFtZQHLoQOqBgAFYWJvcnQBGV9fX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24CDF9fX2N4YV90aHJvdwMHX19fbG9jawQLX19fbWFwX2ZpbGUFDV9fX3N5c2NhbGwxNDAGDV9fX3N5c2NhbGwxNDUHDF9fX3N5c2NhbGw5MQgJX19fdW5sb2NrCRBfX193YXNpX2ZkX2Nsb3NlChBfX193YXNpX2ZkX3dyaXRlCxZfX2VtYmluZF9yZWdpc3Rlcl9ib29sDBdfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbA0XX19lbWJpbmRfcmVnaXN0ZXJfZmxvYXQOGl9fZW1iaW5kX3JlZ2lzdGVyX2Z1bmN0aW9uDxlfX2VtYmluZF9yZWdpc3Rlcl9pbnRlZ2VyEB1fX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldxEcX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZxIdX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcTFl9fZW1iaW5kX3JlZ2lzdGVyX3ZvaWQUBl9hYm9ydBUXX2Vtc2NyaXB0ZW5fYXNtX2NvbnN0X2kWGV9lbXNjcmlwdGVuX2dldF9oZWFwX3NpemUXFl9lbXNjcmlwdGVuX21lbWNweV9iaWcYF19lbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwGQVfZXhpdBoHX2dldGVudhsSX2xsdm1fc3RhY2tyZXN0b3JlHA9fbGx2bV9zdGFja3NhdmUdC19zdHJmdGltZV9sHgtzZXRUZW1wUmV0MB8QX19ncm93V2FzbU1lbW9yeSALZ2xvYmFsQ3RvcnMhCnN0YWNrQWxsb2MiCXN0YWNrU2F2ZSMMc3RhY2tSZXN0b3JlJBNlc3RhYmxpc2hTdGFja1NwYWNlJXtfX1pOMTdNRlBMaWJyYXJ5Q2xhc3NfdEMyRVIyNXN0cnVjdHVyZUluZm9ybWF0aW9uQ2xhc3NTMV9mbU5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlMyXzExY2hhcl90cmFpdHNJY0VFTlMyXzlhbGxvY2F0b3JJY0VFRUUmPl9fWk5TdDNfXzI2dmVjdG9ySU5TMF9JZE5TXzlhbGxvY2F0b3JJZEVFRUVOUzFfSVMzX0VFRUMyRVJLUzVfJz9fX1pOU3QzX18yNnZlY3RvcklOUzBfSW1OU185YWxsb2NhdG9ySW1FRUVFTlMxX0lTM19FRUVDMkVtUktTM18oTl9fWk4xN01GUExpYnJhcnlDbGFzc190QzJFUk5TdDNfXzI2dmVjdG9ySTEwTUZQQ2xhc3NfdE5TMF85YWxsb2NhdG9ySVMyX0VFRUVtbSkoX19aTjE3TUZQTGlicmFyeUNsYXNzX3QxM2dldE1GUExpYnJhcnlFdio6X19aTlN0M19fMjZ2ZWN0b3JJMTBNRlBDbGFzc190TlNfOWFsbG9jYXRvcklTMV9FRUVDMkVSS1M0Xyu3AV9fWk5TdDNfXzI2dmVjdG9ySW1OU185YWxsb2NhdG9ySW1FRUU2YXNzaWduSVBtRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMTZpc19jb25zdHJ1Y3RpYmxlSW1OU18xNWl0ZXJhdG9yX3RyYWl0c0lTN19FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM3X1M3XyxGX19aTlN0M19fMjZ2ZWN0b3JJbU5TXzlhbGxvY2F0b3JJbUVFRTIxX19wdXNoX2JhY2tfc2xvd19wYXRoSVJLbUVFdk9UXy1VX19aTlN0M19fMjZ2ZWN0b3JJMTBNRlBDbGFzc190TlNfOWFsbG9jYXRvcklTMV9FRUUyMV9fcHVzaF9iYWNrX3Nsb3dfcGF0aElSS1MxX0VFdk9UXy4XX19aTjEwTUZQQ2xhc3NfdEMyRVJLU18vyAFfX1pOU3QzX18yNnZlY3RvckkxME1GUENsYXNzX3ROU185YWxsb2NhdG9ySVMxX0VFRTZhc3NpZ25JUFMxX0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTMV9OU18xNWl0ZXJhdG9yX3RyYWl0c0lTOF9FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM4X1M4XzBgX19aTlN0M19fMjI0X19wdXRfY2hhcmFjdGVyX3NlcXVlbmNlSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFUk5TXzEzYmFzaWNfb3N0cmVhbUlUX1QwX0VFUzdfUEtTNF9tMXNfX1pOU3QzX18yMTZfX3BhZF9hbmRfb3V0cHV0SWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySVRfVDBfRUVTNl9QS1M0X1M4X1M4X1JOU184aW9zX2Jhc2VFUzRfMktfX1pOMTJBbGlnbkNsYXNzX3RDMkVSTlN0M19fMjZ2ZWN0b3JJTlMxX0lmTlMwXzlhbGxvY2F0b3JJZkVFRUVOUzJfSVM0X0VFRUUzV19fWk5TdDNfXzI2dmVjdG9ySU5TMF9JZk5TXzlhbGxvY2F0b3JJZkVFRUVOUzFfSVMzX0VFRTIxX19wdXNoX2JhY2tfc2xvd19wYXRoSVMzX0VFdk9UXzQiX19aTjEyQWxpZ25DbGFzc190MTJnZXRGU0FTdHJpbmdFdjU+X19aTlN0M19fMjZ2ZWN0b3JJTlMwX0lmTlNfOWFsbG9jYXRvcklmRUVFRU5TMV9JUzNfRUVFQzJFUktTNV82I19fWk4yNXN0cnVjdHVyZUluZm9ybWF0aW9uQ2xhc3NDMkV2N2hfX1pOMjVzdHJ1Y3R1cmVJbmZvcm1hdGlvbkNsYXNzQzJFUEtjTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOUzJfMTFjaGFyX3RyYWl0c0ljRUVOUzJfOWFsbG9jYXRvckljRUVFRVM4XzjEAV9fWk5TdDNfXzI2dmVjdG9ySTdNT0RFTF90TlNfOWFsbG9jYXRvcklTMV9FRUU2YXNzaWduSVBTMV9FRU5TXzllbmFibGVfaWZJWGFhc3IyMV9faXNfZm9yd2FyZF9pdGVyYXRvcklUX0VFNXZhbHVlc3IxNmlzX2NvbnN0cnVjdGlibGVJUzFfTlNfMTVpdGVyYXRvcl90cmFpdHNJUzhfRTlyZWZlcmVuY2VFRUU1dmFsdWVFdkU0dHlwZUVTOF9TOF857QFfX1pOU3QzX18yNnZlY3RvcklOUzBfSWROU185YWxsb2NhdG9ySWRFRUVFTlMxX0lTM19FRUU2aW5zZXJ0SU5TXzExX193cmFwX2l0ZXJJUFMzX0VFRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMTZpc19jb25zdHJ1Y3RpYmxlSVMzX05TXzE1aXRlcmF0b3JfdHJhaXRzSVNCX0U5cmVmZXJlbmNlRUVFNXZhbHVlRVM5X0U0dHlwZUVOUzdfSVBLUzNfRUVTQl9TQl865QFfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFNmluc2VydElOU18xMV9fd3JhcF9pdGVySVBjRUVFRU5TXzllbmFibGVfaWZJWGFhc3IyMV9faXNfZm9yd2FyZF9pdGVyYXRvcklUX0VFNXZhbHVlc3IzOF9fbGliY3BwX3N0cmluZ19nZXRzX25vZXhjZXB0X2l0ZXJhdG9ySVNCX0VFNXZhbHVlRVM5X0U0dHlwZUVOUzdfSVBLY0VFU0JfU0JfO44CX19aTlN0M19fMjZ2ZWN0b3JJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TNF9JUzZfRUVFNmluc2VydElOU18xMV9fd3JhcF9pdGVySVBTNl9FRUVFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTNl9OU18xNWl0ZXJhdG9yX3RyYWl0c0lTRV9FOXJlZmVyZW5jZUVFRTV2YWx1ZUVTQ19FNHR5cGVFTlNBX0lQS1M2X0VFU0VfU0VfPNYBX19aTlN0M19fMjZ2ZWN0b3JJak5TXzlhbGxvY2F0b3JJakVFRTZpbnNlcnRJTlNfMTFfX3dyYXBfaXRlcklQakVFRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMTZpc19jb25zdHJ1Y3RpYmxlSWpOU18xNWl0ZXJhdG9yX3RyYWl0c0lTOV9FOXJlZmVyZW5jZUVFRTV2YWx1ZUVTN19FNHR5cGVFTlM1X0lQS2pFRVM5X1M5Xz0QX19aTjdDSEFJTl90RDJFdj6NAV9fWk5TdDNfXzI2X190cmVlSU5TXzEyX192YWx1ZV90eXBlSWNpRUVOU18xOV9fbWFwX3ZhbHVlX2NvbXBhcmVJY1MyX05TXzRsZXNzSWNFRUxiMUVFRU5TXzlhbGxvY2F0b3JJUzJfRUVFN2Rlc3Ryb3lFUE5TXzExX190cmVlX25vZGVJUzJfUHZFRT8OX19aTjVQREJfdEQyRXZAOV9fWk5TdDNfXzIxM19fdmVjdG9yX2Jhc2VJNkFUT01fdE5TXzlhbGxvY2F0b3JJUzFfRUVFRDJFdkHBAV9fWk5TdDNfXzI2X190cmVlSU5TXzEyX192YWx1ZV90eXBlSU5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVpRUVOU18xOV9fbWFwX3ZhbHVlX2NvbXBhcmVJUzdfUzhfTlNfNGxlc3NJUzdfRUVMYjFFRUVOUzVfSVM4X0VFRTdkZXN0cm95RVBOU18xMV9fdHJlZV9ub2RlSVM4X1B2RUVCwQFfX1pOU3QzX18yNl9fdHJlZUlOU18xMl9fdmFsdWVfdHlwZUlOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFY0VFTlNfMTlfX21hcF92YWx1ZV9jb21wYXJlSVM3X1M4X05TXzRsZXNzSVM3X0VFTGIxRUVFTlM1X0lTOF9FRUU3ZGVzdHJveUVQTlNfMTFfX3RyZWVfbm9kZUlTOF9QdkVFQ+UBX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRTZpbnNlcnRJUEtjRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMzhfX2xpYmNwcF9zdHJpbmdfZ2V0c19ub2V4Y2VwdF9pdGVyYXRvcklTQV9FRTV2YWx1ZUVOU18xMV9fd3JhcF9pdGVySVBjRUVFNHR5cGVFTlNCX0lTOF9FRVNBX1NBX0S3AV9fWk5TdDNfXzI2dmVjdG9ySWROU185YWxsb2NhdG9ySWRFRUU2YXNzaWduSVBkRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMTZpc19jb25zdHJ1Y3RpYmxlSWROU18xNWl0ZXJhdG9yX3RyYWl0c0lTN19FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM3X1M3X0W+AV9fWk5TdDNfXzI2X190cmVlSU5TXzEyX192YWx1ZV90eXBlSWNpRUVOU18xOV9fbWFwX3ZhbHVlX2NvbXBhcmVJY1MyX05TXzRsZXNzSWNFRUxiMUVFRU5TXzlhbGxvY2F0b3JJUzJfRUVFMTRfX2Fzc2lnbl9tdWx0aUlOU18yMV9fdHJlZV9jb25zdF9pdGVyYXRvcklTMl9QTlNfMTFfX3RyZWVfbm9kZUlTMl9QdkVFbEVFRUV2VF9TSF9GxAFfX1pOU3QzX18yNnZlY3Rvckk3Q0hBSU5fdE5TXzlhbGxvY2F0b3JJUzFfRUVFNmFzc2lnbklQUzFfRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMTZpc19jb25zdHJ1Y3RpYmxlSVMxX05TXzE1aXRlcmF0b3JfdHJhaXRzSVM4X0U5cmVmZXJlbmNlRUVFNXZhbHVlRXZFNHR5cGVFUzhfUzhfRxNfX1pON01PREVMX3RDMkVSS1NfSPcBX19aTlN0M19fMjZfX3RyZWVJTlNfMTJfX3ZhbHVlX3R5cGVJY2lFRU5TXzE5X19tYXBfdmFsdWVfY29tcGFyZUljUzJfTlNfNGxlc3NJY0VFTGIxRUVFTlNfOWFsbG9jYXRvcklTMl9FRUUxMl9fZmluZF9lcXVhbEljRUVSUE5TXzE2X190cmVlX25vZGVfYmFzZUlQdkVFTlNfMjFfX3RyZWVfY29uc3RfaXRlcmF0b3JJUzJfUE5TXzExX190cmVlX25vZGVJUzJfU0NfRUVsRUVSUE5TXzE1X190cmVlX2VuZF9ub2RlSVNFX0VFU0ZfUktUX0lLX19aTlN0M19fMjI3X190cmVlX2JhbGFuY2VfYWZ0ZXJfaW5zZXJ0SVBOU18xNl9fdHJlZV9ub2RlX2Jhc2VJUHZFRUVFdlRfUzVfSjZfX1pOU3QzX18yNnZlY3Rvckk3Q0hBSU5fdE5TXzlhbGxvY2F0b3JJUzFfRUVFQzJFUktTNF9LE19fWk43Q0hBSU5fdEMyRVJLU19MuwJfX1pOU3QzX18yNl9fdHJlZUlOU18xMl9fdmFsdWVfdHlwZUlOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFaUVFTlNfMTlfX21hcF92YWx1ZV9jb21wYXJlSVM3X1M4X05TXzRsZXNzSVM3X0VFTGIxRUVFTlM1X0lTOF9FRUUzMF9fZW1wbGFjZV9oaW50X3VuaXF1ZV9rZXlfYXJnc0lTN19KUktOU180cGFpcklLUzdfaUVFRUVFTlNfMTVfX3RyZWVfaXRlcmF0b3JJUzhfUE5TXzExX190cmVlX25vZGVJUzhfUHZFRWxFRU5TXzIxX190cmVlX2NvbnN0X2l0ZXJhdG9ySVM4X1NQX2xFRVJLVF9EcE9UMF9NuwJfX1pOU3QzX18yNl9fdHJlZUlOU18xMl9fdmFsdWVfdHlwZUlOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFY0VFTlNfMTlfX21hcF92YWx1ZV9jb21wYXJlSVM3X1M4X05TXzRsZXNzSVM3X0VFTGIxRUVFTlM1X0lTOF9FRUUzMF9fZW1wbGFjZV9oaW50X3VuaXF1ZV9rZXlfYXJnc0lTN19KUktOU180cGFpcklLUzdfY0VFRUVFTlNfMTVfX3RyZWVfaXRlcmF0b3JJUzhfUE5TXzExX190cmVlX25vZGVJUzhfUHZFRWxFRU5TXzIxX190cmVlX2NvbnN0X2l0ZXJhdG9ySVM4X1NQX2xFRVJLVF9EcE9UMF9OOF9fWk5TdDNfXzI2dmVjdG9ySTlSRVNJRFVFX3ROU185YWxsb2NhdG9ySVMxX0VFRUMyRVJLUzRfTz5fX1pOU3QzX18yNnZlY3RvcklOUzBfSWhOU185YWxsb2NhdG9ySWhFRUVFTlMxX0lTM19FRUVDMkVSS1M1X1BfX19aTlN0M19fMjZ2ZWN0b3JJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TNF9JUzZfRUVFQzJFUktTOF9RFV9fWk45UkVTSURVRV90QzJFUktTX1ISX19aTjZBVE9NX3RDMkVSS1NfU60CX19aTlN0M19fMjZfX3RyZWVJTlNfMTJfX3ZhbHVlX3R5cGVJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRWNFRU5TXzE5X19tYXBfdmFsdWVfY29tcGFyZUlTN19TOF9OU180bGVzc0lTN19FRUxiMUVFRU5TNV9JUzhfRUVFMTJfX2ZpbmRfZXF1YWxJUzdfRUVSUE5TXzE2X190cmVlX25vZGVfYmFzZUlQdkVFTlNfMjFfX3RyZWVfY29uc3RfaXRlcmF0b3JJUzhfUE5TXzExX190cmVlX25vZGVJUzhfU0hfRUVsRUVSUE5TXzE1X190cmVlX2VuZF9ub2RlSVNKX0VFU0tfUktUX1TvAV9fWk5TdDNfXzI2X190cmVlSU5TXzEyX192YWx1ZV90eXBlSU5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVjRUVOU18xOV9fbWFwX3ZhbHVlX2NvbXBhcmVJUzdfUzhfTlNfNGxlc3NJUzdfRUVMYjFFRUVOUzVfSVM4X0VFRTEyX19maW5kX2VxdWFsSVM3X0VFUlBOU18xNl9fdHJlZV9ub2RlX2Jhc2VJUHZFRVJQTlNfMTVfX3RyZWVfZW5kX25vZGVJU0pfRUVSS1RfVRNfX1pON0NIQUlOX3RhU0VSS1NfVvIBX19aTlN0M19fMjZfX3RyZWVJTlNfMTJfX3ZhbHVlX3R5cGVJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRWlFRU5TXzE5X19tYXBfdmFsdWVfY29tcGFyZUlTN19TOF9OU180bGVzc0lTN19FRUxiMUVFRU5TNV9JUzhfRUVFMTRfX2Fzc2lnbl9tdWx0aUlOU18yMV9fdHJlZV9jb25zdF9pdGVyYXRvcklTOF9QTlNfMTFfX3RyZWVfbm9kZUlTOF9QdkVFbEVFRUV2VF9TTV9X8gFfX1pOU3QzX18yNl9fdHJlZUlOU18xMl9fdmFsdWVfdHlwZUlOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFY0VFTlNfMTlfX21hcF92YWx1ZV9jb21wYXJlSVM3X1M4X05TXzRsZXNzSVM3X0VFTGIxRUVFTlM1X0lTOF9FRUUxNF9fYXNzaWduX211bHRpSU5TXzIxX190cmVlX2NvbnN0X2l0ZXJhdG9ySVM4X1BOU18xMV9fdHJlZV9ub2RlSVM4X1B2RUVsRUVFRXZUX1NNX1jGAV9fWk5TdDNfXzI2dmVjdG9ySTlSRVNJRFVFX3ROU185YWxsb2NhdG9ySVMxX0VFRTZhc3NpZ25JUFMxX0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTMV9OU18xNWl0ZXJhdG9yX3RyYWl0c0lTOF9FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM4X1M4X1nMAV9fWk5TdDNfXzI2dmVjdG9ySU5TMF9Jak5TXzlhbGxvY2F0b3JJakVFRUVOUzFfSVMzX0VFRTZhc3NpZ25JUFMzX0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTM19OU18xNWl0ZXJhdG9yX3RyYWl0c0lTOV9FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM5X1M5X1q3AV9fWk5TdDNfXzI2dmVjdG9ySWNOU185YWxsb2NhdG9ySWNFRUU2YXNzaWduSVBjRUVOU185ZW5hYmxlX2lmSVhhYXNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZXNyMTZpc19jb25zdHJ1Y3RpYmxlSWNOU18xNWl0ZXJhdG9yX3RyYWl0c0lTN19FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM3X1M3X1vMAV9fWk5TdDNfXzI2dmVjdG9ySU5TMF9JZE5TXzlhbGxvY2F0b3JJZEVFRUVOUzFfSVMzX0VFRTZhc3NpZ25JUFMzX0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTM19OU18xNWl0ZXJhdG9yX3RyYWl0c0lTOV9FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM5X1M5X1zMAV9fWk5TdDNfXzI2dmVjdG9ySU5TMF9JaE5TXzlhbGxvY2F0b3JJaEVFRUVOUzFfSVMzX0VFRTZhc3NpZ25JUFMzX0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTM19OU18xNWl0ZXJhdG9yX3RyYWl0c0lTOV9FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM5X1M5X13tAV9fWk5TdDNfXzI2dmVjdG9ySU5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVOUzRfSVM2X0VFRTZhc3NpZ25JUFM2X0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTNl9OU18xNWl0ZXJhdG9yX3RyYWl0c0lTQ19FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVNDX1NDX17DAV9fWk5TdDNfXzI2dmVjdG9ySTZBVE9NX3ROU185YWxsb2NhdG9ySVMxX0VFRTZhc3NpZ25JUFMxX0VFTlNfOWVuYWJsZV9pZklYYWFzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVzcjE2aXNfY29uc3RydWN0aWJsZUlTMV9OU18xNWl0ZXJhdG9yX3RyYWl0c0lTOF9FOXJlZmVyZW5jZUVFRTV2YWx1ZUV2RTR0eXBlRVM4X1M4X18+X19aTlN0M19fMjZ2ZWN0b3JJNkFUT01fdE5TXzlhbGxvY2F0b3JJUzFfRUVFMTNfX3ZkZWFsbG9jYXRlRXZggAJfX1pOU3QzX18yNl9fdHJlZUlOU18xMl9fdmFsdWVfdHlwZUlOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFY0VFTlNfMTlfX21hcF92YWx1ZV9jb21wYXJlSVM3X1M4X05TXzRsZXNzSVM3X0VFTGIxRUVFTlM1X0lTOF9FRUUxNV9fZW1wbGFjZV9tdWx0aUlKUktOU180cGFpcklLUzdfY0VFRUVFTlNfMTVfX3RyZWVfaXRlcmF0b3JJUzhfUE5TXzExX190cmVlX25vZGVJUzhfUHZFRWxFRURwT1RfYYACX19aTlN0M19fMjZfX3RyZWVJTlNfMTJfX3ZhbHVlX3R5cGVJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRWlFRU5TXzE5X19tYXBfdmFsdWVfY29tcGFyZUlTN19TOF9OU180bGVzc0lTN19FRUxiMUVFRU5TNV9JUzhfRUVFMTVfX2VtcGxhY2VfbXVsdGlJSlJLTlNfNHBhaXJJS1M3X2lFRUVFRU5TXzE1X190cmVlX2l0ZXJhdG9ySVM4X1BOU18xMV9fdHJlZV9ub2RlSVM4X1B2RUVsRUVEcE9UX2KUAV9fWjE0cmVhZFN0cnVjdHVyZXNQS2NTMF9STlN0M19fMjZ2ZWN0b3JJTlMxXzEyYmFzaWNfc3RyaW5nSWNOUzFfMTFjaGFyX3RyYWl0c0ljRUVOUzFfOWFsbG9jYXRvckljRUVFRU5TNl9JUzhfRUVFRVNCX1IyNXN0cnVjdHVyZUluZm9ybWF0aW9uQ2xhc3NTRF9jJl9fWk4yNXN0cnVjdHVyZUluZm9ybWF0aW9uQ2xhc3NhU0VSS1NfZCNfX1pOMjVzdHJ1Y3R1cmVJbmZvcm1hdGlvbkNsYXNzRDJFdmV6X19aTlN0M19fMjZ2ZWN0b3JJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TNF9JUzZfRUVFMjFfX3B1c2hfYmFja19zbG93X3BhdGhJUktTNl9FRXZPVF9mXV9fWjE5ZnNhc3RyMlNlcUFsaWdubWVudFJOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVM2X1M2X2ccX19aMjFnZXRVbmFsaWduZWRGU0FTdHJpbmdtbWgcX19HTE9CQUxfX3N1Yl9JX3BkYkNsYXNzX2NwcGkXX19aTjZBVE9NX3Q3cHJvY2Vzc0VQS2NqIF9fWk5LNkFUT01fdDE2Z2V0UmVzSWRlbnRpZmllckV2a0pfX1pOS1N0M19fMjE1YmFzaWNfc3RyaW5nYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRTNzdHJFdmxHX19aTlN0M19fMjE1YmFzaWNfc3RyaW5nYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUQyRXZtR19fWk5TdDNfXzIxNWJhc2ljX3N0cmluZ2J1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVEMEV2bmNfX1pOU3QzX18yMTViYXNpY19zdHJpbmdidWZJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFN3NlZWtvZmZFeE5TXzhpb3NfYmFzZTdzZWVrZGlyRWpvZV9fWk5TdDNfXzIxNWJhc2ljX3N0cmluZ2J1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU3c2Vla3Bvc0VOU180ZnBvc0kxMV9fbWJzdGF0ZV90RUVqcE9fX1pOU3QzX18yMTViYXNpY19zdHJpbmdidWZJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFOXVuZGVyZmxvd0V2cU9fX1pOU3QzX18yMTViYXNpY19zdHJpbmdidWZJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFOXBiYWNrZmFpbEVpck5fX1pOU3QzX18yMTViYXNpY19zdHJpbmdidWZJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFOG92ZXJmbG93RWlzSl9fWk5TdDNfXzIxOGJhc2ljX3N0cmluZ3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVEMUV2dEpfX1pOU3QzX18yMThiYXNpY19zdHJpbmdzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRDBFdnVPX19aVGhuOF9OU3QzX18yMThiYXNpY19zdHJpbmdzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRDFFdnZPX19aVGhuOF9OU3QzX18yMThiYXNpY19zdHJpbmdzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRDBFdndSX19aVHYwX24xMl9OU3QzX18yMThiYXNpY19zdHJpbmdzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRDFFdnhSX19aVHYwX24xMl9OU3QzX18yMThiYXNpY19zdHJpbmdzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRDBFdnlGX19aTlN0M19fMjZ2ZWN0b3JJZE5TXzlhbGxvY2F0b3JJZEVFRTIxX19wdXNoX2JhY2tfc2xvd19wYXRoSVJLZEVFdk9UX3ohX19aTjlSRVNJRFVFX3QxM2dldEF0b21SZWNvcmRFUEtjexxfX1pOOVJFU0lEVUVfdDlnZXRDb29yZHNFUEtjfCNfX1pOSzlSRVNJRFVFX3QxNmdldFJlc0lkZW50aWZpZXJFdn3iAV9fWk5TdDNfXzI2X190cmVlSU5TXzEyX192YWx1ZV90eXBlSU5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVpRUVOU18xOV9fbWFwX3ZhbHVlX2NvbXBhcmVJUzdfUzhfTlNfNGxlc3NJUzdfRUVMYjFFRUVOUzVfSVM4X0VFRTRmaW5kSVM3X0VFTlNfMTVfX3RyZWVfaXRlcmF0b3JJUzhfUE5TXzExX190cmVlX25vZGVJUzhfUHZFRWxFRVJLVF9+Gl9fWk45UkVTSURVRV90N3Byb2Nlc3NFUEtjf1BfX1pOU3QzX18yNnZlY3Rvckk2QVRPTV90TlNfOWFsbG9jYXRvcklTMV9FRUUyMV9fcHVzaF9iYWNrX3Nsb3dfcGF0aElSS1MxX0VFdk9UX4ABO19fWk5TdDNfXzIxNF9fc3BsaXRfYnVmZmVySTZBVE9NX3RSTlNfOWFsbG9jYXRvcklTMV9FRUVEMkV2gQEQX19aTjdDSEFJTl90QzJFdoIBHl9fWk43Q0hBSU5fdDE0c2V0UHltb2xDb2xvcnNFdoMBeF9fWk5TdDNfXzI2dmVjdG9ySU5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVOUzRfSVM2X0VFRTIxX19wdXNoX2JhY2tfc2xvd19wYXRoSVM2X0VFdk9UX4QBIl9fWk43Q0hBSU5fdDE2aXNSZXNpZHVlSW5kZXhlZEVQS2OFAVlfX1pOU3QzX18yNnZlY3RvcklOUzBfSWROU185YWxsb2NhdG9ySWRFRUVFTlMxX0lTM19FRUUyMV9fcHVzaF9iYWNrX3Nsb3dfcGF0aElSS1MzX0VFdk9UX4YBsQFfX1pON0NIQUlOX3QxOGdldENBQ29vcmRzT2ZDaGFpbkVSTlN0M19fMjZ2ZWN0b3JJTlMxX0lkTlMwXzlhbGxvY2F0b3JJZEVFRUVOUzJfSVM0X0VFRUVSTlMwXzEyYmFzaWNfc3RyaW5nSWNOUzBfMTFjaGFyX3RyYWl0c0ljRUVOUzJfSWNFRUVFUk5TMV9JU0NfTlMyX0lTQ19FRUVFUk5TMV9Jak5TMl9JakVFRUWHASJfX1pON0NIQUlOX3QxOGNvbXB1dGVQaGlQc2lPbWVnYUV2iAEYX19aTjdDSEFJTl90N3Byb2Nlc3NFUEtjiQFTX19aTlN0M19fMjZ2ZWN0b3JJOVJFU0lEVUVfdE5TXzlhbGxvY2F0b3JJUzFfRUVFMjFfX3B1c2hfYmFja19zbG93X3BhdGhJUktTMV9FRXZPVF+KARhfX1pON01PREVMX3Q3cHJvY2Vzc0VQS2OLAVFfX1pOU3QzX18yNnZlY3Rvckk3Q0hBSU5fdE5TXzlhbGxvY2F0b3JJUzFfRUVFMjFfX3B1c2hfYmFja19zbG93X3BhdGhJUktTMV9FRXZPVF+MARJfX1pON0NIQUlOX3RDMkVPU1+NAVBfX1pONVBEQl90QzJFUEtjTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOUzJfMTFjaGFyX3RyYWl0c0ljRUVOUzJfOWFsbG9jYXRvckljRUVFRY4BF19fWk41UERCX3Q4cGFyc2VQREJFUEtjjwFRX19aTlN0M19fMjZ2ZWN0b3JJN01PREVMX3ROU185YWxsb2NhdG9ySVMxX0VFRTIxX19wdXNoX2JhY2tfc2xvd19wYXRoSVJLUzFfRUV2T1RfkAEcX19aTjVQREJfdDE0Z2V0QWxsQ2hhaW5JRHNFapEBsQFfX1pONVBEQl90MThnZXRDQUNvb3Jkc09mQ2hhaW5FamNSTlN0M19fMjZ2ZWN0b3JJTlMxX0lkTlMwXzlhbGxvY2F0b3JJZEVFRUVOUzJfSVM0X0VFRUVSTlMwXzEyYmFzaWNfc3RyaW5nSWNOUzBfMTFjaGFyX3RyYWl0c0ljRUVOUzJfSWNFRUVFUk5TMV9JU0NfTlMyX0lTQ19FRUVFUk5TMV9Jak5TMl9JakVFRUWSAStfX1oxOXRyaXBsZXRNRlBXZWlnaHRpbmcxN01GUExpYnJhcnlDbGFzc190kwFsX19aMjBpZGVudGlmeUZpbHRlcmVkTUZQc1JOU3QzX18yNnZlY3RvckkxME1GUENsYXNzX3ROU185YWxsb2NhdG9ySVMxX0VFRUVSTlMwX0lOUzBfSWZOUzJfSWZFRUVFTlMyX0lTN19FRUVFlAFVX19aMTRzb3J0QnlMb2NpTUZQc1JOU3QzX18yNnZlY3RvcklOUzBfSTEwTUZQQ2xhc3NfdE5TXzlhbGxvY2F0b3JJUzFfRUVFRU5TMl9JUzRfRUVFRZUBUF9fWjI2c29ydERlY3JlYXNpbmdCeUxlbmd0aE1GUHNSTlN0M19fMjZ2ZWN0b3JJMTBNRlBDbGFzc190TlNfOWFsbG9jYXRvcklTMV9FRUVFlgF5X19aMzNzb3J0Q2x1c3RlcnNEZWNyZWFzaW5nQnlGb290cHJpbnRSTlN0M19fMjZ2ZWN0b3JJTlMwX0kxME1GUENsYXNzX3ROU185YWxsb2NhdG9ySVMxX0VFRUVOUzJfSVM0X0VFRUVSTlMwX0ltTlMyX0ltRUVFRZcBUl9fWjExY2x1c3Rlck1GUHNSTlN0M19fMjZ2ZWN0b3JJMTBNRlBDbGFzc190TlNfOWFsbG9jYXRvcklTMV9FRUVFUk5TMF9JbU5TMl9JbUVFRUWYAWZfX1pOU3QzX18yNnZlY3RvcklOUzBfSTEwTUZQQ2xhc3NfdE5TXzlhbGxvY2F0b3JJUzFfRUVFRU5TMl9JUzRfRUVFMjFfX3B1c2hfYmFja19zbG93X3BhdGhJUktTNF9FRXZPVF+ZAUFfX1oyMmNsdXN0ZXJWYWxpZGl0eUJpdG1hc2tSTlN0M19fMjZ2ZWN0b3JJbU5TXzlhbGxvY2F0b3JJbUVFRUVtbZoBOl9fWjIyZ2VuZXJhdGVTZWVkQWxpZ25tZW50c1IyNXN0cnVjdHVyZUluZm9ybWF0aW9uQ2xhc3NTMF+bAR5fX1pOMTdNRlBMaWJyYXJ5Q2xhc3NfdEMyRVJLU1+cAS9fX1pOU3QzX18yNnZlY3RvckliTlNfOWFsbG9jYXRvckliRUVFN3Jlc2VydmVFbZ0BnwFfX1pOU3QzX18yNnZlY3RvckliTlNfOWFsbG9jYXRvckliRUVFMThfX2NvbnN0cnVjdF9hdF9lbmRJTlNfMTRfX2JpdF9pdGVyYXRvcklTM19MYjBFTG0wRUVFRUVOU185ZW5hYmxlX2lmSVhzcjIxX19pc19mb3J3YXJkX2l0ZXJhdG9ySVRfRUU1dmFsdWVFdkU0dHlwZUVTOF9TOF+eAX9fX1pOU3QzX18yMTZfX2NvcHlfdW5hbGlnbmVkSU5TXzZ2ZWN0b3JJYk5TXzlhbGxvY2F0b3JJYkVFRUVMYjBFRUVOU18xNF9fYml0X2l0ZXJhdG9ySVRfTGIwRVhMaTBFRUVFTlM1X0lTNl9YVDBfRVhMaTBFRUVFUzhfUzdfnwEgX19aMjNjb21wdXRlRGlyZWN0aW9uQ29zaW5lc1BkU1+gARhfX1oxM2NvbXB1dGVOb3JtYWxQZFNfU1+hARxfX1oxN2NvbXB1dGVEb3RQcm9kdWN0UGRTX1JkogEeX19aMTdjb21wdXRlQm94UHJvZHVjdFBkU19TX1JkowEnX19aMjBjb21wdXRlRGloZWRyYWxBbmdsZVBLZFMwX1MwX1MwX1JkpAEiX19aMjNjb21wdXRlVmVjdG9yRGlmZmVyZW5jZVBkU19TX6UBFl9fWjExbm9ybUFtaW51c0JQS2RTMF+mARJfX1oxMHZlY3Rvck5vcm1QS2SnARVfX1oxMmNvbXB1dGVBbmdsZVBkU1+oASFfX1oxOHByb2plY3RQb2ludDJQbGFuZVBkU19TX1NfU1+pAWlfX1pOMTZTdXBlcnBvc2UzRENsYXNzMjNjb21wdXRlUm90YXRpb25hbENlbnRlckVSTlN0M19fMjZ2ZWN0b3JJTlMxX0lkTlMwXzlhbGxvY2F0b3JJZEVFRUVOUzJfSVM0X0VFRUVTN1+qAWlfX1pOMTZTdXBlcnBvc2UzRENsYXNzMjNjb21wdXRlUXVhdGVybmlvbk1hdHJpeEVSTlN0M19fMjZ2ZWN0b3JJTlMxX0lkTlMwXzlhbGxvY2F0b3JJZEVFRUVOUzJfSVM0X0VFRUVTN1+rAW1fX1pOMTZTdXBlcnBvc2UzRENsYXNzMjdjb21wdXRlU3VmZmljaWVudFN0YXRpc3RpY3NFUk5TdDNfXzI2dmVjdG9ySU5TMV9JZE5TMF85YWxsb2NhdG9ySWRFRUVFTlMyX0lTNF9FRUVFUzdfrAE9X19aTjE2U3VwZXJwb3NlM0RDbGFzczM1dXBkYXRlU3VmZmljaWVudFN0YXRpc3RpY3NfYWRkaXRpb25Fdq0BH19fWk4xNlN1cGVycG9zZTNEQ2xhc3M2ZWlnc3J0RXauASVfX1pOMTZTdXBlcnBvc2UzRENsYXNzMTFkaWFnb25hbGl6ZUV2rwEvX19aTjE2U3VwZXJwb3NlM0RDbGFzczIxdXBkYXRlTFNxRml0X2FkZGl0aW9uRXawAVJfX1pOMTZTdXBlcnBvc2UzRENsYXNzQzJFUk5TdDNfXzI2dmVjdG9ySU5TMV9JZE5TMF85YWxsb2NhdG9ySWRFRUVFTlMyX0lTNF9FRUVFUzdfsQFVX19aTjE2U3VwZXJwb3NlM0RDbGFzc0MyRVJOU3QzX18yNnZlY3RvcklOUzFfSWROUzBfOWFsbG9jYXRvcklkRUVFRU5TMl9JUzRfRUVFRVM3X21tbbIBLV9fWk4xNlN1cGVycG9zZTNEQ2xhc3NDMkVSMTNTdWZmU3RhdENsYXNzUzFfY7MBQV9fWk4xNlN1cGVycG9zZTNEQ2xhc3NDMkVSTlN0M19fMjZ2ZWN0b3JJZE5TMF85YWxsb2NhdG9ySWRFRUVFUzVftAFSX19aTjE2U3VwZXJwb3NlM0RDbGFzc0MyRVIxM1N1ZmZTdGF0Q2xhc3NSTlN0M19fMjZ2ZWN0b3JJZE5TMl85YWxsb2NhdG9ySWRFRUVFUzdfY7UBMV9fWk4xNlN1cGVycG9zZTNEQ2xhc3MyM2dldFN1ZmZpY2llbnRTdGF0aXN0aWNzRXa2ARpfX1pOMTZTdXBlcnBvc2UzRENsYXNzQzJFdrcBX19fWk4xNlN1cGVycG9zZTNEQ2xhc3MxNnRyYW5zZm9ybVZlY3RvcnNFUk5TdDNfXzI2dmVjdG9ySU5TMV9JZE5TMF85YWxsb2NhdG9ySWRFRUVFTlMyX0lTNF9FRUVFuAEhX19aMjVjb21iaW5hdG9yaWFsVG9wb2ZpdFNjb3JlbWZtuQEMX19aN2Nob29zZTJtugEMX19aN2Nob29zZTNtuwFTX19aMTVjYW5vbmljYWxpemVmc2FSTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUW8AU5fX1oxMWdldG5NYXRjaGVzTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUW9AVJfX1oxNWdldG5NYXRjaEJsb2Nrc05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFvgFSX19aMTVnZXRuUmlnaWRCbG9ja3NOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRb8BTV9fWjEwZ2V0bkhpbmdlc05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFwAFUX19aMTdnZXRIaW5nZVBvc2l0aW9uc05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFwQGJAV9fWjI3c3VwZXJwb3NlVG9uU1VzaW5nQWxpZ25tZW50TlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVSTlNfNnZlY3RvcklOUzZfSWROUzNfSWRFRUVFTlMzX0lTOF9FRUVFU0JfwgEvX19aNWR2MmRhUk5TdDNfXzI2dmVjdG9ySWROU185YWxsb2NhdG9ySWRFRUVFUGTDAVtfX1oyNHByaW50VG9UZXJtaW5hbE1zZ1N0YXR1c05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFxAFaX19aMjJnZXRUZXJtaW5hbENvbG9yU3RyaW5nTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVtxQFLX19aTlN0M19fMjE5YmFzaWNfb3N0cmluZ3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVEMUV2xgFLX19aTlN0M19fMjE5YmFzaWNfb3N0cmluZ3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVEMEV2xwFTX19aVHYwX24xMl9OU3QzX18yMTliYXNpY19vc3RyaW5nc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUQxRXbIAVNfX1pUdjBfbjEyX05TdDNfXzIxOWJhc2ljX29zdHJpbmdzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRDBFdskBHl9fWjIxcHJpbnRQZXJjZW50Q29tcGxldGVkbW1tbcoBGl9fWk4xNktlbnRNaXh0dXJlTW9kZWxDMkV2ywEjX19aTksxNktlbnRNaXh0dXJlTW9kZWw5Y29tcG9uZW50RWrMARlfX1oxMmNhbm9uaWNhbGl6ZVBkU19TX1NfzQFnX19aTjIyQ0FDb29yZGluYXRlRW5jb2RpbmdfdEMyRU5TdDNfXzI2dmVjdG9ySU5TMV9JZE5TMF85YWxsb2NhdG9ySWRFRUVFTlMyX0lTNF9FRUVFUjE2S2VudE1peHR1cmVNb2RlbM4BdF9fWk4yMkNBQ29vcmRpbmF0ZUVuY29kaW5nX3QyOGdldFJld2VpZ2h0ZWRJVGhldGFQaGlSYWRpdXNFbVJOU3QzX18yNnZlY3RvcklkTlMwXzlhbGxvY2F0b3JJZEVFRUVSMTZLZW50TWl4dHVyZU1vZGVszwFvX19aMjFjb21wdXRlSUFuZXdTeW1tZXRyaWNOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVJOU182dmVjdG9ySWROUzNfSWRFRUVF0AFHX19aMjFnZXRQb3NpdGlvbmFsRW5jb2RpbmdOU3QzX18yNnZlY3RvcklkTlNfOWFsbG9jYXRvcklkRUVFRVMzX1MzX1MzX2TRAXtfX1oxM2NvbXB1dGVJdmFsdWVOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TXzZ2ZWN0b3JJTlM2X0lkTlMzX0lkRUVFRU5TM19JUzhfRUVFRVNBX2LSAYwBX19aMzBhbGlnbkNsb3Nlc3RBZnRlclN1cGVycG9zaXRpb25OU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TXzZ2ZWN0b3JJTlM2X0lkTlMzX0lkRUVFRU5TM19JUzhfRUVFRVNBX2TTAVlfX1pOU3QzX18yNnZlY3RvcklOUzBfSWZOU185YWxsb2NhdG9ySWZFRUVFTlMxX0lTM19FRUUyMV9fcHVzaF9iYWNrX3Nsb3dfcGF0aElSS1MzX0VFdk9UX9QBSF9fWjEzc2V0TUJsb2NrVHlwZVJOU3QzX18yNnZlY3RvcklOUzBfSWlOU185YWxsb2NhdG9ySWlFRUVFTlMxX0lTM19FRUVFbdUBVF9fWjE3ZmluZE1hdGNoZWRCbG9ja3NOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRdYBSl9fWjE3bUJsb2NrczJGU0FTdHJpbmdOU3QzX18yNnZlY3RvcklOUzBfSWlOU185YWxsb2NhdG9ySWlFRUVFTlMxX0lTM19FRUVF1wFcX19aMzBzaGlmdE1hdGNoZXNTcGVjaWZpY01hdGNoQmxvY2tOU3QzX18yNnZlY3RvcklOUzBfSWlOU185YWxsb2NhdG9ySWlFRUVFTlMxX0lTM19FRUVFbWJsUmLYAVZfX1oyNGV4dGVuZFNwZWNpZmljTWF0Y2hCbG9ja05TdDNfXzI2dmVjdG9ySU5TMF9JaU5TXzlhbGxvY2F0b3JJaUVFRUVOUzFfSVMzX0VFRUVtYmxSYtkBVl9fWjI0c2hyaW5rU3BlY2lmaWNNYXRjaEJsb2NrTlN0M19fMjZ2ZWN0b3JJTlMwX0lpTlNfOWFsbG9jYXRvcklpRUVFRU5TMV9JUzNfRUVFRW1ibFJi2gFSX19aMjJudWtlU3BlY2lmaWNNYXRjaEJsb2NrTlN0M19fMjZ2ZWN0b3JJTlMwX0lpTlNfOWFsbG9jYXRvcklpRUVFRU5TMV9JUzNfRUVFRW1SYtsBYF9fWjM0c2xpZGVTcGVjaWZpY01hdGNoQmxvY2tXaXRob3V0R2Fwc05TdDNfXzI2dmVjdG9ySU5TMF9JaU5TXzlhbGxvY2F0b3JJaUVFRUVOUzFfSVMzX0VFRUVtYm1SYtwBqwFfX1oyNXJlQWxpZ25TcGVjaWZpY01hdGNoQmxvY2tOU3QzX18yNnZlY3RvcklOUzBfSWlOU185YWxsb2NhdG9ySWlFRUVFTlMxX0lTM19FRUVFbU5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TMV9JY0VFRUVOUzBfSU5TMF9JZE5TMV9JZEVFRUVOUzFfSVNDX0VFRUVTRV9kUmLdAVlfX1pOU3QzX18ycGxJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TXzEyYmFzaWNfc3RyaW5nSVRfVDBfVDFfRUVSS1M5X1NCX94BdV9fWjlFTUNsb3Nlc3ROU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TXzZ2ZWN0b3JJTlM2X0lkTlMzX0lkRUVFRU5TM19JUzhfRUVFRVNBX98Bd19fWjI1d29yc3REaXN0YW5jZVBhaXJJbk1CbG9ja05TdDNfXzI2dmVjdG9ySU5TMF9JaU5TXzlhbGxvY2F0b3JJaUVFRUVOUzFfSVMzX0VFRUVOUzBfSU5TMF9JZE5TMV9JZEVFRUVOUzFfSVM3X0VFRUVTOV9k4AF2X19aOEVNaXZhbHVlTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVOU182dmVjdG9ySU5TNl9JZE5TM19JZEVFRUVOUzNfSVM4X0VFRUVTQV9SZOEBhgFfX1oyM2V4cGVjdGF0aW9uTWF4aW1pemF0aW9uTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVOU182dmVjdG9ySU5TNl9JZE5TM19JZEVFRUVOUzNfSVM4X0VFRUVTQV9SZOIBF19fWjJzUFBLY1BjUzBfUzBfUzFfUzFf4wFrX19aTjEwZW1zY3JpcHRlbjhpbnRlcm5hbDdJbnZva2VySVBjSlBLY1MyX1M0X1M0X1MyX1MyX0VFNmludm9rZUVQRlMyX1M0X1MyX1M0X1M0X1MyX1MyX0VTNF9TMl9TNF9TNF9TMl9TMl/kAYcBX19aMjdzb3J0QWxpZ25tZW50c09uQ29tcHJlc3Npb25STlN0M19fMjZ2ZWN0b3JJTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU5TNF9JUzZfRUVFRVJOUzBfSWROUzRfSWRFRUVF5QEFX21haW7mAQ5fX19zdGRpb19jbG9zZecBDl9fX3N0ZGlvX3dyaXRl6AENX19fc3RkaW9fc2Vla+kBEV9fX2Vycm5vX2xvY2F0aW9u6gENX19fc3RkaW9fcmVhZOsBGl9fX2Vtc2NyaXB0ZW5fc3Rkb3V0X2Nsb3Nl7AEZX19fZW1zY3JpcHRlbl9zdGRvdXRfc2Vla+0BC19zdHJ0b3VsbF9s7gELX3N0cnRveF83NTnvAQhfX19zaGxpbfABCl9fX2ludHNjYW7xAQlfX19zaGdldGPyAQhfX191Zmxvd/MBCV9fX3RvcmVhZPQBCl9zdHJ0b2xsX2z1AQdfc3RyY21w9gEHX21lbWNtcPcBCl92c25wcmludGb4AQdfZm10X2Zw+QEUX3BvcF9hcmdfbG9uZ19kb3VibGX6ARRfX192ZnByaW50Zl9pbnRlcm5hbPsBDF9wcmludGZfY29yZfwBBF9vdXT9AQdfZ2V0aW50/gEIX3BvcF9hcmf/AQZfZm10X3iAAgZfZm10X2+BAgZfZm10X3WCAgdfbWVtY2hygwIIX3BhZF82NTmEAgdfd2N0b21ihQIIX3djcnRvbWKGAgpfX19md3JpdGV4hwIKX19fdG93cml0ZYgCBl9mcmV4cIkCCV9zbl93cml0ZYoCB193Y3NsZW6LAgxfX19mbG9hdHNjYW6MAglfaGV4ZmxvYXSNAglfZGVjZmxvYXSOAghfc2NhbmV4cI8CB19zY2FsYm6QAgZfZm1vZGyRAghfc2NhbGJubJICBV9mbW9kkwIHX3N0cmxlbpQCCV9fX211bm1hcJUCDF9fX3N0cmNocm51bJYCC19mcmVlbG9jYWxllwIIX21icnRvd2OYAg1fX19nZXRfbG9jYWxlmQIMX19fbmV3bG9jYWxlmgIJX3NucHJpbnRmmwIJX19fc3RwY3B5nAIIX3dtZW1jcHmdAgZfX19zaW6eAgZfX19jb3OfAgtfX19yZW1fcGlvMqACEV9fX3JlbV9waW8yX2xhcmdloQIHX2Z3cml0ZaICCV9fX3N0cmR1cKMCB19mZmx1c2ikAhJfX19mZmx1c2hfdW5sb2NrZWSlAgdfc3NjYW5mpgIIX3Zzc2NhbmanAghfZG9fcmVhZKgCCF92ZnNjYW5mqQIGX2FyZ19uqgIKX3N0b3JlX2ludKsCDl9fX3N0cmluZ19yZWFkrAILX21ic25ydG93Y3OtAgpfbWJzcnRvd2NzrgILX3djc25ydG9tYnOvAgpfd2NzcnRvbWJzsAIIX3N0cm5jcHmxAgpfX19zdHBuY3B5sgIHX3N0cnNwbrMCBV9nZXRjtAIKX3Zhc3ByaW50ZrUCB191bmdldGO2Agdfc3RydG94twIFX2F0b2m4Aghfc3RyY3NwbrkCB19zdHJ0b2u6Aghfd21lbXNldLsCCV93bWVtbW92ZbwCBF9jb3O9AgRfc2luvgIFX2Fjb3O/AgRfZXhwwAIEX2xvZ8ECJl9fWk4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9EMkV2wgInX19aTjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9EMEV2wwJKX19aTksxMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvOWNhbl9jYXRjaEVQS05TXzE2X19zaGltX3R5cGVfaW5mb0VSUHbEAllfX1pOSzEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm8xNnNlYXJjaF9hYm92ZV9kc3RFUE5TXzE5X19keW5hbWljX2Nhc3RfaW5mb0VQS3ZTNF9pYsUCVl9fWk5LMTBfX2N4eGFiaXYxMTdfX2NsYXNzX3R5cGVfaW5mbzE2c2VhcmNoX2JlbG93X2RzdEVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVBLdmlixgJfX19aTksxMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvMjdoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2VFUE5TXzE5X19keW5hbWljX2Nhc3RfaW5mb0VQdmnHAh9fX1pMOGlzX2VxdWFsUEtTdDl0eXBlX2luZm9TMV9iyAJcX19aTksxMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvMjRwcm9jZXNzX2ZvdW5kX2Jhc2VfY2xhc3NFUE5TXzE5X19keW5hbWljX2Nhc3RfaW5mb0VQdmnJAmVfX1pOSzEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm8yOXByb2Nlc3Nfc3RhdGljX3R5cGVfYWJvdmVfZHN0RVBOU18xOV9fZHluYW1pY19jYXN0X2luZm9FUEt2UzRfacoCD19fX2R5bmFtaWNfY2FzdMsCXF9fWk5LMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mbzE2c2VhcmNoX2Fib3ZlX2RzdEVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVBLdlM0X2lizAJZX19aTksxMF9fY3h4YWJpdjEyMF9fc2lfY2xhc3NfdHlwZV9pbmZvMTZzZWFyY2hfYmVsb3dfZHN0RVBOU18xOV9fZHluYW1pY19jYXN0X2luZm9FUEt2aWLNAmJfX1pOSzEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm8yN2hhc191bmFtYmlndW91c19wdWJsaWNfYmFzZUVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVB2ac4CF19fWk5TdDExbG9naWNfZXJyb3JEMkV2zwIXX19aTlN0MTFsb2dpY19lcnJvckQwRXbQAhtfX1pOS1N0MTFsb2dpY19lcnJvcjR3aGF0RXbRAiJfX1pOU3QzX18yMThfX2xpYmNwcF9yZWZzdHJpbmdEMkV20gJQX19aTksxMF9fY3h4YWJpdjEyM19fZnVuZGFtZW50YWxfdHlwZV9pbmZvOWNhbl9jYXRjaEVQS05TXzE2X19zaGltX3R5cGVfaW5mb0VSUHbTAkxfX1pOSzEwX19jeHhhYml2MTE5X19wb2ludGVyX3R5cGVfaW5mbzljYW5fY2F0Y2hFUEtOU18xNl9fc2hpbV90eXBlX2luZm9FUlB21AJKX19aTksxMF9fY3h4YWJpdjExN19fcGJhc2VfdHlwZV9pbmZvOWNhbl9jYXRjaEVQS05TXzE2X19zaGltX3R5cGVfaW5mb0VSUHbVAlFfX1pOSzEwX19jeHhhYml2MTE5X19wb2ludGVyX3R5cGVfaW5mbzE2Y2FuX2NhdGNoX25lc3RlZEVQS05TXzE2X19zaGltX3R5cGVfaW5mb0XWAltfX1pOSzEwX19jeHhhYml2MTI5X19wb2ludGVyX3RvX21lbWJlcl90eXBlX2luZm8xNmNhbl9jYXRjaF9uZXN0ZWRFUEtOU18xNl9fc2hpbV90eXBlX2luZm9F1wJdX19aTksxMF9fY3h4YWJpdjEyMV9fdm1pX2NsYXNzX3R5cGVfaW5mbzE2c2VhcmNoX2Fib3ZlX2RzdEVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVBLdlM0X2li2AJaX19aTksxMF9fY3h4YWJpdjEyMV9fdm1pX2NsYXNzX3R5cGVfaW5mbzE2c2VhcmNoX2JlbG93X2RzdEVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVBLdmli2QJjX19aTksxMF9fY3h4YWJpdjEyMV9fdm1pX2NsYXNzX3R5cGVfaW5mbzI3aGFzX3VuYW1iaWd1b3VzX3B1YmxpY19iYXNlRVBOU18xOV9fZHluYW1pY19jYXN0X2luZm9FUHZp2gJkX19aTksxMF9fY3h4YWJpdjEyMl9fYmFzZV9jbGFzc190eXBlX2luZm8yN2hhc191bmFtYmlndW91c19wdWJsaWNfYmFzZUVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVB2adsCXl9fWk5LMTBfX2N4eGFiaXYxMjJfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvMTZzZWFyY2hfYWJvdmVfZHN0RVBOU18xOV9fZHluYW1pY19jYXN0X2luZm9FUEt2UzRfaWLcAltfX1pOSzEwX19jeHhhYml2MTIyX19iYXNlX2NsYXNzX3R5cGVfaW5mbzE2c2VhcmNoX2JlbG93X2RzdEVQTlNfMTlfX2R5bmFtaWNfY2FzdF9pbmZvRVBLdmli3QIGX19abndt3gIQX19fY3hhX2Nhbl9jYXRjaN8CFl9fX2N4YV9pc19wb2ludGVyX3R5cGXgAitfX19lbWJpbmRfcmVnaXN0ZXJfbmF0aXZlX2FuZF9idWlsdGluX3R5cGVz4QIsX19aTjEyX0dMT0JBTF9fTl8xMTZyZWdpc3Rlcl9pbnRlZ2VySWNFRXZQS2PiAixfX1pOMTJfR0xPQkFMX19OXzExNnJlZ2lzdGVyX2ludGVnZXJJYUVFdlBLY+MCLF9fWk4xMl9HTE9CQUxfX05fMTE2cmVnaXN0ZXJfaW50ZWdlckloRUV2UEtj5AIsX19aTjEyX0dMT0JBTF9fTl8xMTZyZWdpc3Rlcl9pbnRlZ2VySXNFRXZQS2PlAixfX1pOMTJfR0xPQkFMX19OXzExNnJlZ2lzdGVyX2ludGVnZXJJdEVFdlBLY+YCLF9fWk4xMl9HTE9CQUxfX05fMTE2cmVnaXN0ZXJfaW50ZWdlcklpRUV2UEtj5wIsX19aTjEyX0dMT0JBTF9fTl8xMTZyZWdpc3Rlcl9pbnRlZ2VySWpFRXZQS2PoAixfX1pOMTJfR0xPQkFMX19OXzExNnJlZ2lzdGVyX2ludGVnZXJJbEVFdlBLY+kCLF9fWk4xMl9HTE9CQUxfX05fMTE2cmVnaXN0ZXJfaW50ZWdlckltRUV2UEtj6gIqX19aTjEyX0dMT0JBTF9fTl8xMTRyZWdpc3Rlcl9mbG9hdElmRUV2UEtj6wIqX19aTjEyX0dMT0JBTF9fTl8xMTRyZWdpc3Rlcl9mbG9hdElkRUV2UEtj7AIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0ljRUV2UEtj7QIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lhRUV2UEtj7gIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0loRUV2UEtj7wIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lzRUV2UEtj8AIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0l0RUV2UEtj8QIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lpRUV2UEtj8gIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lqRUV2UEtj8wIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lsRUV2UEtj9AIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0ltRUV2UEtj9QIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lmRUV2UEtj9gIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0lkRUV2UEtj9wIwX19aTjEyX0dMT0JBTF9fTl8xMjByZWdpc3Rlcl9tZW1vcnlfdmlld0llRUV2UEtj+AIOX19fZ2V0VHlwZU5hbWX5AhpfX1pTdDE4dW5jYXVnaHRfZXhjZXB0aW9udvoCF19fWk5TdDNfXzI4aW9zX2Jhc2VEMkV2+wIxX19aTlN0M19fMjhpb3NfYmFzZTE2X19jYWxsX2NhbGxiYWNrc0VOUzBfNWV2ZW50RfwCF19fWk5TdDNfXzI4aW9zX2Jhc2VEMEV2/QI2X19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMkV2/gI2X19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMEV2/wJGX19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUU1aW1idWVFUktOU182bG9jYWxlRYADPV9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVFNnNldGJ1ZkVQY2yBA1JfX1pOU3QzX18yMTViYXNpY19zdHJlYW1idWZJY05TXzExY2hhcl90cmFpdHNJY0VFRTdzZWVrb2ZmRXhOU184aW9zX2Jhc2U3c2Vla2RpckVqggNUX19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUU3c2Vla3Bvc0VOU180ZnBvc0kxMV9fbWJzdGF0ZV90RUVqgwM9X19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUU2eHNnZXRuRVBjbIQDPl9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVFOXVuZGVyZmxvd0V2hQM6X19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUU1dWZsb3dFdoYDPl9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVFOXBiYWNrZmFpbEVphwM+X19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUU2eHNwdXRuRVBLY2yIAyZfX1pOU3QzX18yMTFjaGFyX3RyYWl0c0ljRTRjb3B5RVBjUEtjbYkDNl9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1Zkl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRDJFdooDNl9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1Zkl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRDBFdosDPV9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1Zkl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFNnhzZ2V0bkVQd2yMAzpfX1pOU3QzX18yMTViYXNpY19zdHJlYW1idWZJd05TXzExY2hhcl90cmFpdHNJd0VFRTV1Zmxvd0V2jQM+X19aTlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSXdOU18xMWNoYXJfdHJhaXRzSXdFRUU2eHNwdXRuRVBLd2yOAyZfX1pOU3QzX18yMTFjaGFyX3RyYWl0c0l3RTRjb3B5RVB3UEt3bY8DNF9fWk5TdDNfXzIxM2Jhc2ljX2lzdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUQxRXaQAzRfX1pOU3QzX18yMTNiYXNpY19pc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMEV2kQM8X19aVHYwX24xMl9OU3QzX18yMTNiYXNpY19pc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMUV2kgM8X19aVHYwX24xMl9OU3QzX18yMTNiYXNpY19pc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMEV2kwM0X19aTlN0M19fMjEzYmFzaWNfb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRDFFdpQDNF9fWk5TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUQwRXaVAzxfX1pUdjBfbjEyX05TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUQxRXaWAzxfX1pUdjBfbjEyX05TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUQwRXaXAzVfX1pOU3QzX18yMTRiYXNpY19pb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRDFFdpgDNV9fWk5TdDNfXzIxNGJhc2ljX2lvc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMEV2mQM6X19aVGhuOF9OU3QzX18yMTRiYXNpY19pb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRDFFdpoDOl9fWlRobjhfTlN0M19fMjE0YmFzaWNfaW9zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRUQwRXabAz1fX1pUdjBfbjEyX05TdDNfXzIxNGJhc2ljX2lvc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVEMUV2nAM9X19aVHYwX24xMl9OU3QzX18yMTRiYXNpY19pb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRDBFdp0DG19fWk5TdDNfXzI4aW9zX2Jhc2U0aW5pdEVQdp4DNl9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVFQzJFdp8DNl9fWk5TdDNfXzIxNWJhc2ljX3N0cmVhbWJ1Zkl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFQzJFdqADOF9fWk5TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRTVmbHVzaEV2oQM+X19aTlN0M19fMjEzYmFzaWNfb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFNnNlbnRyeUMyRVJTM1+iAztfX1pOU3QzX18yMTNiYXNpY19vc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUU2c2VudHJ5RDJFdqMDNF9fWk5TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRWxzRWmkAzRfX1pOU3QzX18yMTNiYXNpY19vc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVsc0VtpQM0X19aTlN0M19fMjEzYmFzaWNfb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFbHNFZqYDNl9fWk5TdDNfXzIxM2Jhc2ljX29zdHJlYW1JY05TXzExY2hhcl90cmFpdHNJY0VFRTNwdXRFY6cDHF9fWk5TdDNfXzI4aW9zX2Jhc2U0SW5pdEMyRXaoAzRfX1pOU3QzX18yMTBfX3N0ZGluYnVmSWNFQzJFUDhfSU9fRklMRVAxMV9fbWJzdGF0ZV90qQM0X19aTlN0M19fMjEwX19zdGRpbmJ1Zkl3RUMyRVA4X0lPX0ZJTEVQMTFfX21ic3RhdGVfdKoDNV9fWk5TdDNfXzIxMV9fc3Rkb3V0YnVmSWNFQzJFUDhfSU9fRklMRVAxMV9fbWJzdGF0ZV90qwM1X19aTlN0M19fMjExX19zdGRvdXRidWZJd0VDMkVQOF9JT19GSUxFUDExX19tYnN0YXRlX3SsAy5fX1pOU3QzX18yMTFfX3N0ZG91dGJ1Zkl3RTVpbWJ1ZUVSS05TXzZsb2NhbGVFrQMhX19aTlN0M19fMjExX19zdGRvdXRidWZJd0U0c3luY0V2rgMmX19aTlN0M19fMjExX19zdGRvdXRidWZJd0U2eHNwdXRuRVBLd2yvAyVfX1pOU3QzX18yMTFfX3N0ZG91dGJ1Zkl3RThvdmVyZmxvd0VqsAMuX19aTlN0M19fMjExX19zdGRvdXRidWZJY0U1aW1idWVFUktOU182bG9jYWxlRbEDJl9fWk5TdDNfXzIxMV9fc3Rkb3V0YnVmSWNFNnhzcHV0bkVQS2NssgMlX19aTlN0M19fMjExX19zdGRvdXRidWZJY0U4b3ZlcmZsb3dFabMDLV9fWk5TdDNfXzIxMF9fc3RkaW5idWZJd0U1aW1idWVFUktOU182bG9jYWxlRbQDJV9fWk5TdDNfXzIxMF9fc3RkaW5idWZJd0U5dW5kZXJmbG93RXa1AyFfX1pOU3QzX18yMTBfX3N0ZGluYnVmSXdFNXVmbG93RXa2AyVfX1pOU3QzX18yMTBfX3N0ZGluYnVmSXdFOXBiYWNrZmFpbEVqtwMlX19aTlN0M19fMjEwX19zdGRpbmJ1Zkl3RTlfX2dldGNoYXJFYrgDLV9fWk5TdDNfXzIxMF9fc3RkaW5idWZJY0U1aW1idWVFUktOU182bG9jYWxlRbkDJV9fWk5TdDNfXzIxMF9fc3RkaW5idWZJY0U5dW5kZXJmbG93RXa6AyFfX1pOU3QzX18yMTBfX3N0ZGluYnVmSWNFNXVmbG93RXa7AyVfX1pOU3QzX18yMTBfX3N0ZGluYnVmSWNFOXBiYWNrZmFpbEVpvAMlX19aTlN0M19fMjEwX19zdGRpbmJ1ZkljRTlfX2dldGNoYXJFYr0DK19fWk5TdDNfXzI2bG9jYWxlNWZhY2V0MTZfX29uX3plcm9fc2hhcmVkRXa+Ay9fX1pOS1N0M19fMjdjb2xsYXRlSWNFMTBkb19jb21wYXJlRVBLY1MzX1MzX1MzX78DK19fWk5LU3QzX18yN2NvbGxhdGVJY0UxMmRvX3RyYW5zZm9ybUVQS2NTM1/AAyVfX1pOS1N0M19fMjdjb2xsYXRlSWNFN2RvX2hhc2hFUEtjUzNfwQOPAV9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU2X19pbml0SVBLY0VFTlNfOWVuYWJsZV9pZklYc3IyMV9faXNfZm9yd2FyZF9pdGVyYXRvcklUX0VFNXZhbHVlRXZFNHR5cGVFU0FfU0FfwgMvX19aTktTdDNfXzI3Y29sbGF0ZUl3RTEwZG9fY29tcGFyZUVQS3dTM19TM19TM1/DAytfX1pOS1N0M19fMjdjb2xsYXRlSXdFMTJkb190cmFuc2Zvcm1FUEt3UzNfxAMlX19aTktTdDNfXzI3Y29sbGF0ZUl3RTdkb19oYXNoRVBLd1MzX8UDjwFfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFNl9faW5pdElQS3dFRU5TXzllbmFibGVfaWZJWHNyMjFfX2lzX2ZvcndhcmRfaXRlcmF0b3JJVF9FRTV2YWx1ZUV2RTR0eXBlRVNBX1NBX8YDZl9fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpSYscDZl9fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpSbMgDZl9fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpSeMkDZl9fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpSdMoDZ19fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpTOF/LA2ZfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUnnMA2ZfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUmbNA2ZfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUmTOA2ZfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUmXPA2dfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUlB20AMmX19aTktTdDNfXzI2bG9jYWxlOXVzZV9mYWNldEVSTlMwXzJpZEXRAxVfX1pOU3QzX18yNmxvY2FsZUQyRXbSA3tfX1pOU3QzX18yOV9fbnVtX2dldEljRTE3X19zdGFnZTJfaW50X2xvb3BFY2lQY1JTMl9SamNSS05TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVQalJTRF9QS2PTAxNfX1pOU3QzX18yNl9fY2xvY0V21AM3X19aTlN0M19fMjE3X19saWJjcHBfc3NjYW5mX2xFUEtjUDE1X19sb2NhbGVfc3RydWN0UzFfetUDHF9fWk5TdDNfXzI2bG9jYWxlMmlkNV9fZ2V0RXbWAx1fX1pOU3QzX18yNmxvY2FsZTJpZDZfX2luaXRFdtcDUV9fWk5TdDNfXzIxN19fY2FsbF9vbmNlX3Byb3h5SU5TXzV0dXBsZUlKT05TXzEyX0dMT0JBTF9fTl8xMTFfX2Zha2VfYmluZEVFRUVFRXZQdtgDKl9fWk5LU3QzX18yMTJfR0xPQkFMX19OXzExMV9fZmFrZV9iaW5kY2xFdtkDf19fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUyM19fZG9fZ2V0X2Zsb2F0aW5nX3BvaW50SWVFRVM0X1M0X1M0X1JOU184aW9zX2Jhc2VFUmpSVF/aA0JfX1pOU3QzX18yOV9fbnVtX2dldEljRTE5X19zdGFnZTJfZmxvYXRfcHJlcEVSTlNfOGlvc19iYXNlRVBjUmNTNV/bA4EBX19aTlN0M19fMjlfX251bV9nZXRJY0UxOV9fc3RhZ2UyX2Zsb2F0X2xvb3BFY1JiUmNQY1JTNF9jY1JLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVBqUlNFX1JqUzRf3AMpX19aTlN0M19fMjE1X19udW1fZ2V0X2Zsb2F0SWVFRVRfUEtjUzNfUmrdA2BfX1pOU3QzX18yMTZfX2NoZWNrX2dyb3VwaW5nRVJLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVBqUzhfUmreA39fX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMjNfX2RvX2dldF9mbG9hdGluZ19wb2ludElkRUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf3wMpX19aTlN0M19fMjE1X19udW1fZ2V0X2Zsb2F0SWRFRVRfUEtjUzNfUmrgA39fX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMjNfX2RvX2dldF9mbG9hdGluZ19wb2ludElmRUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf4QMpX19aTlN0M19fMjE1X19udW1fZ2V0X2Zsb2F0SWZFRVRfUEtjUzNfUmriA3lfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTdfX2RvX2dldF91bnNpZ25lZEl5RUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf4wM7X19aTlN0M19fMjlfX251bV9nZXRJY0UxN19fc3RhZ2UyX2ludF9wcmVwRVJOU184aW9zX2Jhc2VFUmPkAzZfX1pOU3QzX18yMjdfX251bV9nZXRfdW5zaWduZWRfaW50ZWdyYWxJeUVFVF9QS2NTM19SamnlA3lfX1pOS1N0M19fMjdudW1fZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTdfX2RvX2dldF91bnNpZ25lZEltRUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf5gM2X19aTlN0M19fMjI3X19udW1fZ2V0X3Vuc2lnbmVkX2ludGVncmFsSW1FRVRfUEtjUzNfUmpp5wN5X19aTktTdDNfXzI3bnVtX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTE3X19kb19nZXRfdW5zaWduZWRJdEVFUzRfUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJUX+gDNl9fWk5TdDNfXzIyN19fbnVtX2dldF91bnNpZ25lZF9pbnRlZ3JhbEl0RUVUX1BLY1MzX1JqaekDd19fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxNV9fZG9fZ2V0X3NpZ25lZEl4RUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf6gM0X19aTlN0M19fMjI1X19udW1fZ2V0X3NpZ25lZF9pbnRlZ3JhbEl4RUVUX1BLY1MzX1JqaesDd19fWk5LU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxNV9fZG9fZ2V0X3NpZ25lZElsRUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf7AM0X19aTlN0M19fMjI1X19udW1fZ2V0X3NpZ25lZF9pbnRlZ3JhbElsRUVUX1BLY1MzX1Jqae0DnAFfX1pOU3QzX18yMTRfX3NjYW5fa2V5d29yZElOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVQS05TXzEyYmFzaWNfc3RyaW5nSWNTM19OU185YWxsb2NhdG9ySWNFRUVFTlNfNWN0eXBlSWNFRUVFVDBfUlRfU0VfU0RfU0RfUktUMV9SamLuA2ZfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUmLvA2ZfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUmzwA2ZfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUnjxA2ZfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUnTyA2dfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUzhf8wNmX19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19nZXRFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJ59ANmX19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19nZXRFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJm9QNmX19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19nZXRFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJk9gNmX19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19nZXRFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJl9wNnX19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19nZXRFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJQdvgDe19fWk5TdDNfXzI5X19udW1fZ2V0SXdFMTdfX3N0YWdlMl9pbnRfbG9vcEV3aVBjUlMyX1Jqd1JLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVBqUlNEX1BLd/kDf19fWk5LU3QzX18yN251bV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUyM19fZG9fZ2V0X2Zsb2F0aW5nX3BvaW50SWVFRVM0X1M0X1M0X1JOU184aW9zX2Jhc2VFUmpSVF/6A0JfX1pOU3QzX18yOV9fbnVtX2dldEl3RTE5X19zdGFnZTJfZmxvYXRfcHJlcEVSTlNfOGlvc19iYXNlRVB3UndTNV/7A4ABX19aTlN0M19fMjlfX251bV9nZXRJd0UxOV9fc3RhZ2UyX2Zsb2F0X2xvb3BFd1JiUmNQY1JTNF93d1JLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVBqUlNFX1JqUHf8A39fX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMjNfX2RvX2dldF9mbG9hdGluZ19wb2ludElkRUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRf/QN/X19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTIzX19kb19nZXRfZmxvYXRpbmdfcG9pbnRJZkVFUzRfUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJUX/4DeV9fWk5LU3QzX18yN251bV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUxN19fZG9fZ2V0X3Vuc2lnbmVkSXlFRVM0X1M0X1M0X1JOU184aW9zX2Jhc2VFUmpSVF//AzVfX1pOS1N0M19fMjlfX251bV9nZXRJd0UxMF9fZG9fd2lkZW5FUk5TXzhpb3NfYmFzZUVQd4AEO19fWk5TdDNfXzI5X19udW1fZ2V0SXdFMTdfX3N0YWdlMl9pbnRfcHJlcEVSTlNfOGlvc19iYXNlRVJ3gQRAX19aTktTdDNfXzI5X19udW1fZ2V0SXdFMTJfX2RvX3dpZGVuX3BJd0VFUEtUX1JOU184aW9zX2Jhc2VFUFMzX4IEeV9fWk5LU3QzX18yN251bV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUxN19fZG9fZ2V0X3Vuc2lnbmVkSW1FRVM0X1M0X1M0X1JOU184aW9zX2Jhc2VFUmpSVF+DBHlfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMTdfX2RvX2dldF91bnNpZ25lZEl0RUVTNF9TNF9TNF9STlNfOGlvc19iYXNlRVJqUlRfhAR3X19aTktTdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTE1X19kb19nZXRfc2lnbmVkSXhFRVM0X1M0X1M0X1JOU184aW9zX2Jhc2VFUmpSVF+FBHdfX1pOS1N0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMTVfX2RvX2dldF9zaWduZWRJbEVFUzRfUzRfUzRfUk5TXzhpb3NfYmFzZUVSalJUX4YEnAFfX1pOU3QzX18yMTRfX3NjYW5fa2V5d29yZElOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVQS05TXzEyYmFzaWNfc3RyaW5nSXdTM19OU185YWxsb2NhdG9ySXdFRUVFTlNfNWN0eXBlSXdFRUVFVDBfUlRfU0VfU0RfU0RfUktUMV9SamKHBGFfX1pOS1N0M19fMjdudW1fcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRWNiiARhX19aTktTdDNfXzI3bnVtX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTZkb19wdXRFUzRfUk5TXzhpb3NfYmFzZUVjbIkEYV9fWk5LU3QzX18yN251bV9wdXRJY05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fcHV0RVM0X1JOU184aW9zX2Jhc2VFY3iKBGFfX1pOS1N0M19fMjdudW1fcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRWNtiwRhX19aTktTdDNfXzI3bnVtX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTZkb19wdXRFUzRfUk5TXzhpb3NfYmFzZUVjeYwEYV9fWk5LU3QzX18yN251bV9wdXRJY05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fcHV0RVM0X1JOU184aW9zX2Jhc2VFY2SNBGFfX1pOS1N0M19fMjdudW1fcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRWNljgRjX19aTktTdDNfXzI3bnVtX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTZkb19wdXRFUzRfUk5TXzhpb3NfYmFzZUVjUEt2jwQ5X19aTlN0M19fMjE5X19saWJjcHBfc25wcmludGZfbEVQY21QMTVfX2xvY2FsZV9zdHJ1Y3RQS2N6kARDX19aTlN0M19fMjE0X19udW1fcHV0X2Jhc2UxOF9faWRlbnRpZnlfcGFkZGluZ0VQY1MxX1JLTlNfOGlvc19iYXNlRZEEMV9fWk5TdDNfXzIxNF9fbnVtX3B1dF9iYXNlMTRfX2Zvcm1hdF9mbG9hdEVQY1BLY2qSBDlfX1pOU3QzX18yMTlfX2xpYmNwcF9hc3ByaW50Zl9sRVBQY1AxNV9fbG9jYWxlX3N0cnVjdFBLY3qTBFBfX1pOU3QzX18yOV9fbnVtX3B1dEljRTIzX193aWRlbl9hbmRfZ3JvdXBfZmxvYXRFUGNTMl9TMl9TMl9SUzJfUzNfUktOU182bG9jYWxlRZQEMF9fWk5TdDNfXzIxNF9fbnVtX3B1dF9iYXNlMTJfX2Zvcm1hdF9pbnRFUGNQS2NiapUETl9fWk5TdDNfXzI5X19udW1fcHV0SWNFMjFfX3dpZGVuX2FuZF9ncm91cF9pbnRFUGNTMl9TMl9TMl9SUzJfUzNfUktOU182bG9jYWxlRZYEYV9fWk5LU3QzX18yN251bV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUU2ZG9fcHV0RVM0X1JOU184aW9zX2Jhc2VFd2KXBGFfX1pOS1N0M19fMjdudW1fcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRXdsmARhX19aTktTdDNfXzI3bnVtX3B1dEl3TlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19wdXRFUzRfUk5TXzhpb3NfYmFzZUV3eJkEYV9fWk5LU3QzX18yN251bV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUU2ZG9fcHV0RVM0X1JOU184aW9zX2Jhc2VFd22aBGFfX1pOS1N0M19fMjdudW1fcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRXd5mwRhX19aTktTdDNfXzI3bnVtX3B1dEl3TlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19wdXRFUzRfUk5TXzhpb3NfYmFzZUV3ZJwEYV9fWk5LU3QzX18yN251bV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUU2ZG9fcHV0RVM0X1JOU184aW9zX2Jhc2VFd2WdBGNfX1pOS1N0M19fMjdudW1fcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRXdQS3aeBHNfX1pOU3QzX18yMTZfX3BhZF9hbmRfb3V0cHV0SXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySVRfVDBfRUVTNl9QS1M0X1M4X1M4X1JOU184aW9zX2Jhc2VFUzRfnwRPX19aTlN0M19fMjlfX251bV9wdXRJd0UyM19fd2lkZW5fYW5kX2dyb3VwX2Zsb2F0RVBjUzJfUzJfUHdSUzNfUzRfUktOU182bG9jYWxlRaAETV9fWk5TdDNfXzI5X19udW1fcHV0SXdFMjFfX3dpZGVuX2FuZF9ncm91cF9pbnRFUGNTMl9TMl9Qd1JTM19TNF9SS05TXzZsb2NhbGVFoQRYX19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxM2RvX2RhdGVfb3JkZXJFdqIEb19fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTFkb19nZXRfdGltZUVTNF9TNF9STlNfOGlvc19iYXNlRVJqUDJ0baMEb19fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTFkb19nZXRfZGF0ZUVTNF9TNF9STlNfOGlvc19iYXNlRVJqUDJ0baQEcl9fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTRkb19nZXRfd2Vla2RheUVTNF9TNF9STlNfOGlvc19iYXNlRVJqUDJ0baUEdF9fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTZkb19nZXRfbW9udGhuYW1lRVM0X1M0X1JOU184aW9zX2Jhc2VFUmpQMnRtpgRvX19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxMWRvX2dldF95ZWFyRVM0X1M0X1JOU184aW9zX2Jhc2VFUmpQMnRtpwRrX19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpQMnRtY2OoBC5fX1pOS1N0M19fMjIwX190aW1lX2dldF9jX3N0b3JhZ2VJY0U3X193ZWVrc0V2qQQvX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSWNFOF9fbW9udGhzRXaqBC5fX1pOS1N0M19fMjIwX190aW1lX2dldF9jX3N0b3JhZ2VJY0U3X19hbV9wbUV2qwQqX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSWNFM19fY0V2rAQqX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSWNFM19fckV2rQQqX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSWNFM19feEV2rgQqX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSWNFM19fWEV2rwQZX19aTlN0M19fMkwxMGluaXRfYW1fcG1FdrAEGl9fWk5TdDNfXzJMMTFpbml0X21vbnRoc0V2sQQZX19aTlN0M19fMkwxMGluaXRfd2Vla3NFdrIEdV9fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTdfX2dldF93ZWVrZGF5bmFtZUVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSWNFRbMEc19fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTVfX2dldF9tb250aG5hbWVFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUljRUW0BGxfX1pOS1N0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTNnZXRFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalAydG1QS2NTQ1+1BGxfX1pOS1N0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTlfX2dldF9kYXlFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUljRUW2BG5fX1pOS1N0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTEwX19nZXRfaG91ckVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSWNFRbcEcV9fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTNfX2dldF8xMl9ob3VyRVJpUlM0X1M0X1JqUktOU181Y3R5cGVJY0VFuAR2X19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxOF9fZ2V0X2RheV95ZWFyX251bUVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSWNFRbkEb19fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTFfX2dldF9tb250aEVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSWNFRboEcF9fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTJfX2dldF9taW51dGVFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUljRUW7BHNfX1pOS1N0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTE3X19nZXRfd2hpdGVfc3BhY2VFUlM0X1M0X1JqUktOU181Y3R5cGVJY0VFvARvX19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxMV9fZ2V0X2FtX3BtRVJpUlM0X1M0X1JqUktOU181Y3R5cGVJY0VFvQRwX19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxMl9fZ2V0X3NlY29uZEVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSWNFRb4EcV9fWk5LU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFMTNfX2dldF93ZWVrZGF5RVJpUlM0X1M0X1JqUktOU181Y3R5cGVJY0VFvwRuX19aTktTdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUUxMF9fZ2V0X3llYXJFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUljRUXABG9fX1pOS1N0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTExX19nZXRfeWVhcjRFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUljRUXBBG9fX1pOS1N0M19fMjh0aW1lX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTEzX19nZXRfcGVyY2VudEVSUzRfUzRfUmpSS05TXzVjdHlwZUljRUXCBG9fX1pOU3QzX18yMjBfX2dldF91cF90b19uX2RpZ2l0c0ljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUVpUlQwX1M1X1JqUktOU181Y3R5cGVJVF9FRWnDBG9fX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTExZG9fZ2V0X3RpbWVFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalAydG3EBG9fX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTExZG9fZ2V0X2RhdGVFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalAydG3FBHJfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTE0ZG9fZ2V0X3dlZWtkYXlFUzRfUzRfUk5TXzhpb3NfYmFzZUVSalAydG3GBHRfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTE2ZG9fZ2V0X21vbnRobmFtZUVTNF9TNF9STlNfOGlvc19iYXNlRVJqUDJ0bccEb19fWk5LU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMTFkb19nZXRfeWVhckVTNF9TNF9STlNfOGlvc19iYXNlRVJqUDJ0bcgEa19fWk5LU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9STlNfOGlvc19iYXNlRVJqUDJ0bWNjyQQuX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSXdFN19fd2Vla3NFdsoEL19fWk5LU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RThfX21vbnRoc0V2ywQuX19aTktTdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSXdFN19fYW1fcG1FdswEKl9fWk5LU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RTNfX2NFds0EKl9fWk5LU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RTNfX3JFds4EKl9fWk5LU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RTNfX3hFds8EKl9fWk5LU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RTNfX1hFdtAEGl9fWk5TdDNfXzJMMTFpbml0X3dhbV9wbUV20QQbX19aTlN0M19fMkwxMmluaXRfd21vbnRoc0V20gQaX19aTlN0M19fMkwxMWluaXRfd3dlZWtzRXbTBHVfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTE3X19nZXRfd2Vla2RheW5hbWVFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUl3RUXUBHNfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTE1X19nZXRfbW9udGhuYW1lRVJpUlM0X1M0X1JqUktOU181Y3R5cGVJd0VF1QRsX19aTktTdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUzZ2V0RVM0X1M0X1JOU184aW9zX2Jhc2VFUmpQMnRtUEt3U0Nf1gRsX19aTktTdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUU5X19nZXRfZGF5RVJpUlM0X1M0X1JqUktOU181Y3R5cGVJd0VF1wRuX19aTktTdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUxMF9fZ2V0X2hvdXJFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUl3RUXYBHFfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTEzX19nZXRfMTJfaG91ckVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSXdFRdkEdl9fWk5LU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMThfX2dldF9kYXlfeWVhcl9udW1FUmlSUzRfUzRfUmpSS05TXzVjdHlwZUl3RUXaBG9fX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTExX19nZXRfbW9udGhFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUl3RUXbBHBfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTEyX19nZXRfbWludXRlRVJpUlM0X1M0X1JqUktOU181Y3R5cGVJd0VF3ARzX19aTktTdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUxN19fZ2V0X3doaXRlX3NwYWNlRVJTNF9TNF9SalJLTlNfNWN0eXBlSXdFRd0Eb19fWk5LU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMTFfX2dldF9hbV9wbUVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSXdFRd4EcF9fWk5LU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMTJfX2dldF9zZWNvbmRFUmlSUzRfUzRfUmpSS05TXzVjdHlwZUl3RUXfBHFfX1pOS1N0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTEzX19nZXRfd2Vla2RheUVSaVJTNF9TNF9SalJLTlNfNWN0eXBlSXdFReAEbl9fWk5LU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFMTBfX2dldF95ZWFyRVJpUlM0X1M0X1JqUktOU181Y3R5cGVJd0VF4QRvX19aTktTdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUxMV9fZ2V0X3llYXI0RVJpUlM0X1M0X1JqUktOU181Y3R5cGVJd0VF4gRvX19aTktTdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUUxM19fZ2V0X3BlcmNlbnRFUlM0X1M0X1JqUktOU181Y3R5cGVJd0VF4wRvX19aTlN0M19fMjIwX19nZXRfdXBfdG9fbl9kaWdpdHNJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFaVJUMF9TNV9SalJLTlNfNWN0eXBlSVRfRUVp5ARKX19aTlN0M19fMjh0aW1lX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUQyRXblBEpfX1pOU3QzX18yOHRpbWVfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRDBFduYEaF9fWk5LU3QzX18yOHRpbWVfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX3B1dEVTNF9STlNfOGlvc19iYXNlRWNQSzJ0bWNj5wQuX19aTktTdDNfXzIxMF9fdGltZV9wdXQ4X19kb19wdXRFUGNSUzFfUEsydG1jY+gEGl9fWk5TdDNfXzIxMF9fdGltZV9wdXREMkV26QRoX19aTktTdDNfXzI4dGltZV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUU2ZG9fcHV0RVM0X1JOU184aW9zX2Jhc2VFd1BLMnRtY2PqBC5fX1pOS1N0M19fMjEwX190aW1lX3B1dDhfX2RvX3B1dEVQd1JTMV9QSzJ0bWNj6wQyX19aTktTdDNfXzIxMG1vbmV5cHVuY3RJY0xiMEVFMTZkb19kZWNpbWFsX3BvaW50RXbsBC1fX1pOS1N0M19fMjEwbW9uZXlwdW5jdEljTGIwRUUxMWRvX2dyb3VwaW5nRXbtBDJfX1pOS1N0M19fMjEwbW9uZXlwdW5jdEljTGIwRUUxNmRvX25lZ2F0aXZlX3NpZ25Fdu4EL19fWk5LU3QzX18yMTBtb25leXB1bmN0SWNMYjBFRTEzZG9fcG9zX2Zvcm1hdEV27wQyX19aTktTdDNfXzIxMG1vbmV5cHVuY3RJd0xiMEVFMTZkb19kZWNpbWFsX3BvaW50RXbwBDJfX1pOS1N0M19fMjEwbW9uZXlwdW5jdEl3TGIwRUUxNmRvX25lZ2F0aXZlX3NpZ25FdvEEaV9fWk5LU3QzX18yOW1vbmV5X2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRTZkb19nZXRFUzRfUzRfYlJOU184aW9zX2Jhc2VFUmpSZfIEkQFfX1pOS1N0M19fMjltb25leV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fZ2V0RVM0X1M0X2JSTlNfOGlvc19iYXNlRVJqUk5TXzEyYmFzaWNfc3RyaW5nSWNTM19OU185YWxsb2NhdG9ySWNFRUVF8wSaAV9fWk5TdDNfXzI5bW9uZXlfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFOF9fZG9fZ2V0RVJTNF9TNF9iUktOU182bG9jYWxlRWpSalJiUktOU181Y3R5cGVJY0VFUk5TXzEwdW5pcXVlX3B0ckljUEZ2UHZFRUVSUGNTTV/0BGdfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFMjNfX2FwcGVuZF9mb3J3YXJkX3Vuc2FmZUlQY0VFUlM1X1RfUzlf9QScAV9fWk5TdDNfXzIxMV9fbW9uZXlfZ2V0SWNFMTNfX2dhdGhlcl9pbmZvRWJSS05TXzZsb2NhbGVFUk5TXzEwbW9uZXlfYmFzZTdwYXR0ZXJuRVJjUzhfUk5TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVTRl9TRl9TRl9SafYER19fWk5TdDNfXzIxOV9fZG91YmxlX29yX25vdGhpbmdJY0VFdlJOU18xMHVuaXF1ZV9wdHJJVF9QRnZQdkVFRVJQUzJfUzlf9wRHX19aTlN0M19fMjE5X19kb3VibGVfb3Jfbm90aGluZ0lqRUV2Uk5TXzEwdW5pcXVlX3B0cklUX1BGdlB2RUVFUlBTMl9TOV/4BGlfX1pOS1N0M19fMjltb25leV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUU2ZG9fZ2V0RVM0X1M0X2JSTlNfOGlvc19iYXNlRVJqUmX5BJEBX19aTktTdDNfXzI5bW9uZXlfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX2dldEVTNF9TNF9iUk5TXzhpb3NfYmFzZUVSalJOU18xMmJhc2ljX3N0cmluZ0l3UzNfTlNfOWFsbG9jYXRvckl3RUVFRfoEmgFfX1pOU3QzX18yOW1vbmV5X2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRThfX2RvX2dldEVSUzRfUzRfYlJLTlNfNmxvY2FsZUVqUmpSYlJLTlNfNWN0eXBlSXdFRVJOU18xMHVuaXF1ZV9wdHJJd1BGdlB2RUVFUlB3U01f+wRnX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRTIzX19hcHBlbmRfZm9yd2FyZF91bnNhZmVJUHdFRVJTNV9UX1M5X/wEsgFfX1pOU3QzX18yMTFfX21vbmV5X2dldEl3RTEzX19nYXRoZXJfaW5mb0ViUktOU182bG9jYWxlRVJOU18xMG1vbmV5X2Jhc2U3cGF0dGVybkVSd1M4X1JOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFUk5TOV9Jd05TQV9Jd0VFTlNDX0l3RUVFRVNKX1NKX1Jp/QRkX19aTktTdDNfXzI5bW9uZXlfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFNmRvX3B1dEVTNF9iUk5TXzhpb3NfYmFzZUVjZf4EjgFfX1pOS1N0M19fMjltb25leV9wdXRJY05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUU2ZG9fcHV0RVM0X2JSTlNfOGlvc19iYXNlRWNSS05TXzEyYmFzaWNfc3RyaW5nSWNTM19OU185YWxsb2NhdG9ySWNFRUVF/wSaAV9fWk5TdDNfXzIxMV9fbW9uZXlfcHV0SWNFMTNfX2dhdGhlcl9pbmZvRWJiUktOU182bG9jYWxlRVJOU18xMG1vbmV5X2Jhc2U3cGF0dGVybkVSY1M4X1JOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFU0ZfU0ZfUmmABaMBX19aTlN0M19fMjExX19tb25leV9wdXRJY0U4X19mb3JtYXRFUGNSUzJfUzNfalBLY1M1X1JLTlNfNWN0eXBlSWNFRWJSS05TXzEwbW9uZXlfYmFzZTdwYXR0ZXJuRWNjUktOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFU0xfU0xfaYEFZF9fWk5LU3QzX18yOW1vbmV5X3B1dEl3TlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRTZkb19wdXRFUzRfYlJOU184aW9zX2Jhc2VFd2WCBY4BX19aTktTdDNfXzI5bW9uZXlfcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFNmRvX3B1dEVTNF9iUk5TXzhpb3NfYmFzZUV3UktOU18xMmJhc2ljX3N0cmluZ0l3UzNfTlNfOWFsbG9jYXRvckl3RUVFRYMFsAFfX1pOU3QzX18yMTFfX21vbmV5X3B1dEl3RTEzX19nYXRoZXJfaW5mb0ViYlJLTlNfNmxvY2FsZUVSTlNfMTBtb25leV9iYXNlN3BhdHRlcm5FUndTOF9STlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVJOUzlfSXdOU0FfSXdFRU5TQ19Jd0VFRUVTSl9SaYQFugFfX1pOU3QzX18yMTFfX21vbmV5X3B1dEl3RThfX2Zvcm1hdEVQd1JTMl9TM19qUEt3UzVfUktOU181Y3R5cGVJd0VFYlJLTlNfMTBtb25leV9iYXNlN3BhdHRlcm5Fd3dSS05TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVSS05TRV9Jd05TRl9Jd0VFTlNIX0l3RUVFRVNRX2mFBWlfX1pOS1N0M19fMjhtZXNzYWdlc0ljRTdkb19vcGVuRVJLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRVJLTlNfNmxvY2FsZUWGBV5fX1pOS1N0M19fMjhtZXNzYWdlc0ljRTZkb19nZXRFbGlpUktOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFhwVeX19aTktTdDNfXzI4bWVzc2FnZXNJd0U2ZG9fZ2V0RWxpaVJLTlNfMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRYgFRV9fWk5LU3QzX18yN2NvZGVjdnRJRGljMTFfX21ic3RhdGVfdEU2ZG9fb3V0RVJTMV9QS0RpUzVfUlM1X1BjUzdfUlM3X4kFRF9fWk5LU3QzX18yN2NvZGVjdnRJRGljMTFfX21ic3RhdGVfdEU1ZG9faW5FUlMxX1BLY1M1X1JTNV9QRGlTN19SUzdfigU/X19aTktTdDNfXzI3Y29kZWN2dElEaWMxMV9fbWJzdGF0ZV90RTEwZG9fdW5zaGlmdEVSUzFfUGNTNF9SUzRfiwU7X19aTktTdDNfXzI3Y29kZWN2dElEaWMxMV9fbWJzdGF0ZV90RTlkb19sZW5ndGhFUlMxX1BLY1M1X22MBTZfX1pOS1N0M19fMjdjb2RlY3Z0SURpYzExX19tYnN0YXRlX3RFMTNkb19tYXhfbGVuZ3RoRXaNBTtfX1pOU3QzX18yTDE5dXRmOF90b191Y3M0X2xlbmd0aEVQS2hTMV9tbU5TXzEyY29kZWN2dF9tb2RlRY4FQF9fWk5TdDNfXzJMMTJ1dGY4X3RvX3VjczRFUEtoUzFfUlMxX1BqUzNfUlMzX21OU18xMmNvZGVjdnRfbW9kZUWPBUBfX1pOU3QzX18yTDEydWNzNF90b191dGY4RVBLalMxX1JTMV9QaFMzX1JTM19tTlNfMTJjb2RlY3Z0X21vZGVFkAVDX19aTktTdDNfXzI3Y29kZWN2dEljYzExX19tYnN0YXRlX3RFNmRvX291dEVSUzFfUEtjUzVfUlM1X1BjUzdfUlM3X5EFM19fWk5LU3QzX18yN2NvZGVjdnRJY2MxMV9fbWJzdGF0ZV90RTExZG9fZW5jb2RpbmdFdpIFOl9fWk5LU3QzX18yN2NvZGVjdnRJY2MxMV9fbWJzdGF0ZV90RTlkb19sZW5ndGhFUlMxX1BLY1M1X22TBUNfX1pOS1N0M19fMjdjb2RlY3Z0SXdjMTFfX21ic3RhdGVfdEU2ZG9fb3V0RVJTMV9QS3dTNV9SUzVfUGNTN19SUzdflAVCX19aTktTdDNfXzI3Y29kZWN2dEl3YzExX19tYnN0YXRlX3RFNWRvX2luRVJTMV9QS2NTNV9SUzVfUHdTN19SUzdflQU+X19aTktTdDNfXzI3Y29kZWN2dEl3YzExX19tYnN0YXRlX3RFMTBkb191bnNoaWZ0RVJTMV9QY1M0X1JTNF+WBTNfX1pOS1N0M19fMjdjb2RlY3Z0SXdjMTFfX21ic3RhdGVfdEUxMWRvX2VuY29kaW5nRXaXBTpfX1pOS1N0M19fMjdjb2RlY3Z0SXdjMTFfX21ic3RhdGVfdEU5ZG9fbGVuZ3RoRVJTMV9QS2NTNV9tmAU1X19aTktTdDNfXzI3Y29kZWN2dEl3YzExX19tYnN0YXRlX3RFMTNkb19tYXhfbGVuZ3RoRXaZBSdfX1pOU3QzX18yN2NvZGVjdnRJd2MxMV9fbWJzdGF0ZV90RUQyRXaaBSdfX1pOU3QzX18yN2NvZGVjdnRJd2MxMV9fbWJzdGF0ZV90RUQwRXabBUVfX1pOS1N0M19fMjdjb2RlY3Z0SURzYzExX19tYnN0YXRlX3RFNmRvX291dEVSUzFfUEtEc1M1X1JTNV9QY1M3X1JTN1+cBURfX1pOS1N0M19fMjdjb2RlY3Z0SURzYzExX19tYnN0YXRlX3RFNWRvX2luRVJTMV9QS2NTNV9SUzVfUERzUzdfUlM3X50FO19fWk5LU3QzX18yN2NvZGVjdnRJRHNjMTFfX21ic3RhdGVfdEU5ZG9fbGVuZ3RoRVJTMV9QS2NTNV9tngU8X19aTlN0M19fMkwyMHV0ZjhfdG9fdXRmMTZfbGVuZ3RoRVBLaFMxX21tTlNfMTJjb2RlY3Z0X21vZGVFnwVBX19aTlN0M19fMkwxM3V0ZjhfdG9fdXRmMTZFUEtoUzFfUlMxX1B0UzNfUlMzX21OU18xMmNvZGVjdnRfbW9kZUWgBUFfX1pOU3QzX18yTDEzdXRmMTZfdG9fdXRmOEVQS3RTMV9SUzFfUGhTM19SUzNfbU5TXzEyY29kZWN2dF9tb2RlRaEFG19fWk5TdDNfXzI2bG9jYWxlNV9faW1wRDJFdqIFG19fWk5TdDNfXzI2bG9jYWxlNV9faW1wRDBFdqMFUF9fWk5TdDNfXzIxM19fdmVjdG9yX2Jhc2VJUE5TXzZsb2NhbGU1ZmFjZXRFTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUVEMkV2pAUXX19aTlN0M19fMjVjdHlwZUljRUQyRXalBRdfX1pOU3QzX18yNWN0eXBlSWNFRDBFdqYFIl9fWk5LU3QzX18yNWN0eXBlSWNFMTBkb190b3VwcGVyRWOnBSZfX1pOS1N0M19fMjVjdHlwZUljRTEwZG9fdG91cHBlckVQY1BLY6gFIl9fWk5LU3QzX18yNWN0eXBlSWNFMTBkb190b2xvd2VyRWOpBSZfX1pOS1N0M19fMjVjdHlwZUljRTEwZG9fdG9sb3dlckVQY1BLY6oFH19fWk5LU3QzX18yNWN0eXBlSWNFOGRvX3dpZGVuRWOrBSZfX1pOS1N0M19fMjVjdHlwZUljRThkb193aWRlbkVQS2NTM19QY6wFIV9fWk5LU3QzX18yNWN0eXBlSWNFOWRvX25hcnJvd0VjY60FKF9fWk5LU3QzX18yNWN0eXBlSWNFOWRvX25hcnJvd0VQS2NTM19jUGOuBRpfX1pOU3QzX18yOG51bXB1bmN0SWNFRDJFdq8FGl9fWk5TdDNfXzI4bnVtcHVuY3RJY0VEMEV2sAUrX19aTktTdDNfXzI4bnVtcHVuY3RJY0UxNmRvX2RlY2ltYWxfcG9pbnRFdrEFK19fWk5LU3QzX18yOG51bXB1bmN0SWNFMTZkb190aG91c2FuZHNfc2VwRXayBSZfX1pOS1N0M19fMjhudW1wdW5jdEljRTExZG9fZ3JvdXBpbmdFdrMFJl9fWk5LU3QzX18yOG51bXB1bmN0SWNFMTFkb190cnVlbmFtZUV2tAUnX19aTktTdDNfXzI4bnVtcHVuY3RJY0UxMmRvX2ZhbHNlbmFtZUV2tQUaX19aTlN0M19fMjhudW1wdW5jdEl3RUQyRXa2BRpfX1pOU3QzX18yOG51bXB1bmN0SXdFRDBFdrcFK19fWk5LU3QzX18yOG51bXB1bmN0SXdFMTZkb19kZWNpbWFsX3BvaW50RXa4BStfX1pOS1N0M19fMjhudW1wdW5jdEl3RTE2ZG9fdGhvdXNhbmRzX3NlcEV2uQUmX19aTktTdDNfXzI4bnVtcHVuY3RJd0UxMWRvX2dyb3VwaW5nRXa6BSZfX1pOS1N0M19fMjhudW1wdW5jdEl3RTExZG9fdHJ1ZW5hbWVFdrsFJ19fWk5LU3QzX18yOG51bXB1bmN0SXdFMTJkb19mYWxzZW5hbWVFdrwFHV9fWk5LU3QzX18yNWN0eXBlSXdFNWRvX2lzRXR3vQUjX19aTktTdDNfXzI1Y3R5cGVJd0U1ZG9faXNFUEt3UzNfUHS+BShfX1pOS1N0M19fMjVjdHlwZUl3RTEwZG9fc2Nhbl9pc0V0UEt3UzNfvwUpX19aTktTdDNfXzI1Y3R5cGVJd0UxMWRvX3NjYW5fbm90RXRQS3dTM1/ABSJfX1pOS1N0M19fMjVjdHlwZUl3RTEwZG9fdG91cHBlckV3wQUmX19aTktTdDNfXzI1Y3R5cGVJd0UxMGRvX3RvdXBwZXJFUHdQS3fCBSJfX1pOS1N0M19fMjVjdHlwZUl3RTEwZG9fdG9sb3dlckV3wwUmX19aTktTdDNfXzI1Y3R5cGVJd0UxMGRvX3RvbG93ZXJFUHdQS3fEBR9fX1pOS1N0M19fMjVjdHlwZUl3RThkb193aWRlbkVjxQUmX19aTktTdDNfXzI1Y3R5cGVJd0U4ZG9fd2lkZW5FUEtjUzNfUHfGBSFfX1pOS1N0M19fMjVjdHlwZUl3RTlkb19uYXJyb3dFd2PHBShfX1pOS1N0M19fMjVjdHlwZUl3RTlkb19uYXJyb3dFUEt3UzNfY1BjyAUbX19aTlN0M19fMjZsb2NhbGU1X19pbXBDMkVtyQVIX19aTlN0M19fMjZ2ZWN0b3JJUE5TXzZsb2NhbGU1ZmFjZXRFTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUVDMkVtygUtX19aTlN0M19fMjZsb2NhbGU1X19pbXA3aW5zdGFsbEVQTlMwXzVmYWNldEVsywVNX19aTlN0M19fMjZ2ZWN0b3JJUE5TXzZsb2NhbGU1ZmFjZXRFTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUU2cmVzaXplRW3MBU9fX1pOU3QzX18yNnZlY3RvcklQTlNfNmxvY2FsZTVmYWNldEVOU18xNV9fc3NvX2FsbG9jYXRvcklTM19MbTI4RUVFRThfX2FwcGVuZEVtzQVaX19aTlN0M19fMjZ2ZWN0b3JJUE5TXzZsb2NhbGU1ZmFjZXRFTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUUxOF9fY29uc3RydWN0X2F0X2VuZEVtzgVWX19aTlN0M19fMjE0X19zcGxpdF9idWZmZXJJUE5TXzZsb2NhbGU1ZmFjZXRFUk5TXzE1X19zc29fYWxsb2NhdG9ySVMzX0xtMjhFRUVFQzJFbW1TNl/PBWRfX1pOU3QzX18yMTRfX3NwbGl0X2J1ZmZlcklQTlNfNmxvY2FsZTVmYWNldEVSTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUUxOF9fY29uc3RydWN0X2F0X2VuZEVt0AV/X19aTlN0M19fMjZ2ZWN0b3JJUE5TXzZsb2NhbGU1ZmFjZXRFTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUUyNl9fc3dhcF9vdXRfY2lyY3VsYXJfYnVmZmVyRVJOU18xNF9fc3BsaXRfYnVmZmVySVMzX1JTNV9FRdEFUl9fWk5TdDNfXzIxNF9fc3BsaXRfYnVmZmVySVBOU182bG9jYWxlNWZhY2V0RVJOU18xNV9fc3NvX2FsbG9jYXRvcklTM19MbTI4RUVFRUQyRXbSBRpfX1pOU3QzX18yOG51bXB1bmN0SXdFQzJFbdMFGl9fWk5TdDNfXzI4bnVtcHVuY3RJY0VDMkVt1AVTX19aTlN0M19fMjZ2ZWN0b3JJUE5TXzZsb2NhbGU1ZmFjZXRFTlNfMTVfX3Nzb19hbGxvY2F0b3JJUzNfTG0yOEVFRUUxMV9fdmFsbG9jYXRlRW3VBRtfX1pOU3QzX18yNmxvY2FsZTdjbGFzc2ljRXbWBRxfX1pOU3QzX18yNmxvY2FsZThfX2dsb2JhbEV21wUVX19aTlN0M19fMjZsb2NhbGVDMkV22AUkX19aTlN0M19fMjExX19jYWxsX29uY2VFUlZtUHZQRnZTMl9F2QUkX19aTlN0M19fMjE4X19saWJjcHBfcmVmc3RyaW5nQzJFUEtj2gUZX19aTlN0MTFsb2dpY19lcnJvckMyRVBLY9sFSF9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVDMkVSS1M1X9wFTF9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU2X19pbml0RVBLY23dBUpfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFNl9faW5pdEVtY94FJl9fWk5TdDNfXzIxMWNoYXJfdHJhaXRzSWNFNmFzc2lnbkVQY21j3wVPX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUMyRVJLUzVfbW1SS1M0X+AFRF9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVEMkV24QVIX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRWFTRVJLUzVf4gVMX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRTZhc3NpZ25FUEtjbeMFJl9fWk5TdDNfXzIxMWNoYXJfdHJhaXRzSWNFNG1vdmVFUGNQS2Nt5AVhX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRTIxX19ncm93X2J5X2FuZF9yZXBsYWNlRW1tbW1tbVBLY+UFS19fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU2YXNzaWduRVBLY+YFSl9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU2cmVzaXplRW1j5wVKX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRTZhcHBlbmRFbWPoBVFfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFOV9fZ3Jvd19ieUVtbW1tbW3pBUxfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFNmFwcGVuZEVQS2Nt6gVMX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRTlwdXNoX2JhY2tFY+sFS19fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU2aW5zZXJ0RW1tY+wFX19fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU2aW5zZXJ0RU5TXzExX193cmFwX2l0ZXJJUEtjRUVj7QVJX19aTktTdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUU0ZmluZEVjbe4FTF9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUU2X19pbml0RVBLd23vBUpfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFNl9faW5pdEVtd/AFTF9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUU2YXNzaWduRVBLd23xBWFfX1pOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFMjFfX2dyb3dfYnlfYW5kX3JlcGxhY2VFbW1tbW1tUEt38gVLX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRTZhc3NpZ25FUEt38wVRX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRTlfX2dyb3dfYnlFbW1tbW1t9AVMX19aTlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRTZhcHBlbmRFUEt3bfUFTF9fWk5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUU5cHVzaF9iYWNrRXf2BQdfbWFsbG9j9wUFX2ZyZWX4BQhfcmVhbGxvY/kFEl90cnlfcmVhbGxvY19jaHVua/oFDl9kaXNwb3NlX2NodW5r+wUFX3Nicmv8BRhfZW1zY3JpcHRlbl9nZXRfc2Jya19wdHL9BQdfbWVtY3B5/gUIX21lbW1vdmX/BQdfbWVtc2V0gAYKZHluQ2FsbF9paYEGD2R5bkNhbGxfaWlkaWlpaYIGC2R5bkNhbGxfaWlpgwYMZHluQ2FsbF9paWlphAYNZHluQ2FsbF9paWlpaYUGDmR5bkNhbGxfaWlpaWlkhgYOZHluQ2FsbF9paWlpaWmHBg9keW5DYWxsX2lpaWlpaWSIBg9keW5DYWxsX2lpaWlpaWmJBhBkeW5DYWxsX2lpaWlpaWlpigYRZHluQ2FsbF9paWlpaWlpaWmLBglkeW5DYWxsX3aMBgpkeW5DYWxsX3ZpjQYLZHluQ2FsbF92aWmOBgxkeW5DYWxsX3ZpaWmPBg1keW5DYWxsX3ZpaWlpkAYOZHluQ2FsbF92aWlpaWmRBg9keW5DYWxsX3ZpaWlpaWmSBgJiMJMGAmIxlAYCYjKVBgJiM5YGAmI0lwYCYjWYBgJiNpkGAmI3mgYCYjibBgJiOZwGA2IxMJ0GA2IxMZ4GA2IxMp8GA2IxM6AGA2IxNKEGA2IxNaIGA2IxNqMGA2IxN6QGA2IxOKUGA2IxOaYGA2IyMKcGGGxlZ2Fsc3R1YiRkeW5DYWxsX2lpaWlpaqgGFmxlZ2Fsc3R1YiRkeW5DYWxsX2ppammpBhhsZWdhbHN0dWIkZHluQ2FsbF92aWlqaWkAIxBzb3VyY2VNYXBwaW5nVVJMEW1tbGlnbmVyLndhc20ubWFw';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (wasmBinary) {
      return new Uint8Array(wasmBinary);
    }

    var binary = tryParseAsDataURI(wasmBinaryFile);
    if (binary) {
      return binary;
    }
    if (readBinary) {
      return readBinary(wasmBinaryFile);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // if we don't have the binary yet, and have the Fetch api, use that
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return new Promise(function(resolve, reject) {
    resolve(getBinary());
  });
}



// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_unstable': asmLibraryArg
    ,
    'global': {
      'NaN': NaN,
      'Infinity': Infinity
    },
    'global.Math': Math,
    'asm2wasm': asm2wasmImports
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    Module['asm'] = exports;
    removeRunDependency('wasm-instantiate');
  }
   // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');


  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
      // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
  }


  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);
      abort(reason);
    });
  }

  // Prefer streaming instantiation if available.
  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
        return result.then(receiveInstantiatedSource, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            instantiateArrayBuffer(receiveInstantiatedSource);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiatedSource);
    }
  }
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}

Module['asm'] = createWasm;

// Globals used by JS i64 conversions
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = [function() { allReady() }];

function _emscripten_asm_const_i(code) {
  return ASM_CONSTS[code]();
}




// STATICTOP = STATIC_BASE + 28272;
/* global initializers */  __ATINIT__.push({ func: function() { globalCtors() } });








/* no memory initializer */
var tempDoublePtr = 29280

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}

function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}

// {{PRE_LIBRARY}}


  function demangle(func) {
      return func;
    }

  function demangleAll(text) {
      var regex =
        /\b__Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function jsStackTrace() {
      var err = new Error();
      if (!err.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error(0);
        } catch(e) {
          err = e;
        }
        if (!err.stack) {
          return '(no stack trace available)';
        }
      }
      return err.stack.toString();
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }

  
  var ___exception_infos={};
  
  var ___exception_last=0;function ___cxa_throw(ptr, type, destructor) {
      ___exception_infos[ptr] = {
        ptr: ptr,
        adjusted: [ptr],
        type: type,
        destructor: destructor,
        refcount: 0,
        caught: false,
        rethrown: false
      };
      ___exception_last = ptr;
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exceptions = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exceptions++;
      }
      throw ptr;
    }

  function ___gxx_personality_v0() {
    }

  function ___lock() {}

  
  function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[((Module['___errno_location']())>>2)]=value;
      return value;
    }function ___map_file(pathname, size) {
      ___setErrNo(63);
      return -1;
    }

  
  
  var PATH={splitPath:function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function(parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function(path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function(path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function(path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function(path) {
        return PATH.splitPath(path)[3];
      },join:function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function(l, r) {
        return PATH.normalize(l + '/' + r);
      }};
  
  
  var PATH_FS={resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function(stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                else throw e;
              }
  
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function(node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array;
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
        return;
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // If memory can grow, we don't want to hold on to references of
          // the memory Buffer, as they may get invalidated. That means
          // we need to do a copy here.
          canOwn = false;
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            // malloc() can lead to growing the heap. If targeting the heap, we need to
            // re-acquire the heap buffer object in case growth had occurred.
            var fromHeap = (buffer.buffer == HEAP8.buffer);
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            (fromHeap ? HEAP8 : buffer).set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var IDBFS={dbs:{},indexedDB:function() {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function(mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function(mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function(name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },getLocalSet:function(mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function(mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = function(e) {
              callback(this.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = function(event) {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db: db, entries: entries });
              }
  
              entries[cursor.primaryKey] = { timestamp: cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },loadLocalEntry:function(path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function(path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function(path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function(store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },storeRemoteEntry:function(store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },removeRemoteEntry:function(store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },reconcile:function(src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err && !errored) {
            errored = true;
            return callback(err);
          }
        };
  
        transaction.onerror = function(e) {
          done(this.error);
          e.preventDefault();
        };
  
        transaction.oncomplete = function(e) {
          if (!errored) {
            callback(null);
          }
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  
  var ERRNO_CODES={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135};var NODEFS={isWindows:false,staticInit:function() {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process["binding"]("constants");
        // Node.js 4 compatibility: it has no namespaces for constants
        if (flags["fs"]) {
          flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = {
          "1024": flags["O_APPEND"],
          "64": flags["O_CREAT"],
          "128": flags["O_EXCL"],
          "0": flags["O_RDONLY"],
          "2": flags["O_RDWR"],
          "4096": flags["O_SYNC"],
          "512": flags["O_TRUNC"],
          "1": flags["O_WRONLY"]
        };
      },bufferFrom:function (arrayBuffer) {
        // Node.js < 4.5 compatibility: Buffer.from does not support ArrayBuffer
        // Buffer.from before 4.5 was just a method inherited from Uint8Array
        // Buffer.alloc has been added with Buffer.from together, so check it instead
        return Buffer["alloc"] ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
      },convertNodeCode:function(e) {
        var code = e.code;
        assert(code in ERRNO_CODES);
        return ERRNO_CODES[code];
      },mount:function (mount) {
        assert(ENVIRONMENT_HAS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(28);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits
            stat.mode = stat.mode | ((stat.mode & 292) >> 2);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsForNode:function(flags) {
        flags &= ~0x200000 /*O_PATH*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x800 /*O_NONBLOCK*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x8000 /*O_LARGEFILE*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x80000 /*O_CLOEXEC*/; // Some applications may pass it; it makes no sense for a single process.
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }
  
        if (!flags) {
          return newFlags;
        } else {
          throw new FS.ErrnoError(28);
        }
      },node_ops:{getattr:function(node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function(node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },unlink:function(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },rmdir:function(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },readdir:function(node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },symlink:function(parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },readlink:function(node) {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },read:function (stream, buffer, offset, length, position) {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;
          try {
            return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },write:function (stream, buffer, offset, length, position) {
          try {
            return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
  
          return position;
        }}};
  
  var WORKERFS={DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function (mount) {
        assert(ENVIRONMENT_IS_WORKER);
        if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
        var root = WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0);
        var createdParents = {};
        function ensureParent(path) {
          // return the parent node, creating subdirs as necessary
          var parts = path.split('/');
          var parent = root;
          for (var i = 0; i < parts.length-1; i++) {
            var curr = parts.slice(0, i+1).join('/');
            // Issue 4254: Using curr as a node name will prevent the node
            // from being found in FS.nameTable when FS.open is called on
            // a path which holds a child of this node,
            // given that all FS functions assume node names
            // are just their corresponding parts within their given path,
            // rather than incremental aggregates which include their parent's
            // directories.
            if (!createdParents[curr]) {
              createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
            }
            parent = createdParents[curr];
          }
          return parent;
        }
        function base(path) {
          var parts = path.split('/');
          return parts[parts.length-1];
        }
        // We also accept FileList here, by using Array.prototype
        Array.prototype.forEach.call(mount.opts["files"] || [], function(file) {
          WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
        });
        (mount.opts["blobs"] || []).forEach(function(obj) {
          WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
        });
        (mount.opts["packages"] || []).forEach(function(pack) {
          pack['metadata'].files.forEach(function(file) {
            var name = file.filename.substr(1); // remove initial slash
            WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack['blob'].slice(file.start, file.end));
          });
        });
        return root;
      },createNode:function (parent, name, mode, dev, contents, mtime) {
        var node = FS.createNode(parent, name, mode);
        node.mode = mode;
        node.node_ops = WORKERFS.node_ops;
        node.stream_ops = WORKERFS.stream_ops;
        node.timestamp = (mtime || new Date).getTime();
        assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
        if (mode === WORKERFS.FILE_MODE) {
          node.size = contents.size;
          node.contents = contents;
        } else {
          node.size = 4096;
          node.contents = {};
        }
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },node_ops:{getattr:function(node) {
          return {
            dev: 1,
            ino: undefined,
            mode: node.mode,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: undefined,
            size: node.size,
            atime: new Date(node.timestamp),
            mtime: new Date(node.timestamp),
            ctime: new Date(node.timestamp),
            blksize: 4096,
            blocks: Math.ceil(node.size / 4096),
          };
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
        },lookup:function(parent, name) {
          throw new FS.ErrnoError(44);
        },mknod:function (parent, name, mode, dev) {
          throw new FS.ErrnoError(63);
        },rename:function (oldNode, newDir, newName) {
          throw new FS.ErrnoError(63);
        },unlink:function(parent, name) {
          throw new FS.ErrnoError(63);
        },rmdir:function(parent, name) {
          throw new FS.ErrnoError(63);
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newName, oldPath) {
          throw new FS.ErrnoError(63);
        },readlink:function(node) {
          throw new FS.ErrnoError(63);
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          if (position >= stream.node.size) return 0;
          var chunk = stream.node.contents.slice(position, position + length);
          var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
          buffer.set(new Uint8Array(ab), offset);
          return chunk.size;
        },write:function (stream, buffer, offset, length, position) {
          throw new FS.ErrnoError(29);
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.size;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }}};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function(e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function(path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function(parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function(parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function(parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); }
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); }
            }
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function(node) {
        FS.hashRemoveNode(node);
      },isRoot:function(node) {
        return node === node.parent;
      },isMountpoint:function(node) {
        return !!node.mounted;
      },isFile:function(mode) {
        return (mode & 61440) === 32768;
      },isDir:function(mode) {
        return (mode & 61440) === 16384;
      },isLink:function(mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function(mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function(mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function(mode) {
        return (mode & 61440) === 4096;
      },isSocket:function(mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 2;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 2;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:function(dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:function(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:function(fd) {
        return FS.streams[fd];
      },createStream:function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function(fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function() {
          throw new FS.ErrnoError(70);
        }},major:function(dev) {
        return ((dev) >> 8);
      },minor:function(dev) {
        return ((dev) & 0xff);
      },makedev:function(ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function(dev) {
        return FS.devices[dev];
      },getMounts:function(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function(populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          console.log('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(err) {
          FS.syncFSRequests--;
          return callback(err);
        }
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function(type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },lookup:function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:function(path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(10);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:function(path) {
        return FS.stat(path, true);
      },chmod:function(path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function(path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:function(path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function(path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            console.log("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:function(stream) {
        return stream.fd === null;
      },llseek:function(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 /* SEEK_SET */ && whence != 1 /* SEEK_CUR */ && whence != 2 /* SEEK_END */) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function(stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function(stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function(stream, buffer, offset, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },msync:function(stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function(stream) {
        return 0;
      },ioctl:function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function(path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function() {
        return FS.currentPath;
      },chdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else
        if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = require('crypto');
            // nodejs has crypto support
            random_device = function() { return crypto_module['randomBytes'](1)[0]; };
          } catch (e) {
            // nodejs doesn't have crypto support
          }
        } else
        {}
        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function() { abort("random_device"); };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        var stdout = FS.open('/dev/stdout', 'w');
        var stderr = FS.open('/dev/stderr', 'w');
      },ensureErrnoError:function() {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
          };
          this.setErrno(errno);
          this.message = 'FS error';
  
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function() {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
          'WORKERFS': WORKERFS,
        };
      },init:function(input, output, error) {
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function(canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function(parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function(relative, base) {
        return PATH_FS.resolve(base, relative);
      },standardizePath:function(path) {
        return PATH.normalize(path);
      },findObject:function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function(parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function(parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function(parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function(parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(29);
        return success;
      },createLazyFile:function(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(29);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(29);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function() {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var SYSCALLS={DEFAULT_POLLMASK:5,mappings:{},umask:511,calculateAt:function(dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(8);
            dir = dirstream.path;
          }
          path = PATH.join2(dir, path);
        }
        return path;
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(40))>>2)]=tempI64[0],HEAP32[(((buf)+(44))>>2)]=tempI64[1]);
        HEAP32[(((buf)+(48))>>2)]=4096;
        HEAP32[(((buf)+(52))>>2)]=stat.blocks;
        HEAP32[(((buf)+(56))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(76))>>2)]=0;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(80))>>2)]=tempI64[0],HEAP32[(((buf)+(84))>>2)]=tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags) {
        var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
        FS.msync(stream, buffer, 0, len, flags);
      },doMkdir:function(path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function(path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function(path, buf, bufsize) {
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function(path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -28;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      },doDup:function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:0,get:function(varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function() {
        var ret = UTF8ToString(SYSCALLS.get());
        return ret;
      },getStreamFromFD:function(fd) {
        if (!fd) fd = SYSCALLS.get();
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },get64:function() {
        var low = SYSCALLS.get(), high = SYSCALLS.get();
        return low;
      },getZero:function() {
        SYSCALLS.get();
      }};function ___syscall140(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // llseek
      var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
      var HIGH_OFFSET = 0x100000000; // 2^32
      // use an unsigned operator on low and shift high by 32-bits
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  
      var DOUBLE_LIMIT = 0x20000000000000; // 2^53
      // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61;
      }
  
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((result)>>2)]=tempI64[0],HEAP32[(((result)+(4))>>2)]=tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall145(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // readv
      var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      return SYSCALLS.doReadv(stream, iov, iovcnt);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  
  function __emscripten_syscall_munmap(addr, len) {
      if (addr === -1 || len === 0) {
        return -28;
      }
      // TODO: support unmmap'ing parts of allocations
      var info = SYSCALLS.mappings[addr];
      if (!info) return 0;
      if (len === info.len) {
        var stream = FS.getStream(info.fd);
        SYSCALLS.doMsync(addr, stream, len, info.flags);
        FS.munmap(stream);
        SYSCALLS.mappings[addr] = null;
        if (info.allocated) {
          _free(info.malloc);
        }
      }
      return 0;
    }function ___syscall91(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // munmap
      var addr = SYSCALLS.get(), len = SYSCALLS.get();
      return __emscripten_syscall_munmap(addr, len);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___unlock() {}

  
  function _fd_close(fd) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }function ___wasi_fd_close(
  ) {
  return _fd_close.apply(null, arguments)
  }

  
  function _fd_write(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)]=num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }function ___wasi_fd_write(
  ) {
  return _fd_write.apply(null, arguments)
  }

  
  function getShiftFromSize(size) {
      switch (size) {
          case 1: return 0;
          case 2: return 1;
          case 4: return 2;
          case 8: return 3;
          default:
              throw new TypeError('Unknown type size: ' + size);
      }
    }
  
  
  
  function embind_init_charCodes() {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    }var embind_charCodes=undefined;function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    }
  
  
  var awaitingDependencies={};
  
  var registeredTypes={};
  
  var typeDependencies={};
  
  
  
  
  
  
  var char_0=48;
  
  var char_9=57;function makeLegalFunctionName(name) {
      if (undefined === name) {
          return '_unknown';
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, '$');
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
          return '_' + name;
      } else {
          return name;
      }
    }function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      /*jshint evil:true*/
      return new Function(
          "body",
          "return function " + name + "() {\n" +
          "    \"use strict\";" +
          "    return body.apply(this, arguments);\n" +
          "};\n"
      )(body);
    }function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function(message) {
          this.name = errorName;
          this.message = message;
  
          var stack = (new Error(message)).stack;
          if (stack !== undefined) {
              this.stack = this.toString() + '\n' +
                  stack.replace(/^Error(:[^\n]*)?\n/, '');
          }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function() {
          if (this.message === undefined) {
              return this.name;
          } else {
              return this.name + ': ' + this.message;
          }
      };
  
      return errorClass;
    }var BindingError=undefined;function throwBindingError(message) {
      throw new BindingError(message);
    }
  
  
  
  var InternalError=undefined;function throwInternalError(message) {
      throw new InternalError(message);
    }function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
      });
  
      function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) {
              throwInternalError('Mismatched type converter count');
          }
          for (var i = 0; i < myTypes.length; ++i) {
              registerType(myTypes[i], myTypeConverters[i]);
          }
      }
  
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach(function(dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) {
              typeConverters[i] = registeredTypes[dt];
          } else {
              unregisteredTypes.push(dt);
              if (!awaitingDependencies.hasOwnProperty(dt)) {
                  awaitingDependencies[dt] = [];
              }
              awaitingDependencies[dt].push(function() {
                  typeConverters[i] = registeredTypes[dt];
                  ++registered;
                  if (registered === unregisteredTypes.length) {
                      onComplete(typeConverters);
                  }
              });
          }
      });
      if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
      }
    }function registerType(rawType, registeredInstance, options) {
      options = options || {};
  
      if (!('argPackAdvance' in registeredInstance)) {
          throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }
  
      var name = registeredInstance.name;
      if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
              return;
          } else {
              throwBindingError("Cannot register type '" + name + "' twice");
          }
      }
  
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
  
      if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach(function(cb) {
              cb();
          });
      }
    }function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size);
  
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(wt) {
              // ambiguous emscripten ABI: sometimes return values are
              // true or false, and sometimes integers (0 or 1)
              return !!wt;
          },
          'toWireType': function(destructors, o) {
              return o ? trueValue : falseValue;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': function(pointer) {
              // TODO: if heap is fixed (like in asm.js) this could be executed outside
              var heap;
              if (size === 1) {
                  heap = HEAP8;
              } else if (size === 2) {
                  heap = HEAP16;
              } else if (size === 4) {
                  heap = HEAP32;
              } else {
                  throw new TypeError("Unknown boolean type size: " + name);
              }
              return this['fromWireType'](heap[pointer >> shift]);
          },
          destructorFunction: null, // This type does not need a destructor
      });
    }

  
  
  var emval_free_list=[];
  
  var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = undefined;
          emval_free_list.push(handle);
      }
    }
  
  
  
  function count_emval_handles() {
      var count = 0;
      for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== undefined) {
              ++count;
          }
      }
      return count;
    }
  
  function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== undefined) {
              return emval_handle_array[i];
          }
      }
      return null;
    }function init_emval() {
      Module['count_emval_handles'] = count_emval_handles;
      Module['get_first_emval'] = get_first_emval;
    }function __emval_register(value) {
  
      switch(value){
        case undefined :{ return 1; }
        case null :{ return 2; }
        case true :{ return 3; }
        case false :{ return 4; }
        default:{
          var handle = emval_free_list.length ?
              emval_free_list.pop() :
              emval_handle_array.length;
  
          emval_handle_array[handle] = {refcount: 1, value: value};
          return handle;
          }
        }
    }
  
  function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAPU32[pointer >> 2]);
    }function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(handle) {
              var rv = emval_handle_array[handle].value;
              __emval_decref(handle);
              return rv;
          },
          'toWireType': function(destructors, value) {
              return __emval_register(value);
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: null, // This type does not need a destructor
  
          // TODO: do we need a deleteObject here?  write a test where
          // emval is passed into JS via an interface
      });
    }

  
  function _embind_repr(v) {
      if (v === null) {
          return 'null';
      }
      var t = typeof v;
      if (t === 'object' || t === 'array' || t === 'function') {
          return v.toString();
      } else {
          return '' + v;
      }
    }
  
  function floatReadValueFromPointer(name, shift) {
      switch (shift) {
          case 2: return function(pointer) {
              return this['fromWireType'](HEAPF32[pointer >> 2]);
          };
          case 3: return function(pointer) {
              return this['fromWireType'](HEAPF64[pointer >> 3]);
          };
          default:
              throw new TypeError("Unknown float type: " + name);
      }
    }function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(value) {
              return value;
          },
          'toWireType': function(destructors, value) {
              // todo: Here we have an opportunity for -O3 level "unsafe" optimizations: we could
              // avoid the following if() and assume value is of proper type.
              if (typeof value !== "number" && typeof value !== "boolean") {
                  throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
              }
              return value;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': floatReadValueFromPointer(name, shift),
          destructorFunction: null, // This type does not need a destructor
      });
    }

  
  
  function new_(constructor, argumentList) {
      if (!(constructor instanceof Function)) {
          throw new TypeError('new_ called with constructor type ' + typeof(constructor) + " which is not a function");
      }
  
      /*
       * Previously, the following line was just:
  
       function dummy() {};
  
       * Unfortunately, Chrome was preserving 'dummy' as the object's name, even though at creation, the 'dummy' has the
       * correct constructor name.  Thus, objects created with IMVU.new would show up in the debugger as 'dummy', which
       * isn't very helpful.  Using IMVU.createNamedFunction addresses the issue.  Doublely-unfortunately, there's no way
       * to write a test for this behavior.  -NRD 2013.02.22
       */
      var dummy = createNamedFunction(constructor.name || 'unknownFunctionName', function(){});
      dummy.prototype = constructor.prototype;
      var obj = new dummy;
  
      var r = constructor.apply(obj, argumentList);
      return (r instanceof Object) ? r : obj;
    }
  
  function runDestructors(destructors) {
      while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr);
      }
    }function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
      // humanName: a human-readable string name for the function to be generated.
      // argTypes: An array that contains the embind type objects for all types in the function signature.
      //    argTypes[0] is the type object for the function return value.
      //    argTypes[1] is the type object for function this object/class type, or null if not crafting an invoker for a class method.
      //    argTypes[2...] are the actual function parameters.
      // classType: The embind type object for the class to be bound, or null if this is not a method of a class.
      // cppInvokerFunc: JS Function object to the C++-side function that interops into C++ code.
      // cppTargetFunc: Function pointer (an integer to FUNCTION_TABLE) to the target C++ function the cppInvokerFunc will end up calling.
      var argCount = argTypes.length;
  
      if (argCount < 2) {
          throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }
  
      var isClassMethodFunc = (argTypes[1] !== null && classType !== null);
  
      // Free functions with signature "void function()" do not need an invoker that marshalls between wire types.
  // TODO: This omits argument count check - enable only at -O3 or similar.
  //    if (ENABLE_UNSAFE_OPTS && argCount == 2 && argTypes[0].name == "void" && !isClassMethodFunc) {
  //       return FUNCTION_TABLE[fn];
  //    }
  
  
      // Determine if we need to use a dynamic stack to store the destructors for the function parameters.
      // TODO: Remove this completely once all function invokers are being dynamically generated.
      var needsDestructorStack = false;
  
      for(var i = 1; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here.
          if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) { // The type does not define a destructor function - must use dynamic stack
              needsDestructorStack = true;
              break;
          }
      }
  
      var returns = (argTypes[0].name !== "void");
  
      var argsList = "";
      var argsListWired = "";
      for(var i = 0; i < argCount - 2; ++i) {
          argsList += (i!==0?", ":"")+"arg"+i;
          argsListWired += (i!==0?", ":"")+"arg"+i+"Wired";
      }
  
      var invokerFnBody =
          "return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n" +
          "if (arguments.length !== "+(argCount - 2)+") {\n" +
              "throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount - 2)+" args!');\n" +
          "}\n";
  
  
      if (needsDestructorStack) {
          invokerFnBody +=
              "var destructors = [];\n";
      }
  
      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
      var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
  
  
      if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam.toWireType("+dtorStack+", this);\n";
      }
  
      for(var i = 0; i < argCount - 2; ++i) {
          invokerFnBody += "var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";
          args1.push("argType"+i);
          args2.push(argTypes[i+2]);
      }
  
      if (isClassMethodFunc) {
          argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
      }
  
      invokerFnBody +=
          (returns?"var rv = ":"") + "invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";
  
      if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
      } else {
          for(var i = isClassMethodFunc?1:2; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
              var paramName = (i === 1 ? "thisWired" : ("arg"+(i - 2)+"Wired"));
              if (argTypes[i].destructorFunction !== null) {
                  invokerFnBody += paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";
                  args1.push(paramName+"_dtor");
                  args2.push(argTypes[i].destructorFunction);
              }
          }
      }
  
      if (returns) {
          invokerFnBody += "var ret = retType.fromWireType(rv);\n" +
                           "return ret;\n";
      } else {
      }
      invokerFnBody += "}\n";
  
      args1.push(invokerFnBody);
  
      var invokerFunction = new_(Function, args1).apply(null, args2);
      return invokerFunction;
    }
  
  
  function ensureOverloadTable(proto, methodName, humanName) {
      if (undefined === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          // Inject an overload resolver function that routes to the appropriate overload based on the number of arguments.
          proto[methodName] = function() {
              // TODO This check can be removed in -O3 level "unsafe" optimizations.
              if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
                  throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
              }
              return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
          };
          // Move the previous function into the overload table.
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    }function exposePublicSymbol(name, value, numArguments) {
      if (Module.hasOwnProperty(name)) {
          if (undefined === numArguments || (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])) {
              throwBindingError("Cannot register public name '" + name + "' twice");
          }
  
          // We are exposing a function with the same name as an existing function. Create an overload table and a function selector
          // that routes between the two.
          ensureOverloadTable(Module, name, name);
          if (Module.hasOwnProperty(numArguments)) {
              throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
          }
          // Add the new function into the overload table.
          Module[name].overloadTable[numArguments] = value;
      }
      else {
          Module[name] = value;
          if (undefined !== numArguments) {
              Module[name].numArguments = numArguments;
          }
      }
    }
  
  function heap32VectorToArray(count, firstElement) {
      var array = [];
      for (var i = 0; i < count; i++) {
          array.push(HEAP32[(firstElement >> 2) + i]);
      }
      return array;
    }
  
  function replacePublicSymbol(name, value, numArguments) {
      if (!Module.hasOwnProperty(name)) {
          throwInternalError('Replacing nonexistant public symbol');
      }
      // If there's an overload table for this symbol, replace the symbol in the overload table instead.
      if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
          Module[name].overloadTable[numArguments] = value;
      }
      else {
          Module[name] = value;
          Module[name].argCount = numArguments;
      }
    }
  
  function embind__requireFunction(signature, rawFunction) {
      signature = readLatin1String(signature);
  
      function makeDynCaller(dynCall) {
          var args = [];
          for (var i = 1; i < signature.length; ++i) {
              args.push('a' + i);
          }
  
          var name = 'dynCall_' + signature + '_' + rawFunction;
          var body = 'return function ' + name + '(' + args.join(', ') + ') {\n';
          body    += '    return dynCall(rawFunction' + (args.length ? ', ' : '') + args.join(', ') + ');\n';
          body    += '};\n';
  
          return (new Function('dynCall', 'rawFunction', body))(dynCall, rawFunction);
      }
  
      var fp;
      if (Module['FUNCTION_TABLE_' + signature] !== undefined) {
          fp = Module['FUNCTION_TABLE_' + signature][rawFunction];
      } else if (typeof FUNCTION_TABLE !== "undefined") {
          fp = FUNCTION_TABLE[rawFunction];
      } else {
          // asm.js does not give direct access to the function tables,
          // and thus we must go through the dynCall interface which allows
          // calling into a signature's function table by pointer value.
          //
          // https://github.com/dherman/asm.js/issues/83
          //
          // This has three main penalties:
          // - dynCall is another function call in the path from JavaScript to C++.
          // - JITs may not predict through the function table indirection at runtime.
          var dc = Module['dynCall_' + signature];
          if (dc === undefined) {
              // We will always enter this branch if the signature
              // contains 'f' and PRECISE_F32 is not enabled.
              //
              // Try again, replacing 'f' with 'd'.
              dc = Module['dynCall_' + signature.replace(/f/g, 'd')];
              if (dc === undefined) {
                  throwBindingError("No dynCall invoker for signature: " + signature);
              }
          }
          fp = makeDynCaller(dc);
      }
  
      if (typeof fp !== "function") {
          throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
      }
      return fp;
    }
  
  
  var UnboundTypeError=undefined;
  
  function getTypeName(type) {
      var ptr = ___getTypeName(type);
      var rv = readLatin1String(ptr);
      _free(ptr);
      return rv;
    }function throwUnboundTypeError(message, types) {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
          if (seen[type]) {
              return;
          }
          if (registeredTypes[type]) {
              return;
          }
          if (typeDependencies[type]) {
              typeDependencies[type].forEach(visit);
              return;
          }
          unboundTypes.push(type);
          seen[type] = true;
      }
      types.forEach(visit);
  
      throw new UnboundTypeError(message + ': ' + unboundTypes.map(getTypeName).join([', ']));
    }function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
  
      rawInvoker = embind__requireFunction(signature, rawInvoker);
  
      exposePublicSymbol(name, function() {
          throwUnboundTypeError('Cannot call ' + name + ' due to unbound types', argTypes);
      }, argCount - 1);
  
      whenDependentTypesAreResolved([], argTypes, function(argTypes) {
          var invokerArgsArray = [argTypes[0] /* return value */, null /* no class 'this'*/].concat(argTypes.slice(1) /* actual params */);
          replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null /* no class 'this'*/, rawInvoker, fn), argCount - 1);
          return [];
      });
    }

  
  function integerReadValueFromPointer(name, shift, signed) {
      // integers are quite common, so generate very specialized functions
      switch (shift) {
          case 0: return signed ?
              function readS8FromPointer(pointer) { return HEAP8[pointer]; } :
              function readU8FromPointer(pointer) { return HEAPU8[pointer]; };
          case 1: return signed ?
              function readS16FromPointer(pointer) { return HEAP16[pointer >> 1]; } :
              function readU16FromPointer(pointer) { return HEAPU16[pointer >> 1]; };
          case 2: return signed ?
              function readS32FromPointer(pointer) { return HEAP32[pointer >> 2]; } :
              function readU32FromPointer(pointer) { return HEAPU32[pointer >> 2]; };
          default:
              throw new TypeError("Unknown integer type: " + name);
      }
    }function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name);
      if (maxRange === -1) { // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come out as 'i32 -1'. Always treat those as max u32.
          maxRange = 4294967295;
      }
  
      var shift = getShiftFromSize(size);
  
      var fromWireType = function(value) {
          return value;
      };
  
      if (minRange === 0) {
          var bitshift = 32 - 8*size;
          fromWireType = function(value) {
              return (value << bitshift) >>> bitshift;
          };
      }
  
      var isUnsignedType = (name.indexOf('unsigned') != -1);
  
      registerType(primitiveType, {
          name: name,
          'fromWireType': fromWireType,
          'toWireType': function(destructors, value) {
              // todo: Here we have an opportunity for -O3 level "unsafe" optimizations: we could
              // avoid the following two if()s and assume value is of proper type.
              if (typeof value !== "number" && typeof value !== "boolean") {
                  throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
              }
              if (value < minRange || value > maxRange) {
                  throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ', ' + maxRange + ']!');
              }
              return isUnsignedType ? (value >>> 0) : (value | 0);
          },
          'argPackAdvance': 8,
          'readValueFromPointer': integerReadValueFromPointer(name, shift, minRange !== 0),
          destructorFunction: null, // This type does not need a destructor
      });
    }

  function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
      ];
  
      var TA = typeMapping[dataTypeIndex];
  
      function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle]; // in elements
          var data = heap[handle + 1]; // byte offset into emscripten heap
          return new TA(heap['buffer'], data, size);
      }
  
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': decodeMemoryView,
          'argPackAdvance': 8,
          'readValueFromPointer': decodeMemoryView,
      }, {
          ignoreDuplicateRegistrations: true,
      });
    }

  function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8
      //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = (name === "std::string");
  
      registerType(rawType, {
          name: name,
          'fromWireType': function(value) {
              var length = HEAPU32[value >> 2];
  
              var str;
              if(stdStringIsUTF8) {
                  //ensure null termination at one-past-end byte if not present yet
                  var endChar = HEAPU8[value + 4 + length];
                  var endCharSwap = 0;
                  if(endChar != 0)
                  {
                    endCharSwap = endChar;
                    HEAPU8[value + 4 + length] = 0;
                  }
  
                  var decodeStartPtr = value + 4;
                  //looping here to support possible embedded '0' bytes
                  for (var i = 0; i <= length; ++i) {
                    var currentBytePtr = value + 4 + i;
                    if(HEAPU8[currentBytePtr] == 0)
                    {
                      var stringSegment = UTF8ToString(decodeStartPtr);
                      if(str === undefined)
                        str = stringSegment;
                      else
                      {
                        str += String.fromCharCode(0);
                        str += stringSegment;
                      }
                      decodeStartPtr = currentBytePtr + 1;
                    }
                  }
  
                  if(endCharSwap != 0)
                    HEAPU8[value + 4 + length] = endCharSwap;
              } else {
                  var a = new Array(length);
                  for (var i = 0; i < length; ++i) {
                      a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
                  }
                  str = a.join('');
              }
  
              _free(value);
              
              return str;
          },
          'toWireType': function(destructors, value) {
              if (value instanceof ArrayBuffer) {
                  value = new Uint8Array(value);
              }
              
              var getLength;
              var valueIsOfTypeString = (typeof value === 'string');
  
              if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                  throwBindingError('Cannot pass non-string to std::string');
              }
              if (stdStringIsUTF8 && valueIsOfTypeString) {
                  getLength = function() {return lengthBytesUTF8(value);};
              } else {
                  getLength = function() {return value.length;};
              }
              
              // assumes 4-byte alignment
              var length = getLength();
              var ptr = _malloc(4 + length + 1);
              HEAPU32[ptr >> 2] = length;
  
              if (stdStringIsUTF8 && valueIsOfTypeString) {
                  stringToUTF8(value, ptr + 4, length + 1);
              } else {
                  if(valueIsOfTypeString) {
                      for (var i = 0; i < length; ++i) {
                          var charCode = value.charCodeAt(i);
                          if (charCode > 255) {
                              _free(ptr);
                              throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                          }
                          HEAPU8[ptr + 4 + i] = charCode;
                      }
                  } else {
                      for (var i = 0; i < length; ++i) {
                          HEAPU8[ptr + 4 + i] = value[i];
                      }
                  }
              }
  
              if (destructors !== null) {
                  destructors.push(_free, ptr);
              }
              return ptr;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: function(ptr) { _free(ptr); },
      });
    }

  function __embind_register_std_wstring(rawType, charSize, name) {
      // nb. do not cache HEAPU16 and HEAPU32, they may be destroyed by emscripten_resize_heap().
      name = readLatin1String(name);
      var getHeap, shift;
      if (charSize === 2) {
          getHeap = function() { return HEAPU16; };
          shift = 1;
      } else if (charSize === 4) {
          getHeap = function() { return HEAPU32; };
          shift = 2;
      }
      registerType(rawType, {
          name: name,
          'fromWireType': function(value) {
              var HEAP = getHeap();
              var length = HEAPU32[value >> 2];
              var a = new Array(length);
              var start = (value + 4) >> shift;
              for (var i = 0; i < length; ++i) {
                  a[i] = String.fromCharCode(HEAP[start + i]);
              }
              _free(value);
              return a.join('');
          },
          'toWireType': function(destructors, value) {
              // assumes 4-byte alignment
              var length = value.length;
              var ptr = _malloc(4 + length * charSize);
              var HEAP = getHeap();
              HEAPU32[ptr >> 2] = length;
              var start = (ptr + 4) >> shift;
              for (var i = 0; i < length; ++i) {
                  HEAP[start + i] = value.charCodeAt(i);
              }
              if (destructors !== null) {
                  destructors.push(_free, ptr);
              }
              return ptr;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: function(ptr) { _free(ptr); },
      });
    }

  function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
          isVoid: true, // void return values can be optimized out sometimes
          name: name,
          'argPackAdvance': 0,
          'fromWireType': function() {
              return undefined;
          },
          'toWireType': function(destructors, o) {
              // TODO: assert if anything else is given?
              return undefined;
          },
      });
    }

  function _abort() {
      abort();
    }

  var _emscripten_asm_const_int=true;

  function _emscripten_get_heap_size() {
      return HEAP8.length;
    }

   

  
  function abortOnCannotGrowMemory(requestedSize) {
      abort('OOM');
    }
  
  function emscripten_realloc_buffer(size) {
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow((size - buffer.byteLength + 65535) >> 16); // .grow() takes a delta compared to the previous size
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1 /*success*/;
      } catch(e) {
      }
    }function _emscripten_resize_heap(requestedSize) {
      var oldSize = _emscripten_get_heap_size();
      // With pthreads, races can happen (another thread might increase the size in between), so return a failure, and let the caller retry.
  
  
      var PAGE_MULTIPLE = 65536;
      var LIMIT = 2147483648 - PAGE_MULTIPLE; // We can do one page short of 2GB as theoretical maximum.
  
      if (requestedSize > LIMIT) {
        return false;
      }
  
      var MIN_TOTAL_MEMORY = 16777216;
      var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY); // So the loop below will not be infinite, and minimum asm.js memory size is 16MB.
  
      // TODO: see realloc_buffer - for PTHREADS we may want to decrease these jumps
      while (newSize < requestedSize) { // Keep incrementing the heap size as long as it's less than what is requested.
        if (newSize <= 536870912) {
          newSize = alignUp(2 * newSize, PAGE_MULTIPLE); // Simple heuristic: double until 1GB...
        } else {
          // ..., but after that, add smaller increments towards 2GB, which we cannot reach
          newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
        }
  
      }
  
  
  
      var replacement = emscripten_realloc_buffer(newSize);
      if (!replacement) {
        return false;
      }
  
  
  
      return true;
    }

  function _exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      exit(status);
    }

  
  var ENV={};function _getenv(name) {
      // char *getenv(const char *name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/getenv.html
      if (name === 0) return 0;
      name = UTF8ToString(name);
      if (!ENV.hasOwnProperty(name)) return 0;
  
      if (_getenv.ret) _free(_getenv.ret);
      _getenv.ret = allocateUTF8(ENV[name]);
      return _getenv.ret;
    }

  function _llvm_stackrestore(p) {
      var self = _llvm_stacksave;
      var ret = self.LLVM_SAVEDSTACKS[p];
      self.LLVM_SAVEDSTACKS.splice(p, 1);
      stackRestore(ret);
    }

  function _llvm_stacksave() {
      var self = _llvm_stacksave;
      if (!self.LLVM_SAVEDSTACKS) {
        self.LLVM_SAVEDSTACKS = [];
      }
      self.LLVM_SAVEDSTACKS.push(stackSave());
      return self.LLVM_SAVEDSTACKS.length-1;
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
    }
  
   

   

   

  
  
  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]);
      return sum;
    }
  
  
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while(days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
  
      var tm_zone = HEAP32[(((tm)+(40))>>2)];
  
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)],
        tm_gmtoff: HEAP32[(((tm)+(36))>>2)],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      };
  
      var pattern = UTF8ToString(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate time representation
        // Modified Conversion Specifiers
        '%Ec': '%c',                      // Replaced by the locale's alternative appropriate date and time representation.
        '%EC': '%C',                      // Replaced by the name of the base year (period) in the locale's alternative representation.
        '%Ex': '%m/%d/%y',                // Replaced by the locale's alternative date representation.
        '%EX': '%H:%M:%S',                // Replaced by the locale's alternative time representation.
        '%Ey': '%y',                      // Replaced by the offset from %EC (year only) in the locale's alternative representation.
        '%EY': '%Y',                      // Replaced by the full alternative year representation.
        '%Od': '%d',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
        '%Oe': '%e',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
        '%OH': '%H',                      // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
        '%OI': '%I',                      // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
        '%Om': '%m',                      // Replaced by the month using the locale's alternative numeric symbols.
        '%OM': '%M',                      // Replaced by the minutes using the locale's alternative numeric symbols.
        '%OS': '%S',                      // Replaced by the seconds using the locale's alternative numeric symbols.
        '%Ou': '%u',                      // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
        '%OU': '%U',                      // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
        '%OV': '%V',                      // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
        '%Ow': '%w',                      // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
        '%OW': '%W',                      // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
        '%Oy': '%y',                      // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      }
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      }
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        }
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      }
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      }
  
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else {
            return thisDate.getFullYear()-1;
          }
      }
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls((year/100)|0,2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year.
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes
          // January 4th, which is also the week that includes the first Thursday of the year, and
          // is also the first week that contains at least four days in the year.
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of
          // the last week of the preceding year; thus, for Saturday 2nd January 1999,
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th,
          // or 31st is a Monday, it and any following days are part of week 1 of the following year.
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
  
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;
          else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          return date.tm_wday || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Sunday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
  
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week)
          // as a decimal number [01,53]. If the week containing 1 January has four
          // or more days in the new year, then it is considered week 1.
          // Otherwise, it is the last week of the previous year, and the next week is week 1.
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          }
  
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
  
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          return date.tm_wday;
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Monday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ).
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich).
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          // convert from minutes into hhmm format (which means 60 minutes = 100 units)
          off = (off / 60)*100 + (off % 60);
          return (ahead ? '+' : '-') + String("0000" + off).slice(-4);
        },
        '%Z': function(date) {
          return date.tm_zone;
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }function _strftime_l(s, maxsize, format, tm) {
      return _strftime(s, maxsize, format, tm); // no locale support yet
    }
FS.staticInit();;
if (ENVIRONMENT_HAS_NODE) { var fs = require("fs"); var NODEJS_PATH = require("path"); NODEFS.staticInit(); };
embind_init_charCodes();
BindingError = Module['BindingError'] = extendError(Error, 'BindingError');;
InternalError = Module['InternalError'] = extendError(Error, 'InternalError');;
init_emval();;
UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError');;
var ASSERTIONS = false;

// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {String} input The string to decode.
 */
var decodeBase64 = typeof atob === 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE === 'boolean' && ENVIRONMENT_IS_NODE) {
    var buf;
    try {
      buf = Buffer.from(s, 'base64');
    } catch (_) {
      buf = new Buffer(s, 'base64');
    }
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}


// ASM_LIBRARY EXTERN PRIMITIVES: Int8Array,Int32Array


var asmGlobalArg = {};

var asmLibraryArg = { "___cxa_allocate_exception": ___cxa_allocate_exception, "___cxa_throw": ___cxa_throw, "___gxx_personality_v0": ___gxx_personality_v0, "___lock": ___lock, "___map_file": ___map_file, "___setErrNo": ___setErrNo, "___syscall140": ___syscall140, "___syscall145": ___syscall145, "___syscall91": ___syscall91, "___unlock": ___unlock, "___wasi_fd_close": ___wasi_fd_close, "___wasi_fd_write": ___wasi_fd_write, "__addDays": __addDays, "__arraySum": __arraySum, "__embind_register_bool": __embind_register_bool, "__embind_register_emval": __embind_register_emval, "__embind_register_float": __embind_register_float, "__embind_register_function": __embind_register_function, "__embind_register_integer": __embind_register_integer, "__embind_register_memory_view": __embind_register_memory_view, "__embind_register_std_string": __embind_register_std_string, "__embind_register_std_wstring": __embind_register_std_wstring, "__embind_register_void": __embind_register_void, "__emscripten_syscall_munmap": __emscripten_syscall_munmap, "__emval_decref": __emval_decref, "__emval_register": __emval_register, "__isLeapYear": __isLeapYear, "__memory_base": 1024, "__table_base": 0, "_abort": _abort, "_embind_repr": _embind_repr, "_emscripten_asm_const_i": _emscripten_asm_const_i, "_emscripten_get_heap_size": _emscripten_get_heap_size, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_emscripten_resize_heap": _emscripten_resize_heap, "_exit": _exit, "_fd_close": _fd_close, "_fd_write": _fd_write, "_getenv": _getenv, "_llvm_stackrestore": _llvm_stackrestore, "_llvm_stacksave": _llvm_stacksave, "_strftime": _strftime, "_strftime_l": _strftime_l, "abort": abort, "abortOnCannotGrowMemory": abortOnCannotGrowMemory, "count_emval_handles": count_emval_handles, "craftInvokerFunction": craftInvokerFunction, "createNamedFunction": createNamedFunction, "demangle": demangle, "demangleAll": demangleAll, "embind__requireFunction": embind__requireFunction, "embind_init_charCodes": embind_init_charCodes, "emscripten_realloc_buffer": emscripten_realloc_buffer, "ensureOverloadTable": ensureOverloadTable, "exposePublicSymbol": exposePublicSymbol, "extendError": extendError, "floatReadValueFromPointer": floatReadValueFromPointer, "getShiftFromSize": getShiftFromSize, "getTempRet0": getTempRet0, "getTypeName": getTypeName, "get_first_emval": get_first_emval, "heap32VectorToArray": heap32VectorToArray, "init_emval": init_emval, "integerReadValueFromPointer": integerReadValueFromPointer, "jsStackTrace": jsStackTrace, "makeLegalFunctionName": makeLegalFunctionName, "memory": wasmMemory, "new_": new_, "readLatin1String": readLatin1String, "registerType": registerType, "replacePublicSymbol": replacePublicSymbol, "runDestructors": runDestructors, "setTempRet0": setTempRet0, "simpleReadValueFromPointer": simpleReadValueFromPointer, "stackTrace": stackTrace, "table": wasmTable, "tempDoublePtr": tempDoublePtr, "throwBindingError": throwBindingError, "throwInternalError": throwInternalError, "throwUnboundTypeError": throwUnboundTypeError, "whenDependentTypesAreResolved": whenDependentTypesAreResolved };
// EMSCRIPTEN_START_ASM
var asm =Module["asm"]// EMSCRIPTEN_END_ASM
(asmGlobalArg, asmLibraryArg, buffer);

Module["asm"] = asm;
var __Z2sPPKcPcS0_S0_S1_S1_ = Module["__Z2sPPKcPcS0_S0_S1_S1_"] = function() {
  return Module["asm"]["__Z2sPPKcPcS0_S0_S1_S1_"].apply(null, arguments)
};

var __ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = function() {
  return Module["asm"]["__ZSt18uncaught_exceptionv"].apply(null, arguments)
};

var ___cxa_can_catch = Module["___cxa_can_catch"] = function() {
  return Module["asm"]["___cxa_can_catch"].apply(null, arguments)
};

var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function() {
  return Module["asm"]["___cxa_is_pointer_type"].apply(null, arguments)
};

var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function() {
  return Module["asm"]["___embind_register_native_and_builtin_types"].apply(null, arguments)
};

var ___errno_location = Module["___errno_location"] = function() {
  return Module["asm"]["___errno_location"].apply(null, arguments)
};

var ___getTypeName = Module["___getTypeName"] = function() {
  return Module["asm"]["___getTypeName"].apply(null, arguments)
};

var _emscripten_get_sbrk_ptr = Module["_emscripten_get_sbrk_ptr"] = function() {
  return Module["asm"]["_emscripten_get_sbrk_ptr"].apply(null, arguments)
};

var _emscripten_replace_memory = Module["_emscripten_replace_memory"] = function() {
  return Module["asm"]["_emscripten_replace_memory"].apply(null, arguments)
};

var _free = Module["_free"] = function() {
  return Module["asm"]["_free"].apply(null, arguments)
};

var _main = Module["_main"] = function() {
  return Module["asm"]["_main"].apply(null, arguments)
};

var _malloc = Module["_malloc"] = function() {
  return Module["asm"]["_malloc"].apply(null, arguments)
};

var _memcpy = Module["_memcpy"] = function() {
  return Module["asm"]["_memcpy"].apply(null, arguments)
};

var _memmove = Module["_memmove"] = function() {
  return Module["asm"]["_memmove"].apply(null, arguments)
};

var _memset = Module["_memset"] = function() {
  return Module["asm"]["_memset"].apply(null, arguments)
};

var establishStackSpace = Module["establishStackSpace"] = function() {
  return Module["asm"]["establishStackSpace"].apply(null, arguments)
};

var globalCtors = Module["globalCtors"] = function() {
  return Module["asm"]["globalCtors"].apply(null, arguments)
};

var stackAlloc = Module["stackAlloc"] = function() {
  return Module["asm"]["stackAlloc"].apply(null, arguments)
};

var stackRestore = Module["stackRestore"] = function() {
  return Module["asm"]["stackRestore"].apply(null, arguments)
};

var stackSave = Module["stackSave"] = function() {
  return Module["asm"]["stackSave"].apply(null, arguments)
};

var dynCall_ii = Module["dynCall_ii"] = function() {
  return Module["asm"]["dynCall_ii"].apply(null, arguments)
};

var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
  return Module["asm"]["dynCall_iidiiii"].apply(null, arguments)
};

var dynCall_iii = Module["dynCall_iii"] = function() {
  return Module["asm"]["dynCall_iii"].apply(null, arguments)
};

var dynCall_iiii = Module["dynCall_iiii"] = function() {
  return Module["asm"]["dynCall_iiii"].apply(null, arguments)
};

var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
  return Module["asm"]["dynCall_iiiii"].apply(null, arguments)
};

var dynCall_iiiiid = Module["dynCall_iiiiid"] = function() {
  return Module["asm"]["dynCall_iiiiid"].apply(null, arguments)
};

var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
  return Module["asm"]["dynCall_iiiiii"].apply(null, arguments)
};

var dynCall_iiiiiid = Module["dynCall_iiiiiid"] = function() {
  return Module["asm"]["dynCall_iiiiiid"].apply(null, arguments)
};

var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
  return Module["asm"]["dynCall_iiiiiii"].apply(null, arguments)
};

var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
  return Module["asm"]["dynCall_iiiiiiii"].apply(null, arguments)
};

var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function() {
  return Module["asm"]["dynCall_iiiiiiiii"].apply(null, arguments)
};

var dynCall_iiiiij = Module["dynCall_iiiiij"] = function() {
  return Module["asm"]["dynCall_iiiiij"].apply(null, arguments)
};

var dynCall_jiji = Module["dynCall_jiji"] = function() {
  return Module["asm"]["dynCall_jiji"].apply(null, arguments)
};

var dynCall_v = Module["dynCall_v"] = function() {
  return Module["asm"]["dynCall_v"].apply(null, arguments)
};

var dynCall_vi = Module["dynCall_vi"] = function() {
  return Module["asm"]["dynCall_vi"].apply(null, arguments)
};

var dynCall_vii = Module["dynCall_vii"] = function() {
  return Module["asm"]["dynCall_vii"].apply(null, arguments)
};

var dynCall_viii = Module["dynCall_viii"] = function() {
  return Module["asm"]["dynCall_viii"].apply(null, arguments)
};

var dynCall_viiii = Module["dynCall_viiii"] = function() {
  return Module["asm"]["dynCall_viiii"].apply(null, arguments)
};

var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
  return Module["asm"]["dynCall_viiiii"].apply(null, arguments)
};

var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
  return Module["asm"]["dynCall_viiiiii"].apply(null, arguments)
};

var dynCall_viijii = Module["dynCall_viijii"] = function() {
  return Module["asm"]["dynCall_viijii"].apply(null, arguments)
};
;



// === Auto-generated postamble setup entry stuff ===

Module['asm'] = asm;
















































































var calledRun;


/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args) {


  args = args || [];

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;


  try {


    var ret = Module['_main'](argc, argv);


    // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      noExitRuntime = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      err('exception thrown: ' + toLog);
      quit_(1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }


  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}
Module['run'] = run;


function exit(status, implicit) {

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && noExitRuntime && status === 0) {
    return;
  }

  if (noExitRuntime) {
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  quit_(status, new ExitStatus(status));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;


  noExitRuntime = true;

run();





// {{MODULE_ADDITIONS}}

require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { directions } = require('./dtypes');
const traceback = require('./traceback');

const AlignerFactory = ({
    algorithm,
    similarityScoreFunctionDefault,
    gapScoreFunctionDefault,
    gapSymbolDefault,
}) => ({
    similarityScoreFunction = similarityScoreFunctionDefault,
    gapScoreFunction = gapScoreFunctionDefault,
    gapSymbol = gapSymbolDefault,
} = {}) => ({
    similarityScoreFunction,
    gapScoreFunction,
    gapSymbol,
    directions,
    align(sequence1 = '', sequence2 = '') {
        const { alignmentScore, scoringMatrix, tracebackMatrix, tracebackStart } = algorithm({
            sequence1,
            sequence2,
            gapScoreFunction: this.gapScoreFunction,
            similarityScoreFunction: this.similarityScoreFunction,
        });
        const { alignedSequence1, alignedSequence2, coordinateWalk } = traceback({
            sequence1,
            sequence2,
            tracebackMatrix,
            tracebackStart,
            gapSymbol: this.gapSymbol,
        });
        return {
            score: alignmentScore,
            originalSequences: [sequence1, sequence2],
            alignedSequences: [alignedSequence1, alignedSequence2],
            coordinateWalk,
            scoringMatrix,
            tracebackMatrix,
            alignment: `${alignedSequence1}\n${alignedSequence2}`,
        };
    },
});

module.exports = AlignerFactory;

},{"./dtypes":2,"./traceback":6}],2:[function(require,module,exports){
const directions = Object.freeze({
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    TOP: 3,
});

// Data type for traced back, scoring matrix, cel scores.
// Stores a score value and a traceback direction.
const TracedScore = (score, direction = directions.NONE) => {
    if (Object.values(directions).includes(direction)) {
        return { score, direction };
    }
    throw TypeError('Invalid direction value for TracedScore');
};

module.exports = {
    TracedScore,
    directions,
};

},{}],3:[function(require,module,exports){
const { directions } = require('./dtypes');

// Creates a matrix of the specified width and length.
// First row and column are filled with a negative integer progression starting
// from 0 ar coordinates (0, 0). The remaining cells are filled with zeros.
const initNWScoringMatrix = ({ width, heigth }) => {
    const matrix = [];
    for (let row = 0; row < heigth; row += 1) {
        if (row === 0) {
            matrix[row] = Array(width)
                .fill()
                .map((_, i) => -i || 0);
        } else {
            matrix[row] = Array(width).fill(0);
            matrix[row][0] = -row;
        }
    }
    return matrix;
};

// Creates a matrix of the specified width and length.
// The top row buffer is filled with the value for directions.LEFT.
// The left column buffer is filled with the value for directions.TOP.
// The top-left corner cell is filled with the value for directions.NONE.
const initNWTracebacMatrix = ({ width, heigth }) => {
    const matrix = [];
    for (let row = 0; row < heigth; row += 1) {
        if (row === 0) {
            matrix[row] = Array(width).fill(directions.LEFT);
        } else {
            matrix[row] = Array(width).fill(directions.NONE);
            matrix[row][0] = directions.TOP;
        }
        matrix[0][0] = directions.NONE;
    }
    return matrix;
};

// Creates a matrix filled with the supplied value of the specified width and
// length.
const createMatrix = ({ width, heigth, fill = 0 }) =>
    Array(heigth)
        .fill(fill)
        .map(() => Array(width).fill(fill));

// Returns the left portion of the row specified by the supplied coordinates.
const extractRow = ({ matrix, row, col }) => matrix[row].slice(0, col + 1);

// Return the top portion of the column specified by the supplied coordinates.
const extractColumn = ({ matrix, row, col }) =>
    matrix
        .slice(0, row + 1)
        .map(_row => _row.slice(col, col + 1))
        .reduce((prev, curr) => [...prev, ...curr], []);

module.exports = {
    createMatrix,
    extractColumn,
    extractRow,
    initNWScoringMatrix,
    initNWTracebacMatrix,
};

},{"./dtypes":2}],4:[function(require,module,exports){
const { initNWScoringMatrix, initNWTracebacMatrix } = require('./matrix.utils');
const { reduceTracedScores } = require('./utils');
const { TracedScore, directions } = require('./dtypes');

function needlemanWunsch({ sequence1, sequence2, gapScoreFunction, similarityScoreFunction }) {
    // Initialize matrices for dynamic programming solution.
    const heigth = sequence1.length + 1;
    const width = sequence2.length + 1;
    const scoringMatrix = initNWScoringMatrix({ width, heigth });
    const tracebackMatrix = initNWTracebacMatrix({ width, heigth });

    let lastScore = 0;
    let lastCoordinates = [0, 0];

    // Fill the matrices.
    for (let row = 1; row < heigth; row += 1) {
        for (let col = 1; col < width; col += 1) {
            // Simlarity score of the current couple of characters in the
            // input sequences. Subtracts 1 from matrix coordinates to account
            // for the matrix buffer.
            const similarityScore = similarityScoreFunction(sequence1[row - 1], sequence2[col - 1]);

            // Candidate scores to fill the current matrix cell.
            const scores = [
                TracedScore(scoringMatrix[row - 1][col] + gapScoreFunction(), directions.TOP),
                TracedScore(scoringMatrix[row][col - 1] + gapScoreFunction(), directions.LEFT),
                TracedScore(scoringMatrix[row - 1][col - 1] + similarityScore, directions.DIAGONAL),
            ];

            // Select highest scoring substitution and fill the matrices.
            const { score: cellScore, direction } = reduceTracedScores(scores, -Infinity);
            scoringMatrix[row][col] = cellScore;
            tracebackMatrix[row][col] = direction;
            lastScore = cellScore;
            lastCoordinates = [row, col];
        }
    }

    return {
        alignmentScore: lastScore,
        scoringMatrix,
        tracebackMatrix,
        tracebackStart: lastCoordinates,
    };
}

module.exports = needlemanWunsch;

},{"./dtypes":2,"./matrix.utils":3,"./utils":8}],5:[function(require,module,exports){
const { createMatrix, extractColumn, extractRow } = require('./matrix.utils');
const { reduceTracedScores } = require('./utils');
const { TracedScore, directions } = require('./dtypes');

// Takes a portion of scoring matrix (left-row or top-column) and computes the
// length of a gap if the gap is opened at that position.
// Returns the maximum score in the sequence and the maximum gap length.
function computeGapLength(sequence) {
    let max = -1;
    let gapLength = 0;
    for (let cursor = 1; cursor < sequence.length; cursor += 1) {
        if (sequence[cursor] > max) {
            max = sequence[cursor];
            gapLength = cursor;
        }
    }
    return { max, gapLength };
}

// Compute candidate scores to fill a certain cell of the scoring matrix.
// Returns a list of score objects storing score value and traceback direction.
function computeScores({ scoringMatrix, row, col, gapScoreFunction, similarityScore }) {
    // Get left-row and top-column from the current coordinates.
    const leftSequence = extractRow({ matrix: scoringMatrix, row, col });
    const topSequence = extractColumn({ matrix: scoringMatrix, row, col });

    // Compute left and top maximum values and gap lengths.
    const { max: leftMax, gapLength: leftGapLength } = computeGapLength(leftSequence.reverse());
    const { max: topMax, gapLength: topGapLength } = computeGapLength(topSequence.reverse());

    // Compute scores for every type of sustitution for the current
    // coordinates. In the scores array are computed in order:
    //   - Deletion score.
    //   - Insertion score.
    //   - Mutation score.
    return [
        TracedScore(topMax + gapScoreFunction(topGapLength), directions.TOP),
        TracedScore(leftMax + gapScoreFunction(leftGapLength), directions.LEFT),
        TracedScore(scoringMatrix[row - 1][col - 1] + similarityScore, directions.DIAGONAL),
    ];
}

function smithWaterman({ sequence1, sequence2, gapScoreFunction, similarityScoreFunction }) {
    // Initialize matrices for dynamic programming solution.
    const heigth = sequence1.length + 1;
    const width = sequence2.length + 1;
    const scoringMatrix = createMatrix({ width, heigth });
    const tracebackMatrix = createMatrix({ width, heigth, fill: directions.NONE });

    let highestScore = 0;
    let highestScoreCoordinates = [0, 0];

    // Fill the matrices.
    for (let row = 1; row < heigth; row += 1) {
        for (let col = 1; col < width; col += 1) {
            // Simlarity score of the current couple of characters in the
            // input sequences. Subtracts 1 from matrix coordinates to account
            // for the matrix buffer.
            const similarityScore = similarityScoreFunction(sequence1[row - 1], sequence2[col - 1]);

            // Candidate scores to fill the current matrix cell.
            const scores = computeScores({
                scoringMatrix,
                row,
                col,
                gapScoreFunction,
                similarityScore,
            });

            // Select highest scoring substitution and fill the matrices.
            const { score: bestScore, direction } = reduceTracedScores(scores, 0);
            scoringMatrix[row][col] = bestScore;
            tracebackMatrix[row][col] = direction;

            // Keep record of the highest score in the scoring matrix.
            if (bestScore >= highestScore) {
                highestScore = bestScore;
                highestScoreCoordinates = [row, col];
            }
        }
    }

    return {
        alignmentScore: highestScore,
        scoringMatrix,
        tracebackMatrix,
        tracebackStart: highestScoreCoordinates,
    };
}

module.exports = smithWaterman;

},{"./dtypes":2,"./matrix.utils":3,"./utils":8}],6:[function(require,module,exports){
const { alignmentUpdaters, coordinateUpdaters } = require('./traceback.utils');
const { directions } = require('./dtypes');

function traceback({ sequence1, sequence2, tracebackMatrix, tracebackStart, gapSymbol }) {
    let [row, col] = tracebackStart;
    const aligned1 = [];
    const aligned2 = [];
    const coordinateWalk = [[row, col]];
    const updaters = alignmentUpdaters(gapSymbol);
    while (tracebackMatrix[row][col] !== directions.NONE) {
        const direction = tracebackMatrix[row][col];
        const alignmentUpdater = updaters(direction);
        const [char1, char2] = alignmentUpdater({ seq1: sequence1, seq2: sequence2, row, col });
        aligned1.unshift(char1);
        aligned2.unshift(char2);
        const coordinateUpdater = coordinateUpdaters(direction);
        [row, col] = coordinateUpdater([row, col]);
        coordinateWalk.push([row, col]);
    }
    return {
        alignedSequence1: aligned1.join(''),
        alignedSequence2: aligned2.join(''),
        coordinateWalk,
    };
}

module.exports = traceback;

},{"./dtypes":2,"./traceback.utils":7}],7:[function(require,module,exports){
const { directions } = require('./dtypes');

const alignmentUpdaters = gapSymbol => direction => {
    const updaters = {
        [directions.DIAGONAL]: ({ seq1, seq2, row, col }) => [seq1[row - 1], seq2[col - 1]],
        [directions.LEFT]: ({ seq2, col }) => [gapSymbol, seq2[col - 1]],
        [directions.TOP]: ({ seq1, row }) => [seq1[row - 1], gapSymbol],
    };
    return updaters[direction];
};

const coordinateUpdaters = direction => {
    const getters = {
        [directions.DIAGONAL]: ([row, col]) => [row - 1, col - 1],
        [directions.LEFT]: ([row, col]) => [row, col - 1],
        [directions.TOP]: ([row, col]) => [row - 1, col],
    };
    return getters[direction];
};

module.exports = {
    alignmentUpdaters,
    coordinateUpdaters,
};

},{"./dtypes":2}],8:[function(require,module,exports){
const { TracedScore } = require('./dtypes');

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

const reverse = x => -x;

const nanException = () => {
    throw TypeError('Non number input to decreaseAndRectify().');
};

const throwIfNotNumber = x => (Number.isNaN(Number(x)) ? nanException() : x);

const scoreReducer = (max, score) => {
    if (Number.isInteger(score.score)) {
        return score.score > max.score ? score : max;
    }
    throw TypeError(`Score object as an invalid score property: ${score.score}.`);
};

const reduceTracedScores = (scores, defaultScore) =>
    scores.reduce(scoreReducer, TracedScore(defaultScore));

module.exports = {
    reverse: pipe(
        throwIfNotNumber,
        reverse,
    ),
    reduceTracedScores,
};

},{"./dtypes":2}],"seqalign":[function(require,module,exports){
const { reverse } = require('./utils');

const nwAlgorithm = require('./nw.algorithm');
const swAlgorithm = require('./sw.algorithm');
const AlignerFactory = require('./aligner.factory');

module.exports = {
    NWaligner: AlignerFactory({
        algorithm: nwAlgorithm,
        similarityScoreFunctionDefault: (char1, char2) => (char1 === char2 ? 1 : -2),
        gapScoreFunctionDefault: () => -1,
        gapSymbolDefault: '-',
    }),
    SWaligner: AlignerFactory({
        algorithm: swAlgorithm,
        similarityScoreFunctionDefault: (char1, char2) => (char1 === char2 ? 2 : -1),
        gapScoreFunctionDefault: reverse,
        gapSymbolDefault: '-',
    }),
};

},{"./aligner.factory":1,"./nw.algorithm":4,"./sw.algorithm":5,"./utils":8}]},{},[]);



