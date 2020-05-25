    var seqres_sectionTags = ['SEQRES'];
    var coordinates_sectionTags = ['MODEL','ATOM','ANISOU','TER','HETATM','ENDMDL'];
    var preambule_sectionTags = ['HEADER', 'OBSLTE', 'TITLE', 'SPLT', 'CAVEAT', 'COMPND', 'SOURCE', 'KEYWDS', 'EXPDTA', 'NUMMDL', 'MDLTYP', 'AUTHOR', 'REVDAT', 'SPRSDE', 'JRNL', 'REMARKS'];

    var re = /^([\S]+)/;
    
    var setBuffer = function(line, buffers) {
        var m = line.match(re);
        if (!m){
            console.log("unknown tag " + line);
            return null;
        }
        var tBuf = null;
        for (var k in buffers) {
            if(buffers[k].tags.indexOf(m[0]) === -1)
                continue;
            return buffers[k].data;
        }
        return null;
    };

    var parseBuffer = function () {
        return {
            seqres : { tags : seqres_sectionTags, data : [] },
            coordinates : {tags : coordinates_sectionTags, data : [] },
            preambule : {tags : preambule_sectionTags, data : [] }
        };
    }
    
    var PdbObject  = function(data) {
        this.currentModel = 1;
        this.altLocPreserve = false;
        this.preambule = null;
        this.seqres = null;
        this.coordinates = null;
        this.currentSelection = [];

        // TO DO DEVELOP high level selection parser
        this.remove = function(expression) {
            return this;
        };
        this.select = function(expression) {
            return this;
        };


    // Set B-factor of current selection
        this.bFactor = function(value, type) { // assign or read bFactor value to/from current selection
            this.coordinates.bFactor(this.currentSelection, value, type);
        };

    // Number of atoms in current selection
        this.selecSize = function() {
            return this.currentSelection.length;
        };
    // non-redundant list of chains found in currentSelection
        this.listChainID = function() {
            var chainList = this.coordinates.listChainID(this.currentSelection);
            return chainList
        }

    // Initialize/ reset selection
        this.model = function(string) {
            this.currentSelection = this.coordinates.model(string);
            return this;
        },

    // Selector short-cut
        this.naturalAminoAcidOnly = function() {
            var self = this.resName.apply(this, naturals);
            return self;
        };

    // Basic Selectors
        this.chain = function () { // could receive an array as sole argument
            var nArgs = [this.currentSelection];

            if(Array.isArray(arguments[0])) {
                arguments[0].forEach(function(e){
                    nArgs.push(e);
                });
            } else {
                for (var i = 0; i < arguments.length ; i++) {
                    nArgs.push(arguments[i]);
                }
            }
            this.currentSelection = this.coordinates.chain.apply(this.coordinates, nArgs);
            return this;
        };

        this.name = function (args) {
            var nArgs = [this.currentSelection];
            for (var i = 0; i < arguments.length ; i++) {
                nArgs.push(arguments[i]);
            }
            this.currentSelection = this.coordinates.name.apply(this.coordinates, nArgs);
            return this;
        };

        this.resSeq = function (args) {
            var nArgs = [this.currentSelection];
            for (var i = 0; i < arguments.length ; i++) {
                nArgs.push(arguments[i]);
            }
            this.currentSelection = this.coordinates.resSeq.apply(this.coordinates, nArgs);
            return this;
        };

        this.resName = function (args) {
            var nArgs = [this.currentSelection];
            for (var i = 0; i < arguments.length ; i++) {
                nArgs.push(arguments[i]);
            }
            this.currentSelection = this.coordinates.resName.apply(this.coordinates, nArgs);
            return this;
        };

    // Deleters
        this.chainDel = function () {
            var nArgs = [this.currentSelection];

            if(Array.isArray(arguments[0])) {
                arguments[0].forEach(function(e){
                    nArgs.push(e);
                });
            } else {
                for (var i = 0; i < arguments.length ; i++) {
                    nArgs.push(arguments[i]);
                }
            }
            this.currentSelection = this.coordinates.delChain.apply(this.coordinates, nArgs)
            return this;
        };

        this.nameDel = function () {
            var nArgs = [this.currentSelection];

            if(Array.isArray(arguments[0])) {
                arguments[0].forEach(function(e){
                    nArgs.push(e);
                });
            } else {
                for (var i = 0; i < arguments.length ; i++) {
                    nArgs.push(arguments[i]);
                }
            }
            this.currentSelection = this.coordinates.delName.apply(this.coordinates, nArgs)
            return this;
        };

        this.resNameDel = function () {
            var nArgs = [this.currentSelection];

            if(Array.isArray(arguments[0])) {
                arguments[0].forEach(function(e){
                    nArgs.push(e);
                });
            } else {
                for (var i = 0; i < arguments.length ; i++) {
                    nArgs.push(arguments[i]);
                }
            }
            this.currentSelection = this.coordinates.delResName.apply(this.coordinates, nArgs)
            return this;
        };

        this.resSeqDel = function () {
            var nArgs = [this.currentSelection];

            if(Array.isArray(arguments[0])) {
                arguments[0].forEach(function(e){
                    nArgs.push(e);
                });
            } else {
                for (var i = 0; i < arguments.length ; i++) {
                    nArgs.push(arguments[i]);
                }
            }
            this.currentSelection = this.coordinates.delResSeq.apply(this.coordinates, nArgs)
            return this;
        };


    // Clone selection into a new pdb object and set currentSelection to total atomRecord
        this.pull = function() {
            var pdbObject = new PdbObject();
            pdbObject.coordinates = coordinates.clone(this.currentSelection);
            pdbObject.model().name('*');
            return pdbObject;
        }

        this.pdbnum = function  () {
            if (this.currentSelection.length === 0) {
                console.log("Empty atom selection !");
                return null;
            }
            var numSequence = [];
            var warden = null;
            this.currentSelection.forEach(function(e, i, array){
                if (!warden) {
                    warden = e.pdbNum();
                    numSequence.push(warden);
                    return;
                }

                if (warden === e.pdbNum())
                    return;

                numSequence.push(e.pdbNum());
                warden = e.pdbNum();
            });
            return numSequence;
        }

        this.sequence = function () {
            if (this.currentSelection.length === 0) {
                console.log("Empty atom selection !");
                return null;
            }
            var string = '';
            var warden = null;
            this.currentSelection.forEach(function(e, i, array){
                if (!warden)
                    warden = e.pdbNum();
                else if (warden === e.pdbNum())
                    return;

                string += e.oneLetter();
                warden = e.pdbNum();
            });
            return string;
        }

    // Display current Selection optional number of field (columns)
        this.dump = function (nField) {
            if (this.currentSelection.length === 0) {
                console.log("Empty atom selection !");
                return null;
            }
            var string = '';
            if (!nField) {
                this.currentSelection.forEach(function(e, i, array){
                    string += e.stringify();
                });
            } else {
                var n = parseInt(nField);
                if (n < 0) {
                    throw "irregular field number \"" + n + "\"";
                }
                this.currentSelection.forEach(function(e, i, array){
                    string += e.stringify().substring(0,n);
                    if( !string.endsWith("\n") )
                        string += '\n';
                });
            }

            return string;
        }

        // create a stream with the PdbObject into a JSON or not
        this.stream = function (b_jsonFormat = false, name = 'pdb') {
            var s = new stream.Readable();
            if (b_jsonFormat) {
                s.push('{ "' + name + '" : "');
                s.push(this.model(1).dump().replace(/\n/g, '\\n').replace(/\r/g, '\\r'));
                s.push('"}');
            } else {
                s.push(this.model(1).dump());
            }
            s.push(null);
            return s;
        }

        this.asArray = function () {
            if (this.currentSelection.length === 0) {
                console.log("Empty atom selection !");
                return null;
            }
            var array = [coordinates.atomFields];
            this.currentSelection.forEach(function(e) {
                        array.push(e.asArray());
                    });
            return array;
        }
        this.asFasta = function () {
            if (this.currentSelection.length === 0) {
                console.log("Empty atom selection !");
                return null;
            }
            var array = [coordinates.atomFields];
            this.currentSelection.forEach(function(e) {
                        array.push(e.asArray());
                    });
            return array;
        }

    }
    
    !function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (typeof exports !== 'undefined') {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (typeof define === 'function' && define['amd']) {
            define(function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            })
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line

var sortNumber = function (a,b) {
    return a - b;
}

var residueMapping = {
    "ALA" : "A", "SE7" : "A",
    "CYS" : "C", "SEC" : "C",
    "ASP" : "D",
    "GLU" : "E",
    "PHE" : "F",
    "GLY" : "G",
    "HIS" : "H",
    "ILE" : "I",
    "LYS" : "K",
    "LEU" : "L",
    "MET" : "M", "MSE" : "M",
    "ASN" : "N",
    "PRO" : "P",
    "GLN" : "Q",
    "ARG" : "R",
    "SER" : "S",
    "THR" : "T",
    "TYR" : "Y",
    "TRP" : "W",
    "TRY" : "W",
    "VAL" : "V",
    };





var atomFields = [ 'recordName', 'serial', 'name', 'altLoc', 'resName', 'chainID',
                'resSeq', 'iCode', 'x', 'y', 'z', 'occupancy', 'tempFactor',
                'element', 'charge'];

var Atom = function (data){

    var asArray = function(){
        return [ this.recordName, this.serial, this.name, this.altLoc, this.resName, this.chainID,
                this.resSeq, this.iCode, this.x, this.y, this.z, this.occupancy, this.tempFactor,
                this.element, this.charge ]
                //.map(function (e){
                //    return e.replace(/ /g,'');
                //});
    }

    var stringify = function() {
        var name = this.name.length < 4 ? " " + this.name : this.name;
        var string = sprintf("%6s%5d %-4s%s%3s %s%4s%s   %8.3f%8.3f%8.3f%6.2f%6.2f          %-2s%-2s\n",
            this.recordName, this.serial, name, this.altLoc, this.resName, this.chainID, this.resSeq,
            this.iCode, this.x, this.y, this.z,
            this.occupancy, this.tempFactor, this.element, this.charge);

        return string;
    }
    var oneLetter = function () {
        if (this.resName in  residueMapping) return residueMapping[this.resName];
        console.log(this.resName + " is not found");
        return 'X';
    }
    var pdbNum = function () {
        var pdbnum = this.resSeq + this.iCode;
        return pdbnum.replace(/ /g,'');
    }

    if (typeof(data) === 'string') {
        var m = data.match(/^ATOM|HETATM/);
        if (!m) return null;
        if (data.length < 81) {
            for (var i = 0; i < (81 - data.length); i++) {
                data += ' ';
            }
        }

        return {
            'hash' : function(){return this.stringify();},
            'oneLetter' : oneLetter,
            'pdbNum' : pdbNum,
            'stringify' : stringify,
            'asArray' : asArray,
            'recordName' : data.substring(0, 6),
            'serial' : parseInt(data.substring(6, 11)),
            'name' : data.substring(12, 16).replace(/[\s]+/g, ""),
            'altLoc' : data.substring(16, 17),
            'resName' : data.substring(17, 20),
            'chainID' : data.substring(21, 22),
            'resSeq' : data.substring(22, 26),
            'iCode' : data.substring(26, 27),
            'x' : parseFloat(data.substring(30, 38)),
            'y' : parseFloat(data.substring(38, 46)),
            'z' : parseFloat(data.substring(46, 54)),
            'occupancy' : parseFloat(data.substring(54, 60)),
            'tempFactor' : parseFloat(data.substring(60, 66)),
            'element' : data.substring(76, 78),
            'charge' : data.substring(78, 80)
        };
    }
    if (typeof(data) === 'object') {
        return {
            'hash' : function(){return this.stringify();}, // TO TEST
            'oneLetter' : oneLetter,
            'pdbNum' : pdbNum,
            'stringify' : stringify,
            'asArray' : asArray,
            'recordName' : data.recordName,
            'serial' : parseInt(data.serial),
            'name' : data.name,
            'altLoc' : data.altLoc,
            'resName' : data.resName,
            'chainID' : data.chainID,
            'resSeq' : data.resSeq,
            'iCode' : data.iCode,
            'x' : parseFloat(data.x),
            'y' : parseFloat(data.y),
            'z' : parseFloat(data.z),
            'occupancy' : parseFloat(data.occupancy),
            'tempFactor' : parseFloat(data.tempFactor),
            'element' : data.element,
            'charge' : data.charge
        };

    }
    throw "Unknown data on input";
}

var coordinatesInstance = function () {
    this.models = {};
    this.verbose = false;
};

coordinatesInstance.prototype.bFactor = function(currentSelection, value, type) {
    var bUp = type ? type === 'increment' ? true : false : false;
    if(value != null) {
        currentSelection.forEach( function(e){
            if(bUp)
                e.tempFactor  = e.tempFactor  + value;
            else
                e.tempFactor = value;
        });
    }
};

coordinatesInstance.prototype.listChainID = function(currentSelection) {
    var buffer = currentSelection.map(function(e) {
                    return e.chainID
                });
    return arrayUniq(buffer);
}

// Reset current atom selection, if no model specified pick one
coordinatesInstance.prototype.model = function (modelID) {
    var buffer = [];
    var currentModel = modelID;
       // console.log(currentModel);
    if(!currentModel) {
        for (var k in this.models) {
            currentModel = k;
            //console.log("Record size of model id " +currentModel + " " + this.models[currentModel].length);
            break;
        }
    }
    var target = this.models[currentModel];
    //console.log(target);
    target.forEach(function(e, i, array) {
            buffer.push(e);
    });
    return buffer;
}

var setPattern = function(string) {
    var reStart = /^\*/;
    var reEnd = /\*$/;
    var pattern = string.replace(/\*/g, '.*').replace(/^\.\*/, '').replace(/\.\*$/,'');
    if(!reStart.test(string) && !reEnd.test(string)) {
        pattern =  "^[\\s]*" + pattern + "[\\s]*$";
    }
    else if(reStart.test(string)) {
        pattern =  pattern + "[\\s]*$";
    }
    else if(reEnd.test(string)) {
        pattern =  "^[\\s]*" + pattern;
    }
    return pattern
}


var numberInsideInterval = function(lo, up, numberLike) {
    var n = parseInt(numberLike.replace(/[^0-9]/g,''));

    if (n < lo) return false;
    if (n > up) return false;

    return true;
}

/*var isLastNumber = function(lo, numberLike) {
    var n = parseInt(resSeq.replace(/[^\d]/g,''));
    if (n < lo) return false;
    if (n > up) return false;

    return true;
}*/

// Agnostic scanning function to retrieve/get-rid of atoms
coordinatesInstance.prototype._scan = function (args) {  // args 0 is atom field, 1 is mode 2 is currentSelection, rest is rules
    var index = [];
    var atomField = arguments[0];
    var mode = arguments[1]
    var currentSelection = arguments[2];
    var buffer = {};
    var target = this.models[this.currentModel];
    if (currentSelection.length > 0)
        target = currentSelection;

    var self = this;


    for (var iArg = 3; iArg < arguments.length; iArg++) {
        var ruleWord = arguments[iArg];

        var patternPair = ruleWord.toString().split(":");
        var pattern1 = setPattern(patternPair[0]);
        //throw("mode : " + mode + ' , type : ' + atomField + ' pat : ' + pattern1);
        var reUp = new RegExp(pattern1);
        if (patternPair.length === 1) {
            if (this.verbose) console.log(atomField + ' ' + pattern1 + ' in ' + target.length);
            //console.log(atomField + ' ' + pattern1 + ' in ' + target.length);
            target.forEach(function(e, i, array) {
                if (reUp.test(e[atomField])){
                    if(mode === 'pick') {
                        buffer[e.serial] = e;
                        index.push(e.serial);
                    }
                } else {
                    if(mode === 'kick') {
                        buffer[e.serial] = e;
                        index.push(e.serial);
                    }
                }
            });
        }
        else if (patternPair.length === 2) {
            // Open intervals: "112:" , or ":80"
            if (patternPair[0] === '') {
                patternPair[0] = target[0][atomField]
            }
            if (patternPair[1] === '') {
                patternPair[1] = target[target.length - 1][atomField]
            }
            // patterns pair can only be resSeq intervals
            // We must account for cases where the low/up limits of the interval are
            // not present in the current selection
            // we must smart extract integer from resSeq field and perform comp

            //Checking stuff
            if (atomField !== 'resSeq' && atomField !== 'serial')
                throw 'error, dont know what to do w/ low, upper bounds not resSeq or serial';
            var re_CHK = /^[\s]*[\d]+[\s]*$/;
            patternPair.forEach(function(e){
                if(!re_CHK.test(e))
                    throw 'Non integer boundary value : ' + e
            });
            var lo = parseInt(patternPair[0])
            var up = parseInt(patternPair[1])
            if (lo > up)
                throw 'Illogic boundaries ' + lo + ' ,' + up;
            var bCopy = false;
            for (var i = 0 ; i < target.length; i++) {
                var e = target[i];
                if (numberInsideInterval(lo, up, e[atomField]))
                    bCopy = true;

                if (!bCopy && mode === 'pick')
                    continue;

                /*copy stop condition match elements exit after in pick mode*/
                if (bCopy && !numberInsideInterval(lo, up, e[atomField]))
                    if (mode === 'pick')
                        break;
                    else
                    //in kick mode, we want to go beyond the specified region to recover atom not matching condition
                        bCopy = false;

                if (bCopy && mode === 'pick') {
                    buffer[e.serial] = e;
                    index.push(e.serial);
                }
                if (!bCopy && mode === 'kick') {
                    buffer[e.serial] = e;
                    index.push(e.serial);
                }
            }
        }
    }// Sort atom record based on atom serial number
    var newRecord = index.sort(sortNumber).map(function(i){
        return buffer[i]
    })
    return newRecord;
}

// ----- Deletors
coordinatesInstance.prototype.delName = function () {
    var atomRecord = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var nArgs = ['name', 'kick', atomRecord, arguments[i]];
        atomRecord = this._scan.apply(this, nArgs);
        //nArgs.push(arguments[i]);
    }
    return atomRecord;
}

