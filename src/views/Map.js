import React, { useCallback, useMemo, memo, useState, useEffect } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { dark } from '../theme/MapTheme'
import { useDispatch, useSelector } from 'react-redux'
import MarkInfo from '../share/MarkInfo'
import { Box, Fab, Stack, styled } from '@mui/material'
import { Add, Navigation, Remove, List } from '@mui/icons-material'
import { actions } from '../store/Reducer'


const { 
  setMap, setBounds, setMarkerlist, setMyItem, setSelected, setFootbar, setInfowindow 
} = actions

const Map = memo(() => {

  console.log('mapStart');
  const { mode, map, isClear, footbar } = useSelector(({Global}) => Global)
  const { nearlist, markerlist, listType, myItem, selected, infowindow } = useSelector(({MapList})=> MapList)
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

  const mapType = useCallback(() => (
    listType === 'Near' ? nearlist : markerlist
  ),[listType, nearlist, markerlist])

  const userIcon = useCallback((color) => ({
    path: 'M 20.5 6 c -2.61 0.7 -5.67 1 -8.5 1 s -5.89 -0.3 -8.5 -1 L 3 8 c 1.86 0.5 4 0.83 6 1 v 13 h 2 v -6 h 2 v 6 h 2 V 9 c 2 -0.17 4.14 -0.5 6 -1 l -0.5 -2 Z M 12 6 c 1.1 0 2 -0.9 2 -2 s -0.9 -2 -2 -2 s -2 0.9 -2 2 s 0.9 2 2 2 Z',
    fillOpacity: 1,
    // strokeColor: color,
    fillColor: color, 
    scale: 1.3,
  }),[])
  
  const markerIcon = useCallback((color) => ({
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillOpacity: 1,
    // strokeColor: color,
    fillColor: color,
    scale: 1.3,
  }),[])

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

      <Marker  // user position 
        position={center} 
        icon={mode==='dark'? userIcon('#81d4fa') : userIcon('orange')}
      />

      {!isClear &&
      <>
        {mapType().map((item, i) =>  // list from api
        <Marker 
          key={i}
          icon={ 
            mode==='dark'? 
            (selected===i ? markerIcon('#ef5350') : markerIcon('orange')) : 
            (selected===i ? markerIcon('orange') : markerIcon('#ef5350')) 
          }
          animation={ selected===i && window.google.maps.Animation.DROP }
          position={{
            lat: item.geometry.location.lat(),
            lng: item.geometry.location.lng(),
          }}
          onClick={()=>{
            dispatch(setInfowindow(item))
            dispatch(setSelected(i))
          }}
        />
        )}

        {infowindow &&
        <InfoWindow 
          position={{
            lat: infowindow.geometry.location.lat(),
            lng: infowindow.geometry.location.lng()
          }}
          onCloseClick={()=>dispatch(setInfowindow(null))}
        >
          <div>{infowindow.name}</div>
        </InfoWindow>
        }

        {listType === 'MyMap' && markerlist.map((item, i) =>  // list from user click
        <Marker key={i}
          position={{ lat: item.lat, lng: item.lng }}
          onClick={()=>dispatch(setMyItem(item))}
        />
        )}

        {myItem && (<MarkInfo/>)}  {/* item user created */}
      </>
      }

      <Stack diretcion='column' className='MuiStack-root'>  {/* ui buttons */}
        {nearlist?.length > 0 &&  // searched list
        <Fab onClick={()=>dispatch(setFootbar(!footbar))}>
          <List/>
        </Fab>
        }
        <Fab onClick={()=>map.setZoom(map.getZoom()+1)}>
          <Add/>
        </Fab>
        <Fab onClick={()=>map.setZoom(map.getZoom()-1)}>
          <Remove/>
        </Fab>
        <Fab className='fab-nav' onClick={()=>{map.panTo(center); map.setZoom(15)}}>
          <Navigation />
        </Fab>
      </Stack>

    </GoogleMap>
    </RootBox> 
  )
})

export default Map

const RootBox = styled(Box)(({theme})=>`
  width: 100%;
  height: 100vh;
  position: relative;
  ${[theme.breakpoints.down('md')]}{
    height: 89vh;
  }
    .MuiStack-root{
      position: absolute;
      bottom: 15%;
      right: 2%;
      gap: 20px;
    }
    .MuiFab-root{
      width: 36px;
      height: 36px;
      background: ${theme.palette.background.third};
      color: ${theme.palette.text.secondary};
    }
    .fab-nav{
      color: rgb(30,155,255);
      transform: rotate(40deg);
    }
    .MuiSvgIcon-root{
      font-size: 20px;
    }
`)