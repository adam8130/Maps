import React, { createRef, memo, useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Chip, styled, Typography,
  Box, Rating, TextField, Input } from '@mui/material'
import { DirectionsCar, LocationOn, Phone, Star, Close, Edit } from '@mui/icons-material'
import { connect } from 'react-redux'



const mapState = ({Global, MapList}) => ({
  detail: Global.detail,
  myItem: MapList.myItem,
  markerList: MapList.markerList
})
const mapDispatch = {
  setDetail: val => ({type: 'setDetail', payload: val}),
  setMarkerList: val => ({type: 'setMarkerList', payload: val}),
}

const MyItemCard = memo((state) => {
  
  // console.log('MyItemCardStart');
  const { detail, setDetail, markerList, setMarkerList } = state
  const [refArr, setRefArr] = useState([])

  useEffect(()=>{
    let refs = Array(5).fill().map(()=>createRef())
    console.log(refs);
    setRefArr(refs)
  },[])

  const handleEdit = () => {
    let newArr = [...markerList]
    newArr.forEach(arrItem => {
      if(arrItem.lat===detail.lat && arrItem.lng===detail.lng){
        arrItem.name = refArr[0].current.value
        arrItem.raw_ranking = refArr[1].current.value
        arrItem.price = refArr[2].current.value
        arrItem.address = refArr[3].current.value
        arrItem.phone = refArr[4].current.value
      }
    })
    setMarkerList(newArr)
  }
  
  return (
    <StyledCard elevation={6}>

        <CardMedia image={detail.photo}/>

        <CardContent >
          <Input 
            inputRef={refArr[0]}
            defaultValue={detail.name} 
            
          />

          <FlexBox>  {/* rating */}
            <Rating 
              size='small' sx={{ml:'-3px'}}
              // readOnly
              precision={0.1}
              defaultValue={Number(parseFloat(detail.raw_ranking).toFixed(1))} 
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
            />
            <Input 
              inputRef={refArr[1]}
              sx={{maxWidth:'20px'}}
              defaultValue={Number(parseFloat(detail.raw_ranking).toFixed(1))}
            />
          </FlexBox>

          <FlexBox>  {/* price */}
            <Typography variant='subtitle1'>Price</Typography>
            <Input 
              inputRef={refArr[2]}
              sx={{maxWidth:'20px'}}
              defaultValue={detail.price}
            />
          </FlexBox>

          {detail.cuisine?.map(detail=>  // chip
            <Chip key={detail.key} label={detail.name} sx={{m:'5px 5px 5px 0'}}/>
          )}
          
          <FlexBox mt={1}>  {/* address */}
            <LocationOn sx={{ml:'-3px'}}/>
            <Input
              inputRef={refArr[3]}
              sx={{width:'50%', textAlign: 'right'}}
              defaultValue={detail.address}
            />
          </FlexBox>
        
          <FlexBox mt={1}>  {/* distance */}
            <DirectionsCar sx={{ml:'-3px'}}/>
            <Typography variant='subtitle'>
              {detail.distance_string} from you
            </Typography>
          </FlexBox>
            
          <FlexBox mt={1}>  {/* phone */}
            <Phone sx={{ml:'-3px'}}/>
            <Input
              inputRef={refArr[4]}
              sx={{maxWidth:'20px'}}
              defaultValue={detail.phone}
            />
          </FlexBox>
          
          <CloseBox onClick={()=>setDetail(null)}>
            <Close/>
          </CloseBox>
          <CloseBox sx={{right:'40px'}} onClick={()=>handleEdit()}>
            <Edit/>
          </CloseBox>
          
        </CardContent>
      
    </StyledCard>
  )
})

export default connect(mapState, mapDispatch)(MyItemCard)

const StyledCard = styled(Card)(({theme})=>`
  width: 25%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 3;
  background: ${theme.palette.background.default};
    .MuiCardMedia-root{
      width: 100%;
      height: 200px;
    }
    ${[theme.breakpoints.down('sm')]}{
      width: 80%;
    }
`)
const FlexBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CloseBox = styled(Box)(({theme})=>`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${theme.palette.background.default};
`)