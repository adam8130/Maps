import React, { useState, memo } from 'react'
import { AppBar, Typography, InputBase, IconButton, Box, styled,  alpha, Button, Switch, Stack, FormControl, Select, MenuItem } from '@mui/material'
import { Search, Menu, EditRoad, Favorite, NearMe, LightMode, DarkMode, CheckBoxOutlineBlank, KeyboardArrowUp } from '@mui/icons-material'
import { Autocomplete } from '@react-google-maps/api'



const Header = memo(({ mode, setMode, isMobile, setIsClear, isClear}) => {
  
  // console.log('headerStart');
  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isTrigger, setIsTrigger] = useState(false)
  const [type, setType] = useState('Restaurants')
  const [rating, setRating] = useState('Above 3.5')
  const [distance, setDistance] = useState('Less Than 2Km')

  const subMenu = [
    {title: 'Type', icon: <EditRoad/>, fun: ()=>setIsTrigger(true)},
    {title: 'MyMap', icon: <Favorite/>, fun: ()=>{}},
    {title: 'Near', icon: <NearMe/>, fun: ()=>{}},
    {title: 'Clear', icon: <CheckBoxOutlineBlank/>, fun: ()=>setIsClear(!isClear)}
  ]
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

  const handleSwitch = () => {
    setIsDark(!isDark)
    setMode(mode==='light' ? 'dark' : 'light')
  }

  return (
    <>
    <AppBar position='static'>
      <AppBox>
        <Stack direction='row'>
          {!isMobile && <Typography variant="h5">Attractions</Typography>}
          <Autocomplete onLoad={(e)=>console.log(e)}>
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
    </AppBar>

    {isOpen &&
    <MenuBox>
      {isMobile? subMenu.map((item, i)=>
        (<Button key={i} size='small'startIcon={item.icon} onClick={()=>item.fun()}/>)
      ) : subMenu.map((item, i)=>
        (<Button key={i} size='small' startIcon={item.icon}onClick={()=>item.fun()}>
          {item.title}
        </Button>)
      )}
      {isMobile? 
      (<Switch size='small' onChange={handleSwitch}/>) :
      (<Button size='small' startIcon={isDark? <DarkMode/>: <LightMode/>}>
        <Switch size='small' onChange={handleSwitch}/>
      </Button>)
      }
    </MenuBox>}

    {isTrigger &&
    <PopupBox>
      {selectOptions.map((item, i)=>
      <FormControl size='small' key={i}>
        <Select value={item.label} 
          onChange={(e)=>item.set(e.target.value)}
          >
          {item.options.map((item,i)=>
            <MenuItem key={i} value={item}>{item}</MenuItem>
          )}
        </Select>
      </FormControl>  
      )}
      <Button size='small' variant="contained" onClick={()=>{}}>
        Go
      </Button>
        <Button size='small' variant="contained" 
          onClick={()=>setIsTrigger(false)}>
          <KeyboardArrowUp/>
      </Button>
    </PopupBox>
    }
    </>
  )
})

export default Header

const AppBox = styled(Box)(({ theme }) => ({
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]:{
    width: '95%',
    margin: 'auto',
  },
    '.MuiButtonBase-root':{
      padding: 0
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
  border: 1px solid rgba(200,200,200,0.6);
  margin: auto;
  display: flex;
  background: rgb(250,250,250);
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 15%;
  z-index: 2;
  ${[theme.breakpoints.down('md')]}{
    width: 80%;
    padding: 0;
    border-radius: 5px;
    margin-top: 15px;
  }
    .MuiButton-root{
      max-width: 30px;
      min-width: 0
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