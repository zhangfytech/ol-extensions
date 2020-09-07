import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";

function LayerUtils() {

}

LayerUtils.prototype.TdtImageLayer = function(token) {
    return new TileLayer({
        title: "天地图卫星图",
        source: new XYZ({
            url: `http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${_extractTdtToken(token)}`
        })
    })
};

LayerUtils.prototype.TdtAnnoLayer = function(token) {
    return new TileLayer({
        title: "天地图注记",
        source: new XYZ({
            url: `http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${_extractTdtToken(token)}`
        })
    })
};

function _extractTdtToken(token) {
    return token ? token : '70f3211520e87929bca5332e872f501d';
}

export default new LayerUtils();