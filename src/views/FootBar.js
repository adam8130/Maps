import React, { useState, memo, createRef, useEffect, useCallback } from 'react'
import { Box, Card, CardMedia, styled, Typography } from '@mui/material'
import { connect } from 'react-redux'



const mapState = ({Global, MapList}) => ({
  isClear: Global.isClear,
  selected: Global.selected,
  detail: Global.detail,
  nearList: MapList.nearList,
  markerList: MapList.markerList,
  listType: MapList.listType,
})
const mapDispatch = {
  setDetail: val => ({type: 'setDetail', payload: val})
}

const FootBar = memo((state) => {
  
  // console.log('sidebarStart');
  const {nearList, selected, setDetail, isClear, listType, markerList} = state
  const [refArr,setRefArr] = useState([])
  const [prevSpot, setPrevSpot] = useState(null)
  
  const spotting = useCallback(() => {
    console.log(selected);
    refArr[selected]?.current?.scrollIntoView({behavior:'smooth', inline:'start'})
    refArr[selected].current.style.transform = 'translateY(-30px) scale(1.1)'
    if(prevSpot)
    refArr[prevSpot].current.style.transform = 'translateY(0) scale(1.0)'
    setPrevSpot(selected)
  },[selected, refArr])

  useEffect(()=>{
    const refs = Array(nearList.length).fill().map((_, i)=>createRef())
    setRefArr(refs)
  },[nearList])

  useEffect(()=>{
    selected && spotting()
  },[selected, spotting])

  const mapType = useCallback(() => (
    listType === 'Near' ? nearList : markerList
  ),[listType, markerList, nearList])

  return (
    <RootBox>
      {!isClear && 
      <FlexBox>
        {mapType().map((item, i)=>
        <Card elevation={6} key={i} ref={refArr[i]} onClick={()=>setDetail(item)}>
          <CardMedia image={item.photo?.images?.large.url || item.photo}/>
          <Typography variant='p' component='div'>{item.name}</Typography>
        </Card>
        )}
      </FlexBox>
      }
    </RootBox>
  )
})

export default connect(mapState, mapDispatch)(FootBar)


const RootBox = styled(Box)(({theme})=>({
  position: 'absolute',
  width: '95vw',
  bottom: '0',
  padding: '10px',
  zIndex: '2',
  [theme.breakpoints.down('md')]:{
    width: '100%',
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
        width: 25%;
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