import React, { useState, useCallback, useMemo, memo } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Box, Paper, styled, Typography } from '@mui/material'
import MarkInfo from '../share/MarkInfo'
import {dark} from '../theme/MapTheme'
import { connect } from 'react-redux'



const mapState = ({Global, MapList}) => ({
  mode: Global.mode,
  isClear: Global.isClear,
  center: Global.center,
  nearList: MapList.nearList,
  markerList: MapList.markerList,
  listType: MapList.listType,
  myItem: MapList.myItem
})
const mapDispatch = {
  setBounds: val => ({type: 'setBounds', payload: val}),
  setSelected: val => ({type: 'setSelected', payload: val}),
  setMarkerList: val => ({type: 'setMarkerList', payload: val}),
  setMyItem: val => ({type: 'setMyItem', payload: val}),
}

const Map = memo((state) => {

  console.log('mapStart');
  const {center, setBounds, nearList, setSelected, mode, isClear, markerList, setMarkerList, listType, myItem, setMyItem } = state

  const [map, setMap] = useState(null)
  const onLoad = useCallback((map) => setMap(map), [])
  const onTilesLoaded = () => setBounds(map.getBounds())

  const options = useMemo(()=>({
    styles: mode === 'light'? '': dark,
    disableDefaultUI: true,
    gestureHandling: "greedy"
  }),[mode])

  const createSpot = e => {
    const newItem = {
      lat: e.latLng.lat(), lng: e.latLng.lng(),
      name: 'Spot You Created !',
      photo: `https://picsum.photos/300?random=${parseInt(Math.random()*10)}`,
      raw_ranking: 0,
      price: '--',
      cuisine: null,
      address: '--',
      phone: '--',
      time: new Date(),
    }
    let newArr = [...markerList, newItem]
    setMarkerList(newArr)
  }

  const mapType = useCallback(() => (
    listType === 'Near' ? nearList : markerList
  ),[listType, nearList, markerList])

  return (
    <MainBox>
    <GoogleMap 
      zoom={15}
      center={center}
      options={options}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onTilesLoaded={onTilesLoaded}
      onLoad={onLoad} 
      onClick={listType === 'MyMap' && createSpot}
    >

      <Marker position={center} icon={userIcon('orange')}/>  {/* user position */}

      {!isClear &&
      <>
      {mapType().map((item, i) =>  // list from api
      <Marker key={i} 
        position={{lat:Number(item.latitude),lng:Number(item.longitude)}}
        onClick={()=>setSelected(i)}
      >
        <Paper elevation={6} sx={{cursor: 'pointer'}} >
          <Typography variant='p'>{item.name}</Typography>  
        </Paper>
      </Marker>
      )}

      {listType === 'MyMap' && markerList.map((item, i) =>  // list from user click
      <Marker key={i}
        position={{ lat: item.lat, lng: item.lng }}
        onClick={()=>setMyItem(item)}
      />
      )}

      {myItem && (<MarkInfo/>)}  {/* item user created */}
      </>
      }
    </GoogleMap>
    </MainBox> 
  )
})

export default connect(mapState, mapDispatch)(Map)

const MainBox = styled(Box)(({theme})=>`
  width: 100%;
  height: 90vh;
    ${[theme.breakpoints.down('md')]}{
      height: 80vh;
    }
`)
const userIcon = (color) => ({
  path: 'M 20.5 6 c -2.61 0.7 -5.67 1 -8.5 1 s -5.89 -0.3 -8.5 -1 L 3 8 c 1.86 0.5 4 0.83 6 1 v 13 h 2 v -6 h 2 v 6 h 2 V 9 c 2 -0.17 4.14 -0.5 6 -1 l -0.5 -2 Z M 12 6 c 1.1 0 2 -0.9 2 -2 s -0.9 -2 -2 -2 s -2 0.9 -2 2 s 0.9 2 2 2 Z',
  fillOpacity: 1,
  // strokeColor: color,
  fillColor: color,
  scale: 1.3,
})