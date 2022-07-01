import React, { useEffect, useState, useMemo, memo } from 'react'
import { ThemeProvider, createTheme, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useLoadScript } from '@react-google-maps/api'
import Header from './views/Header'
import SideBar from './views/SideBar'
import Map from './views/Map'
import { darkTheme, lightTheme } from './theme/Theme'
import tpcTw from './fetch/Taipei_tw.json'  // use for design layout before deploy
import ntpcTw from './fetch/Banqiao_tw.json'  // use for design layout before deploy
// import { getPlaceData } from './api/ListV1'  // use for fetch real data
// import { zhTW } from '@mui/material/locale'
import Vconsole from 'vconsole'



const App = memo(() => {
  
  // console.log('appStart');
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mode, setMode] = useState('light')
  const [places, setPlaces] = useState([])  // places mapping on the map
  const [center, setCenter] = useState({})  // initCenter for the map
  const [bounds, setBounds] = useState({})  // scope in the current map
  const [selected, setSelected] = useState(null)  // selected point's index
  const [sideBarMenu, setSideBarMenu] = useState(false)
  
  const designedTheme = useMemo(() => (
    mode==='dark'? createTheme(darkTheme) : createTheme(lightTheme)
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
    let db = tpcTw.data.concat(ntpcTw.data)
    // console.log(db);
    setPlaces(ntpcTw.data)
  },[bounds])

  return (
    <ThemeProvider theme={designedTheme}>
      <Header setSideBarMenu={setSideBarMenu} mode={mode} setMode={setMode}
        isMobile={isMobile}
      />

      <Grid container bgcolor={'background.paper'}>
        <Grid item xs={12} md={4}>
          <SideBar places={places} selected={selected} 
            isTrigger={sideBarMenu} setSideBarMenu={setSideBarMenu}
          />
        </Grid>

        <Grid item xs={12} md={8} py='10px' px='20px'>
          <Map setBounds={setBounds} center={center} places={places}
              setSelected={setSelected}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
})

export default App