import React, { createRef, useEffect, useMemo, useState, memo } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Chip, styled, Typography,
  Box, Rating, Grid } from '@mui/material'
import { DirectionsCar, LocationOn, Phone, Star } from '@mui/icons-material'



const PlacesCard = memo(({places, selected}) => {
  
  // console.log('placesCardStart');
  const [refArr,setRefArr] = useState([])
  
  const filteredPlaces = useMemo(() => (
    places.filter((item)=> item.address)
  ),[places])

  useEffect(()=>{
    const refs = Array(filteredPlaces.length).fill().map((_, i)=>createRef())
    console.log({refs});
    setRefArr(refs)
  },[filteredPlaces])
  
  if(selected){
    refArr[selected]?.current?.scrollIntoView({behavior:'smooth', block:'start'})
  }

  return (
    <StyledGrid container>
      {filteredPlaces.map((item, i)=>(
        <Grid item key={i} ref={refArr[i]}>
          <Card elevation={6} sx={{width:'95%',mx:'auto'}}>
            <CardActionArea sx={{width:'100%'}}>
      
              <StyledCardMedia image={item.photo.images.large.url}/>
      
              <CardContent >
      
                <Typography mb={1} variant='h5'>{item.name}</Typography>
      
                <FlexBox>  {/* rating */}
                  <Rating value={Number(parseFloat(item.raw_ranking).toFixed(1))} 
                    readOnly size='small' precision={0.1} sx={{ml:'-3px'}}
                    emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
                  />
                  <Typography variant='subtitle1'>
                    {Number(parseFloat(item.raw_ranking).toFixed(1))}
                  </Typography>
                </FlexBox>
                
                <FlexBox>  {/* price */}
                  <Typography variant='subtitle1'>Price</Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    {item.price? item.price.split('-')[0]+ 'Up': item.price_level}
                  </Typography>
                </FlexBox>
      
                <FlexBox>  {/* rank */}
                  <Typography variant='subtitle1'>Rank</Typography>
                  <Typography variant='p'>
                    {item.ranking}
                  </Typography>
                </FlexBox>
                
                {item?.cuisine?.map(item=>  // chip
                  <Chip key={item.key} label={item.name} sx={{m:'5px 5px 5px 0'}}/>
                )}
                {item.awards[0] &&  // award
                  <FlexBox my={1}> 
                    <img src={item.awards[0].images.small} alt=''/>
                    <Typography variant='p'>
                      {item.awards[0].display_name}
                    </Typography>
                  </FlexBox>
                }
                {item?.address &&  // address
                  <FlexBox mt={2}>
                    <LocationOn sx={{ml:'-3px'}}/>
                    <Typography variant='subtitle' sx={{width:'50%', textAlign: 'right'}}>
                      {item.address}
                    </Typography>
                  </FlexBox>
                }
                {item?.distance_string &&  // distance
                  <FlexBox mt={2}>
                    <DirectionsCar sx={{ml:'-3px'}}/>
                    <Typography variant='subtitle'>
                      {item.distance_string.replace(/k/,'K')} from you
                    </Typography>
                  </FlexBox>
                }
                {item?.phone &&  // phone
                  <FlexBox mt={2}>
                    <Phone sx={{ml:'-3px'}}/>
                    <Typography variant='subtitle'>
                      {item.phone}
                    </Typography>
                  </FlexBox>
                }
                {item.website &&  // website
                  <FlexBox sx={{justifyContent:'flex-end',mt:2}}>
                    <Chip label='WebSite' clickable sx={{px:1}} color='primary'
                      onClick={()=>window.open(item.website,'_blank')}
                    />
                  </FlexBox>
                }
                
              </CardContent>
              
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </StyledGrid> 
  )
})

export default PlacesCard

const StyledGrid = styled(Grid)(({theme})=>`
  height: 80vh;
  justify-content: center;
  margin: auto;
  overflow: auto;
  ${[theme.breakpoints.down('md')]}{
      &::-webkit-scrollbar{
        display: none;
      }
  }
    .MuiGrid-item{
      width: 100%;
      margin-bottom: 16px;
    }
`)
const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: 250px;
`
const FlexBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
