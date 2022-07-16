import React, { useEffect, useMemo, memo } from 'react'
import { ThemeProvider, createTheme, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useLoadScript } from '@react-google-maps/api'
import Header from './views/Header'
import FootBar from './views/FootBar'
import Map from './views/Map'
import NearCard from './share/NearCard'
import MyItemCard from './share/MyItemCard'
import { darkTheme, lightTheme } from './theme/Theme'
// import TPC from './fetch/Taipei_tw.json'  // use for design layout before deploy
// import NTPC from './fetch/Banqiao_tw.json'  // use for design layout before deploy
// import { getPlaceData } from './api/ListV1'  // use for fetch real data
import Vconsole from 'vconsole'
import { actions } from './store/Reducer'


const { setIsMobile } = actions

const libraries = ['places']

const App = memo((state) => {
  
  console.log('appStart');
  const { mode, footbar } = useSelector(({ Global }) => Global)
  const dispatch = useDispatch()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries
  })
  
  const designedTheme = useMemo(() => (
    mode === 'dark'? createTheme(darkTheme) : createTheme(lightTheme)
  ), [mode])

  useEffect(()=>{
    isMobile && new Vconsole()
    dispatch(setIsMobile(isMobile))
  },[isMobile, dispatch])


  // useEffect(()=>{
  //   console.log('App/useEffect2/getBounds',bounds)
  //   // getPlaceData(bounds).then(data=>{
  //   //     console.log(data);
  //   //     setNearList(data)
  //   // })
  //   // let db = TPC.data.concat(NTPC.data)
  //   setNearList(NTPC.data.filter(item => item.address))
  //   console.log(NTPC);
  // },[bounds,setNearList])
  
  return (
    <ThemeProvider theme={designedTheme}>
      {isLoaded && <Header/>}
      <Grid sx={{position:'relative'}}>
        {isLoaded && <Map/>}
        {footbar && <FootBar/>}
        {/* {(listType === 'Near' && detail) && <NearCard/>}
        {(listType === 'MyMap' && detail) && <MyItemCard/>} */}
      </Grid>
    </ThemeProvider>
  )
})

export default App