import React, { useEffect, useMemo, memo } from 'react'
import { ThemeProvider, createTheme, Grid, useMediaQuery, useTheme } from '@mui/material'
import { connect } from 'react-redux'
import{ useLoadScript } from '@react-google-maps/api'
import Header from './views/Header'
import FootBar from './views/FootBar'
import Map from './views/Map'
import NearCard from './share/NearCard'
import MyItemCard from './share/MyItemCard'
import { darkTheme, lightTheme } from './theme/Theme'
import TPC from './fetch/Taipei_tw.json'  // use for design layout before deploy
import NTPC from './fetch/Banqiao_tw.json'  // use for design layout before deploy
// import { getPlaceData } from './api/ListV1'  // use for fetch real data
import Vconsole from 'vconsole'



const libraries = ['places']

const mapState = ({Global, MapList}) => ({
  mode: Global.mode,
  isClear: Global.isClear,
  bounds: Global.bounds,
  isMobile: Global.isMobile,
  nearList: MapList.nearList,
  detail: Global.detail,
  listType: MapList.listType
})
const mapDispatch = {
  setCenter: (val) => ({type: 'setCenter', payload: val}),
  setIsMobile: (val) => ({type: 'setIsMobile', payload: val}),
  setNearList: val => ({type: 'setNearList', payload: val})
}

const App = memo((state) => {
  
  console.log('appStart');
  const { mode, bounds, setCenter, setIsMobile, setNearList, nearList, detail, listType } = state
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
  })
  
  const designedTheme = useMemo(() => (
    mode === 'dark'? createTheme(darkTheme) : createTheme(lightTheme)
  ), [mode])

  useEffect(()=>{
    isMobile && new Vconsole()
    setIsMobile(isMobile)
  },[isMobile, setIsMobile])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => 
      setCenter({lat: latitude, lng: longitude})
    )
  },[setCenter])

  useEffect(()=>{
    console.log('App/useEffect2/getBounds',bounds)
    // getPlaceData(bounds).then(data=>{
    //     console.log(data);
    //     setNearList(data)
    // })
    let db = TPC.data.concat(NTPC.data)
    setNearList(db.filter(item => item.address))
  },[bounds,setNearList])
  
  return (
    <ThemeProvider theme={designedTheme}>
      {isLoaded && <Header/>}
      <Grid sx={{position:'relative'}}>
        {isLoaded && <Map/>}
        {nearList.length > 1 && <FootBar/>}
        {(listType === 'Near' && detail) && <NearCard/>}
        {(listType === 'MyMap' && detail) && <MyItemCard/>}
      </Grid>
    </ThemeProvider>
  )
})

export default connect(mapState, mapDispatch)(App)