
import styles from '../styles/Home.module.css'
import { YMaps,Map, GeolocationControl, SearchControl,ObjectManager,Placemark } from 'react-yandex-maps';
import Data from '../location.json'
export default function Home() {
  return (
    <YMaps   query={{
      apikey: '8140bb7c-9efa-44ca-8ec9-70eb503948d1',
    }} style={styles.container}>
    <Map width='100vw' height='100vh' defaultState={{ center: [41.298916, 69.360232], zoom: 12 }} >
      <GeolocationControl options={{float:'right',maxWidth:'40px'}}/>
      <SearchControl options={{maxWidth:2000}}/>
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
                `,
                    clusterCaption: `Метка №${id + 1}`
                  }
                };
              })
            }}
            />
              

    </Map>
    </YMaps>
  )
}