coordinatesInstance.prototype.delChain = function () {
    var atomRecord = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var nArgs = ['chainID', 'kick', atomRecord, arguments[i]];
        atomRecord = this._scan.apply(this, nArgs);
        //nArgs.push(arguments[i]);
    }
    //throw atomRecord.length;
    return atomRecord;
}

coordinatesInstance.prototype.delResSeq = function () {
    var atomRecord = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var nArgs = ['resSeq', 'kick', atomRecord, arguments[i]];
        atomRecord = this._scan.apply(this, nArgs);
        //nArgs.push(arguments[i]);
    }
    return atomRecord;
}
coordinatesInstance.prototype.delResName = function () {
    var atomRecord = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var nArgs = ['resName', 'kick', atomRecord, arguments[i]];
        atomRecord = this._scan.apply(this, nArgs);
        //nArgs.push(arguments[i]);
    }
    return atomRecord;
}

// ----- Selectors

coordinatesInstance.prototype.chain = function (args) {
    var nArgs = ['chainID', 'pick'];
    for (var i = 0; i < arguments.length; i++) {
        nArgs.push(arguments[i]);
    }
    var atomRecord = this._scan.apply(this, nArgs);
    return atomRecord;
};

coordinatesInstance.prototype.resName = function (args) {
    var nArgs = ['resName', 'pick'];
    for (var i = 0; i < arguments.length; i++) {
        nArgs.push(arguments[i]);
    }
    var atomRecord = this._scan.apply(this, nArgs);
    return atomRecord;
};

