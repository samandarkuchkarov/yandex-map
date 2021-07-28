
import styles from '../styles/Home.module.css'
import { YMaps,Map, GeolocationControl, SearchControl,ObjectManager,RouteButton,RulerControl,TypeSelector, ZoomControl,FullscreenControl } from 'react-yandex-maps';
import Data from '../location.json'
export default function Home() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',width:'100vw'}}> 
    <YMaps   query={{
      apikey: '8140bb7c-9efa-44ca-8ec9-70eb503948d1',
    }} >
    <Map width='500px' height='500px' defaultState={{ center: [41.298916, 69.360232], zoom: 12 }} >
      <GeolocationControl options={{float:'right',maxWidth:'40px'}}/>
      <SearchControl />
      <RouteButton/>
      <RulerControl/>
      <TypeSelector/>
      <ZoomControl/>
      <FullscreenControl/>
      <ObjectManager
            objects={{
              openBalloonOnClick: true
            }}
            clusters={{}}
            options={{
              clusterize: true,
              gridSize: 32
            }}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.clustersBalloon"
            ]}  
            defaultFeatures={{
              type: "FeatureCollection",
              features: Data.map((point, id) => {
                return {
                  id: id,
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [point.A,Number(point.B)]
                  },
                  properties: {
                    balloonContent: `
                    <p>${point.C}</p>
                    <p>${point.A},${point.B}</p>
                `,
                    clusterCaption: `Метка №${id + 1}`
                  }
                };
              })
            }}
            />
              

    </Map>
    </YMaps>
    </div>
  )
}
