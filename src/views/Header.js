import React, { useState, memo, useCallback } from 'react'
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, styled,  alpha, useMediaQuery, Button, FormControlLabel, Switch, Grid } from '@mui/material'
import { Search, Menu, EditRoad, Favorite, NearMe, LightMode, DarkMode, CheckBoxOutlineBlank } from '@mui/icons-material'
import { Autocomplete } from '@react-google-maps/api'



const Header = memo(({setSideBarMenu, mode, setMode}) => {
  
  // console.log('headerStart');
  const [isDark, setIsDark] = useState(false)
  
  const isMobile = useMediaQuery('(max-width:600px')
  const subMenu = [
    {title: 'Type', icon: <EditRoad/>, fun: ()=>setSideBarMenu(true)},
    {title: 'MyMap', icon: <Favorite/>, fun: null},
    {title: 'Near', icon: <NearMe/>, fun: null},
    {title: 'Clear', icon: <CheckBoxOutlineBlank/>, fun: null}
  ]

  const handleSwitch = useCallback(()=>{
    setIsDark(!isDark)
    setMode(mode==='light' ? 'dark' : 'light')
  },[isDark])

  return (
    <>
    <AppBar position='static'>
      <Toolbar sx={{display:'flex', justifyContent:'space-between',
      color:'text.third'}}>

        {!isMobile && <Typography variant="h5">Attractions</Typography>}

        <FlexBox>
          {!isMobile && <Typography variant='h6'>Explore New Attraciton</Typography>}
          {/* <Autocomplete> */}
            <SearchBox>
              <IconWrapper><Search/></IconWrapper>
              <StyledInputBase placeholder='search...'/>
            </SearchBox>
          {/* </Autocomplete> */}
          <IconButton><Menu fontSize='large'/></IconButton>
        </FlexBox>
      </Toolbar>
    </AppBar>

    <SubGrid bgcolor={'background.paper'}>
      <Toolbar sx={{display:'flex', justifyContent:'center'}}>
        <SubFlexBox>
          {isMobile? subMenu.map((item, i)=>
            <Button key={i} size='small' startIcon={item.icon}
              onClick={()=>item.fun()}
            />
          ): subMenu.map((item, i)=>
            <Button key={i} size='small' startIcon={item.icon}
              onClick={()=>item.fun()}
            >
              {item.title}
            </Button>
            )
          }
          
          {isMobile? <Switch size='small' onChange={handleSwitch}/> :
          <Button size='small' startIcon={isDark? <DarkMode/>: <LightMode/>}>
            <Switch size='small' onChange={handleSwitch}/>
          </Button>
          }
        </SubFlexBox>
      </Toolbar>
    </SubGrid>
    </>
  )
})

export default Header

const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]:{
    width: '95%',
    margin: 'auto',
    justifyContent: 'space-between'
  },
  '.MuiButtonBase-root':{
    padding: 0
  }
}))
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
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      }
    }
  },
}))
const IconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const SubGrid = styled(Grid)(({theme})=>`
  .MuiToolbar-root{
    ${[theme.breakpoints.up('md')]}{
      min-height: auto;
    }
  }
`)
const SubFlexBox = styled(Box)(({theme})=>`
  width: 60%;
  height: 50px;
  padding: 0 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgb(220,220,220);
  border-radius: 0 0 30px 30px;
  ${[theme.breakpoints.down('md')]}{
    width: 95%;
    padding: 0;
    border-radius: 5px;
    margin-top: 15px;
  }
`)