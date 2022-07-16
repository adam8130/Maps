import React, { useRef, useState, memo } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { styled, Box, Input, Autocomplete } from '@mui/material'
import { Search } from '@mui/icons-material'
import { actions } from "../store/Reducer"


const { setNearlist, setSelected } = actions

const Auto = memo(() => {

  console.log('auto')
  const dispatch = useDispatch()
  const { bounds, map } = useSelector( ({Global}) => Global )
  const markers = useRef([])
  const [data, setData] = useState([])


  const getOptionLabel = ({ terms }) => (
    terms[2]? terms[0].value + terms[2].value : terms[0].value
  )

  const renderInput = ({ InputLabelProps, InputProps, ...rest}) => (
    <Input disableUnderline {...InputProps} {...rest}/>
  )

  const getPrediction = (val) => {
    if (!val) {
      setData([])
      return
    } 
    let sessionToken = new window.google.maps.places.AutocompleteSessionToken()
    const service = new window.google.maps.places.AutocompleteService()
    const options = {
      input: val,
      bounds: bounds,
      sessionToken
    }
    service.getQueryPredictions(options, (predictions) => setData(predictions))
  }
  
  const onChange = (_, val) => {
    markers.current.forEach((marker, i) => marker.setMap(null))
    if (val) {
      markers.current = []
      const service = new window.google.maps.places.PlacesService(map)
      service.textSearch({ query: val.description, openNow: true }, callback)
    }
  }
  
  const callback = results => {
    const viewport = new window.google.maps.LatLngBounds()
    results?.forEach( place => {
      markers.current.push(
        new window.google.maps.Marker({
          title: place.name,
          position: place.geometry.location,
          map: map
        })
      )
      if (place.geometry.viewport) {
        viewport.union(place.geometry.viewport)
      } else {
        viewport.extend(place.geometry.location)
      }
    })

    markers.current.forEach((marker, i) => marker.addListener('click', () => {
      const infowindow = new window.google.maps.InfoWindow({
        content: marker.title
      })
      infowindow.open({
        anchor: marker,
        map: map,
        shouldFocus: false,
      })
      dispatch(setSelected(i))
    }))
    map.fitBounds(viewport)
    results.forEach(item => item.opening_hours = null)
    dispatch(setNearlist(results))
  }

  return (
    <SearchBox>
        <Search/>
        <Autocomplete
          options={data}
          onChange={onChange}
          onInputChange={(_,val)=>getPrediction(val)}
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
          freeSolo
        />
    </SearchBox>
  )
})

export default Auto

const SearchBox = styled(Box)(({ theme }) => ({
  width: '100%',
  marginLeft: 0,
  position: 'relative',
  borderRadius: '5px',
  transition: 'all 0.5s',
  backgroundColor: 'rgba(255,255,255,0.15)',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '10px',
    width: '50%'
  },
  '&:focus-within':{
    width: '100%',
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  '.MuiInputBase-root':{
    color: 'inherit',
    padding: '0 0 0 40px',
    'input':{
      height: '24px',
    }
  },
  '>.MuiSvgIcon-root':{
    marginLeft: '10px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
  },
  '.MuiAutocomplete-endAdornment':{
    right: '5px',
    top: '0',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  }
}))