coordinatesInstance.prototype.resSeq = function (args) {
    var nArgs = ['resSeq', 'pick'];
    for (var i = 0; i < arguments.length; i++) {
        nArgs.push(arguments[i]);
    }
    var atomRecord = this._scan.apply(this, nArgs);
    return atomRecord;
};

coordinatesInstance.prototype.name = function (args) {
    var nArgs = ['name', 'pick'];
    for (var i = 0; i < arguments.length; i++) {
        nArgs.push(arguments[i]);
    }
    var atomRecord = this._scan.apply(this, nArgs);
    return atomRecord;
};



var sectionTags = ['MODEL','ATOM','ANISOU','TER','HETATM','ENDMDL'];
var coordinates_parse = function(altLocPreserve, data) {
    var coordinates = new coordinatesInstance();
    var currentModel = null;
    data.forEach(function(e,i, array) {
        var m = e.match(/^MODEL[\s]+([\d]+)/);
        if (m) {
            currentModel = m[1]
            coordinates.models[m[1]] = [];
            return;
        }
        if (!currentModel) {
            currentModel = 1;
            coordinates.models[1] = [];
        }
        var cRecord = coordinates.models[currentModel];
        var atom = Atom(e);
        if (atom) {
            //if (!altLocPreserve && ! atom.altLoc === ' ') {
            if (altLocPreserve){
                cRecord.push(atom);
            } else if(atom.altLoc === ' ' || atom.altLoc === 'A') {
                cRecord.push(atom);
            }
        }
    });
    return coordinates;
};

/*  return a deep copy of an atomRecord*/
var clone = function(atomRecord, modelID) {
    var newCoordinates = new coordinatesInstance();
    var currentModel = modelID ? modelID : 1;
    newCoordinates.models[currentModel] = [];
    newCoordinates.models[currentModel] = atomRecord.map(function(e, i, array){
        var tAtom = new Atom(e);
        return tAtom;
    });
    return newCoordinates;
}
