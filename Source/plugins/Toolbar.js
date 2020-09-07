import { Control } from 'ol/control';
import { getTransformFromProjections, identityTransform, get, getUserProjection } from 'ol/proj';
import * as events from 'ol/events';
import { getChangeEventType } from 'ol/Object.js';

function _createLongitudeLabel() {
    const longitude = document.createElement('label');
    longitude.className = 'ol-extend-toolbar-label';
    return longitude;
}

function _createLatitudeLabel() {
    const latitude = document.createElement('label');
    latitude.className = 'ol-extend-toolbar-label';
    return latitude;
}

const ToolBar = (function(Control) {
    function ToolBar(opt_options) {
        const options = opt_options || {};
        const element = document.createElement("div");
        element.className = "ol-extend-toolbar";

        const coordinatesLabel = document.createElement('div');
        coordinatesLabel.className = 'ol-extend-toolbar-item ol-extent-toolbar-coordinates';
        element.appendChild(coordinatesLabel);
        this._longitude = _createLongitudeLabel();
        coordinatesLabel.appendChild(this._longitude);
        this._latitude = _createLatitudeLabel();
        coordinatesLabel.appendChild(this._latitude);

        Control.call(this, {
            element: element,
            target: options.target,
            render: options.render || this.render
        });
        events.listen(this, getChangeEventType(ToolBar.Property_.PROJECTION), this.handleProjectionChanged_, this);
        if (options.coordinateFormat) {
            this.setCoordinateFormat(options.coordinateFormat);
        }
        if (options.projection) {
            this.setProjection(get(options.projection));
        }

        this.undefinedHTML_ = options.undefinedHTML !== undefined ? options.undefinedHTML : '';
        this.renderedHTML_ = `${this._longitude.innerHTML}${this._latitude.innerHTML}`;
        this.mapProjection_ = null;
        this.transform_ = null;
        this.lastMouseMovePixel_ = null;
    }

    if (Control) ToolBar.__proto__ = Control;
    ToolBar.prototype = Object.create(Control && Control.prototype);
    ToolBar.prototype.constructor = ToolBar;

    ToolBar.prototype.render = function(mapEvent) {
        const frameState = mapEvent.frameState;
        if (!frameState) {
            this.mapProjection_ = null;
        } else {
            if (this.mapProjection_ !== frameState.viewState.projection) {
                this.mapProjection_ = frameState.viewState.projection;
                this.transform_ = null;
            }
        }
        this.updateHTML_(this.lastMouseMovePixel_);
    };

    ToolBar.Property_ = {
        PROJECTION: 'projection',
        COORDINATE_FORMAT: 'coordinateFormat'
    };

    ToolBar.prototype.setMap = function(map) {
        Control.prototype.setMap.call(this, map);
        if (map) {
            const viewport = map.getViewport();
            this.listenerKeys.push(
                events.listen(viewport, 'mousemove', this.handleMouseMove, this),
                events.listen(viewport, 'mouseout', this.handleMouseOut, this)
            );
        }
    };

    /**
     * @param {Event} event Browser event.
     * @protected
     */
    ToolBar.prototype.handleMouseMove = function(event) {
        var map = this.getMap();
        this.lastMouseMovePixel_ = map.getEventPixel(event);
        this.updateHTML_(this.lastMouseMovePixel_);
    };

    /**
     * @param {Event} event Browser event.
     * @protected
     */
    ToolBar.prototype.handleMouseOut = function(event) {
        this.updateHTML_(this.lastMouseMovePixel_);
        // this.updateHTML_(null);
        this.lastMouseMovePixel_ = null;
    };

    /**
     * @param {?ol.Pixel} pixel Pixel.
     * @private
     */
    ToolBar.prototype.updateHTML_ = function(pixel) {
        var html = this.undefinedHTML_;
        if (pixel && this.mapProjection_) {
            if (!this.transform_) {
                var projection = this.getProjection();
                if (projection) {
                    this.transform_ = getTransformFromProjections(this.mapProjection_, projection);
                } else {
                    this.transform_ = identityTransform;
                }
            }
            var map = this.getMap();
            var coordinate = map.getCoordinateFromPixelInternal(pixel);
            if (coordinate) {
                var userProjection = getUserProjection();
                if (userProjection) {
                    this.transform_ = getTransformFromProjections(this.mapProjection_, userProjection);
                }
                this.transform_(coordinate, coordinate);
                var coordinateFormat = this.getCoordinateFormat();
                if (coordinateFormat) {
                    html = coordinateFormat(coordinate);
                } else {
                    html = coordinate.toString();
                }
            }
        }
        if (!this.renderedHTML_ || html !== this.renderedHTML_) {
            this.renderedHTML_ = `${this._longitude.innerHTML}${this._latitude.innerHTML}`;
            const coordinatesTransformed = html.split(",");
            this._longitude.innerHTML = "lon&nbsp;&nbsp;" + parseFloat(coordinatesTransformed[0]).toFixed(8) + "&nbsp;";
            this._latitude.innerHTML = "lat&nbsp;&nbsp;" + parseFloat(coordinatesTransformed[1]).toFixed(8);
        }
    };

    /**
     * Set the coordinate format type used to render the current position.
     * @param {ol.CoordinateFormatType} format The format to render the current
     *     position in.
     * @observable
     * @api
     */
    ToolBar.prototype.setCoordinateFormat = function(format) {
        this.set(ToolBar.Property_.COORDINATE_FORMAT, format);
    };

    /**
     * Set the projection that is used to report the mouse position.
     * @param {ol.proj.Projection} projection The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    ToolBar.prototype.setProjection = function(projection) {
        this.set(ToolBar.Property_.PROJECTION, projection);
    };

    /**
     * Return the projection that is used to report the mouse position.
     * @return {ol.proj.Projection|undefined} The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    ToolBar.prototype.getProjection = function() {
        return /** @type {ol.proj.Projection|undefined} */ (
            this.get(ToolBar.Property_.PROJECTION));
    };

    /**
     * Return the coordinate format type used to render the current position or
     * undefined.
     * @return {ol.CoordinateFormatType|undefined} The format to render the current
     *     position in.
     * @observable
     * @api
     */
    ToolBar.prototype.getCoordinateFormat = function() {
        return /** @type {ol.CoordinateFormatType|undefined} */ (
            this.get(ToolBar.Property_.COORDINATE_FORMAT));
    };

    ToolBar.prototype.handleProjectionChanged_ = function() {
        this.transform_ = null;
    };

    return ToolBar;
}(Control));

export default ToolBar;