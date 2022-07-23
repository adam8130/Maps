import React, { useRef, useState, memo, useCallback } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { styled, Box, Input, Autocomplete } from '@mui/material'
import { Search } from '@mui/icons-material'
import { actions } from "../store/Reducer"


const { setNearlist } = actions

const AutoComplete = memo(() => {

  console.log('auto')
  const dispatch = useDispatch()
  const { bounds, map } = useSelector( ({Global}) => Global )
  const [data, setData] = useState([])
  const input = useRef(null)
  const markers = useRef([])


  const getOptionLabel = (e) => (
    (e.terms && e.terms[0].value) || input.current.value
  )

  const renderInput = ({ InputLabelProps, InputProps, ...rest }) => (
    <Input inputRef={input} disableUnderline {...InputProps} {...rest}/>
  )

  const getPrediction = useCallback((val) => {
    if (!val) {
      setData([])
      dispatch(setNearlist([]))
      return
    } 
    let sessionToken = new window.google.maps.places.AutocompleteSessionToken()
    const service = new window.google.maps.places.AutocompleteService()
    const options = {
      input: val,
      bounds: bounds,
      sessionToken
    }
    const callback = (predictions) => predictions && setData(predictions)
    service.getQueryPredictions(options, callback)
  },[dispatch, bounds])
  
  const getTextSearch = (_, val) => {
    markers.current.forEach((marker, i) => marker.setMap(null))
    if (val) {
      markers.current = []
      const request = { 
        query: val.description || input.current.value, 
        openNow: false
      }
      const service = new window.google.maps.places.PlacesService(map)
      service.textSearch(request, callback)
    }
  }
  
  const callback = results => {
    const viewport = new window.google.maps.LatLngBounds()
    console.log(viewport)
    results?.forEach( place => {
      if (place.geometry.viewport) {
        viewport.union(place.geometry.viewport)
      } else {
        viewport.extend(place.geometry.location)
      }
    })
    results.forEach(item => {
      item.opening_hours = null
      delete item.permanently_closed
    })
    let filteredResults = results.filter(item => item.photos)
    map.fitBounds(viewport)
    dispatch(setNearlist(filteredResults))
  }


  return (
    <RootBox>
        <Search/>
        <Autocomplete
          options={data}
          onChange={getTextSearch}
          onInputChange={(_,val)=>getPrediction(val)}
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
          onKeyDown={(e)=> e.key==='Enter' && getTextSearch(null,input.current.value)}
          freeSolo
        />
    </RootBox>
  )
})

export default AutoComplete

const RootBox = styled(Box)(({ theme }) => ({
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
  '.MuiInput-root':{
    color: 'inherit',
    padding: '0 0 0 40px',
  },
  '>.MuiSvgIcon-root':{
    marginLeft: '10px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
  },
  '.MuiButtonBase-root':{
    '.MuiSvgIcon-root':{
      fontSize: '20px',
    }
  },
  '.MuiAutocomplete-endAdornment':{
    right: '5px',
    top: '0',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  }
}))