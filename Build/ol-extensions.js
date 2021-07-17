module.exports = function(t) { var e = {};

    function o(n) { if (e[n]) return e[n].exports; var r = e[n] = { i: n, l: !1, exports: {} }; return t[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports } return o.m = t, o.c = e, o.d = function(t, e, n) { o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n }) }, o.r = function(t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, o.t = function(t, e) { if (1 & e && (t = o(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var n = Object.create(null); if (o.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t)
            for (var r in t) o.d(n, r, function(e) { return t[e] }.bind(null, r)); return n }, o.n = function(t) { var e = t && t.__esModule ? function() { return t.default } : function() { return t }; return o.d(e, "a", e), e }, o.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, o.p = "", o(o.s = 5) }([function(t, e) { t.exports = require("ol/events") }, function(t, e) { t.exports = require("ol/proj") }, function(t, e) { t.exports = require("ol/control") }, function(t, e) { t.exports = require("ol/layer") }, function(t, e) { t.exports = require("ol/source") }, function(t, e, o) { "use strict";
    o.r(e), o.d(e, "ToolBar", (function() { return s })), o.d(e, "PointerHover", (function() { return u })), o.d(e, "LayerUtils", (function() { return m })); var n = o(2),
        r = o(1),
        i = o(0); var s = function(t) {
        function e(e) { var o = e || {},
                n = document.createElement("div");
            n.className = "ol-extend-toolbar"; var s, a, l = document.createElement("div");
            l.className = "ol-extend-toolbar-item ol-extent-toolbar-coordinates", n.appendChild(l), this._longitude = ((s = document.createElement("label")).className = "ol-extend-toolbar-label", s), l.appendChild(this._longitude), this._latitude = ((a = document.createElement("label")).className = "ol-extend-toolbar-label", a), l.appendChild(this._latitude), t.call(this, { element: n, target: o.target, render: o.render || this.render }), i.listen(this, "change:projection", this.handleProjectionChanged_, this), o.coordinateFormat && this.setCoordinateFormat(o.coordinateFormat), o.projection && this.setProjection(Object(r.get)(o.projection)), this.undefinedHTML_ = void 0 !== o.undefinedHTML ? o.undefinedHTML : "", this.renderedHTML_ = "".concat(this._longitude.innerHTML).concat(this._latitude.innerHTML), this.mapProjection_ = null, this.transform_ = null, this.lastMouseMovePixel_ = null } return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.render = function(t) { var e = t.frameState;
            e ? this.mapProjection_ !== e.viewState.projection && (this.mapProjection_ = e.viewState.projection, this.transform_ = null) : this.mapProjection_ = null, this.updateHTML_(this.lastMouseMovePixel_) }, e.Property_ = { PROJECTION: "projection", COORDINATE_FORMAT: "coordinateFormat" }, e.prototype.setMap = function(e) { if (t.prototype.setMap.call(this, e), e) { var o = e.getViewport();
                this.listenerKeys.push(i.listen(o, "mousemove", this.handleMouseMove, this), i.listen(o, "mouseout", this.handleMouseOut, this)) } }, e.prototype.handleMouseMove = function(t) { var e = this.getMap();
            this.lastMouseMovePixel_ = e.getEventPixel(t), this.updateHTML_(this.lastMouseMovePixel_) }, e.prototype.handleMouseOut = function(t) { this.updateHTML_(this.lastMouseMovePixel_), this.lastMouseMovePixel_ = null }, e.prototype.updateHTML_ = function(t) { var e = this.undefinedHTML_; if (t && this.mapProjection_) { if (!this.transform_) { var o = this.getProjection();
                    this.transform_ = o ? Object(r.getTransformFromProjections)(this.mapProjection_, o) : r.identityTransform } var n = this.getMap().getCoordinateFromPixelInternal(t); if (n) { var i = Object(r.getUserProjection)();
                    i && (this.transform_ = Object(r.getTransformFromProjections)(this.mapProjection_, i)), this.transform_(n, n); var s = this.getCoordinateFormat();
                    e = s ? s(n) : n.toString() } } if (!this.renderedHTML_ || e !== this.renderedHTML_) { this.renderedHTML_ = "".concat(this._longitude.innerHTML).concat(this._latitude.innerHTML); var a = e.split(",");
                this._longitude.innerHTML = "lon&nbsp;&nbsp;" + parseFloat(a[0]).toFixed(8) + "&nbsp;", this._latitude.innerHTML = "lat&nbsp;&nbsp;" + parseFloat(a[1]).toFixed(8) } }, e.prototype.setCoordinateFormat = function(t) { this.set(e.Property_.COORDINATE_FORMAT, t) }, e.prototype.setProjection = function(t) { this.set(e.Property_.PROJECTION, t) }, e.prototype.getProjection = function() { return this.get(e.Property_.PROJECTION) }, e.prototype.getCoordinateFormat = function() { return this.get(e.Property_.COORDINATE_FORMAT) }, e.prototype.handleProjectionChanged_ = function() { this.transform_ = null }, e }(n.Control);

    function a(t, e) { var o = Object.keys(t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter((function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable }))), o.push.apply(o, n) } return o }

    function l(t) { for (var e = 1; e < arguments.length; e++) { var o = null != arguments[e] ? arguments[e] : {};
            e % 2 ? a(Object(o), !0).forEach((function(e) { c(t, e, o[e]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : a(Object(o)).forEach((function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e)) })) } return t }

    function c(t, e, o) { return e in t ? Object.defineProperty(t, e, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = o, t } var u = function(t) {
            function e(e) { var o = e || {},
                    n = document.createElement("div");
                n.className = o.className || "ol-extend-pointer-hover", this.element_ = n, this._schemeList = [], this._offset = o.offset || [10, 10], this._keys = o.keys || [], t.call(this, { element: n, target: o.target }) } return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.addScheme = function(t) {}, e.prototype.setMap = function(e) { if (t.prototype.setMap.call(this, e), e) { var o = e.getViewport();
                    this.listenerKeys.push(i.listen(o, "mousemove", this._mouseMoveHandler, this), i.listen(o, "mouseout", this._mouseOutHandler, this)) } }, e.prototype._mouseMoveHandler = function(t) { var e = [t.layerX, t.layerY],
                    o = this.getMap(); if (!o.hasFeatureAtPixel(e)) return this._hideElement(); var n = o.forEachFeatureAtPixel(e, (function(t, e) { if (t) return t })),
                    r = this._getInformation(n);
                this.element_.innerHTML = function(t) { for (var e = "", o = 0; o < t.length; o++) { var n = t[o],
                            r = "<div class='ol-extension-hover-item'>";
                        n.title && (r += "<span class='hover-item-title'>".concat(n.title || "", "</span>")), n.value && (r += n.formatter ? n.formatter.replaceAll("{d}", n.value) : "<label class='hover-item-label'>".concat(n.value || "", "</label>")), e += r += "</div>" } return e }(r), this.packElementStyle({}, e) }, e.prototype._getInformation = function(t) { if (t.values_) { for (var e = t.getKeys(), o = [], n = t.getId(), r = 0; r < this._keys.length; r++) { var i = this._keys[r]; if (e.includes(i.key))
                            if ("geometry" !== i.key) { if (i.filters && i.filters.length > 0) { if (!n) continue; if (!i.filters.map((function(t, e) { return n.indexOf(t) >= 0 })).includes(!0)) continue } var s = l({}, i),
                                    a = Object.assign(s, { value: t.get(i.key) });
                                o.push(a) } else console.log("can not put an object into html element innerHtml") } return o } }, e.prototype.packElementStyle = function(t, e) { var o = this._offset[0],
                    n = this._offset[1],
                    r = this.element_.clientWidth,
                    i = document.body.clientWidth;
                e[0] + 30 + r > i ? this.element_.style.left = "".concat(e[0] - o - r, "px") : this.element_.style.left = "".concat(e[0] + o, "px"), this.element_.style.display = "block", this.element_.style.top = "".concat(e[1] + n, "px") }, e.prototype._hideElement = function() { this.element_.style.display = "none" }, e.prototype._mouseOutHandler = function(t) { this._hideElement() }, e }(n.Control),
        p = o(3),
        f = o(4);

    function h() {}

    function d(t) { return t || "70f3211520e87929bca5332e872f501d" }
    h.prototype.TdtImageLayer = function(t) { return new p.Tile({ title: "天地图卫星图", source: new f.XYZ({ url: "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=".concat(d(t)) }) }) }, h.prototype.TdtAnnoLayer = function(t) { return new p.Tile({ title: "天地图注记", source: new f.XYZ({ url: "http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=".concat(d(t)) }) }) }; var m = new h }]);