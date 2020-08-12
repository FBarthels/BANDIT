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
    var db_list = new Array();
    var mychart;
    var db_index = new Array();
    
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var loc = document.location.href;
    loc = loc.substring(0, loc.indexOf(page))
    if ( loc == "") loc = document.location.href;
    //var wt = "importScripts('"+loc.substring(0, loc.indexOf("bnorm3000.html"))+"seqalign.js')\n"; 
    var wt = "importScripts('"+loc+"mmligner.js')\n";
    wt += document.querySelector('#worker1').textContent;
    var bb = new Blob([wt],{ type: 'application/javascript'});
    wt = null;
    loc = null;
    var worker = new Worker(window.URL.createObjectURL(bb));
    
   
    function toggle_list() {
        if (document.getElementById('data_window_2').style.display=='inline-block') {
            document.getElementById('data_window_2').style.display='none'
            document.getElementById('data_list').style.display='inline-block'
        }
        else {
            document.getElementById('data_window_2').style.display='inline-block'
            document.getElementById('data_list').style.display='none'
        }
    }

        
        

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
      
            
   $(document).ready(function(){

     $('[rel=tooltip]').tooltip({ trigger: "hover" });
     var t = $('#dbtable').DataTable({
         dom: 'Bt',
         scrollY:"42vh",
         scrollX: false,
         scrollCollapse: true,
         searching: false,
         info: false,
         ordering: false,
         lengthChange: false,
         paging: false,
        
         columnDefs: [{
          targets: 0,
          checkboxes: {
               selectRow: true
          }
        }],
        select: {
          style: 'multi',
          selector: 'td:first-child'
        },
        buttons: [
        {text:'Replot',
            action: function(){
                var obj = new Array();
                var k = 0;
                /*
                for (var k=0; k< db_list.length ; k++){
                  obj[k] = {
                    name: db_list[k].name,
                    data: db_list[k].data.slice(Math.floor(chart.axisX[0].viewportMinimum),Math.floor(chart.axisX[0].viewportMaximum))
                 };
                }
                */
                t.rows({selected: true} ).every( function() {
                //    console.log(k, this.index(), Math.floor(chart.axisX[0].viewportMaximum),Math.floor(chart.axisX[0].viewportMinimum))
                    obj[k] = {
                        name: db_list[this.index()].name,
                        data: db_list[this.index()].data.slice(Math.floor(chart.axisX[0].viewportMinimum),Math.floor(chart.axisX[0].viewportMaximum))
                    };
                   db_index[k]= this.index();
                    k++;

                    
                });
                // t.rows({selected: false} ).every( function() {
                //     mychart.w.config.series.splice(this.index(),1)
                // })

                mychart.updateSeries(obj);
                //console.log(mychart.w.config.series)


                //console.log(obj)

                

            }
        },
        { text: 'Add',
          action: function () {
            if (t.rows().count() == 0) {
                document.getElementById('db_basis').value =
                chart.data[0].legendText ;
                document.getElementById('ch_basis').value = 
                  document.getElementById('chainID0').value;
            }
            
            if( (chart.data[0].legendText == 
                    document.getElementById('db_basis').value && 
                 document.getElementById('chainID0').value == 
                    document.getElementById('ch_basis').value) &&
               (document.getElementById('align').checked &&
               document.querySelector('input[name="calc"]:checked').value >0)) {
            copy_deltB(t.rows().count());
            var bs;
            if (document.getElementById('customSwitch5').checked) {
                bs = Number(document.getElementById('bsteps').value);
               } else bs = 0;
               
            t.row.add( [
              '',
              chart.data[1].legendText.trim(),
              //document.getElementById('rcsb1').value,
              document.getElementById('chainID1').value,
              document.querySelector('input[name="ali"]:checked').value,
              document.querySelector('input[name="calc"]:checked').value , 
              document.querySelector('input[name="norm"]:checked').value, 
              document.getElementById('customSwitch3').checked,
              document.getElementById('customSwitch4').checked,
              bs,db_list[t.rows().count()]
              ]).draw( false );
              t.row(t.rows().count()-1).select();
              
           }
          }
        }, 
        { text: 'Del',
          action: function () {
            t.rows({selected: true } ).every( function() {
               //console.log("table_data: " , t.cells(this,7 ).data()[0]);
               var removed = db_list.splice(this.index(),1);

            });
                
            t.rows( { selected: true } ).remove().draw();

          }    
        },
        { text: 'Heatmap' ,
          action: function() {
               if (document.getElementById('data_window_1').style.display=='inline-block') {
                document.getElementById('data_window_1').style.display='none'
                document.getElementById('heat_map').style.display='inline-block';
                t.button(0).trigger();
            }
            else {
                document.getElementById('data_window_1').style.display='inline-block'
                document.getElementById('heat_map').style.display='none';
                chart.render();

            }
          }
        },
        { text: 'NGLview',
          action: function () {
            if (document.getElementById('data_window_2').style.display=='inline-block') {
                document.getElementById('data_window_2').style.display='none'
                document.getElementById('data_list').style.display='inline-block'
            }
            else {
                document.getElementById('data_window_2').style.display='inline-block'
                document.getElementById('data_list').style.display='none'
            }          
          }
        }
        ]    
    });    

    t.columns( 9 ).visible( false );
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
        var hi = Math.round((screen.height *0.7) * 0.9); 

        document.getElementById('titel').style.left=(width/2-200)+"px";
        var height =  document.getElementById('my-cont').clientHeight;
        //document.getElementById('mytable').style.height= hi +"px";
        rules = document.styleSheets[1].cssRules;
        //i=0;
        //while (rules[i].selectorText != "#viewport0") i++;            
        //rules[i].style.height = (hi -height)+"px";
        
        //var myhi = Math.round((hi-height)/13*100)/100 +"px";
        for(i =0 ; i<13 ; i++) {
              document.getElementById("cc"+i.toString()).style.backgroundColor='hsl('+col(((12-i)-4)/2)+',100%,50%)';
             // document.getElementById("cc"+i.toString()).style.height=myhi;
        }
        //i=0;
        //while (rules[i].selectorText != "#chartContainer") i++;
        //rules[i].style.height = (hi-height)+"px";
        //document.getElementById('viewport0').children[0].style.width="100%";
        //document.getElementById('viewport0').children[0].style.height="100%";
        //document.getElementById('viewport0').children[0].childNodes[0].style.width="100%";
        //document.getElementById('viewport0').children[0].childNodes[0].style.height="100%";
        stages[0].setSize(404,480);
    }
        
   // window.addEventListener('resize', function(event) { sizesing();});
    
    window.onload = function() {
    /* Initialising of variables */
        sizesing ();

        document.getElementById('db_basis').value = "";
        document.getElementById('db_basis').disabled = true;
        document.getElementById('ch_basis').value = "";
        document.getElementById('ch_basis').disabled = true;
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


        
        var apexOptions = {
            series: [ ],
            chart: {
              parentHeightOffset: 0,
              height: '100%',
              width: '100%',
              offsetX: 0,
              type: 'heatmap',
                selection: {
                    enabled: false
               },
              zoom:{
                enabled:false
              },
              toolbar: {
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    },
              }
            },
            legend: {
              show: true,
              fontSize: '12rem',
              showForSingleSeries: true,
              onItemClick: {
                toggleDataSeries: false
              },
              onItemHover: {
                highlightDataSeries: false
              },
            },
            dataLabels: {
              enabled: false
            },
            plotOptions: {
                heatmap: {
                 distributed: false,
                 enableShades: false,
                 shadeIntensity: 0,
                 radius: 0,
                 useFillColorAsStroke: true,
                 colorScale: {
                  ranges:[{
                      from: 4,
                      to: 100,
                      name: '>4MAD',
                      color: 'rgb(255,0,13)'
                    },
                    {
                      from: 3,
                      to: 4,
                      name: '4MAD',
                      color: 'rgb(255,111,0)'
                    },
                    {
                      from: 2,
                      to: 3,
                      name: '3MAD',
                      color: 'rgb(255,238,0)'
                    },
                    {
                      from: 1,
                      to: 2,
                      name: '2MAD',
                      color: 'rgb(221,255,0)'
                    },
                    {
                      from: -1,
                      to: 1,
                      name: '±MAD',
                      color: 'rgb(128,255,0)'
                    },
                    {
                      from: -2,
                      to: -1,
                      name: '-2MAD',
                      color: 'rgb(0,255,76)'
                    },
                    {
                      from: -3,
                      to: -2,
                      name: '-3MAD',
                      color: 'rgb(0,255,255)'
                    },
                    {
                      from: -4,
                      to: -3,
                      name: '-4MAD',
                      color: 'rgb(0,132,255)'
                    },
                    {
                      from: -100,
                      to: -4,
                      name: '<-4MAD',
                      color: 'rgb(0,4,255)'
                    }]
                }
              }
            },
            markers:{
                size:0
            },
            tooltip:{
                x:{
                    show:true,
                    formatter: function(value) {
                        var val
                        val=" RefRes#: " + value;
                        return val
                    }
                }
            },
            yaxis: {
              title: {
                  style: {
                      fontSize: '0.8rem'
                  },
              },
            },
            xaxis: {
              type: 'category',  
              tooltip: {
                  enabled: false,
              },
              title: {
                  text: "Reference Residue No.",
                  offsetY: -20,
                  style: {
                      fontSize: '0.8rem',
                      fontWeight: 100,
                  }
              },
              crosshairs: {
                    show: true,
                    width: 1.5,
                    opacity: 1, 
                    position: 'front',
                    fill: {
                        type: 'solid',
                        color: '#000000',
                    },
                    stroke: {
                        color: '#000000',
                        width: 0,
                        dashArray: 0
                    }
              },
            },
        };

            mychart = new ApexCharts(document.querySelector("#hm"), apexOptions);
            mychart.render(); 
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
                drawPdb(1);                                
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
       