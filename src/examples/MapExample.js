import React, { Component } from 'react';
import Map from 'ol/Map';
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, XYZ, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
// import ToolBar from "../Source/plugins/Toolbar";
import { ToolBar, LayerUtils } from '../../Build/ol-extensions';
import "ol/ol.css";
import "../../Source/ol-extend.css";

class MapExample extends Component {

    componentDidMount() {
        console.log(LayerUtils.TdtImageLayer);
        const map = new Map({
            controls: defaultControls().extend([
                new ToolBar({ projection: "EPSG:4326" }),
                // new PointerHover({
                //     keys: filterKeys
                // })
            ]),
            target: "map",
            view: new View({
                center: fromLonLat([118, 32]),
                zoom: 10
            }),
            layers: [
                new TileLayer({
                    title: "天地图卫星图",
                    source: new XYZ({
                        url: "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=70f3211520e87929bca5332e872f501d"
                    })
                }),
                new TileLayer({
                    title: "天地图注记",
                    source: new XYZ({
                        url: "http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=70f3211520e87929bca5332e872f501d"
                    })
                })
            ]
        });
    }

    render() {
        return (
            <div id="map" > </div>
        )
    }
}

export default MapExample;