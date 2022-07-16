import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Autocomplete, InputBase, Box, styled } from '@mui/material'
import Search from '@mui/icons-material/Search'
import { actions } from "../store/Reducer"



const { setSearchDot } = actions

const AutoComplete = () => {

    const { bounds, map } = useSelector( ({Global}) => Global )
    const dispatch = useDispatch()

    const { value, suggestions: { data }, setValue} = usePlacesAutocomplete({
        requestOptions: {
          bounds: bounds
        }
    })
    console.log(data)

    const getOptionLabel = (option) => (
      typeof option === 'string' ? option : option.description
    )
    const renderInput = (params) => {
      const {InputLabelProps,InputProps,...rest} = params
      return (
        <InputBase {...params.InputProps} {...rest}/>
      )
    }
    const onChange = async (_, val) => {
      if(val){
        const results = await getGeocode({ address: val.description })
        const {lat, lng} = getLatLng(results[0])
        map.panTo({lat:lat, lng:lng})
        dispatch(setSearchDot({lat:lat, lng:lng}))
      }
    }

    return (
        <SearchBox>
            <Search/>
            <Autocomplete
              options={data}
              inputValue={value}
              onChange={onChange}
              onInputChange={(_,val)=>setValue(val)}
              getOptionLabel={getOptionLabel}
              renderInput={renderInput}
              freeSolo
            />
        </SearchBox>
    )
}

export default AutoComplete

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
    paddingLeft: '40px',
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