import { Control } from 'ol/control';
import * as events from 'ol/events';
/**
 * @param Control {Object} ol/Control
 * @param keys {Object}
 **/
const PointerHover = (function(Control) {
    function PointerHover(opt_options) {
        const options = opt_options || {};
        const element = document.createElement('div');
        element.className = options.className || 'ol-extend-pointer-hover';
        this.element_ = element;
        this._schemeList = [];

        this._offset = options.offset || [10, 10];
        this._keys = options.keys || [];
        Control.call(this, {
            element: element,
            target: options.target
        });
    }

    if (Control) PointerHover.__proto__ = Control;
    PointerHover.prototype = Object.create(Control && Control.prototype);
    PointerHover.prototype.constructor = PointerHover;

    PointerHover.prototype.addScheme = function(params) {

    };

    PointerHover.prototype.setMap = function(map) {
        Control.prototype.setMap.call(this, map);
        if (map) {
            const viewport = map.getViewport();
            this.listenerKeys.push(
                events.listen(viewport, 'mousemove', this._mouseMoveHandler, this),
                events.listen(viewport, 'mouseout', this._mouseOutHandler, this)
            );
        }
    };

    /**
     * @param default ol.Feature._value
     */
    PointerHover.prototype._mouseMoveHandler = function(e) {
        const pixel = [e.layerX, e.layerY];
        const map = this.getMap();
        const hasFeature = map.hasFeatureAtPixel(pixel);
        if (!hasFeature) {
            return this._hideElement();
        }

        const feature = map.forEachFeatureAtPixel(pixel, (feature, layer) => {
            if (feature) {
                return feature;
            }
        });

        const fields = this._getInformation(feature);
        this.element_.innerHTML = formatFields(fields);
        // const featurePixel = map.getPixelFromCoordinate(feature.getGeometry().getCoordinates())
        // const geometry = feature.getGeometry();

        console.log('====================================');
        console.log(this.element_.clientWidth);
        console.log(this.element_.clientHeight);
        console.log('====================================');
        this.packElementStyle({}, pixel);
    };

    /**
     * @param {Feature} feature
     */
    PointerHover.prototype._getInformation = function(feature) {
        if (!feature.values_) {
            return;
        }

        const params = feature.getKeys();
        const result = [];
        const id = feature.getId();
        for (let i = 0; i < this._keys.length; i++) {
            const instance = this._keys[i];

            if (!params.includes(instance.key)) {
                continue;
            }

            if (instance.key === 'geometry') {
                console.log("can not put an object into html element innerHtml");
                continue;
            }

            if (instance.filters && instance.filters.length > 0) {
                if (!id) {
                    continue;
                }

                const result = instance.filters.map((filter, index) => {
                    return id.indexOf(filter) >= 0;
                });

                if (!result.includes(true)) {
                    continue;
                }
            }

            const config = { ...instance };
            const config_ = Object.assign(config, {
                value: feature.get(instance.key)
            });

            result.push(config_);
        }

        return result;
    };

    PointerHover.prototype.packElementStyle = function(params, position) {
        const offsetX = this._offset[0];
        const offsetY = this._offset[1];
        const width = this.element_.clientWidth;
        const d_width = document.body.clientWidth;
        if (position[0] + 30 + width > d_width) {
            this.element_.style.left = `${position[0] - offsetX - width}px`;
        } else {
            this.element_.style.left = `${position[0] + offsetX}px`;
        }
        this.element_.style.display = 'block';
        this.element_.style.top = `${position[1] + offsetY}px`;
    };

    PointerHover.prototype._hideElement = function() {
        this.element_.style.display = 'none';
    };

    PointerHover.prototype._mouseOutHandler = function(e) {
        this._hideElement();
    };

    return PointerHover;
}(Control));

function formatFields(params) {
    let formatStr = '';
    for (let i = 0; i < params.length; i++) {
        const field = params[i];
        let str = "<div class='ol-extension-hover-item'>";
        if (field.title) {
            str += `<span class='hover-item-title'>${field.title || ''}</span>`;
        }

        if (field.value) {
            str += field.formatter ? field.formatter.replaceAll('{d}', field.value) : `<label class='hover-item-label'>${field.value || ''}</label>`;
        }
        str += '</div>';
        formatStr += str;
    }
    return formatStr;
}

export default PointerHover;