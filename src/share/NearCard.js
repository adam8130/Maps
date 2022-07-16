import React, { memo } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Chip, styled, Typography,
  Box, Rating } from '@mui/material'
import { DirectionsCar, LocationOn, Phone, Star, Close } from '@mui/icons-material'
import { connect } from 'react-redux'



const mapState = ({Global, MapList}) => ({
  detail: Global.detail,
  myItem: MapList.myItem
})
const mapDispatch = {
  setDetail: val => ({type: 'setDetail', payload: val})
}

const NearCard = memo((state) => {
  
  // console.log('NearCardStart');
  const { detail, setDetail } = state
  
  return (
    <StyledCard elevation={6}>
      <CardActionArea>
        <CardMedia image={detail.photo.images.large.url}/>
        <CardContent >
          <Typography variant='h5'>{detail.name}</Typography>

          <FlexBox>  {/* rating */}
            <Rating 
              readOnly size='small' precision={0.1} sx={{ml:'-3px'}}
              value={Number(parseFloat(detail.raw_ranking).toFixed(1))} 
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
            />
            <Typography variant='subtitle1'>
              {Number(parseFloat(detail.raw_ranking).toFixed(1))}
            </Typography>
          </FlexBox>

          <FlexBox>  {/* price */}
            <Typography variant='subtitle1'>Price</Typography>
            <Typography gutterBottom variant='subtitle1'>
              {detail.price? detail.price.split('-')[0]+ 'Up': detail.price_level}
            </Typography>
          </FlexBox>
          
          <FlexBox>  {/* rank */}
            <Typography variant='subtitle1'>Rank</Typography>
            <Typography variant='p'>
              {detail.ranking}
            </Typography>
          </FlexBox>

          {detail.cuisine?.map(detail=>  // chip
            <Chip key={detail.key} label={detail.name} sx={{m:'5px 5px 5px 0'}}/>
          )}
          
          <FlexBox mt={1}>  {/* address */}
            <LocationOn sx={{ml:'-3px'}}/>
            <Typography variant='subtitle' sx={{width:'50%', textAlign: 'right'}}>
              {detail.address}
            </Typography>
          </FlexBox>
        
          <FlexBox mt={1}>  {/* distance */}
            <DirectionsCar sx={{ml:'-3px'}}/>
            <Typography variant='subtitle'>
              {detail.distance_string.replace(/k/,'K')} from you
            </Typography>
          </FlexBox>
            
          <FlexBox mt={1}>  {/* phone */}
            <Phone sx={{ml:'-3px'}}/>
            <Typography variant='subtitle'>
              {detail.phone}
            </Typography>
          </FlexBox>
          
          <FlexBox sx={{justifyContent:'flex-end',mt:2}}>  {/* website */}
            <Chip label='WebSite' clickable sx={{px:1}} color='primary'
              onClick={()=>window.open(detail.website,'_blank')}
            />
          </FlexBox>
          
          <CloseBox onClick={()=>setDetail(null)}>
            <Close/>
          </CloseBox>
          
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
})

export default connect(mapState, mapDispatch)(NearCard)

const StyledCard = styled(Card)(({theme})=>`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 8vh;
  z-index: 3;
  background: ${theme.palette.background.default};
    .MuiCardMedia-root{
      width: 100%;
      height: 35%;
    }
    .MuiCardActionArea-root{
      position: relative;
    }
    .MuiCardContent-root{
      height: 65%;
    }
    ${[theme.breakpoints.down('sm')]}{
      width: 100%;
      height: 100%;
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