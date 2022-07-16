import React, { useState, memo, useMemo, useCallback, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/Reducer'
import AutoComplete from '../share/Auto2'
import {
  AppBar, IconButton, Box, styled, Button,
  Switch, Stack, FormControl, Select, MenuItem, InputLabel 
} from '@mui/material'
import { 
  EditRoad, Favorite, NearMe, LightMode, DarkMode,
  CheckBoxOutlineBlank, MoreHoriz, AccountCircle 
} from '@mui/icons-material'


const { setMode, setIsClear, setListType } = actions

const Header = memo(() => {

  // console.log('headerStart');
  const dispatch = useDispatch()
  const { mode, isMobile, isClear } = useSelector( ({Global}) => Global )
  const { listType } = useSelector( ({MapList}) => MapList )

  const [isMenuBox, setIsMenuBox] = useState(false)
  const [isPopupBox, setIsPopupBox] = useState(false)
  const [rating, setRating] = useState('3.5 Up')
  const [distance, setDistance] = useState('2Km Less')

  const subMenu = useMemo(() => [
    { title: 'Type', icon: <EditRoad />, fun: () => setIsPopupBox(!isPopupBox) },
    { title: 'MyMap', icon: <Favorite />, fun: () => dispatch(setListType('MyMap')) },
    { title: 'Near', icon: <NearMe />, fun: () => dispatch(setListType('Near')) },
    { title: 'Clear', icon: <CheckBoxOutlineBlank />, 
      fun: () => dispatch(setIsClear(!isClear)) }
  ], [isClear, isPopupBox, dispatch])

  const selectOptions = useMemo(() => [{
    label: 'Rating',
    value: rating,
    options: ['3.5 Up', '4.0 Up', '4.5 Up', 'All'],
    set: setRating
  }, {
    label: 'Distance',
    value: distance,
    options: ['2Km Less', '5Km Less', '10Km Less', 'All'],
    set: setDistance
  }], [rating, distance])

  const activeColor = useCallback((item) => ({
    color: ( listType === item.title ? 'rgb(30,155,255)' : null ) ||
      (isClear && item.title === 'Clear' && 'green')
  }), [isClear, listType])

  

  return (
    <RootBox>

      <AppBox>
        <AutoComplete/>

        <Stack direction='row' gap={1}>
          <IconButton onClick={() => {}}>
            <AccountCircle fontSize={isMobile ? 'medium' : 'large'}/>
          </IconButton>
          <IconButton onClick={() => setIsMenuBox(!isMenuBox)}>
            <MoreHoriz fontSize={isMobile ? 'medium' : 'large'}/>
          </IconButton>
        </Stack>
      </AppBox>

      {isMenuBox &&
        <MenuBox>
          {isMobile ?
            subMenu.map((item, i) =>
            (<Button key={i} size='small' startIcon={item.icon} onClick={() => item.fun()}
              sx={activeColor(item)}
            />)
            ) :
            subMenu.map((item, i) =>
            (<Button key={i} size='small' startIcon={item.icon} onClick={() => item.fun()}
              sx={activeColor(item)}
            >
              {item.title}
            </Button>)
            )}
          {isMobile ?
            (<Switch size='small' checked={mode === 'dark' ? true : false}
              onChange={() => dispatch(setMode(mode === 'light' ? 'dark' : 'light'))}
            />) :
            (<Button size='small' startIcon={mode === 'dark' ? <DarkMode /> : <LightMode />}>
              <Switch size='small' checked={mode === 'dark' ? true : false}
                onChange={() => dispatch(setMode(mode === 'light' ? 'dark' : 'light'))}
              />
            </Button>)
          }
        </MenuBox>
      }

      {(isPopupBox && isMenuBox) &&
        <PopupBox>
          {selectOptions.map((item, i) =>
            <FormControl size='small' key={i}>
              <InputLabel id='label'>{item.label}</InputLabel>
              <Select
                value={item.value}
                id='select'
                labelId='label'
                label={item.label}
                sx={{ color: 'text.secondary' }}
                onChange={(e) => item.set(e.target.value)}
              >
                {item.options.map((item, i) =>
                  <MenuItem key={i} value={item} sx={{ fontSize: '14px' }}>
                    {item}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          )}
          <Button size='small' variant="contained" onClick={() => dispatch(setIsPopupBox(false))}>
            Apply
          </Button>
        </PopupBox>
      }
    </RootBox>
  )
})

export default Header

const RootBox = styled(Box)`
  position: fixed;
  z-index: 2;
`
const AppBox = styled(AppBar)(({ theme }) => ({
  padding: '10px',
  width: '25%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  marginTop: '10px',
  position: 'fixed',
  left: '1%',
  borderRadius: '10px',
  background: [theme.palette.background.main],
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    margin: '10px auto 0 auto',
  },
  '.MuiIconButton-root': {
    padding: 0,
    '.MuiSvgIcon-root': {
      color: [theme.palette.text.primary]
    },
    '&:nth-of-type(2)':{
      transform: 'rotate(90deg)'
    }
  },
}))
const MenuBox = styled(Box)(({ theme }) => `
  width: 40%;
  height: 50px;
  padding: 0 40px;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${theme.palette.background.secondary};
  color: ${theme.palette.primary.main};
  border-radius: 0 0 30px 30px;
  position: fixed;
  left: 0;
  right: 0;
  ${[theme.breakpoints.down('md')]}{
    width: 90%;
    padding: 0;
    border-radius: 10px;
    margin-top: 70px;
  }
`)
const PopupBox = styled(Box)(({ theme }) => `
  width: 30%;
  padding: 10px 5px 5px 5px;
  margin: auto;
  display: flex;
  border: 1px solid rgb(70,90,100);
  background: ${theme.palette.background.third};
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin-top: 55px;
  ${[theme.breakpoints.down('md')]}{
    padding: 10px 0 5px 0;
    width: 90%;
    margin-top: 125px;
    border-radius: 5px;
  }
    .MuiButton-root{
      max-Height: 25px;
    }
    .MuiSelect-select{
      font-weight: 700;
      font-size: 14px;
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