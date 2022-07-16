import React, { useCallback, useMemo, memo, useState, useEffect } from 'react'
import { Circle, GoogleMap, Marker } from '@react-google-maps/api'
import { dark } from '../theme/MapTheme'
import { useDispatch, useSelector } from 'react-redux'
import MarkInfo from '../share/MarkInfo'
import { Box, Fab, Paper, Stack, styled, Typography } from '@mui/material'
import { Add, Navigation, Remove, List } from '@mui/icons-material'
import { actions } from '../store/Reducer'


const { setMap, setBounds, setMarkerlist, setMyItem, setSelected, setFootbar } = actions

const Map = memo(() => {

  console.log('mapStart');
  const { mode, map, isClear, footbar } = useSelector(({Global}) => Global)
  const { nearlist, markerlist, listType, myItem } = useSelector(({MapList})=> MapList)
  const [center, setCenter] = useState(null)
  const dispatch = useDispatch()


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => 
      setCenter({lat: latitude, lng: longitude})
    )
  },[])

  const onLoad = useCallback( map => dispatch(setMap(map)), [dispatch])
  const onTilesLoaded = () => dispatch(setBounds(map.getBounds()))

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
    let newArr = [...markerlist, newItem]
    dispatch(setMarkerlist(newArr))
  }

  const mapType = useCallback(() => (
    listType === 'Near' ? nearlist : markerlist
  ),[listType, nearlist, markerlist])

  return (
    <RootBox>
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

      {nearlist?.length > 0 && 
      <div className='float'>
        <Fab onClick={()=>dispatch(setFootbar(!footbar))}>
          <List/>
        </Fab>
      </div>
      }
      
      <Stack diretcion='column' className='MuiStack-root'>  {/* ui buttons */}
        <Fab onClick={()=>map.setZoom(map.getZoom()+1)}>
          <Add/>
        </Fab>
        <Fab onClick={()=>map.setZoom(map.getZoom()-1)}>
          <Remove/>
        </Fab>
        <Fab onClick={()=>{map.panTo(center); map.setZoom(15)}}>
          <Navigation />
        </Fab>
      </Stack>

      {!isClear &&
      <>
      {mapType().map((item, i) =>  // list from api
      <Marker key={i} 
        position={{lat:Number(item.latitude),lng:Number(item.longitude)}}
        onClick={()=>dispatch(setSelected(i))}
      >
        <Paper elevation={6} sx={{cursor: 'pointer'}} >
          <Typography variant='p'>{item.name}</Typography>  
        </Paper>
      </Marker>
      )}

      {listType === 'MyMap' && markerlist.map((item, i) =>  // list from user click
      <Marker key={i}
        position={{ lat: item.lat, lng: item.lng }}
        onClick={()=>dispatch(setMyItem(item))}
      />
      )}

      {myItem && (<MarkInfo/>)}  {/* item user created */}
      </>
      }
    </GoogleMap>
    </RootBox> 
  )
})

export default Map

const RootBox = styled(Box)(({theme})=>`
  width: 100%;
  height: 100vh;
    ${[theme.breakpoints.down('md')]}{
      height: 89vh;
    }
    .MuiStack-root{
      position: fixed;
      bottom: 15%;
      right: 2%;
      gap: 20px;
    }
    .MuiFab-root{
      width: 40px;
      height: 40px;
      background: ${theme.palette.background.third};
      color: ${theme.palette.text.secondary};
      &:nth-of-type(3){
          color: rgb(30,155,255);
          transform: rotate(40deg);
        }
    }
    .float{
      position: fixed;
      bottom: 40%;
      right: 2%;
    }
`)
const userIcon = (color) => ({
  path: 'M 20.5 6 c -2.61 0.7 -5.67 1 -8.5 1 s -5.89 -0.3 -8.5 -1 L 3 8 c 1.86 0.5 4 0.83 6 1 v 13 h 2 v -6 h 2 v 6 h 2 V 9 c 2 -0.17 4.14 -0.5 6 -1 l -0.5 -2 Z M 12 6 c 1.1 0 2 -0.9 2 -2 s -0.9 -2 -2 -2 s -2 0.9 -2 2 s 0.9 2 2 2 Z',
  fillOpacity: 1,
  // strokeColor: color,
  fillColor: color,
  scale: 1.3,
})