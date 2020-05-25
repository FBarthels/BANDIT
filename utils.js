"use strict"; 
    function median(values){
        var vals =[];
        vals = values.slice(0);
      if(values.length ===0) return 0;

      vals.sort(function(a,b){
        return a-b;
      });

      var half = Math.floor(vals.length / 2);

      if (vals.length % 2 != 0) {
        return vals[half]/1.0;
      }

      return (vals[half - 1]*1.0 + vals[half]*1.0) / 2.0;
    }
    
    function average(orig){
      var data = orig.slice(0);
      var sum = data.reduce(function(sum, value){
        return sum + value;
      }, 0);

      var avg = sum / data.length;
      return avg;
    }
    
    function standDeviation (calc) {
        var avg = calc.reduce((a, b) => a + b) / calc.length;
        var squareDiffs = calc.map(function(value){
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });
        var avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        return Math.sqrt(avgSquareDiff);        
    }
    
    function calcRunningMean( arr, column , steps) {
        if (column != "") column = "."+column;
        if(steps % 2 == 0) steps +=1;
        if (arr.length < steps ) return;
        var t = "0";
        var rm = [];
        var ctSteps = Math.round(steps/2);
        var limit = ctSteps ;
        var k ;
        var endSteps = 0;
        var startSteps;
        for (var i = 0 ; i < arr.length ; i++) {
            startSteps = i - ctSteps+1;
            if (startSteps < 0) {
                k = -i ; 
            } else {
                k = -ctSteps+1;
                startSteps = 0 ;
            }
            if (arr.length- i - ctSteps < 0 ){
                limit = arr.length- i;
                endSteps = arr.length - i - ctSteps;
            } 
            var st;
            var rmi = 0;
            while( k <  limit ) {
                st = i+k;
                 //console.log(i,k , startSteps , endSteps );
                 //console.log(eval("arr["+st.toString()+"]."+column));
                rmi += eval("arr["+st.toString()+"]"+column);
                k++;
            }
            rm.push( rmi / (steps+startSteps+endSteps));
            //console.log(rmi/(steps+startSteps+endSteps));


        }
        return rm ;           
    }
    
    function medianDev( calc, medi) {
        var mad=[];
        for(var i=0;i< calc.length; i++) {
            mad.push(Math.abs(calc[i] - medi));
            //Math.sqrt(Math.pow((calc[i]-med),2)));
        }
        return median(mad);        
    }
    
    function zScoresMod (calc) {        
        var avg = median(calc);
        var stdDev = 1.486 * medianDev(calc,avg);
        return {"avg" : avg , "stdDev" : stdDev};        
    }
    
    function zScores(calc) {
        
        var avg = calc.reduce((a, b) => a + b) / calc.length;
        var squareDiffs = calc.map(function(value){
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });
        var avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        var stdDev = Math.sqrt(avgSquareDiff); 
        return {"avg" : avg , "stdDev" : stdDev};
    }
    
    function igle(calc, threshold ) {
        var med = 0;
        var mad_med = 0;
        var avg = 0;
        var stdDev = 1;
        med = median(calc);
        mad_med = medianDev(calc,med);

        var m = [];
        for(var i=0;i< calc.length ; i++) {
            m.push(0.6745*(calc[i]-med)/mad_med);
        }
        var out = [];
        for(var i=0;i< calc.length ; i++) {
            if(m[i] < threshold) {
                out.push(calc[i]*1.0);
            }
        }
        
        if(out.length>0 ) {
            /*
            avg = out.reduce((a, b) => a + b) / out.length;
            var squareDiffs = out.map(function(value){
                var diff = value - avg;
                var sqrDiff = diff * diff;
                return sqrDiff;
            });
            var avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
            stdDev = Math.sqrt(avgSquareDiff);
            */
            avg = out.reduce((a, b) => a + b) / out.length;
            stdDev = standDeviation(out);
        } 
        return {"avg" : avg , "stdDev" : stdDev};
        
    }
    