"use strict"; 
    //global Vars
    var pdbSet = [2];
    var myPdbSet = [1];
    var avgs = [2];
    var stdDevs = [2];
    var medMAD = 0;
    var dataSet = [2];
    var canvasData = [5];
    var fileData = "";
    var fileName =[2];
    var fasta = [2];
    var bfactorCat = [2];
    var alignstr = [2];
    var alString = [3];
    var aligned = [false,false,false];  
    var stages =[];
    var processData_active = false;
    var chart;
    var plusv = 0;   //Karpall
    
    var loc = document.location.href;
    var wt = "importScripts('"+loc.substring(0, loc.indexOf("bandit.html"))+"mmligner.js')\n";
    wt += document.querySelector('#worker1').textContent;
    var bb = new Blob([wt],{ type: 'application/javascript'});
    wt = null;
    loc = null;
    var worker = new Worker(window.URL.createObjectURL(bb));
        
        

    function col(val) {
        var hue = 0.141059345349574*val**5 - 
                  1.39630415656446* val**4 +  
                  0.660631543266438*val**3 +
                  15.8486336855234* val**2 -
                  49.0042644300263* val    +
                  110.081362683102;
       return Math.round(hue).toString();
    }
       
    worker.onmessage = function(e) {
        alignstr = e.data[0];
        if (e.data[1] == 0) {
            alString[0] = e.data[0];
            aligned[0] = true;
        } else if (e.data[1] == 2) {
            alString[2] = e.data[0];
            aligned[2] = true;                
        } else {
            aligned[1] = true;
            alString[1] = e.data[0];
        }
        document.getElementById('alert').style.display='none';
        doChart(3);
    }  
  
    document.addEventListener("DOMContentLoaded", function () {
        stages.push(new NGL.Stage("viewport0", { backgroundColor: "white", width : "100%" , height : "100%"}));
        document.getElementById('viewport0').children[0].style.width="100%";
        document.getElementById('viewport0').children[0].style.height="100%";
        document.getElementById('viewport0').children[0].childNodes[0].style.width="100%";
        document.getElementById('viewport0').children[0].childNodes[0].style.height="100%";
        $(document).ready(function(){
            $('[rel=tooltip]').tooltip({ trigger: "hover" });
        });

    });
    

    function sizesing () {
                /* Adapting sizes in relation to screen width */
        var rem= Math.round(screen.availWidth / 1450 * 0.87 *100)/100;
        var width = (screen.width*0.93);  //50 abstand left für das Chart
        document.body.style.width=width +"px";
        if (rem < 0.5) rem = 0.5;

        var rules = document.styleSheets[0].cssRules;
        
        var i=0;
        while (rules[i].selectorText != ".btn")  i++;
        rules[i].style.fontSize = rem+"rem"; 
        
        i=0;
        while (rules[i].selectorText != ".form-control") i++;
        rules[i].style.fontSize = rem+"rem"; 
        var hi = Math.round((screen.height *0.8) * 0.9); 
        
        i=0;
        while (rules[i].selectorText != ".modal-dialog") i++;
        rules[i].style.width=(width*0.85)+"px";
        //rules[i].style.fontSize = rem+"rem"; 
        var hi = Math.round((screen.height *0.8) * 0.9); 

        document.getElementById('titel').style.left=(width/2-200)+"px";
        var height =  document.getElementById('my-cont').clientHeight;

        rules = document.styleSheets[2].cssRules;
        i=0;
        while (rules[i].selectorText != "#viewport0") i++;            
        rules[i].style.height = (hi -height)+"px";

        var myhi = Math.round((hi-height)/13*100)/100 +"px";
        for(i =0 ; i<13 ; i++) {
              document.getElementById("cc"+i.toString()).style.backgroundColor='hsl('+col(((12-i)-4)/2)+',100%,50%)';
              document.getElementById("cc"+i.toString()).style.height=myhi;
        }
        i=0;
        while (rules[i].selectorText != "#chartContainer") i++;
        rules[i].style.height = (hi-height)+"px";
    }
        
    window.addEventListener('resize', function(event) { sizesing();});
    
    window.onload = function() {
    /* Initialising of variables */
        sizesing();
        document.getElementById('rcsb0').value = "";
        document.getElementById('input0').value = '';
        document.getElementById('full').checked = false;
        document.getElementById('rcsb1').value = "";
        document.getElementById('input1').value = '';
        document.getElementById('align').checked = false;
        document.getElementById('align').disabled= true;
        document.getElementById('seq').disabled=true;
        document.getElementById('seq').checked=true
        document.getElementById('bf').disabled=true;
        document.getElementById('mmligner').disabled=true;
        document.getElementById('sel').value = "";
        document.getElementById('customSwitch4').checked = false;
        document.getElementById('customSwitch3').checked = false;
        document.getElementById('customSwitch5').checked = false;
       // document.getElementById('customSwitch1').disabled = true;
       // document.getElementById('customSwitch1').checked = false;
        document.getElementById('compA').disabled=true;
        document.getElementById('compA').checked=true;
        document.getElementById('compB').disabled=true;
        document.getElementById('superP').disabled=true;
        document.getElementById('CA').checked = true;
        dataSet[0] = [ [] , []  , [] ] ;
        dataSet[1] = [ [] , []  , [] ];
        canvasData[0] = [[]];
        canvasData[1] = [[]];
        canvasData[2] = [[]];
        canvasData[3] = [[]];
        canvasData[4] = [[]];
        chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            zoomEnabled: true,
            exportEnabled : true ,
            rangeChanged : function (e) {
                var series = Number(document.querySelector('input[name="vp"]:checked').value);
                series += ((document.getElementById('align').checked) ? 2 : 0);
                var min = "0";
                var max = e.chart.data[series].dataPoints[e.chart.data[series].dataPoints.length-1].x.toString;
                if (e.axisX[0].viewportMinimum != null) min = Math.floor(e.axisX[0].viewportMinimum.toString(10));
                if (e.axisX[0].viewportMaximum != null) max = Math.floor(e.axisX[0].viewportMaximum.toString(10));
                document.getElementById('sel').value = min +"-"+ max ;  
                drawPdb();                                
            } ,
            toolTip:{
                enabled: false,
                shared: true,
            },
            axisX:[{titleFontFamily: 'arial',
                    titleFontColor: "black",
                    title: "Residue no.",
                    lineColor: "black",
                    lineThickness: 2}
            ],
            axisY: [{   titleFontFamily: 'arial',
                        title: "B'-factor",
                        lineColor: "black", 
                        lineThickness: 2,
                        gridThickness : 0}
            ],
            axisY2:[{
                stripLines:[{
                    startValue:-1,
                    endValue:1,
                    lineDashType: "solid",
                    opacity: .05
                }], 
                titleFontFamily: 'arial',
                title: " " ,
                lineColor: "white",
                    lineThickness: 2,
                    gridThickness : 0}
            ],
            legend: {
                cursor: "pointer",
                itemclick : function(e) {
                  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                    if (e.dataSeriesIndex == 4) {
                        console.log("delta to hide")
                        e.chart.options.axisY2[0].valueFormatString = " ";
                        e.chart.options.axisY2[0].title = null;
                        e.chart.options.axisY2[0].lineColor = "white";
                        e.chart.options.axisY2[0].visible = false;
                      };
                  }
                  else {
                    e.dataSeries.visible = true;
                    if (e.dataSeriesIndex == 4) {
                        e.chart.options.axisY2[0].valueFormatString = "#,##0.##";
                        e.chart.options.axisY2[0].title = "\u0394 B'-factor";
                        e.chart.options.axisY2[0].titleFontColor = "red";
                        e.chart.options.axisY2[0].labelFontColor = "red";
                        e.chart.options.axisY2[0].lineColor = "red";
                      };
                }
                chart.render();
                }
                },
            data: [{
                name: "",
                type: "line",
                showInLegend: false,
                connectNullData: true,
                dataPoints: canvasData[0],
                color: "blue"
            } , {
                name:"",
                type: "line",
                showInLegend: false,
                connectNullData: true,
                dataPoints: canvasData[1],
                color: "green"
            },{
                name:"",
                type: "line",
                showInLegend: false,
                connectNullData: true,
                dataPoints: canvasData[2],
                color: "blue"
            } , {
                name:"",
                type: "line",
                showInLegend: false,
                connectNullData: true,
                dataPoints: canvasData[3],
                color: "green"
            }, {
                name:"",
                type: "line",
                axisYType: "secondary",
                axisYIndex: 0,
                showInLegend: false,
                connectNullData: true,
                dataPoints: canvasData[4],
                color: "red"
            }]
        });
        chart.render();
    };      
       