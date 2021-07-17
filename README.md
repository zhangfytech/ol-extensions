
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
               olExtensions.LayerUtils.TdtImageLayer(),
               olExtensions.LayerUtils.TdtAnnoLayer()
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
