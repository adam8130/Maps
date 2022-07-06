import React, { memo } from "react"
import { Box, Button, Typography } from "@mui/material";
import { InfoWindow } from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import { Delete } from '@mui/icons-material';
import { connect } from "react-redux";



const mapState = ({MapList}) => ({
    myItem: MapList.myItem,
    markerList: MapList.markerList
})
const mapDispatch = {
    setMarkerList: val => ({type: 'setMarkerList', payload: val}),
    setMyItem: val => ({type: 'setMyItem', payload: val}),
}

const MarkInfo = memo(({ myItem, markerList, setMarkerList, setMyItem }) => {

    // console.log('markInfoStart');
    console.log(myItem);

    const handleDelete = (item) => {
        let newArr = markerList.filter(arrItem=>(
            arrItem.lat !== item.lat && arrItem.lng !== item.lng
        ))
        setMarkerList(newArr)
        setMyItem(null)
    }

    return(
        <InfoWindow position={{ lat: myItem.lat, lng: myItem.lng }}
            onCloseClick={()=>setMyItem(null)}
        >
            <Box>
                <Typography variant='h6'>{myItem.name}</Typography>

                <p>You {formatRelative(myItem.time, new Date())}</p>

                <Button variant="contained" size="small" 
                    startIcon={<Delete/>}
                    onClick={()=>handleDelete(myItem)}
                >
                    Delete
                </Button>
            </Box>
        </InfoWindow>
    )
})

export default connect(mapState, mapDispatch)(MarkInfo)