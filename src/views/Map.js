import React, { useState, useCallback, useMemo, memo } from 'react'
import { GoogleMap, InfoWindow, Marker, MarkerClusterer, useLoadScript } from '@react-google-maps/api'
import { Button, Paper, paper, styled, Typography, useMediaQuery } from '@mui/material'
import MarkInfo from '../share/MarkInfo'



const Map = memo(({center, setBounds, places, setSelected}) => {

  console.log('mapStart');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const [event, setEvent] = useState(null)
  const [markers, setMarkers] = useState([])
  const [item, setItem] = useState(null)

  const onTilesLoaded = () => setBounds(event.getBounds())
  const onLoad = useCallback((e) => setEvent(e), [])
  const onUnmount = useCallback(() => setEvent(null), [])
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

  return (
    <>
    {isLoaded &&  
    <GoogleMap center={center} zoom={15}
      mapContainerStyle={{ width: '100%', height: '80vh' }}
      onTilesLoaded={onTilesLoaded}
      onLoad={onLoad} 
      onUnmount={onUnmount}
      onClick={onMapClick}
    >

      <Marker position={center} icon={userIcon('orange')}/>  

      {filteredPlaces?.map((item, i) =>  // list from api
      <InfoWindow key={i}
        position={{lat:Number(item.latitude),lng:Number(item.longitude)}}
      >
        <Paper elevation={6} sx={{cursor: 'pointer'}} onClick={()=>setSelected(i)}>
          <Typography variant='p'>{item.name}</Typography>  
        </Paper>
      </InfoWindow>
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

    </GoogleMap>
    }
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
// paper: {
//   padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
// },
// mapContainer: {
//   height: '85vh', width: '100%',
// },
// markerContainer: {
//   position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
// },
// pointer: {
//   cursor: 'pointer',
// },