import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'
import { Paper, Typography } from '@mui/material'
import MarkInfo from '../share/MarkInfo'
import {dark} from '../theme/MapTheme'



const Map = memo(({center, setBounds, places, setSelected, mode, isClear}) => {

  console.log('mapStart');


  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [item, setItem] = useState(null)

  const onLoad = useCallback((map) => setMap(map), [])
  const onTilesLoaded = () => setBounds(map.getBounds())

  const options = useMemo(()=>({
    styles: mode === 'light'? '': dark,
    disableDefaultUI: true
  }),[mode])

  const onMapClick = useCallback((e) => setMarkers((prev) => 
    [...prev, {
      lat: e.latLng.lat(), lng: e.latLng.lng(),
      time: new Date(),
      name: 'Spot You Created !',
    }]
  ),[])

  const filteredPlaces = useMemo(() => (
    places.filter((item)=> item.address)
  ),[places])

  const markerType = useCallback(() => {
    
  },[])

  return (
    <>
    <GoogleMap 
      zoom={15}
      center={center}
      options={options}
      mapContainerStyle={{ width: '100%', height: '90vh' }}
      onTilesLoaded={onTilesLoaded}
      onLoad={onLoad} 
      onClick={onMapClick}
    >

      <Marker 
        position={center}
        icon={userIcon('orange')}
      />  

      {!isClear &&
      <>
      {filteredPlaces?.map((item, i) =>  // list from api
      <Marker key={i} 
        position={{lat:Number(item.latitude),lng:Number(item.longitude)}}
      >
        <Paper elevation={6} sx={{cursor: 'pointer'}} onClick={()=>setSelected(i)}>
          <Typography variant='p'>{item.name}</Typography>  
        </Paper>
      </Marker>
      )}

      {markers?.map((item, i) =>  // list from user click
      <Marker key={i}
        position={{ lat: item.lat, lng: item.lng }}
        onClick={() => setItem(item)}
      />
      )}

      {item && (  // item user created
      <MarkInfo item={item} markers={markers} setMarkers={setMarkers} 
        setItem={setItem}
      />
      )}
      </>
      }
    </GoogleMap>
    </>    
  )
})

export default Map

const userIcon = (color) => ({
  path: 'M 20.5 6 c -2.61 0.7 -5.67 1 -8.5 1 s -5.89 -0.3 -8.5 -1 L 3 8 c 1.86 0.5 4 0.83 6 1 v 13 h 2 v -6 h 2 v 6 h 2 V 9 c 2 -0.17 4.14 -0.5 6 -1 l -0.5 -2 Z M 12 6 c 1.1 0 2 -0.9 2 -2 s -0.9 -2 -2 -2 s -2 0.9 -2 2 s 0.9 2 2 2 Z',
  fillOpacity: 1,
  // strokeColor: color,
  fillColor: color,
  scale: 1.3,
})