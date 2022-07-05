import React, { useMemo, useState, memo, createRef, useEffect, useCallback } from 'react'
import { Box, Card, CardMedia, styled, Typography } from '@mui/material'



const FootBar = memo(({places, selected, setDetail}) => {
  
  // console.log('sidebarStart');

  const [refArr,setRefArr] = useState([])
  const [prevSpot, setPrevSpot] = useState(null)

  const filteredPlaces = useMemo(() => (
    places.filter((item)=> item.address)
  ),[places])

  const spotting = useCallback(() => {
    refArr[selected]?.current?.scrollIntoView({behavior:'smooth', inline:'start'})
    refArr[selected].current.style.transform = 'translateY(-30px) scale(1.1)'
    if(prevSpot){
      refArr[prevSpot].current.style.transform = 'translateY(0) scale(1.0)'
    }
    setPrevSpot(selected)
  },[selected])

  useEffect(()=>{
    const refs = Array(filteredPlaces.length).fill().map((_, i)=>createRef())
    setRefArr(refs)
  },[filteredPlaces])

  useEffect(()=>{
    selected && spotting()
  },[selected])

  return (
    <RootBox>
      <FlexBox>
        {filteredPlaces.map((item, i)=>
        <Card elevation={6} key={i} ref={refArr[i]} onClick={()=>setDetail(item)}>
          <CardMedia image={item.photo.images.large.url}/>
          <Typography variant='p' component='div'>{item.name}</Typography>
        </Card>
        )}
      </FlexBox>
    </RootBox>
  )
})

export default FootBar


const RootBox = styled(Box)(({theme})=>({
  position: 'absolute',
  width: '95vw',
  bottom: '0',
  padding: '10px',
  zIndex: '2',
  [theme.breakpoints.down('md')]:{
    padding: '16px',
  }
}))
const FlexBox = styled(Box)(({theme})=>`
  width: 100%;
  padding-top: 30px;
  display: -webkit-box;
  overflow-x: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    .MuiCard-root{
      width: 7%;
      margin: 0 5px;
      transition: all 0.5s;
      ${[theme.breakpoints.down('sm')]}{
        width: 20%;
      }
    }
    .MuiCardMedia-root{
      width: 100%;
      height: 70px;
    }
    .MuiTypography-root{
      padding: 5px;
      overflow : hidden;
      white-space : nowrap;
      text-align: center;
      text-overflow: ellipsis;
    }
`)