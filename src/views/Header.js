import React, { useState, memo, useMemo, useCallback } from 'react'
import { AppBar, Typography, InputBase, IconButton, Box, styled,  alpha, Button, Switch, Stack, FormControl, Select, MenuItem } from '@mui/material'
import { Search, Menu, EditRoad, Favorite, NearMe, LightMode, DarkMode, CheckBoxOutlineBlank, KeyboardArrowUp } from '@mui/icons-material'
import { Autocomplete } from '@react-google-maps/api'
import { connect } from 'react-redux'


const mapState = ({Global, MapList}) => ({
  mode: Global.mode,
  isClear: Global.isClear,
  isMobile: Global.isMobile,
  listType: MapList.listType
})
const mapDispatch = {
  setMode: val => ({type: 'setMode', payload: val}),
  setIsClear: val => ({type: 'setIsClear', payload: val}),
  setListType: val => ({type: 'setListType', payload: val})
}

const Header = memo((state) => {
  
  // console.log('headerStart');
  const { mode, isMobile, setIsClear, isClear, setMode, listType, setListType } = state
  const [isOpen, setIsOpen] = useState(true)
  const [isTrigger, setIsTrigger] = useState(false)
  const [type, setType] = useState('Restaurants')
  const [rating, setRating] = useState('3.5 up')
  const [distance, setDistance] = useState('2Km less')

  const subMenu = useMemo(()=>[
    { title: 'Type', icon: <EditRoad/>, fun: ()=>setIsTrigger(!isTrigger) },
    { title: 'MyMap', icon: <Favorite/>, fun: ()=>setListType('MyMap') },
    { title: 'Near', icon: <NearMe/>, fun: ()=>setListType('Near') },
    { title: 'Clear', icon: <CheckBoxOutlineBlank/>, fun: ()=>setIsClear(!isClear )}
  ],[isClear, setIsClear, isTrigger, setListType])
  
  const selectOptions = useMemo(()=>[{
    label: type,
    options: [ 'Restaurants', 'Hotel', 'Attraction'],
    set: setType
  },{
    label: rating,
    options: [ '3.5 up', '4.0 up', '4.5 up', 'All' ],
    set: setRating
  },{
    label: distance,
    options: [ '2Km less', '5Km less', '10Km less', 'All' ],
    set: setDistance
  }],[type, rating, distance])

  const activeColor = useCallback((item) => ({
    color: (listType === item.title? 'rgb(30,155,255)': null) ||
    (isClear && item.title === 'Clear' && 'green')
  }),[isClear, listType])

  return (
    <>
    <AppBox>
      <Stack direction='row'>
        {!isMobile && <Typography variant="h5">Attractions</Typography>}
        <Autocomplete>
          <SearchBox>
            <Box><Search/></Box>
            <InputBase placeholder='search...'/>
          </SearchBox>
        </Autocomplete>
      </Stack>
      <IconButton onClick={()=>setIsOpen(!isOpen)}>
        <Menu fontSize='large'/>
      </IconButton>
    </AppBox>

    {isOpen &&
    <MenuBox sx={{bgcolor: 'background.secondary', color: 'primary.main'}}>
      {isMobile? 
      subMenu.map((item, i)=>
        (<Button key={i} size='small'startIcon={item.icon} onClick={()=>item.fun()}
          sx={activeColor(item)}
        />)
      ) : 
      subMenu.map((item, i)=>
        (<Button key={i} size='small' startIcon={item.icon} onClick={()=>item.fun()}
          sx={activeColor(item)}
        >
          {item.title}
        </Button>)
      )}
      {isMobile? 
      (<Switch size='small' checked={mode==='dark'? true: false}
        onChange={()=>setMode(mode==='light'? 'dark': 'light')}
      />) :
      (<Button size='small' startIcon={mode==='dark'? <DarkMode/>: <LightMode/>}>
        <Switch size='small' checked={mode==='dark'? true: false} 
          onChange={()=>setMode(mode==='light'? 'dark': 'light')}
        />
      </Button>)
      }
    </MenuBox>
    }

    {isTrigger &&
    <PopupBox sx={{bgcolor: 'background.third',  }}>
      {selectOptions.map((item, i)=>
      <FormControl size='small' key={i}>
        <Select value={item.label} onChange={(e)=>item.set(e.target.value)}
          variant='standard' sx={{color: 'text.secondary'}}
        >
          {item.options.map((item,i)=>
          <MenuItem key={i} value={item} sx={{fontSize:'14px'}}>
            {item}
          </MenuItem>
          )}
        </Select>
      </FormControl>  
      )}
      <Button size='small' variant="contained" onClick={()=>{}}>
        Go
      </Button>
      <Button size='small' variant="contained" onClick={()=>setIsTrigger(false)}>
          <KeyboardArrowUp/>
      </Button>
    </PopupBox>
    }
    </>
  )
})

export default connect(mapState, mapDispatch)(Header)

const AppBox = styled(AppBar)(({ theme }) => ({
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  position: 'relative',
  [theme.breakpoints.down('md')]:{
    width: '100%',
    borderRadius: '10px',
    position: 'fixed',
  },
    '.MuiButtonBase-root':{
      padding: 0,
    }
}))
const MenuBox = styled(Box)(({theme})=>`
  width: 60%;
  height: 50px;
  margin: auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgb(220,220,220);
  border-radius: 0 0 30px 30px;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  ${[theme.breakpoints.down('md')]}{
    width: 95%;
    padding: 0;
    border-radius: 5px;
    margin-top: 15px;
  }
`)
const PopupBox = styled(Box)(({theme})=>`
  width: 40%;
  padding: 5px;
  margin: auto;
  display: flex;
  background: rgb(240,240,240);
  border: 1px solid rgb(70,90,100);
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  border-radius: 10px;
  left: 0;
  right: 0;
  top: 16%;
  z-index: 2;
  ${[theme.breakpoints.down('md')]}{
    padding: 5px 0;
    width: 90%;
    border-radius: 5px;
    margin-top: 15px;
  }
    .MuiButton-root{
      max-width: 30px;
      max-Height: 25px;
      min-width: 0
    }
    .MuiSelect-select{
      font-weight: 700;
      font-size: 14px;
        ${[theme.breakpoints.down('sm')]}{
          max-width: 40px;
        }
    }
    .MuiInput-root{
      &::before{
        display:none;
      }
      .MuiSvgIcon-root{
        top: 0;
      }
    }
    .MuiPaper-root{
      border: 10px;
      .MuiList-root{
        font-size: 14px;
      }
    }
`)
const SearchBox = styled(Box)(({ theme }) => ({
  width: '100%',
  marginLeft: 0,
  position: 'relative',
  borderRadius: '5px',
  transition: 'all 0.3s',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      width: 'auto'
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    width: 'auto'
  },
    '.MuiInputBase-root':{
      color: 'inherit',
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '25ch',
          }
      }
    },
    '.MuiBox-root':{
      padding: theme.spacing(2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
}))