import React, { useState, memo, createRef, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store/Reducer'
import { Box, Card, CardContent, CardMedia, Rating, styled } from '@mui/material'
import { Star } from '@mui/icons-material'


const { setOpenDetail, setSelected } = actions

const FootBar = memo(() => {

  const { nearlist, selected, listType, markerlist, openDetail } = useSelector(({ MapList }) => MapList)
  const { isClear } = useSelector(({ Global })=> Global)
  const dispatch = useDispatch()

  const [refArr, setRefArr] = useState([])
  const rootBox = useRef(false)
  const prevSpot = useRef(null)

  useEffect(() => {
    const refs = Array(nearlist.length).fill().map((_, i) => createRef())
    setRefArr(refs)
  }, [nearlist])

  useEffect(() => {
    console.log(selected)
    if (prevSpot.current !== null) {
      refArr[prevSpot.current].current.style.transform = 'translateY(0) scale(1.0)'
    }
    if (selected !== null && refArr.length > 0) {
      refArr[selected].current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
      refArr[selected].current.style.transform = 'translateY(-30px) scale(1.1)'
    }
    prevSpot.current = selected
  }, [selected, refArr])


  const mapType = useCallback(() => (
    listType === 'Near' ? nearlist : markerlist
  ), [listType, markerlist, nearlist])

  const onCardClick = (item, i) => {
    console.log(item)
    dispatch(setOpenDetail(item))
    dispatch(setSelected(i))
  }

  return (
    <RootBox ref={rootBox} isOpen={openDetail}>
      {!isClear && mapType().map( (item, i) =>
        <Card 
          elevation={10}
          key={i}
          ref={refArr[i]}
          onClick={() => onCardClick(item, i)}
        >
          <CardMedia image={(item.photos && item.photos[0].getUrl()) || ''}/>
          <CardContent>
            <h4 className='name'>{item.name}</h4>
            <Box>
              <Rating
                readOnly size='small' precision={0.1}
                value={parseFloat(Number(item.rating).toFixed(1))} 
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
              />
              <p className='distance'>{Number(item.distance).toFixed(1)}</p>
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


const RootBox = styled(Box)((props) => `
  width: ${props.isOpen? '65%' : '85%'};
  padding: 30px 10px 10px 10px;
  margin: auto;
  display: -webkit-box;
  overflow-x: scroll;
  position: absolute;
  bottom: 0;
  left: ${props.isOpen? '28%' : '5%'};
  z-index: 2;
  transition: all 0.5s;
  ${props.theme.breakpoints.down('md')}{
    width: 100%;
    left: 0;
    &::-webkit-scrollbar{
      display: none;
    }
  }
    .MuiCard-root{
      width: 15%;
      margin: 0 10px;
      transition: all 0.5s;
      ${[props.theme.breakpoints.down('sm')]}{
        width: 50%;
        margin: 0 10px;
      }
        .MuiCardMedia-root{
          width: 100%;
          height: 120px;
          ${props.theme.breakpoints.down('sm')}{
            height: 100px;
          }
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
              ${props.theme.breakpoints.down('sm')}{
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
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
