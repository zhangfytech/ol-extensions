
## Getting Started

### Installation

```
npm install ol-extensions
yarn add ol-extensions
```

### Basic Usage

first install ol lib
```
npm install ol -D/yarn add ol
```

second add ol-extensions to your project

```
import olExtensions from 'ol-extensions';
import Map from 'ol/Map';
...

class MapControl extends Component{
    ...
    componentDidMount(){
        const map = new Map({
            controls: defaultControls().extend([
                new olExtensions.ToolBar({ projection: "EPSG:4326" }),
                new olExtensions.PointerHover({
                     keys: filterKeys
                 })
            ]),
            target: "map",
            view: new View({
                center: fromLonLat([118, 32]),
                zoom: 10
            }),
            layers: [
                new olExtensions.LayerUtils.TileLayer({
                    title: "天地图卫星图",
                    source: new XYZ({
                        url: "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=70f3211520e87929bca5332e872f501d"
                    })
                }),
                new olExtensions.LayerUtils.TileLayer({
                    title: "天地图注记",
                    source: new XYZ({
                        url: "http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=70f3211520e87929bca5332e872f501d"
                    })
                })
            ]
        });
    }
    ...
    redner(){
        return(
            <div id='map'/>
        )
    }
}


```
### Parameters

```
PointerHover TooBar LayerUtils
```

#### Thanks for Support

![image](https://openlayers.org/assets/theme/img/logo70.png) 
