/*
 CanvasJS HTML5 & JavaScript Charts - v2.3.2 GA - https://canvasjs.com/ 
 Copyright 2018 fenopix

  --------------------- License Information --------------------
 CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
     https://canvasjs.com/license/

---------------------Free for Non-Commercial Use--------------------

For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. 
A credit Link is added to the bottom right of the chart which should be preserved. Refer to the following link for further details on the same.
    http://creativecommons.org/licenses/by-nc/3.0/deed.en_US

*/
/*eslint-disable*/
/*jshint ignore:start*/
(function() {
    function qa(p, m) {
        p.prototype = eb(m.prototype);
        p.prototype.constructor = p;
        p.base = m.prototype
    }

    function eb(p) {
        function m() {}
        m.prototype = p;
        return new m
    }

    function Ya(p, m, D) {
        "millisecond" === D ? p.setMilliseconds(p.getMilliseconds() + 1 * m) : "second" === D ? p.setSeconds(p.getSeconds() + 1 * m) : "minute" === D ? p.setMinutes(p.getMinutes() + 1 * m) : "hour" === D ? p.setHours(p.getHours() + 1 * m) : "day" === D ? p.setDate(p.getDate() + 1 * m) : "week" === D ? p.setDate(p.getDate() + 7 * m) : "month" === D ? p.setMonth(p.getMonth() + 1 * m) : "year" === D && p.setFullYear(p.getFullYear() +
            1 * m);
        return p
    }

    function $(p, m) {
        var D = !1;
        0 > p && (D = !0, p *= -1);
        p = "" + p;
        for (m = m ? m : 1; p.length < m;) p = "0" + p;
        return D ? "-" + p : p
    }

    function Ia(p) {
        if (!p) return p;
        p = p.replace(/^\s\s*/, "");
        for (var m = /\s/, D = p.length; m.test(p.charAt(--D)););
        return p.slice(0, D + 1)
    }

    function Ea(p) {
        p.roundRect = function(p, D, r, v, F, H, y, w) {
            y && (this.fillStyle = y);
            w && (this.strokeStyle = w);
            "undefined" === typeof F && (F = 5);
            this.lineWidth = H;
            this.beginPath();
            this.moveTo(p + F, D);
            this.lineTo(p + r - F, D);
            this.quadraticCurveTo(p + r, D, p + r, D + F);
            this.lineTo(p + r, D + v - F);
            this.quadraticCurveTo(p + r, D + v, p + r - F, D + v);
            this.lineTo(p + F, D + v);
            this.quadraticCurveTo(p, D + v, p, D + v - F);
            this.lineTo(p, D + F);
            this.quadraticCurveTo(p, D, p + F, D);
            this.closePath();
            y && this.fill();
            w && 0 < H && this.stroke()
        }
    }

    function Sa(p, m) {
        return p - m
    }

    function Ta(p, m, D) {
        if (p && m && D) {
            D = D + "." + m;
            var r = "image/" + m;
            p = p.toDataURL(r);
            var v = !1,
                F = document.createElement("a");
            F.download = D;
            F.href = p;
            if ("undefined" !== typeof Blob && new Blob) {
                for (var H = p.replace(/^data:[a-z\/]*;base64,/, ""), H = atob(H), y = new ArrayBuffer(H.length), y = new Uint8Array(y),
                        w = 0; w < H.length; w++) y[w] = H.charCodeAt(w);
                m = new Blob([y.buffer], {
                    type: "image/" + m
                });
                try {
                    window.navigator.msSaveBlob(m, D), v = !0
                } catch (L) {
                    F.dataset.downloadurl = [r, F.download, F.href].join(":"), F.href = window.URL.createObjectURL(m)
                }
            }
            if (!v) try {
                event = document.createEvent("MouseEvents"), event.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), F.dispatchEvent ? F.dispatchEvent(event) : F.fireEvent && F.fireEvent("onclick")
            } catch (E) {
                m = window.open(), m.document.write("<img src='" + p + "'></img><div>Please right click on the image and save it to your device</div>"),
                    m.document.close()
            }
        }
    }

    function N(p) {
        var m = ((p & 16711680) >> 16).toString(16),
            D = ((p & 65280) >> 8).toString(16);
        p = ((p & 255) >> 0).toString(16);
        m = 2 > m.length ? "0" + m : m;
        D = 2 > D.length ? "0" + D : D;
        p = 2 > p.length ? "0" + p : p;
        return "#" + m + D + p
    }

    function fb(p, m) {
        var D = this.length >>> 0,
            r = Number(m) || 0,
            r = 0 > r ? Math.ceil(r) : Math.floor(r);
        for (0 > r && (r += D); r < D; r++)
            if (r in this && this[r] === p) return r;
        return -1
    }

    function v(p) {
        return null === p || "undefined" === typeof p
    }

    function Fa(p) {
        p.indexOf || (p.indexOf = fb);
        return p
    }

    function gb(p) {
        if (U.fSDec) p[ja("`eeDwdouMhrudods")](ja(""),
            function() {
                U._fTWm && U._fTWm(p)
            })
    }

    function Za(p, m, D) {
        D = D || "normal";
        var r = p + "_" + m + "_" + D,
            v = $a[r];
        if (isNaN(v)) {
            try {
                p = "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;font-family:" + p + "; font-size:" + m + "px; font-weight:" + D + ";";
                if (!xa) {
                    var F = document.body;
                    xa = document.createElement("span");
                    xa.innerHTML = "";
                    var H = document.createTextNode("Mpgyi");
                    xa.appendChild(H);
                    F.appendChild(xa)
                }
                xa.style.display = "";
                xa.setAttribute("style", p);
                v = Math.round(xa.offsetHeight);
                xa.style.display = "none"
            } catch (y) {
                v = Math.ceil(1.1 * m)
            }
            v = Math.max(v, m);
            $a[r] = v
        }
        return v
    }

    function R(p, m) {
        var D = [];
        if (D = {
                solid: [],
                shortDash: [3, 1],
                shortDot: [1, 1],
                shortDashDot: [3, 1, 1, 1],
                shortDashDotDot: [3, 1, 1, 1, 1, 1],
                dot: [1, 2],
                dash: [4, 2],
                dashDot: [4, 2, 1, 2],
                longDash: [8, 2],
                longDashDot: [8, 2, 1, 2],
                longDashDotDot: [8, 2, 1, 2, 1, 2]
            }[p || "solid"])
            for (var r = 0; r < D.length; r++) D[r] *= m;
        else D = [];
        return D
    }

    function O(p, m, D, r, v) {
        r = r || [];
        v = v || !1;
        r.push([p, m, D, v]);
        return p.addEventListener ? (p.addEventListener(m, D, v), D) : p.attachEvent ?
            (r = function(m) {
                m = m || window.event;
                m.preventDefault = m.preventDefault || function() {
                    m.returnValue = !1
                };
                m.stopPropagation = m.stopPropagation || function() {
                    m.cancelBubble = !0
                };
                D.call(p, m)
            }, p.attachEvent("on" + m, r), r) : !1
    }

    function ab(p, m, D) {
        p *= W;
        m *= W;
        p = D.getImageData(p, m, 2, 2).data;
        m = !0;
        for (D = 0; 4 > D; D++)
            if (p[D] !== p[D + 4] | p[D] !== p[D + 8] | p[D] !== p[D + 12]) {
                m = !1;
                break
            }
        return m ? p[0] << 16 | p[1] << 8 | p[2] : 0
    }

    function na(p, m, D) {
        return p in m ? m[p] : D[p]
    }

    function Oa(p, m, D) {
        if (r && bb) {
            var v = p.getContext("2d");
            Pa = v.webkitBackingStorePixelRatio ||
                v.mozBackingStorePixelRatio || v.msBackingStorePixelRatio || v.oBackingStorePixelRatio || v.backingStorePixelRatio || 1;
            W = Ua / Pa;
            p.width = m * W;
            p.height = D * W;
            Ua !== Pa && (p.style.width = m + "px", p.style.height = D + "px", v.scale(W, W))
        } else p.width = m, p.height = D
    }

    function hb(p) {
        if (!ib) {
            var m = !1,
                D = !1;
            "undefined" === typeof ra.Chart.creditHref ? (p.creditHref = ja("iuuqr;..b`ow`rkr/bnl."), p.creditText = ja("B`ow`rKR/bnl")) : (m = p.updateOption("creditText"), D = p.updateOption("creditHref"));
            if (p.creditHref && p.creditText) {
                p._creditLink ||
                    (p._creditLink = document.createElement("a"), p._creditLink.setAttribute("class", "canvasjs-chart-credit"), p._creditLink.setAttribute("title", "JavaScript Charts"), p._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:2px;top:" + (p.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:11px;font-family: Calibri, Lucida Grande, Lucida Sans Unicode, Arial, sans-serif"), p._creditLink.setAttribute("tabIndex", -1), p._creditLink.setAttribute("target", "_blank"));
                if (0 === p.renderCount ||
                    m || D) p._creditLink.setAttribute("href", p.creditHref), p._creditLink.innerHTML = p.creditText;
                p._creditLink && p.creditHref && p.creditText ? (p._creditLink.parentElement || p._canvasJSContainer.appendChild(p._creditLink), p._creditLink.style.top = p.height - 14 + "px") : p._creditLink.parentElement && p._canvasJSContainer.removeChild(p._creditLink)
            }
        }
    }

    function ta(p, m) {
        Ja && (this.canvasCount |= 0, window.console.log(++this.canvasCount));
        var D = document.createElement("canvas");
        D.setAttribute("class", "canvasjs-chart-canvas");
        Oa(D,
            p, m);
        r || "undefined" === typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(D);
        return D
    }

    function sa(p, m, D) {
        for (var r in D) m.style[r] = D[r]
    }

    function ua(p, m, D) {
        m.getAttribute("state") || (m.style.backgroundColor = p.toolbar.backgroundColor, m.style.color = p.toolbar.fontColor, m.style.border = "none", sa(p, m, {
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none"
        }));
        m.getAttribute("state") !== D && (m.setAttribute("state", D), m.setAttribute("type", "button"), sa(p, m, {
            padding: "5px 12px",
            cursor: "pointer",
            "float": "left",
            width: "40px",
            height: "25px",
            outline: "0px",
            verticalAlign: "baseline",
            lineHeight: "0"
        }), m.setAttribute("title", p._cultureInfo[D + "Text"]), m.innerHTML = "<img style='height:95%; pointer-events: none;' src='" + jb[D].image + "' alt='" + p._cultureInfo[D + "Text"] + "' />")
    }

    function Qa() {
        for (var p = null, m = 0; m < arguments.length; m++) p = arguments[m], p.style && (p.style.display = "inline")
    }

    function va() {
        for (var p = null, m = 0; m < arguments.length; m++)(p = arguments[m]) && p.style && (p.style.display = "none")
    }

    function V(p, m, D, r, w) {
        this._defaultsKey = p;
        this._themeOptionsKey = m;
        this._index = r;
        this.parent = w;
        this._eventListeners = [];
        p = {};
        this.theme && v(m) && v(r) ? p = v(ya[this.theme]) ? ya.light1 : ya[this.theme] : this.parent && (this.parent.themeOptions && this.parent.themeOptions[m]) && (null === r ? p = this.parent.themeOptions[m] : 0 < this.parent.themeOptions[m].length && (r = Math.min(this.parent.themeOptions[m].length - 1, r), p = this.parent.themeOptions[m][r]));
        this.themeOptions = p;
        this.options = D ? D : {
            _isPlaceholder: !0
        };
        this.setOptions(this.options,
            p)
    }

    function Ga(p, m, r, v, w) {
        "undefined" === typeof w && (w = 0);
        this._padding = w;
        this._x1 = p;
        this._y1 = m;
        this._x2 = r;
        this._y2 = v;
        this._rightOccupied = this._leftOccupied = this._bottomOccupied = this._topOccupied = this._padding
    }

    function ka(p, m) {
        ka.base.constructor.call(this, "TextBlock", null, m, null, null);
        this.ctx = p;
        this._isDirty = !0;
        this._wrappedText = null;
        this._initialize()
    }

    function Va(p, m) {
        Va.base.constructor.call(this, "Toolbar", "toolbar", m, null, p);
        this.chart = p;
        this.canvas = p.canvas;
        this.ctx = this.chart.ctx;
        this.optionsName =
            "toolbar"
    }

    function Aa(p, m) {
        Aa.base.constructor.call(this, "Title", "title", m, null, p);
        this.chart = p;
        this.canvas = p.canvas;
        this.ctx = this.chart.ctx;
        this.optionsName = "title";
        if (v(this.options.margin) && p.options.subtitles)
            for (var r = p.options.subtitles, za = 0; za < r.length; za++)
                if ((v(r[za].horizontalAlign) && "center" === this.horizontalAlign || r[za].horizontalAlign === this.horizontalAlign) && (v(r[za].verticalAlign) && "top" === this.verticalAlign || r[za].verticalAlign === this.verticalAlign) && !r[za].dockInsidePlotArea === !this.dockInsidePlotArea) {
                    this.margin =
                        0;
                    break
                }
                "undefined" === typeof this.options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
        this.height = this.width = null;
        this.bounds = {
            x1: null,
            y1: null,
            x2: null,
            y2: null
        }
    }

    function Ka(p, m, r) {
        Ka.base.constructor.call(this, "Subtitle", "subtitles", m, r, p);
        this.chart = p;
        this.canvas = p.canvas;
        this.ctx = this.chart.ctx;
        this.optionsName = "subtitles";
        this.isOptionsInArray = !0;
        "undefined" === typeof this.options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
        this.height = this.width = null;
        this.bounds = {
            x1: null,
            y1: null,
            x2: null,
            y2: null
        }
    }

    function Wa() {
        this.pool = []
    }

    function La(p) {
        var m;
        p && Ma[p] && (m = Ma[p]);
        La.base.constructor.call(this, "CultureInfo", null, m, null, null)
    }
    var Ja = !1,
        U = {},
        r = !!document.createElement("canvas").getContext,
        ra = {
            Chart: {
                width: 500,
                height: 400,
                zoomEnabled: !1,
                zoomType: "x",
                backgroundColor: "white",
                theme: "light1",
                animationEnabled: !1,
                animationDuration: 1200,
                dataPointWidth: null,
                dataPointMinWidth: null,
                dataPointMaxWidth: null,
                colorSet: "colorSet1",
                culture: "en",
                creditText: "CanvasJS",
                interactivityEnabled: !0,
                exportEnabled: !1,
                exportFileName: "Chart",
                rangeChanging: null,
                rangeChanged: null,
                publicProperties: {
                    title: "readWrite",
                    subtitles: "readWrite",
                    toolbar: "readWrite",
                    toolTip: "readWrite",
                    legend: "readWrite",
                    axisX: "readWrite",
                    axisY: "readWrite",
                    axisX2: "readWrite",
                    axisY2: "readWrite",
                    data: "readWrite",
                    options: "readWrite",
                    bounds: "readOnly",
                    container: "readOnly"
                }
            },
            Title: {
                padding: 0,
                text: null,
                verticalAlign: "top",
                horizontalAlign: "center",
                fontSize: 20,
                fontFamily: "Calibri",
                fontWeight: "normal",
                fontColor: "black",
                fontStyle: "normal",
                borderThickness: 0,
                borderColor: "black",
                cornerRadius: 0,
                backgroundColor: r ? "transparent" : null,
                margin: 5,
                wrap: !0,
                maxWidth: null,
                dockInsidePlotArea: !1,
                publicProperties: {
                    options: "readWrite",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            Subtitle: {
                padding: 0,
                text: null,
                verticalAlign: "top",
                horizontalAlign: "center",
                fontSize: 14,
                fontFamily: "Calibri",
                fontWeight: "normal",
                fontColor: "black",
                fontStyle: "normal",
                borderThickness: 0,
                borderColor: "black",
                cornerRadius: 0,
                backgroundColor: null,
                margin: 2,
                wrap: !0,
                maxWidth: null,
                dockInsidePlotArea: !1,
                publicProperties: {
                    options: "readWrite",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            Toolbar: {
                backgroundColor: "white",
                backgroundColorOnHover: "#2196f3",
                borderColor: "#2196f3",
                borderThickness: 1,
                fontColor: "black",
                fontColorOnHover: "white",
                publicProperties: {
                    options: "readWrite",
                    chart: "readOnly"
                }
            },
            Legend: {
                name: null,
                verticalAlign: "center",
                horizontalAlign: "right",
                fontSize: 14,
                fontFamily: "calibri",
                fontWeight: "normal",
                fontColor: "black",
                fontStyle: "normal",
                cursor: null,
                itemmouseover: null,
                itemmouseout: null,
                itemmousemove: null,
                itemclick: null,
                dockInsidePlotArea: !1,
                reversed: !1,
                backgroundColor: r ? "transparent" : null,
                borderColor: r ? "transparent" : null,
                borderThickness: 0,
                cornerRadius: 0,
                maxWidth: null,
                maxHeight: null,
                markerMargin: null,
                itemMaxWidth: null,
                itemWidth: null,
                itemWrap: !0,
                itemTextFormatter: null,
                publicProperties: {
                    options: "readWrite",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            ToolTip: {
                enabled: !0,
                shared: !1,
                animationEnabled: !0,
                content: null,
                contentFormatter: null,
                reversed: !1,
                backgroundColor: r ? "rgba(255,255,255,.9)" : "rgb(255,255,255)",
                borderColor: null,
                borderThickness: 2,
                cornerRadius: 5,
                fontSize: 14,
                fontColor: "black",
                fontFamily: "Calibri, Arial, Georgia, serif;",
                fontWeight: "normal",
                fontStyle: "italic",
                publicProperties: {
                    options: "readWrite",
                    chart: "readOnly"
                }
            },
            Axis: {
                minimum: null,
                maximum: null,
                viewportMinimum: null,
                viewportMaximum: null,
                interval: null,
                intervalType: null,
                reversed: !1,
                logarithmic: !1,
                logarithmBase: 10,
                title: null,
                titleFontColor: "black",
                titleFontSize: 20,
                titleFontFamily: "arial",
                titleFontWeight: "normal",
                titleFontStyle: "normal",
                titleWrap: !0,
                titleMaxWidth: null,
                titleBackgroundColor: r ? "transparent" : null,
                titleBorderColor: r ? "transparent" : null,
                titleBorderThickness: 0,
                titleCornerRadius: 0,
                labelAngle: 0,
                labelFontFamily: "arial",
                labelFontColor: "black",
                labelFontSize: 12,
                labelFontWeight: "normal",
                labelFontStyle: "normal",
                labelAutoFit: !0,
                labelWrap: !0,
                labelMaxWidth: null,
                labelFormatter: null,
                labelBackgroundColor: r ? "transparent" : null,
                labelBorderColor: r ? "transparent" : null,
                labelBorderThickness: 0,
                labelCornerRadius: 0,
                labelPlacement: "outside",
                prefix: "",
                suffix: "",
                includeZero: !0,
                tickLength: 5,
                tickColor: "black",
                tickThickness: 1,
                lineColor: "black",
                lineThickness: 1,
                lineDashType: "solid",
                gridColor: "A0A0A0",
                gridThickness: 0,
                gridDashType: "solid",
                interlacedColor: r ? "transparent" : null,
                valueFormatString: null,
                margin: 2,
                publicProperties: {
                    options: "readWrite",
                    stripLines: "readWrite",
                    scaleBreaks: "readWrite",
                    crosshair: "readWrite",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            StripLine: {
                value: null,
                startValue: null,
                endValue: null,
                color: "orange",
                opacity: null,
                thickness: 2,
                lineDashType: "solid",
                label: "",
                labelPlacement: "inside",
                labelAlign: "far",
                labelWrap: !0,
                labelMaxWidth: null,
                labelBackgroundColor: null,
                labelBorderColor: r ? "transparent" : null,
                labelBorderThickness: 0,
                labelCornerRadius: 0,
                labelFontFamily: "arial",
                labelFontColor: "orange",
                labelFontSize: 12,
                labelFontWeight: "normal",
                labelFontStyle: "normal",
                labelFormatter: null,
                showOnTop: !1,
                publicProperties: {
                    options: "readWrite",
                    axis: "readOnly",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            ScaleBreaks: {
                autoCalculate: !1,
                collapsibleThreshold: "25%",
                maxNumberOfAutoBreaks: 2,
                spacing: 8,
                type: "straight",
                color: "#FFFFFF",
                fillOpacity: 0.9,
                lineThickness: 2,
                lineColor: "#E16E6E",
                lineDashType: "solid",
                publicProperties: {
                    options: "readWrite",
                    customBreaks: "readWrite",
                    axis: "readOnly",
                    autoBreaks: "readOnly",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            Break: {
                startValue: null,
                endValue: null,
                spacing: 8,
                type: "straight",
                color: "#FFFFFF",
                fillOpacity: 0.9,
                lineThickness: 2,
                lineColor: "#E16E6E",
                lineDashType: "solid",
                publicProperties: {
                    options: "readWrite",
                    scaleBreaks: "readOnly",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            Crosshair: {
                enabled: !1,
                snapToDataPoint: !1,
                color: "grey",
                opacity: null,
                thickness: 2,
                lineDashType: "solid",
                label: "",
                labelWrap: !0,
                labelMaxWidth: null,
                labelBackgroundColor: r ? "grey" : null,
                labelBorderColor: r ? "grey" : null,
                labelBorderThickness: 0,
                labelCornerRadius: 0,
                labelFontFamily: r ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
                labelFontSize: 12,
                labelFontColor: "#fff",
                labelFontWeight: "normal",
                labelFontStyle: "normal",
                labelFormatter: null,
                valueFormatString: null,
                publicProperties: {
                    options: "readWrite",
                    axis: "readOnly",
                    bounds: "readOnly",
                    chart: "readOnly"
                }
            },
            DataSeries: {
                name: null,
                dataPoints: null,
                label: "",
                bevelEnabled: !1,
                highlightEnabled: !0,
                cursor: "default",
                indexLabel: "",
                indexLabelPlacement: "auto",
                indexLabelOrientation: "horizontal",
                indexLabelFontColor: "black",
                indexLabelFontSize: 12,
                indexLabelFontStyle: "normal",
                indexLabelFontFamily: "Arial",
                indexLabelFontWeight: "normal",
                indexLabelBackgroundColor: null,
                indexLabelLineColor: "gray",
                indexLabelLineThickness: 1,
                indexLabelLineDashType: "solid",
                indexLabelMaxWidth: null,
                indexLabelWrap: !0,
                indexLabelFormatter: null,
                lineThickness: 2,
                lineDashType: "solid",
                connectNullData: !1,
                nullDataLineDashType: "dash",
                color: null,
                lineColor: null,
                risingColor: "white",
                fallingColor: "red",
                fillOpacity: null,
                startAngle: 0,
                radius: null,
                innerRadius: null,
                neckHeight: null,
                neckWidth: null,
                reversed: !1,
                valueRepresents: null,
                linkedDataSeriesIndex: null,
                whiskerThickness: 2,
                whiskerDashType: "solid",
                whiskerColor: null,
                whiskerLength: null,
                stemThickness: 2,
                stemColor: null,
                stemDashType: "solid",
                upperBoxColor: "white",
                lowerBoxColor: "white",
                type: "column",
                xValueType: "number",
                axisXType: "primary",
                axisYType: "primary",
                axisXIndex: 0,
                axisYIndex: 0,
                xValueFormatString: null,
                yValueFormatString: null,
                zValueFormatString: null,
                percentFormatString: null,
                showInLegend: null,
                legendMarkerType: null,
                legendMarkerColor: null,
                legendText: null,
                legendMarkerBorderColor: r ? "transparent" : null,
                legendMarkerBorderThickness: 0,
                markerType: "circle",
                markerColor: null,
                markerSize: null,
                markerBorderColor: r ? "transparent" : null,
                markerBorderThickness: 0,
                mouseover: null,
                mouseout: null,
                mousemove: null,
                click: null,
                toolTipContent: null,
                visible: !0,
                publicProperties: {
                    options: "readWrite",
                    axisX: "readWrite",
                    axisY: "readWrite",
                    chart: "readOnly"
                }
            },
            TextBlock: {
                x: 0,
                y: 0,
                width: null,
                height: null,
                maxWidth: null,
                maxHeight: null,
                padding: 0,
                angle: 0,
                text: "",
                horizontalAlign: "center",
                fontSize: 12,
                fontFamily: "calibri",
                fontWeight: "normal",
                fontColor: "black",
                fontStyle: "normal",
                borderThickness: 0,
                borderColor: "black",
                cornerRadius: 0,
                backgroundColor: null,
                textBaseline: "top"
            },
            CultureInfo: {
                decimalSeparator: ".",
                digitGroupSeparator: ",",
                zoomText: "Zoom",
                panText: "Pan",
                resetText: "Reset",
                menuText: "More Options",
                saveJPGText: "Save as JPEG",
                savePNGText: "Save as PNG",
                printText: "Print",
                days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                shortDays: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
            }
        },
        Ma = {
            en: {}
        },
        w = r ? "Trebuchet MS, Helvetica, sans-serif" : "Arial",
        Ha = r ? "Impact, Charcoal, sans-serif" : "Arial",
        Ba = {
            colorSet1: "#4F81BC #C0504E #9BBB58 #23BFAA #8064A1 #4AACC5 #F79647 #7F6084 #77A033 #33558B #E59566".split(" "),
            colorSet2: "#6D78AD #51CDA0 #DF7970 #4C9CA0 #AE7D99 #C9D45C #5592AD #DF874D #52BCA8 #8E7AA3 #E3CB64 #C77B85 #C39762 #8DD17E #B57952 #FCC26C".split(" "),
            colorSet3: "#8CA1BC #36845C #017E82 #8CB9D0 #708C98 #94838D #F08891 #0366A7 #008276 #EE7757 #E5BA3A #F2990B #03557B #782970".split(" ")
        },
        I, fa, Q, ha, ga;
    fa = "#333333";
    Q = "#000000";
    I = "#666666";
    ga = ha = "#000000";
    var X = 20,
        E = 14,
        Xa = {
            colorSet: "colorSet1",
            backgroundColor: "#FFFFFF",
            title: {
                fontFamily: Ha,
                fontSize: 32,
                fontColor: fa,
                fontWeight: "normal",
                verticalAlign: "top",
                margin: 5
            },
            subtitles: [{
                fontFamily: Ha,
                fontSize: E,
                fontColor: fa,
                fontWeight: "normal",
                verticalAlign: "top",
                margin: 5
            }],
            data: [{
                indexLabelFontFamily: w,
                indexLabelFontSize: E,
                indexLabelFontColor: fa,
                indexLabelFontWeight: "normal",
                indexLabelLineThickness: 1
            }],
            axisX: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: fa,
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: Q,
                labelFontWeight: "normal",
                lineThickness: 1,
                lineColor: I,
                tickThickness: 1,
                tickColor: I,
                gridThickness: 0,
                gridColor: I,
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FF7300",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FF7300",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: ga,
                    color: ha,
                    thickness: 1,
                    lineDashType: "dash"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            axisX2: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: fa,
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: Q,
                labelFontWeight: "normal",
                lineThickness: 1,
                lineColor: I,
                tickThickness: 1,
                tickColor: I,
                gridThickness: 0,
                gridColor: I,
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FF7300",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FF7300",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: ga,
                    color: ha,
                    thickness: 1,
                    lineDashType: "dash"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            axisY: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: fa,
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: Q,
                labelFontWeight: "normal",
                lineThickness: 1,
                lineColor: I,
                tickThickness: 1,
                tickColor: I,
                gridThickness: 1,
                gridColor: I,
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FF7300",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FF7300",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: ga,
                    color: ha,
                    thickness: 1,
                    lineDashType: "dash"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            axisY2: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: fa,
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: Q,
                labelFontWeight: "normal",
                lineThickness: 1,
                lineColor: I,
                tickThickness: 1,
                tickColor: I,
                gridThickness: 1,
                gridColor: I,
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FF7300",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FF7300",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: ga,
                    color: ha,
                    thickness: 1,
                    lineDashType: "dash"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            legend: {
                fontFamily: w,
                fontSize: 14,
                fontColor: fa,
                fontWeight: "bold",
                verticalAlign: "bottom",
                horizontalAlign: "center"
            },
            toolTip: {
                fontFamily: w,
                fontSize: 14,
                fontStyle: "normal",
                cornerRadius: 0,
                borderThickness: 1
            }
        };
    Q = fa = "#F5F5F5";
    I = "#FFFFFF";
    ha = "#40BAF1";
    ga = "#F5F5F5";
    var X = 20,
        E = 14,
        cb = {
            colorSet: "colorSet2",
            title: {
                fontFamily: w,
                fontSize: 33,
                fontColor: "#3A3A3A",
                fontWeight: "bold",
                verticalAlign: "top",
                margin: 5
            },
            subtitles: [{
                fontFamily: w,
                fontSize: E,
                fontColor: "#3A3A3A",
                fontWeight: "normal",
                verticalAlign: "top",
                margin: 5
            }],
            data: [{
                indexLabelFontFamily: w,
                indexLabelFontSize: E,
                indexLabelFontColor: "#666666",
                indexLabelFontWeight: "normal",
                indexLabelLineThickness: 1
            }],
            axisX: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: "#666666",
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#666666",
                labelFontWeight: "normal",
                lineThickness: 1,
                lineColor: "#BBBBBB",
                tickThickness: 1,
                tickColor: "#BBBBBB",
                gridThickness: 1,
                gridColor: "#BBBBBB",
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FFA500",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FFA500",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: "black",
                    color: "black",
                    thickness: 1,
                    lineDashType: "dot"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            axisX2: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: "#666666",
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#666666",
                labelFontWeight: "normal",
                lineThickness: 1,
                lineColor: "#BBBBBB",
                tickColor: "#BBBBBB",
                tickThickness: 1,
                gridThickness: 1,
                gridColor: "#BBBBBB",
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FFA500",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FFA500",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: "black",
                    color: "black",
                    thickness: 1,
                    lineDashType: "dot"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            axisY: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: "#666666",
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#666666",
                labelFontWeight: "normal",
                lineThickness: 0,
                lineColor: "#BBBBBB",
                tickColor: "#BBBBBB",
                tickThickness: 1,
                gridThickness: 1,
                gridColor: "#BBBBBB",
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FFA500",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FFA500",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: "black",
                    color: "black",
                    thickness: 1,
                    lineDashType: "dot"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            axisY2: [{
                titleFontFamily: w,
                titleFontSize: X,
                titleFontColor: "#666666",
                titleFontWeight: "normal",
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#666666",
                labelFontWeight: "normal",
                lineThickness: 0,
                lineColor: "#BBBBBB",
                tickColor: "#BBBBBB",
                tickThickness: 1,
                gridThickness: 1,
                gridColor: "#BBBBBB",
                stripLines: [{
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#FFA500",
                    labelFontWeight: "normal",
                    labelBackgroundColor: null,
                    color: "#FFA500",
                    thickness: 1
                }],
                crosshair: {
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: "#EEEEEE",
                    labelFontWeight: "normal",
                    labelBackgroundColor: "black",
                    color: "black",
                    thickness: 1,
                    lineDashType: "dot"
                },
                scaleBreaks: {
                    type: "zigzag",
                    spacing: "2%",
                    lineColor: "#BBBBBB",
                    lineThickness: 1,
                    lineDashType: "solid"
                }
            }],
            legend: {
                fontFamily: w,
                fontSize: 14,
                fontColor: "#3A3A3A",
                fontWeight: "bold",
                verticalAlign: "bottom",
                horizontalAlign: "center"
            },
            toolTip: {
                fontFamily: w,
                fontSize: 14,
                fontStyle: "normal",
                cornerRadius: 0,
                borderThickness: 1
            }
        };
    Q = fa = "#F5F5F5";
    I = "#FFFFFF";
    ha = "#40BAF1";
    ga = "#F5F5F5";
    X = 20;
    E = 14;
    Ha = {
        colorSet: "colorSet12",
        backgroundColor: "#2A2A2A",
        title: {
            fontFamily: Ha,
            fontSize: 32,
            fontColor: fa,
            fontWeight: "normal",
            verticalAlign: "top",
            margin: 5
        },
        subtitles: [{
            fontFamily: Ha,
            fontSize: E,
            fontColor: fa,
            fontWeight: "normal",
            verticalAlign: "top",
            margin: 5
        }],
        toolbar: {
            backgroundColor: "#666666",
            backgroundColorOnHover: "#FF7372",
            borderColor: "#FF7372",
            borderThickness: 1,
            fontColor: "#F5F5F5",
            fontColorOnHover: "#F5F5F5"
        },
        data: [{
            indexLabelFontFamily: w,
            indexLabelFontSize: E,
            indexLabelFontColor: Q,
            indexLabelFontWeight: "normal",
            indexLabelLineThickness: 1
        }],
        axisX: [{
            titleFontFamily: w,
            titleFontSize: X,
            titleFontColor: Q,
            titleFontWeight: "normal",
            labelFontFamily: w,
            labelFontSize: E,
            labelFontColor: Q,
            labelFontWeight: "normal",
            lineThickness: 1,
            lineColor: I,
            tickThickness: 1,
            tickColor: I,
            gridThickness: 0,
            gridColor: I,
            stripLines: [{
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#FF7300",
                labelFontWeight: "normal",
                labelBackgroundColor: null,
                color: "#FF7300",
                thickness: 1
            }],
            crosshair: {
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#000000",
                labelFontWeight: "normal",
                labelBackgroundColor: ga,
                color: ha,
                thickness: 1,
                lineDashType: "dash"
            },
            scaleBreaks: {
                type: "zigzag",
                spacing: "2%",
                lineColor: "#777777",
                lineThickness: 1,
                lineDashType: "solid",
                color: "#111111"
            }
        }],
        axisX2: [{
            titleFontFamily: w,
            titleFontSize: X,
            titleFontColor: Q,
            titleFontWeight: "normal",
            labelFontFamily: w,
            labelFontSize: E,
            labelFontColor: Q,
            labelFontWeight: "normal",
            lineThickness: 1,
            lineColor: I,
            tickThickness: 1,
            tickColor: I,
            gridThickness: 0,
            gridColor: I,
            stripLines: [{
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#FF7300",
                labelFontWeight: "normal",
                labelBackgroundColor: null,
                color: "#FF7300",
                thickness: 1
            }],
            crosshair: {
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#000000",
                labelFontWeight: "normal",
                labelBackgroundColor: ga,
                color: ha,
                thickness: 1,
                lineDashType: "dash"
            },
            scaleBreaks: {
                type: "zigzag",
                spacing: "2%",
                lineColor: "#777777",
                lineThickness: 1,
                lineDashType: "solid",
                color: "#111111"
            }
        }],
        axisY: [{
            titleFontFamily: w,
            titleFontSize: X,
            titleFontColor: Q,
            titleFontWeight: "normal",
            labelFontFamily: w,
            labelFontSize: E,
            labelFontColor: Q,
            labelFontWeight: "normal",
            lineThickness: 1,
            lineColor: I,
            tickThickness: 1,
            tickColor: I,
            gridThickness: 1,
            gridColor: I,
            stripLines: [{
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#FF7300",
                labelFontWeight: "normal",
                labelBackgroundColor: null,
                color: "#FF7300",
                thickness: 1
            }],
            crosshair: {
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#000000",
                labelFontWeight: "normal",
                labelBackgroundColor: ga,
                color: ha,
                thickness: 1,
                lineDashType: "dash"
            },
            scaleBreaks: {
                type: "zigzag",
                spacing: "2%",
                lineColor: "#777777",
                lineThickness: 1,
                lineDashType: "solid",
                color: "#111111"
            }
        }],
        axisY2: [{
            titleFontFamily: w,
            titleFontSize: X,
            titleFontColor: Q,
            titleFontWeight: "normal",
            labelFontFamily: w,
            labelFontSize: E,
            labelFontColor: Q,
            labelFontWeight: "normal",
            lineThickness: 1,
            lineColor: I,
            tickThickness: 1,
            tickColor: I,
            gridThickness: 1,
            gridColor: I,
            stripLines: [{
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#FF7300",
                labelFontWeight: "normal",
                labelBackgroundColor: null,
                color: "#FF7300",
                thickness: 1
            }],
            crosshair: {
                labelFontFamily: w,
                labelFontSize: E,
                labelFontColor: "#000000",
                labelFontWeight: "normal",
                labelBackgroundColor: ga,
                color: ha,
                thickness: 1,
                lineDashType: "dash"
            },
            scaleBreaks: {
                type: "zigzag",
                spacing: "2%",
                lineColor: "#777777",
                lineThickness: 1,
                lineDashType: "solid",
                color: "#111111"
            }
        }],
        legend: {
            fontFamily: w,
            fontSize: 14,
            fontColor: fa,
            fontWeight: "bold",
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        toolTip: {
            fontFamily: w,
            fontSize: 14,
            fontStyle: "normal",
            cornerRadius: 0,
            borderThickness: 1,
            fontColor: Q,
            backgroundColor: "rgba(0, 0, 0, .7)"
        }
    };
    I = "#FFFFFF";
    Q = fa = "#FAFAFA";
    ha = "#40BAF1";
    ga = "#F5F5F5";
    var X = 20,
        E = 14,
        ya = {
            light1: Xa,
            light2: cb,
            dark1: Ha,
            dark2: {
                colorSet: "colorSet2",
                backgroundColor: "#32373A",
                title: {
                    fontFamily: w,
                    fontSize: 32,
                    fontColor: fa,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    margin: 5
                },
                subtitles: [{
                    fontFamily: w,
                    fontSize: E,
                    fontColor: fa,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    margin: 5
                }],
                toolbar: {
                    backgroundColor: "#666666",
                    backgroundColorOnHover: "#FF7372",
                    borderColor: "#FF7372",
                    borderThickness: 1,
                    fontColor: "#F5F5F5",
                    fontColorOnHover: "#F5F5F5"
                },
                data: [{
                    indexLabelFontFamily: w,
                    indexLabelFontSize: E,
                    indexLabelFontColor: Q,
                    indexLabelFontWeight: "normal",
                    indexLabelLineThickness: 1
                }],
                axisX: [{
                    titleFontFamily: w,
                    titleFontSize: X,
                    titleFontColor: Q,
                    titleFontWeight: "normal",
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: Q,
                    labelFontWeight: "normal",
                    lineThickness: 1,
                    lineColor: I,
                    tickThickness: 1,
                    tickColor: I,
                    gridThickness: 0,
                    gridColor: I,
                    stripLines: [{
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#FF7300",
                        labelFontWeight: "normal",
                        labelBackgroundColor: null,
                        color: "#FF7300",
                        thickness: 1
                    }],
                    crosshair: {
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#000000",
                        labelFontWeight: "normal",
                        labelBackgroundColor: ga,
                        color: ha,
                        thickness: 1,
                        lineDashType: "dash"
                    },
                    scaleBreaks: {
                        type: "zigzag",
                        spacing: "2%",
                        lineColor: "#777777",
                        lineThickness: 1,
                        lineDashType: "solid",
                        color: "#111111"
                    }
                }],
                axisX2: [{
                    titleFontFamily: w,
                    titleFontSize: X,
                    titleFontColor: Q,
                    titleFontWeight: "normal",
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: Q,
                    labelFontWeight: "normal",
                    lineThickness: 1,
                    lineColor: I,
                    tickThickness: 1,
                    tickColor: I,
                    gridThickness: 0,
                    gridColor: I,
                    stripLines: [{
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#FF7300",
                        labelFontWeight: "normal",
                        labelBackgroundColor: null,
                        color: "#FF7300",
                        thickness: 1
                    }],
                    crosshair: {
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#000000",
                        labelFontWeight: "normal",
                        labelBackgroundColor: ga,
                        color: ha,
                        thickness: 1,
                        lineDashType: "dash"
                    },
                    scaleBreaks: {
                        type: "zigzag",
                        spacing: "2%",
                        lineColor: "#777777",
                        lineThickness: 1,
                        lineDashType: "solid",
                        color: "#111111"
                    }
                }],
                axisY: [{
                    titleFontFamily: w,
                    titleFontSize: X,
                    titleFontColor: Q,
                    titleFontWeight: "normal",
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: Q,
                    labelFontWeight: "normal",
                    lineThickness: 0,
                    lineColor: I,
                    tickThickness: 1,
                    tickColor: I,
                    gridThickness: 1,
                    gridColor: I,
                    stripLines: [{
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#FF7300",
                        labelFontWeight: "normal",
                        labelBackgroundColor: null,
                        color: "#FF7300",
                        thickness: 1
                    }],
                    crosshair: {
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#000000",
                        labelFontWeight: "normal",
                        labelBackgroundColor: ga,
                        color: ha,
                        thickness: 1,
                        lineDashType: "dash"
                    },
                    scaleBreaks: {
                        type: "zigzag",
                        spacing: "2%",
                        lineColor: "#777777",
                        lineThickness: 1,
                        lineDashType: "solid",
                        color: "#111111"
                    }
                }],
                axisY2: [{
                    titleFontFamily: w,
                    titleFontSize: X,
                    titleFontColor: Q,
                    titleFontWeight: "normal",
                    labelFontFamily: w,
                    labelFontSize: E,
                    labelFontColor: Q,
                    labelFontWeight: "normal",
                    lineThickness: 0,
                    lineColor: I,
                    tickThickness: 1,
                    tickColor: I,
                    gridThickness: 1,
                    gridColor: I,
                    stripLines: [{
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#FF7300",
                        labelFontWeight: "normal",
                        labelBackgroundColor: null,
                        color: "#FF7300",
                        thickness: 1
                    }],
                    crosshair: {
                        labelFontFamily: w,
                        labelFontSize: E,
                        labelFontColor: "#000000",
                        labelFontWeight: "normal",
                        labelBackgroundColor: ga,
                        color: ha,
                        thickness: 1,
                        lineDashType: "dash"
                    },
                    scaleBreaks: {
                        type: "zigzag",
                        spacing: "2%",
                        lineColor: "#777777",
                        lineThickness: 1,
                        lineDashType: "solid",
                        color: "#111111"
                    }
                }],
                legend: {
                    fontFamily: w,
                    fontSize: 14,
                    fontColor: fa,
                    fontWeight: "bold",
                    verticalAlign: "bottom",
                    horizontalAlign: "center"
                },
                toolTip: {
                    fontFamily: w,
                    fontSize: 14,
                    fontStyle: "normal",
                    cornerRadius: 0,
                    borderThickness: 1,
                    fontColor: Q,
                    backgroundColor: "rgba(0, 0, 0, .7)"
                }
            },
            theme1: Xa,
            theme2: cb,
            theme3: Xa
        },
        S = {
            numberDuration: 1,
            yearDuration: 314496E5,
            monthDuration: 2592E6,
            weekDuration: 6048E5,
            dayDuration: 864E5,
            hourDuration: 36E5,
            minuteDuration: 6E4,
            secondDuration: 1E3,
            millisecondDuration: 1,
            dayOfWeekFromInt: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
        };
    (function() {
        U.fSDec = function(p) {
            for (var m = "", r = 0; r < p.length; r++) m += String.fromCharCode(p[r] - 111);
            return m
        };
        U.str = {
            ncv: [189, 222, 221, 156, 178, 222, 220, 220, 212, 225, 210, 216, 208, 219, 143, 197, 212, 225, 226, 216, 222, 221],
            fntStr: [223, 231, 143, 178, 208, 219, 216, 209, 225, 216,
                155, 143, 187, 228, 210, 216, 211, 208, 143, 182, 225, 208, 221, 211, 212, 155, 143, 187, 228, 210, 216, 211, 208, 143, 194, 208, 221, 226, 143, 196, 221, 216, 210, 222, 211, 212, 155, 143, 176, 225, 216, 208, 219, 155, 143, 226, 208, 221, 226, 156, 226, 212, 225, 216, 213
            ],
            tBl: [227, 212, 231, 227, 177, 208, 226, 212, 219, 216, 221, 212],
            fnt: [213, 222, 221, 227],
            fSy: [213, 216, 219, 219, 194, 227, 232, 219, 212],
            fTx: [213, 216, 219, 219, 195, 212, 231, 227],
            gr: [214, 225, 212, 232],
            ct: [210, 227, 231],
            tp: [227, 222, 223]
        };
        delete ra[U.fSDec([178, 215, 208, 225, 227])][U.fSDec([210, 225, 212, 211, 216,
            227, 183, 225, 212, 213
        ])];
        U.pro = {
            sCH: ra[U.fSDec([178, 215, 208, 225, 227])][U.fSDec([210, 225, 212, 211, 216, 227, 183, 225, 212, 213])]
        };
        U._fTWm = function(p) {
            if ("undefined" === typeof U.pro.sCH && !db) {
                var m = p[U.fSDec(U.str.ct)];
                m[U.fSDec(U.str.tBl)] = U.fSDec(U.str.tp);
                m[U.fSDec(U.str.fnt)] = 11 + U.fSDec(U.str.fntStr);
                m[U.fSDec(U.str.fSy)] = U.fSDec(U.str.gr);
                m[U.fSDec(U.str.fTx)](U.fSDec(U.str.ncv), 2, p.height - 11 - 2)
            }
        }
    })();
    var $a = {},
        xa = null,
        kb = function() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.backgroundColor &&
                (this.ctx.fillStyle = this.backgroundColor, this.ctx.fillRect(0, 0, this.width, this.height))
        },
        lb = function(p, m, r) {
            m = Math.min(this.width, this.height);
            return Math.max("theme4" === this.theme ? 0 : 300 <= m ? 12 : 10, Math.round(m * (p / 400)))
        },
        Ca = function() {
            var p = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g,
                m = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                r = "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                v = "January February March April May June July August September October November December".split(" "),
                w = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                F = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                H = /[^-+\dA-Z]/g;
            return function(y, E, L) {
                var R = L ? L.days : m,
                    I = L ? L.months : v,
                    N = L ? L.shortDays : r,
                    O = L ? L.shortMonths : w;
                L = "";
                var S = !1;
                y = y && y.getTime ? y : y ? new Date(y) : new Date;
                if (isNaN(y)) throw SyntaxError("invalid date");
                "UTC:" === E.slice(0, 4) && (E = E.slice(4), S = !0);
                L = S ? "getUTC" : "get";
                var U = y[L + "Date"](),
                    V = y[L + "Day"](),
                    M = y[L + "Month"](),
                    Q = y[L + "FullYear"](),
                    a = y[L + "Hours"](),
                    d = y[L + "Minutes"](),
                    b = y[L + "Seconds"](),
                    c = y[L + "Milliseconds"](),
                    e = S ? 0 : y.getTimezoneOffset();
                return L = E.replace(p, function(g) {
                    switch (g) {
                        case "D":
                            return U;
                        case "DD":
                            return $(U, 2);
                        case "DDD":
                            return N[V];
                        case "DDDD":
                            return R[V];
                        case "M":
                            return M + 1;
                        case "MM":
                            return $(M + 1, 2);
                        case "MMM":
                            return O[M];
                        case "MMMM":
                            return I[M];
                        case "Y":
                            return parseInt(String(Q).slice(-2));
                        case "YY":
                            return $(String(Q).slice(-2), 2);
                        case "YYY":
                            return $(String(Q).slice(-3), 3);
                        case "YYYY":
                            return $(Q,
                                4);
                        case "h":
                            return a % 12 || 12;
                        case "hh":
                            return $(a % 12 || 12, 2);
                        case "H":
                            return a;
                        case "HH":
                            return $(a, 2);
                        case "m":
                            return d;
                        case "mm":
                            return $(d, 2);
                        case "s":
                            return b;
                        case "ss":
                            return $(b, 2);
                        case "f":
                            return String(c).slice(0, 1);
                        case "ff":
                            return $(String(c).slice(0, 2), 2);
                        case "fff":
                            return $(String(c).slice(0, 3), 3);
                        case "t":
                            return 12 > a ? "a" : "p";
                        case "tt":
                            return 12 > a ? "am" : "pm";
                        case "T":
                            return 12 > a ? "A" : "P";
                        case "TT":
                            return 12 > a ? "AM" : "PM";
                        case "K":
                            return S ? "UTC" : (String(y).match(F) || [""]).pop().replace(H, "");
                        case "z":
                            return (0 < e ? "-" : "+") + Math.floor(Math.abs(e) / 60);
                        case "zz":
                            return (0 < e ? "-" : "+") + $(Math.floor(Math.abs(e) / 60), 2);
                        case "zzz":
                            return (0 < e ? "-" : "+") + $(Math.floor(Math.abs(e) / 60), 2) + $(Math.abs(e) % 60, 2);
                        default:
                            return g.slice(1, g.length - 1)
                    }
                })
            }
        }(),
        ba = function(p, m, r) {
            if (null === p) return "";
            if (!isFinite(p)) return p;
            p = Number(p);
            var v = 0 > p ? !0 : !1;
            v && (p *= -1);
            var w = r ? r.decimalSeparator : ".",
                F = r ? r.digitGroupSeparator : ",",
                H = "";
            m = String(m);
            var H = 1,
                y = r = "",
                E = -1,
                L = [],
                R = [],
                I = 0,
                N = 0,
                S = 0,
                O = !1,
                U = 0,
                y = m.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|\u2030|./g);
            m = null;
            for (var Q = 0; y && Q < y.length; Q++)
                if (m = y[Q], "." === m && 0 > E) E = Q;
                else {
                    if ("%" === m) H *= 100;
                    else if ("\u2030" === m) {
                        H *= 1E3;
                        continue
                    } else if ("," === m[0] && "." === m[m.length - 1]) {
                        H /= Math.pow(1E3, m.length - 1);
                        E = Q + m.length - 1;
                        continue
                    } else "E" !== m[0] && "e" !== m[0] || "0" !== m[m.length - 1] || (O = !0);
                    0 > E ? (L.push(m), "#" === m || "0" === m ? I++ : "," === m && S++) : (R.push(m), "#" !== m && "0" !== m || N++)
                }
            O && (m = Math.floor(p), y = -Math.floor(Math.log(p) / Math.LN10 + 1), U = 0 === p ? 0 : 0 === m ? -(I + y) : String(m).length - I, H /= Math.pow(10, U));
            0 > E && (E = Q);
            H = (p * H).toFixed(N);
            m = H.split(".");
            H = (m[0] + "").split("");
            p = (m[1] + "").split("");
            H && "0" === H[0] && H.shift();
            for (O = y = Q = N = E = 0; 0 < L.length;)
                if (m = L.pop(), "#" === m || "0" === m)
                    if (E++, E === I) {
                        var M = H,
                            H = [];
                        if ("0" === m)
                            for (m = I - N - (M ? M.length : 0); 0 < m;) M.unshift("0"), m--;
                        for (; 0 < M.length;) r = M.pop() + r, O++, 0 === O % y && (Q === S && 0 < M.length) && (r = F + r)
                    } else 0 < H.length ? (r = H.pop() + r, N++, O++) : "0" === m && (r = "0" + r, N++, O++), 0 === O % y && (Q === S && 0 < H.length) && (r = F + r);
            else "E" !== m[0] && "e" !== m[0] || "0" !== m[m.length - 1] || !/[eE][+-]*[0]+/.test(m) ? "," === m ? (Q++, y = O, O = 0, 0 < H.length &&
                (r = F + r)) : r = 1 < m.length && ('"' === m[0] && '"' === m[m.length - 1] || "'" === m[0] && "'" === m[m.length - 1]) ? m.slice(1, m.length - 1) + r : m + r : (m = 0 > U ? m.replace("+", "").replace("-", "") : m.replace("-", ""), r += m.replace(/[0]+/, function(p) {
                return $(U, p.length)
            }));
            F = "";
            for (L = !1; 0 < R.length;) m = R.shift(), "#" === m || "0" === m ? 0 < p.length && 0 !== Number(p.join("")) ? (F += p.shift(), L = !0) : "0" === m && (F += "0", L = !0) : 1 < m.length && ('"' === m[0] && '"' === m[m.length - 1] || "'" === m[0] && "'" === m[m.length - 1]) ? F += m.slice(1, m.length - 1) : "E" !== m[0] && "e" !== m[0] || "0" !== m[m.length -
                1] || !/[eE][+-]*[0]+/.test(m) ? F += m : (m = 0 > U ? m.replace("+", "").replace("-", "") : m.replace("-", ""), F += m.replace(/[0]+/, function(p) {
                return $(U, p.length)
            }));
            r += (L ? w : "") + F;
            return v ? "-" + r : r
        },
        Ra = function(p) {
            var m = 0,
                r = 0;
            p = p || window.event;
            p.offsetX || 0 === p.offsetX ? (m = p.offsetX, r = p.offsetY) : p.layerX || 0 == p.layerX ? (m = p.layerX, r = p.layerY) : (m = p.pageX - p.target.offsetLeft, r = p.pageY - p.target.offsetTop);
            return {
                x: m,
                y: r
            }
        },
        bb = !0,
        Ua = window.devicePixelRatio || 1,
        Pa = 1,
        W = bb ? Ua / Pa : 1,
        ea = function(p, m, r, v, w, F, H, y, E, L, R, N, O) {
            "undefined" ===
            typeof O && (O = 1);
            H = H || 0;
            y = y || "black";
            var I = 15 < v - m && 15 < w - r ? 8 : 0.35 * Math.min(v - m, w - r);
            p.beginPath();
            p.moveTo(m, r);
            p.save();
            p.fillStyle = F;
            p.globalAlpha = O;
            p.fillRect(m, r, v - m, w - r);
            p.globalAlpha = 1;
            0 < H && (O = 0 === H % 2 ? 0 : 0.5, p.beginPath(), p.lineWidth = H, p.strokeStyle = y, p.moveTo(m, r), p.rect(m - O, r - O, v - m + 2 * O, w - r + 2 * O), p.stroke());
            p.restore();
            !0 === E && (p.save(), p.beginPath(), p.moveTo(m, r), p.lineTo(m + I, r + I), p.lineTo(v - I, r + I), p.lineTo(v, r), p.closePath(), H = p.createLinearGradient((v + m) / 2, r + I, (v + m) / 2, r), H.addColorStop(0, F),
                H.addColorStop(1, "rgba(255, 255, 255, .4)"), p.fillStyle = H, p.fill(), p.restore());
            !0 === L && (p.save(), p.beginPath(), p.moveTo(m, w), p.lineTo(m + I, w - I), p.lineTo(v - I, w - I), p.lineTo(v, w), p.closePath(), H = p.createLinearGradient((v + m) / 2, w - I, (v + m) / 2, w), H.addColorStop(0, F), H.addColorStop(1, "rgba(255, 255, 255, .4)"), p.fillStyle = H, p.fill(), p.restore());
            !0 === R && (p.save(), p.beginPath(), p.moveTo(m, r), p.lineTo(m + I, r + I), p.lineTo(m + I, w - I), p.lineTo(m, w), p.closePath(), H = p.createLinearGradient(m + I, (w + r) / 2, m, (w + r) / 2), H.addColorStop(0,
                F), H.addColorStop(1, "rgba(255, 255, 255, 0.1)"), p.fillStyle = H, p.fill(), p.restore());
            !0 === N && (p.save(), p.beginPath(), p.moveTo(v, r), p.lineTo(v - I, r + I), p.lineTo(v - I, w - I), p.lineTo(v, w), H = p.createLinearGradient(v - I, (w + r) / 2, v, (w + r) / 2), H.addColorStop(0, F), H.addColorStop(1, "rgba(255, 255, 255, 0.1)"), p.fillStyle = H, H.addColorStop(0, F), H.addColorStop(1, "rgba(255, 255, 255, 0.1)"), p.fillStyle = H, p.fill(), p.closePath(), p.restore())
        },
        ja = function(p) {
            for (var m = "", r = 0; r < p.length; r++) m += String.fromCharCode(Math.ceil(p.length /
                57 / 5) ^ p.charCodeAt(r));
            return m
        },
        db = window && window[ja("mnb`uhno")] && window[ja("mnb`uhno")].href && window[ja("mnb`uhno")].href.indexOf && (-1 !== window[ja("mnb`uhno")].href.indexOf(ja("b`ow`rkr/bnl")) || -1 !== window[ja("mnb`uhno")].href.indexOf(ja("gdonqhy/bnl")) || -1 !== window[ja("mnb`uhno")].href.indexOf(ja("gheemd"))),
        ib = db && -1 === window[ja("mnb`uhno")].href.indexOf(ja("gheemd")),
        jb = {
            reset: {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPjSURBVFhHxVdJaFNRFP1J/jwkP5MxsbaC1WJEglSxOFAXIsFpVRE3ggi1K90obioRRBA33XXnQnciirhQcMCdorgQxBkXWlREkFKsWkv5npvckp/XnzRpKh64kLw733fffe9L/wrL0+mVUdO8uTSZ3MBL/we2qg4rkuSpodCELstXE46ziVkLQ6FQcGOmeSSq6wd4aV50d3drWjj8kQKZJTUc9kxFGenv79dZrDksTSTWWJp2QYtEPiErysyzdX0LsxsCQR8keX8gs6RHIk8ysdgKFg2G53mhuOPsshTlBjKaFo1g7SqLNoShKLdFXT8huQ/paLSbxatYnc2mHMM4hr18Vi8TIvCmXF3vYrW6cF23gGTOk0M1wA4RKvOmq6vLZRVJipvmSWT6tZ6CSEYkco5V50VPT4+D7RwOqi6RiSZm0fJ+vggSqkeoypdsNmuyelNwbXsbgvkWYMtzDWNvWaijoyOBqE+hVK8abcssUeXQ/YfKyi0gFYv1Ipgfoj34fYGTJLOYJA0ODirok32GLN8XhUWCwSes1hIwBg6LydJ/tEeRRapAdUp+wSAiZchtZZWWgAZ+JNpD8peYXQVK9UwUxNpzOK8pq97kURZhYTCKBwPD7h2zK+js7Myi7D8Fod+0TkMI8+EMAngLGc/WtBFWawkFHFnoj/t9KLgGmF0B3QfkxC+EarxkdhnFYlFLY06USqUwL7UMjICHfh/wOc2sCqhpxGbCkLvL7EUDbF73+6DkmVWB6zi7xUDQSLeYvWjAILvm9zEnkJhlbRcDQZcv6Kg2AipyT/Axw6wKlqVSqxDdjF8Izfod13qURdrG/nxehY+xGh+h0CSzKygGvSNQIcc097BI24jb9hax6kj2E7OrMFX1il+ICEf2NrPbhiXLl+fYl+U7zK4iYdsDcyLGf+ofFlkwcN+s10KhmpuYhhtm0hCLVIFL0MDsqNlDIqy9x2CLs1jL6OvrI7vPRbtohXG6eFmsFnHDGAp6n9AgyuVySRZrGvROxRgIfLXhzjrNYnNBUxNX/dMgRWT1mt4XLDovaApD53E9W3ilNX5M55LJHpRtIsgAvciR4WWcgK2Dvb1YqgXevmF8z2zEBTcKG39EfSKsT9EbhVUaI2FZO+oZIqImxol6j66/hcAu4sSN4vc1ZPoKeoE6RGhYL2YYA+ymOSSi0Z0wWntbtkGUWCvfSDXIxONraZ/FY90KUfNTpfC5spnNLgxoYNnR9RO4F8ofXEHOgogCQE99w+fF2Xw+b7O59rEOsyRqGEfpVoaDMQQ1CZrG46bcM6AZ0C/wPqNfHliqejyTySxh9TqQpL+xmbIlkB9SlAAAAABJRU5ErkJggg=="
            },
            pan: {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAICSURBVEhLxZbPahNRGMUn/5MpuAiBEAIufQGfzr5E40YptBXajYzudCEuGqS+gGlrFwquDGRTutBdYfydzJ3LzeQmJGZue+Dw/Z17Mnfmu5Pof9Hr9Z61Wq0bWZMKj263O6xWq99wU9lOpzPMKgEhEcRucNOcioOK+0RzBhNvt9tPV4nmVF19+OWhVqt9xXgFXZq+8lCv119UKpUJ7iX2FmvFTKz8RH34YdBsNk8wVtjE4fGYwm8wrrDi3WBG5oKXZGRSS9hGuNFojLTe2lFz5xThWZIktayyiE2FdT3rzXBXz7krKiL8c17wAKFDjCus2AvW+YGZ9y2JF0VFRuMPfI//rsCE/C+s26s4gQu9ul7r4NteKx7H8XOC724xNNGbaNu++IrBqbOV7Tj3FgMRvc/YKOr3+3sE47wgEt/Bl/gaK5cHbNU11vYSXylfpK7XOvjuumPp4Wcoipu30Qsez2uMXYz4lfI+mOmwothY+SLiXJy7mKVpWs3Si0CoOMfeI9Od43Wic+jO+ZVv+crsm9QSNhUW9LXSeoPBYLXopthGuFQgdIxxhY+UDwlt1x5CZ1hX+NTUdt/OIvjKaDSmuOJfaIVNPKX+W18j/PLA2/kR44p5Sd8HbHngT/yTfNRWUXX14ZcL3wmX0+TLf8YO7CGT8yFE5zB3/gney25/OETRP9CtPDFe5jShAAAAAElFTkSuQmCC"
            },
            zoom: {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALWSURBVEhLvZZLaBNRFIabyftBIgEfqCCBoCC6MYqiXYiIj4U76U4X7sUHbhQhUBfixhZEUBDB16YuFERaUaQLK7ooCOJj4UKtYEFU0EptShO/A9Ph3js3k8lo/eHnP7n3nP/M3LlzMz1hkUwmNziOcyKRSFyFt+LxeD/c2Wq1Ym7Kv0M2m11Os1OxWGycn1OwZXCGuXfwIhezkd9/jRgNT2L4ldhs1pbkX5OLJe4euVxuGQaPCa3mnUjtJx7BDuKusJTCV6jVVGHTMuYRjxma7yIOhTgFY6jNaAKew2xPKpVay9ganmkvj+M448/MfJdT5K5Gg4HJacRngPFgqVRaRNwW1B4i7yehWfsEDdz1K+A01AoxPIqGAiuwGfkOTY8+1A6u7AyiFTB2Hu0KPIrdiOnzHLWDybeImvy+Wq2mZa5bUHsD0Zpz+KxHdWQymV6kAb1ElqeORgJLvgnRdj1+R1AfzkIvSUjxVjQSarVakrueIPT8+H1F5jSUy+WXiJrUYBVWyVxU4PEU8TzhfaijUqnMIWrjaY492eWRwdKOIqrnIxnXwLLeRLwk2GQzrEMjg0avEbXxkIxr4OoOImpj2QwyFgms1koa/SZUG8s+0iGnEhNfCNXEhzIXBVz0McTzEvJ+70P9oNFtxEzei3aFYrFYxmuSUPWSv9Yi9IMm2xE1We56Mp1OV4nDwqFmBDV9gk9AEh4gZtFHNt8W4kAUCoXF5MorY9Z/kDni9nDv7hc0i2fhgLvTtX8a99PoMPPagTFPxofRzmDJ9yM+AyEmTfgGysYbQcfhDzPPJDmX0c7gDg4gs9BqFIWhm/Nct5H8gtBq1I7UfIbtvmIuoaGQcp+fdpbbSM43eEH5wrwLbXmhm/fU63VHXjcuok7hEByFY/AeHGC8L5/PL3HT5xGH1uYwfPOICGo+CBcU0vwO1BqzUqILDl/z/9VYIMfpddiAc47jDP8BsUpb13wOLRwAAAAASUVORK5CYII="
            },
            menu: {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADoSURBVFhH7dc9CsJAFATgRxIIBCwCqZKATX5sbawsY2MvWOtF9AB6AU8gguAJbD2AnZ2VXQT/Ko2TYGCL2OYtYQc+BuYA+1hCtnCVwMm27SGaXpDJIAiCvCkVR05hGOZNN3HkFMdx3nQRR06+76/R1IcFLJlNQEWlmWlBTwJtKLKHynehZqnjOGM0PYWRVXk61C37p7xlZ3Hk5HneCk1dmMH811xGoKLSzDiQwIBZB4ocoPJdqNkDt2yKlueWRVGUtzy3rPwo3sWRU3nLjuLI6OO67oZM00wMw3hrmpZx0XU9syxrR0T0BeMpb9dneSR2AAAAAElFTkSuQmCC"
            },
            handle: {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAXNSR0IArs4c6QAAAAZiS0dEANAAzwDP4Z7KegAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sHGw0cMqdt1UwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAaElEQVQoz+3SsRFAQBCF4Z9WJM8KCDVwownl6YXsTmCUsyKGkZzcl7zkz3YLkypgAnreFmDEpHkIwVOMfpdi9CEEN2nGpFdwD03yEqDtOgCaun7sqSTDH32I1pQA2Pb9sZecAxc5r3IAb21d6878xsAAAAAASUVORK5CYII="
            }
        };
    V.prototype.setOptions = function(p, m) {
        if (ra[this._defaultsKey]) {
            var r = ra[this._defaultsKey],
                v;
            for (v in r) "publicProperties" !==
                v && r.hasOwnProperty(v) && (this[v] = p && v in p ? p[v] : m && v in m ? m[v] : r[v])
        } else Ja && window.console && console.log("defaults not set")
    };
    V.prototype.get = function(p) {
        var m = ra[this._defaultsKey];
        if ("options" === p) return this.options && this.options._isPlaceholder ? null : this.options;
        if (m.hasOwnProperty(p) || m.publicProperties && m.publicProperties.hasOwnProperty(p)) return this[p];
        window.console && window.console.log('Property "' + p + "\" doesn't exist. Please check for typo.")
    };
    V.prototype.set = function(p, m, r) {
        r = "undefined" ===
            typeof r ? !0 : r;
        var v = ra[this._defaultsKey];
        if ("options" === p) this.createUserOptions(m);
        else if (v.hasOwnProperty(p) || v.publicProperties && v.publicProperties.hasOwnProperty(p) && "readWrite" === v.publicProperties[p]) this.options._isPlaceholder && this.createUserOptions(), this.options[p] = m;
        else {
            window.console && (v.publicProperties && v.publicProperties.hasOwnProperty(p) && "readOnly" === v.publicProperties[p] ? window.console.log('Property "' + p + '" is read-only.') : window.console.log('Property "' + p + "\" doesn't exist. Please check for typo."));
            return
        }
        r && (this.stockChart || this.chart || this).render()
    };
    V.prototype.addTo = function(p, m, r, v) {
        v = "undefined" === typeof v ? !0 : v;
        var w = ra[this._defaultsKey];
        w.hasOwnProperty(p) || w.publicProperties && w.publicProperties.hasOwnProperty(p) && "readWrite" === w.publicProperties[p] ? (this.options._isPlaceholder && this.createUserOptions(), "undefined" === typeof this.options[p] && (this.options[p] = []), p = this.options[p], r = "undefined" === typeof r || null === r ? p.length : r, p.splice(r, 0, m), v && (this.chart || this).render()) : window.console &&
            (w.publicProperties && w.publicProperties.hasOwnProperty(p) && "readOnly" === w.publicProperties[p] ? window.console.log('Property "' + p + '" is read-only.') : window.console.log('Property "' + p + "\" doesn't exist. Please check for typo."))
    };
    V.prototype.createUserOptions = function(p) {
        if ("undefined" !== typeof p || this.options._isPlaceholder)
            if (this.parent.options._isPlaceholder && this.parent.createUserOptions(), this.isOptionsInArray) {
                this.parent.options[this.optionsName] || (this.parent.options[this.optionsName] = []);
                var m =
                    this.parent.options[this.optionsName],
                    r = m.length;
                this.options._isPlaceholder || (Fa(m), r = m.indexOf(this.options));
                this.options = "undefined" === typeof p ? {} : p;
                m[r] = this.options
            } else this.options = "undefined" === typeof p ? {} : p, p = this.parent.options, this.optionsName ? m = this.optionsName : (m = this._defaultsKey) && 0 !== m.length ? (r = m.charAt(0).toLowerCase(), 1 < m.length && (r = r.concat(m.slice(1))), m = r) : m = void 0, p[m] = this.options
    };
    V.prototype.remove = function(p) {
        p = "undefined" === typeof p ? !0 : p;
        if (this.isOptionsInArray) {
            var m =
                this.parent.options[this.optionsName];
            Fa(m);
            var r = m.indexOf(this.options);
            0 <= r && m.splice(r, 1)
        } else delete this.parent.options[this.optionsName];
        p && (this.chart || this).render()
    };
    V.prototype.updateOption = function(p) {
        !ra[this._defaultsKey] && (Ja && window.console) && console.log("defaults not set");
        var m = ra[this._defaultsKey],
            r = {},
            w = this[p],
            E = this._themeOptionsKey,
            F = this._index;
        this.theme && v(E) && v(F) ? r = v(ya[this.theme]) ? ya.light1 : ya[this.theme] : this.parent && (this.parent.themeOptions && this.parent.themeOptions[E]) &&
            (null === F ? r = this.parent.themeOptions[E] : 0 < this.parent.themeOptions[E].length && (r = Math.min(this.parent.themeOptions[E].length - 1, F), r = this.parent.themeOptions[E][r]));
        this.themeOptions = r;
        p in m && (w = p in this.options ? this.options[p] : r && p in r ? r[p] : m[p]);
        if (w === this[p]) return !1;
        this[p] = w;
        return !0
    };
    V.prototype.trackChanges = function(p) {
        if (!this.sessionVariables) throw "Session Variable Store not set";
        this.sessionVariables[p] = this.options[p]
    };
    V.prototype.isBeingTracked = function(p) {
        this.options._oldOptions ||
            (this.options._oldOptions = {});
        return this.options._oldOptions[p] ? !0 : !1
    };
    V.prototype.hasOptionChanged = function(p) {
        if (!this.sessionVariables) throw "Session Variable Store not set";
        return this.sessionVariables[p] !== this.options[p]
    };
    V.prototype.addEventListener = function(p, m, r) {
        p && m && (this._eventListeners[p] = this._eventListeners[p] || [], this._eventListeners[p].push({
            context: r || this,
            eventHandler: m
        }))
    };
    V.prototype.removeEventListener = function(p, m) {
        if (p && m && this._eventListeners[p])
            for (var r = this._eventListeners[p],
                    v = 0; v < r.length; v++)
                if (r[v].eventHandler === m) {
                    r[v].splice(v, 1);
                    break
                }
    };
    V.prototype.removeAllEventListeners = function() {
        this._eventListeners = []
    };
    V.prototype.dispatchEvent = function(p, m, r) {
        if (p && this._eventListeners[p]) {
            m = m || {};
            for (var v = this._eventListeners[p], w = 0; w < v.length; w++) v[w].eventHandler.call(v[w].context, m)
        }
        "function" === typeof this[p] && this[p].call(r || this.chart, m)
    };
    Ga.prototype.registerSpace = function(p, m) {
        "top" === p ? this._topOccupied += m.height : "bottom" === p ? this._bottomOccupied += m.height : "left" ===
            p ? this._leftOccupied += m.width : "right" === p && (this._rightOccupied += m.width)
    };
    Ga.prototype.unRegisterSpace = function(p, m) {
        "top" === p ? this._topOccupied -= m.height : "bottom" === p ? this._bottomOccupied -= m.height : "left" === p ? this._leftOccupied -= m.width : "right" === p && (this._rightOccupied -= m.width)
    };
    Ga.prototype.getFreeSpace = function() {
        return {
            x1: this._x1 + this._leftOccupied,
            y1: this._y1 + this._topOccupied,
            x2: this._x2 - this._rightOccupied,
            y2: this._y2 - this._bottomOccupied,
            width: this._x2 - this._x1 - this._rightOccupied - this._leftOccupied,
            height: this._y2 - this._y1 - this._bottomOccupied - this._topOccupied
        }
    };
    Ga.prototype.reset = function() {
        this._rightOccupied = this._leftOccupied = this._bottomOccupied = this._topOccupied = this._padding
    };
    qa(ka, V);
    ka.prototype._initialize = function() {
        v(this.padding) || "object" !== typeof this.padding ? this.topPadding = this.rightPadding = this.bottomPadding = this.leftPadding = Number(this.padding) | 0 : (this.topPadding = v(this.padding.top) ? 0 : Number(this.padding.top) | 0, this.rightPadding = v(this.padding.right) ? 0 : Number(this.padding.right) |
            0, this.bottomPadding = v(this.padding.bottom) ? 0 : Number(this.padding.bottom) | 0, this.leftPadding = v(this.padding.left) ? 0 : Number(this.padding.left) | 0)
    };
    ka.prototype.render = function(p) {
        if (0 !== this.fontSize) {
            p && this.ctx.save();
            var m = this.ctx.font;
            this.ctx.textBaseline = this.textBaseline;
            var r = 0;
            this._isDirty && this.measureText(this.ctx);
            this.ctx.translate(this.x, this.y + r);
            "middle" === this.textBaseline && (r = -this._lineHeight / 2);
            this.ctx.font = this._getFontString();
            this.ctx.rotate(Math.PI / 180 * this.angle);
            var v =
                0,
                w = this.topPadding,
                F = null;
            this.ctx.roundRect || Ea(this.ctx);
            (0 < this.borderThickness && this.borderColor || this.backgroundColor) && this.ctx.roundRect(0, r, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);
            this.ctx.fillStyle = this.fontColor;
            for (r = 0; r < this._wrappedText.lines.length; r++) F = this._wrappedText.lines[r], "right" === this.horizontalAlign ? v = (this.width - (this.leftPadding + this.rightPadding)) / 2 - F.width / 2 + this.leftPadding : "left" === this.horizontalAlign ? v =
                this.leftPadding : "center" === this.horizontalAlign && (v = (this.width - (this.leftPadding + this.rightPadding)) / 2 - F.width / 2 + this.leftPadding), this.ctx.fillText(F.text, v, w), w += F.height;
            this.ctx.font = m;
            p && this.ctx.restore()
        }
    };
    ka.prototype.setText = function(p) {
        this.text = p;
        this._isDirty = !0;
        this._wrappedText = null
    };
    ka.prototype.measureText = function() {
        this._lineHeight = Za(this.fontFamily, this.fontSize, this.fontWeight);
        if (null === this.maxWidth) throw "Please set maxWidth and height for TextBlock";
        this._wrapText(this.ctx);
        this._isDirty = !1;
        return {
            width: this.width,
            height: this.height
        }
    };
    ka.prototype._getLineWithWidth = function(p, m, r) {
        p = String(p);
        if (!p) return {
            text: "",
            width: 0
        };
        var v = r = 0,
            w = p.length - 1,
            F = Infinity;
        for (this.ctx.font = this._getFontString(); v <= w;) {
            var F = Math.floor((v + w) / 2),
                H = p.substr(0, F + 1);
            r = this.ctx.measureText(H).width;
            if (r < m) v = F + 1;
            else if (r > m) w = F - 1;
            else break
        }
        r > m && 1 < H.length && (H = H.substr(0, H.length - 1), r = this.ctx.measureText(H).width);
        m = !0;
        if (H.length === p.length || " " === p[H.length]) m = !1;
        m && (p = H.split(" "), 1 < p.length &&
            p.pop(), H = p.join(" "), r = this.ctx.measureText(H).width);
        return {
            text: H,
            width: r
        }
    };
    ka.prototype._wrapText = function() {
        var p = new String(Ia(String(this.text))),
            m = [],
            r = this.ctx.font,
            v = 0,
            w = 0;
        this.ctx.font = this._getFontString();
        if (0 === this.frontSize) w = v = 0;
        else
            for (; 0 < p.length;) {
                var F = this.maxHeight - (this.topPadding + this.bottomPadding),
                    H = this._getLineWithWidth(p, this.maxWidth - (this.leftPadding + this.rightPadding), !1);
                H.height = this._lineHeight;
                m.push(H);
                var y = w,
                    w = Math.max(w, H.width),
                    v = v + H.height,
                    p = Ia(p.slice(H.text.length,
                        p.length));
                F && v > F && (H = m.pop(), v -= H.height, w = y)
            }
        this._wrappedText = {
            lines: m,
            width: w,
            height: v
        };
        this.width = w + (this.leftPadding + this.rightPadding);
        this.height = v + (this.topPadding + this.bottomPadding);
        this.ctx.font = r
    };
    ka.prototype._getFontString = function() {
        var p;
        p = "" + (this.fontStyle ? this.fontStyle + " " : "");
        p += this.fontWeight ? this.fontWeight + " " : "";
        p += this.fontSize ? this.fontSize + "px " : "";
        var m = this.fontFamily ? this.fontFamily + "" : "";
        !r && m && (m = m.split(",")[0], "'" !== m[0] && '"' !== m[0] && (m = "'" + m + "'"));
        return p += m
    };
    qa(Va, V);
    qa(Aa, V);
    Aa.prototype.setLayout = function() {
        if (this.text) {
            var p = this.dockInsidePlotArea ? this.chart.plotArea : this.chart,
                m = p.layoutManager.getFreeSpace(),
                r = m.x1,
                w = m.y1,
                E = 0,
                F = 0,
                H = this.chart._menuButton && this.chart.exportEnabled && "top" === this.verticalAlign ? 22 : 0,
                y, I;
            "top" === this.verticalAlign || "bottom" === this.verticalAlign ? (null === this.maxWidth && (this.maxWidth = m.width - 4 - H * ("center" === this.horizontalAlign ? 2 : 1)), F = 0.5 * m.height - this.margin - 2, E = 0) : "center" === this.verticalAlign && ("left" === this.horizontalAlign ||
                "right" === this.horizontalAlign ? (null === this.maxWidth && (this.maxWidth = m.height - 4), F = 0.5 * m.width - this.margin - 2) : "center" === this.horizontalAlign && (null === this.maxWidth && (this.maxWidth = m.width - 4), F = 0.5 * m.height - 4));
            var L;
            v(this.padding) || "number" !== typeof this.padding ? v(this.padding) || "object" !== typeof this.padding || (L = this.padding.top ? this.padding.top : this.padding.bottom ? this.padding.bottom : 0, L += this.padding.bottom ? this.padding.bottom : this.padding.top ? this.padding.top : 0, L *= 1.25) : L = 2.5 * this.padding;
            this.wrap ||
                (F = Math.min(F, Math.max(1.5 * this.fontSize, this.fontSize + L)));
            F = new ka(this.ctx, {
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                fontColor: this.fontColor,
                fontStyle: this.fontStyle,
                fontWeight: this.fontWeight,
                horizontalAlign: this.horizontalAlign,
                verticalAlign: this.verticalAlign,
                borderColor: this.borderColor,
                borderThickness: this.borderThickness,
                backgroundColor: this.backgroundColor,
                maxWidth: this.maxWidth,
                maxHeight: F,
                cornerRadius: this.cornerRadius,
                text: this.text,
                padding: this.padding,
                textBaseline: "top"
            });
            L = F.measureText();
            "top" === this.verticalAlign || "bottom" === this.verticalAlign ? ("top" === this.verticalAlign ? (w = m.y1 + 2, I = "top") : "bottom" === this.verticalAlign && (w = m.y2 - 2 - L.height, I = "bottom"), "left" === this.horizontalAlign ? r = m.x1 + 2 : "center" === this.horizontalAlign ? r = m.x1 + m.width / 2 - L.width / 2 : "right" === this.horizontalAlign && (r = m.x2 - 2 - L.width - H), y = this.horizontalAlign, this.width = L.width, this.height = L.height) : "center" === this.verticalAlign && ("left" === this.horizontalAlign ? (r = m.x1 + 2, w = m.y2 - 2 - (this.maxWidth / 2 - L.width /
                2), E = -90, I = "left", this.width = L.height, this.height = L.width) : "right" === this.horizontalAlign ? (r = m.x2 - 2, w = m.y1 + 2 + (this.maxWidth / 2 - L.width / 2), E = 90, I = "right", this.width = L.height, this.height = L.width) : "center" === this.horizontalAlign && (w = p.y1 + (p.height / 2 - L.height / 2), r = p.x1 + (p.width / 2 - L.width / 2), I = "center", this.width = L.width, this.height = L.height), y = "center");
            F.x = r;
            F.y = w;
            F.angle = E;
            F.horizontalAlign = y;
            this._textBlock = F;
            p.layoutManager.registerSpace(I, {
                width: this.width + ("left" === I || "right" === I ? this.margin + 2 : 0),
                height: this.height + ("top" === I || "bottom" === I ? this.margin + 2 : 0)
            });
            this.bounds = {
                x1: r,
                y1: w,
                x2: r + this.width,
                y2: w + this.height
            };
            this.ctx.textBaseline = "top"
        }
    };
    Aa.prototype.render = function() {
        this._textBlock && this._textBlock.render(!0)
    };
    qa(Ka, V);
    Ka.prototype.setLayout = Aa.prototype.setLayout;
    Ka.prototype.render = Aa.prototype.render;
    Wa.prototype.get = function(p, m) {
        var r = null;
        0 < this.pool.length ? (r = this.pool.pop(), Oa(r, p, m)) : r = ta(p, m);
        return r
    };
    Wa.prototype.release = function(p) {
        this.pool.push(p)
    };
    qa(La, V);
    var Na = {
        addTheme: function(p,
            m) {
            ya[p] = m
        },
        addColorSet: function(p, m) {
            Ba[p] = m
        },
        addCultureInfo: function(p, m) {
            Ma[p] = m
        },
        formatNumber: function(p, m, r) {
            r = r || "en";
            if (Ma[r]) return ba(p, m || "#,##0.##", new La(r));
            throw "Unknown Culture Name";
        },
        formatDate: function(p, m, r) {
            r = r || "en";
            if (Ma[r]) return Ca(p, m || "DD MMM YYYY", new La(r));
            throw "Unknown Culture Name";
        }
    };
    "undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports = Na : "function" === typeof define && define.amd ? define([], function() {
        return Na
    }) : window.CanvasJS = Na;
    Na.Chart = function() {
        function p(a,
            d) {
            return a.x - d.x
        }

        function m(a, d) {
            d = d || {};
            this.theme = v(d.theme) || v(ya[d.theme]) ? "light1" : d.theme;
            m.base.constructor.call(this, "Chart", null, d, null, null);
            var b = this;
            this._containerId = a;
            this._objectsInitialized = !1;
            this.overlaidCanvasCtx = this.ctx = null;
            this._indexLabels = [];
            this._panTimerId = 0;
            this._lastTouchEventType = "";
            this._lastTouchData = null;
            this.isAnimating = !1;
            this.renderCount = 0;
            this.disableToolTip = this.animatedRender = !1;
            this.canvasPool = new Wa;
            this.allDOMEventHandlers = [];
            this.panEnabled = !1;
            this._defaultCursor =
                "default";
            this.plotArea = {
                canvas: null,
                ctx: null,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                width: 0,
                height: 0
            };
            this._dataInRenderedOrder = [];
            if (this.container = "string" === typeof this._containerId ? document.getElementById(this._containerId) : this._containerId) {
                this.container.innerHTML = "";
                var c = 0,
                    e = 0,
                    c = this.options.width ? this.width : 0 < this.container.clientWidth ? this.container.clientWidth : this.width,
                    e = this.options.height ? this.height : 0 < this.container.clientHeight ? this.container.clientHeight : this.height;
                this.width = c;
                this.height = e;
                this.x1 =
                    this.y1 = 0;
                this.x2 = this.width;
                this.y2 = this.height;
                this._selectedColorSet = "undefined" !== typeof Ba[this.colorSet] ? Ba[this.colorSet] : Ba.colorSet1;
                this._canvasJSContainer = document.createElement("div");
                this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container");
                this._canvasJSContainer.style.position = "relative";
                this._canvasJSContainer.style.textAlign = "left";
                this._canvasJSContainer.style.cursor = "auto";
                r || (this._canvasJSContainer.style.height = "0px");
                this.container.appendChild(this._canvasJSContainer);
                this.canvas = ta(c, e);
                this._preRenderCanvas = ta(c, e);
                this.canvas.style.position = "absolute";
                this.canvas.style.WebkitUserSelect = "none";
                this.canvas.style.MozUserSelect = "none";
                this.canvas.style.msUserSelect = "none";
                this.canvas.style.userSelect = "none";
                this.canvas.getContext && (this._canvasJSContainer.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.ctx.textBaseline = "top", Ea(this.ctx), this._preRenderCtx = this._preRenderCanvas.getContext("2d"), this._preRenderCtx.textBaseline = "top", Ea(this._preRenderCtx),
                    r ? this.plotArea.ctx = this.ctx : (this.plotArea.canvas = ta(c, e), this.plotArea.canvas.style.position = "absolute", this.plotArea.canvas.setAttribute("class", "plotAreaCanvas"), this._canvasJSContainer.appendChild(this.plotArea.canvas), this.plotArea.ctx = this.plotArea.canvas.getContext("2d")), this.overlaidCanvas = ta(c, e), this.overlaidCanvas.style.position = "absolute", this.overlaidCanvas.style.webkitTapHighlightColor = "transparent", this.overlaidCanvas.style.WebkitUserSelect = "none", this.overlaidCanvas.style.MozUserSelect =
                    "none", this.overlaidCanvas.style.msUserSelect = "none", this.overlaidCanvas.style.userSelect = "none", this.overlaidCanvas.getContext && (this._canvasJSContainer.appendChild(this.overlaidCanvas), this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d"), this.overlaidCanvasCtx.textBaseline = "top", Ea(this.overlaidCanvasCtx)), this._eventManager = new ha(this), this.windowResizeHandler = O(window, "resize", function() {
                        b._updateSize() && b.render()
                    }, this.allDOMEventHandlers), this._toolBar = document.createElement("div"),
                    this._toolBar.setAttribute("class", "canvasjs-chart-toolbar"), this._toolBar.style.cssText = "position: absolute; right: 1px; top: 1px;", this._canvasJSContainer.appendChild(this._toolBar), this.bounds = {
                        x1: 0,
                        y1: 0,
                        x2: this.width,
                        y2: this.height
                    }, O(this.overlaidCanvas, "click", function(a) {
                        b._mouseEventHandler(a)
                    }, this.allDOMEventHandlers), O(this.overlaidCanvas, "mousemove", function(a) {
                        b._mouseEventHandler(a)
                    }, this.allDOMEventHandlers), O(this.overlaidCanvas, "mouseup", function(a) {
                        b._mouseEventHandler(a)
                    }, this.allDOMEventHandlers),
                    O(this.overlaidCanvas, "mousedown", function(a) {
                        b._mouseEventHandler(a);
                        va(b._dropdownMenu)
                    }, this.allDOMEventHandlers), O(this.overlaidCanvas, "mouseout", function(a) {
                        b._mouseEventHandler(a)
                    }, this.allDOMEventHandlers), O(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function(a) {
                        b._touchEventHandler(a)
                    }, this.allDOMEventHandlers), O(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove", function(a) {
                        b._touchEventHandler(a)
                    }, this.allDOMEventHandlers),
                    O(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend", function(a) {
                        b._touchEventHandler(a)
                    }, this.allDOMEventHandlers), O(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : "touchcancel", function(a) {
                        b._touchEventHandler(a)
                    }, this.allDOMEventHandlers), this.toolTip = new $(this, this.options.toolTip), this.data = null, this.axisX = [], this.axisX2 = [], this.axisY = [], this.axisY2 = [], this.sessionVariables = {
                        axisX: [],
                        axisX2: [],
                        axisY: [],
                        axisY2: []
                    })
            } else window.console && window.console.log('CanvasJS Error: Chart Container with id "' +
                this._containerId + '" was not found')
        }

        function w(a, d) {
            for (var b = [], c, e = 0; e < a.length; e++)
                if (0 == e) b.push(a[0]);
                else {
                    var g, h, k;
                    k = e - 1;
                    g = 0 === k ? 0 : k - 1;
                    h = k === a.length - 1 ? k : k + 1;
                    c = Math.abs((a[h].x - a[g].x) / (0 === a[h].x - a[k].x ? 0.01 : a[h].x - a[k].x)) * (d - 1) / 2 + 1;
                    var t = (a[h].x - a[g].x) / c;
                    c = (a[h].y - a[g].y) / c;
                    b[b.length] = a[k].x > a[g].x && 0 < t || a[k].x < a[g].x && 0 > t ? {
                        x: a[k].x + t / 3,
                        y: a[k].y + c / 3
                    } : {
                        x: a[k].x,
                        y: a[k].y + c / 9
                    };
                    k = e;
                    g = 0 === k ? 0 : k - 1;
                    h = k === a.length - 1 ? k : k + 1;
                    c = Math.abs((a[h].x - a[g].x) / (0 === a[k].x - a[g].x ? 0.01 : a[k].x - a[g].x)) * (d -
                        1) / 2 + 1;
                    t = (a[h].x - a[g].x) / c;
                    c = (a[h].y - a[g].y) / c;
                    b[b.length] = a[k].x > a[g].x && 0 < t || a[k].x < a[g].x && 0 > t ? {
                        x: a[k].x - t / 3,
                        y: a[k].y - c / 3
                    } : {
                        x: a[k].x,
                        y: a[k].y - c / 9
                    };
                    b[b.length] = a[e]
                }
            return b
        }

        function E(a, d, b, c, e, g, h, k, t, l) {
            var u = 0;
            l ? (h.color = g, k.color = g) : l = 1;
            u = t ? Math.abs(e - b) : Math.abs(c - d);
            u = 0 < h.trimLength ? Math.abs(u * h.trimLength / 100) : Math.abs(u - h.length);
            t ? (b += u / 2, e -= u / 2) : (d += u / 2, c -= u / 2);
            var u = 1 === Math.round(h.thickness) % 2 ? 0.5 : 0,
                q = 1 === Math.round(k.thickness) % 2 ? 0.5 : 0;
            a.save();
            a.globalAlpha = l;
            a.strokeStyle = k.color ||
                g;
            a.lineWidth = k.thickness || 2;
            a.setLineDash && a.setLineDash(R(k.dashType, k.thickness));
            a.beginPath();
            t && 0 < k.thickness ? (a.moveTo(c - h.thickness / 2, Math.round((b + e) / 2) - q), a.lineTo(d + h.thickness / 2, Math.round((b + e) / 2) - q)) : 0 < k.thickness && (a.moveTo(Math.round((d + c) / 2) - q, b + h.thickness / 2), a.lineTo(Math.round((d + c) / 2) - q, e - h.thickness / 2));
            a.stroke();
            a.strokeStyle = h.color || g;
            a.lineWidth = h.thickness || 2;
            a.setLineDash && a.setLineDash(R(h.dashType, h.thickness));
            a.beginPath();
            t && 0 < h.thickness ? (a.moveTo(c - u, b), a.lineTo(c -
                u, e), a.moveTo(d + u, b), a.lineTo(d + u, e)) : 0 < h.thickness && (a.moveTo(d, b + u), a.lineTo(c, b + u), a.moveTo(d, e - u), a.lineTo(c, e - u));
            a.stroke();
            a.restore()
        }

        function I(a, d, b, c, e) {
            if (null === a || "undefined" === typeof a) return "undefined" === typeof b ? d : b;
            a = parseFloat(a.toString()) * (0 <= a.toString().indexOf("%") ? d / 100 : 1);
            "undefined" !== typeof c && (a = Math.min(c, a), "undefined" !== typeof e && (a = Math.max(e, a)));
            return !isNaN(a) && a <= d && 0 <= a ? a : "undefined" === typeof b ? d : b
        }

        function F(a, d) {
            F.base.constructor.call(this, "Legend", "legend",
                d, null, a);
            this.chart = a;
            this.canvas = a.canvas;
            this.ctx = this.chart.ctx;
            this.ghostCtx = this.chart._eventManager.ghostCtx;
            this.items = [];
            this.optionsName = "legend";
            this.height = this.width = 0;
            this.orientation = null;
            this.dataSeries = [];
            this.bounds = {
                x1: null,
                y1: null,
                x2: null,
                y2: null
            };
            "undefined" === typeof this.options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
            this.lineHeight = Za(this.fontFamily, this.fontSize, this.fontWeight);
            this.horizontalSpacing = this.fontSize
        }

        function H(a, d, b, c) {
            H.base.constructor.call(this,
                "DataSeries", "data", d, b, a);
            this.chart = a;
            this.canvas = a.canvas;
            this._ctx = a.canvas.ctx;
            this.index = b;
            this.noDataPointsInPlotArea = 0;
            this.id = c;
            this.chart._eventManager.objectMap[c] = {
                id: c,
                objectType: "dataSeries",
                dataSeriesIndex: b
            };
            a = d.dataPoints ? d.dataPoints.length : 0;
            this.dataPointEOs = [];
            for (d = 0; d < a; d++) this.dataPointEOs[d] = {};
            this.dataPointIds = [];
            this.plotUnit = [];
            this.axisY = this.axisX = null;
            this.optionsName = "data";
            this.isOptionsInArray = !0;
            null === this.fillOpacity && (this.type.match(/area/i) ? this.fillOpacity =
                0.7 : this.fillOpacity = 1);
            this.axisPlacement = this.getDefaultAxisPlacement();
            "undefined" === typeof this.options.indexLabelFontSize && (this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize))
        }

        function y(a, d, b, c, e, g) {
            y.base.constructor.call(this, "Axis", d, b, c, a);
            this.chart = a;
            this.canvas = a.canvas;
            this.ctx = a.ctx;
            this.intervalStartPosition = this.maxHeight = this.maxWidth = 0;
            this.labels = [];
            this.dataSeries = [];
            this._stripLineLabels = this._ticks = this._labels = null;
            this.dataInfo = {
                min: Infinity,
                max: -Infinity,
                viewPortMin: Infinity,
                viewPortMax: -Infinity,
                minDiff: Infinity
            };
            this.isOptionsInArray = !0;
            "axisX" === e ? ("left" === g || "bottom" === g ? (this.optionsName = "axisX", v(this.chart.sessionVariables.axisX[c]) && (this.chart.sessionVariables.axisX[c] = {}), this.sessionVariables = this.chart.sessionVariables.axisX[c]) : (this.optionsName = "axisX2", v(this.chart.sessionVariables.axisX2[c]) && (this.chart.sessionVariables.axisX2[c] = {}), this.sessionVariables = this.chart.sessionVariables.axisX2[c]), this.options.interval || (this.intervalType =
                null)) : "left" === g || "bottom" === g ? (this.optionsName = "axisY", v(this.chart.sessionVariables.axisY[c]) && (this.chart.sessionVariables.axisY[c] = {}), this.sessionVariables = this.chart.sessionVariables.axisY[c]) : (this.optionsName = "axisY2", v(this.chart.sessionVariables.axisY2[c]) && (this.chart.sessionVariables.axisY2[c] = {}), this.sessionVariables = this.chart.sessionVariables.axisY2[c]);
            "undefined" === typeof this.options.titleFontSize && (this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize));
            "undefined" ===
            typeof this.options.labelFontSize && (this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize));
            this.type = e;
            "axisX" !== e || b && "undefined" !== typeof b.gridThickness || (this.gridThickness = 0);
            this._position = g;
            this.lineCoordinates = {
                x1: null,
                y1: null,
                x2: null,
                y2: null,
                width: null
            };
            this.labelAngle = (this.labelAngle % 360 + 360) % 360;
            90 < this.labelAngle && 270 > this.labelAngle ? this.labelAngle -= 180 : 270 <= this.labelAngle && 360 >= this.labelAngle && (this.labelAngle -= 360);
            this.options.scaleBreaks && (this.scaleBreaks = new Q(this.chart,
                this.options.scaleBreaks, ++this.chart._eventManager.lastObjectId, this));
            this.stripLines = [];
            if (this.options.stripLines && 0 < this.options.stripLines.length)
                for (a = 0; a < this.options.stripLines.length; a++) this.stripLines.push(new X(this.chart, this.options.stripLines[a], a, ++this.chart._eventManager.lastObjectId, this));
            this.options.crosshair && (this.crosshair = new fa(this.chart, this.options.crosshair, this));
            this._titleTextBlock = null;
            this.hasOptionChanged("viewportMinimum") && null === this.viewportMinimum && (this.options.viewportMinimum =
                void 0, this.sessionVariables.viewportMinimum = null);
            this.hasOptionChanged("viewportMinimum") || isNaN(this.sessionVariables.newViewportMinimum) || null === this.sessionVariables.newViewportMinimum ? this.sessionVariables.newViewportMinimum = null : this.viewportMinimum = this.sessionVariables.newViewportMinimum;
            this.hasOptionChanged("viewportMaximum") && null === this.viewportMaximum && (this.options.viewportMaximum = void 0, this.sessionVariables.viewportMaximum = null);
            this.hasOptionChanged("viewportMaximum") || isNaN(this.sessionVariables.newViewportMaximum) ||
                null === this.sessionVariables.newViewportMaximum ? this.sessionVariables.newViewportMaximum = null : this.viewportMaximum = this.sessionVariables.newViewportMaximum;
            null !== this.minimum && null !== this.viewportMinimum && (this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum));
            null !== this.maximum && null !== this.viewportMaximum && (this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum));
            this.trackChanges("viewportMinimum");
            this.trackChanges("viewportMaximum")
        }

        function Q(a, d, b, c) {
            Q.base.constructor.call(this,
                "ScaleBreaks", "scaleBreaks", d, null, c);
            this.id = b;
            this.chart = a;
            this.ctx = this.chart.ctx;
            this.axis = c;
            this.optionsName = "scaleBreaks";
            this.isOptionsInArray = !1;
            this._appliedBreaks = [];
            this.customBreaks = [];
            this.autoBreaks = [];
            "string" === typeof this.spacing ? (this.spacing = parseFloat(this.spacing), this.spacing = isNaN(this.spacing) ? 8 : (10 < this.spacing ? 10 : this.spacing) + "%") : "number" !== typeof this.spacing && (this.spacing = 8);
            this.autoCalculate && (this.maxNumberOfAutoBreaks = Math.min(this.maxNumberOfAutoBreaks, 5));
            if (this.options.customBreaks &&
                0 < this.options.customBreaks.length) {
                for (a = 0; a < this.options.customBreaks.length; a++) this.customBreaks.push(new L(this.chart, "customBreaks", this.options.customBreaks[a], a, ++this.chart._eventManager.lastObjectId, this)), "number" === typeof this.customBreaks[a].startValue && ("number" === typeof this.customBreaks[a].endValue && this.customBreaks[a].endValue !== this.customBreaks[a].startValue) && this._appliedBreaks.push(this.customBreaks[a]);
                this._appliedBreaks.sort(function(a, c) {
                    return a.startValue - c.startValue
                });
                for (a = 0; a < this._appliedBreaks.length - 1; a++) this._appliedBreaks[a].endValue >= this._appliedBreaks[a + 1].startValue && (this._appliedBreaks[a].endValue = Math.max(this._appliedBreaks[a].endValue, this._appliedBreaks[a + 1].endValue), window.console && window.console.log("CanvasJS Error: Breaks " + a + " and " + (a + 1) + " are overlapping."), this._appliedBreaks.splice(a, 2), a--)
            }
        }

        function L(a, d, b, c, e, g) {
            L.base.constructor.call(this, "Break", d, b, c, g);
            this.id = e;
            this.chart = a;
            this.ctx = this.chart.ctx;
            this.scaleBreaks = g;
            this.optionsName =
                d;
            this.isOptionsInArray = !0;
            this.type = b.type ? this.type : g.type;
            this.fillOpacity = v(b.fillOpacity) ? g.fillOpacity : this.fillOpacity;
            this.lineThickness = v(b.lineThickness) ? g.lineThickness : this.lineThickness;
            this.color = b.color ? this.color : g.color;
            this.lineColor = b.lineColor ? this.lineColor : g.lineColor;
            this.lineDashType = b.lineDashType ? this.lineDashType : g.lineDashType;
            !v(this.startValue) && this.startValue.getTime && (this.startValue = this.startValue.getTime());
            !v(this.endValue) && this.endValue.getTime && (this.endValue =
                this.endValue.getTime());
            "number" === typeof this.startValue && ("number" === typeof this.endValue && this.endValue < this.startValue) && (a = this.startValue, this.startValue = this.endValue, this.endValue = a);
            this.spacing = "undefined" === typeof b.spacing ? g.spacing : b.spacing;
            "string" === typeof this.options.spacing ? (this.spacing = parseFloat(this.spacing), this.spacing = isNaN(this.spacing) ? 0 : (10 < this.spacing ? 10 : this.spacing) + "%") : "number" !== typeof this.options.spacing && (this.spacing = g.spacing);
            this.size = g.parent.logarithmic ?
                1 : 0
        }

        function X(a, d, b, c, e) {
            X.base.constructor.call(this, "StripLine", "stripLines", d, b, e);
            this.id = c;
            this.chart = a;
            this.ctx = this.chart.ctx;
            this.label = this.label;
            this.axis = e;
            this.optionsName = "stripLines";
            this.isOptionsInArray = !0;
            this._thicknessType = "pixel";
            null !== this.startValue && null !== this.endValue && (this.value = e.logarithmic ? Math.sqrt((this.startValue.getTime ? this.startValue.getTime() : this.startValue) * (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) : ((this.startValue.getTime ? this.startValue.getTime() :
                this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2, this._thicknessType = null)
        }

        function fa(a, d, b) {
            fa.base.constructor.call(this, "Crosshair", "crosshair", d, null, b);
            this.chart = a;
            this.ctx = this.chart.ctx;
            this.axis = b;
            this.optionsName = "crosshair";
            this._thicknessType = "pixel"
        }

        function $(a, d) {
            $.base.constructor.call(this, "ToolTip", "toolTip", d, null, a);
            this.chart = a;
            this.canvas = a.canvas;
            this.ctx = this.chart.ctx;
            this.currentDataPointIndex = this.currentSeriesIndex = -1;
            this._prevY = this._prevX =
                NaN;
            this.containerTransitionDuration = 0.1;
            this.mozContainerTransition = this.getContainerTransition(this.containerTransitionDuration);
            this.optionsName = "toolTip";
            this._initialize()
        }

        function ha(a) {
            this.chart = a;
            this.lastObjectId = 0;
            this.objectMap = [];
            this.rectangularRegionEventSubscriptions = [];
            this.previousDataPointEventObject = null;
            this.ghostCanvas = ta(this.chart.width, this.chart.height);
            this.ghostCtx = this.ghostCanvas.getContext("2d");
            this.mouseoveredObjectMaps = []
        }

        function ga(a) {
            this.chart = a;
            this.ctx = this.chart.plotArea.ctx;
            this.animations = [];
            this.animationRequestId = null
        }
        qa(m, V);
        m.prototype.destroy = function() {
            var a = this.allDOMEventHandlers;
            this._animator && this._animator.cancelAllAnimations();
            this._panTimerId && clearTimeout(this._panTimerId);
            for (var d = 0; d < a.length; d++) {
                var b = a[d][0],
                    c = a[d][1],
                    e = a[d][2],
                    g = a[d][3],
                    g = g || !1;
                b.removeEventListener ? b.removeEventListener(c, e, g) : b.detachEvent && b.detachEvent("on" + c, e)
            }
            this.allDOMEventHandlers = [];
            for (this.removeAllEventListeners(); this._canvasJSContainer && this._canvasJSContainer.hasChildNodes();) this._canvasJSContainer.removeChild(this._canvasJSContainer.lastChild);
            for (; this.container && this.container.hasChildNodes();) this.container.removeChild(this.container.lastChild);
            for (; this._dropdownMenu && this._dropdownMenu.hasChildNodes();) this._dropdownMenu.removeChild(this._dropdownMenu.lastChild);
            this.overlaidCanvas = this.canvas = this.container = this._canvasJSContainer = null;
            this._toolBar = this._dropdownMenu = this._menuButton = this._resetButton = this._zoomButton = this._breaksCanvas = this._preRenderCanvas = this.toolTip.container = null
        };
        m.prototype._updateOptions = function() {
            var a =
                this;
            this.updateOption("width");
            this.updateOption("height");
            this.updateOption("dataPointWidth");
            this.updateOption("dataPointMinWidth");
            this.updateOption("dataPointMaxWidth");
            this.updateOption("interactivityEnabled");
            this.updateOption("theme");
            this.updateOption("colorSet") && (this._selectedColorSet = "undefined" !== typeof Ba[this.colorSet] ? Ba[this.colorSet] : Ba.colorSet1);
            this.updateOption("backgroundColor");
            this.backgroundColor || (this.backgroundColor = "rgba(0,0,0,0)");
            this.updateOption("culture");
            this._cultureInfo =
                new La(this.options.culture);
            this.updateOption("animationEnabled");
            this.animationEnabled = this.animationEnabled && r;
            this.updateOption("animationDuration");
            this.updateOption("rangeChanging");
            this.updateOption("rangeChanged");
            this.updateOption("exportEnabled");
            this.updateOption("exportFileName");
            this.updateOption("zoomType");
            if (this.options.zoomEnabled) {
                if (!this._zoomButton) {
                    var d = !1;
                    va(this._zoomButton = document.createElement("button"));
                    ua(this, this._zoomButton, "pan");
                    this._toolBar.appendChild(this._zoomButton);
                    this._zoomButton.style.borderRight = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor;
                    O(this._zoomButton, "touchstart", function(a) {
                        d = !0
                    }, this.allDOMEventHandlers);
                    O(this._zoomButton, "click", function() {
                        a.zoomEnabled ? (a.zoomEnabled = !1, a.panEnabled = !0, ua(a, a._zoomButton, "zoom")) : (a.zoomEnabled = !0, a.panEnabled = !1, ua(a, a._zoomButton, "pan"));
                        a.render()
                    }, this.allDOMEventHandlers);
                    O(this._zoomButton, "mouseover", function() {
                        d ? d = !1 : (sa(a, a._zoomButton, {
                            backgroundColor: a.toolbar.backgroundColorOnHover,
                            color: a.toolbar.fontColorOnHover,
                            transition: "0.4s",
                            WebkitTransition: "0.4s"
                        }), 0 >= navigator.userAgent.search("MSIE") && sa(a, a._zoomButton.childNodes[0], {
                            WebkitFilter: "invert(100%)",
                            filter: "invert(100%)"
                        }))
                    }, this.allDOMEventHandlers);
                    O(this._zoomButton, "mouseout", function() {
                        d || (sa(a, a._zoomButton, {
                            backgroundColor: a.toolbar.backgroundColor,
                            color: a.toolbar.fontColor,
                            transition: "0.4s",
                            WebkitTransition: "0.4s"
                        }), 0 >= navigator.userAgent.search("MSIE") && sa(a, a._zoomButton.childNodes[0], {
                            WebkitFilter: "invert(0%)",
                            filter: "invert(0%)"
                        }))
                    }, this.allDOMEventHandlers)
                }
                this._resetButton || (d = !1, va(this._resetButton = document.createElement("button")), ua(this, this._resetButton, "reset"), this._resetButton.style.borderRight = (this.exportEnabled ? this.toolbar.borderThickness : 0) + "px solid " + this.toolbar.borderColor, this._toolBar.appendChild(this._resetButton), O(this._resetButton, "touchstart", function(a) {
                    d = !0
                }, this.allDOMEventHandlers), O(this._resetButton, "click", function() {
                    a.toolTip.hide();
                    a.zoomEnabled || a.panEnabled ? (a.zoomEnabled = !0, a.panEnabled = !1, ua(a, a._zoomButton, "pan"), a._defaultCursor = "default", a.overlaidCanvas.style.cursor = a._defaultCursor) : (a.zoomEnabled = !1, a.panEnabled = !1);
                    if (a.sessionVariables.axisX)
                        for (var c = 0; c < a.sessionVariables.axisX.length; c++) a.sessionVariables.axisX[c].newViewportMinimum = null, a.sessionVariables.axisX[c].newViewportMaximum = null;
                    if (a.sessionVariables.axisX2)
                        for (c = 0; c < a.sessionVariables.axisX2.length; c++) a.sessionVariables.axisX2[c].newViewportMinimum = null, a.sessionVariables.axisX2[c].newViewportMaximum =
                            null;
                    if (a.sessionVariables.axisY)
                        for (c = 0; c < a.sessionVariables.axisY.length; c++) a.sessionVariables.axisY[c].newViewportMinimum = null, a.sessionVariables.axisY[c].newViewportMaximum = null;
                    if (a.sessionVariables.axisY2)
                        for (c = 0; c < a.sessionVariables.axisY2.length; c++) a.sessionVariables.axisY2[c].newViewportMinimum = null, a.sessionVariables.axisY2[c].newViewportMaximum = null;
                    a.resetOverlayedCanvas();
                    va(a._zoomButton, a._resetButton);
                    a._dispatchRangeEvent("rangeChanging", "reset");
                    a.render();
                    a._dispatchRangeEvent("rangeChanged",
                        "reset");
                    a.syncCharts && a.syncCharts(null, null)
                }, this.allDOMEventHandlers), O(this._resetButton, "mouseover", function() {
                    d || (sa(a, a._resetButton, {
                        backgroundColor: a.toolbar.backgroundColorOnHover,
                        color: a.toolbar.hoverFfontColorOnHoverontColor,
                        transition: "0.4s",
                        WebkitTransition: "0.4s"
                    }), 0 >= navigator.userAgent.search("MSIE") && sa(a, a._resetButton.childNodes[0], {
                        WebkitFilter: "invert(100%)",
                        filter: "invert(100%)"
                    }))
                }, this.allDOMEventHandlers), O(this._resetButton, "mouseout", function() {
                    d || (sa(a, a._resetButton, {
                        backgroundColor: a.toolbar.backgroundColor,
                        color: a.toolbar.fontColor,
                        transition: "0.4s",
                        WebkitTransition: "0.4s"
                    }), 0 >= navigator.userAgent.search("MSIE") && sa(a, a._resetButton.childNodes[0], {
                        WebkitFilter: "invert(0%)",
                        filter: "invert(0%)"
                    }))
                }, this.allDOMEventHandlers), this.overlaidCanvas.style.cursor = a._defaultCursor);
                this.zoomEnabled || this.panEnabled || (this._zoomButton ? (a._zoomButton.getAttribute("state") === a._cultureInfo.zoomText ? (this.panEnabled = !0, this.zoomEnabled = !1) : (this.zoomEnabled = !0, this.panEnabled = !1), Qa(a._zoomButton, a._resetButton)) : (this.zoomEnabled = !0, this.panEnabled = !1))
            } else this.panEnabled = this.zoomEnabled = !1;
            this._menuButton ? this.exportEnabled ? Qa(this._menuButton) : va(this._menuButton) : this.exportEnabled && r && (d = !1, this._menuButton = document.createElement("button"), ua(this, this._menuButton, "menu"), this._toolBar.appendChild(this._menuButton), O(this._menuButton, "touchstart", function(a) {
                    d = !0
                }, this.allDOMEventHandlers), O(this._menuButton, "click", function() {
                    "none" !== a._dropdownMenu.style.display ||
                        a._dropDownCloseTime && 500 >= (new Date).getTime() - a._dropDownCloseTime.getTime() || (a._dropdownMenu.style.display = "block", a._menuButton.blur(), a._dropdownMenu.focus())
                }, this.allDOMEventHandlers, !0), O(this._menuButton, "mouseover", function() {
                    d || (sa(a, a._menuButton, {
                        backgroundColor: a.toolbar.backgroundColorOnHover,
                        color: a.toolbar.fontColorOnHover
                    }), 0 >= navigator.userAgent.search("MSIE") && sa(a, a._menuButton.childNodes[0], {
                        WebkitFilter: "invert(100%)",
                        filter: "invert(100%)"
                    }))
                }, this.allDOMEventHandlers, !0),
                O(this._menuButton, "mouseout", function() {
                    d || (sa(a, a._menuButton, {
                        backgroundColor: a.toolbar.backgroundColor,
                        color: a.toolbar.fontColor
                    }), 0 >= navigator.userAgent.search("MSIE") && sa(a, a._menuButton.childNodes[0], {
                        WebkitFilter: "invert(0%)",
                        filter: "invert(0%)"
                    }))
                }, this.allDOMEventHandlers, !0));
            if (!this._dropdownMenu && this.exportEnabled && r) {
                d = !1;
                this._dropdownMenu = document.createElement("div");
                this._dropdownMenu.setAttribute("tabindex", -1);
                var b = -1 !== this.theme.indexOf("dark") ? "black" : "#888888";
                this._dropdownMenu.style.cssText =
                    "position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 0px;top: 25px;min-width: 120px;outline: 0;font-size: 14px; font-family: Arial, Helvetica, sans-serif;padding: 5px 0px 5px 0px;text-align: left;line-height: 10px;background-color:" + this.toolbar.backgroundColor + ";box-shadow: 2px 2px 10px " + b;
                a._dropdownMenu.style.display = "none";
                this._toolBar.appendChild(this._dropdownMenu);
                O(this._dropdownMenu, "blur", function() {
                    va(a._dropdownMenu);
                    a._dropDownCloseTime = new Date
                }, this.allDOMEventHandlers, !0);
                b = document.createElement("div");
                b.style.cssText = "padding: 12px 8px 12px 8px";
                b.innerHTML = this._cultureInfo.printText;
                b.style.backgroundColor = this.toolbar.backgroundColor;
                b.style.color = this.toolbar.fontColor;
                this._dropdownMenu.appendChild(b);
                O(b, "touchstart", function(a) {
                    d = !0
                }, this.allDOMEventHandlers);
                O(b, "mouseover", function() {
                    d || (this.style.backgroundColor = a.toolbar.backgroundColorOnHover, this.style.color = a.toolbar.fontColorOnHover)
                }, this.allDOMEventHandlers, !0);
                O(b, "mouseout", function() {
                    d || (this.style.backgroundColor = a.toolbar.backgroundColor, this.style.color = a.toolbar.fontColor)
                }, this.allDOMEventHandlers, !0);
                O(b, "click", function() {
                    a.print();
                    va(a._dropdownMenu)
                }, this.allDOMEventHandlers, !0);
                b = document.createElement("div");
                b.style.cssText = "padding: 12px 8px 12px 8px";
                b.innerHTML = this._cultureInfo.saveJPGText;
                b.style.backgroundColor = this.toolbar.backgroundColor;
                b.style.color = this.toolbar.fontColor;
                this._dropdownMenu.appendChild(b);
                O(b, "touchstart", function(a) {
                    d = !0
                }, this.allDOMEventHandlers);
                O(b, "mouseover", function() {
                    d || (this.style.backgroundColor = a.toolbar.backgroundColorOnHover, this.style.color = a.toolbar.fontColorOnHover)
                }, this.allDOMEventHandlers, !0);
                O(b, "mouseout", function() {
                    d || (this.style.backgroundColor = a.toolbar.backgroundColor, this.style.color = a.toolbar.fontColor)
                }, this.allDOMEventHandlers, !0);
                O(b, "click", function() {
                    Ta(a.canvas, "jpeg", a.exportFileName);
                    va(a._dropdownMenu)
                }, this.allDOMEventHandlers, !0);
                b = document.createElement("div");
                b.style.cssText =
                    "padding: 12px 8px 12px 8px";
                b.innerHTML = this._cultureInfo.savePNGText;
                b.style.backgroundColor = this.toolbar.backgroundColor;
                b.style.color = this.toolbar.fontColor;
                this._dropdownMenu.appendChild(b);
                O(b, "touchstart", function(a) {
                    d = !0
                }, this.allDOMEventHandlers);
                O(b, "mouseover", function() {
                    d || (this.style.backgroundColor = a.toolbar.backgroundColorOnHover, this.style.color = a.toolbar.fontColorOnHover)
                }, this.allDOMEventHandlers, !0);
                O(b, "mouseout", function() {
                    d || (this.style.backgroundColor = a.toolbar.backgroundColor,
                        this.style.color = a.toolbar.fontColor)
                }, this.allDOMEventHandlers, !0);
                O(b, "click", function() {
                    Ta(a.canvas, "png", a.exportFileName);
                    va(a._dropdownMenu)
                }, this.allDOMEventHandlers, !0)
            }
            "none" !== this._toolBar.style.display && this._zoomButton && (this.panEnabled ? ua(a, a._zoomButton, "zoom") : ua(a, a._zoomButton, "pan"), a._resetButton.getAttribute("state") !== a._cultureInfo.resetText && ua(a, a._resetButton, "reset"));
            this.options.toolTip && this.toolTip.options !== this.options.toolTip && (this.toolTip.options = this.options.toolTip);
            for (var c in this.toolTip.options) this.toolTip.options.hasOwnProperty(c) && this.toolTip.updateOption(c)
        };
        m.prototype._updateSize = function() {
            var a;
            a = [this.canvas, this.overlaidCanvas, this._eventManager.ghostCanvas];
            var d = 0,
                b = 0;
            this.options.width ? d = this.width : this.width = d = 0 < this.container.clientWidth ? this.container.clientWidth : this.width;
            this.options.height ? b = this.height : this.height = b = 0 < this.container.clientHeight ? this.container.clientHeight : this.height;
            if (this.canvas.width !== d * W || this.canvas.height !==
                b * W) {
                for (var c = 0; c < a.length; c++) Oa(a[c], d, b);
                a = !0
            } else a = !1;
            return a
        };
        m.prototype._initialize = function() {
            this.isNavigator = v(this.parent) || v(this.parent._defaultsKey) || "Navigator" !== this.parent._defaultsKey ? !1 : !0;
            this.toolbar = new Va(this, this.options.toolbar);
            this._animator ? this._animator.cancelAllAnimations() : this._animator = new ga(this);
            this.removeAllEventListeners();
            this.disableToolTip = !1;
            this._axes = [];
            this.funnelPyramidClickHandler = this.pieDoughnutClickHandler = null;
            this._updateOptions();
            this.animatedRender =
                r && this.animationEnabled && 0 === this.renderCount;
            this._updateSize();
            this.clearCanvas();
            this.ctx.beginPath();
            this.axisX = [];
            this.axisX2 = [];
            this.axisY = [];
            this.axisY2 = [];
            this._indexLabels = [];
            this._dataInRenderedOrder = [];
            this._events = [];
            this._eventManager && this._eventManager.reset();
            this.plotInfo = {
                axisPlacement: null,
                plotTypes: []
            };
            this.layoutManager = new Ga(0, 0, this.width, this.height, this.isNavigator ? 0 : 2);
            this.plotArea.layoutManager && this.plotArea.layoutManager.reset();
            this.data = [];
            var a = 0,
                d = null;
            if (this.options.data) {
                for (var b =
                        0; b < this.options.data.length; b++)
                    if (a++, !this.options.data[b].type || 0 <= m._supportedChartTypes.indexOf(this.options.data[b].type)) {
                        var c = new H(this, this.options.data[b], a - 1, ++this._eventManager.lastObjectId);
                        "error" === c.type && (c.linkedDataSeriesIndex = v(this.options.data[b].linkedDataSeriesIndex) ? b - 1 : this.options.data[b].linkedDataSeriesIndex, 0 > c.linkedDataSeriesIndex || c.linkedDataSeriesIndex >= this.options.data.length || "number" !== typeof c.linkedDataSeriesIndex || "error" === this.options.data[c.linkedDataSeriesIndex].type) &&
                            (c.linkedDataSeriesIndex = null);
                        null === c.name && (c.name = "DataSeries " + a);
                        null === c.color ? 1 < this.options.data.length ? (c._colorSet = [this._selectedColorSet[c.index % this._selectedColorSet.length]], c.color = this._selectedColorSet[c.index % this._selectedColorSet.length]) : c._colorSet = "line" === c.type || "stepLine" === c.type || "spline" === c.type || "area" === c.type || "stepArea" === c.type || "splineArea" === c.type || "stackedArea" === c.type || "stackedArea100" === c.type || "rangeArea" === c.type || "rangeSplineArea" === c.type || "candlestick" ===
                            c.type || "ohlc" === c.type || "waterfall" === c.type || "boxAndWhisker" === c.type ? [this._selectedColorSet[0]] : this._selectedColorSet : c._colorSet = [c.color];
                        null === c.markerSize && (("line" === c.type || "stepLine" === c.type || "spline" === c.type || 0 <= c.type.toLowerCase().indexOf("area")) && c.dataPoints && c.dataPoints.length < this.width / 16 || "scatter" === c.type) && (c.markerSize = 8);
                        "bubble" !== c.type && "scatter" !== c.type || !c.dataPoints || (c.dataPoints.some ? c.dataPoints.some(function(a) {
                            return a.x
                        }) && c.dataPoints.sort(p) : c.dataPoints.sort(p));
                        this.data.push(c);
                        var e = c.axisPlacement,
                            d = d || e,
                            g;
                        "normal" === e ? "xySwapped" === this.plotInfo.axisPlacement ? g = 'You cannot combine "' + c.type + '" with bar chart' : "none" === this.plotInfo.axisPlacement ? g = 'You cannot combine "' + c.type + '" with pie chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "normal") : "xySwapped" === e ? "normal" === this.plotInfo.axisPlacement ? g = 'You cannot combine "' + c.type + '" with line, area, column or pie chart' : "none" === this.plotInfo.axisPlacement ? g = 'You cannot combine "' +
                            c.type + '" with pie chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "xySwapped") : "none" === e ? "normal" === this.plotInfo.axisPlacement ? g = 'You cannot combine "' + c.type + '" with line, area, column or bar chart' : "xySwapped" === this.plotInfo.axisPlacement ? g = 'You cannot combine "' + c.type + '" with bar chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "none") : null === e && "none" === this.plotInfo.axisPlacement && (g = 'You cannot combine "' + c.type + '" with pie chart');
                        if (g && window.console) {
                            window.console.log(g);
                            return
                        }
                    }
                for (b = 0; b < this.data.length; b++) {
                    if ("none" == d && "error" === this.data[b].type && window.console) {
                        window.console.log('You cannot combine "' + c.type + '" with error chart');
                        return
                    }
                    "error" === this.data[b].type && (this.data[b].axisPlacement = this.plotInfo.axisPlacement = d || "normal", this.data[b]._linkedSeries = null === this.data[b].linkedDataSeriesIndex ? null : this.data[this.data[b].linkedDataSeriesIndex])
                }
            }
            this._objectsInitialized = !0;
            this._plotAreaElements = []
        };
        m._supportedChartTypes = Fa("line stepLine spline column area stepArea splineArea bar bubble scatter stackedColumn stackedColumn100 stackedBar stackedBar100 stackedArea stackedArea100 candlestick ohlc boxAndWhisker rangeColumn error rangeBar rangeArea rangeSplineArea pie doughnut funnel pyramid waterfall".split(" "));
        m.prototype.setLayout = function() {
            for (var a = this._plotAreaElements, d = 0; d < this.data.length; d++)
                if ("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) {
                    if (!this.data[d].axisYType || "primary" === this.data[d].axisYType)
                        if (this.options.axisY && 0 < this.options.axisY.length) {
                            if (!this.axisY.length)
                                for (var b = 0; b < this.options.axisY.length; b++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY[b] = new y(this, "axisY", this.options.axisY[b], b, "axisY", "left")) : "xySwapped" ===
                                    this.plotInfo.axisPlacement && this._axes.push(this.axisY[b] = new y(this, "axisY", this.options.axisY[b], b, "axisY", "bottom"));
                            this.data[d].axisY = this.axisY[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY.length ? this.data[d].axisYIndex : 0];
                            this.axisY[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY.length ? this.data[d].axisYIndex : 0].dataSeries.push(this.data[d])
                        } else this.axisY.length || ("normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY[0] = new y(this, "axisY", this.options.axisY,
                            0, "axisY", "left")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY[0] = new y(this, "axisY", this.options.axisY, 0, "axisY", "bottom"))), this.data[d].axisY = this.axisY[0], this.axisY[0].dataSeries.push(this.data[d]);
                    if ("secondary" === this.data[d].axisYType)
                        if (this.options.axisY2 && 0 < this.options.axisY2.length) {
                            if (!this.axisY2.length)
                                for (b = 0; b < this.options.axisY2.length; b++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY2[b] = new y(this, "axisY2", this.options.axisY2[b], b,
                                    "axisY", "right")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY2[b] = new y(this, "axisY2", this.options.axisY2[b], b, "axisY", "top"));
                            this.data[d].axisY = this.axisY2[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY2.length ? this.data[d].axisYIndex : 0];
                            this.axisY2[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY2.length ? this.data[d].axisYIndex : 0].dataSeries.push(this.data[d])
                        } else this.axisY2.length || ("normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY2[0] =
                            new y(this, "axisY2", this.options.axisY2, 0, "axisY", "right")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY2[0] = new y(this, "axisY2", this.options.axisY2, 0, "axisY", "top"))), this.data[d].axisY = this.axisY2[0], this.axisY2[0].dataSeries.push(this.data[d]);
                    if (!this.data[d].axisXType || "primary" === this.data[d].axisXType)
                        if (this.options.axisX && 0 < this.options.axisX.length) {
                            if (!this.axisX.length)
                                for (b = 0; b < this.options.axisX.length; b++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisX[b] =
                                    new y(this, "axisX", this.options.axisX[b], b, "axisX", "bottom")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX[b] = new y(this, "axisX", this.options.axisX[b], b, "axisX", "left"));
                            this.data[d].axisX = this.axisX[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX.length ? this.data[d].axisXIndex : 0];
                            this.axisX[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX.length ? this.data[d].axisXIndex : 0].dataSeries.push(this.data[d])
                        } else this.axisX.length || ("normal" === this.plotInfo.axisPlacement ?
                            this._axes.push(this.axisX[0] = new y(this, "axisX", this.options.axisX, 0, "axisX", "bottom")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX[0] = new y(this, "axisX", this.options.axisX, 0, "axisX", "left"))), this.data[d].axisX = this.axisX[0], this.axisX[0].dataSeries.push(this.data[d]);
                    if ("secondary" === this.data[d].axisXType)
                        if (this.options.axisX2 && 0 < this.options.axisX2.length) {
                            if (!this.axisX2.length)
                                for (b = 0; b < this.options.axisX2.length; b++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisX2[b] =
                                    new y(this, "axisX2", this.options.axisX2[b], b, "axisX", "top")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX2[b] = new y(this, "axisX2", this.options.axisX2[b], b, "axisX", "right"));
                            this.data[d].axisX = this.axisX2[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX2.length ? this.data[d].axisXIndex : 0];
                            this.axisX2[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX2.length ? this.data[d].axisXIndex : 0].dataSeries.push(this.data[d])
                        } else this.axisX2.length || ("normal" ===
                            this.plotInfo.axisPlacement ? this._axes.push(this.axisX2[0] = new y(this, "axisX2", this.options.axisX2, 0, "axisX", "top")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX2[0] = new y(this, "axisX2", this.options.axisX2, 0, "axisX", "right"))), this.data[d].axisX = this.axisX2[0], this.axisX2[0].dataSeries.push(this.data[d])
                }
            if (this.axisY) {
                for (b = 1; b < this.axisY.length; b++) "undefined" === typeof this.axisY[b].options.gridThickness && (this.axisY[b].gridThickness = 0);
                for (b = 0; b < this.axisY.length - 1; b++) "undefined" ===
                    typeof this.axisY[b].options.margin && (this.axisY[b].margin = 10)
            }
            if (this.axisY2) {
                for (b = 1; b < this.axisY2.length; b++) "undefined" === typeof this.axisY2[b].options.gridThickness && (this.axisY2[b].gridThickness = 0);
                for (b = 0; b < this.axisY2.length - 1; b++) "undefined" === typeof this.axisY2[b].options.margin && (this.axisY2[b].margin = 10)
            }
            this.axisY && 0 < this.axisY.length && (this.axisY2 && 0 < this.axisY2.length) && (0 < this.axisY[0].gridThickness && "undefined" === typeof this.axisY2[0].options.gridThickness ? this.axisY2[0].gridThickness =
                0 : 0 < this.axisY2[0].gridThickness && "undefined" === typeof this.axisY[0].options.gridThickness && (this.axisY[0].gridThickness = 0));
            if (this.axisX)
                for (b = 0; b < this.axisX.length; b++) "undefined" === typeof this.axisX[b].options.gridThickness && (this.axisX[b].gridThickness = 0);
            if (this.axisX2)
                for (b = 0; b < this.axisX2.length; b++) "undefined" === typeof this.axisX2[b].options.gridThickness && (this.axisX2[b].gridThickness = 0);
            this.axisX && 0 < this.axisX.length && (this.axisX2 && 0 < this.axisX2.length) && (0 < this.axisX[0].gridThickness &&
                "undefined" === typeof this.axisX2[0].options.gridThickness ? this.axisX2[0].gridThickness = 0 : 0 < this.axisX2[0].gridThickness && "undefined" === typeof this.axisX[0].options.gridThickness && (this.axisX[0].gridThickness = 0));
            b = !1;
            if (0 < this._axes.length && (this.zoomEnabled || this.panEnabled))
                for (d = 0; d < this._axes.length; d++)
                    if (null !== this._axes[d].viewportMinimum || null !== this._axes[d].viewportMaximum) {
                        b = !0;
                        break
                    }
            b ? (Qa(this._zoomButton, this._resetButton), this._toolBar.style.border = this.toolbar.borderThickness + "px solid " +
                this.toolbar.borderColor, this._zoomButton.style.borderRight = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor, this._resetButton.style.borderRight = (this.exportEnabled ? this.toolbar.borderThickness : 0) + "px solid " + this.toolbar.borderColor) : (va(this._zoomButton, this._resetButton), this._toolBar.style.border = this.toolbar.borderThickness + "px solid transparent", this.options.zoomEnabled && (this.zoomEnabled = !0, this.panEnabled = !1));
            gb(this);
            this._processData();
            this.options.title && (this.title = new Aa(this,
                this.options.title), this.title.dockInsidePlotArea ? a.push(this.title) : this.title.setLayout());
            this.subtitles = [];
            if (this.options.subtitles)
                for (d = 0; d < this.options.subtitles.length; d++) b = new Ka(this, this.options.subtitles[d], d), this.subtitles.push(b), b.dockInsidePlotArea ? a.push(b) : b.setLayout();
            this.legend = new F(this, this.options.legend);
            for (d = 0; d < this.data.length; d++)(this.data[d].showInLegend || "pie" === this.data[d].type || "doughnut" === this.data[d].type || "funnel" === this.data[d].type || "pyramid" === this.data[d].type) &&
                this.legend.dataSeries.push(this.data[d]);
            this.legend.dockInsidePlotArea ? a.push(this.legend) : this.legend.setLayout();
            for (d = 0; d < this._axes.length; d++)
                if (this._axes[d].scaleBreaks && this._axes[d].scaleBreaks._appliedBreaks.length) {
                    r ? (this._breaksCanvas = ta(this.width, this.height, !0), this._breaksCanvasCtx = this._breaksCanvas.getContext("2d")) : (this._breaksCanvas = this.canvas, this._breaksCanvasCtx = this.ctx);
                    break
                }
            this._preRenderCanvas = ta(this.width, this.height);
            this._preRenderCtx = this._preRenderCanvas.getContext("2d");
            "normal" !== this.plotInfo.axisPlacement && "xySwapped" !== this.plotInfo.axisPlacement || y.setLayout(this.axisX, this.axisX2, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace())
        };
        m.prototype.renderElements = function() {
            var a = this._plotAreaElements;
            this.title && !this.title.dockInsidePlotArea && this.title.render();
            for (var d = 0; d < this.subtitles.length; d++) this.subtitles[d].dockInsidePlotArea || this.subtitles[d].render();
            this.legend.dockInsidePlotArea || this.legend.render();
            if ("normal" ===
                this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) y.render(this.axisX, this.axisX2, this.axisY, this.axisY2, this.plotInfo.axisPlacement);
            else if ("none" === this.plotInfo.axisPlacement) this.preparePlotArea();
            else return;
            for (d = 0; d < a.length; d++) a[d].setLayout(), a[d].render();
            var b = [];
            if (this.animatedRender) {
                var c = ta(this.width, this.height);
                c.getContext("2d").drawImage(this.canvas, 0, 0, this.width, this.height)
            }
            hb(this);
            var a = this.ctx.miterLimit,
                e;
            this.ctx.miterLimit = 3;
            r && this._breaksCanvas &&
                (this._preRenderCtx.drawImage(this.canvas, 0, 0, this.width, this.height), this._preRenderCtx.drawImage(this._breaksCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx.globalCompositeOperation = "source-atop", this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), this._preRenderCtx.clearRect(0, 0, this.width, this.height));
            for (d = 0; d < this.plotInfo.plotTypes.length; d++)
                for (var g = this.plotInfo.plotTypes[d], h = 0; h < g.plotUnits.length; h++) {
                    var k = g.plotUnits[h],
                        t = null;
                    k.targetCanvas =
                        null;
                    this.animatedRender && (k.targetCanvas = ta(this.width, this.height), k.targetCanvasCtx = k.targetCanvas.getContext("2d"), e = k.targetCanvasCtx.miterLimit, k.targetCanvasCtx.miterLimit = 3);
                    "line" === k.type ? t = this.renderLine(k) : "stepLine" === k.type ? t = this.renderStepLine(k) : "spline" === k.type ? t = this.renderSpline(k) : "column" === k.type ? t = this.renderColumn(k) : "bar" === k.type ? t = this.renderBar(k) : "area" === k.type ? t = this.renderArea(k) : "stepArea" === k.type ? t = this.renderStepArea(k) : "splineArea" === k.type ? t = this.renderSplineArea(k) :
                        "stackedColumn" === k.type ? t = this.renderStackedColumn(k) : "stackedColumn100" === k.type ? t = this.renderStackedColumn100(k) : "stackedBar" === k.type ? t = this.renderStackedBar(k) : "stackedBar100" === k.type ? t = this.renderStackedBar100(k) : "stackedArea" === k.type ? t = this.renderStackedArea(k) : "stackedArea100" === k.type ? t = this.renderStackedArea100(k) : "bubble" === k.type ? t = t = this.renderBubble(k) : "scatter" === k.type ? t = this.renderScatter(k) : "pie" === k.type ? this.renderPie(k) : "doughnut" === k.type ? this.renderPie(k) : "funnel" === k.type ?
                        t = this.renderFunnel(k) : "pyramid" === k.type ? t = this.renderFunnel(k) : "candlestick" === k.type ? t = this.renderCandlestick(k) : "ohlc" === k.type ? t = this.renderCandlestick(k) : "rangeColumn" === k.type ? t = this.renderRangeColumn(k) : "error" === k.type ? t = this.renderError(k) : "rangeBar" === k.type ? t = this.renderRangeBar(k) : "rangeArea" === k.type ? t = this.renderRangeArea(k) : "rangeSplineArea" === k.type ? t = this.renderRangeSplineArea(k) : "waterfall" === k.type ? t = this.renderWaterfall(k) : "boxAndWhisker" === k.type && (t = this.renderBoxAndWhisker(k));
                    for (var l = 0; l < k.dataSeriesIndexes.length; l++) this._dataInRenderedOrder.push(this.data[k.dataSeriesIndexes[l]]);
                    this.animatedRender && (k.targetCanvasCtx.miterLimit = e, t && b.push(t))
                }
            this.ctx.miterLimit = a;
            this.animatedRender && this._breaksCanvasCtx && b.push({
                source: this._breaksCanvasCtx,
                dest: this.plotArea.ctx,
                animationCallback: M.fadeInAnimation,
                easingFunction: M.easing.easeInQuad,
                animationBase: 0,
                startTimePercent: 0.7
            });
            this.animatedRender && 0 < this._indexLabels.length && (e = ta(this.width, this.height).getContext("2d"),
                b.push(this.renderIndexLabels(e)));
            var u = this;
            if (0 < b.length) u.disableToolTip = !0, u._animator.animate(200, u.animationDuration, function(a) {
                u.ctx.clearRect(0, 0, u.width, u.height);
                u.ctx.drawImage(c, 0, 0, Math.floor(u.width * W), Math.floor(u.height * W), 0, 0, u.width, u.height);
                for (var e = 0; e < b.length; e++) t = b[e], 1 > a && "undefined" !== typeof t.startTimePercent ? a >= t.startTimePercent && t.animationCallback(t.easingFunction(a - t.startTimePercent, 0, 1, 1 - t.startTimePercent), t) : t.animationCallback(t.easingFunction(a, 0, 1, 1), t);
                u.dispatchEvent("dataAnimationIterationEnd", {
                    chart: u
                })
            }, function() {
                b = [];
                for (var a = 0; a < u.plotInfo.plotTypes.length; a++)
                    for (var e = u.plotInfo.plotTypes[a], d = 0; d < e.plotUnits.length; d++) e.plotUnits[d].targetCanvas = null;
                c = null;
                u.disableToolTip = !1
            });
            else {
                if (u._breaksCanvas)
                    if (r) u.plotArea.ctx.drawImage(u._breaksCanvas, 0, 0, this.width, this.height);
                    else
                        for (l = 0; l < u._axes.length; l++) u._axes[l].createMask();
                0 < u._indexLabels.length && u.renderIndexLabels();
                u.dispatchEvent("dataAnimationIterationEnd", {
                    chart: u
                })
            }
            this.attachPlotAreaEventHandlers();
            this.zoomEnabled || (this.panEnabled || !this._zoomButton || "none" === this._zoomButton.style.display) || va(this._zoomButton, this._resetButton);
            this.toolTip._updateToolTip();
            this.renderCount++;
            Ja && (u = this, setTimeout(function() {
                var a = document.getElementById("ghostCanvasCopy");
                a && (Oa(a, u.width, u.height), a.getContext("2d").drawImage(u._eventManager.ghostCanvas, 0, 0))
            }, 2E3));
            this._breaksCanvas && (delete this._breaksCanvas, delete this._breaksCanvasCtx);
            for (l = 0; l < this._axes.length; l++) this._axes[l].maskCanvas && (delete this._axes[l].maskCanvas,
                delete this._axes[l].maskCtx)
        };
        m.prototype.render = function(a) {
            a && (this.options = a);
            this._initialize();
            this.setLayout();
            this.renderElements();
            this._preRenderCanvas = null
        };
        m.prototype.attachPlotAreaEventHandlers = function() {
            this.attachEvent({
                context: this,
                chart: this,
                mousedown: this._plotAreaMouseDown,
                mouseup: this._plotAreaMouseUp,
                mousemove: this._plotAreaMouseMove,
                cursor: this.panEnabled ? "move" : "default",
                capture: !0,
                bounds: this.plotArea
            })
        };
        m.prototype.categoriseDataSeries = function() {
            for (var a = "", d = 0; d < this.data.length; d++)
                if (a =
                    this.data[d], a.dataPoints && (0 !== a.dataPoints.length && a.visible) && 0 <= m._supportedChartTypes.indexOf(a.type)) {
                    for (var b = null, c = !1, e = null, g = !1, h = 0; h < this.plotInfo.plotTypes.length; h++)
                        if (this.plotInfo.plotTypes[h].type === a.type) {
                            c = !0;
                            b = this.plotInfo.plotTypes[h];
                            break
                        }
                    c || (b = {
                        type: a.type,
                        totalDataSeries: 0,
                        plotUnits: []
                    }, this.plotInfo.plotTypes.push(b));
                    for (h = 0; h < b.plotUnits.length; h++)
                        if (b.plotUnits[h].axisYType === a.axisYType && b.plotUnits[h].axisXType === a.axisXType && b.plotUnits[h].axisYIndex === a.axisYIndex &&
                            b.plotUnits[h].axisXIndex === a.axisXIndex) {
                            g = !0;
                            e = b.plotUnits[h];
                            break
                        }
                    g || (e = {
                        type: a.type,
                        previousDataSeriesCount: 0,
                        index: b.plotUnits.length,
                        plotType: b,
                        axisXType: a.axisXType,
                        axisYType: a.axisYType,
                        axisYIndex: a.axisYIndex,
                        axisXIndex: a.axisXIndex,
                        axisY: "primary" === a.axisYType ? this.axisY[0 <= a.axisYIndex && a.axisYIndex < this.axisY.length ? a.axisYIndex : 0] : this.axisY2[0 <= a.axisYIndex && a.axisYIndex < this.axisY2.length ? a.axisYIndex : 0],
                        axisX: "primary" === a.axisXType ? this.axisX[0 <= a.axisXIndex && a.axisXIndex < this.axisX.length ?
                            a.axisXIndex : 0] : this.axisX2[0 <= a.axisXIndex && a.axisXIndex < this.axisX2.length ? a.axisXIndex : 0],
                        dataSeriesIndexes: [],
                        yTotals: []
                    }, b.plotUnits.push(e));
                    b.totalDataSeries++;
                    e.dataSeriesIndexes.push(d);
                    a.plotUnit = e
                }
            for (d = 0; d < this.plotInfo.plotTypes.length; d++)
                for (b = this.plotInfo.plotTypes[d], h = a = 0; h < b.plotUnits.length; h++) b.plotUnits[h].previousDataSeriesCount = a, a += b.plotUnits[h].dataSeriesIndexes.length
        };
        m.prototype.assignIdToDataPoints = function() {
            for (var a = 0; a < this.data.length; a++) {
                var d = this.data[a];
                if (d.dataPoints)
                    for (var b = d.dataPoints.length, c = 0; c < b; c++) d.dataPointIds[c] = ++this._eventManager.lastObjectId
            }
        };
        m.prototype._processData = function() {
            this.assignIdToDataPoints();
            this.categoriseDataSeries();
            for (var a = 0; a < this.plotInfo.plotTypes.length; a++)
                for (var d = this.plotInfo.plotTypes[a], b = 0; b < d.plotUnits.length; b++) {
                    var c = d.plotUnits[b];
                    "line" === c.type || "stepLine" === c.type || "spline" === c.type || "column" === c.type || "area" === c.type || "stepArea" === c.type || "splineArea" === c.type || "bar" === c.type || "bubble" ===
                        c.type || "scatter" === c.type ? this._processMultiseriesPlotUnit(c) : "stackedColumn" === c.type || "stackedBar" === c.type || "stackedArea" === c.type ? this._processStackedPlotUnit(c) : "stackedColumn100" === c.type || "stackedBar100" === c.type || "stackedArea100" === c.type ? this._processStacked100PlotUnit(c) : "candlestick" === c.type || "ohlc" === c.type || "rangeColumn" === c.type || "rangeBar" === c.type || "rangeArea" === c.type || "rangeSplineArea" === c.type || "error" === c.type || "boxAndWhisker" === c.type ? this._processMultiYPlotUnit(c) : "waterfall" ===
                        c.type && this._processSpecificPlotUnit(c)
                }
            this.calculateAutoBreaks()
        };
        m.prototype._processMultiseriesPlotUnit = function(a) {
            if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length))
                for (var d = a.axisY.dataInfo, b = a.axisX.dataInfo, c, e, g = !1, h = 0; h < a.dataSeriesIndexes.length; h++) {
                    var k = this.data[a.dataSeriesIndexes[h]],
                        t = 0,
                        l = !1,
                        u = !1,
                        q;
                    if ("normal" === k.axisPlacement || "xySwapped" === k.axisPlacement) var n = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX &&
                        this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : a.axisX.logarithmic ? 0 : -Infinity,
                        f = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
                    if (k.dataPoints[t].x && k.dataPoints[t].x.getTime || "dateTime" ===
                        k.xValueType) g = !0;
                    for (t = 0; t < k.dataPoints.length; t++) {
                        "undefined" === typeof k.dataPoints[t].x && (k.dataPoints[t].x = t + (a.axisX.logarithmic ? 1 : 0));
                        k.dataPoints[t].x.getTime ? (g = !0, c = k.dataPoints[t].x.getTime()) : c = k.dataPoints[t].x;
                        e = k.dataPoints[t].y;
                        c < b.min && (b.min = c);
                        c > b.max && (b.max = c);
                        e < d.min && "number" === typeof e && (d.min = e);
                        e > d.max && "number" === typeof e && (d.max = e);
                        if (0 < t) {
                            if (a.axisX.logarithmic) {
                                var A = c / k.dataPoints[t - 1].x;
                                1 > A && (A = 1 / A);
                                b.minDiff > A && 1 !== A && (b.minDiff = A)
                            } else A = c - k.dataPoints[t - 1].x, 0 > A &&
                                (A *= -1), b.minDiff > A && 0 !== A && (b.minDiff = A);
                            null !== e && null !== k.dataPoints[t - 1].y && (a.axisY.logarithmic ? (A = e / k.dataPoints[t - 1].y, 1 > A && (A = 1 / A), d.minDiff > A && 1 !== A && (d.minDiff = A)) : (A = e - k.dataPoints[t - 1].y, 0 > A && (A *= -1), d.minDiff > A && 0 !== A && (d.minDiff = A)))
                        }
                        if (c < n && !l) null !== e && (q = c);
                        else {
                            if (!l && (l = !0, 0 < t)) {
                                t -= 2;
                                continue
                            }
                            if (c > f && !u) u = !0;
                            else if (c > f && u) continue;
                            k.dataPoints[t].label && (a.axisX.labels[c] = k.dataPoints[t].label);
                            c < b.viewPortMin && (b.viewPortMin = c);
                            c > b.viewPortMax && (b.viewPortMax = c);
                            null === e ? b.viewPortMin ===
                                c && q < c && (b.viewPortMin = q) : (e < d.viewPortMin && "number" === typeof e && (d.viewPortMin = e), e > d.viewPortMax && "number" === typeof e && (d.viewPortMax = e))
                        }
                    }
                    k.axisX.valueType = k.xValueType = g ? "dateTime" : "number"
                }
        };
        m.prototype._processStackedPlotUnit = function(a) {
            if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) {
                for (var d = a.axisY.dataInfo, b = a.axisX.dataInfo, c, e, g = !1, h = [], k = [], t = Infinity, l = -Infinity, u = 0; u < a.dataSeriesIndexes.length; u++) {
                    var q = this.data[a.dataSeriesIndexes[u]],
                        n = 0,
                        f = !1,
                        A = !1,
                        p;
                    if ("normal" === q.axisPlacement ||
                        "xySwapped" === q.axisPlacement) var m = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : -Infinity,
                        s = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ?
                        this.options.axisX.maximum : Infinity;
                    if (q.dataPoints[n].x && q.dataPoints[n].x.getTime || "dateTime" === q.xValueType) g = !0;
                    for (n = 0; n < q.dataPoints.length; n++) {
                        "undefined" === typeof q.dataPoints[n].x && (q.dataPoints[n].x = n + (a.axisX.logarithmic ? 1 : 0));
                        q.dataPoints[n].x.getTime ? (g = !0, c = q.dataPoints[n].x.getTime()) : c = q.dataPoints[n].x;
                        e = v(q.dataPoints[n].y) ? 0 : q.dataPoints[n].y;
                        c < b.min && (b.min = c);
                        c > b.max && (b.max = c);
                        if (0 < n) {
                            if (a.axisX.logarithmic) {
                                var r = c / q.dataPoints[n - 1].x;
                                1 > r && (r = 1 / r);
                                b.minDiff > r && 1 !== r && (b.minDiff =
                                    r)
                            } else r = c - q.dataPoints[n - 1].x, 0 > r && (r *= -1), b.minDiff > r && 0 !== r && (b.minDiff = r);
                            null !== e && null !== q.dataPoints[n - 1].y && (a.axisY.logarithmic ? 0 < e && (r = e / q.dataPoints[n - 1].y, 1 > r && (r = 1 / r), d.minDiff > r && 1 !== r && (d.minDiff = r)) : (r = e - q.dataPoints[n - 1].y, 0 > r && (r *= -1), d.minDiff > r && 0 !== r && (d.minDiff = r)))
                        }
                        if (c < m && !f) null !== q.dataPoints[n].y && (p = c);
                        else {
                            if (!f && (f = !0, 0 < n)) {
                                n -= 2;
                                continue
                            }
                            if (c > s && !A) A = !0;
                            else if (c > s && A) continue;
                            q.dataPoints[n].label && (a.axisX.labels[c] = q.dataPoints[n].label);
                            c < b.viewPortMin && (b.viewPortMin =
                                c);
                            c > b.viewPortMax && (b.viewPortMax = c);
                            null === q.dataPoints[n].y ? b.viewPortMin === c && p < c && (b.viewPortMin = p) : (a.yTotals[c] = (a.yTotals[c] ? a.yTotals[c] : 0) + e, 0 <= e ? h[c] ? h[c] += e : (h[c] = e, t = Math.min(e, t)) : k[c] ? k[c] += e : (k[c] = e, l = Math.max(e, l)))
                        }
                    }
                    a.axisY.scaleBreaks && (a.axisY.scaleBreaks.autoCalculate && 1 <= a.axisY.scaleBreaks.maxNumberOfAutoBreaks) && (d.dataPointYPositiveSums ? (d.dataPointYPositiveSums.push.apply(d.dataPointYPositiveSums, h), d.dataPointYNegativeSums.push.apply(d.dataPointYPositiveSums, k)) : (d.dataPointYPositiveSums =
                        h, d.dataPointYNegativeSums = k));
                    q.axisX.valueType = q.xValueType = g ? "dateTime" : "number"
                }
                for (n in h) h.hasOwnProperty(n) && !isNaN(n) && (a = h[n], a < d.min && (d.min = Math.min(a, t)), a > d.max && (d.max = a), n < b.viewPortMin || n > b.viewPortMax || (a < d.viewPortMin && (d.viewPortMin = Math.min(a, t)), a > d.viewPortMax && (d.viewPortMax = a)));
                for (n in k) k.hasOwnProperty(n) && !isNaN(n) && (a = k[n], a < d.min && (d.min = a), a > d.max && (d.max = Math.max(a, l)), n < b.viewPortMin || n > b.viewPortMax || (a < d.viewPortMin && (d.viewPortMin = a), a > d.viewPortMax && (d.viewPortMax =
                    Math.max(a, l))))
            }
        };
        m.prototype._processStacked100PlotUnit = function(a) {
            if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) {
                for (var d = a.axisY.dataInfo, b = a.axisX.dataInfo, c, e, g = !1, h = !1, k = !1, t = [], l = 0; l < a.dataSeriesIndexes.length; l++) {
                    var u = this.data[a.dataSeriesIndexes[l]],
                        q = 0,
                        n = !1,
                        f = !1,
                        A;
                    if ("normal" === u.axisPlacement || "xySwapped" === u.axisPlacement) var p = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ?
                        this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : -Infinity,
                        r = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
                    if (u.dataPoints[q].x && u.dataPoints[q].x.getTime || "dateTime" === u.xValueType) g = !0;
                    for (q = 0; q < u.dataPoints.length; q++) {
                        "undefined" ===
                        typeof u.dataPoints[q].x && (u.dataPoints[q].x = q + (a.axisX.logarithmic ? 1 : 0));
                        u.dataPoints[q].x.getTime ? (g = !0, c = u.dataPoints[q].x.getTime()) : c = u.dataPoints[q].x;
                        e = v(u.dataPoints[q].y) ? null : u.dataPoints[q].y;
                        c < b.min && (b.min = c);
                        c > b.max && (b.max = c);
                        if (0 < q) {
                            if (a.axisX.logarithmic) {
                                var s = c / u.dataPoints[q - 1].x;
                                1 > s && (s = 1 / s);
                                b.minDiff > s && 1 !== s && (b.minDiff = s)
                            } else s = c - u.dataPoints[q - 1].x, 0 > s && (s *= -1), b.minDiff > s && 0 !== s && (b.minDiff = s);
                            v(e) || null === u.dataPoints[q - 1].y || (a.axisY.logarithmic ? 0 < e && (s = e / u.dataPoints[q -
                                1].y, 1 > s && (s = 1 / s), d.minDiff > s && 1 !== s && (d.minDiff = s)) : (s = e - u.dataPoints[q - 1].y, 0 > s && (s *= -1), d.minDiff > s && 0 !== s && (d.minDiff = s)))
                        }
                        if (c < p && !n) null !== e && (A = c);
                        else {
                            if (!n && (n = !0, 0 < q)) {
                                q -= 2;
                                continue
                            }
                            if (c > r && !f) f = !0;
                            else if (c > r && f) continue;
                            u.dataPoints[q].label && (a.axisX.labels[c] = u.dataPoints[q].label);
                            c < b.viewPortMin && (b.viewPortMin = c);
                            c > b.viewPortMax && (b.viewPortMax = c);
                            null === e ? b.viewPortMin === c && A < c && (b.viewPortMin = A) : (a.yTotals[c] = (a.yTotals[c] ? a.yTotals[c] : 0) + e, 0 <= e ? h = !0 : 0 > e && (k = !0), t[c] = t[c] ? t[c] +
                                Math.abs(e) : Math.abs(e))
                        }
                    }
                    u.axisX.valueType = u.xValueType = g ? "dateTime" : "number"
                }
                a.axisY.logarithmic ? (d.max = v(d.viewPortMax) ? 99 * Math.pow(a.axisY.logarithmBase, -0.05) : Math.max(d.viewPortMax, 99 * Math.pow(a.axisY.logarithmBase, -0.05)), d.min = v(d.viewPortMin) ? 1 : Math.min(d.viewPortMin, 1)) : h && !k ? (d.max = v(d.viewPortMax) ? 99 : Math.max(d.viewPortMax, 99), d.min = v(d.viewPortMin) ? 1 : Math.min(d.viewPortMin, 1)) : h && k ? (d.max = v(d.viewPortMax) ? 99 : Math.max(d.viewPortMax, 99), d.min = v(d.viewPortMin) ? -99 : Math.min(d.viewPortMin, -99)) : !h && k && (d.max = v(d.viewPortMax) ? -1 : Math.max(d.viewPortMax, -1), d.min = v(d.viewPortMin) ? -99 : Math.min(d.viewPortMin, -99));
                d.viewPortMin = d.min;
                d.viewPortMax = d.max;
                a.dataPointYSums = t
            }
        };
        m.prototype._processMultiYPlotUnit = function(a) {
            if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length))
                for (var d = a.axisY.dataInfo, b = a.axisX.dataInfo, c, e, g, h, k = !1, t = 0; t < a.dataSeriesIndexes.length; t++) {
                    var l = this.data[a.dataSeriesIndexes[t]],
                        u = 0,
                        q = !1,
                        n = !1,
                        f, A, p;
                    if ("normal" === l.axisPlacement || "xySwapped" === l.axisPlacement) var r =
                        a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : a.axisX.logarithmic ? 0 : -Infinity,
                        s = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ?
                        this.options.axisX.maximum : Infinity;
                    if (l.dataPoints[u].x && l.dataPoints[u].x.getTime || "dateTime" === l.xValueType) k = !0;
                    for (u = 0; u < l.dataPoints.length; u++) {
                        "undefined" === typeof l.dataPoints[u].x && (l.dataPoints[u].x = u + (a.axisX.logarithmic ? 1 : 0));
                        l.dataPoints[u].x.getTime ? (k = !0, c = l.dataPoints[u].x.getTime()) : c = l.dataPoints[u].x;
                        if ((e = l.dataPoints[u].y) && e.length) {
                            g = Math.min.apply(null, e);
                            h = Math.max.apply(null, e);
                            A = !0;
                            for (var m = 0; m < e.length; m++) null === e.k && (A = !1);
                            A && (q || (p = f), f = c)
                        }
                        c < b.min && (b.min = c);
                        c > b.max &&
                            (b.max = c);
                        g < d.min && (d.min = g);
                        h > d.max && (d.max = h);
                        0 < u && (a.axisX.logarithmic ? (A = c / l.dataPoints[u - 1].x, 1 > A && (A = 1 / A), b.minDiff > A && 1 !== A && (b.minDiff = A)) : (A = c - l.dataPoints[u - 1].x, 0 > A && (A *= -1), b.minDiff > A && 0 !== A && (b.minDiff = A)), e && (null !== e[0] && l.dataPoints[u - 1].y && null !== l.dataPoints[u - 1].y[0]) && (a.axisY.logarithmic ? (A = e[0] / l.dataPoints[u - 1].y[0], 1 > A && (A = 1 / A), d.minDiff > A && 1 !== A && (d.minDiff = A)) : (A = e[0] - l.dataPoints[u - 1].y[0], 0 > A && (A *= -1), d.minDiff > A && 0 !== A && (d.minDiff = A))));
                        if (!(c < r) || q) {
                            if (!q && (q = !0, 0 < u)) {
                                u -=
                                    2;
                                f = p;
                                continue
                            }
                            if (c > s && !n) n = !0;
                            else if (c > s && n) continue;
                            l.dataPoints[u].label && (a.axisX.labels[c] = l.dataPoints[u].label);
                            c < b.viewPortMin && (b.viewPortMin = c);
                            c > b.viewPortMax && (b.viewPortMax = c);
                            if (b.viewPortMin === c && e)
                                for (m = 0; m < e.length; m++)
                                    if (null === e[m] && f < c) {
                                        b.viewPortMin = f;
                                        break
                                    }
                            null === e ? b.viewPortMin === c && f < c && (b.viewPortMin = f) : (g < d.viewPortMin && (d.viewPortMin = g), h > d.viewPortMax && (d.viewPortMax = h))
                        }
                    }
                    l.axisX.valueType = l.xValueType = k ? "dateTime" : "number"
                }
        };
        m.prototype._processSpecificPlotUnit = function(a) {
            if ("waterfall" ===
                a.type && a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length))
                for (var d = a.axisY.dataInfo, b = a.axisX.dataInfo, c, e, g = !1, h = 0; h < a.dataSeriesIndexes.length; h++) {
                    var k = this.data[a.dataSeriesIndexes[h]],
                        t = 0,
                        l = !1,
                        u = !1,
                        q = c = 0;
                    if ("normal" === k.axisPlacement || "xySwapped" === k.axisPlacement) var n = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ?
                        this.options.axisX.minimum : a.axisX.logarithmic ? 0 : -Infinity,
                        f = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
                    if (k.dataPoints[t].x && k.dataPoints[t].x.getTime || "dateTime" === k.xValueType) g = !0;
                    for (t = 0; t < k.dataPoints.length; t++) "undefined" !== typeof k.dataPoints[t].isCumulativeSum && !0 === k.dataPoints[t].isCumulativeSum ?
                        (k.dataPointEOs[t].cumulativeSumYStartValue = 0, k.dataPointEOs[t].cumulativeSum = 0 === t ? 0 : k.dataPointEOs[t - 1].cumulativeSum, k.dataPoints[t].y = 0 === t ? 0 : k.dataPointEOs[t - 1].cumulativeSum) : "undefined" !== typeof k.dataPoints[t].isIntermediateSum && !0 === k.dataPoints[t].isIntermediateSum ? (k.dataPointEOs[t].cumulativeSumYStartValue = q, k.dataPointEOs[t].cumulativeSum = 0 === t ? 0 : k.dataPointEOs[t - 1].cumulativeSum, k.dataPoints[t].y = 0 === t ? 0 : c, q = 0 === t ? 0 : k.dataPointEOs[t - 1].cumulativeSum, c = 0) : (e = "number" !== typeof k.dataPoints[t].y ?
                            0 : k.dataPoints[t].y, k.dataPointEOs[t].cumulativeSumYStartValue = 0 === t ? 0 : k.dataPointEOs[t - 1].cumulativeSum, k.dataPointEOs[t].cumulativeSum = 0 === t ? e : k.dataPointEOs[t - 1].cumulativeSum + e, c += e);
                    for (t = 0; t < k.dataPoints.length; t++)
                        if ("undefined" === typeof k.dataPoints[t].x && (k.dataPoints[t].x = t + (a.axisX.logarithmic ? 1 : 0)), k.dataPoints[t].x.getTime ? (g = !0, c = k.dataPoints[t].x.getTime()) : c = k.dataPoints[t].x, e = k.dataPoints[t].y, c < b.min && (b.min = c), c > b.max && (b.max = c), k.dataPointEOs[t].cumulativeSum < d.min && (d.min = k.dataPointEOs[t].cumulativeSum),
                            k.dataPointEOs[t].cumulativeSum > d.max && (d.max = k.dataPointEOs[t].cumulativeSum), 0 < t && (a.axisX.logarithmic ? (q = c / k.dataPoints[t - 1].x, 1 > q && (q = 1 / q), b.minDiff > q && 1 !== q && (b.minDiff = q)) : (q = c - k.dataPoints[t - 1].x, 0 > q && (q *= -1), b.minDiff > q && 0 !== q && (b.minDiff = q)), null !== e && null !== k.dataPoints[t - 1].y && (a.axisY.logarithmic ? (e = k.dataPointEOs[t].cumulativeSum / k.dataPointEOs[t - 1].cumulativeSum, 1 > e && (e = 1 / e), d.minDiff > e && 1 !== e && (d.minDiff = e)) : (e = k.dataPointEOs[t].cumulativeSum - k.dataPointEOs[t - 1].cumulativeSum, 0 > e &&
                                (e *= -1), d.minDiff > e && 0 !== e && (d.minDiff = e)))), !(c < n) || l) {
                            if (!l && (l = !0, 0 < t)) {
                                t -= 2;
                                continue
                            }
                            if (c > f && !u) u = !0;
                            else if (c > f && u) continue;
                            k.dataPoints[t].label && (a.axisX.labels[c] = k.dataPoints[t].label);
                            c < b.viewPortMin && (b.viewPortMin = c);
                            c > b.viewPortMax && (b.viewPortMax = c);
                            0 < t && (k.dataPointEOs[t - 1].cumulativeSum < d.viewPortMin && (d.viewPortMin = k.dataPointEOs[t - 1].cumulativeSum), k.dataPointEOs[t - 1].cumulativeSum > d.viewPortMax && (d.viewPortMax = k.dataPointEOs[t - 1].cumulativeSum));
                            k.dataPointEOs[t].cumulativeSum <
                                d.viewPortMin && (d.viewPortMin = k.dataPointEOs[t].cumulativeSum);
                            k.dataPointEOs[t].cumulativeSum > d.viewPortMax && (d.viewPortMax = k.dataPointEOs[t].cumulativeSum)
                        }
                    k.axisX.valueType = k.xValueType = g ? "dateTime" : "number"
                }
        };
        m.prototype.calculateAutoBreaks = function() {
            function a(a, c, b, e) {
                if (e) return b = Math.pow(Math.min(b * a / c, c / a), 0.2), 1 >= b && (b = Math.pow(1 > a ? 1 / a : Math.min(c / a, a), 0.25)), {
                    startValue: a * b,
                    endValue: c / b
                };
                b = 0.2 * Math.min(b - c + a, c - a);
                0 >= b && (b = 0.25 * Math.min(c - a, Math.abs(a)));
                return {
                    startValue: a + b,
                    endValue: c -
                        b
                }
            }

            function d(a) {
                if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) {
                    var c = a.axisX.scaleBreaks && a.axisX.scaleBreaks.autoCalculate && 1 <= a.axisX.scaleBreaks.maxNumberOfAutoBreaks,
                        b = a.axisY.scaleBreaks && a.axisY.scaleBreaks.autoCalculate && 1 <= a.axisY.scaleBreaks.maxNumberOfAutoBreaks;
                    if (c || b)
                        for (var d = a.axisY.dataInfo, f = a.axisX.dataInfo, g, l = f.min, k = f.max, h = d.min, n = d.max, f = f._dataRanges, d = d._dataRanges, q, t = 0, u = 0; u < a.dataSeriesIndexes.length; u++) {
                            var p = e.data[a.dataSeriesIndexes[u]];
                            if (!(4 > p.dataPoints.length))
                                for (t =
                                    0; t < p.dataPoints.length; t++)
                                    if (c && (q = (k + 1 - l) * Math.max(parseFloat(a.axisX.scaleBreaks.collapsibleThreshold) || 10, 10) / 100, g = p.dataPoints[t].x.getTime ? p.dataPoints[t].x.getTime() : p.dataPoints[t].x, q = Math.floor((g - l) / q), g < f[q].min && (f[q].min = g), g > f[q].max && (f[q].max = g)), b) {
                                        var r = (n + 1 - h) * Math.max(parseFloat(a.axisY.scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
                                        if ((g = "waterfall" === a.type ? p.dataPointEOs[t].cumulativeSum : p.dataPoints[t].y) && g.length)
                                            for (var m = 0; m < g.length; m++) q = Math.floor((g[m] - h) / r), g[m] <
                                                d[q].min && (d[q].min = g[m]), g[m] > d[q].max && (d[q].max = g[m]);
                                        else v(g) || (q = Math.floor((g - h) / r), g < d[q].min && (d[q].min = g), g > d[q].max && (d[q].max = g))
                                    }
                        }
                }
            }

            function b(a) {
                if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length) && a.axisX.scaleBreaks && a.axisX.scaleBreaks.autoCalculate && 1 <= a.axisX.scaleBreaks.maxNumberOfAutoBreaks)
                    for (var c = a.axisX.dataInfo, b = c.min, d = c.max, f = c._dataRanges, g, l = 0, k = 0; k < a.dataSeriesIndexes.length; k++) {
                        var h = e.data[a.dataSeriesIndexes[k]];
                        if (!(4 > h.dataPoints.length))
                            for (l = 0; l < h.dataPoints.length; l++) g =
                                (d + 1 - b) * Math.max(parseFloat(a.axisX.scaleBreaks.collapsibleThreshold) || 10, 10) / 100, c = h.dataPoints[l].x.getTime ? h.dataPoints[l].x.getTime() : h.dataPoints[l].x, g = Math.floor((c - b) / g), c < f[g].min && (f[g].min = c), c > f[g].max && (f[g].max = c)
                    }
            }
            for (var c, e = this, g = !1, h = 0; h < this._axes.length; h++)
                if (this._axes[h].scaleBreaks && this._axes[h].scaleBreaks.autoCalculate && 1 <= this._axes[h].scaleBreaks.maxNumberOfAutoBreaks) {
                    g = !0;
                    this._axes[h].dataInfo._dataRanges = [];
                    for (var k = 0; k < 100 / Math.max(parseFloat(this._axes[h].scaleBreaks.collapsibleThreshold) ||
                            10, 10); k++) this._axes[h].dataInfo._dataRanges.push({
                        min: Infinity,
                        max: -Infinity
                    })
                }
            if (g) {
                for (h = 0; h < this.plotInfo.plotTypes.length; h++)
                    for (g = this.plotInfo.plotTypes[h], k = 0; k < g.plotUnits.length; k++) c = g.plotUnits[k], "line" === c.type || "stepLine" === c.type || "spline" === c.type || "column" === c.type || "area" === c.type || "stepArea" === c.type || "splineArea" === c.type || "bar" === c.type || "bubble" === c.type || "scatter" === c.type || "candlestick" === c.type || "ohlc" === c.type || "rangeColumn" === c.type || "rangeBar" === c.type || "rangeArea" ===
                        c.type || "rangeSplineArea" === c.type || "waterfall" === c.type || "error" === c.type || "boxAndWhisker" === c.type ? d(c) : 0 <= c.type.indexOf("stacked") && b(c);
                for (h = 0; h < this._axes.length; h++)
                    if (this._axes[h].dataInfo._dataRanges) {
                        var t = this._axes[h].dataInfo.min;
                        c = (this._axes[h].dataInfo.max + 1 - t) * Math.max(parseFloat(this._axes[h].scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
                        var l = this._axes[h].dataInfo._dataRanges,
                            u, q, g = [];
                        if (this._axes[h].dataInfo.dataPointYPositiveSums) {
                            var n = this._axes[h].dataInfo.dataPointYPositiveSums;
                            u = l;
                            for (k in n)
                                if (n.hasOwnProperty(k) && !isNaN(k) && (q = n[k], !v(q))) {
                                    var f = Math.floor((q - t) / c);
                                    q < u[f].min && (u[f].min = q);
                                    q > u[f].max && (u[f].max = q)
                                }
                            delete this._axes[h].dataInfo.dataPointYPositiveSums
                        }
                        if (this._axes[h].dataInfo.dataPointYNegativeSums) {
                            n = this._axes[h].dataInfo.dataPointYNegativeSums;
                            u = l;
                            for (k in n) n.hasOwnProperty(k) && !isNaN(k) && (q = -1 * n[k], v(q) || (f = Math.floor((q - t) / c), q < u[f].min && (u[f].min = q), q > u[f].max && (u[f].max = q)));
                            delete this._axes[h].dataInfo.dataPointYNegativeSums
                        }
                        for (k = 0; k < l.length -
                            1; k++)
                            if (u = l[k].max, isFinite(u))
                                for (; k < l.length - 1;)
                                    if (t = l[k + 1].min, isFinite(t)) {
                                        q = t - u;
                                        q > c && g.push({
                                            diff: q,
                                            start: u,
                                            end: t
                                        });
                                        break
                                    } else k++;
                        if (this._axes[h].scaleBreaks.customBreaks)
                            for (k = 0; k < this._axes[h].scaleBreaks.customBreaks.length; k++)
                                for (c = 0; c < g.length; c++)
                                    if (this._axes[h].scaleBreaks.customBreaks[k].startValue <= g[c].start && g[c].start <= this._axes[h].scaleBreaks.customBreaks[k].endValue || this._axes[h].scaleBreaks.customBreaks[k].startValue <= g[c].start && g[c].start <= this._axes[h].scaleBreaks.customBreaks[k].endValue ||
                                        g[c].start <= this._axes[h].scaleBreaks.customBreaks[k].startValue && this._axes[h].scaleBreaks.customBreaks[k].startValue <= g[c].end || g[c].start <= this._axes[h].scaleBreaks.customBreaks[k].endValue && this._axes[h].scaleBreaks.customBreaks[k].endValue <= g[c].end) g.splice(c, 1), c--;
                        g.sort(function(a, c) {
                            return c.diff - a.diff
                        });
                        for (k = 0; k < Math.min(g.length, this._axes[h].scaleBreaks.maxNumberOfAutoBreaks); k++) c = a(g[k].start, g[k].end, this._axes[h].logarithmic ? this._axes[h].dataInfo.max / this._axes[h].dataInfo.min :
                            this._axes[h].dataInfo.max - this._axes[h].dataInfo.min, this._axes[h].logarithmic), this._axes[h].scaleBreaks.autoBreaks.push(new L(this, "autoBreaks", c, k, ++this._eventManager.lastObjectId, this._axes[h].scaleBreaks)), this._axes[h].scaleBreaks._appliedBreaks.push(this._axes[h].scaleBreaks.autoBreaks[this._axes[h].scaleBreaks.autoBreaks.length - 1]);
                        this._axes[h].scaleBreaks._appliedBreaks.sort(function(a, c) {
                            return a.startValue - c.startValue
                        })
                    }
            }
        };
        m.prototype.getDataPointAtXY = function(a, d, b) {
            b = b || !1;
            for (var c = [], e = this._dataInRenderedOrder.length - 1; 0 <= e; e--) {
                var g = null;
                (g = this._dataInRenderedOrder[e].getDataPointAtXY(a, d, b)) && c.push(g)
            }
            a = null;
            d = !1;
            for (b = 0; b < c.length; b++)
                if ("line" === c[b].dataSeries.type || "stepLine" === c[b].dataSeries.type || "area" === c[b].dataSeries.type || "stepArea" === c[b].dataSeries.type)
                    if (e = na("markerSize", c[b].dataPoint, c[b].dataSeries) || 8, c[b].distance <= e / 2) {
                        d = !0;
                        break
                    }
            for (b = 0; b < c.length; b++) d && "line" !== c[b].dataSeries.type && "stepLine" !== c[b].dataSeries.type && "area" !== c[b].dataSeries.type &&
                "stepArea" !== c[b].dataSeries.type || (a ? c[b].distance <= a.distance && (a = c[b]) : a = c[b]);
            return a
        };
        m.prototype.getObjectAtXY = function(a, d, b) {
            var c = null;
            if (b = this.getDataPointAtXY(a, d, b || !1)) c = b.dataSeries.dataPointIds[b.dataPointIndex];
            else if (r) c = ab(a, d, this._eventManager.ghostCtx);
            else
                for (b = 0; b < this.legend.items.length; b++) {
                    var e = this.legend.items[b];
                    a >= e.x1 && (a <= e.x2 && d >= e.y1 && d <= e.y2) && (c = e.id)
                }
            return c
        };
        m.prototype.getAutoFontSize = lb;
        m.prototype.resetOverlayedCanvas = function() {
            this.overlaidCanvasCtx.clearRect(0,
                0, this.width, this.height)
        };
        m.prototype.clearCanvas = kb;
        m.prototype.attachEvent = function(a) {
            this._events.push(a)
        };
        m.prototype._touchEventHandler = function(a) {
            if (a.changedTouches && this.interactivityEnabled) {
                var d = [],
                    b = a.changedTouches,
                    c = b ? b[0] : a,
                    e = null;
                switch (a.type) {
                    case "touchstart":
                    case "MSPointerDown":
                        d = ["mousemove", "mousedown"];
                        this._lastTouchData = Ra(c);
                        this._lastTouchData.time = new Date;
                        break;
                    case "touchmove":
                    case "MSPointerMove":
                        d = ["mousemove"];
                        break;
                    case "touchend":
                    case "MSPointerUp":
                        var g = this._lastTouchData &&
                            this._lastTouchData.time ? new Date - this._lastTouchData.time : 0,
                            d = "touchstart" === this._lastTouchEventType || "MSPointerDown" === this._lastTouchEventType || 300 > g ? ["mouseup", "click"] : ["mouseup"];
                        break;
                    default:
                        return
                }
                if (!(b && 1 < b.length)) {
                    e = Ra(c);
                    e.time = new Date;
                    try {
                        var h = e.y - this._lastTouchData.y,
                            g = e.time - this._lastTouchData.time;
                        if (1 < Math.abs(h) && this._lastTouchData.scroll || 5 < Math.abs(h) && 250 > g) this._lastTouchData.scroll = !0
                    } catch (k) {}
                    this._lastTouchEventType = a.type;
                    if (this._lastTouchData.scroll && this.zoomEnabled) this.isDrag &&
                        this.resetOverlayedCanvas(), this.isDrag = !1;
                    else
                        for (b = 0; b < d.length; b++)
                            if (e = d[b], h = document.createEvent("MouseEvent"), h.initMouseEvent(e, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), c.target.dispatchEvent(h), !v(this._lastTouchData.scroll) && !this._lastTouchData.scroll || !this._lastTouchData.scroll && 250 < g || "click" === e) a.preventManipulation && a.preventManipulation(), a.preventDefault && a.preventDefault()
                }
            }
        };
        m.prototype._dispatchRangeEvent = function(a, d) {
            var b = {
                chart: this
            };
            b.type =
                a;
            b.trigger = d;
            var c = [];
            this.axisX && 0 < this.axisX.length && c.push("axisX");
            this.axisX2 && 0 < this.axisX2.length && c.push("axisX2");
            this.axisY && 0 < this.axisY.length && c.push("axisY");
            this.axisY2 && 0 < this.axisY2.length && c.push("axisY2");
            for (var e = 0; e < c.length; e++)
                if (v(b[c[e]]) && (b[c[e]] = []), "axisY" === c[e])
                    for (var g = 0; g < this.axisY.length; g++) b[c[e]].push({
                        viewportMinimum: this[c[e]][g].sessionVariables.newViewportMinimum,
                        viewportMaximum: this[c[e]][g].sessionVariables.newViewportMaximum
                    });
                else if ("axisY2" === c[e])
                for (g =
                    0; g < this.axisY2.length; g++) b[c[e]].push({
                    viewportMinimum: this[c[e]][g].sessionVariables.newViewportMinimum,
                    viewportMaximum: this[c[e]][g].sessionVariables.newViewportMaximum
                });
            else if ("axisX" === c[e])
                for (g = 0; g < this.axisX.length; g++) b[c[e]].push({
                    viewportMinimum: this[c[e]][g].sessionVariables.newViewportMinimum,
                    viewportMaximum: this[c[e]][g].sessionVariables.newViewportMaximum
                });
            else if ("axisX2" === c[e])
                for (g = 0; g < this.axisX2.length; g++) b[c[e]].push({
                    viewportMinimum: this[c[e]][g].sessionVariables.newViewportMinimum,
                    viewportMaximum: this[c[e]][g].sessionVariables.newViewportMaximum
                });
            this.dispatchEvent(a, b, this)
        };
        m.prototype._mouseEventHandler = function(a) {
            "undefined" === typeof a.target && a.srcElement && (a.target = a.srcElement);
            var d = Ra(a),
                b = a.type,
                c, e;
            a.which ? e = 3 == a.which : a.button && (e = 2 == a.button);
            m.capturedEventParam && (c = m.capturedEventParam, "mouseup" === b && (m.capturedEventParam = null, c.chart.overlaidCanvas.releaseCapture ? c.chart.overlaidCanvas.releaseCapture() : document.documentElement.removeEventListener("mouseup",
                c.chart._mouseEventHandler, !1)), c.hasOwnProperty(b) && ("mouseup" !== b || c.chart.overlaidCanvas.releaseCapture ? a.target !== c.chart.overlaidCanvas && r || c[b].call(c.context, d.x, d.y) : a.target !== c.chart.overlaidCanvas && (c.chart.isDrag = !1)));
            if (this.interactivityEnabled)
                if (this._ignoreNextEvent) this._ignoreNextEvent = !1;
                else if (a.preventManipulation && a.preventManipulation(), a.preventDefault && a.preventDefault(), Ja && window.console && (window.console.log(b + " --\x3e x: " + d.x + "; y:" + d.y), e && window.console.log(a.which),
                    "mouseup" === b && window.console.log("mouseup")), !e) {
                if (!m.capturedEventParam && this._events) {
                    for (var g = 0; g < this._events.length; g++)
                        if (this._events[g].hasOwnProperty(b))
                            if (c = this._events[g], e = c.bounds, d.x >= e.x1 && d.x <= e.x2 && d.y >= e.y1 && d.y <= e.y2) {
                                c[b].call(c.context, d.x, d.y);
                                "mousedown" === b && !0 === c.capture ? (m.capturedEventParam = c, this.overlaidCanvas.setCapture ? this.overlaidCanvas.setCapture() : document.documentElement.addEventListener("mouseup", this._mouseEventHandler, !1)) : "mouseup" === b && (c.chart.overlaidCanvas.releaseCapture ?
                                    c.chart.overlaidCanvas.releaseCapture() : document.documentElement.removeEventListener("mouseup", this._mouseEventHandler, !1));
                                break
                            } else c = null;
                    a.target.style.cursor = c && c.cursor ? c.cursor : this._defaultCursor
                }
                b = this.plotArea;
                if (d.x < b.x1 || d.x > b.x2 || d.y < b.y1 || d.y > b.y2) this.toolTip && this.toolTip.enabled ? this.toolTip.hide() : this.resetOverlayedCanvas();
                this.isDrag && this.zoomEnabled || !this._eventManager || this._eventManager.mouseEventHandler(a)
            }
        };
        m.prototype._plotAreaMouseDown = function(a, d) {
            this.isDrag = !0;
            this.dragStartPoint = {
                x: a,
                y: d
            }
        };
        m.prototype._plotAreaMouseUp = function(a, d) {
            if (("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) && this.isDrag) {
                var b = d - this.dragStartPoint.y,
                    c = a - this.dragStartPoint.x,
                    e = 0 <= this.zoomType.indexOf("x"),
                    g = 0 <= this.zoomType.indexOf("y"),
                    h = !1;
                this.resetOverlayedCanvas();
                if ("xySwapped" === this.plotInfo.axisPlacement) var k = g,
                    g = e,
                    e = k;
                if (this.panEnabled || this.zoomEnabled) {
                    if (this.panEnabled)
                        for (e = g = 0; e < this._axes.length; e++) b = this._axes[e], b.logarithmic ? b.viewportMinimum <
                            b.minimum ? (g = b.minimum / b.viewportMinimum, b.sessionVariables.newViewportMinimum = b.viewportMinimum * g, b.sessionVariables.newViewportMaximum = b.viewportMaximum * g, h = !0) : b.viewportMaximum > b.maximum && (g = b.viewportMaximum / b.maximum, b.sessionVariables.newViewportMinimum = b.viewportMinimum / g, b.sessionVariables.newViewportMaximum = b.viewportMaximum / g, h = !0) : b.viewportMinimum < b.minimum ? (g = b.minimum - b.viewportMinimum, b.sessionVariables.newViewportMinimum = b.viewportMinimum + g, b.sessionVariables.newViewportMaximum = b.viewportMaximum +
                                g, h = !0) : b.viewportMaximum > b.maximum && (g = b.viewportMaximum - b.maximum, b.sessionVariables.newViewportMinimum = b.viewportMinimum - g, b.sessionVariables.newViewportMaximum = b.viewportMaximum - g, h = !0);
                    else if ((!e || 2 < Math.abs(c)) && (!g || 2 < Math.abs(b)) && this.zoomEnabled) {
                        if (!this.dragStartPoint) return;
                        b = e ? this.dragStartPoint.x : this.plotArea.x1;
                        c = g ? this.dragStartPoint.y : this.plotArea.y1;
                        e = e ? a : this.plotArea.x2;
                        g = g ? d : this.plotArea.y2;
                        2 < Math.abs(b - e) && 2 < Math.abs(c - g) && this._zoomPanToSelectedRegion(b, c, e, g) && (h = !0)
                    }
                    h &&
                        (this._ignoreNextEvent = !0, this._dispatchRangeEvent("rangeChanging", "zoom"), this.render(), this._dispatchRangeEvent("rangeChanged", "zoom"), h && (this.zoomEnabled && "none" === this._zoomButton.style.display) && (Qa(this._zoomButton, this._resetButton), ua(this, this._zoomButton, "pan"), ua(this, this._resetButton, "reset")))
                }
            }
            this.isDrag = !1;
            if ("none" !== this.plotInfo.axisPlacement) {
                this.resetOverlayedCanvas();
                if (this.axisX && 0 < this.axisX.length)
                    for (h = 0; h < this.axisX.length; h++) this.axisX[h].crosshair && this.axisX[h].crosshair.enabled &&
                        this.axisX[h].renderCrosshair(a, d);
                if (this.axisX2 && 0 < this.axisX2.length)
                    for (h = 0; h < this.axisX2.length; h++) this.axisX2[h].crosshair && this.axisX2[h].crosshair.enabled && this.axisX2[h].renderCrosshair(a, d);
                if (this.axisY && 0 < this.axisY.length)
                    for (h = 0; h < this.axisY.length; h++) this.axisY[h].crosshair && this.axisY[h].crosshair.enabled && this.axisY[h].renderCrosshair(a, d);
                if (this.axisY2 && 0 < this.axisY2.length)
                    for (h = 0; h < this.axisY2.length; h++) this.axisY2[h].crosshair && this.axisY2[h].crosshair.enabled && this.axisY2[h].renderCrosshair(a,
                        d)
            }
        };
        m.prototype._plotAreaMouseMove = function(a, d) {
            if (this.isDrag && "none" !== this.plotInfo.axisPlacement) {
                var b = 0,
                    c = 0,
                    e = b = null,
                    e = 0 <= this.zoomType.indexOf("x"),
                    g = 0 <= this.zoomType.indexOf("y"),
                    h = this;
                "xySwapped" === this.plotInfo.axisPlacement && (b = g, g = e, e = b);
                b = this.dragStartPoint.x - a;
                c = this.dragStartPoint.y - d;
                2 < Math.abs(b) && 8 > Math.abs(b) && (this.panEnabled || this.zoomEnabled) ? this.toolTip.hide() : this.panEnabled || this.zoomEnabled || this.toolTip.mouseMoveHandler(a, d);
                if ((!e || 2 < Math.abs(b) || !g || 2 < Math.abs(c)) &&
                    (this.panEnabled || this.zoomEnabled))
                    if (this.panEnabled) e = {
                        x1: e ? this.plotArea.x1 + b : this.plotArea.x1,
                        y1: g ? this.plotArea.y1 + c : this.plotArea.y1,
                        x2: e ? this.plotArea.x2 + b : this.plotArea.x2,
                        y2: g ? this.plotArea.y2 + c : this.plotArea.y2
                    }, clearTimeout(h._panTimerId), h._panTimerId = setTimeout(function(c, b, e, f) {
                        return function() {
                            h._zoomPanToSelectedRegion(c, b, e, f, !0) && (h._dispatchRangeEvent("rangeChanging", "pan"), h.render(), h._dispatchRangeEvent("rangeChanged", "pan"), h.dragStartPoint.x = a, h.dragStartPoint.y = d)
                        }
                    }(e.x1,
                        e.y1, e.x2, e.y2), 0);
                    else if (this.zoomEnabled) {
                    this.resetOverlayedCanvas();
                    b = this.overlaidCanvasCtx.globalAlpha;
                    this.overlaidCanvasCtx.fillStyle = "#A89896";
                    var c = e ? this.dragStartPoint.x : this.plotArea.x1,
                        k = g ? this.dragStartPoint.y : this.plotArea.y1,
                        t = e ? a - this.dragStartPoint.x : this.plotArea.x2 - this.plotArea.x1,
                        l = g ? d - this.dragStartPoint.y : this.plotArea.y2 - this.plotArea.y1;
                    this.validateRegion(c, k, e ? a : this.plotArea.x2 - this.plotArea.x1, g ? d : this.plotArea.y2 - this.plotArea.y1, "xy" !== this.zoomType).isValid && (this.resetOverlayedCanvas(),
                        this.overlaidCanvasCtx.fillStyle = "#99B2B5");
                    this.overlaidCanvasCtx.globalAlpha = 0.7;
                    this.overlaidCanvasCtx.fillRect(c, k, t, l);
                    this.overlaidCanvasCtx.globalAlpha = b
                }
            } else if (this.toolTip.mouseMoveHandler(a, d), "none" !== this.plotInfo.axisPlacement) {
                if (this.axisX && 0 < this.axisX.length)
                    for (e = 0; e < this.axisX.length; e++) this.axisX[e].crosshair && this.axisX[e].crosshair.enabled && this.axisX[e].renderCrosshair(a, d);
                if (this.axisX2 && 0 < this.axisX2.length)
                    for (e = 0; e < this.axisX2.length; e++) this.axisX2[e].crosshair && this.axisX2[e].crosshair.enabled &&
                        this.axisX2[e].renderCrosshair(a, d);
                if (this.axisY && 0 < this.axisY.length)
                    for (e = 0; e < this.axisY.length; e++) this.axisY[e].crosshair && this.axisY[e].crosshair.enabled && this.axisY[e].renderCrosshair(a, d);
                if (this.axisY2 && 0 < this.axisY2.length)
                    for (e = 0; e < this.axisY2.length; e++) this.axisY2[e].crosshair && this.axisY2[e].crosshair.enabled && this.axisY2[e].renderCrosshair(a, d)
            }
        };
        m.prototype._zoomPanToSelectedRegion = function(a, d, b, c, e) {
            a = this.validateRegion(a, d, b, c, e);
            d = a.axesWithValidRange;
            b = a.axesRanges;
            if (a.isValid)
                for (c =
                    0; c < d.length; c++) e = b[c], d[c].setViewPortRange(e.val1, e.val2), this.syncCharts && this.syncCharts(e.val1, e.val2);
            return a.isValid
        };
        m.prototype.validateRegion = function(a, d, b, c, e) {
            e = e || !1;
            for (var g = 0 <= this.zoomType.indexOf("x"), h = 0 <= this.zoomType.indexOf("y"), k = !1, t = [], l = [], u = [], q = 0; q < this._axes.length; q++)("axisX" === this._axes[q].type && g || "axisY" === this._axes[q].type && h) && l.push(this._axes[q]);
            for (h = 0; h < l.length; h++) {
                var q = l[h],
                    g = !1,
                    n = q.convertPixelToValue({
                        x: a,
                        y: d
                    }),
                    f = q.convertPixelToValue({
                        x: b,
                        y: c
                    });
                if (n > f) var A = f,
                    f = n,
                    n = A;
                if (q.scaleBreaks)
                    for (A = 0; !g && A < q.scaleBreaks._appliedBreaks.length; A++) g = q.scaleBreaks._appliedBreaks[A].startValue <= n && q.scaleBreaks._appliedBreaks[A].endValue >= f;
                if (isFinite(q.dataInfo.minDiff))
                    if (A = q.getApparentDifference(n, f, null, !0), !(g || !(this.panEnabled && q.scaleBreaks && q.scaleBreaks._appliedBreaks.length) && (q.logarithmic && A < Math.pow(q.dataInfo.minDiff, 3) || !q.logarithmic && A < 3 * Math.abs(q.dataInfo.minDiff)) || n < q.minimum || f > q.maximum)) t.push(q), u.push({
                        val1: n,
                        val2: f
                    }), k = !0;
                    else if (!e) {
                    k = !1;
                    break
                }
            }
            return {
                isValid: k,
                axesWithValidRange: t,
                axesRanges: u
            }
        };
        m.prototype.preparePlotArea = function() {
            var a = this.plotArea;
            !r && (0 < a.x1 || 0 < a.y1) && a.ctx.translate(a.x1, a.y1);
            if ((this.axisX[0] || this.axisX2[0]) && (this.axisY[0] || this.axisY2[0])) {
                var d = this.axisX[0] ? this.axisX[0].lineCoordinates : this.axisX2[0].lineCoordinates;
                if (this.axisY && 0 < this.axisY.length && this.axisY[0]) {
                    var b = this.axisY[0];
                    a.x1 = d.x1 < d.x2 ? d.x1 : b.lineCoordinates.x1;
                    a.y1 = d.y1 < b.lineCoordinates.y1 ? d.y1 : b.lineCoordinates.y1;
                    a.x2 = d.x2 > b.lineCoordinates.x2 ? d.x2 : b.lineCoordinates.x2;
                    a.y2 = d.y2 > d.y1 ? d.y2 : b.lineCoordinates.y2;
                    a.width = a.x2 - a.x1;
                    a.height = a.y2 - a.y1
                }
                this.axisY2 && 0 < this.axisY2.length && this.axisY2[0] && (b = this.axisY2[0], a.x1 = d.x1 < d.x2 ? d.x1 : b.lineCoordinates.x1, a.y1 = d.y1 < b.lineCoordinates.y1 ? d.y1 : b.lineCoordinates.y1, a.x2 = d.x2 > b.lineCoordinates.x2 ? d.x2 : b.lineCoordinates.x2, a.y2 = d.y2 > d.y1 ? d.y2 : b.lineCoordinates.y2, a.width = a.x2 - a.x1, a.height = a.y2 - a.y1)
            } else d = this.layoutManager.getFreeSpace(), a.x1 = d.x1, a.x2 = d.x2, a.y1 =
                d.y1, a.y2 = d.y2, a.width = d.width, a.height = d.height;
            r || (a.canvas.width = a.width, a.canvas.height = a.height, a.canvas.style.left = a.x1 + "px", a.canvas.style.top = a.y1 + "px", (0 < a.x1 || 0 < a.y1) && a.ctx.translate(-a.x1, -a.y1));
            a.layoutManager = new Ga(a.x1, a.y1, a.x2, a.y2, 2)
        };
        m.prototype.renderIndexLabels = function(a) {
            var d = a || this.plotArea.ctx,
                b = this.plotArea,
                c = 0,
                e = 0,
                g = 0,
                h = 0,
                k = c = h = e = g = 0,
                t = 0;
            for (a = 0; a < this._indexLabels.length; a++) {
                var l = this._indexLabels[a],
                    u = l.chartType.toLowerCase(),
                    q, n, k = na("indexLabelFontColor", l.dataPoint,
                        l.dataSeries),
                    t = na("indexLabelFontSize", l.dataPoint, l.dataSeries);
                q = na("indexLabelFontFamily", l.dataPoint, l.dataSeries);
                n = na("indexLabelFontStyle", l.dataPoint, l.dataSeries);
                var h = na("indexLabelFontWeight", l.dataPoint, l.dataSeries),
                    f = na("indexLabelBackgroundColor", l.dataPoint, l.dataSeries),
                    e = na("indexLabelMaxWidth", l.dataPoint, l.dataSeries),
                    g = na("indexLabelWrap", l.dataPoint, l.dataSeries),
                    A = na("indexLabelLineDashType", l.dataPoint, l.dataSeries),
                    p = na("indexLabelLineColor", l.dataPoint, l.dataSeries),
                    m =
                    v(l.dataPoint.indexLabelLineThickness) ? v(l.dataSeries.options.indexLabelLineThickness) ? 0 : l.dataSeries.options.indexLabelLineThickness : l.dataPoint.indexLabelLineThickness,
                    c = 0 < m ? Math.min(10, ("normal" === this.plotInfo.axisPlacement ? this.plotArea.height : this.plotArea.width) << 0) : 0,
                    s = {
                        percent: null,
                        total: null
                    },
                    C = null;
                if (0 <= l.dataSeries.type.indexOf("stacked") || "pie" === l.dataSeries.type || "doughnut" === l.dataSeries.type) s = this.getPercentAndTotal(l.dataSeries, l.dataPoint);
                if (l.dataSeries.indexLabelFormatter ||
                    l.dataPoint.indexLabelFormatter) C = {
                    chart: this,
                    dataSeries: l.dataSeries,
                    dataPoint: l.dataPoint,
                    index: l.indexKeyword,
                    total: s.total,
                    percent: s.percent
                };
                var x = l.dataPoint.indexLabelFormatter ? l.dataPoint.indexLabelFormatter(C) : l.dataPoint.indexLabel ? this.replaceKeywordsWithValue(l.dataPoint.indexLabel, l.dataPoint, l.dataSeries, null, l.indexKeyword) : l.dataSeries.indexLabelFormatter ? l.dataSeries.indexLabelFormatter(C) : l.dataSeries.indexLabel ? this.replaceKeywordsWithValue(l.dataSeries.indexLabel, l.dataPoint, l.dataSeries,
                    null, l.indexKeyword) : null;
                if (null !== x && "" !== x) {
                    var s = na("indexLabelPlacement", l.dataPoint, l.dataSeries),
                        C = na("indexLabelOrientation", l.dataPoint, l.dataSeries),
                        ma = l.direction,
                        z = l.dataSeries.axisX,
                        B = l.dataSeries.axisY,
                        w = !1,
                        f = new ka(d, {
                            x: 0,
                            y: 0,
                            maxWidth: e ? e : 0.5 * this.width,
                            maxHeight: g ? 5 * t : 1.5 * t,
                            angle: "horizontal" === C ? 0 : -90,
                            text: x,
                            padding: 0,
                            backgroundColor: f,
                            horizontalAlign: "left",
                            fontSize: t,
                            fontFamily: q,
                            fontWeight: h,
                            fontColor: k,
                            fontStyle: n,
                            textBaseline: "top"
                        });
                    f.measureText();
                    l.dataSeries.indexLabelMaxWidth =
                        f.maxWidth;
                    if ("stackedarea100" === u) {
                        if (l.point.x < b.x1 || l.point.x > b.x2 || l.point.y < b.y1 - 1 || l.point.y > b.y2 + 1) continue
                    } else if ("rangearea" === u || "rangesplinearea" === u) {
                        if (l.dataPoint.x < z.viewportMinimum || l.dataPoint.x > z.viewportMaximum || Math.max.apply(null, l.dataPoint.y) < B.viewportMinimum || Math.min.apply(null, l.dataPoint.y) > B.viewportMaximum) continue
                    } else if (0 <= u.indexOf("line") || 0 <= u.indexOf("area") || 0 <= u.indexOf("bubble") || 0 <= u.indexOf("scatter")) {
                        if (l.dataPoint.x < z.viewportMinimum || l.dataPoint.x > z.viewportMaximum ||
                            l.dataPoint.y < B.viewportMinimum || l.dataPoint.y > B.viewportMaximum) continue
                    } else if (0 <= u.indexOf("column") || "waterfall" === u || "error" === u && !l.axisSwapped) {
                        if (l.dataPoint.x < z.viewportMinimum || l.dataPoint.x > z.viewportMaximum || l.bounds.y1 > b.y2 || l.bounds.y2 < b.y1) continue
                    } else if (0 <= u.indexOf("bar") || "error" === u) {
                        if (l.dataPoint.x < z.viewportMinimum || l.dataPoint.x > z.viewportMaximum || l.bounds.x1 > b.x2 || l.bounds.x2 < b.x1) continue
                    } else if ("candlestick" === u || "ohlc" === u) {
                        if (l.dataPoint.x < z.viewportMinimum || l.dataPoint.x >
                            z.viewportMaximum || Math.max.apply(null, l.dataPoint.y) < B.viewportMinimum || Math.min.apply(null, l.dataPoint.y) > B.viewportMaximum) continue
                    } else if (l.dataPoint.x < z.viewportMinimum || l.dataPoint.x > z.viewportMaximum) continue;
                    e = h = 2;
                    "horizontal" === C ? (k = f.width, t = f.height) : (t = f.width, k = f.height);
                    if ("normal" === this.plotInfo.axisPlacement) {
                        if (0 <= u.indexOf("line") || 0 <= u.indexOf("area")) s = "auto", h = 4;
                        else if (0 <= u.indexOf("stacked")) "auto" === s && (s = "inside");
                        else if ("bubble" === u || "scatter" === u) s = "inside";
                        q = l.point.x -
                            k / 2;
                        "inside" !== s ? (e = b.y1, g = b.y2, 0 < ma ? (n = l.point.y - t - h - c, n < e && (n = "auto" === s ? Math.max(l.point.y, e) + h + c : e + h + c, w = n + t > l.point.y)) : (n = l.point.y + h + c, n > g - t - h - c && (n = "auto" === s ? Math.min(l.point.y, g) - t - h - c : g - t - h - c, w = n < l.point.y))) : (e = Math.max(l.bounds.y1, b.y1), g = Math.min(l.bounds.y2, b.y2), c = 0 <= u.indexOf("range") || "error" === u ? 0 < ma ? Math.max(l.bounds.y1, b.y1) + t / 2 + h : Math.min(l.bounds.y2, b.y2) - t / 2 - h : (Math.max(l.bounds.y1, b.y1) + Math.min(l.bounds.y2, b.y2)) / 2, 0 < ma ? (n = Math.max(l.point.y, c) - t / 2, n < e && ("bubble" === u || "scatter" ===
                            u) && (n = Math.max(l.point.y - t - h, b.y1 + h))) : (n = Math.min(l.point.y, c) - t / 2, n > g - t - h && ("bubble" === u || "scatter" === u) && (n = Math.min(l.point.y + h, b.y2 - t - h))), n = Math.min(n, g - t))
                    } else 0 <= u.indexOf("line") || 0 <= u.indexOf("area") || 0 <= u.indexOf("scatter") ? (s = "auto", e = 4) : 0 <= u.indexOf("stacked") ? "auto" === s && (s = "inside") : "bubble" === u && (s = "inside"), n = l.point.y - t / 2, "inside" !== s ? (h = b.x1, g = b.x2, 0 > ma ? (q = l.point.x - k - e - c, q < h && (q = "auto" === s ? Math.max(l.point.x, h) + e + c : h + e + c, w = q + k > l.point.x)) : (q = l.point.x + e + c, q > g - k - e - c && (q = "auto" ===
                        s ? Math.min(l.point.x, g) - k - e - c : g - k - e - c, w = q < l.point.x))) : (h = Math.max(l.bounds.x1, b.x1), Math.min(l.bounds.x2, b.x2), c = 0 <= u.indexOf("range") || "error" === u ? 0 > ma ? Math.max(l.bounds.x1, b.x1) + k / 2 + e : Math.min(l.bounds.x2, b.x2) - k / 2 - e : (Math.max(l.bounds.x1, b.x1) + Math.min(l.bounds.x2, b.x2)) / 2, q = 0 > ma ? Math.max(l.point.x, c) - k / 2 : Math.min(l.point.x, c) - k / 2, q = Math.max(q, h));
                    "vertical" === C && (n += t);
                    f.x = q;
                    f.y = n;
                    f.render(!0);
                    m && ("inside" !== s && (0 > u.indexOf("bar") && ("error" !== u || !l.axisSwapped) && l.point.x > b.x1 && l.point.x < b.x2 ||
                        !w) && (0 > u.indexOf("column") && ("error" !== u || l.axisSwapped) && l.point.y > b.y1 && l.point.y < b.y2 || !w)) && (d.lineWidth = m, d.strokeStyle = p ? p : "gray", d.setLineDash && d.setLineDash(R(A, m)), d.beginPath(), d.moveTo(l.point.x, l.point.y), 0 <= u.indexOf("bar") || "error" === u && l.axisSwapped ? d.lineTo(q + (0 < l.direction ? 0 : k), n + ("horizontal" === C ? t : -t) / 2) : 0 <= u.indexOf("column") || "error" === u && !l.axisSwapped ? d.lineTo(q + k / 2, n + ((0 < l.direction ? t : -t) + ("horizontal" === C ? t : -t)) / 2) : d.lineTo(q + k / 2, n + ((n < l.point.y ? t : -t) + ("horizontal" === C ? t :
                        -t)) / 2), d.stroke())
                }
            }
            d = {
                source: d,
                dest: this.plotArea.ctx,
                animationCallback: M.fadeInAnimation,
                easingFunction: M.easing.easeInQuad,
                animationBase: 0,
                startTimePercent: 0.7
            };
            for (a = 0; a < this._indexLabels.length; a++) l = this._indexLabels[a], f = na("indexLabelBackgroundColor", l.dataPoint, l.dataSeries), l.dataSeries.indexLabelBackgroundColor = v(f) ? r ? "transparent" : null : f;
            return d
        };
        m.prototype.renderLine = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c =
                    this._eventManager.ghostCtx;
                b.save();
                var e = this.plotArea;
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                for (var g = [], h, k = 0; k < a.dataSeriesIndexes.length; k++) {
                    var t = a.dataSeriesIndexes[k],
                        l = this.data[t];
                    b.lineWidth = l.lineThickness;
                    var u = l.dataPoints,
                        q = "solid";
                    if (b.setLineDash) {
                        var n = R(l.nullDataLineDashType, l.lineThickness),
                            q = l.lineDashType,
                            f = R(q, l.lineThickness);
                        b.setLineDash(f)
                    }
                    var A = l.id;
                    this._eventManager.objectMap[A] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: t
                    };
                    A = N(A);
                    c.strokeStyle = A;
                    c.lineWidth = 0 < l.lineThickness ? Math.max(l.lineThickness, 4) : 0;
                    var A = l._colorSet,
                        p = A = l.lineColor = l.options.lineColor ? l.options.lineColor : A[0];
                    b.strokeStyle = A;
                    var m = !0,
                        s = 0,
                        C, x;
                    b.beginPath();
                    if (0 < u.length) {
                        for (var v = !1, s = 0; s < u.length; s++)
                            if (C = u[s].x.getTime ? u[s].x.getTime() : u[s].x, !(C < a.axisX.dataInfo.viewPortMin || C > a.axisX.dataInfo.viewPortMax && (!l.connectNullData || !v)))
                                if ("number" !== typeof u[s].y) 0 < s && !(l.connectNullData || v || m) && (b.stroke(), r && c.stroke()), v = !0;
                                else {
                                    C = a.axisX.convertValueToPixel(C);
                                    x =
                                        a.axisY.convertValueToPixel(u[s].y);
                                    var z = l.dataPointIds[s];
                                    this._eventManager.objectMap[z] = {
                                        id: z,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: t,
                                        dataPointIndex: s,
                                        x1: C,
                                        y1: x
                                    };
                                    m || v ? (!m && l.connectNullData ? (b.setLineDash && (l.options.nullDataLineDashType || q === l.lineDashType && l.lineDashType !== l.nullDataLineDashType) && (b.stroke(), b.beginPath(), b.moveTo(h.x, h.y), q = l.nullDataLineDashType, b.setLineDash(n)), b.lineTo(C, x), r && c.lineTo(C, x)) : (b.beginPath(), b.moveTo(C, x), r && (c.beginPath(), c.moveTo(C, x))), v = m = !1) : (b.lineTo(C,
                                        x), r && c.lineTo(C, x), 0 == s % 500 && (b.stroke(), b.beginPath(), b.moveTo(C, x), r && (c.stroke(), c.beginPath(), c.moveTo(C, x))));
                                    h = {
                                        x: C,
                                        y: x
                                    };
                                    s < u.length - 1 && (p !== (u[s].lineColor || A) || q !== (u[s].lineDashType || l.lineDashType)) && (b.stroke(), b.beginPath(), b.moveTo(C, x), p = u[s].lineColor || A, b.strokeStyle = p, b.setLineDash && (u[s].lineDashType ? (q = u[s].lineDashType, b.setLineDash(R(q, l.lineThickness))) : (q = l.lineDashType, b.setLineDash(f))));
                                    if (0 < u[s].markerSize || 0 < l.markerSize) {
                                        var B = l.getMarkerProperties(s, C, x, b);
                                        g.push(B);
                                        z = N(z);
                                        r && g.push({
                                            x: C,
                                            y: x,
                                            ctx: c,
                                            type: B.type,
                                            size: B.size,
                                            color: z,
                                            borderColor: z,
                                            borderThickness: B.borderThickness
                                        })
                                    }(u[s].indexLabel || l.indexLabel || u[s].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "line",
                                        dataPoint: u[s],
                                        dataSeries: l,
                                        point: {
                                            x: C,
                                            y: x
                                        },
                                        direction: 0 > u[s].y === a.axisY.reversed ? 1 : -1,
                                        color: A
                                    })
                                }
                        b.stroke();
                        r && c.stroke()
                    }
                }
                ia.drawMarkers(g);
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas &&
                    b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), c.beginPath());
                b.restore();
                b.beginPath();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderStepLine = function(a) {
            var d = a.targetCanvasCtx ||
                this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = this._eventManager.ghostCtx;
                b.save();
                var e = this.plotArea;
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                for (var g = [], h, k = 0; k < a.dataSeriesIndexes.length; k++) {
                    var t = a.dataSeriesIndexes[k],
                        l = this.data[t];
                    b.lineWidth = l.lineThickness;
                    var u = l.dataPoints,
                        q = "solid";
                    if (b.setLineDash) {
                        var n = R(l.nullDataLineDashType, l.lineThickness),
                            q = l.lineDashType,
                            f = R(q, l.lineThickness);
                        b.setLineDash(f)
                    }
                    var A = l.id;
                    this._eventManager.objectMap[A] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: t
                    };
                    A = N(A);
                    c.strokeStyle = A;
                    c.lineWidth = 0 < l.lineThickness ? Math.max(l.lineThickness, 4) : 0;
                    var A = l._colorSet,
                        p = A = l.lineColor = l.options.lineColor ? l.options.lineColor : A[0];
                    b.strokeStyle = A;
                    var m = !0,
                        s = 0,
                        C, x;
                    b.beginPath();
                    if (0 < u.length) {
                        for (var v = !1, s = 0; s < u.length; s++)
                            if (C = u[s].getTime ? u[s].x.getTime() : u[s].x, !(C < a.axisX.dataInfo.viewPortMin || C > a.axisX.dataInfo.viewPortMax && (!l.connectNullData || !v)))
                                if ("number" !== typeof u[s].y) 0 < s && !(l.connectNullData || v || m) && (b.stroke(),
                                    r && c.stroke()), v = !0;
                                else {
                                    var z = x;
                                    C = a.axisX.convertValueToPixel(C);
                                    x = a.axisY.convertValueToPixel(u[s].y);
                                    var B = l.dataPointIds[s];
                                    this._eventManager.objectMap[B] = {
                                        id: B,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: t,
                                        dataPointIndex: s,
                                        x1: C,
                                        y1: x
                                    };
                                    m || v ? (!m && l.connectNullData ? (b.setLineDash && (l.options.nullDataLineDashType || q === l.lineDashType && l.lineDashType !== l.nullDataLineDashType) && (b.stroke(), b.beginPath(), b.moveTo(h.x, h.y), q = l.nullDataLineDashType, b.setLineDash(n)), b.lineTo(C, z), b.lineTo(C, x), r && (c.lineTo(C,
                                        z), c.lineTo(C, x))) : (b.beginPath(), b.moveTo(C, x), r && (c.beginPath(), c.moveTo(C, x))), v = m = !1) : (b.lineTo(C, z), r && c.lineTo(C, z), b.lineTo(C, x), r && c.lineTo(C, x), 0 == s % 500 && (b.stroke(), b.beginPath(), b.moveTo(C, x), r && (c.stroke(), c.beginPath(), c.moveTo(C, x))));
                                    h = {
                                        x: C,
                                        y: x
                                    };
                                    s < u.length - 1 && (p !== (u[s].lineColor || A) || q !== (u[s].lineDashType || l.lineDashType)) && (b.stroke(), b.beginPath(), b.moveTo(C, x), p = u[s].lineColor || A, b.strokeStyle = p, b.setLineDash && (u[s].lineDashType ? (q = u[s].lineDashType, b.setLineDash(R(q, l.lineThickness))) :
                                        (q = l.lineDashType, b.setLineDash(f))));
                                    if (0 < u[s].markerSize || 0 < l.markerSize) z = l.getMarkerProperties(s, C, x, b), g.push(z), B = N(B), r && g.push({
                                        x: C,
                                        y: x,
                                        ctx: c,
                                        type: z.type,
                                        size: z.size,
                                        color: B,
                                        borderColor: B,
                                        borderThickness: z.borderThickness
                                    });
                                    (u[s].indexLabel || l.indexLabel || u[s].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "stepLine",
                                        dataPoint: u[s],
                                        dataSeries: l,
                                        point: {
                                            x: C,
                                            y: x
                                        },
                                        direction: 0 > u[s].y === a.axisY.reversed ? 1 : -1,
                                        color: A
                                    })
                                }
                        b.stroke();
                        r && c.stroke()
                    }
                }
                ia.drawMarkers(g);
                r &&
                    (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), c.beginPath());
                b.restore();
                b.beginPath();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderSpline = function(a) {
            function d(a) {
                a = w(a, 2);
                if (0 < a.length) {
                    c.beginPath();
                    r && e.beginPath();
                    c.moveTo(a[0].x, a[0].y);
                    a[0].newStrokeStyle && (c.strokeStyle = a[0].newStrokeStyle);
                    a[0].newLineDashArray && c.setLineDash(a[0].newLineDashArray);
                    r && e.moveTo(a[0].x, a[0].y);
                    for (var b = 0; b < a.length - 3; b += 3)
                        if (c.bezierCurveTo(a[b + 1].x, a[b + 1].y, a[b + 2].x, a[b + 2].y, a[b + 3].x, a[b + 3].y), r && e.bezierCurveTo(a[b + 1].x, a[b + 1].y, a[b + 2].x, a[b + 2].y, a[b + 3].x, a[b + 3].y),
                            0 < b && 0 === b % 3E3 || a[b + 3].newStrokeStyle || a[b + 3].newLineDashArray) c.stroke(), c.beginPath(), c.moveTo(a[b + 3].x, a[b + 3].y), a[b + 3].newStrokeStyle && (c.strokeStyle = a[b + 3].newStrokeStyle), a[b + 3].newLineDashArray && c.setLineDash(a[b + 3].newLineDashArray), r && (e.stroke(), e.beginPath(), e.moveTo(a[b + 3].x, a[b + 3].y));
                    c.stroke();
                    r && e.stroke()
                }
            }
            var b = a.targetCanvasCtx || this.plotArea.ctx,
                c = r ? this._preRenderCtx : b;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = this._eventManager.ghostCtx;
                c.save();
                var g = this.plotArea;
                c.beginPath();
                c.rect(g.x1, g.y1, g.width, g.height);
                c.clip();
                for (var h = [], k = 0; k < a.dataSeriesIndexes.length; k++) {
                    var t = a.dataSeriesIndexes[k],
                        l = this.data[t];
                    c.lineWidth = l.lineThickness;
                    var u = l.dataPoints,
                        q = "solid";
                    if (c.setLineDash) {
                        var n = R(l.nullDataLineDashType, l.lineThickness),
                            q = l.lineDashType,
                            f = R(q, l.lineThickness);
                        c.setLineDash(f)
                    }
                    var A = l.id;
                    this._eventManager.objectMap[A] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: t
                    };
                    A = N(A);
                    e.strokeStyle = A;
                    e.lineWidth = 0 < l.lineThickness ? Math.max(l.lineThickness, 4) : 0;
                    var A = l._colorSet,
                        p = A = l.lineColor = l.options.lineColor ? l.options.lineColor : A[0];
                    c.strokeStyle = A;
                    var m = 0,
                        s, v, x = [];
                    c.beginPath();
                    if (0 < u.length)
                        for (v = !1, m = 0; m < u.length; m++)
                            if (s = u[m].getTime ? u[m].x.getTime() : u[m].x, !(s < a.axisX.dataInfo.viewPortMin || s > a.axisX.dataInfo.viewPortMax && (!l.connectNullData || !v)))
                                if ("number" !== typeof u[m].y) 0 < m && !v && (l.connectNullData ? c.setLineDash && (0 < x.length && (l.options.nullDataLineDashType || !u[m - 1].lineDashType)) && (x[x.length - 1].newLineDashArray = n, q = l.nullDataLineDashType) : (d(x), x = [])), v = !0;
                                else {
                                    s = a.axisX.convertValueToPixel(s);
                                    v = a.axisY.convertValueToPixel(u[m].y);
                                    var ma = l.dataPointIds[m];
                                    this._eventManager.objectMap[ma] = {
                                        id: ma,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: t,
                                        dataPointIndex: m,
                                        x1: s,
                                        y1: v
                                    };
                                    x[x.length] = {
                                        x: s,
                                        y: v
                                    };
                                    m < u.length - 1 && (p !== (u[m].lineColor || A) || q !== (u[m].lineDashType || l.lineDashType)) && (p = u[m].lineColor || A, x[x.length - 1].newStrokeStyle = p, c.setLineDash && (u[m].lineDashType ? (q = u[m].lineDashType, x[x.length - 1].newLineDashArray = R(q, l.lineThickness)) : (q = l.lineDashType, x[x.length -
                                        1].newLineDashArray = f)));
                                    if (0 < u[m].markerSize || 0 < l.markerSize) {
                                        var z = l.getMarkerProperties(m, s, v, c);
                                        h.push(z);
                                        ma = N(ma);
                                        r && h.push({
                                            x: s,
                                            y: v,
                                            ctx: e,
                                            type: z.type,
                                            size: z.size,
                                            color: ma,
                                            borderColor: ma,
                                            borderThickness: z.borderThickness
                                        })
                                    }(u[m].indexLabel || l.indexLabel || u[m].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "spline",
                                        dataPoint: u[m],
                                        dataSeries: l,
                                        point: {
                                            x: s,
                                            y: v
                                        },
                                        direction: 0 > u[m].y === a.axisY.reversed ? 1 : -1,
                                        color: A
                                    });
                                    v = !1
                                }
                    d(x)
                }
                ia.drawMarkers(h);
                r && (b.drawImage(this._preRenderCanvas,
                    0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(g.x1, g.y1, g.width, g.height), e.beginPath());
                c.restore();
                c.beginPath();
                return {
                    source: b,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderColumn = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = 0,
                    h, k, t, l = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    g = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
                    u = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.width,
                        0.9 * (this.plotArea.width / a.plotType.totalDataSeries)) << 0,
                    q = a.axisX.dataInfo.minDiff;
                isFinite(q) || (q = 0.3 * Math.abs(a.axisX.range));
                q = this.dataPointWidth = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(q) / Math.log(a.axisX.range) : Math.abs(q) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
                this.dataPointMaxWidth && g > u && (g = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, u));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && u < g) && (u = Math.max(this.options.dataPointWidth ?
                    this.dataPointWidth : -Infinity, g));
                q < g && (q = g);
                q > u && (q = u);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (u = 0; u < a.dataSeriesIndexes.length; u++) {
                    var n = a.dataSeriesIndexes[u],
                        f = this.data[n],
                        A = f.dataPoints;
                    if (0 < A.length)
                        for (var m = 5 < q && f.bevelEnabled ? !0 : !1, g = 0; g < A.length; g++)
                            if (A[g].getTime ? t = A[g].x.getTime() :
                                t = A[g].x, !(t < a.axisX.dataInfo.viewPortMin || t > a.axisX.dataInfo.viewPortMax) && "number" === typeof A[g].y) {
                                h = a.axisX.convertValueToPixel(t);
                                k = a.axisY.convertValueToPixel(A[g].y);
                                h = a.axisX.reversed ? h + a.plotType.totalDataSeries * q / 2 - (a.previousDataSeriesCount + u) * q << 0 : h - a.plotType.totalDataSeries * q / 2 + (a.previousDataSeriesCount + u) * q << 0;
                                var p = a.axisX.reversed ? h - q << 0 : h + q << 0,
                                    s;
                                0 <= A[g].y ? s = l : (s = k, k = l);
                                k > s && (c = k, k = s, s = c);
                                c = A[g].color ? A[g].color : f._colorSet[g % f._colorSet.length];
                                ea(b, h, k, p, s, c, 0, null, m && 0 <= A[g].y,
                                    0 > A[g].y && m, !1, !1, f.fillOpacity);
                                c = f.dataPointIds[g];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: n,
                                    dataPointIndex: g,
                                    x1: h,
                                    y1: k,
                                    x2: p,
                                    y2: s
                                };
                                c = N(c);
                                r && ea(this._eventManager.ghostCtx, h, k, p, s, c, 0, null, !1, !1, !1, !1);
                                (A[g].indexLabel || f.indexLabel || A[g].indexLabelFormatter || f.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "column",
                                    dataPoint: A[g],
                                    dataSeries: f,
                                    point: {
                                        x: h + (p - h) / 2,
                                        y: 0 > A[g].y === a.axisY.reversed ? k : s
                                    },
                                    direction: 0 > A[g].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: h,
                                        y1: Math.min(k, s),
                                        x2: p,
                                        y2: Math.max(k, s)
                                    },
                                    color: c
                                })
                            }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.yScaleAnimation,
                    easingFunction: M.easing.easeOutQuart,
                    animationBase: l < a.axisY.bounds.y1 ? a.axisY.bounds.y1 : l > a.axisY.bounds.y2 ? a.axisY.bounds.y2 : l
                }
            }
        };
        m.prototype.renderStackedColumn = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = [],
                    h = [],
                    k = [],
                    t = [],
                    l = 0,
                    u, q, n = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    l = this.options.dataPointMinWidth ?
                    this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
                u = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.width << 0;
                var f = a.axisX.dataInfo.minDiff;
                isFinite(f) || (f = 0.3 * Math.abs(a.axisX.range));
                f = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(f) / Math.log(a.axisX.range) : Math.abs(f) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
                this.dataPointMaxWidth && l > u && (l = Math.min(this.options.dataPointWidth ?
                    this.dataPointWidth : Infinity, u));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && u < l) && (u = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, l));
                f < l && (f = l);
                f > u && (f = u);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (var A = 0; A < a.dataSeriesIndexes.length; A++) {
                    var p = a.dataSeriesIndexes[A],
                        m = this.data[p],
                        s = m.dataPoints;
                    if (0 < s.length) {
                        var v = 5 < f && m.bevelEnabled ? !0 : !1;
                        b.strokeStyle = "#4572A7 ";
                        for (l = 0; l < s.length; l++)
                            if (c = s[l].x.getTime ? s[l].x.getTime() : s[l].x, !(c < a.axisX.dataInfo.viewPortMin || c > a.axisX.dataInfo.viewPortMax) && "number" === typeof s[l].y) {
                                u = a.axisX.convertValueToPixel(c);
                                var x = u - a.plotType.plotUnits.length * f / 2 + a.index * f << 0,
                                    w = x + f << 0,
                                    z;
                                if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < s[l].y) k[c] = s[l].y + (k[c] ? k[c] : 0), 0 < k[c] && (q = a.axisY.convertValueToPixel(k[c]),
                                    z = "undefined" !== typeof g[c] ? g[c] : n, g[c] = q);
                                else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= s[l].y) t[c] = s[l].y + (t[c] ? t[c] : 0), z = a.axisY.convertValueToPixel(t[c]), q = "undefined" !== typeof h[c] ? h[c] : n, h[c] = z;
                                else if (q = a.axisY.convertValueToPixel(s[l].y), 0 <= s[l].y) {
                                    var B = "undefined" !== typeof g[c] ? g[c] : 0;
                                    q -= B;
                                    z = n - B;
                                    g[c] = B + (z - q)
                                } else B = h[c] ? h[c] : 0, z = q + B, q = n + B, h[c] = B + (z - q);
                                c = s[l].color ? s[l].color : m._colorSet[l % m._colorSet.length];
                                ea(b, x, q, w, z, c, 0, null, v && 0 <= s[l].y, 0 > s[l].y && v, !1, !1, m.fillOpacity);
                                c = m.dataPointIds[l];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: p,
                                    dataPointIndex: l,
                                    x1: x,
                                    y1: q,
                                    x2: w,
                                    y2: z
                                };
                                c = N(c);
                                r && ea(this._eventManager.ghostCtx, x, q, w, z, c, 0, null, !1, !1, !1, !1);
                                (s[l].indexLabel || m.indexLabel || s[l].indexLabelFormatter || m.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "stackedColumn",
                                    dataPoint: s[l],
                                    dataSeries: m,
                                    point: {
                                        x: u,
                                        y: 0 <= s[l].y ? q : z
                                    },
                                    direction: 0 > s[l].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: x,
                                        y1: Math.min(q, z),
                                        x2: w,
                                        y2: Math.max(q,
                                            z)
                                    },
                                    color: c
                                })
                            }
                    }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.yScaleAnimation,
                    easingFunction: M.easing.easeOutQuart,
                    animationBase: n < a.axisY.bounds.y1 ? a.axisY.bounds.y1 : n > a.axisY.bounds.y2 ? a.axisY.bounds.y2 : n
                }
            }
        };
        m.prototype.renderStackedColumn100 = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = [],
                    h = [],
                    k = [],
                    t = [],
                    l = 0,
                    u, q, n = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    l = this.options.dataPointMinWidth ? this.dataPointMinWidth :
                    this.options.dataPointWidth ? this.dataPointWidth : 1;
                u = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.width << 0;
                var f = a.axisX.dataInfo.minDiff;
                isFinite(f) || (f = 0.3 * Math.abs(a.axisX.range));
                f = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(f) / Math.log(a.axisX.range) : Math.abs(f) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
                this.dataPointMaxWidth && l > u && (l = Math.min(this.options.dataPointWidth ?
                    this.dataPointWidth : Infinity, u));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && u < l) && (u = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, l));
                f < l && (f = l);
                f > u && (f = u);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (var A = 0; A < a.dataSeriesIndexes.length; A++) {
                    var m = a.dataSeriesIndexes[A],
                        p = this.data[m],
                        s = p.dataPoints;
                    if (0 < s.length)
                        for (var v = 5 < f && p.bevelEnabled ? !0 : !1, l = 0; l < s.length; l++)
                            if (c = s[l].x.getTime ? s[l].x.getTime() : s[l].x, !(c < a.axisX.dataInfo.viewPortMin || c > a.axisX.dataInfo.viewPortMax) && "number" === typeof s[l].y) {
                                u = a.axisX.convertValueToPixel(c);
                                q = 0 !== a.dataPointYSums[c] ? 100 * (s[l].y / a.dataPointYSums[c]) : 0;
                                var x = u - a.plotType.plotUnits.length * f / 2 + a.index * f << 0,
                                    w = x + f << 0,
                                    z;
                                if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < s[l].y) {
                                    k[c] = q +
                                        ("undefined" !== typeof k[c] ? k[c] : 0);
                                    if (0 >= k[c]) continue;
                                    q = a.axisY.convertValueToPixel(k[c]);
                                    z = g[c] ? g[c] : n;
                                    g[c] = q
                                } else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= s[l].y) t[c] = q + ("undefined" !== typeof t[c] ? t[c] : 0), z = a.axisY.convertValueToPixel(t[c]), q = h[c] ? h[c] : n, h[c] = z;
                                else if (q = a.axisY.convertValueToPixel(q), 0 <= s[l].y) {
                                    var B = "undefined" !== typeof g[c] ? g[c] : 0;
                                    q -= B;
                                    z = n - B;
                                    a.dataSeriesIndexes.length - 1 === A && 1 >= Math.abs(e.y1 - q) && (q = e.y1);
                                    g[c] = B + (z - q)
                                } else B = "undefined" !== typeof h[c] ?
                                    h[c] : 0, z = q + B, q = n + B, a.dataSeriesIndexes.length - 1 === A && 1 >= Math.abs(e.y2 - z) && (z = e.y2), h[c] = B + (z - q);
                                c = s[l].color ? s[l].color : p._colorSet[l % p._colorSet.length];
                                ea(b, x, q, w, z, c, 0, null, v && 0 <= s[l].y, 0 > s[l].y && v, !1, !1, p.fillOpacity);
                                c = p.dataPointIds[l];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: m,
                                    dataPointIndex: l,
                                    x1: x,
                                    y1: q,
                                    x2: w,
                                    y2: z
                                };
                                c = N(c);
                                r && ea(this._eventManager.ghostCtx, x, q, w, z, c, 0, null, !1, !1, !1, !1);
                                (s[l].indexLabel || p.indexLabel || s[l].indexLabelFormatter || p.indexLabelFormatter) &&
                                this._indexLabels.push({
                                    chartType: "stackedColumn100",
                                    dataPoint: s[l],
                                    dataSeries: p,
                                    point: {
                                        x: u,
                                        y: 0 <= s[l].y ? q : z
                                    },
                                    direction: 0 > s[l].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: x,
                                        y1: Math.min(q, z),
                                        x2: w,
                                        y2: Math.max(q, z)
                                    },
                                    color: c
                                })
                            }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx &&
                    this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.yScaleAnimation,
                    easingFunction: M.easing.easeOutQuart,
                    animationBase: n < a.axisY.bounds.y1 ? a.axisY.bounds.y1 : n > a.axisY.bounds.y2 ? a.axisY.bounds.y2 : n
                }
            }
        };
        m.prototype.renderBar = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c =
                    null,
                    e = this.plotArea,
                    g = 0,
                    h, k, t, l = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    g = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
                    u = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / a.plotType.totalDataSeries)) << 0,
                    q = a.axisX.dataInfo.minDiff;
                isFinite(q) || (q = 0.3 * Math.abs(a.axisX.range));
                q = this.options.dataPointWidth ?
                    this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(q) / Math.log(a.axisX.range) : Math.abs(q) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
                this.dataPointMaxWidth && g > u && (g = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, u));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && u < g) && (u = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, g));
                q < g && (q = g);
                q > u && (q = u);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (u = 0; u < a.dataSeriesIndexes.length; u++) {
                    var n = a.dataSeriesIndexes[u],
                        f = this.data[n],
                        A = f.dataPoints;
                    if (0 < A.length) {
                        var p = 5 < q && f.bevelEnabled ? !0 : !1;
                        b.strokeStyle = "#4572A7 ";
                        for (g = 0; g < A.length; g++)
                            if (A[g].getTime ? t = A[g].x.getTime() : t = A[g].x, !(t < a.axisX.dataInfo.viewPortMin || t > a.axisX.dataInfo.viewPortMax) && "number" === typeof A[g].y) {
                                k = a.axisX.convertValueToPixel(t);
                                h = a.axisY.convertValueToPixel(A[g].y);
                                k = a.axisX.reversed ? k + a.plotType.totalDataSeries * q / 2 - (a.previousDataSeriesCount + u) * q << 0 : k - a.plotType.totalDataSeries * q / 2 + (a.previousDataSeriesCount + u) * q << 0;
                                var m = a.axisX.reversed ? k - q << 0 : k + q << 0,
                                    s;
                                0 <= A[g].y ? s = l : (s = h, h = l);
                                c = A[g].color ? A[g].color : f._colorSet[g % f._colorSet.length];
                                ea(b, s, k, h, m, c, 0, null, p, !1, !1, !1, f.fillOpacity);
                                c = f.dataPointIds[g];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: n,
                                    dataPointIndex: g,
                                    x1: s,
                                    y1: k,
                                    x2: h,
                                    y2: m
                                };
                                c =
                                    N(c);
                                r && ea(this._eventManager.ghostCtx, s, k, h, m, c, 0, null, !1, !1, !1, !1);
                                (A[g].indexLabel || f.indexLabel || A[g].indexLabelFormatter || f.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "bar",
                                    dataPoint: A[g],
                                    dataSeries: f,
                                    point: {
                                        x: 0 <= A[g].y ? h : s,
                                        y: k + (m - k) / 2
                                    },
                                    direction: 0 > A[g].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: Math.min(s, h),
                                        y1: k,
                                        x2: Math.max(s, h),
                                        y2: m
                                    },
                                    color: c
                                })
                            }
                    }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas,
                    0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xScaleAnimation,
                    easingFunction: M.easing.easeOutQuart,
                    animationBase: l < a.axisY.bounds.x1 ? a.axisY.bounds.x1 : l > a.axisY.bounds.x2 ? a.axisY.bounds.x2 : l
                }
            }
        };
        m.prototype.renderStackedBar = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = [],
                    h = [],
                    k = [],
                    t = [],
                    l = 0,
                    u, q, n = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    l = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
                q = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.height <<
                    0;
                var f = a.axisX.dataInfo.minDiff;
                isFinite(f) || (f = 0.3 * Math.abs(a.axisX.range));
                f = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(f) / Math.log(a.axisX.range) : Math.abs(f) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
                this.dataPointMaxWidth && l > q && (l = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, q));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && q < l) && (q = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, l));
                f <
                    l && (f = l);
                f > q && (f = q);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (var A = 0; A < a.dataSeriesIndexes.length; A++) {
                    var m = a.dataSeriesIndexes[A],
                        p = this.data[m],
                        s = p.dataPoints;
                    if (0 < s.length) {
                        var v = 5 < f && p.bevelEnabled ? !0 : !1;
                        b.strokeStyle = "#4572A7 ";
                        for (l = 0; l < s.length; l++)
                            if (c = s[l].x.getTime ? s[l].x.getTime() :
                                s[l].x, !(c < a.axisX.dataInfo.viewPortMin || c > a.axisX.dataInfo.viewPortMax) && "number" === typeof s[l].y) {
                                q = a.axisX.convertValueToPixel(c);
                                var x = q - a.plotType.plotUnits.length * f / 2 + a.index * f << 0,
                                    w = x + f << 0,
                                    z;
                                if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < s[l].y) k[c] = s[l].y + (k[c] ? k[c] : 0), 0 < k[c] && (z = g[c] ? g[c] : n, g[c] = u = a.axisY.convertValueToPixel(k[c]));
                                else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= s[l].y) t[c] = s[l].y + (t[c] ? t[c] : 0), u = h[c] ?
                                    h[c] : n, h[c] = z = a.axisY.convertValueToPixel(t[c]);
                                else if (u = a.axisY.convertValueToPixel(s[l].y), 0 <= s[l].y) {
                                    var B = g[c] ? g[c] : 0;
                                    z = n + B;
                                    u += B;
                                    g[c] = B + (u - z)
                                } else B = h[c] ? h[c] : 0, z = u - B, u = n - B, h[c] = B + (u - z);
                                c = s[l].color ? s[l].color : p._colorSet[l % p._colorSet.length];
                                ea(b, z, x, u, w, c, 0, null, v, !1, !1, !1, p.fillOpacity);
                                c = p.dataPointIds[l];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: m,
                                    dataPointIndex: l,
                                    x1: z,
                                    y1: x,
                                    x2: u,
                                    y2: w
                                };
                                c = N(c);
                                r && ea(this._eventManager.ghostCtx, z, x, u, w, c, 0, null, !1, !1, !1, !1);
                                (s[l].indexLabel || p.indexLabel || s[l].indexLabelFormatter || p.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "stackedBar",
                                    dataPoint: s[l],
                                    dataSeries: p,
                                    point: {
                                        x: 0 <= s[l].y ? u : z,
                                        y: q
                                    },
                                    direction: 0 > s[l].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: Math.min(z, u),
                                        y1: x,
                                        x2: Math.max(z, u),
                                        y2: w
                                    },
                                    color: c
                                })
                            }
                    }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas &&
                    b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xScaleAnimation,
                    easingFunction: M.easing.easeOutQuart,
                    animationBase: n < a.axisY.bounds.x1 ? a.axisY.bounds.x1 : n > a.axisY.bounds.x2 ? a.axisY.bounds.x2 : n
                }
            }
        };
        m.prototype.renderStackedBar100 = function(a) {
            var d =
                a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = [],
                    h = [],
                    k = [],
                    t = [],
                    l = 0,
                    u, q, n = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    l = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
                q = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.height << 0;
                var f = a.axisX.dataInfo.minDiff;
                isFinite(f) ||
                    (f = 0.3 * Math.abs(a.axisX.range));
                f = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(f) / Math.log(a.axisX.range) : Math.abs(f) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
                this.dataPointMaxWidth && l > q && (l = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, q));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && q < l) && (q = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, l));
                f < l && (f = l);
                f > q && (f = q);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (var A = 0; A < a.dataSeriesIndexes.length; A++) {
                    var p = a.dataSeriesIndexes[A],
                        m = this.data[p],
                        s = m.dataPoints;
                    if (0 < s.length) {
                        var v = 5 < f && m.bevelEnabled ? !0 : !1;
                        b.strokeStyle = "#4572A7 ";
                        for (l = 0; l < s.length; l++)
                            if (c = s[l].x.getTime ? s[l].x.getTime() : s[l].x, !(c < a.axisX.dataInfo.viewPortMin || c > a.axisX.dataInfo.viewPortMax) &&
                                "number" === typeof s[l].y) {
                                q = a.axisX.convertValueToPixel(c);
                                var x;
                                x = 0 !== a.dataPointYSums[c] ? 100 * (s[l].y / a.dataPointYSums[c]) : 0;
                                var w = q - a.plotType.plotUnits.length * f / 2 + a.index * f << 0,
                                    z = w + f << 0;
                                if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < s[l].y) {
                                    k[c] = x + (k[c] ? k[c] : 0);
                                    if (0 >= k[c]) continue;
                                    x = g[c] ? g[c] : n;
                                    g[c] = u = a.axisY.convertValueToPixel(k[c])
                                } else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= s[l].y) t[c] = x + (t[c] ? t[c] : 0), u = h[c] ? h[c] :
                                    n, h[c] = x = a.axisY.convertValueToPixel(t[c]);
                                else if (u = a.axisY.convertValueToPixel(x), 0 <= s[l].y) {
                                    var B = g[c] ? g[c] : 0;
                                    x = n + B;
                                    u += B;
                                    a.dataSeriesIndexes.length - 1 === A && 1 >= Math.abs(e.x2 - u) && (u = e.x2);
                                    g[c] = B + (u - x)
                                } else B = h[c] ? h[c] : 0, x = u - B, u = n - B, a.dataSeriesIndexes.length - 1 === A && 1 >= Math.abs(e.x1 - x) && (x = e.x1), h[c] = B + (u - x);
                                c = s[l].color ? s[l].color : m._colorSet[l % m._colorSet.length];
                                ea(b, x, w, u, z, c, 0, null, v, !1, !1, !1, m.fillOpacity);
                                c = m.dataPointIds[l];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: p,
                                    dataPointIndex: l,
                                    x1: x,
                                    y1: w,
                                    x2: u,
                                    y2: z
                                };
                                c = N(c);
                                r && ea(this._eventManager.ghostCtx, x, w, u, z, c, 0, null, !1, !1, !1, !1);
                                (s[l].indexLabel || m.indexLabel || s[l].indexLabelFormatter || m.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "stackedBar100",
                                    dataPoint: s[l],
                                    dataSeries: m,
                                    point: {
                                        x: 0 <= s[l].y ? u : x,
                                        y: q
                                    },
                                    direction: 0 > s[l].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: Math.min(x, u),
                                        y1: w,
                                        x2: Math.max(x, u),
                                        y2: z
                                    },
                                    color: c
                                })
                            }
                    }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop",
                    a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xScaleAnimation,
                    easingFunction: M.easing.easeOutQuart,
                    animationBase: n < a.axisY.bounds.x1 ? a.axisY.bounds.x1 : n > a.axisY.bounds.x2 ? a.axisY.bounds.x2 : n
                }
            }
        };
        m.prototype.renderArea = function(a) {
            var d, b;

            function c() {
                B && (0 < A.lineThickness && g.stroke(), a.axisY.logarithmic || 0 >= a.axisY.viewportMinimum && 0 <= a.axisY.viewportMaximum ? z = w : 0 > a.axisY.viewportMaximum ? z = t.y1 : 0 < a.axisY.viewportMinimum && (z = k.y2), g.lineTo(s, z), g.lineTo(B.x, z), g.closePath(), g.globalAlpha = A.fillOpacity, g.fill(), g.globalAlpha = 1, r && (h.lineTo(s, z), h.lineTo(B.x, z), h.closePath(), h.fill()), g.beginPath(), g.moveTo(s, v), h.beginPath(), h.moveTo(s, v), B = {
                    x: s,
                    y: v
                })
            }
            var e = a.targetCanvasCtx || this.plotArea.ctx,
                g = r ? this._preRenderCtx : e;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var h = this._eventManager.ghostCtx,
                    k = a.axisX.lineCoordinates,
                    t = a.axisY.lineCoordinates,
                    l = [],
                    u = this.plotArea,
                    q;
                g.save();
                r && h.save();
                g.beginPath();
                g.rect(u.x1, u.y1, u.width, u.height);
                g.clip();
                r && (h.beginPath(), h.rect(u.x1, u.y1, u.width, u.height), h.clip());
                for (var n = 0; n < a.dataSeriesIndexes.length; n++) {
                    var f = a.dataSeriesIndexes[n],
                        A = this.data[f],
                        m = A.dataPoints,
                        l = A.id;
                    this._eventManager.objectMap[l] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: f
                    };
                    l = N(l);
                    h.fillStyle = l;
                    l = [];
                    d = !0;
                    var p = 0,
                        s, v, x, w = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                        z, B = null;
                    if (0 < m.length) {
                        var y = A._colorSet[p % A._colorSet.length],
                            aa = A.lineColor = A.options.lineColor || y,
                            T = aa;
                        g.fillStyle = y;
                        g.strokeStyle = aa;
                        g.lineWidth = A.lineThickness;
                        b = "solid";
                        if (g.setLineDash) {
                            var Y = R(A.nullDataLineDashType, A.lineThickness);
                            b = A.lineDashType;
                            var ca = R(b, A.lineThickness);
                            g.setLineDash(ca)
                        }
                        for (var da = !0; p < m.length; p++)
                            if (x = m[p].x.getTime ? m[p].x.getTime() :
                                m[p].x, !(x < a.axisX.dataInfo.viewPortMin || x > a.axisX.dataInfo.viewPortMax && (!A.connectNullData || !da)))
                                if ("number" !== typeof m[p].y) A.connectNullData || (da || d) || c(), da = !0;
                                else {
                                    s = a.axisX.convertValueToPixel(x);
                                    v = a.axisY.convertValueToPixel(m[p].y);
                                    d || da ? (!d && A.connectNullData ? (g.setLineDash && (A.options.nullDataLineDashType || b === A.lineDashType && A.lineDashType !== A.nullDataLineDashType) && (d = s, b = v, s = q.x, v = q.y, c(), g.moveTo(q.x, q.y), s = d, v = b, B = q, b = A.nullDataLineDashType, g.setLineDash(Y)), g.lineTo(s, v), r && h.lineTo(s,
                                        v)) : (g.beginPath(), g.moveTo(s, v), r && (h.beginPath(), h.moveTo(s, v)), B = {
                                        x: s,
                                        y: v
                                    }), da = d = !1) : (g.lineTo(s, v), r && h.lineTo(s, v), 0 == p % 250 && c());
                                    q = {
                                        x: s,
                                        y: v
                                    };
                                    p < m.length - 1 && (T !== (m[p].lineColor || aa) || b !== (m[p].lineDashType || A.lineDashType)) && (c(), T = m[p].lineColor || aa, g.strokeStyle = T, g.setLineDash && (m[p].lineDashType ? (b = m[p].lineDashType, g.setLineDash(R(b, A.lineThickness))) : (b = A.lineDashType, g.setLineDash(ca))));
                                    var Z = A.dataPointIds[p];
                                    this._eventManager.objectMap[Z] = {
                                        id: Z,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: f,
                                        dataPointIndex: p,
                                        x1: s,
                                        y1: v
                                    };
                                    0 !== m[p].markerSize && (0 < m[p].markerSize || 0 < A.markerSize) && (x = A.getMarkerProperties(p, s, v, g), l.push(x), Z = N(Z), r && l.push({
                                        x: s,
                                        y: v,
                                        ctx: h,
                                        type: x.type,
                                        size: x.size,
                                        color: Z,
                                        borderColor: Z,
                                        borderThickness: x.borderThickness
                                    }));
                                    (m[p].indexLabel || A.indexLabel || m[p].indexLabelFormatter || A.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "area",
                                        dataPoint: m[p],
                                        dataSeries: A,
                                        point: {
                                            x: s,
                                            y: v
                                        },
                                        direction: 0 > m[p].y === a.axisY.reversed ? 1 : -1,
                                        color: y
                                    })
                                }
                        c();
                        ia.drawMarkers(l)
                    }
                }
                r && (e.drawImage(this._preRenderCanvas,
                    0, 0, this.width, this.height), g.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && g.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && g.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), g.clearRect(u.x1, u.y1, u.width, u.height), this._eventManager.ghostCtx.restore());
                g.restore();
                return {
                    source: e,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderSplineArea = function(a) {
            function d() {
                var b = w(x, 2);
                if (0 < b.length) {
                    if (0 < q.lineThickness) {
                        c.beginPath();
                        c.moveTo(b[0].x, b[0].y);
                        b[0].newStrokeStyle && (c.strokeStyle = b[0].newStrokeStyle);
                        b[0].newLineDashArray && c.setLineDash(b[0].newLineDashArray);
                        for (var d = 0; d < b.length - 3; d += 3)
                            if (c.bezierCurveTo(b[d + 1].x, b[d + 1].y, b[d + 2].x, b[d + 2].y, b[d + 3].x, b[d + 3].y), r && e.bezierCurveTo(b[d + 1].x, b[d + 1].y, b[d + 2].x, b[d + 2].y, b[d + 3].x, b[d + 3].y), b[d + 3].newStrokeStyle || b[d + 3].newLineDashArray) c.stroke(),
                                c.beginPath(), c.moveTo(b[d + 3].x, b[d + 3].y), b[d + 3].newStrokeStyle && (c.strokeStyle = b[d + 3].newStrokeStyle), b[d + 3].newLineDashArray && c.setLineDash(b[d + 3].newLineDashArray);
                        c.stroke()
                    }
                    c.beginPath();
                    c.moveTo(b[0].x, b[0].y);
                    r && (e.beginPath(), e.moveTo(b[0].x, b[0].y));
                    for (d = 0; d < b.length - 3; d += 3) c.bezierCurveTo(b[d + 1].x, b[d + 1].y, b[d + 2].x, b[d + 2].y, b[d + 3].x, b[d + 3].y), r && e.bezierCurveTo(b[d + 1].x, b[d + 1].y, b[d + 2].x, b[d + 2].y, b[d + 3].x, b[d + 3].y);
                    a.axisY.logarithmic || 0 >= a.axisY.viewportMinimum && 0 <= a.axisY.viewportMaximum ?
                        s = m : 0 > a.axisY.viewportMaximum ? s = h.y1 : 0 < a.axisY.viewportMinimum && (s = g.y2);
                    v = {
                        x: b[0].x,
                        y: b[0].y
                    };
                    c.lineTo(b[b.length - 1].x, s);
                    c.lineTo(v.x, s);
                    c.closePath();
                    c.globalAlpha = q.fillOpacity;
                    c.fill();
                    c.globalAlpha = 1;
                    r && (e.lineTo(b[b.length - 1].x, s), e.lineTo(v.x, s), e.closePath(), e.fill())
                }
            }
            var b = a.targetCanvasCtx || this.plotArea.ctx,
                c = r ? this._preRenderCtx : b;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = this._eventManager.ghostCtx,
                    g = a.axisX.lineCoordinates,
                    h = a.axisY.lineCoordinates,
                    k = [],
                    t = this.plotArea;
                c.save();
                r &&
                    e.save();
                c.beginPath();
                c.rect(t.x1, t.y1, t.width, t.height);
                c.clip();
                r && (e.beginPath(), e.rect(t.x1, t.y1, t.width, t.height), e.clip());
                for (var l = 0; l < a.dataSeriesIndexes.length; l++) {
                    var u = a.dataSeriesIndexes[l],
                        q = this.data[u],
                        n = q.dataPoints,
                        k = q.id;
                    this._eventManager.objectMap[k] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: u
                    };
                    k = N(k);
                    e.fillStyle = k;
                    var k = [],
                        f = 0,
                        A, p, m = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                        s, v = null,
                        x = [];
                    if (0 < n.length) {
                        var ma = q._colorSet[f % q._colorSet.length],
                            z = q.lineColor = q.options.lineColor || ma,
                            B = z;
                        c.fillStyle = ma;
                        c.strokeStyle = z;
                        c.lineWidth = q.lineThickness;
                        var y = "solid";
                        if (c.setLineDash) {
                            var aa = R(q.nullDataLineDashType, q.lineThickness),
                                y = q.lineDashType,
                                T = R(y, q.lineThickness);
                            c.setLineDash(T)
                        }
                        for (p = !1; f < n.length; f++)
                            if (A = n[f].x.getTime ? n[f].x.getTime() : n[f].x, !(A < a.axisX.dataInfo.viewPortMin || A > a.axisX.dataInfo.viewPortMax && (!q.connectNullData || !p)))
                                if ("number" !== typeof n[f].y) 0 < f && !p && (q.connectNullData ? c.setLineDash && (0 < x.length && (q.options.nullDataLineDashType ||
                                    !n[f - 1].lineDashType)) && (x[x.length - 1].newLineDashArray = aa, y = q.nullDataLineDashType) : (d(), x = [])), p = !0;
                                else {
                                    A = a.axisX.convertValueToPixel(A);
                                    p = a.axisY.convertValueToPixel(n[f].y);
                                    var Y = q.dataPointIds[f];
                                    this._eventManager.objectMap[Y] = {
                                        id: Y,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: u,
                                        dataPointIndex: f,
                                        x1: A,
                                        y1: p
                                    };
                                    x[x.length] = {
                                        x: A,
                                        y: p
                                    };
                                    f < n.length - 1 && (B !== (n[f].lineColor || z) || y !== (n[f].lineDashType || q.lineDashType)) && (B = n[f].lineColor || z, x[x.length - 1].newStrokeStyle = B, c.setLineDash && (n[f].lineDashType ? (y =
                                        n[f].lineDashType, x[x.length - 1].newLineDashArray = R(y, q.lineThickness)) : (y = q.lineDashType, x[x.length - 1].newLineDashArray = T)));
                                    if (0 !== n[f].markerSize && (0 < n[f].markerSize || 0 < q.markerSize)) {
                                        var ca = q.getMarkerProperties(f, A, p, c);
                                        k.push(ca);
                                        Y = N(Y);
                                        r && k.push({
                                            x: A,
                                            y: p,
                                            ctx: e,
                                            type: ca.type,
                                            size: ca.size,
                                            color: Y,
                                            borderColor: Y,
                                            borderThickness: ca.borderThickness
                                        })
                                    }(n[f].indexLabel || q.indexLabel || n[f].indexLabelFormatter || q.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "splineArea",
                                        dataPoint: n[f],
                                        dataSeries: q,
                                        point: {
                                            x: A,
                                            y: p
                                        },
                                        direction: 0 > n[f].y === a.axisY.reversed ? 1 : -1,
                                        color: ma
                                    });
                                    p = !1
                                }
                        d();
                        ia.drawMarkers(k)
                    }
                }
                r && (b.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(t.x1, t.y1, t.width, t.height),
                    this._eventManager.ghostCtx.restore());
                c.restore();
                return {
                    source: b,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderStepArea = function(a) {
            var d, b;

            function c() {
                B && (0 < A.lineThickness && g.stroke(), a.axisY.logarithmic || 0 >= a.axisY.viewportMinimum && 0 <= a.axisY.viewportMaximum ? z = w : 0 > a.axisY.viewportMaximum ? z = t.y1 : 0 < a.axisY.viewportMinimum && (z = k.y2), g.lineTo(s, z), g.lineTo(B.x, z), g.closePath(), g.globalAlpha = A.fillOpacity, g.fill(), g.globalAlpha =
                    1, r && (h.lineTo(s, z), h.lineTo(B.x, z), h.closePath(), h.fill()), g.beginPath(), g.moveTo(s, v), h.beginPath(), h.moveTo(s, v), B = {
                        x: s,
                        y: v
                    })
            }
            var e = a.targetCanvasCtx || this.plotArea.ctx,
                g = r ? this._preRenderCtx : e;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var h = this._eventManager.ghostCtx,
                    k = a.axisX.lineCoordinates,
                    t = a.axisY.lineCoordinates,
                    l = [],
                    u = this.plotArea,
                    q;
                g.save();
                r && h.save();
                g.beginPath();
                g.rect(u.x1, u.y1, u.width, u.height);
                g.clip();
                r && (h.beginPath(), h.rect(u.x1, u.y1, u.width, u.height), h.clip());
                for (var n = 0; n < a.dataSeriesIndexes.length; n++) {
                    var f =
                        a.dataSeriesIndexes[n],
                        A = this.data[f],
                        p = A.dataPoints,
                        l = A.id;
                    this._eventManager.objectMap[l] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: f
                    };
                    l = N(l);
                    h.fillStyle = l;
                    l = [];
                    d = !0;
                    var m = 0,
                        s, v, x, w = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                        z, B = null;
                    b = !1;
                    if (0 < p.length) {
                        var y = A._colorSet[m % A._colorSet.length],
                            aa = A.lineColor = A.options.lineColor || y,
                            T = aa;
                        g.fillStyle = y;
                        g.strokeStyle = aa;
                        g.lineWidth = A.lineThickness;
                        var Y = "solid";
                        if (g.setLineDash) {
                            var ca = R(A.nullDataLineDashType, A.lineThickness),
                                Y = A.lineDashType,
                                da = R(Y, A.lineThickness);
                            g.setLineDash(da)
                        }
                        for (; m < p.length; m++)
                            if (x = p[m].x.getTime ? p[m].x.getTime() : p[m].x, !(x < a.axisX.dataInfo.viewPortMin || x > a.axisX.dataInfo.viewPortMax && (!A.connectNullData || !b))) {
                                var Z = v;
                                "number" !== typeof p[m].y ? (A.connectNullData || (b || d) || c(), b = !0) : (s = a.axisX.convertValueToPixel(x), v = a.axisY.convertValueToPixel(p[m].y), d || b ? (!d && A.connectNullData ? (g.setLineDash && (A.options.nullDataLineDashType || Y === A.lineDashType && A.lineDashType !== A.nullDataLineDashType) && (d =
                                        s, b = v, s = q.x, v = q.y, c(), g.moveTo(q.x, q.y), s = d, v = b, B = q, Y = A.nullDataLineDashType, g.setLineDash(ca)), g.lineTo(s, Z), g.lineTo(s, v), r && (h.lineTo(s, Z), h.lineTo(s, v))) : (g.beginPath(), g.moveTo(s, v), r && (h.beginPath(), h.moveTo(s, v)), B = {
                                        x: s,
                                        y: v
                                    }), b = d = !1) : (g.lineTo(s, Z), r && h.lineTo(s, Z), g.lineTo(s, v), r && h.lineTo(s, v), 0 == m % 250 && c()), q = {
                                        x: s,
                                        y: v
                                    }, m < p.length - 1 && (T !== (p[m].lineColor || aa) || Y !== (p[m].lineDashType || A.lineDashType)) && (c(), T = p[m].lineColor || aa, g.strokeStyle = T, g.setLineDash && (p[m].lineDashType ? (Y = p[m].lineDashType,
                                        g.setLineDash(R(Y, A.lineThickness))) : (Y = A.lineDashType, g.setLineDash(da)))), x = A.dataPointIds[m], this._eventManager.objectMap[x] = {
                                        id: x,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: f,
                                        dataPointIndex: m,
                                        x1: s,
                                        y1: v
                                    }, 0 !== p[m].markerSize && (0 < p[m].markerSize || 0 < A.markerSize) && (Z = A.getMarkerProperties(m, s, v, g), l.push(Z), x = N(x), r && l.push({
                                        x: s,
                                        y: v,
                                        ctx: h,
                                        type: Z.type,
                                        size: Z.size,
                                        color: x,
                                        borderColor: x,
                                        borderThickness: Z.borderThickness
                                    })), (p[m].indexLabel || A.indexLabel || p[m].indexLabelFormatter || A.indexLabelFormatter) &&
                                    this._indexLabels.push({
                                        chartType: "stepArea",
                                        dataPoint: p[m],
                                        dataSeries: A,
                                        point: {
                                            x: s,
                                            y: v
                                        },
                                        direction: 0 > p[m].y === a.axisY.reversed ? 1 : -1,
                                        color: y
                                    }))
                            }
                        c();
                        ia.drawMarkers(l)
                    }
                }
                r && (e.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), g.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && g.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && g.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas,
                    0, 0, this.width, this.height), g.clearRect(u.x1, u.y1, u.width, u.height), this._eventManager.ghostCtx.restore());
                g.restore();
                return {
                    source: e,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderStackedArea = function(a) {
            function d() {
                if (!(1 > l.length)) {
                    for (0 < B.lineThickness && c.stroke(); 0 < l.length;) {
                        var a = l.pop();
                        c.lineTo(a.x, a.y);
                        r && m.lineTo(a.x, a.y)
                    }
                    c.closePath();
                    c.globalAlpha = B.fillOpacity;
                    c.fill();
                    c.globalAlpha = 1;
                    c.beginPath();
                    r && (m.closePath(),
                        m.fill(), m.beginPath());
                    l = []
                }
            }
            var b = a.targetCanvasCtx || this.plotArea.ctx,
                c = r ? this._preRenderCtx : b;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = null,
                    g = null,
                    h = [],
                    k = this.plotArea,
                    t = [],
                    l = [],
                    u = [],
                    q = [],
                    n = 0,
                    f, A, p = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    m = this._eventManager.ghostCtx,
                    s, v, x;
                r && m.beginPath();
                c.save();
                r && m.save();
                c.beginPath();
                c.rect(k.x1, k.y1, k.width, k.height);
                c.clip();
                r && (m.beginPath(), m.rect(k.x1, k.y1, k.width, k.height), m.clip());
                for (var e = [], w = 0; w < a.dataSeriesIndexes.length; w++) {
                    var z =
                        a.dataSeriesIndexes[w],
                        B = this.data[z],
                        y = B.dataPoints;
                    B.dataPointIndexes = [];
                    for (n = 0; n < y.length; n++) z = y[n].x.getTime ? y[n].x.getTime() : y[n].x, B.dataPointIndexes[z] = n, e[z] || (u.push(z), e[z] = !0);
                    u.sort(Sa)
                }
                for (w = 0; w < a.dataSeriesIndexes.length; w++) {
                    z = a.dataSeriesIndexes[w];
                    B = this.data[z];
                    y = B.dataPoints;
                    v = !0;
                    l = [];
                    n = B.id;
                    this._eventManager.objectMap[n] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: z
                    };
                    n = N(n);
                    m.fillStyle = n;
                    if (0 < u.length) {
                        var e = B._colorSet[0],
                            aa = B.lineColor = B.options.lineColor || e,
                            T = aa;
                        c.fillStyle =
                            e;
                        c.strokeStyle = aa;
                        c.lineWidth = B.lineThickness;
                        x = "solid";
                        if (c.setLineDash) {
                            var Y = R(B.nullDataLineDashType, B.lineThickness);
                            x = B.lineDashType;
                            var ca = R(x, B.lineThickness);
                            c.setLineDash(ca)
                        }
                        for (var da = !0, n = 0; n < u.length; n++) {
                            var g = u[n],
                                Z = null,
                                Z = 0 <= B.dataPointIndexes[g] ? y[B.dataPointIndexes[g]] : {
                                    x: g,
                                    y: null
                                };
                            if (!(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax && (!B.connectNullData || !da)))
                                if ("number" !== typeof Z.y) B.connectNullData || (da || v) || d(), da = !0;
                                else {
                                    f = a.axisX.convertValueToPixel(g);
                                    var oa =
                                        t[g] ? t[g] : 0;
                                    if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length) {
                                        q[g] = Z.y + (q[g] ? q[g] : 0);
                                        if (0 >= q[g] && a.axisY.logarithmic) continue;
                                        A = a.axisY.convertValueToPixel(q[g])
                                    } else A = a.axisY.convertValueToPixel(Z.y), A -= oa;
                                    l.push({
                                        x: f,
                                        y: p - oa
                                    });
                                    t[g] = p - A;
                                    v || da ? (!v && B.connectNullData ? (c.setLineDash && (B.options.nullDataLineDashType || x === B.lineDashType && B.lineDashType !== B.nullDataLineDashType) && (v = l.pop(), x = l[l.length - 1], d(), c.moveTo(s.x, s.y), l.push(x), l.push(v), x = B.nullDataLineDashType,
                                        c.setLineDash(Y)), c.lineTo(f, A), r && m.lineTo(f, A)) : (c.beginPath(), c.moveTo(f, A), r && (m.beginPath(), m.moveTo(f, A))), da = v = !1) : (c.lineTo(f, A), r && m.lineTo(f, A), 0 == n % 250 && (d(), c.moveTo(f, A), r && m.moveTo(f, A), l.push({
                                        x: f,
                                        y: p - oa
                                    })));
                                    s = {
                                        x: f,
                                        y: A
                                    };
                                    n < y.length - 1 && (T !== (y[n].lineColor || aa) || x !== (y[n].lineDashType || B.lineDashType)) && (d(), c.beginPath(), c.moveTo(f, A), l.push({
                                        x: f,
                                        y: p - oa
                                    }), T = y[n].lineColor || aa, c.strokeStyle = T, c.setLineDash && (y[n].lineDashType ? (x = y[n].lineDashType, c.setLineDash(R(x, B.lineThickness))) :
                                        (x = B.lineDashType, c.setLineDash(ca))));
                                    if (0 <= B.dataPointIndexes[g]) {
                                        var la = B.dataPointIds[B.dataPointIndexes[g]];
                                        this._eventManager.objectMap[la] = {
                                            id: la,
                                            objectType: "dataPoint",
                                            dataSeriesIndex: z,
                                            dataPointIndex: B.dataPointIndexes[g],
                                            x1: f,
                                            y1: A
                                        }
                                    }
                                    0 <= B.dataPointIndexes[g] && 0 !== Z.markerSize && (0 < Z.markerSize || 0 < B.markerSize) && (oa = B.getMarkerProperties(B.dataPointIndexes[g], f, A, c), h.push(oa), g = N(la), r && h.push({
                                        x: f,
                                        y: A,
                                        ctx: m,
                                        type: oa.type,
                                        size: oa.size,
                                        color: g,
                                        borderColor: g,
                                        borderThickness: oa.borderThickness
                                    }));
                                    (Z.indexLabel || B.indexLabel || Z.indexLabelFormatter || B.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "stackedArea",
                                        dataPoint: Z,
                                        dataSeries: B,
                                        point: {
                                            x: f,
                                            y: A
                                        },
                                        direction: 0 > y[n].y === a.axisY.reversed ? 1 : -1,
                                        color: e
                                    })
                                }
                        }
                        d();
                        c.moveTo(f, A);
                        r && m.moveTo(f, A)
                    }
                    delete B.dataPointIndexes
                }
                ia.drawMarkers(h);
                r && (b.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas &&
                    c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(k.x1, k.y1, k.width, k.height), m.restore());
                c.restore();
                return {
                    source: b,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderStackedArea100 = function(a) {
            function d() {
                for (0 < B.lineThickness && c.stroke(); 0 < l.length;) {
                    var a = l.pop();
                    c.lineTo(a.x, a.y);
                    r && x.lineTo(a.x,
                        a.y)
                }
                c.closePath();
                c.globalAlpha = B.fillOpacity;
                c.fill();
                c.globalAlpha = 1;
                c.beginPath();
                r && (x.closePath(), x.fill(), x.beginPath());
                l = []
            }
            var b = a.targetCanvasCtx || this.plotArea.ctx,
                c = r ? this._preRenderCtx : b;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = null,
                    g = null,
                    h = this.plotArea,
                    k = [],
                    t = [],
                    l = [],
                    u = [],
                    q = [],
                    n = 0,
                    f, m, p, v, s, C = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    x = this._eventManager.ghostCtx;
                c.save();
                r && x.save();
                c.beginPath();
                c.rect(h.x1, h.y1, h.width, h.height);
                c.clip();
                r && (x.beginPath(),
                    x.rect(h.x1, h.y1, h.width, h.height), x.clip());
                for (var e = [], w = 0; w < a.dataSeriesIndexes.length; w++) {
                    var z = a.dataSeriesIndexes[w],
                        B = this.data[z],
                        y = B.dataPoints;
                    B.dataPointIndexes = [];
                    for (n = 0; n < y.length; n++) z = y[n].x.getTime ? y[n].x.getTime() : y[n].x, B.dataPointIndexes[z] = n, e[z] || (u.push(z), e[z] = !0);
                    u.sort(Sa)
                }
                for (w = 0; w < a.dataSeriesIndexes.length; w++) {
                    z = a.dataSeriesIndexes[w];
                    B = this.data[z];
                    y = B.dataPoints;
                    v = !0;
                    e = B.id;
                    this._eventManager.objectMap[e] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: z
                    };
                    e = N(e);
                    x.fillStyle =
                        e;
                    l = [];
                    if (0 < u.length) {
                        var e = B._colorSet[n % B._colorSet.length],
                            aa = B.lineColor = B.options.lineColor || e,
                            T = aa;
                        c.fillStyle = e;
                        c.strokeStyle = aa;
                        c.lineWidth = B.lineThickness;
                        s = "solid";
                        if (c.setLineDash) {
                            var Y = R(B.nullDataLineDashType, B.lineThickness);
                            s = B.lineDashType;
                            var ca = R(s, B.lineThickness);
                            c.setLineDash(ca)
                        }
                        for (var da = !0, n = 0; n < u.length; n++) {
                            var g = u[n],
                                Z = null,
                                Z = 0 <= B.dataPointIndexes[g] ? y[B.dataPointIndexes[g]] : {
                                    x: g,
                                    y: null
                                };
                            if (!(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax && (!B.connectNullData ||
                                    !da)))
                                if ("number" !== typeof Z.y) B.connectNullData || (da || v) || d(), da = !0;
                                else {
                                    var oa;
                                    oa = 0 !== a.dataPointYSums[g] ? 100 * (Z.y / a.dataPointYSums[g]) : 0;
                                    f = a.axisX.convertValueToPixel(g);
                                    var la = t[g] ? t[g] : 0;
                                    if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length) {
                                        q[g] = oa + (q[g] ? q[g] : 0);
                                        if (0 >= q[g] && a.axisY.logarithmic) continue;
                                        m = a.axisY.convertValueToPixel(q[g])
                                    } else m = a.axisY.convertValueToPixel(oa), m -= la;
                                    l.push({
                                        x: f,
                                        y: C - la
                                    });
                                    t[g] = C - m;
                                    v || da ? (!v && B.connectNullData ? (c.setLineDash &&
                                        (B.options.nullDataLineDashType || s === B.lineDashType && B.lineDashType !== B.nullDataLineDashType) && (v = l.pop(), s = l[l.length - 1], d(), c.moveTo(p.x, p.y), l.push(s), l.push(v), s = B.nullDataLineDashType, c.setLineDash(Y)), c.lineTo(f, m), r && x.lineTo(f, m)) : (c.beginPath(), c.moveTo(f, m), r && (x.beginPath(), x.moveTo(f, m))), da = v = !1) : (c.lineTo(f, m), r && x.lineTo(f, m), 0 == n % 250 && (d(), c.moveTo(f, m), r && x.moveTo(f, m), l.push({
                                        x: f,
                                        y: C - la
                                    })));
                                    p = {
                                        x: f,
                                        y: m
                                    };
                                    n < y.length - 1 && (T !== (y[n].lineColor || aa) || s !== (y[n].lineDashType || B.lineDashType)) &&
                                        (d(), c.beginPath(), c.moveTo(f, m), l.push({
                                            x: f,
                                            y: C - la
                                        }), T = y[n].lineColor || aa, c.strokeStyle = T, c.setLineDash && (y[n].lineDashType ? (s = y[n].lineDashType, c.setLineDash(R(s, B.lineThickness))) : (s = B.lineDashType, c.setLineDash(ca))));
                                    if (0 <= B.dataPointIndexes[g]) {
                                        var G = B.dataPointIds[B.dataPointIndexes[g]];
                                        this._eventManager.objectMap[G] = {
                                            id: G,
                                            objectType: "dataPoint",
                                            dataSeriesIndex: z,
                                            dataPointIndex: B.dataPointIndexes[g],
                                            x1: f,
                                            y1: m
                                        }
                                    }
                                    0 <= B.dataPointIndexes[g] && 0 !== Z.markerSize && (0 < Z.markerSize || 0 < B.markerSize) && (la =
                                        B.getMarkerProperties(n, f, m, c), k.push(la), g = N(G), r && k.push({
                                            x: f,
                                            y: m,
                                            ctx: x,
                                            type: la.type,
                                            size: la.size,
                                            color: g,
                                            borderColor: g,
                                            borderThickness: la.borderThickness
                                        }));
                                    (Z.indexLabel || B.indexLabel || Z.indexLabelFormatter || B.indexLabelFormatter) && this._indexLabels.push({
                                        chartType: "stackedArea100",
                                        dataPoint: Z,
                                        dataSeries: B,
                                        point: {
                                            x: f,
                                            y: m
                                        },
                                        direction: 0 > y[n].y === a.axisY.reversed ? 1 : -1,
                                        color: e
                                    })
                                }
                        }
                        d();
                        c.moveTo(f, m);
                        r && x.moveTo(f, m)
                    }
                    delete B.dataPointIndexes
                }
                ia.drawMarkers(k);
                r && (b.drawImage(this._preRenderCanvas, 0,
                    0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(h.x1, h.y1, h.width, h.height), x.restore());
                c.restore();
                return {
                    source: b,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderBubble = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = this.plotArea,
                    e = 0,
                    g, h;
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(c.x1, c.y1, c.width, c.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(c.x1, c.y1, c.width, c.height), this._eventManager.ghostCtx.clip());
                for (var k = -Infinity, t = Infinity, l = 0; l < a.dataSeriesIndexes.length; l++)
                    for (var u = a.dataSeriesIndexes[l],
                            q = this.data[u], n = q.dataPoints, f = 0, e = 0; e < n.length; e++) g = n[e].getTime ? g = n[e].x.getTime() : g = n[e].x, g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax || "undefined" === typeof n[e].z || (f = n[e].z, f > k && (k = f), f < t && (t = f));
                for (var m = 25 * Math.PI, p = Math.max(Math.pow(0.25 * Math.min(c.height, c.width) / 2, 2) * Math.PI, m), l = 0; l < a.dataSeriesIndexes.length; l++)
                    if (u = a.dataSeriesIndexes[l], q = this.data[u], n = q.dataPoints, 0 < n.length)
                        for (b.strokeStyle = "#4572A7 ", e = 0; e < n.length; e++)
                            if (g = n[e].getTime ? g = n[e].x.getTime() :
                                g = n[e].x, !(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax) && "number" === typeof n[e].y) {
                                g = a.axisX.convertValueToPixel(g);
                                h = a.axisY.convertValueToPixel(n[e].y);
                                var f = n[e].z,
                                    v = 2 * Math.max(Math.sqrt((k === t ? p / 2 : m + (p - m) / (k - t) * (f - t)) / Math.PI) << 0, 1),
                                    f = q.getMarkerProperties(e, b);
                                f.size = v;
                                b.globalAlpha = q.fillOpacity;
                                ia.drawMarker(g, h, b, f.type, f.size, f.color, f.borderColor, f.borderThickness);
                                b.globalAlpha = 1;
                                var s = q.dataPointIds[e];
                                this._eventManager.objectMap[s] = {
                                    id: s,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: u,
                                    dataPointIndex: e,
                                    x1: g,
                                    y1: h,
                                    size: v
                                };
                                v = N(s);
                                r && ia.drawMarker(g, h, this._eventManager.ghostCtx, f.type, f.size, v, v, f.borderThickness);
                                (n[e].indexLabel || q.indexLabel || n[e].indexLabelFormatter || q.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "bubble",
                                    dataPoint: n[e],
                                    dataSeries: q,
                                    point: {
                                        x: g,
                                        y: h
                                    },
                                    direction: 1,
                                    bounds: {
                                        x1: g - f.size / 2,
                                        y1: h - f.size / 2,
                                        x2: g + f.size / 2,
                                        y2: h + f.size / 2
                                    },
                                    color: null
                                })
                            }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas &&
                    b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(c.x1, c.y1, c.width, c.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderScatter = function(a) {
            var d =
                a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = this.plotArea,
                    e = 0,
                    g, h;
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(c.x1, c.y1, c.width, c.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(c.x1, c.y1, c.width, c.height), this._eventManager.ghostCtx.clip());
                for (var k = 0; k < a.dataSeriesIndexes.length; k++) {
                    var t = a.dataSeriesIndexes[k],
                        l = this.data[t],
                        u = l.dataPoints;
                    if (0 < u.length) {
                        b.strokeStyle =
                            "#4572A7 ";
                        Math.pow(0.3 * Math.min(c.height, c.width) / 2, 2);
                        for (var q = 0, n = 0, e = 0; e < u.length; e++)
                            if (g = u[e].getTime ? g = u[e].x.getTime() : g = u[e].x, !(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax) && "number" === typeof u[e].y) {
                                g = a.axisX.convertValueToPixel(g);
                                h = a.axisY.convertValueToPixel(u[e].y);
                                var f = l.getMarkerProperties(e, g, h, b);
                                b.globalAlpha = l.fillOpacity;
                                ia.drawMarker(f.x, f.y, f.ctx, f.type, f.size, f.color, f.borderColor, f.borderThickness);
                                b.globalAlpha = 1;
                                Math.sqrt((q - g) * (q - g) + (n - h) * (n - h)) < Math.min(f.size,
                                    5) && u.length > Math.min(this.plotArea.width, this.plotArea.height) || (q = l.dataPointIds[e], this._eventManager.objectMap[q] = {
                                    id: q,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: t,
                                    dataPointIndex: e,
                                    x1: g,
                                    y1: h
                                }, q = N(q), r && ia.drawMarker(f.x, f.y, this._eventManager.ghostCtx, f.type, f.size, q, q, f.borderThickness), (u[e].indexLabel || l.indexLabel || u[e].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "scatter",
                                    dataPoint: u[e],
                                    dataSeries: l,
                                    point: {
                                        x: g,
                                        y: h
                                    },
                                    direction: 1,
                                    bounds: {
                                        x1: g - f.size / 2,
                                        y1: h - f.size /
                                            2,
                                        x2: g + f.size / 2,
                                        y2: h + f.size / 2
                                    },
                                    color: null
                                }), q = g, n = h)
                            }
                    }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(c.x1, c.y1, c.width, c.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderCandlestick = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d,
                c = this._eventManager.ghostCtx;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = null,
                    g = null,
                    h = this.plotArea,
                    k = 0,
                    t, l, u, q, n, f, e = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
                    g = this.options.dataPointMaxWidth ?
                    this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.015 * this.width,
                    m = a.axisX.dataInfo.minDiff;
                isFinite(m) || (m = 0.3 * Math.abs(a.axisX.range));
                m = this.options.dataPointWidth ? this.dataPointWidth : 0.7 * h.width * (a.axisX.logarithmic ? Math.log(m) / Math.log(a.axisX.range) : Math.abs(m) / Math.abs(a.axisX.range)) << 0;
                this.dataPointMaxWidth && e > g && (e = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, g));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && g < e) && (g = Math.max(this.options.dataPointWidth ?
                    this.dataPointWidth : -Infinity, e));
                m < e && (m = e);
                m > g && (m = g);
                b.save();
                r && c.save();
                b.beginPath();
                b.rect(h.x1, h.y1, h.width, h.height);
                b.clip();
                r && (c.beginPath(), c.rect(h.x1, h.y1, h.width, h.height), c.clip());
                for (var p = 0; p < a.dataSeriesIndexes.length; p++) {
                    var w = a.dataSeriesIndexes[p],
                        s = this.data[w],
                        C = s.dataPoints;
                    if (0 < C.length)
                        for (var x = 5 < m && s.bevelEnabled ? !0 : !1, k = 0; k < C.length; k++)
                            if (C[k].getTime ? f = C[k].x.getTime() : f = C[k].x, !(f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax) && !v(C[k].y) && C[k].y.length &&
                                "number" === typeof C[k].y[0] && "number" === typeof C[k].y[1] && "number" === typeof C[k].y[2] && "number" === typeof C[k].y[3]) {
                                t = a.axisX.convertValueToPixel(f);
                                l = a.axisY.convertValueToPixel(C[k].y[0]);
                                u = a.axisY.convertValueToPixel(C[k].y[1]);
                                q = a.axisY.convertValueToPixel(C[k].y[2]);
                                n = a.axisY.convertValueToPixel(C[k].y[3]);
                                var y = t - m / 2 << 0,
                                    z = y + m << 0,
                                    g = s.options.fallingColor ? s.fallingColor : s._colorSet[0],
                                    e = C[k].color ? C[k].color : s._colorSet[0],
                                    B = Math.round(Math.max(1, 0.15 * m)),
                                    D = 0 === B % 2 ? 0 : 0.5,
                                    aa = s.dataPointIds[k];
                                this._eventManager.objectMap[aa] = {
                                    id: aa,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: w,
                                    dataPointIndex: k,
                                    x1: y,
                                    y1: l,
                                    x2: z,
                                    y2: u,
                                    x3: t,
                                    y3: q,
                                    x4: t,
                                    y4: n,
                                    borderThickness: B,
                                    color: e
                                };
                                b.strokeStyle = e;
                                b.beginPath();
                                b.lineWidth = B;
                                c.lineWidth = Math.max(B, 4);
                                "candlestick" === s.type ? (b.moveTo(t - D, u), b.lineTo(t - D, Math.min(l, n)), b.stroke(), b.moveTo(t - D, Math.max(l, n)), b.lineTo(t - D, q), b.stroke(), ea(b, y, Math.min(l, n), z, Math.max(l, n), C[k].y[0] <= C[k].y[3] ? s.risingColor : g, B, e, x, x, !1, !1, s.fillOpacity), r && (e = N(aa), c.strokeStyle = e, c.moveTo(t -
                                    D, u), c.lineTo(t - D, Math.min(l, n)), c.stroke(), c.moveTo(t - D, Math.max(l, n)), c.lineTo(t - D, q), c.stroke(), ea(c, y, Math.min(l, n), z, Math.max(l, n), e, 0, null, !1, !1, !1, !1))) : "ohlc" === s.type && (b.moveTo(t - D, u), b.lineTo(t - D, q), b.stroke(), b.beginPath(), b.moveTo(t, l), b.lineTo(y, l), b.stroke(), b.beginPath(), b.moveTo(t, n), b.lineTo(z, n), b.stroke(), r && (e = N(aa), c.strokeStyle = e, c.moveTo(t - D, u), c.lineTo(t - D, q), c.stroke(), c.beginPath(), c.moveTo(t, l), c.lineTo(y, l), c.stroke(), c.beginPath(), c.moveTo(t, n), c.lineTo(z, n), c.stroke()));
                                (C[k].indexLabel || s.indexLabel || C[k].indexLabelFormatter || s.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: s.type,
                                    dataPoint: C[k],
                                    dataSeries: s,
                                    point: {
                                        x: y + (z - y) / 2,
                                        y: a.axisY.reversed ? q : u
                                    },
                                    direction: 1,
                                    bounds: {
                                        x1: y,
                                        y1: Math.min(u, q),
                                        x2: z,
                                        y2: Math.max(u, q)
                                    },
                                    color: e
                                })
                            }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas,
                    0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(h.x1, h.y1, h.width, h.height), c.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderBoxAndWhisker = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d,
                c = this._eventManager.ghostCtx;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e =
                    null,
                    g = this.plotArea,
                    h = 0,
                    k, t, l, u, q, n, f, e = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
                    h = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.015 * this.width,
                    m = a.axisX.dataInfo.minDiff;
                isFinite(m) || (m = 0.3 * Math.abs(a.axisX.range));
                m = this.options.dataPointWidth ? this.dataPointWidth : 0.7 * g.width * (a.axisX.logarithmic ? Math.log(m) / Math.log(a.axisX.range) : Math.abs(m) / Math.abs(a.axisX.range)) << 0;
                this.dataPointMaxWidth &&
                    e > h && (e = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, h));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && h < e) && (h = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, e));
                m < e && (m = e);
                m > h && (m = h);
                b.save();
                r && c.save();
                b.beginPath();
                b.rect(g.x1, g.y1, g.width, g.height);
                b.clip();
                r && (c.beginPath(), c.rect(g.x1, g.y1, g.width, g.height), c.clip());
                for (var p = !1, p = !!a.axisY.reversed, w = 0; w < a.dataSeriesIndexes.length; w++) {
                    var s = a.dataSeriesIndexes[w],
                        C = this.data[s],
                        x = C.dataPoints;
                    if (0 < x.length)
                        for (var y = 5 < m && C.bevelEnabled ? !0 : !1, h = 0; h < x.length; h++)
                            if (x[h].getTime ? f = x[h].x.getTime() : f = x[h].x, !(f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax) && !v(x[h].y) && x[h].y.length && "number" === typeof x[h].y[0] && "number" === typeof x[h].y[1] && "number" === typeof x[h].y[2] && "number" === typeof x[h].y[3] && "number" === typeof x[h].y[4] && 5 === x[h].y.length) {
                                k = a.axisX.convertValueToPixel(f);
                                t = a.axisY.convertValueToPixel(x[h].y[0]);
                                l = a.axisY.convertValueToPixel(x[h].y[1]);
                                u = a.axisY.convertValueToPixel(x[h].y[2]);
                                q = a.axisY.convertValueToPixel(x[h].y[3]);
                                n = a.axisY.convertValueToPixel(x[h].y[4]);
                                var z = k - m / 2 << 0,
                                    B = k + m / 2 << 0,
                                    e = x[h].color ? x[h].color : C._colorSet[0],
                                    D = Math.round(Math.max(1, 0.15 * m)),
                                    aa = 0 === D % 2 ? 0 : 0.5,
                                    T = x[h].whiskerColor ? x[h].whiskerColor : x[h].color ? C.whiskerColor ? C.whiskerColor : x[h].color : C.whiskerColor ? C.whiskerColor : e,
                                    Y = "number" === typeof x[h].whiskerThickness ? x[h].whiskerThickness : "number" === typeof C.options.whiskerThickness ? C.whiskerThickness : D,
                                    ca = x[h].whiskerDashType ? x[h].whiskerDashType : C.whiskerDashType,
                                    da = v(x[h].whiskerLength) ? v(C.options.whiskerLength) ? m : C.whiskerLength : x[h].whiskerLength,
                                    da = "number" === typeof da ? 0 >= da ? 0 : da >= m ? m : da : "string" === typeof da ? parseInt(da) * m / 100 > m ? m : parseInt(da) * m / 100 : m,
                                    Z = 1 === Math.round(Y) % 2 ? 0.5 : 0,
                                    oa = x[h].stemColor ? x[h].stemColor : x[h].color ? C.stemColor ? C.stemColor : x[h].color : C.stemColor ? C.stemColor : e,
                                    la = "number" === typeof x[h].stemThickness ? x[h].stemThickness : "number" === typeof C.options.stemThickness ? C.stemThickness : D,
                                    G = 1 === Math.round(la) % 2 ? 0.5 : 0,
                                    H = x[h].stemDashType ? x[h].stemDashType :
                                    C.stemDashType,
                                    E = x[h].lineColor ? x[h].lineColor : x[h].color ? C.lineColor ? C.lineColor : x[h].color : C.lineColor ? C.lineColor : e,
                                    F = "number" === typeof x[h].lineThickness ? x[h].lineThickness : "number" === typeof C.options.lineThickness ? C.lineThickness : D,
                                    I = x[h].lineDashType ? x[h].lineDashType : C.lineDashType,
                                    K = 1 === Math.round(F) % 2 ? 0.5 : 0,
                                    L = C.upperBoxColor,
                                    O = C.lowerBoxColor,
                                    Q = v(C.options.fillOpacity) ? 1 : C.fillOpacity,
                                    P = C.dataPointIds[h];
                                this._eventManager.objectMap[P] = {
                                    id: P,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: s,
                                    dataPointIndex: h,
                                    x1: z,
                                    y1: t,
                                    x2: B,
                                    y2: l,
                                    x3: k,
                                    y3: u,
                                    x4: k,
                                    y4: q,
                                    y5: n,
                                    borderThickness: D,
                                    color: e,
                                    stemThickness: la,
                                    stemColor: oa,
                                    whiskerThickness: Y,
                                    whiskerLength: da,
                                    whiskerColor: T,
                                    lineThickness: F,
                                    lineColor: E
                                };
                                b.save();
                                0 < la && (b.beginPath(), b.strokeStyle = oa, b.lineWidth = la, b.setLineDash && b.setLineDash(R(H, la)), b.moveTo(k - G, l), b.lineTo(k - G, t), b.stroke(), b.moveTo(k - G, q), b.lineTo(k - G, u), b.stroke());
                                b.restore();
                                c.lineWidth = Math.max(D, 4);
                                b.beginPath();
                                ea(b, z, Math.min(n, l), B, Math.max(l, n), O, 0, e, p ? y : !1, p ? !1 : y, !1, !1, Q);
                                b.beginPath();
                                ea(b,
                                    z, Math.min(u, n), B, Math.max(n, u), L, 0, e, p ? !1 : y, p ? y : !1, !1, !1, Q);
                                b.beginPath();
                                b.lineWidth = D;
                                b.strokeStyle = e;
                                b.rect(z - aa, Math.min(l, u) - aa, B - z + 2 * aa, Math.max(l, u) - Math.min(l, u) + 2 * aa);
                                b.stroke();
                                b.save();
                                0 < F && (b.beginPath(), b.globalAlpha = 1, b.setLineDash && b.setLineDash(R(I, F)), b.strokeStyle = E, b.lineWidth = F, b.moveTo(z, n - K), b.lineTo(B, n - K), b.stroke());
                                b.restore();
                                b.save();
                                0 < Y && (b.beginPath(), b.setLineDash && b.setLineDash(R(ca, Y)), b.strokeStyle = T, b.lineWidth = Y, b.moveTo(k - da / 2 << 0, q - Z), b.lineTo(k + da / 2 << 0, q - Z),
                                    b.stroke(), b.moveTo(k - da / 2 << 0, t + Z), b.lineTo(k + da / 2 << 0, t + Z), b.stroke());
                                b.restore();
                                r && (e = N(P), c.strokeStyle = e, c.lineWidth = la, 0 < la && (c.moveTo(k - aa - G, l), c.lineTo(k - aa - G, Math.max(t, q)), c.stroke(), c.moveTo(k - aa - G, Math.min(t, q)), c.lineTo(k - aa - G, u), c.stroke()), ea(c, z, Math.max(l, u), B, Math.min(l, u), e, 0, null, !1, !1, !1, !1), 0 < Y && (c.beginPath(), c.lineWidth = Y, c.moveTo(k + da / 2, q - Z), c.lineTo(k - da / 2, q - Z), c.stroke(), c.moveTo(k + da / 2, t + Z), c.lineTo(k - da / 2, t + Z), c.stroke()));
                                (x[h].indexLabel || C.indexLabel || x[h].indexLabelFormatter ||
                                    C.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: C.type,
                                    dataPoint: x[h],
                                    dataSeries: C,
                                    point: {
                                        x: z + (B - z) / 2,
                                        y: a.axisY.reversed ? t : q
                                    },
                                    direction: 1,
                                    bounds: {
                                        x1: z,
                                        y1: Math.min(t, q),
                                        x2: B,
                                        y2: Math.max(t, q)
                                    },
                                    color: e
                                })
                            }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas,
                    0, 0, this.width, this.height), b.clearRect(g.x1, g.y1, g.width, g.height), c.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderRangeColumn = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = 0,
                    h, k, t, g = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth :
                    1;
                h = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.03 * this.width;
                var l = a.axisX.dataInfo.minDiff;
                isFinite(l) || (l = 0.3 * Math.abs(a.axisX.range));
                l = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(l) / Math.log(a.axisX.range) : Math.abs(l) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
                this.dataPointMaxWidth && g > h && (g = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, h));
                !this.dataPointMaxWidth &&
                    (this.dataPointMinWidth && h < g) && (h = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, g));
                l < g && (l = g);
                l > h && (l = h);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (var u = 0; u < a.dataSeriesIndexes.length; u++) {
                    var q = a.dataSeriesIndexes[u],
                        n = this.data[q],
                        f = n.dataPoints;
                    if (0 < f.length)
                        for (var m =
                                5 < l && n.bevelEnabled ? !0 : !1, g = 0; g < f.length; g++)
                            if (f[g].getTime ? t = f[g].x.getTime() : t = f[g].x, !(t < a.axisX.dataInfo.viewPortMin || t > a.axisX.dataInfo.viewPortMax) && !v(f[g].y) && f[g].y.length && "number" === typeof f[g].y[0] && "number" === typeof f[g].y[1]) {
                                c = a.axisX.convertValueToPixel(t);
                                h = a.axisY.convertValueToPixel(f[g].y[0]);
                                k = a.axisY.convertValueToPixel(f[g].y[1]);
                                var p = a.axisX.reversed ? c + a.plotType.totalDataSeries * l / 2 - (a.previousDataSeriesCount + u) * l << 0 : c - a.plotType.totalDataSeries * l / 2 + (a.previousDataSeriesCount +
                                        u) * l << 0,
                                    w = a.axisX.reversed ? p - l << 0 : p + l << 0,
                                    c = f[g].color ? f[g].color : n._colorSet[g % n._colorSet.length];
                                if (h > k) {
                                    var s = h;
                                    h = k;
                                    k = s
                                }
                                s = n.dataPointIds[g];
                                this._eventManager.objectMap[s] = {
                                    id: s,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: q,
                                    dataPointIndex: g,
                                    x1: p,
                                    y1: h,
                                    x2: w,
                                    y2: k
                                };
                                ea(b, p, h, w, k, c, 0, c, m, m, !1, !1, n.fillOpacity);
                                c = N(s);
                                r && ea(this._eventManager.ghostCtx, p, h, w, k, c, 0, null, !1, !1, !1, !1);
                                if (f[g].indexLabel || n.indexLabel || f[g].indexLabelFormatter || n.indexLabelFormatter) this._indexLabels.push({
                                    chartType: "rangeColumn",
                                    dataPoint: f[g],
                                    dataSeries: n,
                                    indexKeyword: 0,
                                    point: {
                                        x: p + (w - p) / 2,
                                        y: f[g].y[1] >= f[g].y[0] ? k : h
                                    },
                                    direction: f[g].y[1] >= f[g].y[0] ? -1 : 1,
                                    bounds: {
                                        x1: p,
                                        y1: Math.min(h, k),
                                        x2: w,
                                        y2: Math.max(h, k)
                                    },
                                    color: c
                                }), this._indexLabels.push({
                                    chartType: "rangeColumn",
                                    dataPoint: f[g],
                                    dataSeries: n,
                                    indexKeyword: 1,
                                    point: {
                                        x: p + (w - p) / 2,
                                        y: f[g].y[1] >= f[g].y[0] ? h : k
                                    },
                                    direction: f[g].y[1] >= f[g].y[0] ? 1 : -1,
                                    bounds: {
                                        x1: p,
                                        y1: Math.min(h, k),
                                        x2: w,
                                        y2: Math.max(h, k)
                                    },
                                    color: c
                                })
                            }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation =
                    "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderError =
            function(a) {
                var d = a.targetCanvasCtx || this.plotArea.ctx,
                    b = r ? this._preRenderCtx : d,
                    c = a.axisY._position ? "left" === a.axisY._position || "right" === a.axisY._position ? !1 : !0 : !1;
                if (!(0 >= a.dataSeriesIndexes.length)) {
                    var e = null,
                        g = !1,
                        h = this.plotArea,
                        k = 0,
                        t, l, u, q, n, f, m, p = a.axisX.dataInfo.minDiff;
                    isFinite(p) || (p = 0.3 * Math.abs(a.axisX.range));
                    b.save();
                    r && this._eventManager.ghostCtx.save();
                    b.beginPath();
                    b.rect(h.x1, h.y1, h.width, h.height);
                    b.clip();
                    r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(h.x1,
                        h.y1, h.width, h.height), this._eventManager.ghostCtx.clip());
                    for (var w = 0, s = 0; s < this.data.length; s++) !this.data[s].type.match(/(bar|column)/ig) || !this.data[s].visible || this.data[s].type.match(/(stacked)/ig) && w || w++;
                    for (var C = 0; C < a.dataSeriesIndexes.length; C++) {
                        var x = a.dataSeriesIndexes[C],
                            y = this.data[x],
                            z = y.dataPoints,
                            B = v(y._linkedSeries) ? !1 : y._linkedSeries.type.match(/(bar|column)/ig) && y._linkedSeries.visible ? !0 : !1,
                            D = 0;
                        if (B)
                            for (e = y._linkedSeries.id, s = 0; s < e; s++) !this.data[s].type.match(/(bar|column)/ig) ||
                                !this.data[s].visible || this.data[s].type.match(/(stacked)/ig) && D || (this.data[s].type.match(/(range)/ig) && (g = !0), D++);
                        e = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
                        k = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : c ? Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / (B ? w : 1))) << 0 : 0.3 * this.width;
                        g && (k = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth :
                            c ? Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / (B ? w : 1))) << 0 : 0.03 * this.width);
                        s = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * ((c ? h.height : h.width) * (a.axisX.logarithmic ? Math.log(p) / Math.log(a.axisX.range) : Math.abs(p) / Math.abs(a.axisX.range)) / (B ? w : 1)) << 0;
                        this.dataPointMaxWidth && e > k && (e = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, k));
                        !this.dataPointMaxWidth && (this.dataPointMinWidth && k < e) && (k = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, e));
                        s < e &&
                            (s = e);
                        s > k && (s = k);
                        if (0 < z.length)
                            for (var aa = y._colorSet, k = 0; k < z.length; k++) {
                                var e = y.lineColor = y.options.color ? y.options.color : aa[0],
                                    T = {
                                        color: z[k].whiskerColor ? z[k].whiskerColor : z[k].color ? y.whiskerColor ? y.whiskerColor : z[k].color : y.whiskerColor ? y.whiskerColor : e,
                                        thickness: v(z[k].whiskerThickness) ? y.whiskerThickness : z[k].whiskerThickness,
                                        dashType: z[k].whiskerDashType ? z[k].whiskerDashType : y.whiskerDashType,
                                        length: v(z[k].whiskerLength) ? v(y.options.whiskerLength) ? s : y.options.whiskerLength : z[k].whiskerLength,
                                        trimLength: v(z[k].whiskerLength) ? v(y.options.whiskerLength) ? 50 : 0 : 0
                                    };
                                T.length = "number" === typeof T.length ? 0 >= T.length ? 0 : T.length >= s ? s : T.length : "string" === typeof T.length ? parseInt(T.length) * s / 100 > s ? s : parseInt(T.length) * s / 100 > s : s;
                                T.thickness = "number" === typeof T.thickness ? 0 > T.thickness ? 0 : Math.round(T.thickness) : 2;
                                var Y = {
                                    color: z[k].stemColor ? z[k].stemColor : z[k].color ? y.stemColor ? y.stemColor : z[k].color : y.stemColor ? y.stemColor : e,
                                    thickness: z[k].stemThickness ? z[k].stemThickness : y.stemThickness,
                                    dashType: z[k].stemDashType ?
                                        z[k].stemDashType : y.stemDashType
                                };
                                Y.thickness = "number" === typeof Y.thickness ? 0 > Y.thickness ? 0 : Math.round(Y.thickness) : 2;
                                z[k].getTime ? m = z[k].x.getTime() : m = z[k].x;
                                if (!(m < a.axisX.dataInfo.viewPortMin || m > a.axisX.dataInfo.viewPortMax) && !v(z[k].y) && z[k].y.length && "number" === typeof z[k].y[0] && "number" === typeof z[k].y[1]) {
                                    var ca = a.axisX.convertValueToPixel(m);
                                    c ? l = ca : t = ca;
                                    ca = a.axisY.convertValueToPixel(z[k].y[0]);
                                    c ? u = ca : n = ca;
                                    ca = a.axisY.convertValueToPixel(z[k].y[1]);
                                    c ? q = ca : f = ca;
                                    c ? (n = a.axisX.reversed ? l + (B ? w :
                                        1) * s / 2 - (B ? D - 1 : 0) * s << 0 : l - (B ? w : 1) * s / 2 + (B ? D - 1 : 0) * s << 0, f = a.axisX.reversed ? n - s << 0 : n + s << 0) : (u = a.axisX.reversed ? t + (B ? w : 1) * s / 2 - (B ? D - 1 : 0) * s << 0 : t - (B ? w : 1) * s / 2 + (B ? D - 1 : 0) * s << 0, q = a.axisX.reversed ? u - s << 0 : u + s << 0);
                                    !c && n > f && (ca = n, n = f, f = ca);
                                    c && u > q && (ca = u, u = q, q = ca);
                                    ca = y.dataPointIds[k];
                                    this._eventManager.objectMap[ca] = {
                                        id: ca,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: x,
                                        dataPointIndex: k,
                                        x1: Math.min(u, q),
                                        y1: Math.min(n, f),
                                        x2: Math.max(q, u),
                                        y2: Math.max(f, n),
                                        isXYSwapped: c,
                                        stemProperties: Y,
                                        whiskerProperties: T
                                    };
                                    E(b, Math.min(u, q),
                                        Math.min(n, f), Math.max(q, u), Math.max(f, n), e, T, Y, c);
                                    r && E(this._eventManager.ghostCtx, u, n, q, f, e, T, Y, c);
                                    if (z[k].indexLabel || y.indexLabel || z[k].indexLabelFormatter || y.indexLabelFormatter) this._indexLabels.push({
                                            chartType: "error",
                                            dataPoint: z[k],
                                            dataSeries: y,
                                            indexKeyword: 0,
                                            point: {
                                                x: c ? z[k].y[1] >= z[k].y[0] ? u : q : u + (q - u) / 2,
                                                y: c ? n + (f - n) / 2 : z[k].y[1] >= z[k].y[0] ? f : n
                                            },
                                            direction: z[k].y[1] >= z[k].y[0] ? -1 : 1,
                                            bounds: {
                                                x1: c ? Math.min(u, q) : u,
                                                y1: c ? n : Math.min(n, f),
                                                x2: c ? Math.max(u, q) : q,
                                                y2: c ? f : Math.max(n, f)
                                            },
                                            color: e,
                                            axisSwapped: c
                                        }),
                                        this._indexLabels.push({
                                            chartType: "error",
                                            dataPoint: z[k],
                                            dataSeries: y,
                                            indexKeyword: 1,
                                            point: {
                                                x: c ? z[k].y[1] >= z[k].y[0] ? q : u : u + (q - u) / 2,
                                                y: c ? n + (f - n) / 2 : z[k].y[1] >= z[k].y[0] ? n : f
                                            },
                                            direction: z[k].y[1] >= z[k].y[0] ? 1 : -1,
                                            bounds: {
                                                x1: c ? Math.min(u, q) : u,
                                                y1: c ? n : Math.min(n, f),
                                                x2: c ? Math.max(u, q) : q,
                                                y2: c ? f : Math.max(n, f)
                                            },
                                            color: e,
                                            axisSwapped: c
                                        })
                                }
                            }
                    }
                    r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height),
                        a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(h.x1, h.y1, h.width, h.height), this._eventManager.ghostCtx.restore());
                    b.restore();
                    return {
                        source: d,
                        dest: this.plotArea.ctx,
                        animationCallback: M.fadeInAnimation,
                        easingFunction: M.easing.easeInQuad,
                        animationBase: 0
                    }
                }
            };
        m.prototype.renderRangeBar = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx :
                d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = null,
                    e = this.plotArea,
                    g = 0,
                    h, k, t, l, g = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
                h = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / a.plotType.totalDataSeries)) << 0;
                var u = a.axisX.dataInfo.minDiff;
                isFinite(u) || (u = 0.3 * Math.abs(a.axisX.range));
                u = this.options.dataPointWidth ? this.dataPointWidth : 0.9 *
                    (e.height * (a.axisX.logarithmic ? Math.log(u) / Math.log(a.axisX.range) : Math.abs(u) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
                this.dataPointMaxWidth && g > h && (g = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, h));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && h < g) && (h = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, g));
                u < g && (u = g);
                u > h && (u = h);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(e.x1, e.y1, e.width, e.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(),
                    this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
                for (var q = 0; q < a.dataSeriesIndexes.length; q++) {
                    var n = a.dataSeriesIndexes[q],
                        f = this.data[n],
                        m = f.dataPoints;
                    if (0 < m.length) {
                        var p = 5 < u && f.bevelEnabled ? !0 : !1;
                        b.strokeStyle = "#4572A7 ";
                        for (g = 0; g < m.length; g++)
                            if (m[g].getTime ? l = m[g].x.getTime() : l = m[g].x, !(l < a.axisX.dataInfo.viewPortMin || l > a.axisX.dataInfo.viewPortMax) && !v(m[g].y) && m[g].y.length && "number" === typeof m[g].y[0] && "number" === typeof m[g].y[1]) {
                                h = a.axisY.convertValueToPixel(m[g].y[0]);
                                k = a.axisY.convertValueToPixel(m[g].y[1]);
                                t = a.axisX.convertValueToPixel(l);
                                t = a.axisX.reversed ? t + a.plotType.totalDataSeries * u / 2 - (a.previousDataSeriesCount + q) * u << 0 : t - a.plotType.totalDataSeries * u / 2 + (a.previousDataSeriesCount + q) * u << 0;
                                var w = a.axisX.reversed ? t - u << 0 : t + u << 0;
                                h > k && (c = h, h = k, k = c);
                                c = m[g].color ? m[g].color : f._colorSet[g % f._colorSet.length];
                                ea(b, h, t, k, w, c, 0, null, p, !1, !1, !1, f.fillOpacity);
                                c = f.dataPointIds[g];
                                this._eventManager.objectMap[c] = {
                                    id: c,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: n,
                                    dataPointIndex: g,
                                    x1: h,
                                    y1: t,
                                    x2: k,
                                    y2: w
                                };
                                c = N(c);
                                r && ea(this._eventManager.ghostCtx, h, t, k, w, c, 0, null, !1, !1, !1, !1);
                                if (m[g].indexLabel || f.indexLabel || m[g].indexLabelFormatter || f.indexLabelFormatter) this._indexLabels.push({
                                    chartType: "rangeBar",
                                    dataPoint: m[g],
                                    dataSeries: f,
                                    indexKeyword: 0,
                                    point: {
                                        x: m[g].y[1] >= m[g].y[0] ? h : k,
                                        y: t + (w - t) / 2
                                    },
                                    direction: m[g].y[1] >= m[g].y[0] ? -1 : 1,
                                    bounds: {
                                        x1: Math.min(h, k),
                                        y1: t,
                                        x2: Math.max(h, k),
                                        y2: w
                                    },
                                    color: c
                                }), this._indexLabels.push({
                                    chartType: "rangeBar",
                                    dataPoint: m[g],
                                    dataSeries: f,
                                    indexKeyword: 1,
                                    point: {
                                        x: m[g].y[1] >=
                                            m[g].y[0] ? k : h,
                                        y: t + (w - t) / 2
                                    },
                                    direction: m[g].y[1] >= m[g].y[0] ? 1 : -1,
                                    bounds: {
                                        x1: Math.min(h, k),
                                        y1: t,
                                        x2: Math.max(h, k),
                                        y2: w
                                    },
                                    color: c
                                })
                            }
                    }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(e.x1,
                    e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderRangeArea = function(a) {
            function d() {
                if (C) {
                    var a = null;
                    0 < u.lineThickness && c.stroke();
                    for (var b = t.length - 1; 0 <= b; b--) a = t[b], c.lineTo(a.x, a.y), e.lineTo(a.x, a.y);
                    c.closePath();
                    c.globalAlpha = u.fillOpacity;
                    c.fill();
                    c.globalAlpha = 1;
                    e.fill();
                    if (0 < u.lineThickness) {
                        c.beginPath();
                        c.moveTo(a.x,
                            a.y);
                        for (b = 0; b < t.length; b++) a = t[b], c.lineTo(a.x, a.y);
                        c.stroke()
                    }
                    c.beginPath();
                    c.moveTo(m, p);
                    e.beginPath();
                    e.moveTo(m, p);
                    C = {
                        x: m,
                        y: p
                    };
                    t = [];
                    t.push({
                        x: m,
                        y: v
                    })
                }
            }
            var b = a.targetCanvasCtx || this.plotArea.ctx,
                c = r ? this._preRenderCtx : b;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = this._eventManager.ghostCtx,
                    g = [],
                    h = this.plotArea;
                c.save();
                r && e.save();
                c.beginPath();
                c.rect(h.x1, h.y1, h.width, h.height);
                c.clip();
                r && (e.beginPath(), e.rect(h.x1, h.y1, h.width, h.height), e.clip());
                for (var k = 0; k < a.dataSeriesIndexes.length; k++) {
                    var t = [],
                        l = a.dataSeriesIndexes[k],
                        u = this.data[l],
                        q = u.dataPoints,
                        g = u.id;
                    this._eventManager.objectMap[g] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: l
                    };
                    g = N(g);
                    e.fillStyle = g;
                    var g = [],
                        n = !0,
                        f = 0,
                        m, p, v, s, C = null;
                    if (0 < q.length) {
                        var x = u._colorSet[f % u._colorSet.length],
                            w = u.lineColor = u.options.lineColor || x,
                            z = w;
                        c.fillStyle = x;
                        c.strokeStyle = w;
                        c.lineWidth = u.lineThickness;
                        var B = "solid";
                        if (c.setLineDash) {
                            var y = R(u.nullDataLineDashType, u.lineThickness),
                                B = u.lineDashType,
                                D = R(B, u.lineThickness);
                            c.setLineDash(D)
                        }
                        for (var T = !0; f <
                            q.length; f++)
                            if (s = q[f].x.getTime ? q[f].x.getTime() : q[f].x, !(s < a.axisX.dataInfo.viewPortMin || s > a.axisX.dataInfo.viewPortMax && (!u.connectNullData || !T)))
                                if (null !== q[f].y && q[f].y.length && "number" === typeof q[f].y[0] && "number" === typeof q[f].y[1]) {
                                    m = a.axisX.convertValueToPixel(s);
                                    p = a.axisY.convertValueToPixel(q[f].y[0]);
                                    v = a.axisY.convertValueToPixel(q[f].y[1]);
                                    n || T ? (u.connectNullData && !n ? (c.setLineDash && (u.options.nullDataLineDashType || B === u.lineDashType && u.lineDashType !== u.nullDataLineDashType) && (t[t.length -
                                        1].newLineDashArray = D, B = u.nullDataLineDashType, c.setLineDash(y)), c.lineTo(m, p), r && e.lineTo(m, p), t.push({
                                        x: m,
                                        y: v
                                    })) : (c.beginPath(), c.moveTo(m, p), C = {
                                        x: m,
                                        y: p
                                    }, t = [], t.push({
                                        x: m,
                                        y: v
                                    }), r && (e.beginPath(), e.moveTo(m, p))), T = n = !1) : (c.lineTo(m, p), t.push({
                                        x: m,
                                        y: v
                                    }), r && e.lineTo(m, p), 0 == f % 250 && d());
                                    s = u.dataPointIds[f];
                                    this._eventManager.objectMap[s] = {
                                        id: s,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: l,
                                        dataPointIndex: f,
                                        x1: m,
                                        y1: p,
                                        y2: v
                                    };
                                    f < q.length - 1 && (z !== (q[f].lineColor || w) || B !== (q[f].lineDashType || u.lineDashType)) && (d(),
                                        z = q[f].lineColor || w, t[t.length - 1].newStrokeStyle = z, c.strokeStyle = z, c.setLineDash && (q[f].lineDashType ? (B = q[f].lineDashType, t[t.length - 1].newLineDashArray = R(B, u.lineThickness), c.setLineDash(t[t.length - 1].newLineDashArray)) : (B = u.lineDashType, t[t.length - 1].newLineDashArray = D, c.setLineDash(D))));
                                    if (0 !== q[f].markerSize && (0 < q[f].markerSize || 0 < u.markerSize)) {
                                        var Y = u.getMarkerProperties(f, m, v, c);
                                        g.push(Y);
                                        var ca = N(s);
                                        r && g.push({
                                            x: m,
                                            y: v,
                                            ctx: e,
                                            type: Y.type,
                                            size: Y.size,
                                            color: ca,
                                            borderColor: ca,
                                            borderThickness: Y.borderThickness
                                        });
                                        Y = u.getMarkerProperties(f, m, p, c);
                                        g.push(Y);
                                        ca = N(s);
                                        r && g.push({
                                            x: m,
                                            y: p,
                                            ctx: e,
                                            type: Y.type,
                                            size: Y.size,
                                            color: ca,
                                            borderColor: ca,
                                            borderThickness: Y.borderThickness
                                        })
                                    }
                                    if (q[f].indexLabel || u.indexLabel || q[f].indexLabelFormatter || u.indexLabelFormatter) this._indexLabels.push({
                                        chartType: "rangeArea",
                                        dataPoint: q[f],
                                        dataSeries: u,
                                        indexKeyword: 0,
                                        point: {
                                            x: m,
                                            y: p
                                        },
                                        direction: q[f].y[0] > q[f].y[1] === a.axisY.reversed ? -1 : 1,
                                        color: x
                                    }), this._indexLabels.push({
                                        chartType: "rangeArea",
                                        dataPoint: q[f],
                                        dataSeries: u,
                                        indexKeyword: 1,
                                        point: {
                                            x: m,
                                            y: v
                                        },
                                        direction: q[f].y[0] > q[f].y[1] === a.axisY.reversed ? 1 : -1,
                                        color: x
                                    })
                                } else T || n || d(), T = !0;
                        d();
                        ia.drawMarkers(g)
                    }
                }
                r && (b.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(h.x1, h.y1,
                    h.width, h.height), this._eventManager.ghostCtx.restore());
                c.restore();
                return {
                    source: b,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderRangeSplineArea = function(a) {
            function d(a, b) {
                var d = w(p, 2);
                if (0 < d.length) {
                    if (0 < l.lineThickness) {
                        c.strokeStyle = b;
                        c.setLineDash && c.setLineDash(a);
                        c.beginPath();
                        c.moveTo(d[0].x, d[0].y);
                        for (var f = 0; f < d.length - 3; f += 3) {
                            if (d[f].newStrokeStyle || d[f].newLineDashArray) c.stroke(), c.beginPath(), c.moveTo(d[f].x,
                                d[f].y), d[f].newStrokeStyle && (c.strokeStyle = d[f].newStrokeStyle), d[f].newLineDashArray && c.setLineDash(d[f].newLineDashArray);
                            c.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y)
                        }
                        c.stroke()
                    }
                    c.beginPath();
                    c.moveTo(d[0].x, d[0].y);
                    r && (e.beginPath(), e.moveTo(d[0].x, d[0].y));
                    for (f = 0; f < d.length - 3; f += 3) c.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y), r && e.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y);
                    d = w(v, 2);
                    c.lineTo(v[v.length - 1].x, v[v.length -
                        1].y);
                    for (f = d.length - 1; 2 < f; f -= 3) c.bezierCurveTo(d[f - 1].x, d[f - 1].y, d[f - 2].x, d[f - 2].y, d[f - 3].x, d[f - 3].y), r && e.bezierCurveTo(d[f - 1].x, d[f - 1].y, d[f - 2].x, d[f - 2].y, d[f - 3].x, d[f - 3].y);
                    c.closePath();
                    c.globalAlpha = l.fillOpacity;
                    c.fill();
                    r && (e.closePath(), e.fill());
                    c.globalAlpha = 1;
                    if (0 < l.lineThickness) {
                        c.strokeStyle = b;
                        c.setLineDash && c.setLineDash(a);
                        c.beginPath();
                        c.moveTo(d[0].x, d[0].y);
                        for (var g = f = 0; f < d.length - 3; f += 3, g++) {
                            if (p[g].newStrokeStyle || p[g].newLineDashArray) c.stroke(), c.beginPath(), c.moveTo(d[f].x,
                                d[f].y), p[g].newStrokeStyle && (c.strokeStyle = p[g].newStrokeStyle), p[g].newLineDashArray && c.setLineDash(p[g].newLineDashArray);
                            c.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y)
                        }
                        c.stroke()
                    }
                    c.beginPath()
                }
            }
            var b = a.targetCanvasCtx || this.plotArea.ctx,
                c = r ? this._preRenderCtx : b;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var e = this._eventManager.ghostCtx,
                    g = [],
                    h = this.plotArea;
                c.save();
                r && e.save();
                c.beginPath();
                c.rect(h.x1, h.y1, h.width, h.height);
                c.clip();
                r && (e.beginPath(), e.rect(h.x1, h.y1, h.width,
                    h.height), e.clip());
                for (var k = 0; k < a.dataSeriesIndexes.length; k++) {
                    var t = a.dataSeriesIndexes[k],
                        l = this.data[t],
                        u = l.dataPoints,
                        g = l.id;
                    this._eventManager.objectMap[g] = {
                        objectType: "dataSeries",
                        dataSeriesIndex: t
                    };
                    g = N(g);
                    e.fillStyle = g;
                    var g = [],
                        q = 0,
                        n, f, m, p = [],
                        v = [];
                    if (0 < u.length) {
                        var s = l._colorSet[q % l._colorSet.length],
                            C = l.lineColor = l.options.lineColor || s,
                            x = C;
                        c.fillStyle = s;
                        c.lineWidth = l.lineThickness;
                        var y = "solid",
                            z;
                        if (c.setLineDash) {
                            var B = R(l.nullDataLineDashType, l.lineThickness),
                                y = l.lineDashType;
                            z = R(y,
                                l.lineThickness)
                        }
                        for (f = !1; q < u.length; q++)
                            if (n = u[q].x.getTime ? u[q].x.getTime() : u[q].x, !(n < a.axisX.dataInfo.viewPortMin || n > a.axisX.dataInfo.viewPortMax && (!l.connectNullData || !f)))
                                if (null !== u[q].y && u[q].y.length && "number" === typeof u[q].y[0] && "number" === typeof u[q].y[1]) {
                                    n = a.axisX.convertValueToPixel(n);
                                    f = a.axisY.convertValueToPixel(u[q].y[0]);
                                    m = a.axisY.convertValueToPixel(u[q].y[1]);
                                    var H = l.dataPointIds[q];
                                    this._eventManager.objectMap[H] = {
                                        id: H,
                                        objectType: "dataPoint",
                                        dataSeriesIndex: t,
                                        dataPointIndex: q,
                                        x1: n,
                                        y1: f,
                                        y2: m
                                    };
                                    p[p.length] = {
                                        x: n,
                                        y: f
                                    };
                                    v[v.length] = {
                                        x: n,
                                        y: m
                                    };
                                    q < u.length - 1 && (x !== (u[q].lineColor || C) || y !== (u[q].lineDashType || l.lineDashType)) && (x = u[q].lineColor || C, p[p.length - 1].newStrokeStyle = x, c.setLineDash && (u[q].lineDashType ? (y = u[q].lineDashType, p[p.length - 1].newLineDashArray = R(y, l.lineThickness)) : (y = l.lineDashType, p[p.length - 1].newLineDashArray = z)));
                                    if (0 !== u[q].markerSize && (0 < u[q].markerSize || 0 < l.markerSize)) {
                                        var aa = l.getMarkerProperties(q, n, f, c);
                                        g.push(aa);
                                        var T = N(H);
                                        r && g.push({
                                            x: n,
                                            y: f,
                                            ctx: e,
                                            type: aa.type,
                                            size: aa.size,
                                            color: T,
                                            borderColor: T,
                                            borderThickness: aa.borderThickness
                                        });
                                        aa = l.getMarkerProperties(q, n, m, c);
                                        g.push(aa);
                                        T = N(H);
                                        r && g.push({
                                            x: n,
                                            y: m,
                                            ctx: e,
                                            type: aa.type,
                                            size: aa.size,
                                            color: T,
                                            borderColor: T,
                                            borderThickness: aa.borderThickness
                                        })
                                    }
                                    if (u[q].indexLabel || l.indexLabel || u[q].indexLabelFormatter || l.indexLabelFormatter) this._indexLabels.push({
                                        chartType: "rangeSplineArea",
                                        dataPoint: u[q],
                                        dataSeries: l,
                                        indexKeyword: 0,
                                        point: {
                                            x: n,
                                            y: f
                                        },
                                        direction: u[q].y[0] <= u[q].y[1] ? -1 : 1,
                                        color: s
                                    }), this._indexLabels.push({
                                        chartType: "rangeSplineArea",
                                        dataPoint: u[q],
                                        dataSeries: l,
                                        indexKeyword: 1,
                                        point: {
                                            x: n,
                                            y: m
                                        },
                                        direction: u[q].y[0] <= u[q].y[1] ? 1 : -1,
                                        color: s
                                    });
                                    f = !1
                                } else 0 < q && !f && (l.connectNullData ? c.setLineDash && (0 < p.length && (l.options.nullDataLineDashType || !u[q - 1].lineDashType)) && (p[p.length - 1].newLineDashArray = B, y = l.nullDataLineDashType) : (d(z, C), p = [], v = [])), f = !0;
                        d(z, C);
                        ia.drawMarkers(g)
                    }
                }
                r && (b.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0,
                    this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(h.x1, h.y1, h.width, h.height), this._eventManager.ghostCtx.restore());
                c.restore();
                return {
                    source: b,
                    dest: this.plotArea.ctx,
                    animationCallback: M.xClipAnimation,
                    easingFunction: M.easing.linear,
                    animationBase: 0
                }
            }
        };
        m.prototype.renderWaterfall = function(a) {
            var d = a.targetCanvasCtx || this.plotArea.ctx,
                b = r ? this._preRenderCtx : d;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var c = this._eventManager.ghostCtx,
                    e = null,
                    g = this.plotArea,
                    h = 0,
                    k, t, l, u, q = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
                    h = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
                t = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.width, 0.9 * (this.plotArea.width / a.plotType.totalDataSeries)) << 0;
                var n =
                    a.axisX.dataInfo.minDiff;
                isFinite(n) || (n = 0.3 * Math.abs(a.axisX.range));
                n = this.options.dataPointWidth ? this.dataPointWidth : 0.6 * (g.width * (a.axisX.logarithmic ? Math.log(n) / Math.log(a.axisX.range) : Math.abs(n) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
                this.dataPointMaxWidth && h > t && (h = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, t));
                !this.dataPointMaxWidth && (this.dataPointMinWidth && t < h) && (t = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, h));
                n < h && (n = h);
                n > t && (n = t);
                b.save();
                r && this._eventManager.ghostCtx.save();
                b.beginPath();
                b.rect(g.x1, g.y1, g.width, g.height);
                b.clip();
                r && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(g.x1, g.y1, g.width, g.height), this._eventManager.ghostCtx.clip());
                for (var f = 0; f < a.dataSeriesIndexes.length; f++) {
                    var m = a.dataSeriesIndexes[f],
                        p = this.data[m],
                        v = p.dataPoints,
                        e = p._colorSet[0];
                    p.risingColor = p.options.risingColor ? p.options.risingColor : e;
                    p.fallingColor = p.options.fallingColor ? p.options.fallingColor : "#e40a0a";
                    var s = "number" === typeof p.options.lineThickness ? Math.round(p.lineThickness) : 1,
                        w = 1 === Math.round(s) % 2 ? -0.5 : 0;
                    if (0 < v.length)
                        for (var x = 5 < n && p.bevelEnabled ? !0 : !1, y = !1, z = null, B = null, h = 0; h < v.length; h++)
                            if (v[h].getTime ? u = v[h].x.getTime() : u = v[h].x, "number" !== typeof v[h].y) {
                                if (0 < h && !y && p.connectNullData) var D = p.options.nullDataLineDashType || !v[h - 1].lineDashType ? p.nullDataLineDashType : v[h - 1].lineDashType;
                                y = !0
                            } else {
                                k = a.axisX.convertValueToPixel(u);
                                t = 0 === p.dataPointEOs[h].cumulativeSum ? q : a.axisY.convertValueToPixel(p.dataPointEOs[h].cumulativeSum);
                                l = 0 === p.dataPointEOs[h].cumulativeSumYStartValue ? q : a.axisY.convertValueToPixel(p.dataPointEOs[h].cumulativeSumYStartValue);
                                k = a.axisX.reversed ? k + a.plotType.totalDataSeries * n / 2 - (a.previousDataSeriesCount + f) * n << 0 : k - a.plotType.totalDataSeries * n / 2 + (a.previousDataSeriesCount + f) * n << 0;
                                var H = a.axisX.reversed ? k - n << 0 : k + n << 0;
                                t > l && (e = t, t = l, l = e);
                                a.axisY.reversed && (e = t, t = l, l = e);
                                e = p.dataPointIds[h];
                                this._eventManager.objectMap[e] = {
                                    id: e,
                                    objectType: "dataPoint",
                                    dataSeriesIndex: m,
                                    dataPointIndex: h,
                                    x1: k,
                                    y1: t,
                                    x2: H,
                                    y2: l
                                };
                                var T = v[h].color ? v[h].color : 0 < v[h].y ? p.risingColor : p.fallingColor;
                                ea(b, k, t, H, l, T, 0, T, x, x, !1, !1, p.fillOpacity);
                                e = N(e);
                                r && ea(this._eventManager.ghostCtx, k, t, H, l, e, 0, null, !1, !1, !1, !1);
                                var Y, T = k;
                                Y = "undefined" !== typeof v[h].isIntermediateSum && !0 === v[h].isIntermediateSum || "undefined" !== typeof v[h].isCumulativeSum && !0 === v[h].isCumulativeSum ? 0 < v[h].y ? t : l : 0 < v[h].y ? l : t;
                                0 < h && z && (!y || p.connectNullData) && (y && b.setLineDash && b.setLineDash(R(D, s)), b.beginPath(), b.moveTo(z, B - w), b.lineTo(T, Y - w), 0 < s && b.stroke(), r &&
                                    (c.beginPath(), c.moveTo(z, B - w), c.lineTo(T, Y - w), 0 < s && c.stroke()));
                                y = !1;
                                z = H;
                                B = 0 < v[h].y ? t : l;
                                T = v[h].lineDashType ? v[h].lineDashType : p.options.lineDashType ? p.options.lineDashType : "shortDash";
                                b.strokeStyle = v[h].lineColor ? v[h].lineColor : p.options.lineColor ? p.options.lineColor : "#9e9e9e";
                                b.lineWidth = s;
                                b.setLineDash && (T = R(T, s), b.setLineDash(T));
                                (v[h].indexLabel || p.indexLabel || v[h].indexLabelFormatter || p.indexLabelFormatter) && this._indexLabels.push({
                                    chartType: "waterfall",
                                    dataPoint: v[h],
                                    dataSeries: p,
                                    point: {
                                        x: k +
                                            (H - k) / 2,
                                        y: 0 <= v[h].y ? t : l
                                    },
                                    direction: 0 > v[h].y === a.axisY.reversed ? 1 : -1,
                                    bounds: {
                                        x1: k,
                                        y1: Math.min(t, l),
                                        x2: H,
                                        y2: Math.max(t, l)
                                    },
                                    color: e
                                })
                            }
                }
                r && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height),
                    b.clearRect(g.x1, g.y1, g.width, g.height), this._eventManager.ghostCtx.restore());
                b.restore();
                return {
                    source: d,
                    dest: this.plotArea.ctx,
                    animationCallback: M.fadeInAnimation,
                    easingFunction: M.easing.easeInQuad,
                    animationBase: 0
                }
            }
        };
        var ja = function(a, d, b, c, e, g, h, k, t) {
            if (!(0 > b)) {
                "undefined" === typeof k && (k = 1);
                if (!r) {
                    var l = Number((h % (2 * Math.PI)).toFixed(8));
                    Number((g % (2 * Math.PI)).toFixed(8)) === l && (h -= 1E-4)
                }
                a.save();
                a.globalAlpha = k;
                "pie" === e ? (a.beginPath(), a.moveTo(d.x, d.y), a.arc(d.x, d.y, b, g, h, !1), a.fillStyle = c, a.strokeStyle =
                    "white", a.lineWidth = 2, a.closePath(), a.fill()) : "doughnut" === e && (a.beginPath(), a.arc(d.x, d.y, b, g, h, !1), 0 <= t && a.arc(d.x, d.y, t * b, h, g, !0), a.closePath(), a.fillStyle = c, a.strokeStyle = "white", a.lineWidth = 2, a.fill());
                a.globalAlpha = 1;
                a.restore()
            }
        };
        m.prototype.renderPie = function(a) {
            function d() {
                if (l && m) {
                    for (var a = 0, b = 0, c = 0, e = 0, d = 0; d < m.length; d++) {
                        var g = m[d],
                            k = l.dataPointIds[d];
                        f[d].id = k;
                        f[d].objectType = "dataPoint";
                        f[d].dataPointIndex = d;
                        f[d].dataSeriesIndex = 0;
                        var h = f[d],
                            q = {
                                percent: null,
                                total: null
                            },
                            p = null,
                            q = t.getPercentAndTotal(l,
                                g);
                        if (l.indexLabelFormatter || g.indexLabelFormatter) p = {
                            chart: t.options,
                            dataSeries: l,
                            dataPoint: g,
                            total: q.total,
                            percent: q.percent
                        };
                        q = g.indexLabelFormatter ? g.indexLabelFormatter(p) : g.indexLabel ? t.replaceKeywordsWithValue(g.indexLabel, g, l, d) : l.indexLabelFormatter ? l.indexLabelFormatter(p) : l.indexLabel ? t.replaceKeywordsWithValue(l.indexLabel, g, l, d) : g.label ? g.label : "";
                        t._eventManager.objectMap[k] = h;
                        h.center = {
                            x: x.x,
                            y: x.y
                        };
                        h.y = g.y;
                        h.radius = B;
                        h.percentInnerRadius = H;
                        h.indexLabelText = q;
                        h.indexLabelPlacement = l.indexLabelPlacement;
                        h.indexLabelLineColor = g.indexLabelLineColor ? g.indexLabelLineColor : l.options.indexLabelLineColor ? l.options.indexLabelLineColor : g.color ? g.color : l._colorSet[d % l._colorSet.length];
                        h.indexLabelLineThickness = v(g.indexLabelLineThickness) ? l.indexLabelLineThickness : g.indexLabelLineThickness;
                        h.indexLabelLineDashType = g.indexLabelLineDashType ? g.indexLabelLineDashType : l.indexLabelLineDashType;
                        h.indexLabelFontColor = g.indexLabelFontColor ? g.indexLabelFontColor : l.indexLabelFontColor;
                        h.indexLabelFontStyle = g.indexLabelFontStyle ?
                            g.indexLabelFontStyle : l.indexLabelFontStyle;
                        h.indexLabelFontWeight = g.indexLabelFontWeight ? g.indexLabelFontWeight : l.indexLabelFontWeight;
                        h.indexLabelFontSize = v(g.indexLabelFontSize) ? l.indexLabelFontSize : g.indexLabelFontSize;
                        h.indexLabelFontFamily = g.indexLabelFontFamily ? g.indexLabelFontFamily : l.indexLabelFontFamily;
                        h.indexLabelBackgroundColor = g.indexLabelBackgroundColor ? g.indexLabelBackgroundColor : l.options.indexLabelBackgroundColor ? l.options.indexLabelBackgroundColor : l.indexLabelBackgroundColor;
                        h.indexLabelMaxWidth =
                            g.indexLabelMaxWidth ? g.indexLabelMaxWidth : l.indexLabelMaxWidth ? l.indexLabelMaxWidth : 0.33 * n.width;
                        h.indexLabelWrap = "undefined" !== typeof g.indexLabelWrap ? g.indexLabelWrap : l.indexLabelWrap;
                        h.startAngle = 0 === d ? l.startAngle ? l.startAngle / 180 * Math.PI : 0 : f[d - 1].endAngle;
                        h.startAngle = (h.startAngle + 2 * Math.PI) % (2 * Math.PI);
                        h.endAngle = h.startAngle + 2 * Math.PI / y * Math.abs(g.y);
                        g = (h.endAngle + h.startAngle) / 2;
                        g = (g + 2 * Math.PI) % (2 * Math.PI);
                        h.midAngle = g;
                        if (h.midAngle > Math.PI / 2 - s && h.midAngle < Math.PI / 2 + s) {
                            if (0 === a || f[c].midAngle >
                                h.midAngle) c = d;
                            a++
                        } else if (h.midAngle > 3 * Math.PI / 2 - s && h.midAngle < 3 * Math.PI / 2 + s) {
                            if (0 === b || f[e].midAngle > h.midAngle) e = d;
                            b++
                        }
                        h.hemisphere = g > Math.PI / 2 && g <= 3 * Math.PI / 2 ? "left" : "right";
                        h.indexLabelTextBlock = new ka(t.plotArea.ctx, {
                            fontSize: h.indexLabelFontSize,
                            fontFamily: h.indexLabelFontFamily,
                            fontColor: h.indexLabelFontColor,
                            fontStyle: h.indexLabelFontStyle,
                            fontWeight: h.indexLabelFontWeight,
                            horizontalAlign: "left",
                            backgroundColor: h.indexLabelBackgroundColor,
                            maxWidth: h.indexLabelMaxWidth,
                            maxHeight: h.indexLabelWrap ?
                                5 * h.indexLabelFontSize : 1.5 * h.indexLabelFontSize,
                            text: h.indexLabelText,
                            padding: 0,
                            textBaseline: "top"
                        });
                        h.indexLabelTextBlock.measureText()
                    }
                    k = g = 0;
                    q = !1;
                    for (d = 0; d < m.length; d++) h = f[(c + d) % m.length], 1 < a && (h.midAngle > Math.PI / 2 - s && h.midAngle < Math.PI / 2 + s) && (g <= a / 2 && !q ? (h.hemisphere = "right", g++) : (h.hemisphere = "left", q = !0));
                    q = !1;
                    for (d = 0; d < m.length; d++) h = f[(e + d) % m.length], 1 < b && (h.midAngle > 3 * Math.PI / 2 - s && h.midAngle < 3 * Math.PI / 2 + s) && (k <= b / 2 && !q ? (h.hemisphere = "left", k++) : (h.hemisphere = "right", q = !0))
                }
            }

            function b(a) {
                var b =
                    t.plotArea.ctx;
                b.clearRect(n.x1, n.y1, n.width, n.height);
                b.fillStyle = t.backgroundColor;
                b.fillRect(n.x1, n.y1, n.width, n.height);
                for (b = 0; b < m.length; b++) {
                    var c = f[b].startAngle,
                        e = f[b].endAngle;
                    if (e > c) {
                        var d = 0.07 * B * Math.cos(f[b].midAngle),
                            g = 0.07 * B * Math.sin(f[b].midAngle),
                            h = !1;
                        if (m[b].exploded) {
                            if (1E-9 < Math.abs(f[b].center.x - (x.x + d)) || 1E-9 < Math.abs(f[b].center.y - (x.y + g))) f[b].center.x = x.x + d * a, f[b].center.y = x.y + g * a, h = !0
                        } else if (0 < Math.abs(f[b].center.x - x.x) || 0 < Math.abs(f[b].center.y - x.y)) f[b].center.x = x.x +
                            d * (1 - a), f[b].center.y = x.y + g * (1 - a), h = !0;
                        h && (d = {}, d.dataSeries = l, d.dataPoint = l.dataPoints[b], d.index = b, t.toolTip.highlightObjects([d]));
                        ja(t.plotArea.ctx, f[b].center, f[b].radius, m[b].color ? m[b].color : l._colorSet[b % l._colorSet.length], l.type, c, e, l.fillOpacity, f[b].percentInnerRadius)
                    }
                }
                a = t.plotArea.ctx;
                a.save();
                a.fillStyle = "black";
                a.strokeStyle = "grey";
                a.textBaseline = "middle";
                a.lineJoin = "round";
                for (b = b = 0; b < m.length; b++) c = f[b], c.indexLabelText && (c.indexLabelTextBlock.y -= c.indexLabelTextBlock.height / 2, e =
                    0, e = "left" === c.hemisphere ? "inside" !== l.indexLabelPlacement ? -(c.indexLabelTextBlock.width + q) : -c.indexLabelTextBlock.width / 2 : "inside" !== l.indexLabelPlacement ? q : -c.indexLabelTextBlock.width / 2, c.indexLabelTextBlock.x += e, c.indexLabelTextBlock.render(!0), c.indexLabelTextBlock.x -= e, c.indexLabelTextBlock.y += c.indexLabelTextBlock.height / 2, "inside" !== c.indexLabelPlacement && 0 < c.indexLabelLineThickness && (e = c.center.x + B * Math.cos(c.midAngle), d = c.center.y + B * Math.sin(c.midAngle), a.strokeStyle = c.indexLabelLineColor,
                        a.lineWidth = c.indexLabelLineThickness, a.setLineDash && a.setLineDash(R(c.indexLabelLineDashType, c.indexLabelLineThickness)), a.beginPath(), a.moveTo(e, d), a.lineTo(c.indexLabelTextBlock.x, c.indexLabelTextBlock.y), a.lineTo(c.indexLabelTextBlock.x + ("left" === c.hemisphere ? -q : q), c.indexLabelTextBlock.y), a.stroke()), a.lineJoin = "miter");
                a.save()
            }

            function c(a, b) {
                var c = 0,
                    c = a.indexLabelTextBlock.y - a.indexLabelTextBlock.height / 2,
                    e = a.indexLabelTextBlock.y + a.indexLabelTextBlock.height / 2,
                    d = b.indexLabelTextBlock.y - b.indexLabelTextBlock.height /
                    2,
                    f = b.indexLabelTextBlock.y + b.indexLabelTextBlock.height / 2;
                return c = b.indexLabelTextBlock.y > a.indexLabelTextBlock.y ? d - e : c - f
            }

            function e(a) {
                for (var b = null, e = 1; e < m.length; e++)
                    if (b = (a + e + f.length) % f.length, f[b].hemisphere !== f[a].hemisphere) {
                        b = null;
                        break
                    } else if (f[b].indexLabelText && b !== a && (0 > c(f[b], f[a]) || ("right" === f[a].hemisphere ? f[b].indexLabelTextBlock.y >= f[a].indexLabelTextBlock.y : f[b].indexLabelTextBlock.y <= f[a].indexLabelTextBlock.y))) break;
                else b = null;
                return b
            }

            function g(a, b, d) {
                d = (d || 0) + 1;
                if (1E3 <
                    d) return 0;
                b = b || 0;
                var h = 0,
                    l = x.y - 1 * r,
                    k = x.y + 1 * r;
                if (0 <= a && a < m.length) {
                    var n = f[a];
                    if (0 > b && n.indexLabelTextBlock.y < l || 0 < b && n.indexLabelTextBlock.y > k) return 0;
                    var q = 0,
                        t = 0,
                        t = q = q = 0;
                    0 > b ? n.indexLabelTextBlock.y - n.indexLabelTextBlock.height / 2 > l && n.indexLabelTextBlock.y - n.indexLabelTextBlock.height / 2 + b < l && (b = -(l - (n.indexLabelTextBlock.y - n.indexLabelTextBlock.height / 2 + b))) : n.indexLabelTextBlock.y + n.indexLabelTextBlock.height / 2 < l && n.indexLabelTextBlock.y + n.indexLabelTextBlock.height / 2 + b > k && (b = n.indexLabelTextBlock.y +
                        n.indexLabelTextBlock.height / 2 + b - k);
                    b = n.indexLabelTextBlock.y + b;
                    l = 0;
                    l = "right" === n.hemisphere ? x.x + Math.sqrt(Math.pow(r, 2) - Math.pow(b - x.y, 2)) : x.x - Math.sqrt(Math.pow(r, 2) - Math.pow(b - x.y, 2));
                    t = x.x + B * Math.cos(n.midAngle);
                    q = x.y + B * Math.sin(n.midAngle);
                    q = Math.sqrt(Math.pow(l - t, 2) + Math.pow(b - q, 2));
                    t = Math.acos(B / r);
                    q = Math.acos((r * r + B * B - q * q) / (2 * B * r));
                    b = q < t ? b - n.indexLabelTextBlock.y : 0;
                    l = null;
                    for (k = 1; k < m.length; k++)
                        if (l = (a - k + f.length) % f.length, f[l].hemisphere !== f[a].hemisphere) {
                            l = null;
                            break
                        } else if (f[l].indexLabelText &&
                        f[l].hemisphere === f[a].hemisphere && l !== a && (0 > c(f[l], f[a]) || ("right" === f[a].hemisphere ? f[l].indexLabelTextBlock.y <= f[a].indexLabelTextBlock.y : f[l].indexLabelTextBlock.y >= f[a].indexLabelTextBlock.y))) break;
                    else l = null;
                    t = l;
                    q = e(a);
                    k = l = 0;
                    0 > b ? (k = "right" === n.hemisphere ? t : q, h = b, null !== k && (t = -b, b = n.indexLabelTextBlock.y - n.indexLabelTextBlock.height / 2 - (f[k].indexLabelTextBlock.y + f[k].indexLabelTextBlock.height / 2), b - t < p && (l = -t, k = g(k, l, d + 1), +k.toFixed(C) > +l.toFixed(C) && (h = b > p ? -(b - p) : -(t - (k - l)))))) : 0 < b && (k = "right" ===
                        n.hemisphere ? q : t, h = b, null !== k && (t = b, b = f[k].indexLabelTextBlock.y - f[k].indexLabelTextBlock.height / 2 - (n.indexLabelTextBlock.y + n.indexLabelTextBlock.height / 2), b - t < p && (l = t, k = g(k, l, d + 1), +k.toFixed(C) < +l.toFixed(C) && (h = b > p ? b - p : t - (l - k)))));
                    h && (d = n.indexLabelTextBlock.y + h, b = 0, b = "right" === n.hemisphere ? x.x + Math.sqrt(Math.pow(r, 2) - Math.pow(d - x.y, 2)) : x.x - Math.sqrt(Math.pow(r, 2) - Math.pow(d - x.y, 2)), n.midAngle > Math.PI / 2 - s && n.midAngle < Math.PI / 2 + s ? (l = (a - 1 + f.length) % f.length, l = f[l], a = f[(a + 1 + f.length) % f.length], "left" ===
                        n.hemisphere && "right" === l.hemisphere && b > l.indexLabelTextBlock.x ? b = l.indexLabelTextBlock.x - 15 : "right" === n.hemisphere && ("left" === a.hemisphere && b < a.indexLabelTextBlock.x) && (b = a.indexLabelTextBlock.x + 15)) : n.midAngle > 3 * Math.PI / 2 - s && n.midAngle < 3 * Math.PI / 2 + s && (l = (a - 1 + f.length) % f.length, l = f[l], a = f[(a + 1 + f.length) % f.length], "right" === n.hemisphere && "left" === l.hemisphere && b < l.indexLabelTextBlock.x ? b = l.indexLabelTextBlock.x + 15 : "left" === n.hemisphere && ("right" === a.hemisphere && b > a.indexLabelTextBlock.x) && (b = a.indexLabelTextBlock.x -
                        15)), n.indexLabelTextBlock.y = d, n.indexLabelTextBlock.x = b, n.indexLabelAngle = Math.atan2(n.indexLabelTextBlock.y - x.y, n.indexLabelTextBlock.x - x.x))
                }
                return h
            }

            function h() {
                var a = t.plotArea.ctx;
                a.fillStyle = "grey";
                a.strokeStyle = "grey";
                a.font = "16px Arial";
                a.textBaseline = "middle";
                for (var b = a = 0, d = 0, h = !0, b = 0; 10 > b && (1 > b || 0 < d); b++) {
                    if (l.radius || !l.radius && "undefined" !== typeof l.innerRadius && null !== l.innerRadius && B - d <= D) h = !1;
                    h && (B -= d);
                    d = 0;
                    if ("inside" !== l.indexLabelPlacement) {
                        r = B * w;
                        for (a = 0; a < m.length; a++) {
                            var k =
                                f[a];
                            k.indexLabelTextBlock.x = x.x + r * Math.cos(k.midAngle);
                            k.indexLabelTextBlock.y = x.y + r * Math.sin(k.midAngle);
                            k.indexLabelAngle = k.midAngle;
                            k.radius = B;
                            k.percentInnerRadius = H
                        }
                        for (var s, v, a = 0; a < m.length; a++) {
                            var k = f[a],
                                z = e(a);
                            if (null !== z) {
                                s = f[a];
                                v = f[z];
                                var y = 0,
                                    y = c(s, v) - p;
                                if (0 > y) {
                                    for (var E = v = 0, F = 0; F < m.length; F++) F !== a && f[F].hemisphere === k.hemisphere && (f[F].indexLabelTextBlock.y < k.indexLabelTextBlock.y ? v++ : E++);
                                    v = y / (v + E || 1) * E;
                                    var E = -1 * (y - v),
                                        I = F = 0;
                                    "right" === k.hemisphere ? (F = g(a, v), E = -1 * (y - F), I = g(z, E), +I.toFixed(C) <
                                        +E.toFixed(C) && +F.toFixed(C) <= +v.toFixed(C) && g(a, -(E - I))) : (F = g(z, v), E = -1 * (y - F), I = g(a, E), +I.toFixed(C) < +E.toFixed(C) && +F.toFixed(C) <= +v.toFixed(C) && g(z, -(E - I)))
                                }
                            }
                        }
                    } else
                        for (a = 0; a < m.length; a++) k = f[a], r = "pie" === l.type ? 0.7 * B : 0.8 * B, z = x.x + r * Math.cos(k.midAngle), v = x.y + r * Math.sin(k.midAngle), k.indexLabelTextBlock.x = z, k.indexLabelTextBlock.y = v;
                    for (a = 0; a < m.length; a++)
                        if (k = f[a], z = k.indexLabelTextBlock.measureText(), 0 !== z.height && 0 !== z.width) z = z = 0, "right" === k.hemisphere ? (z = n.x2 - (k.indexLabelTextBlock.x + k.indexLabelTextBlock.width +
                            q), z *= -1) : z = n.x1 - (k.indexLabelTextBlock.x - k.indexLabelTextBlock.width - q), 0 < z && (!h && k.indexLabelText && (v = "right" === k.hemisphere ? n.x2 - k.indexLabelTextBlock.x : k.indexLabelTextBlock.x - n.x1, 0.3 * k.indexLabelTextBlock.maxWidth > v ? k.indexLabelText = "" : k.indexLabelTextBlock.maxWidth = 0.85 * v, 0.3 * k.indexLabelTextBlock.maxWidth < v && (k.indexLabelTextBlock.x -= "right" === k.hemisphere ? 2 : -2)), Math.abs(k.indexLabelTextBlock.y - k.indexLabelTextBlock.height / 2 - x.y) < B || Math.abs(k.indexLabelTextBlock.y + k.indexLabelTextBlock.height /
                            2 - x.y) < B) && (z /= Math.abs(Math.cos(k.indexLabelAngle)), 9 < z && (z *= 0.3), z > d && (d = z)), z = z = 0, 0 < k.indexLabelAngle && k.indexLabelAngle < Math.PI ? (z = n.y2 - (k.indexLabelTextBlock.y + k.indexLabelTextBlock.height / 2 + 5), z *= -1) : z = n.y1 - (k.indexLabelTextBlock.y - k.indexLabelTextBlock.height / 2 - 5), 0 < z && (!h && k.indexLabelText && (v = 0 < k.indexLabelAngle && k.indexLabelAngle < Math.PI ? -1 : 1, 0 === g(a, z * v) && g(a, 2 * v)), Math.abs(k.indexLabelTextBlock.x - x.x) < B && (z /= Math.abs(Math.sin(k.indexLabelAngle)), 9 < z && (z *= 0.3), z > d && (d = z)));
                    var K = function(a,
                        b, c) {
                        for (var e = [], d = 0; e.push(f[b]), b !== c; b = (b + 1 + m.length) % m.length);
                        e.sort(function(a, b) {
                            return a.y - b.y
                        });
                        for (b = 0; b < e.length; b++)
                            if (c = e[b], d < 0.7 * a) d += c.indexLabelTextBlock.height, c.indexLabelTextBlock.text = "", c.indexLabelText = "", c.indexLabelTextBlock.measureText();
                            else break
                    };
                    (function() {
                        for (var a = -1, b = -1, d = 0, g = !1, k = 0; k < m.length; k++)
                            if (g = !1, s = f[k], s.indexLabelText) {
                                var h = e(k);
                                if (null !== h) {
                                    var l = f[h];
                                    y = 0;
                                    y = c(s, l);
                                    var n;
                                    if (n = 0 > y) {
                                        n = s.indexLabelTextBlock.x;
                                        var t = s.indexLabelTextBlock.y - s.indexLabelTextBlock.height /
                                            2,
                                            p = s.indexLabelTextBlock.y + s.indexLabelTextBlock.height / 2,
                                            r = l.indexLabelTextBlock.y - l.indexLabelTextBlock.height / 2,
                                            v = l.indexLabelTextBlock.x + l.indexLabelTextBlock.width,
                                            A = l.indexLabelTextBlock.y + l.indexLabelTextBlock.height / 2;
                                        n = s.indexLabelTextBlock.x + s.indexLabelTextBlock.width < l.indexLabelTextBlock.x - q || n > v + q || t > A + q || p < r - q ? !1 : !0
                                    }
                                    n ? (0 > a && (a = k), h !== a && (b = h, d += -y), 0 === k % Math.max(m.length / 10, 3) && (g = !0)) : g = !0;
                                    g && (0 < d && 0 <= a && 0 <= b) && (K(d, a, b), b = a = -1, d = 0)
                                }
                            }
                        0 < d && K(d, a, b)
                    })()
                }
            }

            function k() {
                t.plotArea.layoutManager.reset();
                t.title && (t.title.dockInsidePlotArea || "center" === t.title.horizontalAlign && "center" === t.title.verticalAlign) && t.title.render();
                if (t.subtitles)
                    for (var a = 0; a < t.subtitles.length; a++) {
                        var b = t.subtitles[a];
                        (b.dockInsidePlotArea || "center" === b.horizontalAlign && "center" === b.verticalAlign) && b.render()
                    }
                t.legend && (t.legend.dockInsidePlotArea || "center" === t.legend.horizontalAlign && "center" === t.legend.verticalAlign) && (t.legend.setLayout(), t.legend.render())
            }
            var t = this;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                var l =
                    this.data[a.dataSeriesIndexes[0]],
                    m = l.dataPoints,
                    q = 10,
                    n = this.plotArea,
                    f = l.dataPointEOs,
                    p = 2,
                    r, w = 1.3,
                    s = 20 / 180 * Math.PI,
                    C = 6,
                    x = {
                        x: (n.x2 + n.x1) / 2,
                        y: (n.y2 + n.y1) / 2
                    },
                    y = 0;
                a = !1;
                for (var z = 0; z < m.length; z++) y += Math.abs(m[z].y), !a && ("undefined" !== typeof m[z].indexLabel && null !== m[z].indexLabel && 0 < m[z].indexLabel.toString().length) && (a = !0), !a && ("undefined" !== typeof m[z].label && null !== m[z].label && 0 < m[z].label.toString().length) && (a = !0);
                if (0 !== y) {
                    a = a || "undefined" !== typeof l.indexLabel && null !== l.indexLabel && 0 < l.indexLabel.toString().length;
                    var B = "inside" !== l.indexLabelPlacement && a ? 0.75 * Math.min(n.width, n.height) / 2 : 0.92 * Math.min(n.width, n.height) / 2;
                    l.radius && (B = I(l.radius, B));
                    var D = "undefined" !== typeof l.innerRadius && null !== l.innerRadius ? I(l.innerRadius, B) : 0.7 * B;
                    l.radius = B;
                    "doughnut" === l.type && (l.innerRadius = D);
                    var H = Math.min(D / B, (B - 1) / B);
                    this.pieDoughnutClickHandler = function(a) {
                        t.isAnimating || !v(a.dataSeries.explodeOnClick) && !a.dataSeries.explodeOnClick || (a = a.dataPoint, a.exploded = a.exploded ? !1 : !0, 1 < this.dataPoints.length && t._animator.animate(0,
                            500,
                            function(a) {
                                b(a);
                                k()
                            }))
                    };
                    d();
                    h();
                    h();
                    h();
                    h();
                    this.disableToolTip = !0;
                    this._animator.animate(0, this.animatedRender ? this.animationDuration : 0, function(a) {
                        var b = t.plotArea.ctx;
                        b.clearRect(n.x1, n.y1, n.width, n.height);
                        b.fillStyle = t.backgroundColor;
                        b.fillRect(n.x1, n.y1, n.width, n.height);
                        a = f[0].startAngle + 2 * Math.PI * a;
                        for (b = 0; b < m.length; b++) {
                            var c = 0 === b ? f[b].startAngle : e,
                                e = c + (f[b].endAngle - f[b].startAngle),
                                d = !1;
                            e > a && (e = a, d = !0);
                            var g = m[b].color ? m[b].color : l._colorSet[b % l._colorSet.length];
                            e > c && ja(t.plotArea.ctx,
                                f[b].center, f[b].radius, g, l.type, c, e, l.fillOpacity, f[b].percentInnerRadius);
                            if (d) break
                        }
                        k()
                    }, function() {
                        t.disableToolTip = !1;
                        t._animator.animate(0, t.animatedRender ? 500 : 0, function(a) {
                            b(a);
                            k()
                        })
                    })
                }
            }
        };
        var ra = function(a, d, b, c) {
            "undefined" === typeof b && (b = 1);
            0 >= Math.round(d.y4 - d.y1) || (a.save(), a.globalAlpha = b, a.beginPath(), a.moveTo(Math.round(d.x1), Math.round(d.y1)), a.lineTo(Math.round(d.x2), Math.round(d.y2)), a.lineTo(Math.round(d.x3), Math.round(d.y3)), a.lineTo(Math.round(d.x4), Math.round(d.y4)), "undefined" !==
                d.x5 && (a.lineTo(Math.round(d.x5), Math.round(d.y5)), a.lineTo(Math.round(d.x6), Math.round(d.y6))), a.closePath(), a.fillStyle = c ? c : d.color, a.fill(), a.globalAplha = 1, a.restore())
        };
        m.prototype.renderFunnel = function(a) {
            function d() {
                for (var a = 0, b = [], c = 0; c < C.length; c++) {
                    if ("undefined" === typeof C[c].y) return -1;
                    C[c].y = "number" === typeof C[c].y ? C[c].y : 0;
                    a += Math.abs(C[c].y)
                }
                if (0 === a) return -1;
                for (c = b[0] = 0; c < C.length; c++) b.push(Math.abs(C[c].y) * H / a);
                return b
            }

            function b() {
                var a = $,
                    b = V,
                    c = K,
                    e = ea,
                    d, f;
                d = O;
                f = Z - N;
                e = Math.abs((f -
                    d) * (b - a + (e - c)) / 2);
                c = ea - K;
                d = f - d;
                f = c * (f - Z);
                f = Math.abs(f);
                f = e + f;
                for (var e = [], g = 0, k = 0; k < C.length; k++) {
                    if ("undefined" === typeof C[k].y) return -1;
                    C[k].y = "number" === typeof C[k].y ? C[k].y : 0;
                    g += Math.abs(C[k].y)
                }
                if (0 === g) return -1;
                for (var l = e[0] = 0, h = 0, n, q, b = b - a, l = !1, k = 0; k < C.length; k++) a = Math.abs(C[k].y) * f / g, l ? n = 0 == Number(c.toFixed(3)) ? 0 : a / c : (q = ba * ba * b * b - 4 * Math.abs(ba) * a, 0 > q ? (q = c, l = (b + q) * (d - h) / 2, a -= l, n = d - h, h += d - h, n += 0 == q ? 0 : a / q, h += a / q, l = !0) : (n = (Math.abs(ba) * b - Math.sqrt(q)) / 2, q = b - 2 * n / Math.abs(ba), h += n, h > d && (h -= n,
                    q = c, l = (b + q) * (d - h) / 2, a -= l, n = d - h, h += d - h, n += a / q, h += a / q, l = !0), b = q)), e.push(n);
                return e
            }

            function c() {
                if (s && C) {
                    for (var a, b, c, e, d, g, k, h, l, n, q, m, t, p, u = [], A = [], x = {
                            percent: null,
                            total: null
                        }, z = null, w = 0; w < C.length; w++) p = P[w], p = "undefined" !== typeof p.x5 ? (p.y2 + p.y4) / 2 : (p.y2 + p.y3) / 2, p = f(p).x2 + 1, u[w] = L - p - S;
                    p = 0.5 * S;
                    for (var w = 0, B = C.length - 1; w < C.length || 0 <= B; w++, B--) {
                        b = s.reversed ? C[B] : C[w];
                        a = b.color ? b.color : s.reversed ? s._colorSet[(C.length - 1 - w) % s._colorSet.length] : s._colorSet[w % s._colorSet.length];
                        c = b.indexLabelPlacement ||
                            s.indexLabelPlacement || "outside";
                        e = b.indexLabelBackgroundColor || s.indexLabelBackgroundColor || (r ? "transparent" : null);
                        d = b.indexLabelFontColor || s.indexLabelFontColor || "#979797";
                        g = v(b.indexLabelFontSize) ? s.indexLabelFontSize : b.indexLabelFontSize;
                        k = b.indexLabelFontStyle || s.indexLabelFontStyle || "normal";
                        h = b.indexLabelFontFamily || s.indexLabelFontFamily || "arial";
                        l = b.indexLabelFontWeight || s.indexLabelFontWeight || "normal";
                        a = b.indexLabelLineColor || s.options.indexLabelLineColor || a;
                        n = "number" === typeof b.indexLabelLineThickness ?
                            b.indexLabelLineThickness : "number" === typeof s.indexLabelLineThickness ? s.indexLabelLineThickness : 2;
                        q = b.indexLabelLineDashType || s.indexLabelLineDashType || "solid";
                        m = "undefined" !== typeof b.indexLabelWrap ? b.indexLabelWrap : "undefined" !== typeof s.indexLabelWrap ? s.indexLabelWrap : !0;
                        t = s.dataPointIds[w];
                        y._eventManager.objectMap[t] = {
                            id: t,
                            objectType: "dataPoint",
                            dataPointIndex: w,
                            dataSeriesIndex: 0,
                            funnelSection: P[s.reversed ? C.length - 1 - w : w]
                        };
                        "inside" === s.indexLabelPlacement && (u[w] = w !== fa ? s.reversed ? P[w].x2 - P[w].x1 :
                            P[w].x3 - P[w].x4 : P[w].x3 - P[w].x6, 20 > u[w] && (u[w] = w !== fa ? s.reversed ? P[w].x3 - P[w].x4 : P[w].x2 - P[w].x1 : P[w].x2 - P[w].x1, u[w] /= 2));
                        t = b.indexLabelMaxWidth ? b.indexLabelMaxWidth : s.options.indexLabelMaxWidth ? s.indexLabelMaxWidth : u[w];
                        if (t > u[w] || 0 > t) t = u[w];
                        A[w] = "inside" === s.indexLabelPlacement ? P[w].height : !1;
                        x = y.getPercentAndTotal(s, b);
                        if (s.indexLabelFormatter || b.indexLabelFormatter) z = {
                            chart: y.options,
                            dataSeries: s,
                            dataPoint: b,
                            total: x.total,
                            percent: x.percent
                        };
                        b = b.indexLabelFormatter ? b.indexLabelFormatter(z) : b.indexLabel ?
                            y.replaceKeywordsWithValue(b.indexLabel, b, s, w) : s.indexLabelFormatter ? s.indexLabelFormatter(z) : s.indexLabel ? y.replaceKeywordsWithValue(s.indexLabel, b, s, w) : b.label ? b.label : "";
                        0 >= n && (n = 0);
                        1E3 > t && 1E3 - t < p && (t += 1E3 - t);
                        Q.roundRect || Ea(Q);
                        c = new ka(Q, {
                            fontSize: g,
                            fontFamily: h,
                            fontColor: d,
                            fontStyle: k,
                            fontWeight: l,
                            horizontalAlign: c,
                            backgroundColor: e,
                            maxWidth: t,
                            maxHeight: !1 === A[w] ? m ? 4.28571429 * g : 1.5 * g : A[w],
                            text: b,
                            padding: ga
                        });
                        c.measureText();
                        J.push({
                            textBlock: c,
                            id: s.reversed ? B : w,
                            isDirty: !1,
                            lineColor: a,
                            lineThickness: n,
                            lineDashType: q,
                            height: c.height < c.maxHeight ? c.height : c.maxHeight,
                            width: c.width < c.maxWidth ? c.width : c.maxWidth
                        })
                    }
                }
            }

            function e() {
                var a, b, c, e, d, f = [];
                d = !1;
                c = 0;
                for (var g, k = L - V - S / 2, k = s.options.indexLabelMaxWidth ? s.indexLabelMaxWidth > k ? k : s.indexLabelMaxWidth : k, h = J.length - 1; 0 <= h; h--) {
                    g = C[J[h].id];
                    c = J[h];
                    e = c.textBlock;
                    b = (a = n(h) < P.length ? J[n(h)] : null) ? a.textBlock : null;
                    c = c.height;
                    a && e.y + c + ga > b.y && (d = !0);
                    c = g.indexLabelMaxWidth || k;
                    if (c > k || 0 > c) c = k;
                    f.push(c)
                }
                if (d)
                    for (h = J.length - 1; 0 <= h; h--) a = P[h], J[h].textBlock.maxWidth =
                        f[f.length - (h + 1)], J[h].textBlock.measureText(), J[h].textBlock.x = L - k, c = J[h].textBlock.height < J[h].textBlock.maxHeight ? J[h].textBlock.height : J[h].textBlock.maxHeight, d = J[h].textBlock.width < J[h].textBlock.maxWidth ? J[h].textBlock.width : J[h].textBlock.maxWidth, J[h].height = c, J[h].width = d, c = "undefined" !== typeof a.x5 ? (a.y2 + a.y4) / 2 : (a.y2 + a.y3) / 2, J[h].textBlock.y = c - J[h].height / 2, s.reversed ? (J[h].textBlock.y + J[h].height > pa + D && (J[h].textBlock.y = pa + D - J[h].height), J[h].textBlock.y < wa - D && (J[h].textBlock.y = wa - D)) :
                        (J[h].textBlock.y < pa - D && (J[h].textBlock.y = pa - D), J[h].textBlock.y + J[h].height > wa + D && (J[h].textBlock.y = wa + D - J[h].height))
            }

            function g() {
                var a, b, c, e;
                if ("inside" !== s.indexLabelPlacement)
                    for (var d = 0; d < P.length; d++) 0 == J[d].textBlock.text.length ? J[d].isDirty = !0 : (a = P[d], c = "undefined" !== typeof a.x5 ? (a.y2 + a.y4) / 2 : (a.y2 + a.y3) / 2, b = s.reversed ? "undefined" !== typeof a.x5 ? c > Da ? f(c).x2 + 1 : (a.x2 + a.x3) / 2 + 1 : (a.x2 + a.x3) / 2 + 1 : "undefined" !== typeof a.x5 ? c < Da ? f(c).x2 + 1 : (a.x4 + a.x3) / 2 + 1 : (a.x2 + a.x3) / 2 + 1, J[d].textBlock.x = b + S, J[d].textBlock.y =
                        c - J[d].height / 2, s.reversed ? (J[d].textBlock.y + J[d].height > pa + D && (J[d].textBlock.y = pa + D - J[d].height), J[d].textBlock.y < wa - D && (J[d].textBlock.y = wa - D)) : (J[d].textBlock.y < pa - D && (J[d].textBlock.y = pa - D), J[d].textBlock.y + J[d].height > wa + D && (J[d].textBlock.y = wa + D - J[d].height)));
                else
                    for (d = 0; d < P.length; d++) 0 == J[d].textBlock.text.length ? J[d].isDirty = !0 : (a = P[d], b = a.height, c = J[d].height, e = J[d].width, b >= c ? (b = d != fa ? (a.x4 + a.x3) / 2 - e / 2 : (a.x5 + a.x4) / 2 - e / 2, c = d != fa ? (a.y1 + a.y3) / 2 - c / 2 : (a.y1 + a.y4) / 2 - c / 2, J[d].textBlock.x = b,
                        J[d].textBlock.y = c) : J[d].isDirty = !0)
            }

            function h() {
                function a(b, c) {
                    var d;
                    if (0 > b || b >= J.length) return 0;
                    var e, f = J[b].textBlock;
                    if (0 > c) {
                        c *= -1;
                        e = q(b);
                        d = k(e, b);
                        if (d >= c) return f.y -= c, c;
                        if (0 == b) return 0 < d && (f.y -= d), d;
                        d += a(e, -(c - d));
                        0 < d && (f.y -= d);
                        return d
                    }
                    e = n(b);
                    d = k(b, e);
                    if (d >= c) return f.y += c, c;
                    if (b == P.length - 1) return 0 < d && (f.y += d), d;
                    d += a(e, c - d);
                    0 < d && (f.y += d);
                    return d
                }

                function b() {
                    var a, d, e, f, g = 0,
                        h;
                    f = (Z - O + 2 * D) / m;
                    h = m;
                    for (var k, l = 1; l < h; l++) {
                        e = l * f;
                        for (var t = J.length - 1; 0 <= t; t--) !J[t].isDirty && (J[t].textBlock.y <
                            e && J[t].textBlock.y + J[t].height > e) && (k = n(t), !(k >= J.length - 1) && J[t].textBlock.y + J[t].height + ga > J[k].textBlock.y && (J[t].textBlock.y = J[t].textBlock.y + J[t].height - e > e - J[t].textBlock.y ? e + 1 : e - J[t].height - 1))
                    }
                    for (k = P.length - 1; 0 < k; k--)
                        if (!J[k].isDirty) {
                            e = q(k);
                            if (0 > e && (e = 0, J[e].isDirty)) break;
                            if (J[k].textBlock.y < J[e].textBlock.y + J[e].height) {
                                d = d || k;
                                f = k;
                                for (h = 0; J[f].textBlock.y < J[e].textBlock.y + J[e].height + ga;) {
                                    a = a || J[f].textBlock.y + J[f].height;
                                    h += J[f].height;
                                    h += ga;
                                    f = e;
                                    if (0 >= f) {
                                        f = 0;
                                        h += J[f].height;
                                        break
                                    }
                                    e = q(f);
                                    if (0 > e) {
                                        f = 0;
                                        h += J[f].height;
                                        break
                                    }
                                }
                                if (f != k) {
                                    g = J[f].textBlock.y;
                                    a -= g;
                                    a = h - a;
                                    g = c(a, d, f);
                                    break
                                }
                            }
                        }
                    return g
                }

                function c(a, b, d) {
                    var e = [],
                        f = 0,
                        g = 0;
                    for (a = Math.abs(a); d <= b; d++) e.push(P[d]);
                    e.sort(function(a, b) {
                        return a.height - b.height
                    });
                    for (d = 0; d < e.length; d++)
                        if (b = e[d], f < a) g++, f += J[b.id].height + ga, J[b.id].textBlock.text = "", J[b.id].indexLabelText = "", J[b.id].isDirty = !0, J[b.id].textBlock.measureText();
                        else break;
                    return g
                }
                for (var d, e, f, g, h, l, m = 1, t = 0; t < 2 * m; t++) {
                    for (var p = J.length - 1; 0 <= p && !(0 <= q(p) && q(p), f = J[p], g = f.textBlock,
                            l = (h = n(p) < P.length ? J[n(p)] : null) ? h.textBlock : null, d = +f.height.toFixed(6), e = +g.y.toFixed(6), !f.isDirty && (h && e + d + ga > +l.y.toFixed(6)) && (d = g.y + d + ga - l.y, e = a(p, -d), e < d && (0 < e && (d -= e), e = a(n(p), d), e != d))); p--);
                    b()
                }
            }

            function k(a, b) {
                return (b < P.length ? J[b].textBlock.y : s.reversed ? pa + D : wa + D) - (0 > a ? s.reversed ? wa - D : pa - D : J[a].textBlock.y + J[a].height + ga)
            }

            function m(a, b, c) {
                var d, e, f, h = [],
                    k = D,
                    n = []; - 1 !== b && (0 <= W.indexOf(b) ? (e = W.indexOf(b), W.splice(e, 1)) : (W.push(b), W = W.sort(function(a, b) {
                    return a - b
                })));
                if (0 === W.length) h =
                    ia;
                else {
                    e = D * (1 != W.length || 0 != W[0] && W[0] != P.length - 1 ? 2 : 1) / l();
                    for (var q = 0; q < P.length; q++) {
                        if (1 == W.length && 0 == W[0]) {
                            if (0 === q) {
                                h.push(ia[q]);
                                d = k;
                                continue
                            }
                        } else 0 === q && (d = -1 * k);
                        h.push(ia[q] + d);
                        if (0 <= W.indexOf(q) || q < P.length && 0 <= W.indexOf(q + 1)) d += e
                    }
                }
                f = function() {
                    for (var a = [], b = 0; b < P.length; b++) a.push(h[b] - P[b].y1);
                    return a
                }();
                var t = {
                    startTime: (new Date).getTime(),
                    duration: c || 500,
                    easingFunction: function(a, b, c, d) {
                        return M.easing.easeOutQuart(a, b, c, d)
                    },
                    changeSection: function(a) {
                        for (var b, c, d = 0; d < P.length; d++) b =
                            f[d], c = P[d], b *= a, "undefined" === typeof n[d] && (n[d] = 0), 0 > n && (n *= -1), c.y1 += b - n[d], c.y2 += b - n[d], c.y3 += b - n[d], c.y4 += b - n[d], c.y5 && (c.y5 += b - n[d], c.y6 += b - n[d]), n[d] = b
                    }
                };
                a._animator.animate(0, c, function(c) {
                    var d = a.plotArea.ctx || a.ctx;
                    ja = !0;
                    d.clearRect(x.x1, x.y1, x.x2 - x.x1, x.y2 - x.y1);
                    d.fillStyle = a.backgroundColor;
                    d.fillRect(x.x1, x.y1, x.width, x.height);
                    t.changeSection(c, b);
                    var e = {};
                    e.dataSeries = s;
                    e.dataPoint = s.reversed ? s.dataPoints[C.length - 1 - b] : s.dataPoints[b];
                    e.index = s.reversed ? C.length - 1 - b : b;
                    a.toolTip.highlightObjects([e]);
                    for (e = 0; e < P.length; e++) ra(d, P[e], s.fillOpacity);
                    w(d);
                    F && ("inside" !== s.indexLabelPlacement ? p(d) : g(), A(d));
                    1 <= c && (ja = !1)
                }, null, M.easing.easeOutQuart)
            }

            function l() {
                for (var a = 0, b = 0; b < P.length - 1; b++)(0 <= W.indexOf(b) || 0 <= W.indexOf(b + 1)) && a++;
                return a
            }

            function p(a) {
                for (var b, c, d, e, g = 0; g < P.length; g++) e = 1 === J[g].lineThickness % 2 ? 0.5 : 0, c = ((P[g].y2 + P[g].y4) / 2 << 0) + e, b = f(c).x2 - 1, d = J[g].textBlock.x, e = (J[g].textBlock.y + J[g].height / 2 << 0) + e, J[g].isDirty || 0 == J[g].lineThickness || (a.strokeStyle = J[g].lineColor, a.lineWidth =
                    J[g].lineThickness, a.setLineDash && a.setLineDash(R(J[g].lineDashType, J[g].lineThickness)), a.beginPath(), a.moveTo(b, c), a.lineTo(d, e), a.stroke())
            }

            function q(a) {
                for (a -= 1; - 1 <= a && -1 != a && J[a].isDirty; a--);
                return a
            }

            function n(a) {
                for (a += 1; a <= P.length && a != P.length && J[a].isDirty; a++);
                return a
            }

            function f(a) {
                for (var b, c = 0; c < C.length; c++)
                    if (P[c].y1 < a && P[c].y4 > a) {
                        b = P[c];
                        break
                    }
                return b ? (a = b.y6 ? a > b.y6 ? b.x3 + (b.x4 - b.x3) / (b.y4 - b.y3) * (a - b.y3) : b.x2 + (b.x3 - b.x2) / (b.y3 - b.y2) * (a - b.y2) : b.x2 + (b.x3 - b.x2) / (b.y3 - b.y2) * (a - b.y2), {
                    x1: a,
                    x2: a
                }) : -1
            }

            function A(a) {
                for (var b = 0; b < P.length; b++) J[b].isDirty || (a && (J[b].textBlock.ctx = a), J[b].textBlock.render(!0))
            }

            function w(a) {
                y.plotArea.layoutManager.reset();
                a.roundRect || Ea(a);
                y.title && (y.title.dockInsidePlotArea || "center" === y.title.horizontalAlign && "center" === y.title.verticalAlign) && (y.title.ctx = a, y.title.render());
                if (y.subtitles)
                    for (var b = 0; b < y.subtitles.length; b++) {
                        var c = y.subtitles[b];
                        if (c.dockInsidePlotArea || "center" === c.horizontalAlign && "center" === c.verticalAlign) y.subtitles.ctx =
                            a, c.render()
                    }
                y.legend && (y.legend.dockInsidePlotArea || "center" === y.legend.horizontalAlign && "center" === y.legend.verticalAlign) && (y.legend.ctx = a, y.legend.setLayout(), y.legend.render());
                U.fNg && U.fNg(y)
            }
            var y = this;
            if (!(0 >= a.dataSeriesIndexes.length)) {
                for (var s = this.data[a.dataSeriesIndexes[0]], C = s.dataPoints, x = this.plotArea, D = 0.025 * x.width, z = 0.01 * x.width, B = 0, H = x.height - 2 * D, E = Math.min(x.width - 2 * z, 2.8 * x.height), F = !1, I = 0; I < C.length; I++)
                    if (!F && ("undefined" !== typeof C[I].indexLabel && null !== C[I].indexLabel &&
                            0 < C[I].indexLabel.toString().length) && (F = !0), !F && ("undefined" !== typeof C[I].label && null !== C[I].label && 0 < C[I].label.toString().length) && (F = !0), !F && "function" === typeof s.indexLabelFormatter || "function" === typeof C[I].indexLabelFormatter) F = !0;
                F = F || "undefined" !== typeof s.indexLabel && null !== s.indexLabel && 0 < s.indexLabel.toString().length;
                "inside" !== s.indexLabelPlacement && F || (z = (x.width - 0.75 * E) / 2);
                var I = x.x1 + z,
                    L = x.x2 - z,
                    O = x.y1 + D,
                    Z = x.y2 - D,
                    Q = a.targetCanvasCtx || this.plotArea.ctx || this.ctx;
                if (0 != s.length && (s.dataPoints &&
                        s.visible) && 0 !== C.length) {
                    var N, G;
                    a = 75 * E / 100;
                    var S = 30 * (L - a) / 100;
                    "funnel" === s.type ? (N = v(s.options.neckHeight) ? 0.35 * H : s.neckHeight, G = v(s.options.neckWidth) ? 0.25 * a : s.neckWidth, "string" === typeof N && N.match(/%$/) ? (N = parseInt(N), N = N * H / 100) : N = parseInt(N), "string" === typeof G && G.match(/%$/) ? (G = parseInt(G), G = G * a / 100) : G = parseInt(G), N > H ? N = H : 0 >= N && (N = 0), G > a ? G = a - 0.5 : 0 >= G && (G = 0)) : "pyramid" === s.type && (G = N = 0, s.reversed = s.reversed ? !1 : !0);
                    var z = I + a / 2,
                        $ = I,
                        V = I + a,
                        pa = s.reversed ? Z : O,
                        K = z - G / 2,
                        ea = z + G / 2,
                        Da = s.reversed ? O + N : Z -
                        N,
                        wa = s.reversed ? O : Z;
                    a = [];
                    var z = [],
                        P = [],
                        E = [],
                        X = O,
                        fa, ba = (Da - pa) / (K - $),
                        ha = -ba,
                        I = "area" === (s.valueRepresents ? s.valueRepresents : "height") ? b() : d();
                    if (-1 !== I) {
                        if (s.reversed)
                            for (E.push(X), G = I.length - 1; 0 < G; G--) X += I[G], E.push(X);
                        else
                            for (G = 0; G < I.length; G++) X += I[G], E.push(X);
                        if (s.reversed)
                            for (G = 0; G < I.length; G++) E[G] < Da ? (a.push(K), z.push(ea), fa = G) : (a.push((E[G] - pa + ba * $) / ba), z.push((E[G] - pa + ha * V) / ha));
                        else
                            for (G = 0; G < I.length; G++) E[G] < Da ? (a.push((E[G] - pa + ba * $) / ba), z.push((E[G] - pa + ha * V) / ha), fa = G) : (a.push(K), z.push(ea));
                        for (G = 0; G < I.length - 1; G++) X = s.reversed ? C[C.length - 1 - G].color ? C[C.length - 1 - G].color : s._colorSet[(C.length - 1 - G) % s._colorSet.length] : C[G].color ? C[G].color : s._colorSet[G % s._colorSet.length], G === fa ? P.push({
                            x1: a[G],
                            y1: E[G],
                            x2: z[G],
                            y2: E[G],
                            x3: ea,
                            y3: Da,
                            x4: z[G + 1],
                            y4: E[G + 1],
                            x5: a[G + 1],
                            y5: E[G + 1],
                            x6: K,
                            y6: Da,
                            id: G,
                            height: E[G + 1] - E[G],
                            color: X
                        }) : P.push({
                            x1: a[G],
                            y1: E[G],
                            x2: z[G],
                            y2: E[G],
                            x3: z[G + 1],
                            y3: E[G + 1],
                            x4: a[G + 1],
                            y4: E[G + 1],
                            id: G,
                            height: E[G + 1] - E[G],
                            color: X
                        });
                        var ga = 2,
                            J = [],
                            ja = !1,
                            W = [],
                            ia = [],
                            I = !1;
                        a = a = 0;
                        Fa(W);
                        for (G = 0; G <
                            C.length; G++) C[G].exploded && (I = !0, s.reversed ? W.push(C.length - 1 - G) : W.push(G));
                        Q.clearRect(x.x1, x.y1, x.width, x.height);
                        Q.fillStyle = y.backgroundColor;
                        Q.fillRect(x.x1, x.y1, x.width, x.height);
                        if (F && s.visible && (c(), g(), e(), "inside" !== s.indexLabelPlacement)) {
                            h();
                            for (G = 0; G < C.length; G++) J[G].isDirty || (a = J[G].textBlock.x + J[G].width, a = (L - a) / 2, 0 == G && (B = a), B > a && (B = a));
                            for (G = 0; G < P.length; G++) P[G].x1 += B, P[G].x2 += B, P[G].x3 += B, P[G].x4 += B, P[G].x5 && (P[G].x5 += B, P[G].x6 += B), J[G].textBlock.x += B
                        }
                        for (G = 0; G < P.length; G++) B =
                            P[G], ra(Q, B, s.fillOpacity), ia.push(B.y1);
                        w(Q);
                        F && s.visible && ("inside" === s.indexLabelPlacement || y.animationEnabled || p(Q), y.animationEnabled || A());
                        if (!F)
                            for (G = 0; G < C.length; G++) B = s.dataPointIds[G], a = {
                                id: B,
                                objectType: "dataPoint",
                                dataPointIndex: G,
                                dataSeriesIndex: 0,
                                funnelSection: P[s.reversed ? C.length - 1 - G : G]
                            }, y._eventManager.objectMap[B] = a;
                        !y.animationEnabled && I ? m(y, -1, 0) : y.animationEnabled && !y.animatedRender && m(y, -1, 0);
                        this.funnelPyramidClickHandler = function(a) {
                            var b = -1;
                            if (!ja && !y.isAnimating && (v(a.dataSeries.explodeOnClick) ||
                                    a.dataSeries.explodeOnClick) && (b = s.reversed ? C.length - 1 - a.dataPointIndex : a.dataPointIndex, 0 <= b)) {
                                a = b;
                                if ("funnel" === s.type || "pyramid" === s.type) s.reversed ? C[C.length - 1 - a].exploded = C[C.length - 1 - a].exploded ? !1 : !0 : C[a].exploded = C[a].exploded ? !1 : !0;
                                m(y, b, 500)
                            }
                        };
                        return {
                            source: Q,
                            dest: this.plotArea.ctx,
                            animationCallback: function(a, b) {
                                M.fadeInAnimation(a, b);
                                1 <= a && (m(y, -1, 500), w(y.plotArea.ctx || y.ctx))
                            },
                            easingFunction: M.easing.easeInQuad,
                            animationBase: 0
                        }
                    }
                }
            }
        };
        m.prototype.requestAnimFrame = function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                    window.setTimeout(a, 1E3 / 60)
                }
        }();
        m.prototype.cancelRequestAnimFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
        m.prototype.set = function(a, d, b) {
            b = "undefined" === typeof b ? !0 : b;
            "options" === a ? (this.options = d,
                b && this.render()) : m.base.set.call(this, a, d, b)
        };
        m.prototype.exportChart = function(a) {
            a = "undefined" === typeof a ? {} : a;
            var d = a.format ? a.format : "png",
                b = a.fileName ? a.fileName : this.exportFileName;
            if (a.toDataURL) return this.canvas.toDataURL("image/" + d);
            Ta(this.canvas, d, b)
        };
        m.prototype.print = function() {
            var a = this.exportChart({
                    toDataURL: !0
                }),
                d = document.createElement("iframe");
            d.setAttribute("class", "canvasjs-chart-print-frame");
            d.setAttribute("style", "position:absolute; width:100%; border: 0px; margin: 0px 0px 0px 0px; padding 0px 0px 0px 0px;");
            d.style.height = this.height + "px";
            this._canvasJSContainer.appendChild(d);
            var b = this,
                c = d.contentWindow || d.contentDocument.document || d.contentDocument;
            c.document.open();
            c.document.write('<!DOCTYPE HTML>\n<html><body style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><img src="' + a + '"/><body/></html>');
            c.document.close();
            setTimeout(function() {
                c.focus();
                c.print();
                setTimeout(function() {
                    b._canvasJSContainer.removeChild(d)
                }, 1E3)
            }, 500)
        };
        m.prototype.getPercentAndTotal = function(a, d) {
            var b = null,
                c = null,
                e = null;
            if (0 <= a.type.indexOf("stacked")) c = 0, b = d.x.getTime ? d.x.getTime() : d.x, b in a.plotUnit.yTotals && (c = a.plotUnit.yTotals[b], e = isNaN(d.y) ? 0 : 100 * (d.y / c));
            else if ("pie" === a.type || "doughnut" === a.type || "funnel" === a.type || "pyramid" === a.type) {
                for (b = c = 0; b < a.dataPoints.length; b++) isNaN(a.dataPoints[b].y) || (c += a.dataPoints[b].y);
                e = isNaN(d.y) ? 0 : 100 * (d.y / c)
            }
            return {
                percent: e,
                total: c
            }
        };
        m.prototype.replaceKeywordsWithValue = function(a, d, b, c, e) {
            var g = this;
            e = "undefined" === typeof e ? 0 : e;
            if ((0 <= b.type.indexOf("stacked") ||
                    "pie" === b.type || "doughnut" === b.type || "funnel" === b.type || "pyramid" === b.type) && (0 <= a.indexOf("#percent") || 0 <= a.indexOf("#total"))) {
                var h = "#percent",
                    k = "#total",
                    t = this.getPercentAndTotal(b, d),
                    k = isNaN(t.total) ? k : t.total,
                    h = isNaN(t.percent) ? h : t.percent;
                do {
                    t = "";
                    if (b.percentFormatString) t = b.percentFormatString;
                    else {
                        var t = "#,##0.",
                            l = Math.max(Math.ceil(Math.log(1 / Math.abs(h)) / Math.LN10), 2);
                        if (isNaN(l) || !isFinite(l)) l = 2;
                        for (var m = 0; m < l; m++) t += "#";
                        b.percentFormatString = t
                    }
                    a = a.replace("#percent", ba(h, t, g._cultureInfo));
                    a = a.replace("#total", ba(k, b.yValueFormatString ? b.yValueFormatString : "#,##0.########", g._cultureInfo))
                } while (0 <= a.indexOf("#percent") || 0 <= a.indexOf("#total"))
            }
            return a.replace(/\{.*?\}|"[^"]*"|'[^']*'/g, function(a) {
                if ('"' === a[0] && '"' === a[a.length - 1] || "'" === a[0] && "'" === a[a.length - 1]) return a.slice(1, a.length - 1);
                a = Ia(a.slice(1, a.length - 1));
                a = a.replace("#index", e);
                var h = null;
                try {
                    var f = a.match(/(.*?)\s*\[\s*(.*?)\s*\]/);
                    f && 0 < f.length && (h = Ia(f[2]), a = Ia(f[1]))
                } catch (k) {}
                f = null;
                if ("color" === a) return "waterfall" ===
                    b.type ? d.color ? d.color : 0 < d.y ? b.risingColor : b.fallingColor : "error" === b.type ? b.color ? b.color : b._colorSet[h % b._colorSet.length] : d.color ? d.color : b.color ? b.color : b._colorSet[c % b._colorSet.length];
                if (d.hasOwnProperty(a)) f = d;
                else if (b.hasOwnProperty(a)) f = b;
                else return "";
                f = f[a];
                null !== h && (f = f[h]);
                if ("x" === a)
                    if ("dateTime" === b.axisX.valueType || "dateTime" === b.xValueType || d.x && d.x.getTime) {
                        if (g.plotInfo.plotTypes[0].plotUnits[0].axisX && !g.plotInfo.plotTypes[0].plotUnits[0].axisX.logarithmic) return Ca(f, d.xValueFormatString ?
                            d.xValueFormatString : b.xValueFormatString ? b.xValueFormatString : b.xValueFormatString = g.axisX && g.axisX.autoValueFormatString ? g.axisX.autoValueFormatString : "DD MMM YY", g._cultureInfo)
                    } else return ba(f, d.xValueFormatString ? d.xValueFormatString : b.xValueFormatString ? b.xValueFormatString : b.xValueFormatString = "#,##0.########", g._cultureInfo);
                else return "y" === a ? ba(f, d.yValueFormatString ? d.yValueFormatString : b.yValueFormatString ? b.yValueFormatString : b.yValueFormatString = "#,##0.########", g._cultureInfo) : "z" ===
                    a ? ba(f, d.zValueFormatString ? d.zValueFormatString : b.zValueFormatString ? b.zValueFormatString : b.zValueFormatString = "#,##0.########", g._cultureInfo) : f
            })
        };
        qa(F, V);
        F.prototype.setLayout = function() {
            var a = this.dockInsidePlotArea ? this.chart.plotArea : this.chart,
                d = a.layoutManager.getFreeSpace(),
                b = null,
                c = 0,
                e = 0,
                g = 0,
                h = 0,
                k = this.markerMargin = this.chart.options.legend && !v(this.chart.options.legend.markerMargin) ? this.chart.options.legend.markerMargin : 0.3 * this.fontSize;
            this.height = 0;
            var t = [],
                l = [];
            "top" === this.verticalAlign ||
                "bottom" === this.verticalAlign ? (this.orientation = "horizontal", b = this.verticalAlign, g = this.maxWidth = null !== this.maxWidth ? this.maxWidth : d.width, h = this.maxHeight = null !== this.maxHeight ? this.maxHeight : 0.5 * d.height) : "center" === this.verticalAlign && (this.orientation = "vertical", b = this.horizontalAlign, g = this.maxWidth = null !== this.maxWidth ? this.maxWidth : 0.5 * d.width, h = this.maxHeight = null !== this.maxHeight ? this.maxHeight : d.height);
            this.errorMarkerColor = [];
            for (var m = 0; m < this.dataSeries.length; m++) {
                var q = this.dataSeries[m];
                if (q.dataPoints && q.dataPoints.length)
                    if ("pie" !== q.type && "doughnut" !== q.type && "funnel" !== q.type && "pyramid" !== q.type) {
                        var n = q.legendMarkerType = q.legendMarkerType ? q.legendMarkerType : "line" !== q.type && "stepLine" !== q.type && "spline" !== q.type && "scatter" !== q.type && "bubble" !== q.type || !q.markerType ? "error" === q.type && q._linkedSeries ? q._linkedSeries.legendMarkerType ? q._linkedSeries.legendMarkerType : H.getDefaultLegendMarker(q._linkedSeries.type) : H.getDefaultLegendMarker(q.type) : q.markerType,
                            f = q.legendText ? q.legendText :
                            this.itemTextFormatter ? this.itemTextFormatter({
                                chart: this.chart,
                                legend: this.options,
                                dataSeries: q,
                                dataPoint: null
                            }) : q.name,
                            p = q.legendMarkerColor = q.legendMarkerColor ? q.legendMarkerColor : q.markerColor ? q.markerColor : "error" === q.type ? v(q.whiskerColor) ? q._colorSet[0] : q.whiskerColor : q._colorSet[0],
                            r = q.markerSize || "line" !== q.type && "stepLine" !== q.type && "spline" !== q.type ? 0.75 * this.lineHeight : 0,
                            w = q.legendMarkerBorderColor ? q.legendMarkerBorderColor : q.markerBorderColor,
                            s = q.legendMarkerBorderThickness ? q.legendMarkerBorderThickness :
                            q.markerBorderThickness ? Math.max(1, Math.round(0.2 * r)) : 0;
                        "error" === q.type && this.errorMarkerColor.push(p);
                        f = this.chart.replaceKeywordsWithValue(f, q.dataPoints[0], q, m);
                        n = {
                            markerType: n,
                            markerColor: p,
                            text: f,
                            textBlock: null,
                            chartType: q.type,
                            markerSize: r,
                            lineColor: q._colorSet[0],
                            dataSeriesIndex: q.index,
                            dataPointIndex: null,
                            markerBorderColor: w,
                            markerBorderThickness: s
                        };
                        t.push(n)
                    } else
                        for (var y = 0; y < q.dataPoints.length; y++) {
                            var x = q.dataPoints[y],
                                n = x.legendMarkerType ? x.legendMarkerType : q.legendMarkerType ? q.legendMarkerType :
                                H.getDefaultLegendMarker(q.type),
                                f = x.legendText ? x.legendText : q.legendText ? q.legendText : this.itemTextFormatter ? this.itemTextFormatter({
                                    chart: this.chart,
                                    legend: this.options,
                                    dataSeries: q,
                                    dataPoint: x
                                }) : x.name ? x.name : "DataPoint: " + (y + 1),
                                p = x.legendMarkerColor ? x.legendMarkerColor : q.legendMarkerColor ? q.legendMarkerColor : x.color ? x.color : q.color ? q.color : q._colorSet[y % q._colorSet.length],
                                r = 0.75 * this.lineHeight,
                                w = x.legendMarkerBorderColor ? x.legendMarkerBorderColor : q.legendMarkerBorderColor ? q.legendMarkerBorderColor :
                                x.markerBorderColor ? x.markerBorderColor : q.markerBorderColor,
                                s = x.legendMarkerBorderThickness ? x.legendMarkerBorderThickness : q.legendMarkerBorderThickness ? q.legendMarkerBorderThickness : x.markerBorderThickness || q.markerBorderThickness ? Math.max(1, Math.round(0.2 * r)) : 0,
                                f = this.chart.replaceKeywordsWithValue(f, x, q, y),
                                n = {
                                    markerType: n,
                                    markerColor: p,
                                    text: f,
                                    textBlock: null,
                                    chartType: q.type,
                                    markerSize: r,
                                    dataSeriesIndex: m,
                                    dataPointIndex: y,
                                    markerBorderColor: w,
                                    markerBorderThickness: s
                                };
                            (x.showInLegend || q.showInLegend &&
                                !1 !== x.showInLegend) && t.push(n)
                        }
            }!0 === this.reversed && t.reverse();
            if (0 < t.length) {
                q = null;
                p = f = x = y = 0;
                x = null !== this.itemWidth ? null !== this.itemMaxWidth ? Math.min(this.itemWidth, this.itemMaxWidth, g) : this.itemMaxWidth = Math.min(this.itemWidth, g) : null !== this.itemMaxWidth ? Math.min(this.itemMaxWidth, g) : this.itemMaxWidth = g;
                r = 0 === r ? 0.75 * this.lineHeight : r;
                x -= r + k;
                for (m = 0; m < t.length; m++) {
                    n = t[m];
                    w = x;
                    if ("line" === n.chartType || "spline" === n.chartType || "stepLine" === n.chartType) w -= 2 * 0.1 * this.lineHeight;
                    if (!(0 >= h || "undefined" ===
                            typeof h || 0 >= w || "undefined" === typeof w)) {
                        if ("horizontal" === this.orientation) {
                            n.textBlock = new ka(this.ctx, {
                                x: 0,
                                y: 0,
                                maxWidth: w,
                                maxHeight: this.itemWrap ? h : this.lineHeight,
                                angle: 0,
                                text: n.text,
                                horizontalAlign: "left",
                                fontSize: this.fontSize,
                                fontFamily: this.fontFamily,
                                fontWeight: this.fontWeight,
                                fontColor: this.fontColor,
                                fontStyle: this.fontStyle,
                                textBaseline: "middle"
                            });
                            n.textBlock.measureText();
                            null !== this.itemWidth && (n.textBlock.width = this.itemWidth - (r + k + ("line" === n.chartType || "spline" === n.chartType || "stepLine" ===
                                n.chartType ? 2 * 0.1 * this.lineHeight : 0)));
                            if (!q || q.width + Math.round(n.textBlock.width + r + k + (0 === q.width ? 0 : this.horizontalSpacing) + ("line" === n.chartType || "spline" === n.chartType || "stepLine" === n.chartType ? 2 * 0.1 * this.lineHeight : 0)) > g) q = {
                                items: [],
                                width: 0
                            }, l.push(q), this.height += f, f = 0;
                            f = Math.max(f, n.textBlock.height)
                        } else n.textBlock = new ka(this.ctx, {
                            x: 0,
                            y: 0,
                            maxWidth: x,
                            maxHeight: !0 === this.itemWrap ? h : 1.5 * this.fontSize,
                            angle: 0,
                            text: n.text,
                            horizontalAlign: "left",
                            fontSize: this.fontSize,
                            fontFamily: this.fontFamily,
                            fontWeight: this.fontWeight,
                            fontColor: this.fontColor,
                            fontStyle: this.fontStyle,
                            textBaseline: "middle"
                        }), n.textBlock.measureText(), null !== this.itemWidth && (n.textBlock.width = this.itemWidth - (r + k + ("line" === n.chartType || "spline" === n.chartType || "stepLine" === n.chartType ? 2 * 0.1 * this.lineHeight : 0))), this.height < h - this.lineHeight ? (q = {
                            items: [],
                            width: 0
                        }, l.push(q)) : (q = l[y], y = (y + 1) % l.length), this.height += n.textBlock.height;
                        n.textBlock.x = q.width;
                        n.textBlock.y = 0;
                        q.width += Math.round(n.textBlock.width + r + k + (0 === q.width ?
                            0 : this.horizontalSpacing) + ("line" === n.chartType || "spline" === n.chartType || "stepLine" === n.chartType ? 2 * 0.1 * this.lineHeight : 0));
                        q.items.push(n);
                        this.width = Math.max(q.width, this.width);
                        p = n.textBlock.width + (r + k + ("line" === n.chartType || "spline" === n.chartType || "stepLine" === n.chartType ? 2 * 0.1 * this.lineHeight : 0))
                    }
                }
                this.itemWidth = p;
                this.height = !1 === this.itemWrap ? l.length * this.lineHeight : this.height + f;
                this.height = Math.min(h, this.height);
                this.width = Math.min(g, this.width)
            }
            "top" === this.verticalAlign ? (e = "left" === this.horizontalAlign ?
                d.x1 : "right" === this.horizontalAlign ? d.x2 - this.width : d.x1 + d.width / 2 - this.width / 2, c = d.y1) : "center" === this.verticalAlign ? (e = "left" === this.horizontalAlign ? d.x1 : "right" === this.horizontalAlign ? d.x2 - this.width : d.x1 + d.width / 2 - this.width / 2, c = d.y1 + d.height / 2 - this.height / 2) : "bottom" === this.verticalAlign && (e = "left" === this.horizontalAlign ? d.x1 : "right" === this.horizontalAlign ? d.x2 - this.width : d.x1 + d.width / 2 - this.width / 2, c = d.y2 - this.height);
            this.items = t;
            for (m = 0; m < this.items.length; m++) n = t[m], n.id = ++this.chart._eventManager.lastObjectId,
                this.chart._eventManager.objectMap[n.id] = {
                    id: n.id,
                    objectType: "legendItem",
                    legendItemIndex: m,
                    dataSeriesIndex: n.dataSeriesIndex,
                    dataPointIndex: n.dataPointIndex
                };
            this.markerSize = r;
            this.rows = l;
            0 < t.length && a.layoutManager.registerSpace(b, {
                width: this.width + 2 + 2,
                height: this.height + 5 + 5
            });
            this.bounds = {
                x1: e,
                y1: c,
                x2: e + this.width,
                y2: c + this.height
            }
        };
        F.prototype.render = function() {
            var a = this.bounds.x1,
                d = this.bounds.y1,
                b = this.markerMargin,
                c = this.maxWidth,
                e = this.maxHeight,
                g = this.markerSize,
                h = this.rows;
            (0 < this.borderThickness &&
                this.borderColor || this.backgroundColor) && this.ctx.roundRect(a, d, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);
            for (var k = 0, m = 0; m < h.length; m++) {
                for (var l = h[m], p = 0, q = 0; q < l.items.length; q++) {
                    var n = l.items[q],
                        f = n.textBlock.x + a + (0 === q ? 0.2 * g : this.horizontalSpacing),
                        r = d + k,
                        v = f;
                    this.chart.data[n.dataSeriesIndex].visible || (this.ctx.globalAlpha = 0.5);
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.rect(a, d, c, Math.max(e - e % this.lineHeight, 0));
                    this.ctx.clip();
                    if ("line" === n.chartType || "stepLine" === n.chartType || "spline" === n.chartType) this.ctx.strokeStyle = n.lineColor, this.ctx.lineWidth = Math.ceil(this.lineHeight / 8), this.ctx.beginPath(), this.ctx.moveTo(f - 0.1 * this.lineHeight, r + this.lineHeight / 2), this.ctx.lineTo(f + 0.85 * this.lineHeight, r + this.lineHeight / 2), this.ctx.stroke(), v -= 0.1 * this.lineHeight;
                    if ("error" === n.chartType) {
                        this.ctx.strokeStyle = this.errorMarkerColor[0];
                        this.ctx.lineWidth = g / 8;
                        this.ctx.beginPath();
                        var w = f - 0.08 * this.lineHeight + 0.1 * this.lineHeight,
                            s = r + 0.15 * this.lineHeight,
                            y = 0.7 * this.lineHeight,
                            x = y + 0.02 * this.lineHeight;
                        this.ctx.moveTo(w, s);
                        this.ctx.lineTo(w + y, s);
                        this.ctx.stroke();
                        this.ctx.beginPath();
                        this.ctx.moveTo(w + y / 2, s);
                        this.ctx.lineTo(w + y / 2, s + x);
                        this.ctx.stroke();
                        this.ctx.beginPath();
                        this.ctx.moveTo(w, s + x);
                        this.ctx.lineTo(w + y, s + x);
                        this.ctx.stroke();
                        this.errorMarkerColor.shift()
                    }
                    ia.drawMarker(f + g / 2, r + this.lineHeight / 2, this.ctx, n.markerType, "error" === n.chartType || "line" === n.chartType || "spline" === n.chartType ? n.markerSize / 2 : n.markerSize, n.markerColor,
                        n.markerBorderColor, n.markerBorderThickness);
                    n.textBlock.x = f + b + g;
                    if ("line" === n.chartType || "stepLine" === n.chartType || "spline" === n.chartType) n.textBlock.x += 0.1 * this.lineHeight;
                    n.textBlock.y = Math.round(r + this.lineHeight / 2);
                    n.textBlock.render(!0);
                    this.ctx.restore();
                    p = 0 < q ? Math.max(p, n.textBlock.height) : n.textBlock.height;
                    this.chart.data[n.dataSeriesIndex].visible || (this.ctx.globalAlpha = 1);
                    f = N(n.id);
                    this.ghostCtx.fillStyle = f;
                    this.ghostCtx.beginPath();
                    this.ghostCtx.fillRect(v, n.textBlock.y - this.lineHeight /
                        2, n.textBlock.x + n.textBlock.width - v, n.textBlock.height);
                    n.x1 = this.chart._eventManager.objectMap[n.id].x1 = v;
                    n.y1 = this.chart._eventManager.objectMap[n.id].y1 = n.textBlock.y - this.lineHeight / 2;
                    n.x2 = this.chart._eventManager.objectMap[n.id].x2 = n.textBlock.x + n.textBlock.width;
                    n.y2 = this.chart._eventManager.objectMap[n.id].y2 = n.textBlock.y + n.textBlock.height - this.lineHeight / 2
                }
                k += p
            }
        };
        qa(H, V);
        H.prototype.getDefaultAxisPlacement = function() {
            var a = this.type;
            if ("column" === a || "line" === a || "stepLine" === a || "spline" ===
                a || "area" === a || "stepArea" === a || "splineArea" === a || "stackedColumn" === a || "stackedLine" === a || "bubble" === a || "scatter" === a || "stackedArea" === a || "stackedColumn100" === a || "stackedLine100" === a || "stackedArea100" === a || "candlestick" === a || "ohlc" === a || "rangeColumn" === a || "rangeArea" === a || "rangeSplineArea" === a || "boxAndWhisker" === a || "waterfall" === a) return "normal";
            if ("bar" === a || "stackedBar" === a || "stackedBar100" === a || "rangeBar" === a) return "xySwapped";
            if ("pie" === a || "doughnut" === a || "funnel" === a || "pyramid" === a) return "none";
            "error" !== a && window.console.log("Unknown Chart Type: " + a);
            return null
        };
        H.getDefaultLegendMarker = function(a) {
            if ("column" === a || "stackedColumn" === a || "stackedLine" === a || "bar" === a || "stackedBar" === a || "stackedBar100" === a || "bubble" === a || "scatter" === a || "stackedColumn100" === a || "stackedLine100" === a || "stepArea" === a || "candlestick" === a || "ohlc" === a || "rangeColumn" === a || "rangeBar" === a || "rangeArea" === a || "rangeSplineArea" === a || "boxAndWhisker" === a || "waterfall" === a) return "square";
            if ("line" === a || "stepLine" === a || "spline" ===
                a || "pie" === a || "doughnut" === a) return "circle";
            if ("area" === a || "splineArea" === a || "stackedArea" === a || "stackedArea100" === a || "funnel" === a || "pyramid" === a) return "triangle";
            if ("error" === a) return "none";
            window.console.log("Unknown Chart Type: " + a);
            return null
        };
        H.prototype.getDataPointAtX = function(a, d) {
            if (!this.dataPoints || 0 === this.dataPoints.length) return null;
            var b = {
                    dataPoint: null,
                    distance: Infinity,
                    index: NaN
                },
                c = null,
                e = 0,
                g = 0,
                h = 1,
                k = Infinity,
                m = 0,
                l = 0,
                p = 0;
            "none" !== this.chart.plotInfo.axisPlacement && (this.axisX.logarithmic ?
                (p = Math.log(this.dataPoints[this.dataPoints.length - 1].x / this.dataPoints[0].x), p = 1 < p ? Math.min(Math.max((this.dataPoints.length - 1) / p * Math.log(a / this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0) : (p = this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x, p = 0 < p ? Math.min(Math.max((this.dataPoints.length - 1) / p * (a - this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0));
            for (;;) {
                g = 0 < h ? p + e : p - e;
                if (0 <= g && g < this.dataPoints.length) {
                    var c = this.dataPoints[g],
                        q = this.axisX.logarithmic ? c.x > a ? c.x / a : a / c.x :
                        Math.abs(c.x - a);
                    q < b.distance && (b.dataPoint = c, b.distance = q, b.index = g);
                    c = q;
                    c <= k ? k = c : 0 < h ? m++ : l++;
                    if (1E3 < m && 1E3 < l) break
                } else if (0 > p - e && p + e >= this.dataPoints.length) break; - 1 === h ? (e++, h = 1) : h = -1
            }
            return d || b.dataPoint.x !== a ? d && null !== b.dataPoint ? b : null : b
        };
        H.prototype.getDataPointAtXY = function(a, d, b) {
            if (!this.dataPoints || 0 === this.dataPoints.length || a < this.chart.plotArea.x1 || a > this.chart.plotArea.x2 || d < this.chart.plotArea.y1 || d > this.chart.plotArea.y2) return null;
            b = b || !1;
            var c = [],
                e = 0,
                g = 0,
                h = 1,
                k = !1,
                m = Infinity,
                l = 0,
                p = 0,
                q = 0;
            if ("none" !== this.chart.plotInfo.axisPlacement)
                if (q = (this.chart.axisX[0] ? this.chart.axisX[0] : this.chart.axisX2[0]).getXValueAt({
                        x: a,
                        y: d
                    }), this.axisX.logarithmic) var n = Math.log(this.dataPoints[this.dataPoints.length - 1].x / this.dataPoints[0].x),
                    q = 1 < n ? Math.min(Math.max((this.dataPoints.length - 1) / n * Math.log(q / this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0;
                else n = this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x, q = 0 < n ? Math.min(Math.max((this.dataPoints.length - 1) / n * (q - this.dataPoints[0].x) >>
                    0, 0), this.dataPoints.length) : 0;
            for (;;) {
                g = 0 < h ? q + e : q - e;
                if (0 <= g && g < this.dataPoints.length) {
                    var n = this.chart._eventManager.objectMap[this.dataPointIds[g]],
                        f = this.dataPoints[g],
                        r = null;
                    if (n) {
                        switch (this.type) {
                            case "column":
                            case "stackedColumn":
                            case "stackedColumn100":
                            case "bar":
                            case "stackedBar":
                            case "stackedBar100":
                            case "rangeColumn":
                            case "rangeBar":
                            case "waterfall":
                            case "error":
                                a >= n.x1 && (a <= n.x2 && d >= n.y1 && d <= n.y2) && (c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(n.x1 -
                                        a), Math.abs(n.x2 - a), Math.abs(n.y1 - d), Math.abs(n.y2 - d))
                                }), k = !0);
                                break;
                            case "line":
                            case "stepLine":
                            case "spline":
                            case "area":
                            case "stepArea":
                            case "stackedArea":
                            case "stackedArea100":
                            case "splineArea":
                            case "scatter":
                                var v = na("markerSize", f, this) || 4,
                                    w = b ? 20 : v,
                                    r = Math.sqrt(Math.pow(n.x1 - a, 2) + Math.pow(n.y1 - d, 2));
                                r <= w && c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: r
                                });
                                n = Math.abs(n.x1 - a);
                                n <= m ? m = n : 0 < h ? l++ : p++;
                                r <= v / 2 && (k = !0);
                                break;
                            case "rangeArea":
                            case "rangeSplineArea":
                                v = na("markerSize", f, this) ||
                                    4;
                                w = b ? 20 : v;
                                r = Math.min(Math.sqrt(Math.pow(n.x1 - a, 2) + Math.pow(n.y1 - d, 2)), Math.sqrt(Math.pow(n.x1 - a, 2) + Math.pow(n.y2 - d, 2)));
                                r <= w && c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: r
                                });
                                n = Math.abs(n.x1 - a);
                                n <= m ? m = n : 0 < h ? l++ : p++;
                                r <= v / 2 && (k = !0);
                                break;
                            case "bubble":
                                v = n.size;
                                r = Math.sqrt(Math.pow(n.x1 - a, 2) + Math.pow(n.y1 - d, 2));
                                r <= v / 2 && (c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: r
                                }), k = !0);
                                break;
                            case "pie":
                            case "doughnut":
                                v = n.center;
                                w = "doughnut" === this.type ? n.percentInnerRadius * n.radius :
                                    0;
                                r = Math.sqrt(Math.pow(v.x - a, 2) + Math.pow(v.y - d, 2));
                                r < n.radius && r > w && (r = Math.atan2(d - v.y, a - v.x), 0 > r && (r += 2 * Math.PI), r = Number(((180 * (r / Math.PI) % 360 + 360) % 360).toFixed(12)), v = Number(((180 * (n.startAngle / Math.PI) % 360 + 360) % 360).toFixed(12)), w = Number(((180 * (n.endAngle / Math.PI) % 360 + 360) % 360).toFixed(12)), 0 === w && 1 < n.endAngle && (w = 360), v >= w && 0 !== f.y && (w += 360, r < v && (r += 360)), r > v && r < w && (c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: 0
                                }), k = !0));
                                break;
                            case "funnel":
                            case "pyramid":
                                r = n.funnelSection;
                                d > r.y1 && d < r.y4 && (r.y6 ? d > r.y6 ? (g = r.x6 + (r.x5 - r.x6) / (r.y5 - r.y6) * (d - r.y6), r = r.x3 + (r.x4 - r.x3) / (r.y4 - r.y3) * (d - r.y3)) : (g = r.x1 + (r.x6 - r.x1) / (r.y6 - r.y1) * (d - r.y1), r = r.x2 + (r.x3 - r.x2) / (r.y3 - r.y2) * (d - r.y2)) : (g = r.x1 + (r.x4 - r.x1) / (r.y4 - r.y1) * (d - r.y1), r = r.x2 + (r.x3 - r.x2) / (r.y3 - r.y2) * (d - r.y2)), a > g && a < r && (c.push({
                                    dataPoint: f,
                                    dataPointIndex: n.dataPointIndex,
                                    dataSeries: this,
                                    distance: 0
                                }), k = !0));
                                break;
                            case "boxAndWhisker":
                                if (a >= n.x1 - n.borderThickness / 2 && a <= n.x2 + n.borderThickness / 2 && d >= n.y4 - n.borderThickness / 2 && d <= n.y1 + n.borderThickness /
                                    2 || Math.abs(n.x2 - a + n.x1 - a) < n.borderThickness && d >= n.y1 && d <= n.y4) c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(n.x1 - a), Math.abs(n.x2 - a), Math.abs(n.y2 - d), Math.abs(n.y3 - d))
                                }), k = !0;
                                break;
                            case "candlestick":
                                if (a >= n.x1 - n.borderThickness / 2 && a <= n.x2 + n.borderThickness / 2 && d >= n.y2 - n.borderThickness / 2 && d <= n.y3 + n.borderThickness / 2 || Math.abs(n.x2 - a + n.x1 - a) < n.borderThickness && d >= n.y1 && d <= n.y4) c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(n.x1 - a),
                                        Math.abs(n.x2 - a), Math.abs(n.y2 - d), Math.abs(n.y3 - d))
                                }), k = !0;
                                break;
                            case "ohlc":
                                if (Math.abs(n.x2 - a + n.x1 - a) < n.borderThickness && d >= n.y2 && d <= n.y3 || a >= n.x1 && a <= (n.x2 + n.x1) / 2 && d >= n.y1 - n.borderThickness / 2 && d <= n.y1 + n.borderThickness / 2 || a >= (n.x1 + n.x2) / 2 && a <= n.x2 && d >= n.y4 - n.borderThickness / 2 && d <= n.y4 + n.borderThickness / 2) c.push({
                                    dataPoint: f,
                                    dataPointIndex: g,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(n.x1 - a), Math.abs(n.x2 - a), Math.abs(n.y2 - d), Math.abs(n.y3 - d))
                                }), k = !0
                        }
                        if (k || 1E3 < l && 1E3 < p) break
                    }
                } else if (0 > q - e && q + e >=
                    this.dataPoints.length) break; - 1 === h ? (e++, h = 1) : h = -1
            }
            a = null;
            for (d = 0; d < c.length; d++) a ? c[d].distance <= a.distance && (a = c[d]) : a = c[d];
            return a
        };
        H.prototype.getMarkerProperties = function(a, d, b, c) {
            var e = this.dataPoints;
            return {
                x: d,
                y: b,
                ctx: c,
                type: e[a].markerType ? e[a].markerType : this.markerType,
                size: e[a].markerSize ? e[a].markerSize : this.markerSize,
                color: e[a].markerColor ? e[a].markerColor : this.markerColor ? this.markerColor : e[a].color ? e[a].color : this.color ? this.color : this._colorSet[a % this._colorSet.length],
                borderColor: e[a].markerBorderColor ?
                    e[a].markerBorderColor : this.markerBorderColor ? this.markerBorderColor : null,
                borderThickness: e[a].markerBorderThickness ? e[a].markerBorderThickness : this.markerBorderThickness ? this.markerBorderThickness : null
            }
        };
        qa(y, V);
        y.prototype.createExtraLabelsForLog = function(a) {
            a = (a || 0) + 1;
            if (!(5 < a)) {
                var d = this.logLabelValues[0] || this.intervalStartPosition;
                if (Math.log(this.range) / Math.log(d / this.viewportMinimum) < this.noTicks - 1) {
                    for (var b = y.getNiceNumber((d - this.viewportMinimum) / Math.min(Math.max(2, this.noTicks - this.logLabelValues.length),
                            3), !0), c = Math.ceil(this.viewportMinimum / b) * b; c < d; c += b) c < this.viewportMinimum || this.logLabelValues.push(c);
                    this.logLabelValues.sort(Sa);
                    this.createExtraLabelsForLog(a)
                }
            }
        };
        y.prototype.createLabels = function() {
            var a, d, b = 0,
                c = 0,
                e, g = 0,
                h = 0,
                c = 0,
                c = this.interval,
                k = 0,
                m, l = 0.6 * this.chart.height,
                p;
            a = !1;
            var q = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [],
                n = q.length ? v(this.scaleBreaks.firstBreakIndex) ? 0 : this.scaleBreaks.firstBreakIndex : 0;
            if ("axisX" !== this.type || "dateTime" !== this.valueType || this.logarithmic) {
                e =
                    this.viewportMaximum;
                if (this.labels) {
                    a = Math.ceil(c);
                    for (var c = Math.ceil(this.intervalStartPosition), f = !1, b = c; b < this.viewportMaximum; b += a)
                        if (this.labels[b]) f = !0;
                        else {
                            f = !1;
                            break
                        }
                    f && (this.interval = a, this.intervalStartPosition = c)
                }
                if (this.logarithmic && !this.equidistantInterval)
                    for (this.logLabelValues || (this.logLabelValues = [], this.createExtraLabelsForLog()), c = 0, f = n; c < this.logLabelValues.length; c++)
                        if (b = this.logLabelValues[c], b < this.viewportMinimum) c++;
                        else {
                            for (; f < q.length && b > q[f].endValue; f++);
                            a = f < q.length &&
                                b >= q[f].startValue && b <= q[f].endValue;
                            p = b;
                            a || (a = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.options,
                                value: p,
                                label: this.labels[p] ? this.labels[p] : null
                            }) : "axisX" === this.type && this.labels[p] ? this.labels[p] : ba(p, this.valueFormatString, this.chart._cultureInfo), a = new ka(this.ctx, {
                                x: 0,
                                y: 0,
                                maxWidth: g,
                                maxHeight: h,
                                angle: this.labelAngle,
                                text: this.prefix + a + this.suffix,
                                backgroundColor: this.labelBackgroundColor,
                                borderColor: this.labelBorderColor,
                                borderThickness: this.labelBorderThickness,
                                cornerRadius: this.labelCornerRadius,
                                horizontalAlign: "left",
                                fontSize: this.labelFontSize,
                                fontFamily: this.labelFontFamily,
                                fontWeight: this.labelFontWeight,
                                fontColor: this.labelFontColor,
                                fontStyle: this.labelFontStyle,
                                textBaseline: "middle",
                                borderThickness: 0
                            }), this._labels.push({
                                position: p,
                                textBlock: a,
                                effectiveHeight: null
                            }))
                        }
                f = n;
                for (b = this.intervalStartPosition; b <= e; b = parseFloat(1E-12 > this.interval ? this.logarithmic && this.equidistantInterval ? b * Math.pow(this.logarithmBase, this.interval) : b + this.interval : (this.logarithmic && this.equidistantInterval ?
                        b * Math.pow(this.logarithmBase, this.interval) : b + this.interval).toFixed(12))) {
                    for (; f < q.length && b > q[f].endValue; f++);
                    a = f < q.length && b >= q[f].startValue && b <= q[f].endValue;
                    p = b;
                    a || (a = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.options,
                        value: p,
                        label: this.labels[p] ? this.labels[p] : null
                    }) : "axisX" === this.type && this.labels[p] ? this.labels[p] : ba(p, this.valueFormatString, this.chart._cultureInfo), a = new ka(this.ctx, {
                        x: 0,
                        y: 0,
                        maxWidth: g,
                        maxHeight: h,
                        angle: this.labelAngle,
                        text: this.prefix + a + this.suffix,
                        horizontalAlign: "left",
                        backgroundColor: this.labelBackgroundColor,
                        borderColor: this.labelBorderColor,
                        borderThickness: this.labelBorderThickness,
                        cornerRadius: this.labelCornerRadius,
                        fontSize: this.labelFontSize,
                        fontFamily: this.labelFontFamily,
                        fontWeight: this.labelFontWeight,
                        fontColor: this.labelFontColor,
                        fontStyle: this.labelFontStyle,
                        textBaseline: "middle"
                    }), this._labels.push({
                        position: p,
                        textBlock: a,
                        effectiveHeight: null
                    }))
                }
            } else
                for (this.intervalStartPosition = this.getLabelStartPoint(new Date(this.viewportMinimum),
                        this.intervalType, this.interval), e = Ya(new Date(this.viewportMaximum), this.interval, this.intervalType), f = n, b = this.intervalStartPosition; b < e; Ya(b, c, this.intervalType)) {
                    for (a = b.getTime(); f < q.length && a > q[f].endValue; f++);
                    p = a;
                    a = f < q.length && a >= q[f].startValue && a <= q[f].endValue;
                    a || (a = this.labelFormatter ? this.labelFormatter({
                            chart: this.chart,
                            axis: this.options,
                            value: new Date(p),
                            label: this.labels[p] ? this.labels[p] : null
                        }) : "axisX" === this.type && this.labels[p] ? this.labels[p] : Ca(p, this.valueFormatString, this.chart._cultureInfo),
                        a = new ka(this.ctx, {
                            x: 0,
                            y: 0,
                            maxWidth: g,
                            backgroundColor: this.labelBackgroundColor,
                            borderColor: this.labelBorderColor,
                            borderThickness: this.labelBorderThickness,
                            cornerRadius: this.labelCornerRadius,
                            maxHeight: h,
                            angle: this.labelAngle,
                            text: this.prefix + a + this.suffix,
                            horizontalAlign: "left",
                            fontSize: this.labelFontSize,
                            fontFamily: this.labelFontFamily,
                            fontWeight: this.labelFontWeight,
                            fontColor: this.labelFontColor,
                            fontStyle: this.labelFontStyle,
                            textBaseline: "middle"
                        }), this._labels.push({
                            position: p,
                            textBlock: a,
                            effectiveHeight: null,
                            breaksLabelType: void 0
                        }))
                }
            if ("bottom" === this._position || "top" === this._position) k = this.logarithmic && !this.equidistantInterval && 2 <= this._labels.length ? this.lineCoordinates.width * Math.log(Math.min(this._labels[this._labels.length - 1].position / this._labels[this._labels.length - 2].position, this._labels[1].position / this._labels[0].position)) / Math.log(this.range) : this.lineCoordinates.width / (this.logarithmic && this.equidistantInterval ? Math.log(this.range) / Math.log(this.logarithmBase) : Math.abs(this.range)) * S[this.intervalType +
                "Duration"] * this.interval, g = "undefined" === typeof this.options.labelMaxWidth ? 0.5 * this.chart.width >> 0 : this.options.labelMaxWidth, this.chart.panEnabled || (h = "undefined" === typeof this.options.labelWrap || this.labelWrap ? 0.8 * this.chart.height >> 0 : 1.5 * this.labelFontSize);
            else if ("left" === this._position || "right" === this._position) k = this.logarithmic && !this.equidistantInterval && 2 <= this._labels.length ? this.lineCoordinates.height * Math.log(Math.min(this._labels[this._labels.length - 1].position / this._labels[this._labels.length -
                2].position, this._labels[1].position / this._labels[0].position)) / Math.log(this.range) : this.lineCoordinates.height / (this.logarithmic && this.equidistantInterval ? Math.log(this.range) / Math.log(this.logarithmBase) : Math.abs(this.range)) * S[this.intervalType + "Duration"] * this.interval, this.chart.panEnabled || (g = "undefined" === typeof this.options.labelMaxWidth ? 0.3 * this.chart.width >> 0 : this.options.labelMaxWidth), h = "undefined" === typeof this.options.labelWrap || this.labelWrap ? 0.3 * this.chart.height >> 0 : 1.5 * this.labelFontSize;
            for (c = 0; c < this._labels.length; c++) {
                a = this._labels[c].textBlock;
                a.maxWidth = g;
                a.maxHeight = h;
                var A = a.measureText();
                m = A.height
            }
            e = [];
            n = q = 0;
            if (this.labelAutoFit || this.options.labelAutoFit)
                if (v(this.labelAngle) || (this.labelAngle = (this.labelAngle % 360 + 360) % 360, 90 < this.labelAngle && 270 > this.labelAngle ? this.labelAngle -= 180 : 270 <= this.labelAngle && 360 >= this.labelAngle && (this.labelAngle -= 360)), "bottom" === this._position || "top" === this._position)
                    if (g = 0.9 * k >> 0, n = 0, !this.chart.panEnabled && 1 <= this._labels.length) {
                        this.sessionVariables.labelFontSize =
                            this.labelFontSize;
                        this.sessionVariables.labelMaxWidth = g;
                        this.sessionVariables.labelMaxHeight = h;
                        this.sessionVariables.labelAngle = this.labelAngle;
                        this.sessionVariables.labelWrap = this.labelWrap;
                        for (b = 0; b < this._labels.length; b++)
                            if (!this._labels[b].breaksLabelType) {
                                a = this._labels[b].textBlock;
                                for (var w, f = a.text.split(" "), c = 0; c < f.length; c++) p = f[c], this.ctx.font = a.fontStyle + " " + a.fontWeight + " " + a.fontSize + "px " + a.fontFamily, p = this.ctx.measureText(p), p.width > n && (w = b, n = p.width)
                            }
                        b = 0;
                        for (b = this.intervalStartPosition <
                            this.viewportMinimum ? 1 : 0; b < this._labels.length; b++)
                            if (!this._labels[b].breaksLabelType) {
                                a = this._labels[b].textBlock;
                                A = a.measureText();
                                for (f = b + 1; f < this._labels.length; f++)
                                    if (!this._labels[f].breaksLabelType) {
                                        d = this._labels[f].textBlock;
                                        d = d.measureText();
                                        break
                                    }
                                e.push(a.height);
                                this.sessionVariables.labelMaxHeight = Math.max.apply(Math, e);
                                Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
                                Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
                                c = g * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (h - a.fontSize / 2) *
                                    Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
                                if (v(this.options.labelAngle) && isNaN(this.options.labelAngle) && 0 !== this.options.labelAngle)
                                    if (this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? h : Math.min((c - g * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)), c), p = (l - (m + a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(-25))) / Math.sin(Math.PI / 180 * Math.abs(-25)), !v(this.options.labelWrap)) this.labelWrap ? v(this.options.labelMaxWidth) ? (this.sessionVariables.labelMaxWidth =
                                        Math.min(Math.max(g, n), p), this.sessionVariables.labelWrap = this.labelWrap, A.width + d.width >> 0 > 2 * g && (this.sessionVariables.labelAngle = -25)) : (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelAngle = this.sessionVariables.labelMaxWidth > g ? -25 : this.sessionVariables.labelAngle) : v(this.options.labelMaxWidth) ? (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelMaxWidth =
                                        g, A.width + d.width >> 0 > 2 * g && (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = p)) : (this.sessionVariables.labelAngle = this.sessionVariables.labelMaxWidth > g ? -25 : this.sessionVariables.labelAngle, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelWrap = this.labelWrap);
                                    else {
                                        if (v(this.options.labelWrap))
                                            if (!v(this.options.labelMaxWidth)) this.options.labelMaxWidth < g ? (this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth,
                                                this.sessionVariables.labelMaxHeight = c) : (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelMaxHeight = h);
                                            else if (!v(d))
                                            if (c = A.width + d.width >> 0, f = this.labelFontSize, n < g) c - 2 * g > q && (q = c - 2 * g, c >= 2 * g && c < 2.2 * g ? (this.sessionVariables.labelMaxWidth = g, v(this.options.labelFontSize) && 12 < f && (f = Math.floor(12 / 13 * f), a.measureText()), this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? f : this.options.labelFontSize, this.sessionVariables.labelAngle =
                                                    this.labelAngle) : c >= 2.2 * g && c < 2.8 * g ? (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = p, this.sessionVariables.labelFontSize = f) : c >= 2.8 * g && c < 3.2 * g ? (this.sessionVariables.labelMaxWidth = Math.max(g, n), this.sessionVariables.labelWrap = !0, v(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? f : this.options.labelFontSize, this.sessionVariables.labelAngle =
                                                    this.labelAngle) : c >= 3.2 * g && c < 3.6 * g ? (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelMaxWidth = p, this.sessionVariables.labelFontSize = this.labelFontSize) : c > 3.6 * g && c < 5 * g ? (v(this.options.labelFontSize) && 12 < f && (f = Math.floor(12 / 13 * f), a.measureText()), this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? f : this.options.labelFontSize, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = p) :
                                                c > 5 * g && (this.sessionVariables.labelWrap = !0, this.sessionVariables.labelMaxWidth = g, this.sessionVariables.labelFontSize = f, this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelAngle = this.labelAngle));
                                            else if (w === b && (0 === w && n + this._labels[w + 1].textBlock.measureText().width - 2 * g > q || w === this._labels.length - 1 && n + this._labels[w - 1].textBlock.measureText().width - 2 * g > q || 0 < w && w < this._labels.length - 1 && n + this._labels[w + 1].textBlock.measureText().width - 2 * g > q && n + this._labels[w - 1].textBlock.measureText().width -
                                                2 * g > q)) q = 0 === w ? n + this._labels[w + 1].textBlock.measureText().width - 2 * g : n + this._labels[w - 1].textBlock.measureText().width - 2 * g, this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? f : this.options.labelFontSize, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = p;
                                        else if (0 === q)
                                            for (this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? f : this.options.labelFontSize, this.sessionVariables.labelWrap = !0, c = 0; c < this._labels.length; c++) a =
                                                this._labels[c].textBlock, a.maxWidth = this.sessionVariables.labelMaxWidth = Math.min(Math.max(g, n), p), A = a.measureText(), c < this._labels.length - 1 && (f = c + 1, d = this._labels[f].textBlock, d.maxWidth = this.sessionVariables.labelMaxWidth = Math.min(Math.max(g, n), p), d = d.measureText(), A.width + d.width >> 0 > 2 * g && (this.sessionVariables.labelAngle = -25))
                                    } else(this.sessionVariables.labelAngle = this.labelAngle, this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? h : Math.min((c - g * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) /
                                    Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)), c), p = 0 != this.labelAngle ? (l - (m + a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) : g, this.sessionVariables.labelMaxHeight = h = this.labelWrap ? (l - p * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) : 1.5 * this.labelFontSize, v(this.options.labelWrap)) ? v(this.options.labelWrap) && (this.labelWrap && !v(this.options.labelMaxWidth) ? (this.sessionVariables.labelWrap =
                                    this.labelWrap, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : p, this.sessionVariables.labelMaxHeight = h) : (this.sessionVariables.labelAngle = this.labelAngle, this.sessionVariables.labelMaxWidth = p, this.sessionVariables.labelMaxHeight = c < 0.9 * k ? 0.9 * k : c, this.sessionVariables.labelWrap = this.labelWrap)) : (this.options.labelWrap ? (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : p) :
                                    (v(this.options.labelMaxWidth), this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : p, this.sessionVariables.labelWrap = this.labelWrap), this.sessionVariables.labelMaxHeight = h)
                            }
                        for (c = 0; c < this._labels.length; c++) a = this._labels[c].textBlock, a.maxWidth = this.labelMaxWidth = this.sessionVariables.labelMaxWidth, a.fontSize = this.sessionVariables.labelFontSize, a.angle = this.labelAngle = this.sessionVariables.labelAngle, a.wrap = this.labelWrap = this.sessionVariables.labelWrap, a.maxHeight =
                            this.sessionVariables.labelMaxHeight, a.measureText()
                    } else
                        for (b = 0; b < this._labels.length; b++) a = this._labels[b].textBlock, a.maxWidth = this.labelMaxWidth = v(this.options.labelMaxWidth) ? this.sessionVariables.labelMaxWidth : this.options.labelMaxWidth, a.fontSize = this.labelFontSize = v(this.options.labelFontSize) ? this.sessionVariables.labelFontSize : this.options.labelFontSize, a.angle = this.labelAngle = v(this.options.labelAngle) ? this.sessionVariables.labelAngle : this.labelAngle, a.wrap = this.labelWrap = v(this.options.labelWrap) ?
                            this.sessionVariables.labelWrap : this.options.labelWrap, a.maxHeight = this.sessionVariables.labelMaxHeight, a.measureText();
            else if ("left" === this._position || "right" === this._position)
                if (g = v(this.options.labelMaxWidth) ? 0.3 * this.chart.width >> 0 : this.options.labelMaxWidth, h = "undefined" === typeof this.options.labelWrap || this.labelWrap ? 0.3 * this.chart.height >> 0 : 1.5 * this.labelFontSize, !this.chart.panEnabled && 1 <= this._labels.length) {
                    this.sessionVariables.labelFontSize = this.labelFontSize;
                    this.sessionVariables.labelMaxWidth =
                        g;
                    this.sessionVariables.labelMaxHeight = h;
                    this.sessionVariables.labelAngle = v(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle;
                    this.sessionVariables.labelWrap = this.labelWrap;
                    for (b = 0; b < this._labels.length; b++)
                        if (!this._labels[b].breaksLabelType) {
                            a = this._labels[b].textBlock;
                            A = a.measureText();
                            for (f = b + 1; f < this._labels.length; f++)
                                if (!this._labels[f].breaksLabelType) {
                                    d = this._labels[f].textBlock;
                                    d = d.measureText();
                                    break
                                }
                            e.push(a.height);
                            this.sessionVariables.labelMaxHeight = Math.max.apply(Math,
                                e);
                            c = g * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (h - a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
                            Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
                            Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
                            v(this.options.labelAngle) && isNaN(this.options.labelAngle) && 0 !== this.options.labelAngle ? v(this.options.labelWrap) ? v(this.options.labelWrap) && (v(this.options.labelMaxWidth) ? v(d) || (k = A.height + d.height >> 0, k - 2 * h > n && (n = k - 2 * h, k >= 2 * h && k < 2.4 * h ? (v(this.options.labelFontSize) && 12 < this.labelFontSize &&
                                    (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize) : k >= 2.4 * h && k < 2.8 * h ? (this.sessionVariables.labelMaxHeight = c, this.sessionVariables.labelFontSize = this.labelFontSize, this.sessionVariables.labelWrap = !0) : k >= 2.8 * h && k < 3.2 * h ? (this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelWrap = !0, v(this.options.labelFontSize) && 12 <
                                    this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize, this.sessionVariables.labelAngle = v(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle) : k >= 3.2 * h && k < 3.6 * h ? (this.sessionVariables.labelMaxHeight = c, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelFontSize = this.labelFontSize) : k > 3.6 * h && k < 10 * h ? (v(this.options.labelFontSize) &&
                                    12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize, this.sessionVariables.labelMaxWidth = g, this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelAngle = v(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle) : k > 10 * h && k < 50 * h && (v(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize),
                                    a.measureText()), this.sessionVariables.labelFontSize = v(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize, this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelMaxWidth = g, this.sessionVariables.labelAngle = v(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle))) : (this.sessionVariables.labelMaxHeight = h, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth)) : (this.sessionVariables.labelMaxWidth =
                                    this.labelWrap ? this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth : this.labelMaxWidth ? this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth : g, this.sessionVariables.labelMaxHeight = h) : (this.sessionVariables.labelAngle = this.labelAngle, this.sessionVariables.labelMaxWidth = 0 === this.labelAngle ? g : Math.min((c - h * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)), h), v(this.options.labelWrap)) ?
                                v(this.options.labelWrap) && (this.labelWrap && !v(this.options.labelMaxWidth) ? (this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth > this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth, this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxHeight = c) : (this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : g, this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? h : c, v(this.options.labelMaxWidth) &&
                                    (this.sessionVariables.labelAngle = this.labelAngle))) : this.options.labelWrap ? (this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? h : c, this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = g) : (this.sessionVariables.labelMaxHeight = h, v(this.options.labelMaxWidth), this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth, this.sessionVariables.labelWrap = this.labelWrap)
                        }
                    for (c = 0; c < this._labels.length; c++) a =
                        this._labels[c].textBlock, a.maxWidth = this.labelMaxWidth = this.sessionVariables.labelMaxWidth, a.fontSize = this.labelFontSize = this.sessionVariables.labelFontSize, a.angle = this.labelAngle = this.sessionVariables.labelAngle, a.wrap = this.labelWrap = this.sessionVariables.labelWrap, a.maxHeight = this.sessionVariables.labelMaxHeight, a.measureText()
                } else
                    for (b = 0; b < this._labels.length; b++) a = this._labels[b].textBlock, a.maxWidth = this.labelMaxWidth = v(this.options.labelMaxWidth) ? this.sessionVariables.labelMaxWidth : this.options.labelMaxWidth,
                        a.fontSize = this.labelFontSize = v(this.options.labelFontSize) ? this.sessionVariables.labelFontSize : this.options.labelFontSize, a.angle = this.labelAngle = v(this.options.labelAngle) ? this.sessionVariables.labelAngle : this.labelAngle, a.wrap = this.labelWrap = v(this.options.labelWrap) ? this.sessionVariables.labelWrap : this.options.labelWrap, a.maxHeight = this.sessionVariables.labelMaxHeight, a.measureText();
            for (b = 0; b < this.stripLines.length; b++) {
                var g = this.stripLines[b],
                    y;
                if ("outside" === g.labelPlacement) {
                    h = this.sessionVariables.labelMaxWidth;
                    if ("bottom" === this._position || "top" === this._position) y = v(g.options.labelWrap) ? this.sessionVariables.labelMaxHeight : g.labelWrap ? 0.8 * this.chart.height >> 0 : 1.5 * this.labelFontSize;
                    if ("left" === this._position || "right" === this._position) y = v(g.options.labelWrap) ? this.sessionVariables.labelMaxHeight : g.labelWrap ? 0.8 * this.chart.width >> 0 : 1.5 * this.labelFontSize;
                    v(g.labelBackgroundColor) && (g.labelBackgroundColor = "#EEEEEE")
                } else h = "bottom" === this._position || "top" === this._position ? 0.9 * this.chart.width >> 0 : 0.9 * this.chart.height >>
                    0, y = v(g.options.labelWrap) || g.labelWrap ? "bottom" === this._position || "top" === this._position ? 0.8 * this.chart.width >> 0 : 0.8 * this.chart.height >> 0 : 1.5 * this.labelFontSize, v(g.labelBackgroundColor) && (v(g.startValue) && 0 !== g.startValue ? g.labelBackgroundColor = r ? "transparent" : null : g.labelBackgroundColor = "#EEEEEE");
                a = new ka(this.ctx, {
                    x: 0,
                    y: 0,
                    backgroundColor: g.labelBackgroundColor,
                    borderColor: g.labelBorderColor,
                    borderThickness: g.labelBorderThickness,
                    cornerRadius: g.labelCornerRadius,
                    maxWidth: g.options.labelMaxWidth ?
                        g.options.labelMaxWidth : h,
                    maxHeight: y,
                    angle: this.labelAngle,
                    text: g.labelFormatter ? g.labelFormatter({
                        chart: this.chart,
                        axis: this,
                        stripLine: g
                    }) : g.label,
                    horizontalAlign: "left",
                    fontSize: "outside" === g.labelPlacement ? g.options.labelFontSize ? g.labelFontSize : this.labelFontSize : g.labelFontSize,
                    fontFamily: "outside" === g.labelPlacement ? g.options.labelFontFamily ? g.labelFontFamily : this.labelFontFamily : g.labelFontFamily,
                    fontWeight: "outside" === g.labelPlacement ? g.options.labelFontWeight ? g.labelFontWeight : this.labelFontWeight : g.labelFontWeight,
                    fontColor: g.labelFontColor || g.color,
                    fontStyle: "outside" === g.labelPlacement ? g.options.labelFontStyle ? g.labelFontStyle : this.fontWeight : g.labelFontStyle,
                    textBaseline: "middle"
                });
                this._stripLineLabels.push({
                    position: g.value,
                    textBlock: a,
                    effectiveHeight: null,
                    stripLine: g
                })
            }
        };
        y.prototype.createLabelsAndCalculateWidth = function() {
            var a = 0,
                d = 0;
            this._labels = [];
            this._stripLineLabels = [];
            var b = this.chart.isNavigator ? 0 : 5;
            if ("left" === this._position || "right" === this._position) {
                this.createLabels();
                for (d =
                    0; d < this._labels.length; d++) {
                    var c = this._labels[d].textBlock,
                        e = c.measureText(),
                        g = 0,
                        g = 0 === this.labelAngle ? e.width : e.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - c.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
                    a < g && (a = g);
                    this._labels[d].effectiveWidth = g
                }
                for (d = 0; d < this._stripLineLabels.length; d++) "outside" === this._stripLineLabels[d].stripLine.labelPlacement && (this._stripLineLabels[d].stripLine.value >= this.viewportMinimum && this._stripLineLabels[d].stripLine.value <= this.viewportMaximum) &&
                    (c = this._stripLineLabels[d].textBlock, e = c.measureText(), g = 0 === this.labelAngle ? e.width : e.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - c.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)), a < g && (a = g), this._stripLineLabels[d].effectiveWidth = g)
            }
            d = this.title ? this._titleTextBlock.measureText().height + 2 : 0;
            return c = "inside" === this.labelPlacement ? c = d + b : d + a + this.tickLength + b
        };
        y.prototype.createLabelsAndCalculateHeight = function() {
            var a = 0;
            this._labels = [];
            this._stripLineLabels = [];
            var d,
                b = 0,
                c = this.chart.isNavigator ? 0 : 5;
            this.createLabels();
            if ("bottom" === this._position || "top" === this._position) {
                for (b = 0; b < this._labels.length; b++) {
                    d = this._labels[b].textBlock;
                    var e = d.measureText(),
                        g = 0,
                        g = 0 === this.labelAngle ? e.height : e.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - d.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
                    a < g && (a = g);
                    this._labels[b].effectiveHeight = g
                }
                for (b = 0; b < this._stripLineLabels.length; b++) "outside" === this._stripLineLabels[b].stripLine.labelPlacement &&
                    (this._stripLineLabels[b].stripLine.value >= this.viewportMinimum && this._stripLineLabels[b].stripLine.value <= this.viewportMaximum) && (d = this._stripLineLabels[b].textBlock, e = d.measureText(), g = 0 === this.labelAngle ? e.height : e.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - d.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)), a < g && (a = g), this._stripLineLabels[b].effectiveHeight = g)
            }
            d = this.title ? this._titleTextBlock.measureText().height + 2 : 0;
            return b = "inside" === this.labelPlacement ? b =
                d + c : d + a + this.tickLength + c
        };
        y.setLayout = function(a, d, b, c, e, g) {
            var h, k, m, l, p = a[0] ? a[0].chart : d[0].chart,
                q = p.isNavigator ? 0 : 10,
                n = p._axes;
            if (a && 0 < a.length)
                for (var f = 0; f < a.length; f++) a[f] && a[f].calculateAxisParameters();
            if (d && 0 < d.length)
                for (f = 0; f < d.length; f++) d[f].calculateAxisParameters();
            if (b && 0 < b.length)
                for (f = 0; f < b.length; f++) b[f].calculateAxisParameters();
            if (c && 0 < c.length)
                for (f = 0; f < c.length; f++) c[f].calculateAxisParameters();
            for (f = 0; f < n.length; f++)
                if (n[f] && n[f].scaleBreaks && n[f].scaleBreaks._appliedBreaks.length)
                    for (var r =
                            n[f].scaleBreaks._appliedBreaks, w = 0; w < r.length && !(r[w].startValue > n[f].viewportMaximum); w++) r[w].endValue < n[f].viewportMinimum || (v(n[f].scaleBreaks.firstBreakIndex) && (n[f].scaleBreaks.firstBreakIndex = w), r[w].startValue >= n[f].viewPortMinimum && (n[f].scaleBreaks.lastBreakIndex = w));
            for (var y = w = 0, s = 0, C = 0, x = 0, D = 0, z = 0, B, E, F = k = 0, H, I, L, r = H = I = L = !1, f = 0; f < n.length; f++) n[f] && n[f].title && (n[f]._titleTextBlock = new ka(n[f].ctx, {
                text: n[f].title,
                horizontalAlign: "center",
                fontSize: n[f].titleFontSize,
                fontFamily: n[f].titleFontFamily,
                fontWeight: n[f].titleFontWeight,
                fontColor: n[f].titleFontColor,
                fontStyle: n[f].titleFontStyle,
                borderColor: n[f].titleBorderColor,
                borderThickness: n[f].titleBorderThickness,
                backgroundColor: n[f].titleBackgroundColor,
                cornerRadius: n[f].titleCornerRadius,
                textBaseline: "top"
            }));
            for (f = 0; f < n.length; f++)
                if (n[f].title) switch (n[f]._position) {
                    case "left":
                        n[f]._titleTextBlock.maxWidth = n[f].titleMaxWidth || g.height;
                        n[f]._titleTextBlock.maxHeight = n[f].titleWrap ? 0.8 * g.width : 1.5 * n[f].titleFontSize;
                        n[f]._titleTextBlock.angle = -90;
                        break;
                    case "right":
                        n[f]._titleTextBlock.maxWidth = n[f].titleMaxWidth || g.height;
                        n[f]._titleTextBlock.maxHeight = n[f].titleWrap ? 0.8 * g.width : 1.5 * n[f].titleFontSize;
                        n[f]._titleTextBlock.angle = 90;
                        break;
                    default:
                        n[f]._titleTextBlock.maxWidth = n[f].titleMaxWidth || g.width, n[f]._titleTextBlock.maxHeight = n[f].titleWrap ? 0.8 * g.height : 1.5 * n[f].titleFontSize, n[f]._titleTextBlock.angle = 0
                }
                if ("normal" === e) {
                    for (var C = [], x = [], D = [], z = [], M = [], N = [], O = [], Q = []; 4 > w;) {
                        var G = 0,
                            R = 0,
                            S = 0,
                            U = 0,
                            W = e = 0,
                            K = 0,
                            $ = 0,
                            V = 0,
                            X = 0,
                            P = 0,
                            ba = 0;
                        if (b &&
                            0 < b.length)
                            for (D = [], f = P = 0; f < b.length; f++) D.push(Math.ceil(b[f] ? b[f].createLabelsAndCalculateWidth() : 0)), P += D[f], K += b[f] && !p.isNavigator ? b[f].margin : 0;
                        else D.push(Math.ceil(b[0] ? b[0].createLabelsAndCalculateWidth() : 0));
                        O.push(D);
                        if (c && 0 < c.length)
                            for (z = [], f = ba = 0; f < c.length; f++) z.push(Math.ceil(c[f] ? c[f].createLabelsAndCalculateWidth() : 0)), ba += z[f], $ += c[f] ? c[f].margin : 0;
                        else z.push(Math.ceil(c[0] ? c[0].createLabelsAndCalculateWidth() : 0));
                        Q.push(z);
                        h = Math.round(g.x1 + P + K);
                        m = Math.round(g.x2 - ba - $ > p.width -
                            q ? p.width - q : g.x2 - ba - $);
                        if (a && 0 < a.length)
                            for (C = [], f = V = 0; f < a.length; f++) a[f] && (a[f].lineCoordinates = {}), a[f].lineCoordinates.width = Math.abs(m - h), a[f].title && (a[f]._titleTextBlock.maxWidth = 0 < a[f].titleMaxWidth && a[f].titleMaxWidth < a[f].lineCoordinates.width ? a[f].titleMaxWidth : a[f].lineCoordinates.width), C.push(Math.ceil(a[f] ? a[f].createLabelsAndCalculateHeight() : 0)), V += C[f], e += a[f] && !p.isNavigator ? a[f].margin : 0;
                        else C.push(Math.ceil(a[0] ? a[0].createLabelsAndCalculateHeight() : 0));
                        M.push(C);
                        if (d && 0 < d.length)
                            for (x = [], f = X = 0; f < d.length; f++) d[f] && (d[f].lineCoordinates = {}), d[f].lineCoordinates.width = Math.abs(m - h), d[f].title && (d[f]._titleTextBlock.maxWidth = 0 < d[f].titleMaxWidth && d[f].titleMaxWidth < d[f].lineCoordinates.width ? d[f].titleMaxWidth : d[f].lineCoordinates.width), x.push(Math.ceil(d[f] ? d[f].createLabelsAndCalculateHeight() : 0)), X += x[f], W += d[f] && !p.isNavigator ? d[f].margin : 0;
                        else x.push(Math.ceil(d[0] ? d[0].createLabelsAndCalculateHeight() : 0));
                        N.push(x);
                        if (a && 0 < a.length)
                            for (f = 0; f < a.length; f++) a[f] && (a[f].lineCoordinates.x1 =
                                h, m = Math.round(g.x2 - ba - $ > p.width - q ? p.width - q : g.x2 - ba - $), a[f]._labels && 1 < a[f]._labels.length && (k = l = 0, l = a[f]._labels[1], k = "dateTime" === a[f].valueType ? a[f]._labels[a[f]._labels.length - 2] : a[f]._labels[a[f]._labels.length - 1], y = l.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(l.textBlock.angle)) + (l.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(l.textBlock.angle)), s = k.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(k.textBlock.angle)) + (k.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI /
                                    180 * Math.abs(k.textBlock.angle))), !a[f] || (!a[f].labelAutoFit || v(B) || v(E) || p.isNavigator) || (k = 0, 0 < a[f].labelAngle ? E + s > m && (k += 0 < a[f].labelAngle ? E + s - m - ba : 0) : 0 > a[f].labelAngle ? B - y < h && B - y < a[f].viewportMinimum && (F = h - (K + a[f].tickLength + D + B - y + a[f].labelFontSize / 2)) : 0 === a[f].labelAngle && (E + s > m && (k = E + s / 2 - m - ba), B - y < h && B - y < a[f].viewportMinimum && (F = h - K - a[f].tickLength - D - B + y / 2)), a[f].viewportMaximum === a[f].maximum && a[f].viewportMinimum === a[f].minimum && 0 < a[f].labelAngle && 0 < k ? m -= k : a[f].viewportMaximum === a[f].maximum &&
                                    a[f].viewportMinimum === a[f].minimum && 0 > a[f].labelAngle && 0 < F ? h += F : a[f].viewportMaximum === a[f].maximum && a[f].viewportMinimum === a[f].minimum && 0 === a[f].labelAngle && (0 < F && (h += F), 0 < k && (m -= k))), p.panEnabled ? V = p.sessionVariables.axisX.height : p.sessionVariables.axisX.height = V, k = Math.round(g.y2 - V - e + G), l = Math.round(g.y2), a[f].lineCoordinates.x2 = m, a[f].lineCoordinates.width = m - h, a[f].lineCoordinates.y1 = k, a[f].lineCoordinates.y2 = k, a[f].bounds = {
                                    x1: h,
                                    y1: k,
                                    x2: m,
                                    y2: l - (V + e - C[f] - G),
                                    width: m - h,
                                    height: l - k
                                }), G += C[f] + a[f].margin;
                        if (d && 0 < d.length)
                            for (f = 0; f < d.length; f++) d[f].lineCoordinates.x1 = Math.round(g.x1 + P + K), d[f].lineCoordinates.x2 = Math.round(g.x2 - ba - $ > p.width - q ? p.width - q : g.x2 - ba - $), d[f].lineCoordinates.width = Math.abs(m - h), d[f]._labels && 1 < d[f]._labels.length && (l = d[f]._labels[1], k = "dateTime" === d[f].valueType ? d[f]._labels[d[f]._labels.length - 2] : d[f]._labels[d[f]._labels.length - 1], y = l.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(l.textBlock.angle)) + (l.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(l.textBlock.angle)),
                                s = k.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(k.textBlock.angle)) + (k.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(k.textBlock.angle))), p.panEnabled ? X = p.sessionVariables.axisX2.height : p.sessionVariables.axisX2.height = X, k = Math.round(g.y1), l = Math.round(g.y2 + d[f].margin), d[f].lineCoordinates.y1 = k + X + W - R, d[f].lineCoordinates.y2 = k, d[f].bounds = {
                                x1: h,
                                y1: k + (X + W - x[f] - R),
                                x2: m,
                                y2: l,
                                width: m - h,
                                height: l - k
                            }, R += x[f] + d[f].margin;
                        if (b && 0 < b.length)
                            for (f = 0; f < b.length; f++) K = p.isNavigator ? 0 :
                                10, b[f] && (h = Math.round(a[0] ? a[0].lineCoordinates.x1 : d[0].lineCoordinates.x1), K = b[f]._labels && 0 < b[f]._labels.length ? b[f]._labels[b[f]._labels.length - 1].textBlock.height / 2 : q, k = Math.round(g.y1 + X + W < Math.max(K, q) ? Math.max(K, q) : g.y1 + X + W), m = Math.round(a[0] ? a[0].lineCoordinates.x1 : d[0].lineCoordinates.x1), K = 0 < a.length ? 0 : b[f]._labels && 0 < b[f]._labels.length ? b[f]._labels[0].textBlock.height / 2 : q, l = Math.round(g.y2 - V - e - K), b[f].lineCoordinates = {
                                    x1: m - S,
                                    y1: k,
                                    x2: m - S,
                                    y2: l,
                                    height: Math.abs(l - k)
                                }, b[f].bounds = {
                                    x1: h - (D[f] +
                                        S),
                                    y1: k,
                                    x2: m,
                                    y2: l,
                                    width: m - h,
                                    height: l - k
                                }, b[f].title && (b[f]._titleTextBlock.maxWidth = 0 < b[f].titleMaxWidth && b[f].titleMaxWidth < b[f].lineCoordinates.height ? b[f].titleMaxWidth : b[f].lineCoordinates.height), S += D[f] + b[f].margin);
                        if (c && 0 < c.length)
                            for (f = 0; f < c.length; f++) c[f] && (h = Math.round(a[0] ? a[0].lineCoordinates.x2 : d[0].lineCoordinates.x2), m = Math.round(h), K = c[f]._labels && 0 < c[f]._labels.length ? c[f]._labels[c[f]._labels.length - 1].textBlock.height / 2 : 0, k = Math.round(g.y1 + X + W < Math.max(K, q) ? Math.max(K, q) : g.y1 +
                                X + W), K = 0 < a.length ? 0 : c[f]._labels && 0 < c[f]._labels.length ? c[f]._labels[0].textBlock.height / 2 : 0, l = Math.round(g.y2 - (V + e + K)), c[f].lineCoordinates = {
                                x1: h + U,
                                y1: k,
                                x2: h + U,
                                y2: l,
                                height: Math.abs(l - k)
                            }, c[f].bounds = {
                                x1: h,
                                y1: k,
                                x2: m + (z[f] + U),
                                y2: l,
                                width: m - h,
                                height: l - k
                            }, c[f].title && (c[f]._titleTextBlock.maxWidth = 0 < c[f].titleMaxWidth && c[f].titleMaxWidth < c[f].lineCoordinates.height ? c[f].titleMaxWidth : c[f].lineCoordinates.height), U += z[f] + c[f].margin);
                        if (a && 0 < a.length)
                            for (f = 0; f < a.length; f++) a[f] && (a[f].calculateValueToPixelConversionParameters(),
                                a[f].calculateBreaksSizeInValues(), a[f]._labels && 1 < a[f]._labels.length && (B = (a[f].logarithmic ? Math.log(a[f]._labels[1].position / a[f].viewportMinimum) / a[f].conversionParameters.lnLogarithmBase : a[f]._labels[1].position - a[f].viewportMinimum) * Math.abs(a[f].conversionParameters.pixelPerUnit) + a[f].lineCoordinates.x1, h = a[f]._labels[a[f]._labels.length - ("dateTime" === a[f].valueType ? 2 : 1)].position, h = a[f].getApparentDifference(a[f].viewportMinimum, h), E = a[f].logarithmic ? (1 < h ? Math.log(h) / a[f].conversionParameters.lnLogarithmBase *
                                    Math.abs(a[f].conversionParameters.pixelPerUnit) : 0) + a[f].lineCoordinates.x1 : (0 < h ? h * Math.abs(a[f].conversionParameters.pixelPerUnit) : 0) + a[f].lineCoordinates.x1));
                        if (d && 0 < d.length)
                            for (f = 0; f < d.length; f++) d[f].calculateValueToPixelConversionParameters(), d[f].calculateBreaksSizeInValues(), d[f]._labels && 1 < d[f]._labels.length && (B = (d[f].logarithmic ? Math.log(d[f]._labels[1].position / d[f].viewportMinimum) / d[f].conversionParameters.lnLogarithmBase : d[f]._labels[1].position - d[f].viewportMinimum) * Math.abs(d[f].conversionParameters.pixelPerUnit) +
                                d[f].lineCoordinates.x1, h = d[f]._labels[d[f]._labels.length - ("dateTime" === d[f].valueType ? 2 : 1)].position, h = d[f].getApparentDifference(d[f].viewportMinimum, h), E = d[f].logarithmic ? (1 < h ? Math.log(h) / d[f].conversionParameters.lnLogarithmBase * Math.abs(d[f].conversionParameters.pixelPerUnit) : 0) + d[f].lineCoordinates.x1 : (0 < h ? h * Math.abs(d[f].conversionParameters.pixelPerUnit) : 0) + d[f].lineCoordinates.x1);
                        for (f = 0; f < n.length; f++) "axisY" === n[f].type && (n[f].calculateValueToPixelConversionParameters(), n[f].calculateBreaksSizeInValues());
                        if (0 < w) {
                            if (a && 0 < a.length)
                                for (f = 0; f < a.length; f++) r = M[w - 1][f] === M[w][f] ? !0 : !1;
                            else r = !0;
                            if (d && 0 < d.length)
                                for (f = 0; f < d.length; f++) H = N[w - 1][f] === N[w][f] ? !0 : !1;
                            else H = !0;
                            if (b && 0 < b.length)
                                for (f = 0; f < b.length; f++) I = O[w - 1][f] === O[w][f] ? !0 : !1;
                            else I = !0;
                            if (c && 0 < c.length)
                                for (f = 0; f < c.length; f++) L = Q[w - 1][f] === Q[w][f] ? !0 : !1;
                            else L = !0
                        }
                        if (r && H && I && L) break;
                        w++
                    }
                    if (a && 0 < a.length)
                        for (f = 0; f < a.length; f++) a[f].calculateStripLinesThicknessInValues(), a[f].calculateBreaksInPixels();
                    if (d && 0 < d.length)
                        for (f = 0; f < d.length; f++) d[f].calculateStripLinesThicknessInValues(),
                            d[f].calculateBreaksInPixels();
                    if (b && 0 < b.length)
                        for (f = 0; f < b.length; f++) b[f].calculateStripLinesThicknessInValues(), b[f].calculateBreaksInPixels();
                    if (c && 0 < c.length)
                        for (f = 0; f < c.length; f++) c[f].calculateStripLinesThicknessInValues(), c[f].calculateBreaksInPixels()
                } else {
                    q = [];
                    B = [];
                    F = [];
                    y = [];
                    E = [];
                    s = [];
                    M = [];
                    for (N = []; 4 > w;) {
                        V = U = R = S = $ = K = W = e = Q = O = G = X = 0;
                        if (a && 0 < a.length)
                            for (F = [], f = U = 0; f < a.length; f++) F.push(Math.ceil(a[f] ? a[f].createLabelsAndCalculateWidth() : 0)), U += F[f], e += a[f] && !p.isNavigator ? a[f].margin : 0;
                        else F.push(Math.ceil(a[0] ?
                            a[0].createLabelsAndCalculateWidth() : 0));
                        M.push(F);
                        if (d && 0 < d.length)
                            for (y = [], f = V = 0; f < d.length; f++) y.push(Math.ceil(d[f] ? d[f].createLabelsAndCalculateWidth() : 0)), V += y[f], W += d[f] ? d[f].margin : 0;
                        else y.push(Math.ceil(d[0] ? d[0].createLabelsAndCalculateWidth() : 0));
                        N.push(y);
                        if (b && 0 < b.length)
                            for (f = 0; f < b.length; f++) b[f].lineCoordinates = {}, h = Math.round(g.x1 + U + e), m = Math.round(g.x2 - V - W > p.width - 10 ? p.width - 10 : g.x2 - V - W), b[f].labelAutoFit && !v(C) && (0 < !a.length && (h = 0 > b[f].labelAngle ? Math.max(h, C) : 0 === b[f].labelAngle ?
                                Math.max(h, C / 2) : h), 0 < !d.length && (m = 0 < b[f].labelAngle ? m - x / 2 : 0 === b[f].labelAngle ? m - x / 2 : m)), b[f].lineCoordinates.x1 = h, b[f].lineCoordinates.x2 = m, b[f].lineCoordinates.width = Math.abs(m - h), b[f].title && (b[f]._titleTextBlock.maxWidth = 0 < b[f].titleMaxWidth && b[f].titleMaxWidth < b[f].lineCoordinates.width ? b[f].titleMaxWidth : b[f].lineCoordinates.width);
                        if (c && 0 < c.length)
                            for (f = 0; f < c.length; f++) c[f].lineCoordinates = {}, h = Math.round(g.x1 + U + e), m = Math.round(g.x2 - V - W > c[f].chart.width - 10 ? c[f].chart.width - 10 : g.x2 - V - W), c[f] &&
                                c[f].labelAutoFit && !v(D) && (0 < !a.length && (h = 0 < c[f].labelAngle ? Math.max(h, D) : 0 === c[f].labelAngle ? Math.max(h, D / 2) : h), 0 < !d.length && (m -= z / 2)), c[f].lineCoordinates.x1 = h, c[f].lineCoordinates.x2 = m, c[f].lineCoordinates.width = Math.abs(m - h), c[f].title && (c[f]._titleTextBlock.maxWidth = 0 < c[f].titleMaxWidth && c[f].titleMaxWidth < c[f].lineCoordinates.width ? c[f].titleMaxWidth : c[f].lineCoordinates.width);
                        if (b && 0 < b.length)
                            for (q = [], f = S = 0; f < b.length; f++) q.push(Math.ceil(b[f] ? b[f].createLabelsAndCalculateHeight() : 0)), S +=
                                q[f] + b[f].margin, K += b[f].margin;
                        else q.push(Math.ceil(b[0] ? b[0].createLabelsAndCalculateHeight() : 0));
                        E.push(q);
                        if (c && 0 < c.length)
                            for (B = [], f = R = 0; f < c.length; f++) B.push(Math.ceil(c[f] ? c[f].createLabelsAndCalculateHeight() : 0)), R += B[f], $ += c[f].margin;
                        else B.push(Math.ceil(c[0] ? c[0].createLabelsAndCalculateHeight() : 0));
                        s.push(B);
                        if (b && 0 < b.length)
                            for (f = 0; f < b.length; f++) 0 < b[f]._labels.length && (l = b[f]._labels[0], k = b[f]._labels[b[f]._labels.length - 1], C = l.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(l.textBlock.angle)) +
                                (l.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(l.textBlock.angle)), x = k.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(k.textBlock.angle)) + (k.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(k.textBlock.angle)));
                        if (c && 0 < c.length)
                            for (f = 0; f < c.length; f++) c[f] && 0 < c[f]._labels.length && (l = c[f]._labels[0], k = c[f]._labels[c[f]._labels.length - 1], D = l.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(l.textBlock.angle)) + (l.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI /
                                180 * Math.abs(l.textBlock.angle)), z = k.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(k.textBlock.angle)) + (k.textBlock.height - k.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(k.textBlock.angle)));
                        if (p.panEnabled)
                            for (f = 0; f < b.length; f++) q[f] = p.sessionVariables.axisY.height;
                        else
                            for (f = 0; f < b.length; f++) p.sessionVariables.axisY.height = q[f];
                        if (b && 0 < b.length)
                            for (f = b.length - 1; 0 <= f; f--) k = Math.round(g.y2), l = Math.round(g.y2 > b[f].chart.height - 10 ? b[f].chart.height - 10 : g.y2), b[f].lineCoordinates.y1 = k - (q[f] + b[f].margin +
                                X), b[f].lineCoordinates.y2 = k - (q[f] + b[f].margin + X), b[f].bounds = {
                                x1: h,
                                y1: k - (q[f] + X + b[f].margin),
                                x2: m,
                                y2: l - (X + b[f].margin),
                                width: m - h,
                                height: q[f]
                            }, b[f].title && (b[f]._titleTextBlock.maxWidth = 0 < b[f].titleMaxWidth && b[f].titleMaxWidth < b[f].lineCoordinates.width ? b[f].titleMaxWidth : b[f].lineCoordinates.width), X += q[f] + b[f].margin;
                        if (c && 0 < c.length)
                            for (f = c.length - 1; 0 <= f; f--) c[f] && (k = Math.round(g.y1), l = Math.round(g.y1 + (B[f] + c[f].margin + G)), c[f].lineCoordinates.y1 = l, c[f].lineCoordinates.y2 = l, c[f].bounds = {
                                x1: h,
                                y1: k +
                                    (c[f].margin + G),
                                x2: m,
                                y2: l,
                                width: m - h,
                                height: R
                            }, c[f].title && (c[f]._titleTextBlock.maxWidth = 0 < c[f].titleMaxWidth && c[f].titleMaxWidth < c[f].lineCoordinates.width ? c[f].titleMaxWidth : c[f].lineCoordinates.width), G += B[f] + c[f].margin);
                        if (a && 0 < a.length)
                            for (f = 0; f < a.length; f++) {
                                K = a[f]._labels && 0 < a[f]._labels.length ? a[f]._labels[0].textBlock.fontSize / 2 : 0;
                                h = Math.round(g.x1 + e);
                                k = c && 0 < c.length ? Math.round(c[0] ? c[0].lineCoordinates.y2 : g.y1 < Math.max(K, 10) ? Math.max(K, 10) : g.y1) : g.y1 < Math.max(K, 10) ? Math.max(K, 10) : g.y1;
                                m = Math.round(g.x1 + U + e);
                                l = b && 0 < b.length ? Math.round(b[0] ? b[0].lineCoordinates.y1 : g.y2 - S > p.height - Math.max(K, 10) ? p.height - Math.max(K, 10) : g.y2 - S) : g.y2 > p.height - Math.max(K, 10) ? p.height - Math.max(K, 10) : g.y2;
                                if (b && 0 < b.length)
                                    for (K = 0; K < b.length; K++) b[K] && b[K].labelAutoFit && (m = 0 > b[K].labelAngle ? Math.max(m, C) : 0 === b[K].labelAngle ? Math.max(m, C / 2) : m, h = 0 > b[K].labelAngle || 0 === b[K].labelAngle ? m - U : h);
                                if (c && 0 < c.length)
                                    for (K = 0; K < c.length; K++) c[K] && c[K].labelAutoFit && (m = c[K].lineCoordinates.x1, h = m - U);
                                a[f].lineCoordinates = {
                                    x1: m - O,
                                    y1: k,
                                    x2: m - O,
                                    y2: l,
                                    height: Math.abs(l - k)
                                };
                                a[f].bounds = {
                                    x1: m - (F[f] + O),
                                    y1: k,
                                    x2: m,
                                    y2: l,
                                    width: m - h,
                                    height: l - k
                                };
                                a[f].title && (a[f]._titleTextBlock.maxWidth = 0 < a[f].titleMaxWidth && a[f].titleMaxWidth < a[f].lineCoordinates.height ? a[f].titleMaxWidth : a[f].lineCoordinates.height);
                                a[f].calculateValueToPixelConversionParameters();
                                a[f].calculateBreaksSizeInValues();
                                O += F[f] + a[f].margin
                            }
                        if (d && 0 < d.length)
                            for (f = 0; f < d.length; f++) {
                                K = d[f]._labels && 0 < d[f]._labels.length ? d[f]._labels[0].textBlock.fontSize / 2 : 0;
                                h = Math.round(g.x1 -
                                    e);
                                k = c && 0 < c.length ? Math.round(c[0] ? c[0].lineCoordinates.y2 : g.y1 < Math.max(K, 10) ? Math.max(K, 10) : g.y1) : g.y1 < Math.max(K, 10) ? Math.max(K, 10) : g.y1;
                                m = Math.round(g.x2 - V - W);
                                l = b && 0 < b.length ? Math.round(b[0] ? b[0].lineCoordinates.y1 : g.y2 - S > p.height - Math.max(K, 10) ? p.height - Math.max(K, 10) : g.y2 - S) : g.y2 > p.height - Math.max(K, 10) ? p.height - Math.max(K, 10) : g.y2;
                                if (b && 0 < b.length)
                                    for (K = 0; K < b.length; K++) b[K] && b[K].labelAutoFit && (m = 0 > b[K].labelAngle ? Math.max(m, C) : 0 === b[K].labelAngle ? Math.max(m, C / 2) : m, h = 0 > b[K].labelAngle || 0 ===
                                        b[K].labelAngle ? m - V : h);
                                if (c && 0 < c.length)
                                    for (K = 0; K < c.length; K++) c[K] && c[K].labelAutoFit && (m = c[K].lineCoordinates.x2, h = m - V);
                                d[f].lineCoordinates = {
                                    x1: m + Q,
                                    y1: k,
                                    x2: m + Q,
                                    y2: l,
                                    height: Math.abs(l - k)
                                };
                                d[f].bounds = {
                                    x1: h,
                                    y1: k,
                                    x2: m + y[f] + Q,
                                    y2: l,
                                    width: m - h,
                                    height: l - k
                                };
                                d[f].title && (d[f]._titleTextBlock.maxWidth = 0 < d[f].titleMaxWidth && d[f].titleMaxWidth < d[f].lineCoordinates.height ? d[f].titleMaxWidth : d[f].lineCoordinates.height);
                                d[f].calculateValueToPixelConversionParameters();
                                d[f].calculateBreaksSizeInValues();
                                Q += y[f] +
                                    d[f].margin
                            }
                        for (f = 0; f < n.length; f++) "axisY" === n[f].type && (n[f].calculateValueToPixelConversionParameters(), n[f].calculateBreaksSizeInValues());
                        if (0 < w) {
                            if (a && 0 < a.length)
                                for (f = 0; f < a.length; f++) r = M[w - 1][f] === M[w][f] ? !0 : !1;
                            else r = !0;
                            if (d && 0 < d.length)
                                for (f = 0; f < d.length; f++) H = N[w - 1][f] === N[w][f] ? !0 : !1;
                            else H = !0;
                            if (b && 0 < b.length)
                                for (f = 0; f < b.length; f++) I = E[w - 1][f] === E[w][f] ? !0 : !1;
                            else I = !0;
                            if (c && 0 < c.length)
                                for (f = 0; f < c.length; f++) L = s[w - 1][f] === s[w][f] ? !0 : !1;
                            else L = !0
                        }
                        if (r && H && I && L) break;
                        w++
                    }
                    if (b && 0 < b.length)
                        for (f =
                            0; f < b.length; f++) b[f].calculateStripLinesThicknessInValues(), b[f].calculateBreaksInPixels();
                    if (c && 0 < c.length)
                        for (f = 0; f < c.length; f++) c[f].calculateStripLinesThicknessInValues(), c[f].calculateBreaksInPixels();
                    if (a && 0 < a.length)
                        for (f = 0; f < a.length; f++) a[f].calculateStripLinesThicknessInValues(), a[f].calculateBreaksInPixels();
                    if (d && 0 < d.length)
                        for (f = 0; f < d.length; f++) d[f].calculateStripLinesThicknessInValues(), d[f].calculateBreaksInPixels()
                }
        };
        y.render = function(a, d, b, c, e) {
            var g = a[0] ? a[0].chart : d[0].chart;
            e = g.ctx;
            var h = g._axes;
            g.alignVerticalAxes && g.alignVerticalAxes();
            e.save();
            e.beginPath();
            a[0] && e.rect(5, a[0].bounds.y1, a[0].chart.width - 10, a[0].bounds.height);
            d[0] && e.rect(5, d[d.length - 1].bounds.y1, d[0].chart.width - 10, d[0].bounds.height);
            e.clip();
            if (a && 0 < a.length)
                for (var k = 0; k < a.length; k++) a[k].renderLabelsTicksAndTitle();
            if (d && 0 < d.length)
                for (k = 0; k < d.length; k++) d[k].renderLabelsTicksAndTitle();
            e.restore();
            if (b && 0 < b.length)
                for (k = 0; k < b.length; k++) b[k].renderLabelsTicksAndTitle();
            if (c && 0 < c.length)
                for (k =
                    0; k < c.length; k++) c[k].renderLabelsTicksAndTitle();
            g.preparePlotArea();
            g = g.plotArea;
            e.save();
            e.beginPath();
            e.rect(g.x1, g.y1, Math.abs(g.x2 - g.x1), Math.abs(g.y2 - g.y1));
            e.clip();
            if (a && 0 < a.length)
                for (k = 0; k < h.length; k++) h[k].renderStripLinesOfThicknessType("value");
            if (d && 0 < d.length)
                for (k = 0; k < d.length; k++) d[k].renderStripLinesOfThicknessType("value");
            if (b && 0 < b.length)
                for (k = 0; k < b.length; k++) b[k].renderStripLinesOfThicknessType("value");
            if (c && 0 < c.length)
                for (k = 0; k < c.length; k++) c[k].renderStripLinesOfThicknessType("value");
            if (a && 0 < a.length)
                for (k = 0; k < a.length; k++) a[k].renderInterlacedColors();
            if (d && 0 < d.length)
                for (k = 0; k < d.length; k++) d[k].renderInterlacedColors();
            if (b && 0 < b.length)
                for (k = 0; k < b.length; k++) b[k].renderInterlacedColors();
            if (c && 0 < c.length)
                for (k = 0; k < c.length; k++) c[k].renderInterlacedColors();
            e.restore();
            if (a && 0 < a.length)
                for (k = 0; k < a.length; k++) a[k].renderGrid(), r && (a[k].createMask(), a[k].renderBreaksBackground());
            if (d && 0 < d.length)
                for (k = 0; k < d.length; k++) d[k].renderGrid(), r && (d[k].createMask(), d[k].renderBreaksBackground());
            if (b && 0 < b.length)
                for (k = 0; k < b.length; k++) b[k].renderGrid(), r && (b[k].createMask(), b[k].renderBreaksBackground());
            if (c && 0 < c.length)
                for (k = 0; k < c.length; k++) c[k].renderGrid(), r && (c[k].createMask(), c[k].renderBreaksBackground());
            if (a && 0 < a.length)
                for (k = 0; k < a.length; k++) a[k].renderAxisLine();
            if (d && 0 < d.length)
                for (k = 0; k < d.length; k++) d[k].renderAxisLine();
            if (b && 0 < b.length)
                for (k = 0; k < b.length; k++) b[k].renderAxisLine();
            if (c && 0 < c.length)
                for (k = 0; k < c.length; k++) c[k].renderAxisLine();
            if (a && 0 < a.length)
                for (k = 0; k < a.length; k++) a[k].renderStripLinesOfThicknessType("pixel");
            if (d && 0 < d.length)
                for (k = 0; k < d.length; k++) d[k].renderStripLinesOfThicknessType("pixel");
            if (b && 0 < b.length)
                for (k = 0; k < b.length; k++) b[k].renderStripLinesOfThicknessType("pixel");
            if (c && 0 < c.length)
                for (k = 0; k < c.length; k++) c[k].renderStripLinesOfThicknessType("pixel")
        };
        y.prototype.calculateStripLinesThicknessInValues = function() {
            for (var a = 0; a < this.stripLines.length; a++)
                if (null !== this.stripLines[a].startValue && null !== this.stripLines[a].endValue) {
                    var d = Math.min(this.stripLines[a].startValue, this.stripLines[a].endValue),
                        b = Math.max(this.stripLines[a].startValue, this.stripLines[a].endValue),
                        d = this.getApparentDifference(d, b);
                    this.stripLines[a].value = this.logarithmic ? this.stripLines[a].value * Math.sqrt(Math.log(this.stripLines[a].endValue / this.stripLines[a].startValue) / Math.log(d)) : this.stripLines[a].value + (Math.abs(this.stripLines[a].endValue - this.stripLines[a].startValue) - d) / 2;
                    this.stripLines[a].thickness = d;
                    this.stripLines[a]._thicknessType = "value"
                }
        };
        y.prototype.calculateBreaksSizeInValues = function() {
            for (var a = "left" ===
                    this._position || "right" === this._position ? this.lineCoordinates.height || this.chart.height : this.lineCoordinates.width || this.chart.width, d = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [], b = this.conversionParameters.pixelPerUnit || a / (this.logarithmic ? this.conversionParameters.maximum / this.conversionParameters.minimum : this.conversionParameters.maximum - this.conversionParameters.minimum), c = this.scaleBreaks && !v(this.scaleBreaks.options.spacing), e, g = 0; g < d.length; g++) e = c || !v(d[g].options.spacing), d[g].spacing =
                I(d[g].spacing, a, 8, e ? 0.1 * a : 8, e ? 0 : 3) << 0, d[g].size = 0 > d[g].spacing ? 0 : Math.abs(d[g].spacing / b), this.logarithmic && (d[g].size = Math.pow(this.logarithmBase, d[g].size))
        };
        y.prototype.calculateBreaksInPixels = function() {
            if (!(this.scaleBreaks && 0 >= this.scaleBreaks._appliedBreaks.length)) {
                var a = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [];
                a.length && (this.scaleBreaks.firstBreakIndex = this.scaleBreaks.lastBreakIndex = null);
                for (var d = 0; d < a.length && !(a[d].startValue > this.conversionParameters.maximum); d++) a[d].endValue <
                    this.conversionParameters.minimum || (v(this.scaleBreaks.firstBreakIndex) && (this.scaleBreaks.firstBreakIndex = d), a[d].startValue >= this.conversionParameters.minimum && (a[d].startPixel = this.convertValueToPixel(a[d].startValue), this.scaleBreaks.lastBreakIndex = d), a[d].endValue <= this.conversionParameters.maximum && (a[d].endPixel = this.convertValueToPixel(a[d].endValue)))
            }
        };
        y.prototype.renderLabelsTicksAndTitle = function() {
            var a = this,
                d = !1,
                b = 0,
                c = 0,
                e = 1,
                g = 0;
            0 !== this.labelAngle && 360 !== this.labelAngle && (e = 1.2);
            if ("undefined" ===
                typeof this.options.interval) {
                if ("bottom" === this._position || "top" === this._position)
                    if (this.logarithmic && !this.equidistantInterval && this.labelAutoFit) {
                        for (var b = [], e = 0 !== this.labelAngle && 360 !== this.labelAngle ? 1 : 1.2, h, k = this.viewportMaximum, m = this.lineCoordinates.width / Math.log(this.range), l = this._labels.length - 1; 0 <= l; l--) {
                            q = this._labels[l];
                            if (q.position < this.viewportMinimum) break;
                            q.position > this.viewportMaximum || !(l === this._labels.length - 1 || h < Math.log(k / q.position) * m / e) || (b.push(q), k = q.position, h =
                                q.textBlock.width * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.height * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)))
                        }
                        this._labels = b
                    } else {
                        for (l = 0; l < this._labels.length; l++) q = this._labels[l], q.position < this.viewportMinimum || (h = q.textBlock.width * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.height * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)), b += h);
                        b > this.lineCoordinates.width * e && this.labelAutoFit && (d = !0)
                    }
                if ("left" === this._position || "right" === this._position)
                    if (this.logarithmic &&
                        !this.equidistantInterval && this.labelAutoFit) {
                        for (var b = [], p, k = this.viewportMaximum, m = this.lineCoordinates.height / Math.log(this.range), l = this._labels.length - 1; 0 <= l; l--) {
                            q = this._labels[l];
                            if (q.position < this.viewportMinimum) break;
                            q.position > this.viewportMaximum || !(l === this._labels.length - 1 || p < Math.log(k / q.position) * m) || (b.push(q), k = q.position, p = q.textBlock.height * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.width * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)))
                        }
                        this._labels = b
                    } else {
                        for (l =
                            0; l < this._labels.length; l++) q = this._labels[l], q.position < this.viewportMinimum || (p = q.textBlock.height * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.width * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)), c += p);
                        c > this.lineCoordinates.height * e && this.labelAutoFit && (d = !0)
                    }
            }
            this.logarithmic && (!this.equidistantInterval && this.labelAutoFit) && this._labels.sort(function(a, b) {
                return a.position - b.position
            });
            var l = 0,
                q, n;
            if ("bottom" === this._position) {
                for (l = 0; l < this._labels.length; l++) q = this._labels[l],
                    q.position < this.viewportMinimum || (q.position > this.viewportMaximum || d && 0 !== g++ % 2 && this.labelAutoFit) || (n = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.labelPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, c = 1 === this.ctx.lineWidth % 2 ? (n.x << 0) + 0.5 : n.x << 0, this.ctx.beginPath(), this.ctx.moveTo(c, n.y << 0), this.ctx.lineTo(c, n.y + this.tickLength << 0), this.ctx.stroke()), 0 === q.textBlock.angle ? (n.x -= q.textBlock.width / 2, n.y = "inside" === this.labelPlacement ?
                        n.y - (this.tickLength + q.textBlock.fontSize / 2) : n.y + this.tickLength + q.textBlock.fontSize / 2) : (n.x = "inside" === this.labelPlacement ? 0 > this.labelAngle ? n.x : n.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : n.x - (0 > this.labelAngle ? q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0), n.y = "inside" === this.labelPlacement ? 0 > this.labelAngle ? n.y - this.tickLength - 5 : n.y - this.tickLength - Math.abs(q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5) : n.y + this.tickLength + Math.abs(0 > this.labelAngle ? q.textBlock.width *
                        Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5)), q.textBlock.x = n.x, q.textBlock.y = n.y);
                "inside" === this.labelPlacement && this.chart.addEventListener("dataAnimationIterationEnd", function() {
                    for (l = 0; l < a._labels.length; l++)
                        if (q = a._labels[l], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum || d && 0 !== g++ % 2 && a.labelAutoFit) && (n = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
                            a.ctx.lineWidth = a.tickThickness;
                            a.ctx.strokeStyle = a.tickColor;
                            var b = 1 === a.ctx.lineWidth % 2 ? (n.x << 0) + 0.5 : n.x << 0;
                            a.ctx.save();
                            a.ctx.beginPath();
                            a.ctx.moveTo(b, n.y << 0);
                            a.ctx.lineTo(b, n.y - a.tickLength << 0);
                            a.ctx.stroke();
                            a.ctx.restore()
                        }
                }, this);
                this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2, this._titleTextBlock.y = this.bounds.y2 - this._titleTextBlock.height - 3, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0))
            } else if ("top" === this._position) {
                for (l = 0; l < this._labels.length; l++) q = this._labels[l],
                    q.position < this.viewportMinimum || (q.position > this.viewportMaximum || d && 0 !== g++ % 2 && this.labelAutoFit) || (n = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.labelPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, c = 1 === this.ctx.lineWidth % 2 ? (n.x << 0) + 0.5 : n.x << 0, this.ctx.beginPath(), this.ctx.moveTo(c, n.y << 0), this.ctx.lineTo(c, n.y - this.tickLength << 0), this.ctx.stroke()), 0 === q.textBlock.angle ? (n.x -= q.textBlock.width / 2, n.y = "inside" === this.labelPlacement ?
                        n.y + this.labelFontSize / 2 + this.tickLength + 5 : n.y - (this.tickLength + q.textBlock.height - q.textBlock.fontSize / 2)) : (n.x = "inside" === this.labelPlacement ? 0 < this.labelAngle ? n.x : n.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : n.x + (q.textBlock.height - this.tickLength - this.labelFontSize) * Math.sin(Math.PI / 180 * this.labelAngle) - (0 < this.labelAngle ? q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0), n.y = "inside" === this.labelPlacement ? 0 < this.labelAngle ? n.y + this.tickLength + 5 : n.y - q.textBlock.width * Math.sin(Math.PI /
                        180 * this.labelAngle) + this.tickLength + 5 : n.y - (this.tickLength + ((q.textBlock.height - q.textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * this.labelAngle) + (0 < this.labelAngle ? q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0)))), q.textBlock.x = n.x, q.textBlock.y = n.y);
                "inside" === this.labelPlacement && this.chart.addEventListener("dataAnimationIterationEnd", function() {
                    for (l = 0; l < a._labels.length; l++)
                        if (q = a._labels[l], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum || d && 0 !== g++ % 2 && a.labelAutoFit) &&
                            (n = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
                            a.ctx.lineWidth = a.tickThickness;
                            a.ctx.strokeStyle = a.tickColor;
                            var b = 1 === this.ctx.lineWidth % 2 ? (n.x << 0) + 0.5 : n.x << 0;
                            a.ctx.save();
                            a.ctx.beginPath();
                            a.ctx.moveTo(b, n.y << 0);
                            a.ctx.lineTo(b, n.y + a.tickLength << 0);
                            a.ctx.stroke();
                            a.ctx.restore()
                        }
                }, this);
                this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2, this._titleTextBlock.y = this.bounds.y1 + 1, this.titleMaxWidth =
                    this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0))
            } else if ("left" === this._position) {
                for (l = 0; l < this._labels.length; l++) q = this._labels[l], q.position < this.viewportMinimum || (q.position > this.viewportMaximum || d && 0 !== g++ % 2 && this.labelAutoFit) || (n = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.labelPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, c = 1 === this.ctx.lineWidth % 2 ? (n.y << 0) + 0.5 : n.y << 0, this.ctx.beginPath(), this.ctx.moveTo(n.x <<
                    0, c), this.ctx.lineTo(n.x - this.tickLength << 0, c), this.ctx.stroke()), 0 === this.labelAngle ? (q.textBlock.y = n.y, q.textBlock.x = "inside" === this.labelPlacement ? n.x + this.tickLength + 5 : n.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5) : (q.textBlock.y = "inside" === this.labelPlacement ? n.y : n.y - q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle), q.textBlock.x = "inside" === this.labelPlacement ? n.x + this.tickLength + 5 : 0 < this.labelAngle ? n.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) -
                    this.tickLength - 5 : n.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + (q.textBlock.height - q.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) - this.tickLength));
                "inside" === this.labelPlacement && this.chart.addEventListener("dataAnimationIterationEnd", function() {
                    for (l = 0; l < a._labels.length; l++)
                        if (q = a._labels[l], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum || d && 0 !== g++ % 2 && a.labelAutoFit) && (n = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
                            a.ctx.lineWidth = a.tickThickness;
                            a.ctx.strokeStyle = a.tickColor;
                            var b = 1 === a.ctx.lineWidth % 2 ? (n.y << 0) + 0.5 : n.y << 0;
                            a.ctx.save();
                            a.ctx.beginPath();
                            a.ctx.moveTo(n.x << 0, b);
                            a.ctx.lineTo(n.x + a.tickLength << 0, b);
                            a.ctx.stroke();
                            a.ctx.restore()
                        }
                }, this);
                this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.bounds.x1 + 1, this._titleTextBlock.y = this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0))
            } else if ("right" ===
                this._position) {
                for (l = 0; l < this._labels.length; l++) q = this._labels[l], q.position < this.viewportMinimum || (q.position > this.viewportMaximum || d && 0 !== g++ % 2 && this.labelAutoFit) || (n = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.labelPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, c = 1 === this.ctx.lineWidth % 2 ? (n.y << 0) + 0.5 : n.y << 0, this.ctx.beginPath(), this.ctx.moveTo(n.x << 0, c), this.ctx.lineTo(n.x + this.tickLength << 0, c), this.ctx.stroke()), 0 === this.labelAngle ?
                    (q.textBlock.y = n.y, q.textBlock.x = "inside" === this.labelPlacement ? n.x - q.textBlock.width - this.tickLength - 5 : n.x + this.tickLength + 5) : (q.textBlock.y = "inside" === this.labelPlacement ? n.y - q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0 > this.labelAngle ? n.y : n.y - (q.textBlock.height - q.textBlock.fontSize / 2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle), q.textBlock.x = "inside" === this.labelPlacement ? n.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5 : 0 < this.labelAngle ? n.x + (q.textBlock.height -
                        q.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) + this.tickLength : n.x + this.tickLength + 5));
                "inside" === this.labelPlacement && this.chart.addEventListener("dataAnimationIterationEnd", function() {
                    for (l = 0; l < a._labels.length; l++)
                        if (q = a._labels[l], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum || d && 0 !== g++ % 2 && a.labelAutoFit) && (n = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
                            a.ctx.lineWidth = a.tickThickness;
                            a.ctx.strokeStyle = a.tickColor;
                            var b = 1 === a.ctx.lineWidth % 2 ? (n.y <<
                                0) + 0.5 : n.y << 0;
                            a.ctx.save();
                            a.ctx.beginPath();
                            a.ctx.moveTo(n.x << 0, b);
                            a.ctx.lineTo(n.x - a.tickLength << 0, b);
                            a.ctx.stroke();
                            a.ctx.restore()
                        }
                }, this);
                this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.bounds.x2 - 1, this._titleTextBlock.y = this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0))
            }
            g = 0;
            if ("inside" === this.labelPlacement) this.chart.addEventListener("dataAnimationIterationEnd",
                function() {
                    for (l = 0; l < a._labels.length; l++) q = a._labels[l], q.position < a.viewportMinimum || (q.position > a.viewportMaximum || d && 0 !== g++ % 2 && a.labelAutoFit) || (a.ctx.save(), a.ctx.beginPath(), q.textBlock.render(!0), a.ctx.restore())
                }, this);
            else
                for (l = 0; l < this._labels.length; l++) q = this._labels[l], q.position < this.viewportMinimum || (q.position > this.viewportMaximum || d && 0 !== g++ % 2 && this.labelAutoFit) || q.textBlock.render(!0)
        };
        y.prototype.renderInterlacedColors = function() {
            var a = this.chart.plotArea.ctx,
                d, b, c = this.chart.plotArea,
                e = 0;
            d = !0;
            if (("bottom" === this._position || "top" === this._position) && this.interlacedColor)
                for (a.fillStyle = this.interlacedColor, e = 0; e < this._labels.length; e++) d ? (d = this.getPixelCoordinatesOnAxis(this._labels[e].position), b = e + 1 > this._labels.length - 1 ? this.getPixelCoordinatesOnAxis(this.viewportMaximum) : this.getPixelCoordinatesOnAxis(this._labels[e + 1].position), a.fillRect(Math.min(b.x, d.x), c.y1, Math.abs(b.x - d.x), Math.abs(c.y1 - c.y2)), d = !1) : d = !0;
            else if (("left" === this._position || "right" === this._position) && this.interlacedColor)
                for (a.fillStyle =
                    this.interlacedColor, e = 0; e < this._labels.length; e++) d ? (b = this.getPixelCoordinatesOnAxis(this._labels[e].position), d = e + 1 > this._labels.length - 1 ? this.getPixelCoordinatesOnAxis(this.viewportMaximum) : this.getPixelCoordinatesOnAxis(this._labels[e + 1].position), a.fillRect(c.x1, Math.min(b.y, d.y), Math.abs(c.x1 - c.x2), Math.abs(d.y - b.y)), d = !1) : d = !0;
            a.beginPath()
        };
        y.prototype.renderStripLinesOfThicknessType = function(a) {
            if (this.stripLines && 0 < this.stripLines.length && a) {
                for (var d = this, b, c = 0, e = 0, g = !1, h = !1, k = [], m = [],
                        h = !1, c = 0; c < this.stripLines.length; c++) {
                    var l = this.stripLines[c];
                    l._thicknessType === a && ("pixel" === a && (l.value < this.viewportMinimum || l.value > this.viewportMaximum || v(l.value) || isNaN(this.range)) || k.push(l))
                }
                for (c = 0; c < this._stripLineLabels.length; c++)
                    if (l = this.stripLines[c], b = this._stripLineLabels[c], !(b.position < this.viewportMinimum || b.position > this.viewportMaximum || isNaN(this.range))) {
                        a = this.getPixelCoordinatesOnAxis(b.position);
                        if ("outside" === b.stripLine.labelPlacement)
                            if (l && (this.ctx.strokeStyle =
                                    l.color, "pixel" === l._thicknessType && (this.ctx.lineWidth = l.thickness)), "bottom" === this._position) {
                                var p = 1 === this.ctx.lineWidth % 2 ? (a.x << 0) + 0.5 : a.x << 0;
                                this.ctx.beginPath();
                                this.ctx.moveTo(p, a.y << 0);
                                this.ctx.lineTo(p, a.y + this.tickLength << 0);
                                this.ctx.stroke();
                                0 === this.labelAngle ? (a.x -= b.textBlock.width / 2, a.y += this.tickLength + b.textBlock.fontSize / 2) : (a.x -= 0 > this.labelAngle ? b.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0, a.y += this.tickLength + Math.abs(0 > this.labelAngle ? b.textBlock.width * Math.sin(Math.PI /
                                    180 * this.labelAngle) - 5 : 5))
                            } else "top" === this._position ? (p = 1 === this.ctx.lineWidth % 2 ? (a.x << 0) + 0.5 : a.x << 0, this.ctx.beginPath(), this.ctx.moveTo(p, a.y << 0), this.ctx.lineTo(p, a.y - this.tickLength << 0), this.ctx.stroke(), 0 === this.labelAngle ? (a.x -= b.textBlock.width / 2, a.y -= this.tickLength + b.textBlock.height) : (a.x += (b.textBlock.height - this.tickLength - this.labelFontSize / 2) * Math.sin(Math.PI / 180 * this.labelAngle) - (0 < this.labelAngle ? b.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0), a.y -= this.tickLength + (b.textBlock.height *
                                Math.cos(Math.PI / 180 * this.labelAngle) + (0 < this.labelAngle ? b.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0)))) : "left" === this._position ? (p = 1 === this.ctx.lineWidth % 2 ? (a.y << 0) + 0.5 : a.y << 0, this.ctx.beginPath(), this.ctx.moveTo(a.x << 0, p), this.ctx.lineTo(a.x - this.tickLength << 0, p), this.ctx.stroke(), 0 === this.labelAngle ? a.x = a.x - b.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5 : (a.y -= b.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle), a.x = 0 < this.labelAngle ? a.x - b.textBlock.width *
                                Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5 : a.x - b.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + (b.textBlock.height - b.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) - this.tickLength)) : "right" === this._position && (p = 1 === this.ctx.lineWidth % 2 ? (a.y << 0) + 0.5 : a.y << 0, this.ctx.beginPath(), this.ctx.moveTo(a.x << 0, p), this.ctx.lineTo(a.x + this.tickLength << 0, p), this.ctx.stroke(), 0 === this.labelAngle ? a.x = a.x + this.tickLength + 5 : (a.y = 0 > this.labelAngle ? a.y : a.y - (b.textBlock.height - b.textBlock.fontSize /
                                2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle), a.x = 0 < this.labelAngle ? a.x + (b.textBlock.height - b.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) + this.tickLength : a.x + this.tickLength + 5));
                        else b.textBlock.angle = -90, "bottom" === this._position ? (b.textBlock.maxWidth = this.options.stripLines[c].labelMaxWidth ? this.options.stripLines[c].labelMaxWidth : this.chart.plotArea.height - 3, b.textBlock.measureText(), a.x - b.textBlock.height > this.chart.plotArea.x1 ? v(l.startValue) ? a.x -= b.textBlock.height - b.textBlock.fontSize /
                            2 : a.x -= b.textBlock.height / 2 - b.textBlock.fontSize / 2 + 3 : (b.textBlock.angle = 90, v(l.startValue) ? a.x += b.textBlock.height - b.textBlock.fontSize / 2 : a.x += b.textBlock.height / 2 - b.textBlock.fontSize / 2 + 3), a.y = -90 === b.textBlock.angle ? "near" === b.stripLine.labelAlign ? this.chart.plotArea.y2 - 3 : "center" === b.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 + b.textBlock.width) / 2 : this.chart.plotArea.y1 + b.textBlock.width + 3 : "near" === b.stripLine.labelAlign ? this.chart.plotArea.y2 - b.textBlock.width - 3 : "center" ===
                            b.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 - b.textBlock.width) / 2 : this.chart.plotArea.y1 + 3) : "top" === this._position ? (b.textBlock.maxWidth = this.options.stripLines[c].labelMaxWidth ? this.options.stripLines[c].labelMaxWidth : this.chart.plotArea.height - 3, b.textBlock.measureText(), a.x - b.textBlock.height > this.chart.plotArea.x1 ? v(l.startValue) ? a.x -= b.textBlock.height - b.textBlock.fontSize / 2 : a.x -= b.textBlock.height / 2 - b.textBlock.fontSize / 2 + 3 : (b.textBlock.angle = 90, v(l.startValue) ? a.x +=
                                b.textBlock.height - b.textBlock.fontSize / 2 : a.x += b.textBlock.height / 2 - b.textBlock.fontSize / 2 + 3), a.y = -90 === b.textBlock.angle ? "near" === b.stripLine.labelAlign ? this.chart.plotArea.y1 + b.textBlock.width + 3 : "center" === b.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 + b.textBlock.width) / 2 : this.chart.plotArea.y2 - 3 : "near" === b.stripLine.labelAlign ? this.chart.plotArea.y1 + 3 : "center" === b.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 - b.textBlock.width) / 2 : this.chart.plotArea.y2 -
                            b.textBlock.width - 3) : "left" === this._position ? (b.textBlock.maxWidth = this.options.stripLines[c].labelMaxWidth ? this.options.stripLines[c].labelMaxWidth : this.chart.plotArea.width - 3, b.textBlock.angle = 0, b.textBlock.measureText(), a.y - b.textBlock.height > this.chart.plotArea.y1 ? v(l.startValue) ? a.y -= b.textBlock.height - b.textBlock.fontSize / 2 : a.y -= b.textBlock.height / 2 - b.textBlock.fontSize + 3 : a.y - b.textBlock.height < this.chart.plotArea.y2 ? a.y += b.textBlock.fontSize / 2 + 3 : v(l.startValue) ? a.y -= b.textBlock.height - b.textBlock.fontSize /
                            2 : a.y -= b.textBlock.height / 2 - b.textBlock.fontSize + 3, a.x = "near" === b.stripLine.labelAlign ? this.chart.plotArea.x1 + 3 : "center" === b.stripLine.labelAlign ? (this.chart.plotArea.x2 + this.chart.plotArea.x1) / 2 - b.textBlock.width / 2 : this.chart.plotArea.x2 - b.textBlock.width - 3) : "right" === this._position && (b.textBlock.maxWidth = this.options.stripLines[c].labelMaxWidth ? this.options.stripLines[c].labelMaxWidth : this.chart.plotArea.width - 3, b.textBlock.angle = 0, b.textBlock.measureText(), a.y - +b.textBlock.height > this.chart.plotArea.y1 ?
                            v(l.startValue) ? a.y -= b.textBlock.height - b.textBlock.fontSize / 2 : a.y -= b.textBlock.height / 2 - b.textBlock.fontSize / 2 - 3 : a.y - b.textBlock.height < this.chart.plotArea.y2 ? a.y += b.textBlock.fontSize / 2 + 3 : v(l.startValue) ? a.y -= b.textBlock.height - b.textBlock.fontSize / 2 : a.y -= b.textBlock.height / 2 - b.textBlock.fontSize / 2 + 3, a.x = "near" === b.stripLine.labelAlign ? this.chart.plotArea.x2 - b.textBlock.width - 3 : "center" === b.stripLine.labelAlign ? (this.chart.plotArea.x2 + this.chart.plotArea.x1) / 2 - b.textBlock.width / 2 : this.chart.plotArea.x1 +
                            3);
                        b.textBlock.x = a.x;
                        b.textBlock.y = a.y;
                        m.push(b)
                    }
                if (!h) {
                    h = !1;
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
                    this.ctx.clip();
                    for (c = 0; c < k.length; c++) l = k[c], l.showOnTop ? g || (g = !0, this.chart.addEventListener("dataAnimationIterationEnd", function() {
                        this.ctx.save();
                        this.ctx.beginPath();
                        this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
                        this.ctx.clip();
                        for (e = 0; e < k.length; e++) l = k[e], l.showOnTop && l.render();
                        this.ctx.restore()
                    }, l)) : l.render();
                    for (c = 0; c < m.length; c++) b = m[c], b.stripLine.showOnTop ? h || (h = !0, this.chart.addEventListener("dataAnimationIterationEnd", function() {
                            for (e = 0; e < m.length; e++) b = m[e], "inside" === b.stripLine.labelPlacement && b.stripLine.showOnTop && (d.ctx.save(), d.ctx.beginPath(), d.ctx.rect(d.chart.plotArea.x1, d.chart.plotArea.y1, d.chart.plotArea.width, d.chart.plotArea.height), d.ctx.clip(), b.textBlock.render(!0), d.ctx.restore())
                        }, b.textBlock)) :
                        "inside" === b.stripLine.labelPlacement && b.textBlock.render(!0);
                    this.ctx.restore();
                    h = !0
                }
                if (h)
                    for (h = !1, c = 0; c < m.length; c++) b = m[c], b.stripLine.showOnTop ? h || (h = !0, this.chart.addEventListener("dataAnimationIterationEnd", function() {
                        for (e = 0; e < m.length; e++) b = m[e], "outside" === b.stripLine.labelPlacement && b.stripLine.showOnTop && b.textBlock.render(!0)
                    }, b.textBlock)) : "outside" === b.stripLine.labelPlacement && b.textBlock.render(!0)
            }
        };
        y.prototype.renderBreaksBackground = function() {
            this.chart._breaksCanvas && (this.scaleBreaks &&
                0 < this.scaleBreaks._appliedBreaks.length && this.maskCanvas) && (this.chart._breaksCanvasCtx.save(), this.chart._breaksCanvasCtx.beginPath(), this.chart._breaksCanvasCtx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height), this.chart._breaksCanvasCtx.clip(), this.chart._breaksCanvasCtx.drawImage(this.maskCanvas, 0, 0, this.chart.width, this.chart.height), this.chart._breaksCanvasCtx.restore())
        };
        y.prototype.createMask = function() {
            if (this.scaleBreaks && 0 < this.scaleBreaks._appliedBreaks.length) {
                var a =
                    this.scaleBreaks._appliedBreaks;
                r ? (this.maskCanvas = ta(this.chart.width, this.chart.height), this.maskCtx = this.maskCanvas.getContext("2d")) : (this.maskCanvas = this.chart.plotArea.canvas, this.maskCtx = this.chart.plotArea.ctx);
                this.maskCtx.save();
                this.maskCtx.beginPath();
                this.maskCtx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
                this.maskCtx.clip();
                for (var d = 0; d < a.length; d++) a[d].endValue < this.viewportMinimum || (a[d].startValue > this.viewportMaximum ||
                    isNaN(this.range)) || a[d].render(this.maskCtx);
                this.maskCtx.restore()
            }
        };
        y.prototype.renderCrosshair = function(a, d) {
            this.crosshair.render(a, d)
        };
        y.prototype.renderGrid = function() {
            if (this.gridThickness && 0 < this.gridThickness) {
                var a = this.chart.ctx;
                a.save();
                var d, b = this.chart.plotArea;
                a.lineWidth = this.gridThickness;
                a.strokeStyle = this.gridColor;
                a.setLineDash && a.setLineDash(R(this.gridDashType, this.gridThickness));
                if ("bottom" === this._position || "top" === this._position)
                    for (c = 0; c < this._labels.length; c++) this._labels[c].position <
                        this.viewportMinimum || (this._labels[c].position > this.viewportMaximum || this._labels[c].breaksLabelType) || (a.beginPath(), d = this.getPixelCoordinatesOnAxis(this._labels[c].position), d = 1 === a.lineWidth % 2 ? (d.x << 0) + 0.5 : d.x << 0, a.moveTo(d, b.y1 << 0), a.lineTo(d, b.y2 << 0), a.stroke());
                else if ("left" === this._position || "right" === this._position)
                    for (var c = 0; c < this._labels.length; c++) this._labels[c].position < this.viewportMinimum || (this._labels[c].position > this.viewportMaximum || this._labels[c].breaksLabelType) || (a.beginPath(),
                        d = this.getPixelCoordinatesOnAxis(this._labels[c].position), d = 1 === a.lineWidth % 2 ? (d.y << 0) + 0.5 : d.y << 0, a.moveTo(b.x1 << 0, d), a.lineTo(b.x2 << 0, d), a.stroke());
                a.restore()
            }
        };
        y.prototype.renderAxisLine = function() {
            var a = this.chart.ctx,
                d = r ? this.chart._preRenderCtx : a,
                b = Math.ceil(this.tickThickness / (this.reversed ? -2 : 2)),
                c = Math.ceil(this.tickThickness / (this.reversed ? 2 : -2)),
                e, g;
            d.save();
            if ("bottom" === this._position || "top" === this._position) {
                if (this.lineThickness) {
                    this.reversed ? (e = this.lineCoordinates.x2, g = this.lineCoordinates.x1) :
                        (e = this.lineCoordinates.x1, g = this.lineCoordinates.x2);
                    d.lineWidth = this.lineThickness;
                    d.strokeStyle = this.lineColor ? this.lineColor : "black";
                    d.setLineDash && d.setLineDash(R(this.lineDashType, this.lineThickness));
                    var h = 1 === this.lineThickness % 2 ? (this.lineCoordinates.y1 << 0) + 0.5 : this.lineCoordinates.y1 << 0;
                    d.beginPath();
                    if (this.scaleBreaks && !v(this.scaleBreaks.firstBreakIndex))
                        if (v(this.scaleBreaks.lastBreakIndex)) e = this.scaleBreaks._appliedBreaks[this.scaleBreaks.firstBreakIndex].endPixel + c;
                        else
                            for (var k =
                                    this.scaleBreaks.firstBreakIndex; k <= this.scaleBreaks.lastBreakIndex; k++) d.moveTo(e, h), d.lineTo(this.scaleBreaks._appliedBreaks[k].startPixel + b, h), e = this.scaleBreaks._appliedBreaks[k].endPixel + c;
                    e && (d.moveTo(e, h), d.lineTo(g, h));
                    d.stroke()
                }
            } else if (("left" === this._position || "right" === this._position) && this.lineThickness) {
                this.reversed ? (e = this.lineCoordinates.y1, g = this.lineCoordinates.y2) : (e = this.lineCoordinates.y2, g = this.lineCoordinates.y1);
                d.lineWidth = this.lineThickness;
                d.strokeStyle = this.lineColor;
                d.setLineDash && d.setLineDash(R(this.lineDashType, this.lineThickness));
                h = 1 === this.lineThickness % 2 ? (this.lineCoordinates.x1 << 0) + 0.5 : this.lineCoordinates.x1 << 0;
                d.beginPath();
                if (this.scaleBreaks && !v(this.scaleBreaks.firstBreakIndex))
                    if (v(this.scaleBreaks.lastBreakIndex)) e = this.scaleBreaks._appliedBreaks[this.scaleBreaks.firstBreakIndex].endPixel + b;
                    else
                        for (k = this.scaleBreaks.firstBreakIndex; k <= this.scaleBreaks.lastBreakIndex; k++) d.moveTo(h, e), d.lineTo(h, this.scaleBreaks._appliedBreaks[k].startPixel + c),
                            e = this.scaleBreaks._appliedBreaks[k].endPixel + b;
                e && (d.moveTo(h, e), d.lineTo(h, g));
                d.stroke()
            }
            r && (a.drawImage(this.chart._preRenderCanvas, 0, 0, this.chart.width, this.chart.height), this.chart._breaksCanvasCtx && this.chart._breaksCanvasCtx.drawImage(this.chart._preRenderCanvas, 0, 0, this.chart.width, this.chart.height), d.clearRect(0, 0, this.chart.width, this.chart.height));
            d.restore()
        };
        y.prototype.getPixelCoordinatesOnAxis = function(a) {
            var d = {};
            if ("bottom" === this._position || "top" === this._position) d.x = this.convertValueToPixel(a),
                d.y = this.lineCoordinates.y1;
            if ("left" === this._position || "right" === this._position) d.y = this.convertValueToPixel(a), d.x = this.lineCoordinates.x2;
            return d
        };
        y.prototype.convertPixelToValue = function(a) {
            if ("undefined" === typeof a) return null;
            var d = 0,
                b = 0,
                c, d = !0,
                e = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [],
                b = "number" === typeof a ? a : "left" === this._position || "right" === this._position ? a.y : a.x;
            if (this.logarithmic) {
                a = c = Math.pow(this.logarithmBase, (b - this.conversionParameters.reference) / this.conversionParameters.pixelPerUnit);
                if (b <= this.conversionParameters.reference === ("left" === this._position || "right" === this._position) !== this.reversed)
                    for (b = 0; b < e.length; b++) {
                        if (!(e[b].endValue < this.conversionParameters.minimum))
                            if (d)
                                if (e[b].startValue < this.conversionParameters.minimum) {
                                    if (1 < e[b].size && this.conversionParameters.minimum * Math.pow(e[b].endValue / e[b].startValue, Math.log(c) / Math.log(e[b].size)) < e[b].endValue) {
                                        a = Math.pow(e[b].endValue / e[b].startValue, Math.log(c) / Math.log(e[b].size));
                                        break
                                    } else a *= e[b].endValue / this.conversionParameters.minimum /
                                        Math.pow(e[b].size, Math.log(e[b].endValue / this.conversionParameters.minimum) / Math.log(e[b].endValue / e[b].startValue)), c /= Math.pow(e[b].size, Math.log(e[b].endValue / this.conversionParameters.minimum) / Math.log(e[b].endValue / e[b].startValue));
                                    d = !1
                                } else if (c > e[b].startValue / this.conversionParameters.minimum) {
                            c /= e[b].startValue / this.conversionParameters.minimum;
                            if (c < e[b].size) {
                                a *= Math.pow(e[b].endValue / e[b].startValue, 1 === e[b].size ? 1 : Math.log(c) / Math.log(e[b].size)) / c;
                                break
                            } else a *= e[b].endValue / e[b].startValue /
                                e[b].size;
                            c /= e[b].size;
                            d = !1
                        } else break;
                        else if (c > e[b].startValue / e[b - 1].endValue) {
                            c /= e[b].startValue / e[b - 1].endValue;
                            if (c < e[b].size) {
                                a *= Math.pow(e[b].endValue / e[b].startValue, 1 === e[b].size ? 1 : Math.log(c) / Math.log(e[b].size)) / c;
                                break
                            } else a *= e[b].endValue / e[b].startValue / e[b].size;
                            c /= e[b].size
                        } else break
                    } else
                        for (b = e.length - 1; 0 <= b; b--)
                            if (!(e[b].startValue > this.conversionParameters.minimum))
                                if (d)
                                    if (e[b].endValue > this.conversionParameters.minimum) {
                                        if (1 < e[b].size && this.conversionParameters.minimum * Math.pow(e[b].endValue /
                                                e[b].startValue, Math.log(c) / Math.log(e[b].size)) > e[b].startValue) {
                                            a = Math.pow(e[b].endValue / e[b].startValue, Math.log(c) / Math.log(e[b].size));
                                            break
                                        } else a *= e[b].startValue / this.conversionParameters.minimum * Math.pow(e[b].size, Math.log(e[b].startValue / this.conversionParameters.minimum) / Math.log(e[b].endValue / e[b].startValue)) * c, c *= Math.pow(e[b].size, Math.log(this.conversionParameters.minimum / e[b].startValue) / Math.log(e[b].endValue / e[b].startValue));
                                        d = !1
                                    } else if (c < e[b].endValue / this.conversionParameters.minimum) {
                    c /=
                        e[b].endValue / this.conversionParameters.minimum;
                    if (c > 1 / e[b].size) {
                        a *= Math.pow(e[b].endValue / e[b].startValue, 1 >= e[b].size ? 1 : Math.log(c) / Math.log(e[b].size)) * c;
                        break
                    } else a /= e[b].endValue / e[b].startValue / e[b].size;
                    c *= e[b].size;
                    d = !1
                } else break;
                else if (c < e[b].endValue / e[b + 1].startValue) {
                    c /= e[b].endValue / e[b + 1].startValue;
                    if (c > 1 / e[b].size) {
                        a *= Math.pow(e[b].endValue / e[b].startValue, 1 >= e[b].size ? 1 : Math.log(c) / Math.log(e[b].size)) * c;
                        break
                    } else a /= e[b].endValue / e[b].startValue / e[b].size;
                    c *= e[b].size
                } else break;
                d = a * this.viewportMinimum
            } else {
                a = c = (b - this.conversionParameters.reference) / this.conversionParameters.pixelPerUnit;
                if (b <= this.conversionParameters.reference === ("left" === this._position || "right" === this._position) !== this.reversed)
                    for (b = 0; b < e.length; b++) {
                        if (!(e[b].endValue < this.conversionParameters.minimum))
                            if (d)
                                if (e[b].startValue < this.conversionParameters.minimum) {
                                    if (e[b].size && this.conversionParameters.minimum + c * (e[b].endValue - e[b].startValue) / e[b].size < e[b].endValue) {
                                        a = 0 >= e[b].size ? 0 : c * (e[b].endValue -
                                            e[b].startValue) / e[b].size;
                                        break
                                    } else a += e[b].endValue - this.conversionParameters.minimum - e[b].size * (e[b].endValue - this.conversionParameters.minimum) / (e[b].endValue - e[b].startValue), c -= e[b].size * (e[b].endValue - this.conversionParameters.minimum) / (e[b].endValue - e[b].startValue);
                                    d = !1
                                } else if (c > e[b].startValue - this.conversionParameters.minimum) {
                            c -= e[b].startValue - this.conversionParameters.minimum;
                            if (c < e[b].size) {
                                a += (e[b].endValue - e[b].startValue) * (0 === e[b].size ? 1 : c / e[b].size) - c;
                                break
                            } else a += e[b].endValue -
                                e[b].startValue - e[b].size;
                            c -= e[b].size;
                            d = !1
                        } else break;
                        else if (c > e[b].startValue - e[b - 1].endValue) {
                            c -= e[b].startValue - e[b - 1].endValue;
                            if (c < e[b].size) {
                                a += (e[b].endValue - e[b].startValue) * (0 === e[b].size ? 1 : c / e[b].size) - c;
                                break
                            } else a += e[b].endValue - e[b].startValue - e[b].size;
                            c -= e[b].size
                        } else break
                    } else
                        for (b = e.length - 1; 0 <= b; b--)
                            if (!(e[b].startValue > this.conversionParameters.minimum))
                                if (d)
                                    if (e[b].endValue > this.conversionParameters.minimum)
                                        if (e[b].size && this.conversionParameters.minimum + c * (e[b].endValue -
                                                e[b].startValue) / e[b].size > e[b].startValue) {
                                            a = 0 >= e[b].size ? 0 : c * (e[b].endValue - e[b].startValue) / e[b].size;
                                            break
                                        } else a += e[b].startValue - this.conversionParameters.minimum + e[b].size * (this.conversionParameters.minimum - e[b].startValue) / (e[b].endValue - e[b].startValue), c += e[b].size * (this.conversionParameters.minimum - e[b].startValue) / (e[b].endValue - e[b].startValue), d = !1;
                else if (c < e[b].endValue - this.conversionParameters.minimum) {
                    c -= e[b].endValue - this.conversionParameters.minimum;
                    if (c > -1 * e[b].size) {
                        a += (e[b].endValue -
                            e[b].startValue) * (0 === e[b].size ? 1 : c / e[b].size) + c;
                        break
                    } else a -= e[b].endValue - e[b].startValue - e[b].size;
                    c += e[b].size;
                    d = !1
                } else break;
                else if (c < e[b].endValue - e[b + 1].startValue) {
                    c -= e[b].endValue - e[b + 1].startValue;
                    if (c > -1 * e[b].size) {
                        a += (e[b].endValue - e[b].startValue) * (0 === e[b].size ? 1 : c / e[b].size) + c;
                        break
                    } else a -= e[b].endValue - e[b].startValue - e[b].size;
                    c += e[b].size
                } else break;
                d = this.conversionParameters.minimum + a
            }
            return d
        };
        y.prototype.convertValueToPixel = function(a) {
            a = this.getApparentDifference(this.conversionParameters.minimum,
                a, a);
            return this.logarithmic ? this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * Math.log(a / this.conversionParameters.minimum) / this.conversionParameters.lnLogarithmBase + 0.5 << 0 : "axisX" === this.type ? this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * (a - this.conversionParameters.minimum) + 0.5 << 0 : this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * (a - this.conversionParameters.minimum) + 0.5
        };
        y.prototype.getApparentDifference = function(a,
            d, b, c) {
            var e = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [];
            if (this.logarithmic) {
                b = v(b) ? d / a : b;
                for (var g = 0; g < e.length && !(d < e[g].startValue); g++) a > e[g].endValue || (a <= e[g].startValue && d >= e[g].endValue ? b = b / e[g].endValue * e[g].startValue * e[g].size : a >= e[g].startValue && d >= e[g].endValue ? b = b / e[g].endValue * a * Math.pow(e[g].size, Math.log(e[g].endValue / a) / Math.log(e[g].endValue / e[g].startValue)) : a <= e[g].startValue && d <= e[g].endValue ? b = b / d * e[g].startValue * Math.pow(e[g].size, Math.log(d / e[g].startValue) / Math.log(e[g].endValue /
                    e[g].startValue)) : !c && (a > e[g].startValue && d < e[g].endValue) && (b = a * Math.pow(e[g].size, Math.log(d / a) / Math.log(e[g].endValue / e[g].startValue))))
            } else
                for (b = v(b) ? Math.abs(d - a) : b, g = 0; g < e.length && !(d < e[g].startValue); g++) a > e[g].endValue || (a <= e[g].startValue && d >= e[g].endValue ? b = b - e[g].endValue + e[g].startValue + e[g].size : a > e[g].startValue && d >= e[g].endValue ? b = b - e[g].endValue + a + e[g].size * (e[g].endValue - a) / (e[g].endValue - e[g].startValue) : a <= e[g].startValue && d < e[g].endValue ? b = b - d + e[g].startValue + e[g].size * (d - e[g].startValue) /
                    (e[g].endValue - e[g].startValue) : !c && (a > e[g].startValue && d < e[g].endValue) && (b = a + e[g].size * (d - a) / (e[g].endValue - e[g].startValue)));
            return b
        };
        y.prototype.setViewPortRange = function(a, d) {
            this.sessionVariables.newViewportMinimum = this.viewportMinimum = Math.min(a, d);
            this.sessionVariables.newViewportMaximum = this.viewportMaximum = Math.max(a, d)
        };
        y.prototype.getXValueAt = function(a) {
            if (!a) return null;
            var d = null;
            "left" === this._position ? d = this.convertPixelToValue(a.y) : "bottom" === this._position && (d = this.convertPixelToValue(a.x));
            return d
        };
        y.prototype.calculateValueToPixelConversionParameters = function(a) {
            a = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [];
            var d = {
                    pixelPerUnit: null,
                    minimum: null,
                    reference: null
                },
                b = this.lineCoordinates.width,
                c = this.lineCoordinates.height,
                b = "bottom" === this._position || "top" === this._position ? b : c,
                c = Math.abs(this.range);
            if (this.logarithmic)
                for (var e = 0; e < a.length && !(this.viewportMaximum < a[e].startValue); e++) this.viewportMinimum > a[e].endValue || (this.viewportMinimum >= a[e].startValue && this.viewportMaximum <=
                    a[e].endValue ? b = 0 : this.viewportMinimum <= a[e].startValue && this.viewportMaximum >= a[e].endValue ? (c = c / a[e].endValue * a[e].startValue, b = 0 < a[e].spacing.toString().indexOf("%") ? b * (1 - parseFloat(a[e].spacing) / 100) : b - Math.min(a[e].spacing, 0.1 * b)) : this.viewportMinimum > a[e].startValue && this.viewportMaximum >= a[e].endValue ? (c = c / a[e].endValue * this.viewportMinimum, b = 0 < a[e].spacing.toString().indexOf("%") ? b * (1 - parseFloat(a[e].spacing) / 100 * Math.log(a[e].endValue / this.viewportMinimum) / Math.log(a[e].endValue / a[e].startValue)) :
                        b - Math.min(a[e].spacing, 0.1 * b) * Math.log(a[e].endValue / this.viewportMinimum) / Math.log(a[e].endValue / a[e].startValue)) : this.viewportMinimum <= a[e].startValue && this.viewportMaximum < a[e].endValue && (c = c / this.viewportMaximum * a[e].startValue, b = 0 < a[e].spacing.toString().indexOf("%") ? b * (1 - parseFloat(a[e].spacing) / 100 * Math.log(this.viewportMaximum / a[e].startValue) / Math.log(a[e].endValue / a[e].startValue)) : b - Math.min(a[e].spacing, 0.1 * b) * Math.log(this.viewportMaximum / a[e].startValue) / Math.log(a[e].endValue / a[e].startValue)));
            else
                for (e = 0; e < a.length && !(this.viewportMaximum < a[e].startValue); e++) this.viewportMinimum > a[e].endValue || (this.viewportMinimum >= a[e].startValue && this.viewportMaximum <= a[e].endValue ? b = 0 : this.viewportMinimum <= a[e].startValue && this.viewportMaximum >= a[e].endValue ? (c = c - a[e].endValue + a[e].startValue, b = 0 < a[e].spacing.toString().indexOf("%") ? b * (1 - parseFloat(a[e].spacing) / 100) : b - Math.min(a[e].spacing, 0.1 * b)) : this.viewportMinimum > a[e].startValue && this.viewportMaximum >= a[e].endValue ? (c = c - a[e].endValue + this.viewportMinimum,
                    b = 0 < a[e].spacing.toString().indexOf("%") ? b * (1 - parseFloat(a[e].spacing) / 100 * (a[e].endValue - this.viewportMinimum) / (a[e].endValue - a[e].startValue)) : b - Math.min(a[e].spacing, 0.1 * b) * (a[e].endValue - this.viewportMinimum) / (a[e].endValue - a[e].startValue)) : this.viewportMinimum <= a[e].startValue && this.viewportMaximum < a[e].endValue && (c = c - this.viewportMaximum + a[e].startValue, b = 0 < a[e].spacing.toString().indexOf("%") ? b * (1 - parseFloat(a[e].spacing) / 100 * (this.viewportMaximum - a[e].startValue) / (a[e].endValue - a[e].startValue)) :
                    b - Math.min(a[e].spacing, 0.1 * b) * (this.viewportMaximum - a[e].startValue) / (a[e].endValue - a[e].startValue)));
            d.minimum = this.viewportMinimum;
            d.maximum = this.viewportMaximum;
            d.range = c;
            if ("bottom" === this._position || "top" === this._position) this.logarithmic ? (d.lnLogarithmBase = Math.log(this.logarithmBase), d.pixelPerUnit = (this.reversed ? -1 : 1) * b * d.lnLogarithmBase / Math.log(Math.abs(c))) : d.pixelPerUnit = (this.reversed ? -1 : 1) * b / Math.abs(c), d.reference = this.reversed ? this.lineCoordinates.x2 : this.lineCoordinates.x1;
            if ("left" ===
                this._position || "right" === this._position) this.logarithmic ? (d.lnLogarithmBase = Math.log(this.logarithmBase), d.pixelPerUnit = (this.reversed ? 1 : -1) * b * d.lnLogarithmBase / Math.log(Math.abs(c))) : d.pixelPerUnit = (this.reversed ? 1 : -1) * b / Math.abs(c), d.reference = this.reversed ? this.lineCoordinates.y1 : this.lineCoordinates.y2;
            this.conversionParameters = d
        };
        y.prototype.calculateAxisParameters = function() {
            if (this.logarithmic) this.calculateLogarithmicAxisParameters();
            else {
                var a = this.chart.layoutManager.getFreeSpace(),
                    d = !1,
                    b = !1;
                "bottom" === this._position || "top" === this._position ? (this.maxWidth = a.width, this.maxHeight = a.height) : (this.maxWidth = a.height, this.maxHeight = a.width);
                var a = "axisX" === this.type ? "xySwapped" === this.chart.plotInfo.axisPlacement ? 62 : 70 : "xySwapped" === this.chart.plotInfo.axisPlacement ? 50 : 40,
                    c = 4;
                "axisX" === this.type && (c = 600 > this.maxWidth ? 8 : 6);
                var a = Math.max(c, Math.floor(this.maxWidth / a)),
                    e, g, h, c = 0;
                !v(this.options.viewportMinimum) && (!v(this.options.viewportMaximum) && this.options.viewportMinimum >= this.options.viewportMaximum) &&
                    (this.viewportMinimum = this.viewportMaximum = null);
                if (v(this.options.viewportMinimum) && !v(this.sessionVariables.newViewportMinimum) && !isNaN(this.sessionVariables.newViewportMinimum)) this.viewportMinimum = this.sessionVariables.newViewportMinimum;
                else if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = this.minimum;
                if (v(this.options.viewportMaximum) && !v(this.sessionVariables.newViewportMaximum) && !isNaN(this.sessionVariables.newViewportMaximum)) this.viewportMaximum = this.sessionVariables.newViewportMaximum;
                else if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = this.maximum;
                if (this.scaleBreaks)
                    for (c = 0; c < this.scaleBreaks._appliedBreaks.length; c++)
                        if ((!v(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum >= this.scaleBreaks._appliedBreaks[c].startValue || !v(this.options.minimum) && this.options.minimum >= this.scaleBreaks._appliedBreaks[c].startValue || !v(this.options.viewportMinimum) && this.viewportMinimum >= this.scaleBreaks._appliedBreaks[c].startValue) &&
                            (!v(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum <= this.scaleBreaks._appliedBreaks[c].endValue || !v(this.options.maximum) && this.options.maximum <= this.scaleBreaks._appliedBreaks[c].endValue || !v(this.options.viewportMaximum) && this.viewportMaximum <= this.scaleBreaks._appliedBreaks[c].endValue)) {
                            this.scaleBreaks._appliedBreaks.splice(c, 1);
                            break
                        }
                if ("axisX" === this.type) {
                    if (this.dataSeries && 0 < this.dataSeries.length)
                        for (e = 0; e < this.dataSeries.length; e++) "dateTime" === this.dataSeries[e].xValueType &&
                            (b = !0);
                    e = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin;
                    g = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax;
                    0 === g - e && (c = "undefined" === typeof this.options.interval ? 0.4 : this.options.interval, g += c, e -= c);
                    Infinity !== this.dataInfo.minDiff ? h = this.dataInfo.minDiff : 1 < g - e ? h = 0.5 * Math.abs(g - e) : (h = 1, b && (d = !0))
                } else "axisY" === this.type && (e = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin, g = null !== this.viewportMaximum ? this.viewportMaximum :
                    this.dataInfo.viewPortMax, isFinite(e) || isFinite(g) ? isFinite(e) ? isFinite(g) || (g = e) : e = g : (g = "undefined" === typeof this.options.interval ? -Infinity : this.options.interval, e = "undefined" !== typeof this.options.interval || isFinite(this.dataInfo.minDiff) ? 0 : Infinity), 0 === e && 0 === g ? (g += 9, e = 0) : 0 === g - e ? (c = Math.min(Math.abs(0.01 * Math.abs(g)), 5), g += c, e -= c) : e > g ? (c = Math.min(0.01 * Math.abs(this.getApparentDifference(g, e, null, !0)), 5), 0 <= g ? e = g - c : g = isFinite(e) ? e + c : 0) : (c = Math.min(0.01 * Math.abs(this.getApparentDifference(e, g,
                        null, !0)), 0.05), 0 !== g && (g += c), 0 !== e && (e -= c)), h = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : 1 < g - e ? 0.5 * Math.abs(g - e) : 1, this.includeZero && (null === this.viewportMinimum || isNaN(this.viewportMinimum)) && 0 < e && (e = 0), this.includeZero && (null === this.viewportMaximum || isNaN(this.viewportMaximum)) && 0 > g && (g = 0));
                c = this.getApparentDifference(isNaN(this.viewportMinimum) || null === this.viewportMinimum ? e : this.viewportMinimum, isNaN(this.viewportMaximum) || null === this.viewportMaximum ? g : this.viewportMaximum, null, !0);
                if ("axisX" === this.type && b) {
                    this.intervalType || (c / 1 <= a ? (this.interval = 1, this.intervalType = "millisecond") : c / 2 <= a ? (this.interval = 2, this.intervalType = "millisecond") : c / 5 <= a ? (this.interval = 5, this.intervalType = "millisecond") : c / 10 <= a ? (this.interval = 10, this.intervalType = "millisecond") : c / 20 <= a ? (this.interval = 20, this.intervalType = "millisecond") : c / 50 <= a ? (this.interval = 50, this.intervalType = "millisecond") : c / 100 <= a ? (this.interval = 100, this.intervalType = "millisecond") : c / 200 <= a ? (this.interval = 200, this.intervalType =
                        "millisecond") : c / 250 <= a ? (this.interval = 250, this.intervalType = "millisecond") : c / 300 <= a ? (this.interval = 300, this.intervalType = "millisecond") : c / 400 <= a ? (this.interval = 400, this.intervalType = "millisecond") : c / 500 <= a ? (this.interval = 500, this.intervalType = "millisecond") : c / (1 * S.secondDuration) <= a ? (this.interval = 1, this.intervalType = "second") : c / (2 * S.secondDuration) <= a ? (this.interval = 2, this.intervalType = "second") : c / (5 * S.secondDuration) <= a ? (this.interval = 5, this.intervalType = "second") : c / (10 * S.secondDuration) <= a ? (this.interval =
                        10, this.intervalType = "second") : c / (15 * S.secondDuration) <= a ? (this.interval = 15, this.intervalType = "second") : c / (20 * S.secondDuration) <= a ? (this.interval = 20, this.intervalType = "second") : c / (30 * S.secondDuration) <= a ? (this.interval = 30, this.intervalType = "second") : c / (1 * S.minuteDuration) <= a ? (this.interval = 1, this.intervalType = "minute") : c / (2 * S.minuteDuration) <= a ? (this.interval = 2, this.intervalType = "minute") : c / (5 * S.minuteDuration) <= a ? (this.interval = 5, this.intervalType = "minute") : c / (10 * S.minuteDuration) <= a ? (this.interval =
                        10, this.intervalType = "minute") : c / (15 * S.minuteDuration) <= a ? (this.interval = 15, this.intervalType = "minute") : c / (20 * S.minuteDuration) <= a ? (this.interval = 20, this.intervalType = "minute") : c / (30 * S.minuteDuration) <= a ? (this.interval = 30, this.intervalType = "minute") : c / (1 * S.hourDuration) <= a ? (this.interval = 1, this.intervalType = "hour") : c / (2 * S.hourDuration) <= a ? (this.interval = 2, this.intervalType = "hour") : c / (3 * S.hourDuration) <= a ? (this.interval = 3, this.intervalType = "hour") : c / (6 * S.hourDuration) <= a ? (this.interval = 6, this.intervalType =
                        "hour") : c / (1 * S.dayDuration) <= a ? (this.interval = 1, this.intervalType = "day") : c / (2 * S.dayDuration) <= a ? (this.interval = 2, this.intervalType = "day") : c / (4 * S.dayDuration) <= a ? (this.interval = 4, this.intervalType = "day") : c / (1 * S.weekDuration) <= a ? (this.interval = 1, this.intervalType = "week") : c / (2 * S.weekDuration) <= a ? (this.interval = 2, this.intervalType = "week") : c / (3 * S.weekDuration) <= a ? (this.interval = 3, this.intervalType = "week") : c / (1 * S.monthDuration) <= a ? (this.interval = 1, this.intervalType = "month") : c / (2 * S.monthDuration) <= a ? (this.interval =
                        2, this.intervalType = "month") : c / (3 * S.monthDuration) <= a ? (this.interval = 3, this.intervalType = "month") : c / (6 * S.monthDuration) <= a ? (this.interval = 6, this.intervalType = "month") : (this.interval = c / (1 * S.yearDuration) <= a ? 1 : c / (2 * S.yearDuration) <= a ? 2 : c / (4 * S.yearDuration) <= a ? 4 : Math.floor(y.getNiceNumber(c / (a - 1), !0) / S.yearDuration), this.intervalType = "year"));
                    if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = e - h / 2;
                    if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum =
                        g + h / 2;
                    d ? this.autoValueFormatString = "MMM DD YYYY HH:mm" : "year" === this.intervalType ? this.autoValueFormatString = "YYYY" : "month" === this.intervalType ? this.autoValueFormatString = "MMM YYYY" : "week" === this.intervalType ? this.autoValueFormatString = "MMM DD YYYY" : "day" === this.intervalType ? this.autoValueFormatString = "MMM DD YYYY" : "hour" === this.intervalType ? this.autoValueFormatString = "hh:mm TT" : "minute" === this.intervalType ? this.autoValueFormatString = "hh:mm TT" : "second" === this.intervalType ? this.autoValueFormatString =
                        "hh:mm:ss TT" : "millisecond" === this.intervalType && (this.autoValueFormatString = "fff'ms'");
                    this.valueFormatString || (this.valueFormatString = this.autoValueFormatString)
                } else {
                    this.intervalType = "number";
                    c = y.getNiceNumber(c, !1);
                    this.interval = this.options && 0 < this.options.interval ? this.options.interval : y.getNiceNumber(c / (a - 1), !0);
                    if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = "axisX" === this.type ? e - h / 2 : Math.floor(e / this.interval) * this.interval;
                    if (null === this.viewportMaximum ||
                        isNaN(this.viewportMaximum)) this.viewportMaximum = "axisX" === this.type ? g + h / 2 : Math.ceil(g / this.interval) * this.interval;
                    0 === this.viewportMaximum && 0 === this.viewportMinimum && (0 === this.options.viewportMinimum ? this.viewportMaximum += 10 : 0 === this.options.viewportMaximum && (this.viewportMinimum -= 10), this.options && "undefined" === typeof this.options.interval && (this.interval = y.getNiceNumber((this.viewportMaximum - this.viewportMinimum) / (a - 1), !0)))
                }
                if (null === this.minimum || null === this.maximum)
                    if ("axisX" === this.type ? (e =
                            null !== this.minimum ? this.minimum : this.dataInfo.min, g = null !== this.maximum ? this.maximum : this.dataInfo.max, 0 === g - e && (c = "undefined" === typeof this.options.interval ? 0.4 : this.options.interval, g += c, e -= c), h = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : 1 < g - e ? 0.5 * Math.abs(g - e) : 1) : "axisY" === this.type && (e = null !== this.minimum ? this.minimum : this.dataInfo.min, g = null !== this.maximum ? this.maximum : this.dataInfo.max, isFinite(e) || isFinite(g) ? 0 === e && 0 === g ? (g += 9, e = 0) : 0 === g - e ? (c = Math.min(Math.abs(0.01 * Math.abs(g)),
                            5), g += c, e -= c) : e > g ? (c = Math.min(0.01 * Math.abs(this.getApparentDifference(g, e, null, !0)), 5), 0 <= g ? e = g - c : g = isFinite(e) ? e + c : 0) : (c = Math.min(0.01 * Math.abs(this.getApparentDifference(e, g, null, !0)), 0.05), 0 !== g && (g += c), 0 !== e && (e -= c)) : (g = "undefined" === typeof this.options.interval ? -Infinity : this.options.interval, e = "undefined" !== typeof this.options.interval || isFinite(this.dataInfo.minDiff) ? 0 : Infinity), h = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : 1 < g - e ? 0.5 * Math.abs(g - e) : 1, this.includeZero && (null === this.minimum ||
                            isNaN(this.minimum)) && 0 < e && (e = 0), this.includeZero && (null === this.maximum || isNaN(this.maximum)) && 0 > g && (g = 0)), Math.abs(this.getApparentDifference(e, g, null, !0)), "axisX" === this.type && b) {
                        this.valueType = "dateTime";
                        if (null === this.minimum || isNaN(this.minimum)) this.minimum = e - h / 2;
                        if (null === this.maximum || isNaN(this.maximum)) this.maximum = g + h / 2
                    } else this.intervalType = this.valueType = "number", null === this.minimum && (this.minimum = "axisX" === this.type ? e - h / 2 : Math.floor(e / this.interval) * this.interval, this.minimum = Math.min(this.minimum,
                        null === this.sessionVariables.viewportMinimum || isNaN(this.sessionVariables.viewportMinimum) ? Infinity : this.sessionVariables.viewportMinimum)), null === this.maximum && (this.maximum = "axisX" === this.type ? g + h / 2 : Math.ceil(g / this.interval) * this.interval, this.maximum = Math.max(this.maximum, null === this.sessionVariables.viewportMaximum || isNaN(this.sessionVariables.viewportMaximum) ? -Infinity : this.sessionVariables.viewportMaximum)), 0 === this.maximum && 0 === this.minimum && (0 === this.options.minimum ? this.maximum += 10 : 0 ===
                        this.options.maximum && (this.minimum -= 10));
                v(this.sessionVariables.newViewportMinimum) && (this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum));
                v(this.sessionVariables.newViewportMaximum) && (this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum));
                this.range = this.viewportMaximum - this.viewportMinimum;
                this.intervalStartPosition = "axisX" === this.type && b ? this.getLabelStartPoint(new Date(this.viewportMinimum), this.intervalType, this.interval) : Math.floor((this.viewportMinimum + 0.2 * this.interval) /
                    this.interval) * this.interval;
                this.valueFormatString || (this.valueFormatString = y.generateValueFormatString(this.range, 2))
            }
        };
        y.prototype.calculateLogarithmicAxisParameters = function() {
            var a = this.chart.layoutManager.getFreeSpace(),
                d = Math.log(this.logarithmBase),
                b;
            "bottom" === this._position || "top" === this._position ? (this.maxWidth = a.width, this.maxHeight = a.height) : (this.maxWidth = a.height, this.maxHeight = a.width);
            var a = "axisX" === this.type ? 500 > this.maxWidth ? 7 : Math.max(7, Math.floor(this.maxWidth / 100)) : Math.max(Math.floor(this.maxWidth /
                    50), 3),
                c, e, g, h;
            h = 1;
            if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = this.minimum;
            if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = this.maximum;
            if (this.scaleBreaks)
                for (h = 0; h < this.scaleBreaks._appliedBreaks.length; h++)
                    if ((!v(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum >= this.scaleBreaks._appliedBreaks[h].startValue || !v(this.options.minimum) && this.options.minimum >= this.scaleBreaks._appliedBreaks[h].startValue ||
                            !v(this.options.viewportMinimum) && this.viewportMinimum >= this.scaleBreaks._appliedBreaks[h].startValue) && (!v(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum <= this.scaleBreaks._appliedBreaks[h].endValue || !v(this.options.maximum) && this.options.maximum <= this.scaleBreaks._appliedBreaks[h].endValue || !v(this.options.viewportMaximum) && this.viewportMaximum <= this.scaleBreaks._appliedBreaks[h].endValue)) {
                        this.scaleBreaks._appliedBreaks.splice(h, 1);
                        break
                    }
                    "axisX" === this.type ?
                (c = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin, e = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax, 1 === e / c && (h = Math.pow(this.logarithmBase, "undefined" === typeof this.options.interval ? 0.4 : this.options.interval), e *= h, c /= h), g = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / c > this.logarithmBase ? e / c * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase) : "axisY" === this.type && (c = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin,
                    e = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax, 0 >= c && !isFinite(e) ? (e = "undefined" === typeof this.options.interval ? 0 : this.options.interval, c = 1) : 0 >= c ? c = e : isFinite(e) || (e = c), 1 === c && 1 === e ? (e *= this.logarithmBase - 1 / this.logarithmBase, c = 1) : 1 === e / c ? (h = Math.min(e * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 5)), e *= h, c /= h) : c > e ? (h = Math.min(c / e * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 5)), 1 <= e ? c = e / h : e = c * h) : (h = Math.min(e / c * Math.pow(this.logarithmBase,
                        0.01), Math.pow(this.logarithmBase, 0.04)), 1 !== e && (e *= h), 1 !== c && (c /= h)), g = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / c > this.logarithmBase ? e / c * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase, this.includeZero && (null === this.viewportMinimum || isNaN(this.viewportMinimum)) && 1 < c && (c = 1), this.includeZero && (null === this.viewportMaximum || isNaN(this.viewportMaximum)) && 1 > e && (e = 1));
            h = (isNaN(this.viewportMaximum) || null === this.viewportMaximum ? e : this.viewportMaximum) / (isNaN(this.viewportMinimum) || null ===
                this.viewportMinimum ? c : this.viewportMinimum);
            var k = (isNaN(this.viewportMaximum) || null === this.viewportMaximum ? e : this.viewportMaximum) - (isNaN(this.viewportMinimum) || null === this.viewportMinimum ? c : this.viewportMinimum);
            this.intervalType = "number";
            h = Math.pow(this.logarithmBase, y.getNiceNumber(Math.abs(Math.log(h) / d), !1));
            this.options && 0 < this.options.interval ? this.interval = this.options.interval : (this.interval = y.getNiceExponent(Math.log(h) / d / (a - 1), !0), b = y.getNiceNumber(k / (a - 1), !0));
            if (null === this.viewportMinimum ||
                isNaN(this.viewportMinimum)) this.viewportMinimum = "axisX" === this.type ? c / Math.sqrt(g) : Math.pow(this.logarithmBase, this.interval * Math.floor(Math.log(c) / d / this.interval));
            if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = "axisX" === this.type ? e * Math.sqrt(g) : Math.pow(this.logarithmBase, this.interval * Math.ceil(Math.log(e) / d / this.interval));
            1 === this.viewportMaximum && 1 === this.viewportMinimum && (1 === this.options.viewportMinimum ? this.viewportMaximum *= this.logarithmBase - 1 / this.logarithmBase :
                1 === this.options.viewportMaximum && (this.viewportMinimum /= this.logarithmBase - 1 / this.logarithmBase), this.options && "undefined" === typeof this.options.interval && (this.interval = y.getNiceExponent(Math.ceil(Math.log(h) / d) / (a - 1)), b = y.getNiceNumber((this.viewportMaximum - this.viewportMinimum) / (a - 1), !0)));
            if (null === this.minimum || null === this.maximum) "axisX" === this.type ? (c = null !== this.minimum ? this.minimum : this.dataInfo.min, e = null !== this.maximum ? this.maximum : this.dataInfo.max, 1 === e / c && (h = Math.pow(this.logarithmBase,
                "undefined" === typeof this.options.interval ? 0.4 : this.options.interval), e *= h, c /= h), g = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / c > this.logarithmBase ? e / c * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase) : "axisY" === this.type && (c = null !== this.minimum ? this.minimum : this.dataInfo.min, e = null !== this.maximum ? this.maximum : this.dataInfo.max, isFinite(c) || isFinite(e) ? 1 === c && 1 === e ? (e *= this.logarithmBase, c /= this.logarithmBase) : 1 === e / c ? (h = Math.pow(this.logarithmBase, this.interval), e *= h, c /= h) : c > e ? (h =
                    Math.min(0.01 * (c / e), 5), 1 <= e ? c = e / h : e = c * h) : (h = Math.min(e / c * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 0.04)), 1 !== e && (e *= h), 1 !== c && (c /= h)) : (e = "undefined" === typeof this.options.interval ? 0 : this.options.interval, c = 1), g = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / c > this.logarithmBase ? e / c * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase, this.includeZero && (null === this.minimum || isNaN(this.minimum)) && 1 < c && (c = 1), this.includeZero && (null === this.maximum || isNaN(this.maximum)) &&
                1 > e && (e = 1)), this.intervalType = "number", null === this.minimum && (this.minimum = "axisX" === this.type ? c / Math.sqrt(g) : Math.pow(this.logarithmBase, this.interval * Math.floor(Math.log(c) / d / this.interval)), this.minimum = Math.min(this.minimum, null === this.sessionVariables.viewportMinimum || isNaN(this.sessionVariables.viewportMinimum) ? "undefined" === typeof this.sessionVariables.newViewportMinimum ? Infinity : this.sessionVariables.newViewportMinimum : this.sessionVariables.viewportMinimum)), null === this.maximum && (this.maximum =
                "axisX" === this.type ? e * Math.sqrt(g) : Math.pow(this.logarithmBase, this.interval * Math.ceil(Math.log(e) / d / this.interval)), this.maximum = Math.max(this.maximum, null === this.sessionVariables.viewportMaximum || isNaN(this.sessionVariables.viewportMaximum) ? "undefined" === typeof this.sessionVariables.newViewportMaximum ? 0 : this.sessionVariables.newViewportMaximum : this.sessionVariables.viewportMaximum)), 1 === this.maximum && 1 === this.minimum && (1 === this.options.minimum ? this.maximum *= this.logarithmBase - 1 / this.logarithmBase :
                1 === this.options.maximum && (this.minimum /= this.logarithmBase - 1 / this.logarithmBase));
            this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum);
            this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum);
            this.viewportMinimum > this.viewportMaximum && (!this.options.viewportMinimum && !this.options.minimum || this.options.viewportMaximum || this.options.maximum ? this.options.viewportMinimum || this.options.minimum || !this.options.viewportMaximum && !this.options.maximum || (this.viewportMinimum = this.minimum =
                (this.options.viewportMaximum || this.options.maximum) / Math.pow(this.logarithmBase, 2 * Math.ceil(this.interval))) : this.viewportMaximum = this.maximum = this.options.viewportMinimum || this.options.minimum);
            c = Math.pow(this.logarithmBase, Math.floor(Math.log(this.viewportMinimum) / (d * this.interval) + 0.2) * this.interval);
            this.range = this.viewportMaximum / this.viewportMinimum;
            this.noTicks = a;
            if (!this.options.interval && this.range < Math.pow(this.logarithmBase, 8 > this.viewportMaximum || 3 > a ? 2 : 3)) {
                for (d = Math.floor(this.viewportMinimum /
                        b + 0.5) * b; d < this.viewportMinimum;) d += b;
                this.equidistantInterval = !1;
                this.intervalStartPosition = d;
                this.interval = b
            } else this.options.interval || (b = Math.ceil(this.interval), this.range > this.interval && (this.interval = b, c = Math.pow(this.logarithmBase, Math.floor(Math.log(this.viewportMinimum) / (d * this.interval) + 0.2) * this.interval))), this.equidistantInterval = !0, this.intervalStartPosition = c;
            if (!this.valueFormatString && (this.valueFormatString = "#,##0.##", 1 > this.viewportMinimum)) {
                d = Math.floor(Math.abs(Math.log(this.viewportMinimum) /
                    Math.LN10)) + 2;
                if (isNaN(d) || !isFinite(d)) d = 2;
                if (2 < d)
                    for (h = 0; h < d - 2; h++) this.valueFormatString += "#"
            }
        };
        y.generateValueFormatString = function(a, d) {
            var b = "#,##0.",
                c = d;
            1 > a && (c += Math.floor(Math.abs(Math.log(a) / Math.LN10)), isNaN(c) || !isFinite(c)) && (c = d);
            for (var e = 0; e < c; e++) b += "#";
            return b
        };
        y.getNiceExponent = function(a, d) {
            var b = Math.floor(Math.log(a) / Math.LN10),
                c = a / Math.pow(10, b),
                c = 0 > b ? 1 >= c ? 1 : 5 >= c ? 5 : 10 : Math.max(Math.floor(c), 1);
            return -20 > b ? Number(c * Math.pow(10, b)) : Number((c * Math.pow(10, b)).toFixed(20))
        };
        y.getNiceNumber =
            function(a, d) {
                var b = Math.floor(Math.log(a) / Math.LN10),
                    c = a / Math.pow(10, b),
                    c = d ? 1.5 > c ? 1 : 3 > c ? 2 : 7 > c ? 5 : 10 : 1 >= c ? 1 : 2 >= c ? 2 : 5 >= c ? 5 : 10;
                return -20 > b ? Number(c * Math.pow(10, b)) : Number((c * Math.pow(10, b)).toFixed(20))
            };
        y.prototype.getLabelStartPoint = function() {
            var a = S[this.intervalType + "Duration"] * this.interval,
                a = new Date(Math.floor(this.viewportMinimum / a) * a);
            if ("millisecond" !== this.intervalType)
                if ("second" === this.intervalType) 0 < a.getMilliseconds() && (a.setSeconds(a.getSeconds() + 1), a.setMilliseconds(0));
                else if ("minute" ===
                this.intervalType) {
                if (0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setMinutes(a.getMinutes() + 1), a.setSeconds(0), a.setMilliseconds(0)
            } else if ("hour" === this.intervalType) {
                if (0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setHours(a.getHours() + 1), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)
            } else if ("day" === this.intervalType) {
                if (0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setDate(a.getDate() + 1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)
            } else if ("week" ===
                this.intervalType) {
                if (0 < a.getDay() || 0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setDate(a.getDate() + (7 - a.getDay())), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)
            } else if ("month" === this.intervalType) {
                if (1 < a.getDate() || 0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setMonth(a.getMonth() + 1), a.setDate(1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)
            } else "year" === this.intervalType && (0 < a.getMonth() || 1 <
                a.getDate() || 0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) && (a.setFullYear(a.getFullYear() + 1), a.setMonth(0), a.setDate(1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0));
            return a
        };
        qa(Q, V);
        qa(L, V);
        L.prototype.createUserOptions = function(a) {
            if ("undefined" !== typeof a || this.options._isPlaceholder) {
                var d = 0;
                this.parent.options._isPlaceholder && this.parent.createUserOptions();
                this.options._isPlaceholder || (Fa(this.parent[this.optionsName]), d = this.parent.options[this.optionsName].indexOf(this.options));
                this.options = "undefined" === typeof a ? {} : a;
                this.parent.options[this.optionsName][d] = this.options
            }
        };
        L.prototype.render = function(a) {
            if (0 !== this.spacing || 0 !== this.options.lineThickness && ("undefined" !== typeof this.options.lineThickness || 0 !== this.parent.lineThickness)) {
                var d = this.ctx,
                    b = this.ctx.globalAlpha;
                this.ctx = a || this.ctx;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
                this.ctx.clip();
                var c = this.scaleBreaks.parent.getPixelCoordinatesOnAxis(this.startValue),
                    e = this.scaleBreaks.parent.getPixelCoordinatesOnAxis(this.endValue);
                this.ctx.strokeStyle = this.lineColor;
                this.ctx.fillStyle = this.color;
                this.ctx.beginPath();
                this.ctx.globalAlpha = 1;
                N(this.id);
                var g, h, k, m, l, p;
                a = Math.max(this.spacing, 3);
                var q = Math.max(0, this.lineThickness);
                this.ctx.lineWidth = q;
                this.ctx.setLineDash && this.ctx.setLineDash(R(this.lineDashType, q));
                if ("bottom" === this.scaleBreaks.parent._position || "top" === this.scaleBreaks.parent._position)
                    if (c = 1 === q % 2 ? (c.x << 0) + 0.5 : c.x << 0, h = 1 === q % 2 ? (e.x << 0) + 0.5 :
                        e.x << 0, "top" === this.scaleBreaks.parent._position ? (e = this.chart.plotArea.y1, k = this.chart.plotArea.y2 + q / 2 + 0.5 << 0) : (e = this.chart.plotArea.y2, k = this.chart.plotArea.y1 - q / 2 + 0.5 << 0, a *= -1), this.bounds = {
                            x1: c - q / 2,
                            y1: e,
                            x2: h + q / 2,
                            y2: k
                        }, this.ctx.moveTo(c, e), "straight" === this.type || "top" === this.scaleBreaks.parent._position && 0 >= a || "bottom" === this.scaleBreaks.parent._position && 0 <= a) this.ctx.lineTo(c, k), this.ctx.lineTo(h, k), this.ctx.lineTo(h, e);
                    else if ("wavy" === this.type) {
                    m = c;
                    l = e;
                    g = 0.5;
                    p = (k - l) / a / 3;
                    for (var n = 0; n < p; n++) this.ctx.bezierCurveTo(m +
                        g * a, l + a, m + g * a, l + 2 * a, m, l + 3 * a), l += 3 * a, g *= -1;
                    this.ctx.bezierCurveTo(m + g * a, l + a, m + g * a, l + 2 * a, m, l + 3 * a);
                    m = h;
                    g *= -1;
                    this.ctx.lineTo(m, l);
                    for (n = 0; n < p; n++) this.ctx.bezierCurveTo(m + g * a, l - a, m + g * a, l - 2 * a, m, l - 3 * a), l -= 3 * a, g *= -1
                } else {
                    if ("zigzag" === this.type) {
                        g = -1;
                        l = e + a;
                        m = c + a;
                        p = (k - l) / a / 2;
                        for (n = 0; n < p; n++) this.ctx.lineTo(m, l), m += 2 * g * a, l += 2 * a, g *= -1;
                        this.ctx.lineTo(m, l);
                        m += h - c;
                        for (n = 0; n < p + 1; n++) this.ctx.lineTo(m, l), m += 2 * g * a, l -= 2 * a, g *= -1;
                        this.ctx.lineTo(m + g * a, l + a)
                    }
                } else if ("left" === this.scaleBreaks.parent._position || "right" ===
                    this.scaleBreaks.parent._position)
                    if (e = 1 === q % 2 ? (e.y << 0) + 0.5 : e.y << 0, k = 1 === q % 2 ? (c.y << 0) + 0.5 : c.y << 0, "left" === this.scaleBreaks.parent._position ? (c = this.chart.plotArea.x1, h = this.chart.plotArea.x2 + q / 2 + 0.5 << 0) : (c = this.chart.plotArea.x2, h = this.chart.plotArea.x1 - q / 2 + 0.5 << 0, a *= -1), this.bounds = {
                            x1: c,
                            y1: e - q / 2,
                            x2: h,
                            y2: k + q / 2
                        }, this.ctx.moveTo(c, e), "straight" === this.type || "left" === this.scaleBreaks.parent._position && 0 >= a || "right" === this.scaleBreaks.parent._position && 0 <= a) this.ctx.lineTo(h, e), this.ctx.lineTo(h, k),
                        this.ctx.lineTo(c, k);
                    else if ("wavy" === this.type) {
                    m = c;
                    l = e;
                    g = 0.5;
                    p = (h - m) / a / 3;
                    for (n = 0; n < p; n++) this.ctx.bezierCurveTo(m + a, l + g * a, m + 2 * a, l + g * a, m + 3 * a, l), m += 3 * a, g *= -1;
                    this.ctx.bezierCurveTo(m + a, l + g * a, m + 2 * a, l + g * a, m + 3 * a, l);
                    l = k;
                    g *= -1;
                    this.ctx.lineTo(m, l);
                    for (n = 0; n < p; n++) this.ctx.bezierCurveTo(m - a, l + g * a, m - 2 * a, l + g * a, m - 3 * a, l), m -= 3 * a, g *= -1
                } else if ("zigzag" === this.type) {
                    g = 1;
                    l = e - a;
                    m = c + a;
                    p = (h - m) / a / 2;
                    for (n = 0; n < p; n++) this.ctx.lineTo(m, l), l += 2 * g * a, m += 2 * a, g *= -1;
                    this.ctx.lineTo(m, l);
                    l += k - e;
                    for (n = 0; n < p + 1; n++) this.ctx.lineTo(m,
                        l), l += 2 * g * a, m -= 2 * a, g *= -1;
                    this.ctx.lineTo(m + a, l + g * a)
                }
                0 < q && this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.globalAlpha = this.fillOpacity;
                this.ctx.globalCompositeOperation = "destination-over";
                this.ctx.fill();
                this.ctx.restore();
                this.ctx.globalAlpha = b;
                this.ctx = d
            }
        };
        qa(X, V);
        X.prototype.createUserOptions = function(a) {
            if ("undefined" !== typeof a || this.options._isPlaceholder) {
                var d = 0;
                this.parent.options._isPlaceholder && this.parent.createUserOptions();
                this.options._isPlaceholder || (Fa(this.parent.stripLines), d = this.parent.options.stripLines.indexOf(this.options));
                this.options = "undefined" === typeof a ? {} : a;
                this.parent.options.stripLines[d] = this.options
            }
        };
        X.prototype.render = function() {
            this.ctx.save();
            var a = this.parent.getPixelCoordinatesOnAxis(this.value),
                d = Math.abs("pixel" === this._thicknessType ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness);
            if (0 < d) {
                var b = null === this.opacity ? 1 : this.opacity;
                this.ctx.strokeStyle = this.color;
                this.ctx.beginPath();
                var c = this.ctx.globalAlpha;
                this.ctx.globalAlpha = b;
                N(this.id);
                var e, g, h, k;
                this.ctx.lineWidth =
                    d;
                this.ctx.setLineDash && this.ctx.setLineDash(R(this.lineDashType, d));
                if ("bottom" === this.parent._position || "top" === this.parent._position) e = g = 1 === this.ctx.lineWidth % 2 ? (a.x << 0) + 0.5 : a.x << 0, h = this.chart.plotArea.y1, k = this.chart.plotArea.y2, this.bounds = {
                    x1: e - d / 2,
                    y1: h,
                    x2: g + d / 2,
                    y2: k
                };
                else if ("left" === this.parent._position || "right" === this.parent._position) h = k = 1 === this.ctx.lineWidth % 2 ? (a.y << 0) + 0.5 : a.y << 0, e = this.chart.plotArea.x1, g = this.chart.plotArea.x2, this.bounds = {
                    x1: e,
                    y1: h - d / 2,
                    x2: g,
                    y2: k + d / 2
                };
                this.ctx.moveTo(e,
                    h);
                this.ctx.lineTo(g, k);
                this.ctx.stroke();
                this.ctx.globalAlpha = c
            }
            this.ctx.restore()
        };
        qa(fa, V);
        fa.prototype.render = function(a, d) {
            var b, c, e, g, h = null,
                k = h = null,
                m = "";
            if (!this.valueFormatString)
                if ("dateTime" === this.parent.valueType) this.valueFormatString = this.parent.valueFormatString;
                else {
                    var l = 0,
                        l = "xySwapped" === this.chart.plotInfo.axisPlacement ? 50 < this.parent.range ? 0 : 500 < this.chart.width && 25 > this.parent.range ? 2 : Math.floor(Math.abs(Math.log(this.parent.range) / Math.LN10)) + (5 > this.parent.range ? 2 : 10 > this.parent.range ?
                            1 : 0) : 50 < this.parent.range ? 0 : Math.floor(Math.abs(Math.log(this.parent.range) / Math.LN10)) + (5 > this.parent.range ? 2 : 10 > this.parent.range ? 1 : 0);
                    this.valueFormatString = y.generateValueFormatString(this.parent.range, l)
                }
            var k = null === this.opacity ? 1 : this.opacity,
                l = Math.abs("pixel" === this._thicknessType ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness),
                p = this.chart.overlaidCanvasCtx,
                q = p.globalAlpha;
            p.globalAlpha = k;
            p.beginPath();
            p.strokeStyle = this.color;
            p.lineWidth = l;
            p.save();
            this.labelFontSize =
                v(this.options.labelFontSize) ? this.parent.labelFontSize : this.labelFontSize;
            if ("left" === this.parent._position || "right" === this.parent._position) this.labelMaxWidth = v(this.options.labelMaxWidth) ? this.parent.bounds.x2 - this.parent.bounds.x1 : this.labelMaxWidth, this.labelMaxHeight = v(this.options.labelWrap) || this.labelWrap ? 3 * this.chart.height : 2 * this.labelFontSize;
            else if ("top" === this.parent._position || "bottom" === this.parent._position) this.labelMaxWidth = v(this.options.labelMaxWidth) ? 3 * this.chart.width : this.labelMaxWidth,
                this.labelMaxHeight = v(this.options.labelWrap) || this.labelWrap ? this.parent.bounds.height : 2 * this.labelFontSize;
            0 < l && p.setLineDash && p.setLineDash(R(this.lineDashType, l));
            k = new ka(p, {
                x: 0,
                y: 0,
                padding: {
                    top: 2,
                    right: 3,
                    bottom: 2,
                    left: 4
                },
                backgroundColor: this.labelBackgroundColor,
                borderColor: this.labelBorderColor,
                borderThickness: this.labelBorderThickness,
                cornerRadius: this.labelCornerRadius,
                maxWidth: this.labelMaxWidth,
                maxHeight: this.labelMaxHeight,
                angle: this.labelAngle,
                text: m,
                horizontalAlign: "left",
                fontSize: this.labelFontSize,
                fontFamily: this.labelFontFamily,
                fontWeight: this.labelFontWeight,
                fontColor: this.labelFontColor,
                fontStyle: this.labelFontStyle,
                textBaseline: "middle"
            });
            if (this.snapToDataPoint) {
                var n = 0,
                    h = [];
                if ("xySwapped" === this.chart.plotInfo.axisPlacement) {
                    var f = null;
                    if ("bottom" === this.parent._position || "top" === this.parent._position) n = this.parent.dataSeries[0].axisX.convertPixelToValue({
                        y: d
                    });
                    else if ("left" === this.parent._position || "right" === this.parent._position) n = this.parent.convertPixelToValue({
                        y: d
                    });
                    for (var r = 0; r <
                        this.parent.dataSeries.length; r++)(f = this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index && (f.dataSeries = this.parent.dataSeries[r], null !== f.dataPoint.y && h.push(f));
                    f = null;
                    if (0 === h.length) return;
                    h.sort(function(a, b) {
                        return a.distance - b.distance
                    });
                    f = Math.abs(a - this.parent.convertValueToPixel(h[0].dataPoint.y));
                    r = 0;
                    if ("rangeBar" === h[0].dataSeries.type || "error" === h[0].dataSeries.type)
                        for (var f = Math.abs(a - this.parent.convertValueToPixel(h[r].dataPoint.y[0])), w = 0, n = 0; n < h.length; n++)
                            if (h[n].dataPoint.y &&
                                h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(a - this.parent.convertValueToPixel(h[n].dataPoint.y[m])), w < f && (f = w, r = n);
                            else w = Math.abs(a - this.parent.convertValueToPixel(h[n].dataPoint.y)), w < f && (f = w, r = n);
                    else if ("stackedBar" === h[0].dataSeries.type)
                        for (var f = Math.abs(a - this.parent.convertValueToPixel(h[0].dataPoint.y)), D = w = 0, n = r = 0; n < h.length; n++)
                            if (h[n].dataPoint.y && h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(a - this.parent.convertValueToPixel(h[n].dataPoint.y[m])),
                                    w < f && (f = w, r = n);
                            else D += h[n].dataPoint.y, w = Math.abs(a - this.parent.convertValueToPixel(D)), w < f && (f = w, r = n);
                    else if ("stackedBar100" === h[0].dataSeries.type)
                        for (var f = Math.abs(a - this.parent.convertValueToPixel(h[0].dataPoint.y)), s = D = w = 0, n = 0; n < h.length; n++)
                            if (h[n].dataPoint.y && h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(a - this.parent.convertValueToPixel(h[n].dataPoint.y[m])), w < f && (f = w, r = n);
                            else D += h[n].dataPoint.y, s = h[n].dataPoint.x.getTime ? h[n].dataPoint.x.getTime() : h[n].dataPoint.x,
                                s = 100 * (D / h[n].dataSeries.plotUnit.dataPointYSums[s]), w = Math.abs(a - this.parent.convertValueToPixel(s)), w < f && (f = w, r = n);
                    else
                        for (f = Math.abs(a - this.parent.convertValueToPixel(h[0].dataPoint.y)), n = r = w = 0; n < h.length; n++)
                            if (h[n].dataPoint.y && h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(a - this.parent.convertValueToPixel(h[n].dataPoint.y[m])), w < f && (f = w, r = n);
                            else w = Math.abs(a - this.parent.convertValueToPixel(h[n].dataPoint.y)), w < f && (f = w, r = n);
                    m = h[r];
                    if ("bottom" === this.parent._position ||
                        "top" === this.parent._position) {
                        b = 0;
                        if ("rangeBar" === this.parent.dataSeries[r].type || "error" === this.parent.dataSeries[r].type) {
                            f = Math.abs(a - this.parent.convertValueToPixel(m.dataPoint.y[0]));
                            for (n = w = 0; n < m.dataPoint.y.length; n++) w = Math.abs(a - this.parent.convertValueToPixel(m.dataPoint.y[n])), w < f && (f = w, b = n);
                            h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataPoint.y[b]) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataPoint.y[b]) << 0;
                            k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: m.dataPoint.y[b]
                            }) : v(this.options.label) ? ba(m.dataPoint.y[b], this.valueFormatString, this.chart._cultureInfo) : this.label
                        } else if ("stackedBar" === this.parent.dataSeries[r].type) {
                            f = Math.abs(a - this.parent.convertValueToPixel(h[0].dataPoint.y));
                            D = w = 0;
                            for (n = r; 0 <= n; n--) D += h[n].dataPoint.y, w = Math.abs(a - this.parent.convertValueToPixel(D)), w < f && (f = w, b = n);
                            h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(D) << 0) + 0.5 : this.parent.convertValueToPixel(D) << 0;
                            k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: m.dataPoint.y
                            }) : v(this.options.label) ? ba(m.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label
                        } else if ("stackedBar100" === this.parent.dataSeries[r].type) {
                            f = Math.abs(a - this.parent.convertValueToPixel(h[0].dataPoint.y));
                            s = D = w = 0;
                            for (n = r; 0 <= n; n--) D += h[n].dataPoint.y, s = h[n].dataPoint.x.getTime ? h[n].dataPoint.x.getTime() : h[n].dataPoint.x, s = 100 * (D / h[n].dataSeries.plotUnit.dataPointYSums[s]),
                                w = Math.abs(a - this.parent.convertValueToPixel(s)), w < f && (f = w, b = n);
                            h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(s) << 0) + 0.5 : this.parent.convertValueToPixel(s) << 0;
                            k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: s
                            }) : v(this.options.label) ? ba(s, this.valueFormatString, this.chart._cultureInfo) : this.label
                        } else h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataPoint.y) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataPoint.y) <<
                            0, k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: m.dataPoint.y
                            }) : v(this.options.label) ? ba(m.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label;
                        b = c = h;
                        e = this.chart.plotArea.y1;
                        g = this.chart.plotArea.y2;
                        this.bounds = {
                            x1: b - l / 2,
                            y1: e,
                            x2: c + l / 2,
                            y2: g
                        };
                        k.x = b - k.measureText().width / 2;
                        k.x + k.width > this.chart.bounds.x2 ? k.x = this.chart.bounds.x2 - k.width : k.x < this.chart.bounds.x1 && (k.x = this.chart.bounds.x1);
                        k.y = this.parent.lineCoordinates.y2 +
                            k.fontSize / 2 + 2
                    } else if ("left" === this.parent._position || "right" === this.parent._position) {
                        e = g = h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataPoint.x) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataPoint.x) << 0;
                        b = this.chart.plotArea.x1;
                        c = this.chart.plotArea.x2;
                        this.bounds = {
                            x1: b,
                            y1: e - l / 2,
                            x2: c,
                            y2: g + l / 2
                        };
                        s = !1;
                        if (this.parent.labels)
                            for (h = Math.ceil(this.parent.interval), n = 0; n < this.parent.viewportMaximum; n += h)
                                if (this.parent.labels[n]) s = !0;
                                else {
                                    s = !1;
                                    break
                                }
                        if (s) {
                            if ("axisX" === this.parent.type)
                                for (n =
                                    this.parent.convertPixelToValue({
                                        y: d
                                    }), f = null, r = 0; r < this.parent.dataSeries.length; r++)(f = this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index && (k.text = this.labelFormatter ? this.labelFormatter({
                                    chart: this.chart,
                                    axis: this.parent.options,
                                    crosshair: this.options,
                                    value: m.dataPoint.x
                                }) : v(this.options.label) ? f.dataPoint.label : this.label)
                        } else "dateTime" === this.parent.valueType ? k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: m.dataPoint.x
                            }) :
                            v(this.options.label) ? Ca(m.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: m.dataPoint.x
                            }) : v(this.options.label) ? ba(m.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label);
                        k.y = g + k.fontSize / 2 - k.measureText().height / 2 + 2;
                        k.y - k.fontSize / 2 < this.chart.bounds.y1 ? k.y = this.chart.bounds.y1 + k.fontSize / 2 + 2 : k.y + k.measureText().height -
                            k.fontSize / 2 > this.chart.bounds.y2 && (k.y = this.chart.bounds.y2 - k.measureText().height + k.fontSize / 2);
                        "left" === this.parent._position ? k.x = this.parent.lineCoordinates.x2 - k.measureText().width : "right" === this.parent._position && (k.x = this.parent.lineCoordinates.x2)
                    }
                } else if ("bottom" === this.parent._position || "top" === this.parent._position) {
                    n = this.parent.convertPixelToValue({
                        x: a
                    });
                    for (r = 0; r < this.parent.dataSeries.length; r++)(f = this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index && (f.dataSeries = this.parent.dataSeries[r],
                        null !== f.dataPoint.y && h.push(f));
                    if (0 === h.length) return;
                    h.sort(function(a, b) {
                        return a.distance - b.distance
                    });
                    m = h[0];
                    b = c = h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataPoint.x) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataPoint.x) << 0;
                    e = this.chart.plotArea.y1;
                    g = this.chart.plotArea.y2;
                    this.bounds = {
                        x1: b - l / 2,
                        y1: e,
                        x2: c + l / 2,
                        y2: g
                    };
                    s = !1;
                    if (this.parent.labels)
                        for (h = Math.ceil(this.parent.interval), n = 0; n < this.parent.viewportMaximum; n += h)
                            if (this.parent.labels[n]) s = !0;
                            else {
                                s = !1;
                                break
                            }
                    if (s) {
                        if ("axisX" ===
                            this.parent.type)
                            for (n = this.parent.convertPixelToValue({
                                    x: a
                                }), f = null, r = 0; r < this.parent.dataSeries.length; r++)(f = this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index && (k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: m.dataPoint.x
                            }) : v(this.options.label) ? f.dataPoint.label : this.label)
                    } else "dateTime" === this.parent.valueType ? k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: m.dataPoint.x
                    }) : v(this.options.label) ? Ca(m.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: m.dataPoint.x
                    }) : v(this.options.label) ? ba(m.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label);
                    k.x = b - k.measureText().width / 2;
                    k.x + k.width > this.chart.bounds.x2 && (k.x = this.chart.bounds.x2 - k.width);
                    k.x < this.chart.bounds.x1 &&
                        (k.x = this.chart.bounds.x1);
                    "bottom" === this.parent._position ? k.y = this.parent.lineCoordinates.y2 + k.fontSize / 2 + 2 : "top" === this.parent._position && (k.y = this.parent.lineCoordinates.y1 - k.height + k.fontSize / 2 + 2)
                } else if ("left" === this.parent._position || "right" === this.parent._position) {
                    !v(this.parent.dataSeries) && 0 < this.parent.dataSeries.length && (n = this.parent.dataSeries[0].axisX.convertPixelToValue({
                        x: a
                    }));
                    for (r = 0; r < this.parent.dataSeries.length; r++)(f = this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index &&
                        (f.dataSeries = this.parent.dataSeries[r], null !== f.dataPoint.y && h.push(f));
                    if (0 === h.length) return;
                    h.sort(function(a, b) {
                        return a.distance - b.distance
                    });
                    r = 0;
                    if ("rangeColumn" === h[0].dataSeries.type || "rangeArea" === h[0].dataSeries.type || "error" === h[0].dataSeries.type || "rangeSplineArea" === h[0].dataSeries.type || "candlestick" === h[0].dataSeries.type || "ohlc" === h[0].dataSeries.type || "boxAndWhisker" === h[0].dataSeries.type)
                        for (f = Math.abs(d - this.parent.convertValueToPixel(h[0].dataPoint.y[0])), n = w = 0; n < h.length; n++)
                            if (h[n].dataPoint.y &&
                                h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(d - this.parent.convertValueToPixel(h[n].dataPoint.y[m])), w < f && (f = w, r = n);
                            else w = Math.abs(d - this.parent.convertValueToPixel(h[n].dataPoint.y)), w < f && (f = w, r = n);
                    else if ("stackedColumn" === h[0].dataSeries.type || "stackedArea" === h[0].dataSeries.type)
                        for (f = Math.abs(d - this.parent.convertValueToPixel(h[0].dataPoint.y)), n = D = w = 0; n < h.length; n++)
                            if (h[n].dataPoint.y && h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(d - this.parent.convertValueToPixel(h[n].dataPoint.y[m])),
                                    w < f && (f = w, r = n);
                            else D += h[n].dataPoint.y, w = Math.abs(d - this.parent.convertValueToPixel(D)), w < f && (f = w, r = n);
                    else if ("stackedColumn100" === h[0].dataSeries.type || "stackedArea100" === h[0].dataSeries.type)
                        for (f = Math.abs(d - this.parent.convertValueToPixel(h[0].dataPoint.y)), n = s = D = w = 0; n < h.length; n++)
                            if (h[n].dataPoint.y && h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(d - this.parent.convertValueToPixel(h[n].dataPoint.y[m])), w < f && (f = w, r = n);
                            else D += h[n].dataPoint.y, s = h[n].dataPoint.x.getTime ?
                                h[n].dataPoint.x.getTime() : h[n].dataPoint.x, s = 100 * (D / h[n].dataSeries.plotUnit.dataPointYSums[s]), w = Math.abs(d - this.parent.convertValueToPixel(s)), w < f && (f = w, r = n);
                    else
                        for (f = Math.abs(d - this.parent.convertValueToPixel(h[0].dataPoint.y)), n = w = 0; n < h.length; n++)
                            if (h[n].dataPoint.y && h[n].dataPoint.y.length)
                                for (m = 0; m < h[n].dataPoint.y.length; m++) w = Math.abs(d - this.parent.convertValueToPixel(h[n].dataPoint.y[m])), w < f && (f = w, r = n);
                            else w = Math.abs(d - this.parent.convertValueToPixel(h[n].dataPoint.y)), w < f && (f = w, r =
                                n);
                    m = h[r];
                    b = 0;
                    if ("rangeColumn" === this.parent.dataSeries[r].type || "rangeArea" === this.parent.dataSeries[r].type || "error" === this.parent.dataSeries[r].type || "rangeSplineArea" === this.parent.dataSeries[r].type || "candlestick" === this.parent.dataSeries[r].type || "ohlc" === this.parent.dataSeries[r].type || "boxAndWhisker" === this.parent.dataSeries[r].type) {
                        f = Math.abs(d - this.parent.convertValueToPixel(m.dataPoint.y[0]));
                        for (n = w = 0; n < m.dataPoint.y.length; n++) w = Math.abs(d - this.parent.convertValueToPixel(m.dataPoint.y[n])),
                            w < f && (f = w, b = n);
                        h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataPoint.y[b]) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataPoint.y[b]) << 0;
                        k.text = this.labelFormatter ? this.labelFormatter({
                            chart: this.chart,
                            axis: this.parent.options,
                            crosshair: this.options,
                            value: m.dataPoint.y[b]
                        }) : v(this.options.label) ? ba(m.dataPoint.y[b], this.valueFormatString, this.chart._cultureInfo) : this.label
                    } else if ("stackedColumn" === this.parent.dataSeries[r].type || "stackedArea" === this.parent.dataSeries[r].type) {
                        f = Math.abs(d -
                            this.parent.convertValueToPixel(h[0].dataPoint.y));
                        D = w = 0;
                        for (n = r; 0 <= n; n--) D += h[n].dataPoint.y, w = Math.abs(d - this.parent.convertValueToPixel(D)), w < f && (f = w, b = n);
                        h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(D) << 0) + 0.5 : this.parent.convertValueToPixel(D) << 0;
                        k.text = this.labelFormatter ? this.labelFormatter({
                            chart: this.chart,
                            axis: this.parent.options,
                            crosshair: this.options,
                            value: m.dataPoint.y
                        }) : v(this.options.label) ? ba(m.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label
                    } else if ("stackedColumn100" ===
                        this.parent.dataSeries[r].type || "stackedArea100" === this.parent.dataSeries[r].type) {
                        f = Math.abs(d - this.parent.convertValueToPixel(h[0].dataPoint.y));
                        D = w = 0;
                        for (n = r; 0 <= n; n--) D += h[n].dataPoint.y, s = h[n].dataPoint.x.getTime ? h[n].dataPoint.x.getTime() : h[n].dataPoint.x, s = 100 * (D / h[n].dataSeries.plotUnit.dataPointYSums[s]), w = Math.abs(d - this.parent.convertValueToPixel(s)), w < f && (f = w, b = n);
                        h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(s) << 0) + 0.5 : this.parent.convertValueToPixel(s) << 0;
                        k.text = this.labelFormatter ?
                            this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: s
                            }) : v(this.options.label) ? ba(s, this.valueFormatString, this.chart._cultureInfo) : this.label
                    } else "waterfall" === this.parent.dataSeries[r].type ? (h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataSeries.dataPointEOs[m.index].cumulativeSum) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataSeries.dataPointEOs[m.index].cumulativeSum) << 0, k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: m.dataSeries.dataPointEOs[m.index].cumulativeSum
                    }) : v(this.options.label) ? ba(m.dataSeries.dataPointEOs[m.index].cumulativeSum, this.valueFormatString, this.chart._cultureInfo) : this.label) : (h = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(m.dataPoint.y) << 0) + 0.5 : this.parent.convertValueToPixel(m.dataPoint.y) << 0, k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: m.dataPoint.y
                    }) : v(this.options.label) ? ba(m.dataPoint.y,
                        this.valueFormatString, this.chart._cultureInfo) : this.label);
                    e = g = h;
                    b = this.chart.plotArea.x1;
                    c = this.chart.plotArea.x2;
                    this.bounds = {
                        x1: b,
                        y1: e - l / 2,
                        x2: c,
                        y2: g + l / 2
                    };
                    k.y = g + k.fontSize / 2 - k.measureText().height / 2 + 2;
                    k.y - k.fontSize / 2 < this.chart.bounds.y1 ? k.y = this.chart.bounds.y1 + k.fontSize / 2 + 2 : k.y + k.measureText().height - k.fontSize / 2 > this.chart.bounds.y2 && (k.y = this.chart.bounds.y2 - k.measureText().height + k.fontSize / 2);
                    "left" === this.parent._position ? k.x = this.parent.lineCoordinates.x2 - k.measureText().width : "right" ===
                        this.parent._position && (k.x = this.parent.lineCoordinates.x2)
                }
                h = null;
                ("bottom" === this.parent._position || "top" === this.parent._position) && (b >= this.parent.convertValueToPixel(this.parent.viewportMinimum) && c <= this.parent.convertValueToPixel(this.parent.viewportMaximum)) && (0 < l && (p.moveTo(b, e), p.lineTo(c, g), p.stroke()), p.restore(), !v(k.text) && ("number" === typeof k.text.valueOf() || 0 < k.text.length) && k.render(!0));
                ("left" === this.parent._position || "right" === this.parent._position) && (g >= this.parent.convertValueToPixel(this.parent.viewportMaximum) &&
                    e <= this.parent.convertValueToPixel(this.parent.viewportMinimum)) && (0 < l && (p.moveTo(b, e), p.lineTo(c, g), p.stroke()), p.restore(), !v(k.text) && ("number" === typeof k.text.valueOf() || 0 < k.text.length) && k.render(!0))
            } else {
                if ("bottom" === this.parent._position || "top" === this.parent._position) b = c = h = 1 === p.lineWidth % 2 ? (a << 0) + 0.5 : a << 0, e = this.chart.plotArea.y1, g = this.chart.plotArea.y2, this.bounds = {
                    x1: b - l / 2,
                    y1: e,
                    x2: c + l / 2,
                    y2: g
                };
                else if ("left" === this.parent._position || "right" === this.parent._position) e = g = h = 1 === p.lineWidth %
                    2 ? (d << 0) + 0.5 : d << 0, b = this.chart.plotArea.x1, c = this.chart.plotArea.x2, this.bounds = {
                        x1: b,
                        y1: e - l / 2,
                        x2: c,
                        y2: g + l / 2
                    };
                if ("xySwapped" === this.chart.plotInfo.axisPlacement)
                    if ("left" === this.parent._position || "right" === this.parent._position) {
                        s = !1;
                        if (this.parent.labels)
                            for (h = Math.ceil(this.parent.interval), n = 0; n < this.parent.viewportMaximum; n += h)
                                if (this.parent.labels[n]) s = !0;
                                else {
                                    s = !1;
                                    break
                                }
                        if (s) {
                            if ("axisX" === this.parent.type)
                                for (n = this.parent.convertPixelToValue({
                                        y: d
                                    }), f = null, r = 0; r < this.parent.dataSeries.length; r++)(f =
                                    this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index && (k.text = this.labelFormatter ? this.labelFormatter({
                                    chart: this.chart,
                                    axis: this.parent.options,
                                    crosshair: this.options,
                                    value: this.parent.convertPixelToValue(a)
                                }) : v(this.options.label) ? f.dataPoint.label : this.label)
                        } else "dateTime" === this.parent.valueType ? k.text = this.labelFormatter ? this.labelFormatter({
                            chart: this.chart,
                            axis: this.parent.options,
                            crosshair: this.options,
                            value: this.parent.convertPixelToValue(d)
                        }) : v(this.options.label) ? Ca(this.parent.convertPixelToValue(d),
                            this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (k.text = this.labelFormatter ? this.labelFormatter({
                            chart: this.chart,
                            axis: this.parent.options,
                            crosshair: this.options,
                            value: this.parent.convertPixelToValue(d)
                        }) : v(this.options.label) ? ba(this.parent.convertPixelToValue(d), this.valueFormatString, this.chart._cultureInfo) : this.label);
                        k.y = d + k.fontSize / 2 - k.measureText().height / 2 + 2;
                        k.y - k.fontSize / 2 < this.chart.bounds.y1 ? k.y = this.chart.bounds.y1 + k.fontSize / 2 + 2 : k.y + k.measureText().height -
                            k.fontSize / 2 > this.chart.bounds.y2 && (k.y = this.chart.bounds.y2 - k.measureText().height + k.fontSize / 2);
                        "left" === this.parent._position ? k.x = this.parent.lineCoordinates.x1 - k.measureText().width : "right" === this.parent._position && (k.x = this.parent.lineCoordinates.x2)
                    } else {
                        if ("bottom" === this.parent._position || "top" === this.parent._position) k.text = this.labelFormatter ? this.labelFormatter({
                                chart: this.chart,
                                axis: this.parent.options,
                                crosshair: this.options,
                                value: this.parent.convertPixelToValue(a)
                            }) : v(this.options.label) ?
                            ba(this.parent.convertPixelToValue(a), this.valueFormatString, this.chart._cultureInfo) : this.label, k.x = b - k.measureText().width / 2, k.x + k.width > this.chart.bounds.x2 && (k.x = this.chart.bounds.x2 - k.width), k.x < this.chart.bounds.x1 && (k.x = this.chart.bounds.x1), "bottom" === this.parent._position && (k.y = this.parent.lineCoordinates.y2 + k.fontSize / 2 + 2), "top" === this.parent._position && (k.y = this.parent.lineCoordinates.y1 - k.height + k.fontSize / 2 + 2)
                    } else if ("bottom" === this.parent._position || "top" === this.parent._position) {
                    s = !1;
                    m = "";
                    if (this.parent.labels)
                        for (h = Math.ceil(this.parent.interval), n = 0; n < this.parent.viewportMaximum; n += h)
                            if (this.parent.labels[n]) s = !0;
                            else {
                                s = !1;
                                break
                            }
                    if (s) {
                        if ("axisX" === this.parent.type)
                            for (n = this.parent.convertPixelToValue({
                                    x: a
                                }), f = null, r = 0; r < this.parent.dataSeries.length; r++)(f = this.parent.dataSeries[r].getDataPointAtX(n, !0)) && 0 <= f.index && (k.text = this.labelFormatter ? this.labelFormatter({
                                    chart: this.chart,
                                    axis: this.parent.options,
                                    crosshair: this.options,
                                    value: this.parent.convertPixelToValue(a)
                                }) :
                                v(this.options.label) ? f.dataPoint.label : this.label)
                    } else "dateTime" === this.parent.valueType ? k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: this.parent.convertPixelToValue(a)
                    }) : v(this.options.label) ? Ca(this.parent.convertPixelToValue(a), this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: 0 < this.parent.dataSeries.length ? this.parent.convertPixelToValue(a) : ""
                    }) : v(this.options.label) ? ba(this.parent.convertPixelToValue(a), this.valueFormatString, this.chart._cultureInfo) : this.label);
                    k.x = b - k.measureText().width / 2;
                    k.x + k.width > this.chart.bounds.x2 && (k.x = this.chart.bounds.x2 - k.width);
                    k.x < this.chart.bounds.x1 && (k.x = this.chart.bounds.x1);
                    "bottom" === this.parent._position ? k.y = this.parent.lineCoordinates.y2 + k.fontSize / 2 + 2 : "top" === this.parent._position && (k.y = this.parent.lineCoordinates.y1 - k.height +
                        k.fontSize / 2 + 2)
                } else if ("left" === this.parent._position || "right" === this.parent._position) k.text = this.labelFormatter ? this.labelFormatter({
                        chart: this.chart,
                        axis: this.parent.options,
                        crosshair: this.options,
                        value: this.parent.convertPixelToValue(d)
                    }) : v(this.options.label) ? ba(this.parent.convertPixelToValue(d), this.valueFormatString, this.chart._cultureInfo) : this.label, k.y = d + k.fontSize / 2 - k.measureText().height / 2 + 2, k.y - k.fontSize / 2 < this.chart.bounds.y1 ? k.y = this.chart.bounds.y1 + k.fontSize / 2 + 2 : k.y + k.measureText().height -
                    k.fontSize / 2 > this.chart.bounds.y2 && (k.y = this.chart.bounds.y2 - k.measureText().height + k.fontSize / 2), "left" === this.parent._position ? k.x = this.parent.lineCoordinates.x2 - k.measureText().width : "right" === this.parent._position && (k.x = this.parent.lineCoordinates.x2);
                0 < l && (p.moveTo(b, e), p.lineTo(c, g), p.stroke());
                p.restore();
                !v(k.text) && ("number" === typeof k.text.valueOf() || 0 < k.text.length) && k.render(!0)
            }
            p.globalAlpha = q
        };
        qa($, V);
        $.prototype._initialize = function() {
            if (this.enabled) {
                this.container = document.createElement("div");
                this.container.setAttribute("class", "canvasjs-chart-tooltip");
                this.container.style.position = "absolute";
                this.container.style.height = "auto";
                this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
                this.container.style.zIndex = "1000";
                this.container.style.pointerEvents = "none";
                this.container.style.display = "none";
                var a;
                a = '<div style=" width: auto;height: auto;min-width: 50px;';
                a += "line-height: auto;";
                a += "margin: 0px 0px 0px 0px;";
                a += "padding: 5px;";
                a += "font-family: Calibri, Arial, Georgia, serif;";
                a += "font-weight: normal;";
                a += "font-style: " + (r ? "italic;" : "normal;");
                a += "font-size: 14px;";
                a += "color: #000000;";
                a += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
                a += "text-align: left;";
                a += "border: 2px solid gray;";
                a += r ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";
                a += "text-indent: 0px;";
                a += "white-space: nowrap;";
                a += "border-radius: 5px;";
                a += "-moz-user-select:none;";
                a += "-khtml-user-select: none;";
                a += "-webkit-user-select: none;";
                a += "-ms-user-select: none;";
                a += "user-select: none;";
                r || (a += "filter: alpha(opacity = 90);", a += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');");
                a += '} "> Sample Tooltip</div>';
                this.container.innerHTML = a;
                this.contentDiv = this.container.firstChild;
                this.container.style.borderRadius = this.contentDiv.style.borderRadius;
                this.chart._canvasJSContainer.appendChild(this.container)
            }
        };
        $.prototype.mouseMoveHandler = function(a, d) {
            this._lastUpdated && 4 > (new Date).getTime() - this._lastUpdated || (this._lastUpdated = (new Date).getTime(),
                this.chart.resetOverlayedCanvas(), this._updateToolTip(a, d))
        };
        $.prototype._updateToolTip = function(a, d, b) {
            b = "undefined" === typeof b ? !0 : b;
            this.container || this._initialize();
            this.enabled || this.hide();
            if (!this.chart.disableToolTip) {
                if ("undefined" === typeof a || "undefined" === typeof d) {
                    if (isNaN(this._prevX) || isNaN(this._prevY)) return;
                    a = this._prevX;
                    d = this._prevY
                } else this._prevX = a, this._prevY = d;
                var c = null,
                    e = null,
                    g = [],
                    h = 0;
                if (this.shared && this.enabled && "none" !== this.chart.plotInfo.axisPlacement) {
                    if ("xySwapped" ===
                        this.chart.plotInfo.axisPlacement) {
                        var k = [];
                        if (this.chart.axisX)
                            for (var m = 0; m < this.chart.axisX.length; m++) {
                                for (var h = this.chart.axisX[m].convertPixelToValue({
                                        y: d
                                    }), l = null, c = 0; c < this.chart.axisX[m].dataSeries.length; c++)(l = this.chart.axisX[m].dataSeries[c].getDataPointAtX(h, b)) && 0 <= l.index && (l.dataSeries = this.chart.axisX[m].dataSeries[c], null !== l.dataPoint.y && k.push(l));
                                l = null
                            }
                        if (this.chart.axisX2)
                            for (m = 0; m < this.chart.axisX2.length; m++) {
                                h = this.chart.axisX2[m].convertPixelToValue({
                                    y: d
                                });
                                l = null;
                                for (c =
                                    0; c < this.chart.axisX2[m].dataSeries.length; c++)(l = this.chart.axisX2[m].dataSeries[c].getDataPointAtX(h, b)) && 0 <= l.index && (l.dataSeries = this.chart.axisX2[m].dataSeries[c], null !== l.dataPoint.y && k.push(l));
                                l = null
                            }
                    } else {
                        k = [];
                        if (this.chart.axisX)
                            for (m = 0; m < this.chart.axisX.length; m++)
                                for (h = this.chart.axisX[m].convertPixelToValue({
                                        x: a
                                    }), l = null, c = 0; c < this.chart.axisX[m].dataSeries.length; c++)(l = this.chart.axisX[m].dataSeries[c].getDataPointAtX(h, b)) && 0 <= l.index && (l.dataSeries = this.chart.axisX[m].dataSeries[c],
                                    null !== l.dataPoint.y && k.push(l));
                        if (this.chart.axisX2)
                            for (m = 0; m < this.chart.axisX2.length; m++)
                                for (h = this.chart.axisX2[m].convertPixelToValue({
                                        x: a
                                    }), l = null, c = 0; c < this.chart.axisX2[m].dataSeries.length; c++)(l = this.chart.axisX2[m].dataSeries[c].getDataPointAtX(h, b)) && 0 <= l.index && (l.dataSeries = this.chart.axisX2[m].dataSeries[c], null !== l.dataPoint.y && k.push(l))
                    }
                    if (0 === k.length) return;
                    k.sort(function(a, b) {
                        return a.distance - b.distance
                    });
                    b = k[0];
                    for (c = 0; c < k.length; c++) k[c].dataPoint.x.valueOf() === b.dataPoint.x.valueOf() &&
                        g.push(k[c]);
                    k = null
                } else {
                    if (l = this.chart.getDataPointAtXY(a, d, b)) this.currentDataPointIndex = l.dataPointIndex, this.currentSeriesIndex = l.dataSeries.index;
                    else if (r)
                        if (l = ab(a, d, this.chart._eventManager.ghostCtx), 0 < l && "undefined" !== typeof this.chart._eventManager.objectMap[l]) {
                            l = this.chart._eventManager.objectMap[l];
                            if ("legendItem" === l.objectType) return;
                            this.currentSeriesIndex = l.dataSeriesIndex;
                            this.currentDataPointIndex = 0 <= l.dataPointIndex ? l.dataPointIndex : -1
                        } else this.currentDataPointIndex = -1;
                    else this.currentDataPointIndex = -1;
                    if (0 <= this.currentSeriesIndex) {
                        e = this.chart.data[this.currentSeriesIndex];
                        l = {};
                        if (0 <= this.currentDataPointIndex) c = e.dataPoints[this.currentDataPointIndex], l.dataSeries = e, l.dataPoint = c, l.index = this.currentDataPointIndex, l.distance = Math.abs(c.x - h), "waterfall" === e.type && (l.cumulativeSumYStartValue = e.dataPointEOs[this.currentDataPointIndex].cumulativeSumYStartValue, l.cumulativeSum = e.dataPointEOs[this.currentDataPointIndex].cumulativeSum);
                        else {
                            if (!this.enabled || "line" !== e.type && "stepLine" !== e.type &&
                                "spline" !== e.type && "area" !== e.type && "stepArea" !== e.type && "splineArea" !== e.type && "stackedArea" !== e.type && "stackedArea100" !== e.type && "rangeArea" !== e.type && "rangeSplineArea" !== e.type && "candlestick" !== e.type && "ohlc" !== e.type && "boxAndWhisker" !== e.type) return;
                            h = e.axisX.convertPixelToValue({
                                x: a
                            });
                            l = e.getDataPointAtX(h, b);
                            v(l) || (l.dataSeries = e, this.currentDataPointIndex = l.index, c = l.dataPoint)
                        }
                        if (!v(l) && !v(l.dataPoint) && !v(l.dataPoint.y))
                            if (l.dataSeries.axisY)
                                if (0 < l.dataPoint.y.length) {
                                    for (c = b = 0; c < l.dataPoint.y.length; c++) l.dataPoint.y[c] <
                                        l.dataSeries.axisY.viewportMinimum ? b-- : l.dataPoint.y[c] > l.dataSeries.axisY.viewportMaximum && b++;
                                    b < l.dataPoint.y.length && b > -l.dataPoint.y.length && g.push(l)
                                } else "column" === e.type || "bar" === e.type ? 0 > l.dataPoint.y ? 0 > l.dataSeries.axisY.viewportMinimum && l.dataSeries.axisY.viewportMaximum >= l.dataPoint.y && g.push(l) : l.dataSeries.axisY.viewportMinimum <= l.dataPoint.y && 0 <= l.dataSeries.axisY.viewportMaximum && g.push(l) : "bubble" === e.type ? (b = this.chart._eventManager.objectMap[e.dataPointIds[l.index]].size / 2, l.dataPoint.y >=
                                    l.dataSeries.axisY.viewportMinimum - b && l.dataPoint.y <= l.dataSeries.axisY.viewportMaximum + b && g.push(l)) : "waterfall" === e.type ? (b = 0, l.cumulativeSumYStartValue < l.dataSeries.axisY.viewportMinimum ? b-- : l.cumulativeSumYStartValue > l.dataSeries.axisY.viewportMaximum && b++, l.cumulativeSum < l.dataSeries.axisY.viewportMinimum ? b-- : l.cumulativeSum > l.dataSeries.axisY.viewportMaximum && b++, 2 > b && -2 < b && g.push(l)) : (0 <= l.dataSeries.type.indexOf("100") || "stackedColumn" === e.type || "stackedBar" === e.type || l.dataPoint.y >= l.dataSeries.axisY.viewportMinimum &&
                                    l.dataPoint.y <= l.dataSeries.axisY.viewportMaximum) && g.push(l);
                        else g.push(l)
                    }
                }
                if (0 < g.length) {
                    if (this.highlightObjects(g), this.enabled)
                        if (b = "", b = this.getToolTipInnerHTML({
                                entries: g
                            }), null !== b) {
                            this.contentDiv.innerHTML = b;
                            b = !1;
                            "none" === this.container.style.display && (b = !0, this.container.style.display = "block");
                            try {
                                this.contentDiv.style.background = this.backgroundColor ? this.backgroundColor : r ? "rgba(255,255,255,.9)" : "rgb(255,255,255)", this.borderColor = "waterfall" === g[0].dataSeries.type ? this.contentDiv.style.borderRightColor =
                                    this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : g[0].dataPoint.color ? g[0].dataPoint.color : 0 < g[0].dataPoint.y ? g[0].dataSeries.risingColor : g[0].dataSeries.fallingColor : "error" === g[0].dataSeries.type ? this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : g[0].dataSeries.color ? g[0].dataSeries.color : g[0].dataSeries._colorSet[e.index %
                                        g[0].dataSeries._colorSet.length] : this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : g[0].dataPoint.color ? g[0].dataPoint.color : g[0].dataSeries.color ? g[0].dataSeries.color : g[0].dataSeries._colorSet[g[0].index % g[0].dataSeries._colorSet.length], this.contentDiv.style.borderWidth = this.borderThickness || 0 === this.borderThickness ? this.borderThickness + "px" : "2px", this.contentDiv.style.borderRadius = this.cornerRadius ||
                                    0 === this.cornerRadius ? this.cornerRadius + "px" : "5px", this.container.style.borderRadius = this.contentDiv.style.borderRadius, this.contentDiv.style.fontSize = this.fontSize || 0 === this.fontSize ? this.fontSize + "px" : "14px", this.contentDiv.style.color = this.fontColor ? this.fontColor : "#000000", this.contentDiv.style.fontFamily = this.fontFamily ? this.fontFamily : "Calibri, Arial, Georgia, serif;", this.contentDiv.style.fontWeight = this.fontWeight ? this.fontWeight : "normal", this.contentDiv.style.fontStyle = this.fontStyle ? this.fontStyle :
                                    r ? "italic" : "normal"
                            } catch (p) {}
                            "pie" === g[0].dataSeries.type || "doughnut" === g[0].dataSeries.type || "funnel" === g[0].dataSeries.type || "pyramid" === g[0].dataSeries.type || "bar" === g[0].dataSeries.type || "rangeBar" === g[0].dataSeries.type || "stackedBar" === g[0].dataSeries.type || "stackedBar100" === g[0].dataSeries.type ? a = a - 10 - this.container.clientWidth : (a = g[0].dataSeries.axisX.convertValueToPixel(g[0].dataPoint.x) - this.container.clientWidth << 0, a -= 10);
                            0 > a && (a += this.container.clientWidth + 20);
                            a + this.container.clientWidth >
                                Math.max(this.chart.container.clientWidth, this.chart.width) && (a = Math.max(0, Math.max(this.chart.container.clientWidth, this.chart.width) - this.container.clientWidth));
                            d = 1 !== g.length || this.shared || "line" !== g[0].dataSeries.type && "stepLine" !== g[0].dataSeries.type && "spline" !== g[0].dataSeries.type && "area" !== g[0].dataSeries.type && "stepArea" !== g[0].dataSeries.type && "splineArea" !== g[0].dataSeries.type ? "bar" === g[0].dataSeries.type || "rangeBar" === g[0].dataSeries.type || "stackedBar" === g[0].dataSeries.type || "stackedBar100" ===
                                g[0].dataSeries.type ? g[0].dataSeries.axisX.convertValueToPixel(g[0].dataPoint.x) : d : g[0].dataSeries.axisY.convertValueToPixel(g[0].dataPoint.y);
                            d = -d + 10;
                            0 < d + this.container.clientHeight + 5 && (d -= d + this.container.clientHeight + 5 - 0);
                            this.fixMozTransitionDelay(a, d);
                            !this.animationEnabled || b ? this.disableAnimation() : (this.enableAnimation(), this.container.style.MozTransition = this.mozContainerTransition);
                            this.container.style.left = a + "px";
                            this.container.style.bottom = d + "px"
                        } else this.hide(!1)
                } else this.hide()
            }
        };
        $.prototype.highlightObjects = function(a) {
            var d = this.chart.overlaidCanvasCtx;
            this.chart.resetOverlayedCanvas();
            d.clearRect(0, 0, this.chart.width, this.chart.height);
            d.save();
            var b = this.chart.plotArea,
                c = 0;
            d.beginPath();
            d.rect(b.x1, b.y1, b.x2 - b.x1, b.y2 - b.y1);
            d.clip();
            for (b = 0; b < a.length; b++) {
                var e = a[b];
                if ((e = this.chart._eventManager.objectMap[e.dataSeries.dataPointIds[e.index]]) && e.objectType && "dataPoint" === e.objectType) {
                    var c = this.chart.data[e.dataSeriesIndex],
                        g = c.dataPoints[e.dataPointIndex],
                        h = e.dataPointIndex;
                    !1 === g.highlightEnabled || !0 !== c.highlightEnabled && !0 !== g.highlightEnabled || ("line" === c.type || "stepLine" === c.type || "spline" === c.type || "scatter" === c.type || "area" === c.type || "stepArea" === c.type || "splineArea" === c.type || "stackedArea" === c.type || "stackedArea100" === c.type || "rangeArea" === c.type || "rangeSplineArea" === c.type ? (g = c.getMarkerProperties(h, e.x1, e.y1, this.chart.overlaidCanvasCtx), g.size = Math.max(1.5 * g.size << 0, 10), g.borderColor = g.borderColor || "#FFFFFF", g.borderThickness = g.borderThickness || Math.ceil(0.1 *
                            g.size), ia.drawMarkers([g]), "undefined" !== typeof e.y2 && (g = c.getMarkerProperties(h, e.x1, e.y2, this.chart.overlaidCanvasCtx), g.size = Math.max(1.5 * g.size << 0, 10), g.borderColor = g.borderColor || "#FFFFFF", g.borderThickness = g.borderThickness || Math.ceil(0.1 * g.size), ia.drawMarkers([g]))) : "bubble" === c.type ? (g = c.getMarkerProperties(h, e.x1, e.y1, this.chart.overlaidCanvasCtx), g.size = e.size, g.color = "white", g.borderColor = "white", d.globalAlpha = 0.3, ia.drawMarkers([g]), d.globalAlpha = 1) : "column" === c.type || "stackedColumn" ===
                        c.type || "stackedColumn100" === c.type || "bar" === c.type || "rangeBar" === c.type || "stackedBar" === c.type || "stackedBar100" === c.type || "rangeColumn" === c.type || "waterfall" === c.type ? ea(d, e.x1, e.y1, e.x2, e.y2, "white", 0, null, !1, !1, !1, !1, 0.3) : "pie" === c.type || "doughnut" === c.type ? ja(d, e.center, e.radius, "white", c.type, e.startAngle, e.endAngle, 0.3, e.percentInnerRadius) : "funnel" === c.type || "pyramid" === c.type ? ra(d, e.funnelSection, 0.3, "white") : "candlestick" === c.type ? (d.globalAlpha = 1, d.strokeStyle = e.color, d.lineWidth = 2 * e.borderThickness,
                            c = 0 === d.lineWidth % 2 ? 0 : 0.5, d.beginPath(), d.moveTo(e.x3 - c, Math.min(e.y2, e.y3)), d.lineTo(e.x3 - c, Math.min(e.y1, e.y4)), d.stroke(), d.beginPath(), d.moveTo(e.x3 - c, Math.max(e.y1, e.y4)), d.lineTo(e.x3 - c, Math.max(e.y2, e.y3)), d.stroke(), ea(d, e.x1, Math.min(e.y1, e.y4), e.x2, Math.max(e.y1, e.y4), "transparent", 2 * e.borderThickness, e.color, !1, !1, !1, !1), d.globalAlpha = 1) : "ohlc" === c.type ? (d.globalAlpha = 1, d.strokeStyle = e.color, d.lineWidth = 2 * e.borderThickness, c = 0 === d.lineWidth % 2 ? 0 : 0.5, d.beginPath(), d.moveTo(e.x3 - c, e.y2), d.lineTo(e.x3 -
                            c, e.y3), d.stroke(), d.beginPath(), d.moveTo(e.x3, e.y1), d.lineTo(e.x1, e.y1), d.stroke(), d.beginPath(), d.moveTo(e.x3, e.y4), d.lineTo(e.x2, e.y4), d.stroke(), d.globalAlpha = 1) : "boxAndWhisker" === c.type ? (d.save(), d.globalAlpha = 1, d.strokeStyle = e.stemColor, d.lineWidth = 2 * e.stemThickness, 0 < e.stemThickness && (d.beginPath(), d.moveTo(e.x3, e.y2 + e.borderThickness / 2), d.lineTo(e.x3, e.y1 + e.whiskerThickness / 2), d.stroke(), d.beginPath(), d.moveTo(e.x3, e.y4 - e.whiskerThickness / 2), d.lineTo(e.x3, e.y3 - e.borderThickness / 2), d.stroke()),
                            d.beginPath(), ea(d, e.x1 - e.borderThickness / 2, Math.max(e.y2 + e.borderThickness / 2, e.y3 + e.borderThickness / 2), e.x2 + e.borderThickness / 2, Math.min(e.y2 - e.borderThickness / 2, e.y3 - e.borderThickness / 2), "transparent", e.borderThickness, e.color, !1, !1, !1, !1), d.globalAlpha = 1, d.strokeStyle = e.whiskerColor, d.lineWidth = 2 * e.whiskerThickness, 0 < e.whiskerThickness && (d.beginPath(), d.moveTo(Math.floor(e.x3 - e.whiskerLength / 2), e.y4), d.lineTo(Math.ceil(e.x3 + e.whiskerLength / 2), e.y4), d.stroke(), d.beginPath(), d.moveTo(Math.floor(e.x3 -
                                e.whiskerLength / 2), e.y1), d.lineTo(Math.ceil(e.x3 + e.whiskerLength / 2), e.y1), d.stroke()), d.globalAlpha = 1, d.strokeStyle = e.lineColor, d.lineWidth = 2 * e.lineThickness, 0 < e.lineThickness && (d.beginPath(), d.moveTo(e.x1, e.y5), d.lineTo(e.x2, e.y5), d.stroke()), d.restore(), d.globalAlpha = 1) : "error" === c.type && E(d, e.x1, e.y1, e.x2, e.y2, "white", e.whiskerProperties, e.stemProperties, e.isXYSwapped, 0.3))
                }
            }
            d.restore();
            d.globalAlpha = 1;
            d.beginPath()
        };
        $.prototype.getToolTipInnerHTML = function(a) {
            a = a.entries;
            for (var d = null, b = null,
                    c = null, e = 0, g = "", h = !0, k = 0; k < a.length; k++)
                if (a[k].dataSeries.toolTipContent || a[k].dataPoint.toolTipContent) {
                    h = !1;
                    break
                }
            if (h && (this.content && "function" === typeof this.content || this.contentFormatter)) a = {
                chart: this.chart,
                toolTip: this.options,
                entries: a
            }, d = this.contentFormatter ? this.contentFormatter(a) : this.content(a);
            else if (this.shared && "none" !== this.chart.plotInfo.axisPlacement) {
                for (var m = null, l = "", k = 0; k < a.length; k++) b = a[k].dataSeries, c = a[k].dataPoint, e = a[k].index, g = "", 0 === k && (h && !this.content) && (this.chart.axisX &&
                    0 < this.chart.axisX.length ? l += "undefined" !== typeof this.chart.axisX[0].labels[c.x] ? this.chart.axisX[0].labels[c.x] : "{x}" : this.chart.axisX2 && 0 < this.chart.axisX2.length && (l += "undefined" !== typeof this.chart.axisX2[0].labels[c.x] ? this.chart.axisX2[0].labels[c.x] : "{x}"), l += "</br>", l = this.chart.replaceKeywordsWithValue(l, c, b, e)), null === c.toolTipContent || "undefined" === typeof c.toolTipContent && null === b.options.toolTipContent || ("line" === b.type || "stepLine" === b.type || "spline" === b.type || "area" === b.type || "stepArea" ===
                    b.type || "splineArea" === b.type || "column" === b.type || "bar" === b.type || "scatter" === b.type || "stackedColumn" === b.type || "stackedColumn100" === b.type || "stackedBar" === b.type || "stackedBar100" === b.type || "stackedArea" === b.type || "stackedArea100" === b.type || "waterfall" === b.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (g += m != b.axisXIndex ? b.axisX.title ? b.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), g += c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ?
                        this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y}", m = b.axisXIndex) : "bubble" === b.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (g += m != b.axisXIndex ? b.axisX.title ? b.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), g += c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}") :
                    "rangeColumn" === b.type || "rangeBar" === b.type || "rangeArea" === b.type || "rangeSplineArea" === b.type || "error" === b.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (g += m != b.axisXIndex ? b.axisX.title ? b.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), g += c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}") : "candlestick" ===
                    b.type || "ohlc" === b.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (g += m != b.axisXIndex ? b.axisX.title ? b.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), g += c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}") : "boxAndWhisker" ===
                    b.type && (this.chart.axisX && 1 < this.chart.axisX.length && (g += m != b.axisXIndex ? b.axisX.title ? b.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), g += c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span><br/>Minimum: &nbsp;&nbsp;{y[0]}<br/>Q1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[1]}<br/>Q2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[4]}<br/>Q3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Maximum: &nbsp;{y[3]}"),
                    null === d && (d = ""), !0 === this.reversed ? (d = this.chart.replaceKeywordsWithValue(g, c, b, e) + d, k < a.length - 1 && (d = "</br>" + d)) : (d += this.chart.replaceKeywordsWithValue(g, c, b, e), k < a.length - 1 && (d += "</br>")));
                null !== d && (d = l + d)
            } else {
                b = a[0].dataSeries;
                c = a[0].dataPoint;
                e = a[0].index;
                if (null === c.toolTipContent || "undefined" === typeof c.toolTipContent && null === b.options.toolTipContent) return null;
                "line" === b.type || "stepLine" === b.type || "spline" === b.type || "area" === b.type || "stepArea" === b.type || "splineArea" === b.type || "column" ===
                    b.type || "bar" === b.type || "scatter" === b.type || "stackedColumn" === b.type || "stackedColumn100" === b.type || "stackedBar" === b.type || "stackedBar100" === b.type || "stackedArea" === b.type || "stackedArea100" === b.type || "waterfall" === b.type ? g = c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (c.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}" : "bubble" === b.type ? g = c.toolTipContent ?
                    c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (c.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}" : "pie" === b.type || "doughnut" === b.type || "funnel" === b.type || "pyramid" === b.type ? g = c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" :
                        "'color:{color};'") + "\"'>" + (c.name ? "{name}:</span>&nbsp;&nbsp;" : c.label ? "{label}:</span>&nbsp;&nbsp;" : "</span>") + "{y}" : "rangeColumn" === b.type || "rangeBar" === b.type || "rangeArea" === b.type || "rangeSplineArea" === b.type || "error" === b.type ? g = c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (c.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}" :
                    "candlestick" === b.type || "ohlc" === b.type ? g = c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (c.label ? "{label}" : "{x}") + "</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}" : "boxAndWhisker" === b.type && (g = c.toolTipContent ? c.toolTipContent : b.toolTipContent ? b.toolTipContent :
                        this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (c.label ? "{label}" : "{x}") + "</span><br/>Minimum: &nbsp;&nbsp;{y[0]}<br/>Q1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[1]}<br/>Q2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[4]}<br/>Q3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Maximum: &nbsp;{y[3]}");
                null === d && (d = "");
                d += this.chart.replaceKeywordsWithValue(g, c, b, e)
            }
            return d
        };
        $.prototype.enableAnimation = function() {
            if (!this.container.style.WebkitTransition) {
                var a = this.getContainerTransition(this.containerTransitionDuration);
                this.container.style.WebkitTransition = a;
                this.container.style.MsTransition = a;
                this.container.style.transition = a;
                this.container.style.MozTransition = this.mozContainerTransition
            }
        };
        $.prototype.disableAnimation = function() {
            this.container.style.WebkitTransition && (this.container.style.WebkitTransition =
                "", this.container.style.MozTransition = "", this.container.style.MsTransition = "", this.container.style.transition = "")
        };
        $.prototype.hide = function(a) {
            this.container && (this.container.style.display = "none", this.currentSeriesIndex = -1, this._prevY = this._prevX = NaN, ("undefined" === typeof a || a) && this.chart.resetOverlayedCanvas())
        };
        $.prototype.show = function(a, d, b) {
            this._updateToolTip(a, d, "undefined" === typeof b ? !1 : b)
        };
        $.prototype.fixMozTransitionDelay = function(a, d) {
            if (20 < this.chart._eventManager.lastObjectId) this.mozContainerTransition =
                this.getContainerTransition(0);
            else {
                var b = parseFloat(this.container.style.left),
                    b = isNaN(b) ? 0 : b,
                    c = parseFloat(this.container.style.bottom),
                    c = isNaN(c) ? 0 : c;
                10 < Math.sqrt(Math.pow(b - a, 2) + Math.pow(c - d, 2)) ? this.mozContainerTransition = this.getContainerTransition(0.1) : this.mozContainerTransition = this.getContainerTransition(0)
            }
        };
        $.prototype.getContainerTransition = function(a) {
            return "left " + a + "s ease-out 0s, bottom " + a + "s ease-out 0s"
        };
        ha.prototype.reset = function() {
            this.lastObjectId = 0;
            this.objectMap = [];
            this.rectangularRegionEventSubscriptions = [];
            this.previousDataPointEventObject = null;
            this.eventObjects = [];
            r && (this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height), this.ghostCtx.beginPath())
        };
        ha.prototype.getNewObjectTrackingId = function() {
            return ++this.lastObjectId
        };
        ha.prototype.mouseEventHandler = function(a) {
            if ("mousemove" === a.type || "click" === a.type) {
                var d = [],
                    b = Ra(a),
                    c = null;
                if ((c = this.chart.getObjectAtXY(b.x, b.y, !1)) && "undefined" !== typeof this.objectMap[c])
                    if (c = this.objectMap[c], "dataPoint" === c.objectType) {
                        var e = this.chart.data[c.dataSeriesIndex],
                            g = e.dataPoints[c.dataPointIndex],
                            h = c.dataPointIndex;
                        c.eventParameter = {
                            x: b.x,
                            y: b.y,
                            dataPoint: g,
                            dataSeries: e.options,
                            dataPointIndex: h,
                            dataSeriesIndex: e.index,
                            chart: this.chart
                        };
                        c.eventContext = {
                            context: g,
                            userContext: g,
                            mouseover: "mouseover",
                            mousemove: "mousemove",
                            mouseout: "mouseout",
                            click: "click"
                        };
                        d.push(c);
                        c = this.objectMap[e.id];
                        c.eventParameter = {
                            x: b.x,
                            y: b.y,
                            dataPoint: g,
                            dataSeries: e.options,
                            dataPointIndex: h,
                            dataSeriesIndex: e.index,
                            chart: this.chart
                        };
                        c.eventContext = {
                            context: e,
                            userContext: e.options,
                            mouseover: "mouseover",
                            mousemove: "mousemove",
                            mouseout: "mouseout",
                            click: "click"
                        };
                        d.push(this.objectMap[e.id])
                    } else "legendItem" === c.objectType && (e = this.chart.data[c.dataSeriesIndex], g = null !== c.dataPointIndex ? e.dataPoints[c.dataPointIndex] : null, c.eventParameter = {
                        x: b.x,
                        y: b.y,
                        dataSeries: e.options,
                        dataPoint: g,
                        dataPointIndex: c.dataPointIndex,
                        dataSeriesIndex: c.dataSeriesIndex,
                        chart: this.chart
                    }, c.eventContext = {
                        context: this.chart.legend,
                        userContext: this.chart.legend.options,
                        mouseover: "itemmouseover",
                        mousemove: "itemmousemove",
                        mouseout: "itemmouseout",
                        click: "itemclick"
                    }, d.push(c));
                e = [];
                for (b = 0; b < this.mouseoveredObjectMaps.length; b++) {
                    g = !0;
                    for (c = 0; c < d.length; c++)
                        if (d[c].id === this.mouseoveredObjectMaps[b].id) {
                            g = !1;
                            break
                        }
                    g ? this.fireEvent(this.mouseoveredObjectMaps[b], "mouseout", a) : e.push(this.mouseoveredObjectMaps[b])
                }
                this.mouseoveredObjectMaps = e;
                for (b = 0; b < d.length; b++) {
                    e = !1;
                    for (c = 0; c < this.mouseoveredObjectMaps.length; c++)
                        if (d[b].id === this.mouseoveredObjectMaps[c].id) {
                            e = !0;
                            break
                        }
                    e || (this.fireEvent(d[b], "mouseover", a), this.mouseoveredObjectMaps.push(d[b]));
                    "click" === a.type ? this.fireEvent(d[b], "click", a) : "mousemove" === a.type && this.fireEvent(d[b], "mousemove", a)
                }
            }
        };
        ha.prototype.fireEvent = function(a, d, b) {
            if (a && d) {
                var c = a.eventParameter,
                    e = a.eventContext,
                    g = a.eventContext.userContext;
                g && (e && g[e[d]]) && g[e[d]].call(g, c);
                "mouseout" !== d ? g.cursor && g.cursor !== b.target.style.cursor && (b.target.style.cursor = g.cursor) : (b.target.style.cursor = this.chart._defaultCursor, delete a.eventParameter, delete a.eventContext);
                "click" === d && ("dataPoint" === a.objectType && this.chart.pieDoughnutClickHandler) &&
                    this.chart.pieDoughnutClickHandler.call(this.chart.data[a.dataSeriesIndex], c);
                "click" === d && ("dataPoint" === a.objectType && this.chart.funnelPyramidClickHandler) && this.chart.funnelPyramidClickHandler.call(this.chart.data[a.dataSeriesIndex], c)
            }
        };
        ga.prototype.animate = function(a, d, b, c, e) {
            var g = this;
            this.chart.isAnimating = !0;
            e = e || M.easing.linear;
            b && this.animations.push({
                startTime: (new Date).getTime() + (a ? a : 0),
                duration: d,
                animationCallback: b,
                onComplete: c
            });
            for (a = []; 0 < this.animations.length;)
                if (d = this.animations.shift(),
                    b = (new Date).getTime(), c = 0, d.startTime <= b && (c = e(Math.min(b - d.startTime, d.duration), 0, 1, d.duration), c = Math.min(c, 1), isNaN(c) || !isFinite(c)) && (c = 1), 1 > c && a.push(d), d.animationCallback(c), 1 <= c && d.onComplete) d.onComplete();
            this.animations = a;
            0 < this.animations.length ? this.animationRequestId = this.chart.requestAnimFrame.call(window, function() {
                g.animate.call(g)
            }) : this.chart.isAnimating = !1
        };
        ga.prototype.cancelAllAnimations = function() {
            this.animations = [];
            this.animationRequestId && this.chart.cancelRequestAnimFrame.call(window,
                this.animationRequestId);
            this.animationRequestId = null;
            this.chart.isAnimating = !1
        };
        var M = {
                yScaleAnimation: function(a, d) {
                    if (0 !== a) {
                        var b = d.dest,
                            c = d.source.canvas,
                            e = d.animationBase;
                        b.drawImage(c, 0, 0, c.width, c.height, 0, e - e * a, b.canvas.width / W, a * b.canvas.height / W)
                    }
                },
                xScaleAnimation: function(a, d) {
                    if (0 !== a) {
                        var b = d.dest,
                            c = d.source.canvas,
                            e = d.animationBase;
                        b.drawImage(c, 0, 0, c.width, c.height, e - e * a, 0, a * b.canvas.width / W, b.canvas.height / W)
                    }
                },
                xClipAnimation: function(a, d) {
                    if (0 !== a) {
                        var b = d.dest,
                            c = d.source.canvas;
                        b.save();
                        0 < a && b.drawImage(c, 0, 0, c.width * a, c.height, 0, 0, c.width * a / W, c.height / W);
                        b.restore()
                    }
                },
                fadeInAnimation: function(a, d) {
                    if (0 !== a) {
                        var b = d.dest,
                            c = d.source.canvas;
                        b.save();
                        b.globalAlpha = a;
                        b.drawImage(c, 0, 0, c.width, c.height, 0, 0, b.canvas.width / W, b.canvas.height / W);
                        b.restore()
                    }
                },
                easing: {
                    linear: function(a, d, b, c) {
                        return b * a / c + d
                    },
                    easeOutQuad: function(a, d, b, c) {
                        return -b * (a /= c) * (a - 2) + d
                    },
                    easeOutQuart: function(a, d, b, c) {
                        return -b * ((a = a / c - 1) * a * a * a - 1) + d
                    },
                    easeInQuad: function(a, d, b, c) {
                        return b * (a /= c) * a + d
                    },
                    easeInQuart: function(a,
                        d, b, c) {
                        return b * (a /= c) * a * a * a + d
                    }
                }
            },
            ia = {
                drawMarker: function(a, d, b, c, e, g, h, k) {
                    if (b) {
                        var m = 1;
                        b.fillStyle = g ? g : "#000000";
                        b.strokeStyle = h ? h : "#000000";
                        b.lineWidth = k ? k : 0;
                        b.setLineDash && b.setLineDash(R("solid", k));
                        "circle" === c ? (b.moveTo(a, d), b.beginPath(), b.arc(a, d, e / 2, 0, 2 * Math.PI, !1), g && b.fill(), k && (h ? b.stroke() : (m = b.globalAlpha, b.globalAlpha = 0.15, b.strokeStyle = "black", b.stroke(), b.globalAlpha = m))) : "square" === c ? (b.beginPath(), b.rect(a - e / 2, d - e / 2, e, e), g && b.fill(), k && (h ? b.stroke() : (m = b.globalAlpha, b.globalAlpha =
                            0.15, b.strokeStyle = "black", b.stroke(), b.globalAlpha = m))) : "triangle" === c ? (b.beginPath(), b.moveTo(a - e / 2, d + e / 2), b.lineTo(a + e / 2, d + e / 2), b.lineTo(a, d - e / 2), b.closePath(), g && b.fill(), k && (h ? b.stroke() : (m = b.globalAlpha, b.globalAlpha = 0.15, b.strokeStyle = "black", b.stroke(), b.globalAlpha = m)), b.beginPath()) : "cross" === c && (b.strokeStyle = g, b.lineWidth = e / 4, b.beginPath(), b.moveTo(a - e / 2, d - e / 2), b.lineTo(a + e / 2, d + e / 2), b.stroke(), b.moveTo(a + e / 2, d - e / 2), b.lineTo(a - e / 2, d + e / 2), b.stroke())
                    }
                },
                drawMarkers: function(a) {
                    for (var d =
                            0; d < a.length; d++) {
                        var b = a[d];
                        ia.drawMarker(b.x, b.y, b.ctx, b.type, b.size, b.color, b.borderColor, b.borderThickness)
                    }
                }
            };
        return m
    }();
    Na.Chart.version = "v2.3.2 GA"
})();

/*
  excanvas is used to support IE678 which do not implement HTML5 Canvas Element. You can safely remove the following excanvas code if you don't need to support older browsers.

  Copyright 2006 Google Inc. https://code.google.com/p/explorercanvas/
  Licensed under the Apache License, Version 2.0
*/
document.createElement("canvas").getContext || function() {
    function V() {
        return this.context_ || (this.context_ = new C(this))
    }

    function W(a, b, c) {
        var g = M.call(arguments, 2);
        return function() {
            return a.apply(b, g.concat(M.call(arguments)))
        }
    }

    function N(a) {
        return String(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    }

    function O(a) {
        a.namespaces.g_vml_ || a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML");
        a.namespaces.g_o_ || a.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML");
        a.styleSheets.ex_canvas_ || (a = a.createStyleSheet(), a.owningElement.id = "ex_canvas_", a.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}")
    }

    function X(a) {
        var b = a.srcElement;
        switch (a.propertyName) {
            case "width":
                b.getContext().clearRect();
                b.style.width = b.attributes.width.nodeValue + "px";
                b.firstChild.style.width = b.clientWidth + "px";
                break;
            case "height":
                b.getContext().clearRect(), b.style.height = b.attributes.height.nodeValue + "px", b.firstChild.style.height = b.clientHeight +
                    "px"
        }
    }

    function Y(a) {
        a = a.srcElement;
        a.firstChild && (a.firstChild.style.width = a.clientWidth + "px", a.firstChild.style.height = a.clientHeight + "px")
    }

    function D() {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    }

    function t(a, b) {
        for (var c = D(), g = 0; 3 > g; g++)
            for (var e = 0; 3 > e; e++) {
                for (var f = 0, d = 0; 3 > d; d++) f += a[g][d] * b[d][e];
                c[g][e] = f
            }
        return c
    }

    function P(a, b) {
        b.fillStyle = a.fillStyle;
        b.lineCap = a.lineCap;
        b.lineJoin = a.lineJoin;
        b.lineWidth = a.lineWidth;
        b.miterLimit = a.miterLimit;
        b.shadowBlur = a.shadowBlur;
        b.shadowColor = a.shadowColor;
        b.shadowOffsetX =
            a.shadowOffsetX;
        b.shadowOffsetY = a.shadowOffsetY;
        b.strokeStyle = a.strokeStyle;
        b.globalAlpha = a.globalAlpha;
        b.font = a.font;
        b.textAlign = a.textAlign;
        b.textBaseline = a.textBaseline;
        b.arcScaleX_ = a.arcScaleX_;
        b.arcScaleY_ = a.arcScaleY_;
        b.lineScale_ = a.lineScale_
    }

    function Q(a) {
        var b = a.indexOf("(", 3),
            c = a.indexOf(")", b + 1),
            b = a.substring(b + 1, c).split(",");
        if (4 != b.length || "a" != a.charAt(3)) b[3] = 1;
        return b
    }

    function E(a, b, c) {
        return Math.min(c, Math.max(b, a))
    }

    function F(a, b, c) {
        0 > c && c++;
        1 < c && c--;
        return 1 > 6 * c ? a + 6 * (b - a) * c :
            1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
    }

    function G(a) {
        if (a in H) return H[a];
        var b, c = 1;
        a = String(a);
        if ("#" == a.charAt(0)) b = a;
        else if (/^rgb/.test(a)) {
            c = Q(a);
            b = "#";
            for (var g, e = 0; 3 > e; e++) g = -1 != c[e].indexOf("%") ? Math.floor(255 * (parseFloat(c[e]) / 100)) : +c[e], b += v[E(g, 0, 255)];
            c = +c[3]
        } else if (/^hsl/.test(a)) {
            e = c = Q(a);
            b = parseFloat(e[0]) / 360 % 360;
            0 > b && b++;
            g = E(parseFloat(e[1]) / 100, 0, 1);
            e = E(parseFloat(e[2]) / 100, 0, 1);
            if (0 == g) g = e = b = e;
            else {
                var f = 0.5 > e ? e * (1 + g) : e + g - e * g,
                    d = 2 * e - f;
                g = F(d, f, b + 1 / 3);
                e = F(d, f, b);
                b = F(d, f, b - 1 / 3)
            }
            b = "#" +
                v[Math.floor(255 * g)] + v[Math.floor(255 * e)] + v[Math.floor(255 * b)];
            c = c[3]
        } else b = Z[a] || a;
        return H[a] = {
            color: b,
            alpha: c
        }
    }

    function C(a) {
        this.m_ = D();
        this.mStack_ = [];
        this.aStack_ = [];
        this.currentPath_ = [];
        this.fillStyle = this.strokeStyle = "#000";
        this.lineWidth = 1;
        this.lineJoin = "miter";
        this.lineCap = "butt";
        this.miterLimit = 1 * q;
        this.globalAlpha = 1;
        this.font = "10px sans-serif";
        this.textAlign = "left";
        this.textBaseline = "alphabetic";
        this.canvas = a;
        var b = "width:" + a.clientWidth + "px;height:" + a.clientHeight + "px;overflow:hidden;position:absolute",
            c = a.ownerDocument.createElement("div");
        c.style.cssText = b;
        a.appendChild(c);
        b = c.cloneNode(!1);
        b.style.backgroundColor = "red";
        b.style.filter = "alpha(opacity=0)";
        a.appendChild(b);
        this.element_ = c;
        this.lineScale_ = this.arcScaleY_ = this.arcScaleX_ = 1
    }

    function R(a, b, c, g) {
        a.currentPath_.push({
            type: "bezierCurveTo",
            cp1x: b.x,
            cp1y: b.y,
            cp2x: c.x,
            cp2y: c.y,
            x: g.x,
            y: g.y
        });
        a.currentX_ = g.x;
        a.currentY_ = g.y
    }

    function S(a, b) {
        var c = G(a.strokeStyle),
            g = c.color,
            c = c.alpha * a.globalAlpha,
            e = a.lineScale_ * a.lineWidth;
        1 > e && (c *= e);
        b.push("<g_vml_:stroke",
            ' opacity="', c, '"', ' joinstyle="', a.lineJoin, '"', ' miterlimit="', a.miterLimit, '"', ' endcap="', $[a.lineCap] || "square", '"', ' weight="', e, 'px"', ' color="', g, '" />')
    }

    function T(a, b, c, g) {
        var e = a.fillStyle,
            f = a.arcScaleX_,
            d = a.arcScaleY_,
            k = g.x - c.x,
            n = g.y - c.y;
        if (e instanceof w) {
            var h = 0,
                l = g = 0,
                u = 0,
                m = 1;
            if ("gradient" == e.type_) {
                h = e.x1_ / f;
                c = e.y1_ / d;
                var p = s(a, e.x0_ / f, e.y0_ / d),
                    h = s(a, h, c),
                    h = 180 * Math.atan2(h.x - p.x, h.y - p.y) / Math.PI;
                0 > h && (h += 360);
                1E-6 > h && (h = 0)
            } else p = s(a, e.x0_, e.y0_), g = (p.x - c.x) / k, l = (p.y - c.y) / n, k /= f * q,
                n /= d * q, m = x.max(k, n), u = 2 * e.r0_ / m, m = 2 * e.r1_ / m - u;
            f = e.colors_;
            f.sort(function(a, b) {
                return a.offset - b.offset
            });
            d = f.length;
            p = f[0].color;
            c = f[d - 1].color;
            k = f[0].alpha * a.globalAlpha;
            a = f[d - 1].alpha * a.globalAlpha;
            for (var n = [], r = 0; r < d; r++) {
                var t = f[r];
                n.push(t.offset * m + u + " " + t.color)
            }
            b.push('<g_vml_:fill type="', e.type_, '"', ' method="none" focus="100%"', ' color="', p, '"', ' color2="', c, '"', ' colors="', n.join(","), '"', ' opacity="', a, '"', ' g_o_:opacity2="', k, '"', ' angle="', h, '"', ' focusposition="', g, ",", l, '" />')
        } else e instanceof
        I ? k && n && b.push("<g_vml_:fill", ' position="', -c.x / k * f * f, ",", -c.y / n * d * d, '"', ' type="tile"', ' src="', e.src_, '" />') : (e = G(a.fillStyle), b.push('<g_vml_:fill color="', e.color, '" opacity="', e.alpha * a.globalAlpha, '" />'))
    }

    function s(a, b, c) {
        a = a.m_;
        return {
            x: q * (b * a[0][0] + c * a[1][0] + a[2][0]) - r,
            y: q * (b * a[0][1] + c * a[1][1] + a[2][1]) - r
        }
    }

    function z(a, b, c) {
        isFinite(b[0][0]) && (isFinite(b[0][1]) && isFinite(b[1][0]) && isFinite(b[1][1]) && isFinite(b[2][0]) && isFinite(b[2][1])) && (a.m_ = b, c && (a.lineScale_ = aa(ba(b[0][0] * b[1][1] - b[0][1] *
            b[1][0]))))
    }

    function w(a) {
        this.type_ = a;
        this.r1_ = this.y1_ = this.x1_ = this.r0_ = this.y0_ = this.x0_ = 0;
        this.colors_ = []
    }

    function I(a, b) {
        if (!a || 1 != a.nodeType || "IMG" != a.tagName) throw new A("TYPE_MISMATCH_ERR");
        if ("complete" != a.readyState) throw new A("INVALID_STATE_ERR");
        switch (b) {
            case "repeat":
            case null:
            case "":
                this.repetition_ = "repeat";
                break;
            case "repeat-x":
            case "repeat-y":
            case "no-repeat":
                this.repetition_ = b;
                break;
            default:
                throw new A("SYNTAX_ERR");
        }
        this.src_ = a.src;
        this.width_ = a.width;
        this.height_ = a.height
    }

    function A(a) {
        this.code = this[a];
        this.message = a + ": DOM Exception " + this.code
    }
    var x = Math,
        k = x.round,
        J = x.sin,
        K = x.cos,
        ba = x.abs,
        aa = x.sqrt,
        q = 10,
        r = q / 2;
    navigator.userAgent.match(/MSIE ([\d.]+)?/);
    var M = Array.prototype.slice;
    O(document);
    var U = {
        init: function(a) {
            a = a || document;
            a.createElement("canvas");
            a.attachEvent("onreadystatechange", W(this.init_, this, a))
        },
        init_: function(a) {
            a = a.getElementsByTagName("canvas");
            for (var b = 0; b < a.length; b++) this.initElement(a[b])
        },
        initElement: function(a) {
            if (!a.getContext) {
                a.getContext =
                    V;
                O(a.ownerDocument);
                a.innerHTML = "";
                a.attachEvent("onpropertychange", X);
                a.attachEvent("onresize", Y);
                var b = a.attributes;
                b.width && b.width.specified ? a.style.width = b.width.nodeValue + "px" : a.width = a.clientWidth;
                b.height && b.height.specified ? a.style.height = b.height.nodeValue + "px" : a.height = a.clientHeight
            }
            return a
        }
    };
    U.init();
    for (var v = [], d = 0; 16 > d; d++)
        for (var B = 0; 16 > B; B++) v[16 * d + B] = d.toString(16) + B.toString(16);
    var Z = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            grey: "#808080",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            oldlace: "#FDF5E6",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            whitesmoke: "#F5F5F5",
            yellowgreen: "#9ACD32"
        },
        H = {},
        L = {},
        $ = {
            butt: "flat",
            round: "round"
        },
        d = C.prototype;
    d.clearRect = function() {
        this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null);
        this.element_.innerHTML = ""
    };
    d.beginPath = function() {
        this.currentPath_ = []
    };
    d.moveTo = function(a, b) {
        var c = s(this, a, b);
        this.currentPath_.push({
            type: "moveTo",
            x: c.x,
            y: c.y
        });
        this.currentX_ = c.x;
        this.currentY_ = c.y
    };
    d.lineTo = function(a, b) {
        var c = s(this, a, b);
        this.currentPath_.push({
            type: "lineTo",
            x: c.x,
            y: c.y
        });
        this.currentX_ = c.x;
        this.currentY_ = c.y
    };
    d.bezierCurveTo =
        function(a, b, c, g, e, f) {
            e = s(this, e, f);
            a = s(this, a, b);
            c = s(this, c, g);
            R(this, a, c, e)
        };
    d.quadraticCurveTo = function(a, b, c, g) {
        a = s(this, a, b);
        c = s(this, c, g);
        g = {
            x: this.currentX_ + 2 / 3 * (a.x - this.currentX_),
            y: this.currentY_ + 2 / 3 * (a.y - this.currentY_)
        };
        R(this, g, {
            x: g.x + (c.x - this.currentX_) / 3,
            y: g.y + (c.y - this.currentY_) / 3
        }, c)
    };
    d.arc = function(a, b, c, g, e, f) {
        c *= q;
        var d = f ? "at" : "wa",
            k = a + K(g) * c - r,
            n = b + J(g) * c - r;
        g = a + K(e) * c - r;
        e = b + J(e) * c - r;
        k != g || f || (k += 0.125);
        a = s(this, a, b);
        k = s(this, k, n);
        g = s(this, g, e);
        this.currentPath_.push({
            type: d,
            x: a.x,
            y: a.y,
            radius: c,
            xStart: k.x,
            yStart: k.y,
            xEnd: g.x,
            yEnd: g.y
        })
    };
    d.rect = function(a, b, c, g) {
        this.moveTo(a, b);
        this.lineTo(a + c, b);
        this.lineTo(a + c, b + g);
        this.lineTo(a, b + g);
        this.closePath()
    };
    d.strokeRect = function(a, b, c, g) {
        var e = this.currentPath_;
        this.beginPath();
        this.moveTo(a, b);
        this.lineTo(a + c, b);
        this.lineTo(a + c, b + g);
        this.lineTo(a, b + g);
        this.closePath();
        this.stroke();
        this.currentPath_ = e
    };
    d.fillRect = function(a, b, c, g) {
        var e = this.currentPath_;
        this.beginPath();
        this.moveTo(a, b);
        this.lineTo(a + c, b);
        this.lineTo(a +
            c, b + g);
        this.lineTo(a, b + g);
        this.closePath();
        this.fill();
        this.currentPath_ = e
    };
    d.createLinearGradient = function(a, b, c, g) {
        var e = new w("gradient");
        e.x0_ = a;
        e.y0_ = b;
        e.x1_ = c;
        e.y1_ = g;
        return e
    };
    d.createRadialGradient = function(a, b, c, g, e, f) {
        var d = new w("gradientradial");
        d.x0_ = a;
        d.y0_ = b;
        d.r0_ = c;
        d.x1_ = g;
        d.y1_ = e;
        d.r1_ = f;
        return d
    };
    d.drawImage = function(a, b) {
        var c, g, e, d, r, y, n, h;
        e = a.runtimeStyle.width;
        d = a.runtimeStyle.height;
        a.runtimeStyle.width = "auto";
        a.runtimeStyle.height = "auto";
        var l = a.width,
            u = a.height;
        a.runtimeStyle.width =
            e;
        a.runtimeStyle.height = d;
        if (3 == arguments.length) c = arguments[1], g = arguments[2], r = y = 0, n = e = l, h = d = u;
        else if (5 == arguments.length) c = arguments[1], g = arguments[2], e = arguments[3], d = arguments[4], r = y = 0, n = l, h = u;
        else if (9 == arguments.length) r = arguments[1], y = arguments[2], n = arguments[3], h = arguments[4], c = arguments[5], g = arguments[6], e = arguments[7], d = arguments[8];
        else throw Error("Invalid number of arguments");
        var m = s(this, c, g),
            p = [];
        p.push(" <g_vml_:group", ' coordsize="', 10 * q, ",", 10 * q, '"', ' coordorigin="0,0"', ' style="width:',
            10, "px;height:", 10, "px;position:absolute;");
        if (1 != this.m_[0][0] || this.m_[0][1] || 1 != this.m_[1][1] || this.m_[1][0]) {
            var t = [];
            t.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", k(m.x / q), ",", "Dy=", k(m.y / q), "");
            var v = s(this, c + e, g),
                w = s(this, c, g + d);
            c = s(this, c + e, g + d);
            m.x = x.max(m.x, v.x, w.x, c.x);
            m.y = x.max(m.y, v.y, w.y, c.y);
            p.push("padding:0 ", k(m.x / q), "px ", k(m.y / q), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", t.join(""), ", sizingmethod='clip');")
        } else p.push("top:",
            k(m.y / q), "px;left:", k(m.x / q), "px;");
        p.push(' ">', '<g_vml_:image src="', a.src, '"', ' style="width:', q * e, "px;", " height:", q * d, 'px"', ' cropleft="', r / l, '"', ' croptop="', y / u, '"', ' cropright="', (l - r - n) / l, '"', ' cropbottom="', (u - y - h) / u, '"', " />", "</g_vml_:group>");
        this.element_.insertAdjacentHTML("BeforeEnd", p.join(""))
    };
    d.stroke = function(a) {
        var b = [];
        b.push("<g_vml_:shape", ' filled="', !!a, '"', ' style="position:absolute;width:', 10, "px;height:", 10, 'px;"', ' coordorigin="0,0"', ' coordsize="', 10 * q, ",", 10 * q, '"',
            ' stroked="', !a, '"', ' path="');
        for (var c = {
                x: null,
                y: null
            }, d = {
                x: null,
                y: null
            }, e = 0; e < this.currentPath_.length; e++) {
            var f = this.currentPath_[e];
            switch (f.type) {
                case "moveTo":
                    b.push(" m ", k(f.x), ",", k(f.y));
                    break;
                case "lineTo":
                    b.push(" l ", k(f.x), ",", k(f.y));
                    break;
                case "close":
                    b.push(" x ");
                    f = null;
                    break;
                case "bezierCurveTo":
                    b.push(" c ", k(f.cp1x), ",", k(f.cp1y), ",", k(f.cp2x), ",", k(f.cp2y), ",", k(f.x), ",", k(f.y));
                    break;
                case "at":
                case "wa":
                    b.push(" ", f.type, " ", k(f.x - this.arcScaleX_ * f.radius), ",", k(f.y - this.arcScaleY_ *
                        f.radius), " ", k(f.x + this.arcScaleX_ * f.radius), ",", k(f.y + this.arcScaleY_ * f.radius), " ", k(f.xStart), ",", k(f.yStart), " ", k(f.xEnd), ",", k(f.yEnd))
            }
            if (f) {
                if (null == c.x || f.x < c.x) c.x = f.x;
                if (null == d.x || f.x > d.x) d.x = f.x;
                if (null == c.y || f.y < c.y) c.y = f.y;
                if (null == d.y || f.y > d.y) d.y = f.y
            }
        }
        b.push(' ">');
        a ? T(this, b, c, d) : S(this, b);
        b.push("</g_vml_:shape>");
        this.element_.insertAdjacentHTML("beforeEnd", b.join(""))
    };
    d.fill = function() {
        this.stroke(!0)
    };
    d.closePath = function() {
        this.currentPath_.push({
            type: "close"
        })
    };
    d.save = function() {
        var a = {};
        P(this, a);
        this.aStack_.push(a);
        this.mStack_.push(this.m_);
        this.m_ = t(D(), this.m_)
    };
    d.restore = function() {
        this.aStack_.length && (P(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
    };
    d.translate = function(a, b) {
        z(this, t([
            [1, 0, 0],
            [0, 1, 0],
            [a, b, 1]
        ], this.m_), !1)
    };
    d.rotate = function(a) {
        var b = K(a);
        a = J(a);
        z(this, t([
            [b, a, 0],
            [-a, b, 0],
            [0, 0, 1]
        ], this.m_), !1)
    };
    d.scale = function(a, b) {
        this.arcScaleX_ *= a;
        this.arcScaleY_ *= b;
        z(this, t([
            [a, 0, 0],
            [0, b, 0],
            [0, 0, 1]
        ], this.m_), !0)
    };
    d.transform = function(a, b, c, d, e, f) {
        z(this, t([
            [a,
                b, 0
            ],
            [c, d, 0],
            [e, f, 1]
        ], this.m_), !0)
    };
    d.setTransform = function(a, b, c, d, e, f) {
        z(this, [
            [a, b, 0],
            [c, d, 0],
            [e, f, 1]
        ], !0)
    };
    d.drawText_ = function(a, b, c, d, e) {
        var f = this.m_;
        d = 0;
        var r = 1E3,
            t = 0,
            n = [],
            h;
        h = this.font;
        if (L[h]) h = L[h];
        else {
            var l = document.createElement("div").style;
            try {
                l.font = h
            } catch (u) {}
            h = L[h] = {
                style: l.fontStyle || "normal",
                variant: l.fontVariant || "normal",
                weight: l.fontWeight || "normal",
                size: l.fontSize || 10,
                family: l.fontFamily || "sans-serif"
            }
        }
        var l = h,
            m = this.element_;
        h = {};
        for (var p in l) h[p] = l[p];
        p = parseFloat(m.currentStyle.fontSize);
        m = parseFloat(l.size);
        "number" == typeof l.size ? h.size = l.size : -1 != l.size.indexOf("px") ? h.size = m : -1 != l.size.indexOf("em") ? h.size = p * m : -1 != l.size.indexOf("%") ? h.size = p / 100 * m : -1 != l.size.indexOf("pt") ? h.size = m / 0.75 : h.size = p;
        h.size *= 0.981;
        p = h.style + " " + h.variant + " " + h.weight + " " + h.size + "px " + h.family;
        m = this.element_.currentStyle;
        l = this.textAlign.toLowerCase();
        switch (l) {
            case "left":
            case "center":
            case "right":
                break;
            case "end":
                l = "ltr" == m.direction ? "right" : "left";
                break;
            case "start":
                l = "rtl" == m.direction ? "right" :
                    "left";
                break;
            default:
                l = "left"
        }
        switch (this.textBaseline) {
            case "hanging":
            case "top":
                t = h.size / 1.75;
                break;
            case "middle":
                break;
            default:
            case null:
            case "alphabetic":
            case "ideographic":
            case "bottom":
                t = -h.size / 2.25
        }
        switch (l) {
            case "right":
                d = 1E3;
                r = 0.05;
                break;
            case "center":
                d = r = 500
        }
        b = s(this, b + 0, c + t);
        n.push('<g_vml_:line from="', -d, ' 0" to="', r, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !e, '" stroked="', !!e, '" style="position:absolute;width:1px;height:1px;">');
        e ? S(this, n) : T(this, n, {
            x: -d,
            y: 0
        }, {
            x: r,
            y: h.size
        });
        e = f[0][0].toFixed(3) + "," + f[1][0].toFixed(3) + "," + f[0][1].toFixed(3) + "," + f[1][1].toFixed(3) + ",0,0";
        b = k(b.x / q) + "," + k(b.y / q);
        n.push('<g_vml_:skew on="t" matrix="', e, '" ', ' offset="', b, '" origin="', d, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', N(a), '" style="v-text-align:', l, ";font:", N(p), '" /></g_vml_:line>');
        this.element_.insertAdjacentHTML("beforeEnd", n.join(""))
    };
    d.fillText = function(a, b, c, d) {
        this.drawText_(a, b, c, d, !1)
    };
    d.strokeText = function(a,
        b, c, d) {
        this.drawText_(a, b, c, d, !0)
    };
    d.measureText = function(a) {
        this.textMeasureEl_ || (this.element_.insertAdjacentHTML("beforeEnd", '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>'), this.textMeasureEl_ = this.element_.lastChild);
        var b = this.element_.ownerDocument;
        this.textMeasureEl_.innerHTML = "";
        this.textMeasureEl_.style.font = this.font;
        this.textMeasureEl_.appendChild(b.createTextNode(a));
        return {
            width: this.textMeasureEl_.offsetWidth
        }
    };
    d.clip = function() {};
    d.arcTo = function() {};
    d.createPattern = function(a, b) {
        return new I(a, b)
    };
    w.prototype.addColorStop = function(a, b) {
        b = G(b);
        this.colors_.push({
            offset: a,
            color: b.color,
            alpha: b.alpha
        })
    };
    d = A.prototype = Error();
    d.INDEX_SIZE_ERR = 1;
    d.DOMSTRING_SIZE_ERR = 2;
    d.HIERARCHY_REQUEST_ERR = 3;
    d.WRONG_DOCUMENT_ERR = 4;
    d.INVALID_CHARACTER_ERR = 5;
    d.NO_DATA_ALLOWED_ERR = 6;
    d.NO_MODIFICATION_ALLOWED_ERR = 7;
    d.NOT_FOUND_ERR = 8;
    d.NOT_SUPPORTED_ERR = 9;
    d.INUSE_ATTRIBUTE_ERR = 10;
    d.INVALID_STATE_ERR = 11;
    d.SYNTAX_ERR = 12;
    d.INVALID_MODIFICATION_ERR =
        13;
    d.NAMESPACE_ERR = 14;
    d.INVALID_ACCESS_ERR = 15;
    d.VALIDATION_ERR = 16;
    d.TYPE_MISMATCH_ERR = 17;
    G_vmlCanvasManager = U;
    CanvasRenderingContext2D = C;
    CanvasGradient = w;
    CanvasPattern = I;
    DOMException = A
}();
/*eslint-enable*/
/*jshint ignore:end*/