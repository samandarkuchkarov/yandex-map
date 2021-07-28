
import styles from '../styles/Home.module.css'
import { YMaps,Map, GeolocationControl, SearchControl } from 'react-yandex-maps';
export default function Home() {
  return (
    <YMaps   query={{
      apikey: '8140bb7c-9efa-44ca-8ec9-70eb503948d1',
    }} style={styles.container}>
    <Map width='100vw' height='100vh' defaultState={{ center: [41.387315, 69.463040], zoom: 12 }} >
      <GeolocationControl options={{float:'right',maxWidth:'40px'}}/>
      <SearchControl/>
    </Map>

    </YMaps>
  )
}
