import React, { Component } from "react";
import "ol/ol.css";
import "../../Source/ol-extend.css";
import LayerUtils from "../../Source/utils/layers";
import { View, Map } from "ol";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import ToolBar from "../../Source/plugins/Toolbar";
// import { ToolBar } from "../../Build/ol-extensions";

class MapExample extends Component {
  componentDidMount() {
    const map = new Map({
      controls: defaultControls().extend([
        new ToolBar({ projection: "EPSG:4326" }),
      ]),
      target: "map",
      view: new View({
        center: fromLonLat([118, 32]),
        zoom: 10,
      }),
      layers: [LayerUtils.TdtImageLayer(), LayerUtils.TdtAnnoLayer()],
    });
  }

  render() {
    return <div id="map"> </div>;
  }
}

export default MapExample;
