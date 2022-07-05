import React, { memo } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Chip, styled, Typography,
  Box, Rating } from '@mui/material'
import { DirectionsCar, LocationOn, Phone, Star, Close } from '@mui/icons-material'



const PlacesCard = memo(({detail, setDetail}) => {
  
  // console.log('placesCardStart');
  
  return (
    <StyledCard elevation={6}>
      <CardActionArea>
        <CardMedia image={detail.photo.images.large.url}/>
        <CardContent >
          <Typography variant='h5'>{detail.name}</Typography>

          <FlexBox>  {/* rating */}
            <Rating value={Number(parseFloat(detail.raw_ranking).toFixed(1))} 
              readOnly size='small' precision={0.1} sx={{ml:'-3px'}}
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

export default PlacesCard

const StyledCard = styled(Card)(({theme})=>`
  width: 25%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 3;
  background: ${theme.palette.background.default};
    .MuiCardMedia-root{
      width: 100%;
      height: 200px;
    }
    .MuiCardActionArea-root{
      position: relative;
    }
    ${[theme.breakpoints.down('sm')]}{
      width: 60%;
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