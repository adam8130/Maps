import React, { useEffect, useState, useMemo, memo } from 'react'
import { ThemeProvider, createTheme, Grid, useMediaQuery, 
  useTheme } from '@mui/material'
import { connect } from 'react-redux'
import{ useLoadScript } from '@react-google-maps/api'
import Header from './views/Header'
import FootBar from './views/FootBar'
import Map from './views/Map'
import PlacesCard from './share/PlacesCard'
import { darkTheme, lightTheme } from './theme/Theme'
// import tpcTw from './fetch/Taipei_tw.json'  // use for design layout before deploy
// import { getPlaceData } from './api/ListV1'  // use for fetch real data
import ntpcTw from './fetch/Banqiao_tw.json'  // use for design layout before deploy
import Vconsole from 'vconsole'


const libraries = ['places']

const App = memo(() => {
  
  console.log('appStart');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
  })
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [mode, setMode] = useState('light')
  const [places, setPlaces] = useState([])  // places mapping on the map
  const [center, setCenter] = useState({})  // initCenter for the map
  const [bounds, setBounds] = useState({})  // scope in the current map
  const [selected, setSelected] = useState(null)  // selected point's index
  const [detail, setDetail] = useState(null)
  const [isClear, setIsClear] = useState(false)
  
  const designedTheme = useMemo(() => (
    mode === 'dark'? createTheme(darkTheme) : createTheme(lightTheme)
  ), [mode])

  useEffect(()=>{
    isMobile && new Vconsole()
  },[isMobile])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCenter({lat: latitude, lng: longitude})
    })
  },[])

  useEffect(()=>{
    console.log('App/useEffect2/getBounds',bounds)
    // getPlaceData(bounds).then(data=>{
    //     console.log(data);
    //     setPlaces(data)
    // })
    // let db = tpcTw.data.concat(ntpcTw.data)
    // console.log(db);
    setPlaces(ntpcTw.data)
  },[bounds])
  
  return (
    <ThemeProvider theme={designedTheme}>
    {isLoaded &&
    <Header mode={mode} setMode={setMode} isMobile={isMobile}
      setIsClear={setIsClear} isClear={isClear}
    />
    }
    <Grid sx={{position:'relative'}}>
      {isLoaded &&
      <Map setBounds={setBounds} center={center} places={places}
        setSelected={setSelected} mode={mode} isClear={isClear}
      />
      }
      {places.length > 1 && 
      <FootBar places={places} selected={selected} setDetail={setDetail}/>
      }
            
      {detail && <PlacesCard detail={detail} setDetail={setDetail}/>}
    </Grid>
    </ThemeProvider>
  )
})

const mapState = () => ({

})

const mapDispatch = () => ({
  
})
export default connect(mapState, mapDispatch)(App)