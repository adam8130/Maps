import React, { useEffect, useRef, useState } from "react"
import * as m from '@googlemaps/react-wrapper'
import { Wrapper, Status } from "@googlemaps/react-wrapper"

const App2 = () => {

  console.log(m)

  return (
    <Wrapper apiKey={process.env.REACT_APP_API_KEY}>

      <Map/>
    </Wrapper>
  )
}

const Map = () => {

  const [map, setMap] = useState()
  const ref = useRef()

  useEffect(()=>{
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current,{
        center: {
          lat: 25, lng: 121
        },
        zoom: 15
      }))
    }
  },[])

  return(
    <div ref={ref} style={{width:'100vw', height: '100vh'}}>

    </div>
  )
}

export default App2