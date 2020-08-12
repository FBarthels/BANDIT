 "use strict"; 
 
    function copy_deltB (k) {
        var db_datapoints=[]
        var i = 0
        var l = 1
        while (canvasData[4][i].y===null) i ++;
        for ( i; i< canvasData[4].length; i++) {
            db_datapoints.push({x:l, y:((canvasData[4][i].y===null)?null : Math.round(1000.0*canvasData[4][i].y)/1000.0)})
            //if(canvasData[4][i].y===null) {
                //console.log(i, canvasData[4][i].y)
                //db_datapoints[i].y =null;
            //}
            l++;
        } 
        db_list[k] = {name: chart.data[1].legendText, medMad: ((chart.axisY2[0].stripLines[0].endValue==0) ? 1: chart.axisY2[0].stripLines[0].endValue), data: db_datapoints} 
        console.log(db_list[k])
    }
 
    function expImage() {
         stages[0].makeImage( {
            factor: 10,
            antialias: true,
            trim:true,
            transparent: true
        } ).then( function( blob ){
            NGL.download( blob, "pd.png" );
        } );
   }
    

    
    function bfactorMap(bfac){
        var lim = [0.6 , 1.4 , 2.8 ];
        if (bfac == null) return "Z";
        if(Math.abs(bfac) < lim[0]) return "A";
        if(bfac >= lim[0] && bfac < lim[1]) return "B";
        if(bfac >= lim[1] && bfac < lim[2]) return "D";
        if(bfac >= lim[2] ) return "F";
        if(bfac <= -lim[0] && bfac > - lim[1]) return "C";
        if(bfac <= -lim[1] && bfac > -lim[2]) return "E";
        if(bfac <= -lim[2] ) return "G";
    }
    
    function populate_chain(lines,series) {
        var chain_ct = 0;
        var found = 0 ;
        var chain_text = [];
        for (var i=0; i<lines.length ; i++){
            if (lines[i].startsWith("ATOM") ) {
                if (lines[i].charAt(21) != found){
                    found = lines[i].charAt(21);
                    chain_text.push(found);
                }
            }
        }
        var chainID = document.getElementById('chainID'+series); 
        chainID.options.length = 1;                    
        for (var i=0;i< chain_text.length;i++) {    
            var option = document.createElement('option');
            option.text = chain_text[i];
            chainID.add(option);
        }

        chainID.value = chain_text[0]; 
        chainID.options[1].selected = true;  
        $('.selectpicker').selectpicker('refresh');        
    }
    
    function recString(rec , resSeq , bfactor) {
        var name = rec.name.length < 4 ? " " + rec.name : rec.name;
        var string = sprintf("%6s%5d %-4s%s%3s %s%4s%s   %8.3f%8.3f%8.3f%6.2f%6.2f          %-2s%-2s\n",
            rec.recordName, rec.serial, name, rec.altLoc, rec.resName, rec.chainID, resSeq,
            rec.iCode, rec.x, rec.y, rec.z,
            rec.occupancy,bfactor , rec.element, rec.charge);
        return string;
    }
    
    function PdbString(rec , i ) {
        var resSeq =  i == 0 ? rec.resSeq : i+1 ;
        var name = rec.name.length < 4 ? " " + rec.name : rec.name;
        var string = sprintf("%6s%5d %-4s%s%3s %s%4s%s   %8.3f%8.3f%8.3f%6.2f%6.2f          %-2s%-2s\n",
            "ATOM  ", rec.serial, name, rec.altLoc, rec.resName, rec.chainID, resSeq,
            rec.iCode, rec.x, rec.y, rec.z,
            rec.occupancy,rec.tempFactor , rec.element, rec.charge);
        return string;
    }
    
    function setMMLignerData(series,rec) {
        fileData = "";
        var fastaStr = fasta[series];
        var j=0;
        for (var i=0 ; i<fastaStr.length; i++) {
            if (fastaStr[i] != "-" && fastaStr[i] != "Z") {
                if (j >= rec.length) break;
                var resseq = rec[j].resSeq;
                do {
                    fileData += PdbString(rec[j],i);
                    j++;
                } while (j < rec.length && rec[j].resSeq == resseq );
           }
        }
        
    }
    
    function setPlotData( series , rec) {
        fileData = "";
        var chainID = document.getElementById('chainID'+series).value;
        var fastaStr ;
        if (document.getElementById('align').checked &&
              alString[document.querySelector('input[name="ali"]:checked').value ] != undefined ){
            fastaStr = alString[document.querySelector('input[name="ali"]:checked').value ][series];
            var j=0;
            for (var i=0 ; i<fastaStr.length; i++) {
                if (fastaStr[i] != "-" && fastaStr[i] != "Z") {
                    if (j >= rec.length) break;
                    var resseq = rec[j].resSeq;
                    do {
                        fileData += PdbString(rec[j],i);
                        j++;
                    } while (j < rec.length && rec[j].resSeq == resseq );
               }
            } 
        }else for (var i=0;i<rec.length; i++) fileData += PdbString(rec[i],0);       
    }

    function saveData(series) {
        fileData = "";
        var rec = pdbSet[series].coordinates.model("1");
        var chainID = document.getElementById('chainID'+series).value;
        var fastaStr ;
        if (document.getElementById('align').checked &&
            alString[document.querySelector('input[name="ali"]:checked').value ] != undefined ){
            fastaStr = alString[document.querySelector('input[name="ali"]:checked').value ][series];
            var j=0;
            for (var i=0 ; i<fastaStr.length; i++) {
                if (fastaStr[i] != "-" && fastaStr[i] != "Z") {
                    if (j >= rec.length) break;
                    while (j < rec.length && ((rec[j].recordName != "ATOM  ") ||  
                            (rec[j].chainID != chainID ))) {
                                j++;
                                if (j >= rec.length) {
                                    return fileName[series] + ".chain" + document.getElementById('chainID'+series).value + "_normalized.pdb";
                                }
                    }
                    var resseq = rec[j].resSeq;
                    do {
                            var tempFactor = (rec[j].tempFactor- avgs[series] )/ stdDevs[series] + plusv;
                            fileData += recString(rec[j] , sprintf("%4d",i+1), tempFactor);
                        j++;
                    } while (j < rec.length && rec[j].resSeq == resseq );
               }
            } 
        } else {
            var save;
            for (var i=0;i<rec.length; i++) {
                if ((rec[i].recordName == "ATOM  ")  && 
                 (rec[i].chainID == chainID )) {
                    save = rec[i].tempFactor;
                    rec[i].tempFactor = (rec[i].tempFactor- avgs[series] )/ stdDevs[series] +plusv;
                    fileData +=rec[i].stringify();
                    rec[i].tempFactor=save;                 
                 }
            }
        }
        return fileName[series] + ".chain" + document.getElementById('chainID'+series).value +"_normalized.pdb";
    }
    
    function saveCSV(series){
        fileData = "";
        if (series <2) {
            var datalabels = dataSet[series][0];
            var datapoints = dataSet[series][1];
            var tooltip = dataSet[series][2];
            fileData = "resid , bnorm ,  resaa \n";
            for (var i=0; i< datalabels.length; i++) {
                fileData += sprintf( " %s , %5.2f  , %s \n" ,  datalabels[i], datapoints[i] , tooltip[i]);
            }
            return fileName[series] + ".chain" + document.getElementById('chainID'+series).value +"_normalized.csv";
        } else {           
            var datalabels = canvasData[2];
            var datapoints1 = canvasData[2];
            var datapoints2 = canvasData[3];
            var datapoints3 = canvasData[4];
            fileData = "# , bnorm A , resid A , resaa A , bnorm B , resid B , resaa B , deltaBnorm \n";
            for (var i=0; i< datalabels.length; i++) {
                fileData += sprintf( " %d , %5.2f  , %s , %s  , %5.2f  , %s , %s  ,  %5.2f  \n" ,  
                        datalabels[i].x,datapoints1[i].y, datapoints1[i].name1 , datapoints1[i].name,
                                        datapoints2[i].y, datapoints2[i].name1 , datapoints2[i].name,
                                        datapoints3[i].y );
            }
            return fileName[0] + ".chain" + document.getElementById('chainID0').value +"_" + fileName[1] + ".chain" + document.getElementById('chainID1').value + ".aligned.csv";

        }
    }
    
    function trim(c) {
        var ctx = c.getContext('2d'),
        copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
          top: null,
          left: null,
          right: null,
          bottom: null
        },
        x, y;

        for (i = 0; i < l; i += 4) {
            if (pixels.data[i+3] !== 0) {
              x = (i / 4) % c.width;
              y = ~~((i / 4) / c.width);
           
              if (bound.top === null) {
                bound.top = y;
              }
              
              if (bound.left === null) {
                bound.left = x; 
              } else if (x < bound.left) {
                bound.left = x;
              }
              
              if (bound.right === null) {
                bound.right = x; 
              } else if (bound.right < x) {
                bound.right = x;
              }
              
              if (bound.bottom === null) {
                bound.bottom = y;
              } else if (bound.bottom < y) {
                bound.bottom = y;
              }
            }
        }
    
        var trimHeight = bound.bottom - bound.top+1,
            trimWidth = bound.right - bound.left+1,
            trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
  
        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.putImageData(trimmed, 0, 0);
  
        // open new window with trimmed image:
        return copy.canvas;
    }

    function trimCanvas (canvas,r, g, b, a) {
          var canvasHeight = canvas.height;
          var canvasWidth = canvas.width;

          var ctx = canvas.getContext('2d');
          var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

          let x, y, doBreak, off;

          doBreak = false;
          for (y = 0; y < canvasHeight; y++) {
            for (x = 0; x < canvasWidth; x++) {
              off = (y * canvasWidth + x) * 4;
              if (pixels[ off ] !== r || pixels[ off + 1 ] !== g ||
                  pixels[ off + 2 ] !== b || pixels[ off + 3 ] !== a
              ) {
                doBreak = true;
                break;
              }
            }
            if (doBreak) {
              break;
            }
          }
          var topY = y;

          doBreak = false;
          for (x = 0; x < canvasWidth; x++) {
            for (y = 0; y < canvasHeight; y++) {
              off = (y * canvasWidth + x) * 4;
              if (pixels[ off ] !== r || pixels[ off + 1 ] !== g ||
                  pixels[ off + 2 ] !== b || pixels[ off + 3 ] !== a
              ) {
                doBreak = true;
                break;
              }
            }
            if (doBreak) {
              break;
            }
          }
          var topX = x

          doBreak = false;
          for (y = canvasHeight - 1; y >= 0; y--) {
            for (x = canvasWidth - 1; x >= 0; x--) {
              off = (y * canvasWidth + x) * 4;
              if (pixels[ off ] !== r || pixels[ off + 1 ] !== g ||
                  pixels[ off + 2 ] !== b || pixels[ off + 3 ] !== a
              ) {
                doBreak = true;
                break;
              }
            }
            if (doBreak) {
              break;
            }
          }
          var bottomY = y;

          doBreak = false;
          for (x = canvasWidth - 1; x >= 0; x--) {
            for (y = canvasHeight - 1; y >= 0; y--) {
              off = (y * canvasWidth + x) * 4;
              if (pixels[ off ] !== r || pixels[ off + 1 ] !== g ||
                  pixels[ off + 2 ] !== b || pixels[ off + 3 ] !== a
              ) {
                doBreak = true;
                break;
              }
            }
            if (doBreak) {
              break;
            }
          }
          var bottomX = x;

          var trimedCanvas = document.createElement('canvas');
          trimedCanvas.width = bottomX - topX;
          trimedCanvas.height = bottomY - topY;

          var trimedCtx = trimedCanvas.getContext('2d');
          trimedCtx.drawImage(
            canvas,
            topX, topY,
            trimedCanvas.width, trimedCanvas.height,
            0, 0,
            trimedCanvas.width, trimedCanvas.height
          );

          return trimedCanvas;
        }
        
    function saveImg() {
        var width = chart.get("width");
        var height = chart.get("height");
        chart.set("width", width * 2);
        chart.set("height", height * 2);

        html2canvas(document.getElementById('chartContainer').childNodes[0].children[0],{logging:false , scale:5}).then(canvas =>{ 
            canvas = trimCanvas(canvas , 0,0,0,0);
            var element = document.createElement('a');
            element.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            element.setAttribute('download', "chart.png");
            element.click();        
        });
        
        chart.set("width", width);
        chart.set("height", height);
    }
    
    function download(func, series) {
        if (!document.getElementById('align').checked && series==3)  return;
        if (series < 2 && document.getElementById('chainID'+series).value == '') return;
        var fname = func(series);
        // Edge
        if (navigator.msSaveBlob) {
                navigator.msSaveBlob(new Blob( [ fileData], { type: 'text/plain'} ), fname);
                //e.preventDefault();
                return;
            } else {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
                encodeURIComponent(fileData));
                element.setAttribute('download', fname);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
    }
       
    function normalize( rec,series , cm) {
        var chainID = document.getElementById('chainID'+series).value;
        //var meanBack  = ( (document.getElementById('customSwitch1').checked) ? true : false);
        var weighted = ( (document.getElementById('customSwitch3').checked) ? true : false);       
        var occ = ( (document.getElementById('customSwitch4').checked) ? true : false);
        var twop = ( (document.getElementById('customSwitch5').checked) ? true : false);
        var datapdb=[];
        datapdb = alt_Location(rec, occ , series , chainID );         
        /*
        if(meanBack) {
            var bbsteps = Number(document.getElementById('backbsteps').value);            
            datapdb= smoothBackbone(myPdbSet[series] , bbsteps);
        } 
        */
        datapdb = normalise(datapdb, cm , series);
   
        var res_min = Number(datapdb[0].resSeq);
        var res_max = Number(datapdb[datapdb.length-1].resSeq);

        var datalabels ;
        var datapoints ;
        var tooltip;
        datalabels = dataSet[series][0];
        datapoints = dataSet[series][1];
        tooltip = dataSet[series][2];
        datalabels.length = 0;
        datapoints.length = 0;
        tooltip.length = 0;
        fasta[series] = "";  //used for alignment
        bfactorCat[series] = "";  //bfactor alignment
        var j = 0;
        for (var i=res_min ;i<=res_max;i++) {            
            datalabels.push(i.toString());
            datapoints.push(null);
            tooltip.push("");
            var am = "Z";
            var count = 0 ;
            if (Number(datapdb[j].resSeq)  == i ){
                    datapoints[i-res_min] = Math.round( datapdb[j].tempFactor * 100)/100;
                    tooltip[i-res_min]= (datapdb[j].resName+"");
                    am =residueMapping[datapdb[j].resName];
                    j +=1;
            }
            fasta[series] += am;
            bfactorCat[series] += bfactorMap(datapoints[i-res_min])
        }
        if (twop) {
            var smsteps = Number(document.getElementById('bsteps').value);
            var runningMean=[];
            runningMean = calcRunningMean(datapoints, "" , smsteps);
            for ( i= 0 ; i < runningMean.length ; i++)  {
                datapoints[i] = Math.round(runningMean[i]*100)/100;
            }
        }
    }


    
    function drawChart (series) {
        if (document.getElementById('align').checked ) {
            document.getElementById('superP').disabled = false;
            document.getElementById('customSwitch5').disabled = false;
            if (document.querySelector('input[name="ali"]:checked').value == 1 
                    && !aligned[1] ) {
                document.getElementById('alert').style.display='block';                        
                worker.postMessage([ bfactorCat, "bfactor"]);
                return;
            } else if ( document.querySelector('input[name="ali"]:checked').value == 0
                    && !aligned[0] ){ 
                document.getElementById('alert').style.display='block';
                worker.postMessage([fasta, "fasta"]);
                return;
            } else if (document.querySelector('input[name="ali"]:checked').value == 2
                       && ! aligned[2]) {
                document.getElementById('alert').style.display='block';
                var virtPdb = [];  
                for (var i= 0; i<2;i++) { 
                    setMMLignerData(i,myPdbSet[i])
                    virtPdb[i] = fileData;
                }
                var chainID0 = document.getElementById('chainID0').value;
                var chainID1 = document.getElementById('chainID1').value;
                worker.postMessage([virtPdb, "mmligner", chainID0 , chainID1]);
                return;
            }
            
        } else if (series == 4) {
            document.getElementById('superP').disabled = true;
            if (Number(document.querySelector('input[name="vp"]:checked').value) == 1) document.getElementById('compB').checked = true;
            else document.getElementById('compA').checked = true;
            handle_chainID(3,1);
            return;
        }
        for(var i = 0; i < chart.axisX.length; i++){
            chart.axisX[i].set("viewportMinimum", null, false);
            chart.axisX[i].set("viewportMaximum", null, true);
        }
        for(var j = 0; j < chart.axisY.length; j++){
            chart.axisY[j].set("viewportMinimum", null, false);
            chart.axisY[j].set("viewportMaximum", null, true);
        }
        document.getElementById('sel').value ='';
        doChart(series);        
    }
    
    function doChart(series) {
        if (series<3) {
            var datalabels = dataSet[series][0];
            var datapoints = dataSet[series][1];
            var tooltip = dataSet[series][2];
            var dataPoints = canvasData[series];
            dataPoints.length = 0;
            for (var i = 0; i < datalabels.length; i++)
                    dataPoints.push({
                        x: Number(datalabels[i]),
                        y: datapoints[i],                    
                        name: tooltip[i],
                        name1: datalabels[i]
            });
            chart.options.data[series].legendText = fileName[series];
            chart.options.data[series].showInLegend = true;
            chart.options.toolTip.enabled = true;
        }
        
        if (document.getElementById('align').checked ) {
            var alignstr = alString[document.querySelector('input[name="ali"]:checked').value ];
            var datadiff = [2];
            for (var i = 0 ; i <2 ;i++) {
                var datdiff = [];
                var datalabels = dataSet[i][0];
                var datapoints = dataSet[i][1];
                var tooltip = dataSet[i][2];
                var dataPoints = canvasData[i+2];
                dataPoints.length=0;
                var k=0;
                for (var j=0; j< alignstr[i].length;j++) {
                    if ( alignstr[i].charAt(j) == "-" || alignstr[i].charAt(j) == "Z" ) {
                        datdiff.push(null);
                        dataPoints.push( {
                            x: j+1 ,
                            y: null,
                            name: " ",
                            name1: " "
                        });
                    } else {
                        while(tooltip[k] == "" ) k+=1;
                        datdiff.push(datapoints[k]);
                        dataPoints.push({
                            x: j+1,
                            y: datapoints[k],                    
                            name: tooltip[k],   
                            name1: datalabels[k]
                        });
                        k += 1;  
                    }
                }
                datadiff[i] = datdiff;
                chart.options.data[i+2].legendText = fileName[i];
                chart.options.data[i+2].showInLegend = true;
                chart.options.data[i+2].visible = true;

                chart.options.data[0].toolTipContent = null;
                chart.options.data[1].toolTipContent = null;
                chart.options.data[2].toolTipContent = "<span style='\"'color: {color};'\"'>{name}-{name1} <br> B': {y}</span>";
                chart.options.data[3].toolTipContent = "<span style='\"'color: {color};'\"'><br>{name}-{name1} <br> B': {y}</span>";
                chart.options.data[4].toolTipContent = "<span style='\"'color: {color};'\"'><br>&Delta;B':{y}</span>";
            }
            chart.options.axisY2[0].valueFormatString = "#,##0.##";
            chart.options.axisY2[0].valueFormatString = " ";
            chart.options.axisY2[0].title = null;
            chart.options.axisY2[0].lineColor = "white";
            chart.options.axisY2[0].visible = false;
            var diff = canvasData[4];
            var threshDiff = [];
            diff.length = 0;

            for (var i=0 ; i<canvasData[2].length; i++) {
                if(datadiff[0][i] != null && datadiff[1][i] != null) {
                      var mitteldiff =(datadiff[0][i]-datadiff[1][i]);
                      diff.push({
                        x: i+1 ,
                        y: mitteldiff,
                    });
                    threshDiff.push(mitteldiff);
                }else {
                    diff.push( {
                        x: i+1 ,
                        y: null
                    });
                }
            } 
             var threshMad = median(threshDiff);
            var threshMed = [];
            for (var i=0 ; i< threshDiff.length;i++){
                threshMed.push(Math.abs(threshDiff[i]-threshMad));
            }
            medMAD = median(threshMed)*1.65;
            chart.axisY2[0].stripLines[0].set("startValue", -medMAD, false);
            chart.axisY2[0].stripLines[0].set("endValue", medMAD,false);
            chart.options.data[4].legendText = "\u0394 B'";
            chart.options.data[4].showInLegend = true;
            chart.options.data[4].visible = false;
            chart.options.data[0].visible = false;
            chart.options.data[1].visible = false;
            chart.options.data[0].showInLegend = false;
            chart.options.data[1].showInLegend = false;
        } else {  
            chart.options.data[0].visible = true;
            chart.options.data[1].visible = true;
            chart.options.data[2].visible = false;
            chart.options.data[3].visible = false;
            chart.options.data[4].visible = false;
            chart.options.data[0].showInLegend = true;
            chart.options.data[1].showInLegend = true;
            chart.options.data[2].showInLegend = false;
            chart.options.data[3].showInLegend = false;
            chart.options.data[4].showInLegend = false;
            chart.options.axisY2[0].valueFormatString = " ";
            chart.options.axisY2[0].title = null;
            chart.options.axisY2[0].lineColor = "white";
            chart.options.axisY2[0].visible =false;
            chart.options.data[0].toolTipContent = "<span style='\"'color: {color};'\"'>{name}-{x} <br> B': {y}</span>";
            chart.options.data[1].toolTipContent = "<span style='\"'color: {color};'\"'><br> {name}-{x} <br> B': {y}</span>";
            chart.options.data[2].toolTipContent = null;
            chart.options.data[3].toolTipContent = null;
            chart.options.data[4].toolTipContent = null;
        }
        chart.render();
        if (processData_active) return;
        drawPdb(series);
    }
    
    function hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
        return `0x${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    function drawPdb (dummy) { 
        var seri = Number(document.querySelector('input[name="vp"]:checked').value);
        stages[0].removeAllComponents();

        var schemeId = NGL.ColormakerRegistry.addScheme(function (params) {
            this.atomColor = function (atom) {
                if (atom.bfactor > 4 ) {
                    return hslToHex(0,100,50)
                }
                else if ( atom.bfactor < -2.5 ) {
                    return hslToHex(255,100,50) 
                }
                else {
                   var hue = 0.141059377538213  *atom.bfactor**5 - 
                              1.3963032868258   *atom.bfactor**4 +  
                              0.660631629880557 *atom.bfactor**3 +
                              15.8486427632848  *atom.bfactor**2 -
                              49.0042341737324  *atom.bfactor    +
                              110.08134138795    ;
                   return hslToHex(hue,100,50);
                }
            };
        });

        if (seri < 2) {
            var ser= Number(seri); 
            if (document.getElementById('align').checked)ser += 2;
            setPlotData(seri, myPdbSet[seri]);
            var chain = document.getElementById('chainID'+seri).value;
            var stringBlob = new Blob( [ fileData], { type: 'text/plain'} ); 
            var s = canvasData[ser][0].x + "-"+canvasData[ser][canvasData[ser].length-1].x+":"+chain;
            //console.log(document.getElementById('viewport0'));
            //stages[0].updateInfo(true);
            
            //stages[0].handleResize();
            //console.log(stages[0]);
            //stages[0].setSize(document.getElementById('viewport0').childNodes[0].clientWidth,document.getElementById('viewport0').childNodes[0].clientHeight);
            //document.getElementById('viewport0').children[0].style.width="100%";
            //document.getElementById('viewport0').children[0].style.height="100%";
            //document.getElementById('viewport0').children[0].childNodes[0].style.width="100%";
            //document.getElementById('viewport0').children[0].childNodes[0].style.height="100%"

            //document.getElementById('viewport0').children[0].childNodes[0].width=480;
            //document.getElementById('viewport0').children[0].childNodes[0].height=480;
            if (document.getElementById('sel').value !='') s = document.getElementById('sel').value+":"+chain;
            stages[0].loadFile(stringBlob, { ext: "pdb" , sele: ":"+chain , name: fileName[seri] }).then(function (o) {
                o.addRepresentation("cartoon", { cameraType: 'orthographic' ,
                                                 color: schemeId, 
                                                 fogFar: 1,
                                                 fogNear:1,
                                                 ambientIntensity:6,
                                                 quality: "high" ,  
                                                 aspectRatio: 5.0, 
                                                 colorReverse: true , 
                                                 sele: s, 
                                                 radiusScale: 1.0, });
                o.setScale(5.0);
                o.autoView();
            });
        } else {
            var blobs = [];  
            for (var i= 0; i<2;i++) { 
                setPlotData(i, myPdbSet[i]);
                blobs[i] = new Blob( [ fileData], { type: 'text/plain'} );
            } 
            var chain0 = document.getElementById('chainID'+0).value;
            var chain1 = document.getElementById('chainID'+1).value
            var s0 = "1-"+canvasData[2].length+":"+chain0;
            var s1 = "1-"+canvasData[3].length+":"+chain1;
            if (document.getElementById('sel').value !='') {
                s0 = document.getElementById('sel').value+":"+chain0;
                s1 = document.getElementById('sel').value+":"+chain1;
            }
            Promise.all([ 
                stages[0].loadFile(blobs[0], { ext: "pdb" , sele: ":"+chain0 , name : fileName[0] }).then(function (o) {
                    o.addRepresentation("cartoon", { color: schemeId, 
                                                    colorReverse: true , 
                                                    sele: s0 , 
                                                    scale: 1 })
                    return o
                }),
                stages[0].loadFile(blobs[1], { ext: "pdb" , sele: ":"+chain1 , name : fileName[1] }).then(function (o) {
                    o.addRepresentation("cartoon", { color: schemeId, 
                                                     colorReverse: false , 
                                                     sele: s1 , 
                                                     scale: 1  })
                    return o
                })        
            ]).then(function (ol) {
                ol[ 0 ].superpose(ol[ 1 ], true, s1)
                ol[ 0 ].autoView(":"+chain0)
            })      
        }
    }

