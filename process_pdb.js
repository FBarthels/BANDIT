"use strict";  

    var massMapping = {
        "C" : 12, 
        "N" : 14,
        "O" : 16,
        "S" : 32,
        "SE" : 79 ,
        "H" : 1,
        "P" : 31 ,
    };          

/*  obsolet       
    function smoothBackbone(recSet , smoothSteps) {
        var resName = '';
        var i = 0;
        var k = 0 ;
        var tempFactor;
        var indexO , indexC;  
        /   average carbonyl molecule 
        while ( i < recSet.length ) {
            resName = recSet[i].resName
            k = 0;
            while(recSet[i+k].name!="C" ) k++;
            indexC = k+i;
            k=0;
            while(recSet[i+k].name!="O" ) k++;
            indexO = k+i;
            tempFactor = (recSet[indexO].tempFactor + recSet[indexC].tempFactor)/2.0;
            recSet[indexO].tempFactor = tempFactor;
            recSet[indexC].tempFactor = tempFactor;   
            while(i < recSet.length || resName ==  recSet.resName ) i++;
            i++;
        }
        
        var backbone=[];
        i = 0;
        while( i < recSet.length) {
            if (recSet[i].name == "N"  || 
                recSet[i].name == "CA" || 
                recSet[i].name == "C" ){
                backbone.push({tempFactor : recSet[i].tempFactor  , serial :  i});            
            }
            i++;
        }
        var rep = [];
        for (var l = 0; l < recSet.length ; l++) {
           rep.push(recSet[l].tempFactor);
        }
        rep.length = 0;
        var runningMean=[];
        runningMean = calcRunningMean(backbone , "tempFactor" , smoothSteps);
        for ( i= 0 ; i < runningMean.length ; i++)  {
            recSet[backbone[i].serial].tempFactor = runningMean[i];
        }
        backbone.length = 0;
        runningMean.length = 0;
        return recSet;
    }
*/    
/* obsolet 
    function getDataBase( rec, chainID) {
         var temp_0_RecordSet=[];
         console.log(rec[0]);
       for ( var i = 0 ; i< rec.length ; i++) {
            if (rec[i].recordName=="ATOM  " && rec[i].chainID == chainID){
             
                temp_0_RecordSet.push({ recordName: rec[i].recordName,
                                        serial : rec[i].serial , 
                                        element: rec[i].element ,
                                        chainID : rec[i].chainID,                                        
                                        occupancy: rec[i].occupancy ,
                                        name : rec[i].name , 
                                        altLoc : rec[i].altLoc,
                                        resName : rec[i].resName ,
                                        resSeq : rec[i].resSeq ,
                                        tempFactor : rec[i].tempFactor ,
                                        iCode :rec[i].iCode,
                                        x : rec[i].x ,
                                        y : rec[i].y , 
                                        z : rec[i].z ,
                                        charge : rec[i].charge});
            }
        }
        rec.length = 0;
        return temp_0_RecordSet;
    }
*/

    /*  Handle alt Locations in pdb - file */
        
    function alt_Location(datapdb , altLoci, series,chainID) {
        var temp_1_RecordSet = [];
        var resSeq = 0;
        var firstAltLoc = "";        
        for (var i = 0 ; i < datapdb.length ; i++) {
            if( datapdb[i].recordName=="ATOM  " && datapdb[i].chainID == chainID ){
                var name = datapdb[i].name ;
                if ( resSeq != Number(datapdb[i].resSeq)){
                    firstAltLoc = "";                    
                }
                resSeq = Number(datapdb[i].resSeq);
                if (firstAltLoc == "" && datapdb[i].altLoc != " ") firstAltLoc = datapdb[i].altLoc;
                var bf = 0;
                var k = 0;
                var max_ind = 0;
                var max_occ = 0;
                if (datapdb[i].altLoc == firstAltLoc) {
                    do {
                        if ( datapdb[i+k].name == name) {
                            if(altLoci) {                
                                bf += datapdb[i+k].tempFactor*datapdb[i+k].occupancy;
                            } else {
                                if(Number(datapdb[i+k].occupancy) > max_occ) {
                                    bf = datapdb[i+k].tempFactor;
                                }
                            }
                            if(Number(datapdb[i+k].occupancy)> max_occ) {
                                    max_occ = datapdb[i+k].occupancy;
                                    max_ind = [i+k];
                            }
                        }
                        k++;
                    } while ( (i+k) < datapdb.length && resSeq ==Number(datapdb[i+k].resSeq ));

                    temp_1_RecordSet.push({  recordName: datapdb[max_ind].recordName,
                                             serial : datapdb[max_ind].serial , 
                                             element: datapdb[max_ind].element ,
                                             chainID : datapdb[max_ind].chainID,
                                             occupancy: 1 ,
                                             name : datapdb[max_ind].name , 
                                             altLoc : " ",
                                             resName : datapdb[max_ind].resName ,
                                             resSeq : datapdb[max_ind].resSeq ,
                                             tempFactor : bf ,
                                             iCode :datapdb[max_ind].iCode,
                                             x : datapdb[max_ind].x ,
                                             y : datapdb[max_ind].y , 
                                             z : datapdb[max_ind].z ,
                                             charge : datapdb[max_ind].charge});
                } else if (datapdb[i].altLoc == " ") {
                    temp_1_RecordSet.push({ recordName: datapdb[i].recordName,
                                            serial : datapdb[i].serial , 
                                            element: datapdb[i].element ,
                                            chainID : datapdb[i].chainID,
                                            occupancy: 1 ,
                                            name : datapdb[i].name , 
                                            altLoc : " ",
                                            resName : datapdb[i].resName ,
                                            resSeq : datapdb[i].resSeq ,
                                            tempFactor : datapdb[i].tempFactor,
                                            iCode :datapdb[i].iCode,
                                            x : datapdb[i].x ,
                                            y : datapdb[i].y , 
                                            z : datapdb[i].z ,
                                            charge : datapdb[i].charge});
                } 
            }
        }
        myPdbSet[series] = temp_1_RecordSet;
        datapdb.length = 0;
        return myPdbSet[series];
    }
    
    function parseFile ( lines,series ) {
        var nBuffer = parseBuffer();
        for (var i =0 ; i < lines.length-1; i++) {
            var line = lines[i];
            if(typeof(line) !== 'string' ) line = line.toString();
            //console.log(line);
            var buffer = setBuffer(line, nBuffer)
            if (!buffer) continue;
            buffer.push(line);
        }
        var pdbObject = new PdbObject();
        pdbObject.coordinates = coordinates_parse(true,
                                nBuffer.coordinates.data);
        pdbSet[series] = pdbObject;      
    }
    
    function processData(lines, series) {
        aligned[1] = false;
        aligned[0] = false;
        aligned[2] = false;

        if (series == 0 ) {
            document.getElementById('compA').disabled=false;
            $('#compA').parent().addClass('active');
            $('#compA').get(0).checked = true;
            $('#compB').removeAttr('checked').parent().removeClass('active');
            $('#superP').removeAttr('checked').parent().removeClass('active');
            document.getElementById('lcompA').childNodes[2].data = fileName[series];
        } else if (series == 1 ) {
            document.getElementById('compB').disabled=false;
            $('#compB').parent().addClass('active');
            $('#compB').get(0).checked = true;
            $('#compA').removeAttr('checked').parent().removeClass('active');
            $('#superP').removeAttr('checked').parent().removeClass('active');
            document.getElementById('lcompB').childNodes[2].data = fileName[series];
        }

        document.getElementById('align').checked = false;
        processData_active = true;
        $('#align').bootstrapToggle('off')
        populate_chain(lines,series);
        parseFile (lines,series);
        var rec = [];
        rec.length = 0;
        rec = pdbSet[series].coordinates.model("1");
        var calcMeth = document.querySelector('input[name="calc"]:checked').value;
        normalize(rec,series , calcMeth); 
        processData_active = false;
        drawChart(series);
        if (dataSet[0][0].length != 0 && dataSet[1][0].length !=0) {
            document.getElementById('align').disabled=false;
            var rules = document.styleSheets[0].cssRules;
            var i=0;
            while (rules[i].selectorText != ".btn-danger")  i++;
            rules[i].style.backgroundColor = 'rgb(199, 208, 212)';
            rules[i].style.borderColor = 'rgb(199, 208, 212)';
            var i=300;
            //while (rules[i].selectorText. != ".btn-danger.disabled, .btn-danger:disabled")  i++;
            while ( !(rules[i].selectorText.startsWith(".btn-danger.disabled,"))) i++;
            rules[i].style.borderColor = 'rgb(199, 208, 212)';
            rules[i].style.backgroundColor = 'rgb(199, 208, 212)';

            document.getElementById('seq').disabled=false;
            document.getElementById('bf').disabled=false;
            document.getElementById('mmligner').disabled=false;
        }
    }
       
    function normalise ( recSet , cm ,series ) {

        var tempSet = [];
        var calc = [];
        calc.length = 0;
        var avg = 0;
        var stdDev = 1;
        stdDevs[series] = 1;
        avgs[series] = avg;
        
        if (cm >0 ) {
            for (var i=0 ; i< recSet.length ; i++){
               if ((cm == 1 && recSet[i].name == "CA") ||
                    cm == 2 ||
                   (cm == 3 && (recSet[i].name == "CA" ||
                                recSet[i].name == "N"  ||
                                recSet[i].name == "C"  ||
                                recSet[i].name == "O" ) )
               )
               calc.push(recSet[i].tempFactor);
            }
           
            var normMeth = document.querySelector('input[name="norm"]:checked').value;
            var stats ; 
            plusv = 0;
            if (normMeth == 1) {
                var thresh = Number(document.getElementById('outlier').value);
                stats = igle(calc, thresh )
            } else if (normMeth == 0) {
                stats = zScores(calc);
            } else if (normMeth == 2) {
                stats = zScoresMod(calc);
            } else {
                plusv = 1;
                avg = average(calc) ;
                stdDev = (standDeviation(calc)) / 0.3;
                stats = {"avg" : avg  , "stdDev": stdDev};
            }
            if ( stats.stdDev == 0 ) stats.stdDev =1;
            stdDevs[series] = stats.stdDev;
            avgs[series] = stats.avg;

            for(var i=0;i< recSet.length; i++) {
                recSet[i].tempFactor = (recSet[i].tempFactor - stats.avg) / stats.stdDev + plusv;
            }
        }
        
        if (cm == 1 || cm == 0) {
            for (var i = 0 ; i < recSet.length ; i++){
                if (recSet[i].name == "CA") tempSet.push(recSet[i]);
            }
            if (cm == 0 ) return tempSet;
        } else if (cm == 2) {
            var weighted = ( (document.getElementById('customSwitch3').checked) ? true : false);
            for (var i = 0 ; i < recSet.length ; i++){
                var residue = Number(recSet[i].resSeq);
                var tempFactor = 0;
                var ct = 0;
                var weight = 0;
                var foundCa = false;
                do {
                    weight = ( (weighted) ?  massMapping[recSet[i].element.trim()] : 1)
                    ct+=weight;
                    tempFactor += recSet[i].tempFactor * weight;
                    if (recSet[i].name == "CA") {
                        foundCa = true;
                        tempSet.push(recSet[i]);
                    }
                    i++;
                } while ( i < recSet.length && residue == Number(recSet[i].resSeq));
                if (foundCa) tempSet[tempSet.length-1].tempFactor = (Math.round((tempFactor/ct)*100)/100);
                i -= 1;
            }
            
        } else if (cm == 3) {
            var weighted = ( (document.getElementById('customSwitch3').checked) ? true : false);
            for (var i = 0 ; i < recSet.length ; i++){
                var residue = Number(recSet[i].resSeq);            
                var tempFactor = 0;
                var ct = 0;
                var foundCa = false;
                do {
                    if (recSet[i].name == "CA" || 
                        recSet[i].name == "C"  ||
                        recSet[i].name == "N"  ||
                        recSet[i].name == "O" ) {
                            weight = ( (weighted) ?  massMapping[recSet[i].element.trim()] : 1)
                            ct+=weight;
                            tempFactor += recSet[i].tempFactor * weight;
                            if (recSet[i].name == "CA") {
                                foundCa = true;
                                tempSet.push(recSet[i]);
                            }
                     }
                    i++;
                } while ( i < recSet.length && residue == Number(recSet[i].resSeq));
                if (foundCa) tempSet[tempSet.length-1].tempFactor = (Math.round((tempFactor/ct)*100)/100);
                i -= 1;
            }
        } 
        return tempSet;
    }
    
    function handle_files(series) {
        document.getElementById('rcsb'+series).value = '';
        var selectedFile = document.getElementById('input'+series).files[0];
        fileName[series] =selectedFile.name.slice(0, 4);
        document.getElementById('rcsb'+series).value = fileName[series].trim();
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                var lines = evt.target.result.split("\n");
                processData(lines,series);
            }
        }
        reader.readAsText(selectedFile);     
    }
    
    function reqListener (series,text,pdb) {
        var lines = text.split("\n");
        fileName[series] = pdb ;
        processData(lines,series);
    }
        
    function handle_online(series) {
        var pdb = document.getElementById('rcsb'+series).value;
        if (pdb =="") return;
        document.getElementById('input'+series).value = '';
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                if (this.status == 200) {
                    reqListener(series,this.responseText,pdb); 
                    document.getElementById('rcsb'+series).className="form-control";
                } else {
                    document.getElementById('rcsb'+series).className="form-control is-invalid";
                }
            }
        };
        oReq.open("GET", "https://files.rcsb.org/download/"+pdb+".pdb");
        oReq.send();
    }
    
    function handle_chainID(series, calc_only) { 
        aligned[1] = false;
        if (calc_only == 0) {
            aligned[0] = false;
            aligned[2] = false;
        }
        var calcMeth = document.querySelector('input[name="calc"]:checked').value;
        /* smooth backbone disabled 
            if (calcMeth == 3) {
               document.getElementById('customSwitch1').disabled = false;
            } else {
               document.getElementById('customSwitch1').checked = false;
               document.getElementById('customSwitch1').disabled = true;
            }
        */
        for (var i=0 ;i<pdbSet.length;i++) {
            if (typeof pdbSet[i].coordinates == 'undefined') continue;
            var rec = [];
            rec.length = 0;
            rec= pdbSet[i].coordinates.model("1");
            normalize(rec,i,calcMeth);
            if (!document.getElementById('align').checked) drawChart(i);
        }
        if(document.getElementById('align').checked) drawChart(3);
    }