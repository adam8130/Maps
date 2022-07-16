import React, { useState, memo, createRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/Reducer'
import { Box, Card, CardContent, CardMedia, Rating, styled } from '@mui/material'
import { Star } from '@mui/icons-material'


const { setDetail } = actions

const FootBar = memo(() => {

  const { nearlist, selected, isClear, listType, markerlist } = useSelector(({ MapList }) => MapList)

  console.log(nearlist)
  const [refArr, setRefArr] = useState([])
  const [prevSpot, setPrevSpot] = useState(null)

  useEffect(() => {
    const refs = Array(nearlist.length).fill().map((_, i) => createRef())
    setRefArr(refs)
  }, [nearlist])

  useEffect(() => {
    console.log(selected);
    if(selected){
      refArr[selected].current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
      refArr[selected].current.style.transform = 'translateY(-20px) scale(1.1)'
      setPrevSpot(selected)
      if(prevSpot)
      refArr[prevSpot].current.style.transform = 'translateY(0) scale(1.0)'
    }
  }, [selected, refArr])
  
  const mapType = useCallback(() => (
    listType === 'Near' ? nearlist : markerlist
  ), [listType, markerlist, nearlist])

  return (
    <RootBox>
      {!isClear && mapType().map( (item, i) =>
        <Card elevation={6} key={i} ref={refArr[i]} onClick={() => setDetail(item)}>
          <CardMedia image={(item.photos && item.photos[0].getUrl()) || ''}/>
          <CardContent>
          <h4 className='name'>{item.name}</h4>
            <Box>
              <Rating   
                readOnly size='small' precision={0.1}
                value={parseFloat(Number(item.rating).toFixed(1))} 
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
              />
              <p className='distance'>{Number(item.distance).toFixed(1)} 公里</p>
            </Box>
            
            <p className='address'>{item.formatted_address}</p>
          </CardContent>
        </Card>
        )
      }
    </RootBox>
  )
})

export default FootBar


const RootBox = styled(Box)(({ theme }) => `
  width: 90%;
  padding: 10px;
  margin: auto;
  display: -webkit-box;
  overflow-x: scroll;
  position: absolute;
  bottom: 0;
  left: 2%;
  z-index: 2;
  transition: all 0.5s;
  ${theme.breakpoints.down('md')}{
    width: 100%;
    &::-webkit-scrollbar{
      display: none;
    }
  }
    .MuiCard-root{
      width: 15%;
      margin: 0 10px;
      ${[theme.breakpoints.down('sm')]}{
        width: 70%;
        margin: 0 5px;
      }
        .MuiCardMedia-root{
          width: 100%;
          height: 100px;
        }
        .MuiCardContent-root{
          padding: 5px 0;
            .name{
              /* padding: 5px; */
              width: 70%;
              margin: 0 auto;
              overflow: hidden;
              text-align: center;
              white-space: nowrap;
              text-overflow : ellipsis;
            }
            .address{
              font-size: 13px;
              padding: 0 10px;
              margin: 0;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .MuiBox-root{
              display: flex;
              justify-content: space-between;
              padding: 0 10px;
                p{
                  margin: 0;
                  padding: 0;
                  font-size: 14px;
                }
            }
        }
    }
`)
