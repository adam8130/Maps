import React, { useMemo, useState, memo } from 'react'
import { Box, Button, FormControl, MenuItem, Select, styled, Typography } from '@mui/material'
import PlacesCard from '../share/PlacesCard'
import { KeyboardArrowUp } from '@mui/icons-material'



const SideBar = memo(({places, selected, isTrigger, setSideBarMenu}) => {
  
  // console.log('sidebarStart');
  const [type, setType] = useState('Restaurants')
  const [rating, setRating] = useState('Above 3.5')
  const [distance, setDistance] = useState('Less Than 2Km')

  const selectOptions = [{
    label: type,
    options: [ 'Restaurants', 'Hotel', 'Attraction'],
    set: setType
  },{
    label: rating,
    options: [ 'Above 3.5', 'Above 4.0', 'Above 4.5', 'All' ],
    set: setRating
  },{
    label: distance,
    options: [ 'Less Than 2Km', 'Less Than 5Km', 'Less Than 10Km', 'All' ],
    set: setDistance
  }]

  return (
    <RootBox>

      {isTrigger &&
      <StyledBox px='3%'>
        {selectOptions.map((item, i)=>
        <FormControl size='small' key={i}>
          <Select value={item.label} sx={{maxWidth:'100px'}}
            onChange={(e)=>item.set(e.target.value)}
            >
            {item.options.map((item,i)=>
              <MenuItem key={i} value={item}>{item}</MenuItem>
            )}
          </Select>
        </FormControl>  
        )}

        <StyledButton size='small' variant="contained" onClick={()=>{}}>
          Go
        </StyledButton>
          <StyledButton size='small' variant="contained" 
            onClick={()=>setSideBarMenu(false)}>
            <KeyboardArrowUp/>
        </StyledButton>
      </StyledBox>
      }

      {places && <PlacesCard places={places} selected={selected}/>}

    </RootBox>
  )
})

export default SideBar

const RootBox = styled(Box)(({theme})=>({
  padding: '10px',
  [theme.breakpoints.down('md')]:{
    padding: '16px',
  },
}))
const StyledBox = styled(Box)`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`
const StyledButton = styled(Button)(({theme})=>({
  maxWidth: '30px',
  minWidth: 0,
  color: theme.palette.primary
}))