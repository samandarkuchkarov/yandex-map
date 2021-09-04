
import styles from '../styles/Home.module.css'
import React from 'react';
import { YMaps,Map, GeolocationControl, SearchControl,ObjectManager,RouteButton,RulerControl,TypeSelector, ZoomControl,FullscreenControl } from 'react-yandex-maps';
import Data from '../location.json'
import copy from 'copy-to-clipboard';
import axios from 'axios';

export default function Home() {

  const searchRef = React.useRef(null);
  const [text,setText] = React.useState()
  const [coordinates,setCoor] = React.useState(['',''])
  const [result,setResult] = React.useState('')

  const onClick = (coor) =>{
    if(coor){
        axios({
          method: 'GET',
          url:`https://geocode-maps.yandex.ru/1.x`,//28 123457
          params:{
            geocode: `${coor[1]},${coor[0]}`,
            apikey:'8140bb7c-9efa-44ca-8ec9-70eb503948d1',
            format:'json'
  
          }
          }).then((e)=>{
            setResult(e.data.response.GeoObjectCollection.featureMember[0].GeoObject.name)
            setCoor(e.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse())
          }).catch((e)=>{
              console.log(e)
          })

    }
  }
  function copyToClipboard(e) {
    copy(e, {
      debug: true,
      message: 'Press #{key} to copy',
    });
    
  };


  return (
    <div className='container'> 
      <div onClick={()=>{copyToClipboard(`${coordinates[0]}  ${coordinates[1]}`)}} className="coordinate">{`${coordinates[0]}${coordinates[0]?',':''}  ${coordinates[1]}`}</div>
      <div onClick={()=>{copyToClipboard(`${result}`)}} className="result">{`${result}`}</div>


    <YMaps    query={{apikey: '8140bb7c-9efa-44ca-8ec9-70eb503948d1'}} >
      <Map   onClick={(e)=>(onClick(e.get('coords')))}
        width='100vw' height='100vh' defaultState={{ center: [41.298916, 69.360232], zoom: 12 }} >
        <GeolocationControl options={{float:'right',maxWidth:'40px'}}/>
        <SearchControl instanceRef={ref => {
                if (ref) searchRef.current = ref; 
                if(ref){
                  ref.events.add('resultselect', async(a) =>{
                    var result = ref.getResult(0)
                    result.then(function (res) {
                      console.log(res)
                      setCoor(res.geometry._coordinates)
                  }, function (err) {
                      console.log("Error");
                  });
                }, this);
                }
              
              }} />
      <RouteButton/>
      <RulerControl/>
      <TypeSelector/>
      <ZoomControl/>
      {/* <FullscreenControl/> */}
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

