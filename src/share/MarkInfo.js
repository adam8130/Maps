import React, { useState, memo } from "react"
import { Box, Button, TextField, Typography } from "@mui/material";
import { InfoWindow } from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import { Delete, Edit } from '@mui/icons-material';



const MarkInfo = memo(({ item, markers, setMarkers, setItem }) => {

    // console.log('markInfoStart');
    const [focus, setFocus] = useState(true)

    const handleEdit = (e, item) => {
        let newArr = [...markers]
        newArr.forEach(arrItem=>{
          if(arrItem.lat===item.lat && arrItem.lng===item.lng)
            arrItem.name = e.target.value
        })
        setMarkers(newArr)
    }

    const handleDelete = (item) => {
        let newArr = markers.filter(arrItem=>(
            arrItem.lat !== item.lat && arrItem.lng !== item.lng
        ))
        setMarkers(newArr)
        setItem(null)
    }

    return(
        <InfoWindow position={{ lat: item.lat, lng: item.lng }}
            onCloseClick={()=>setItem(null)}
        >
            <Box>
                <TextField label='Rename' value={item.name} variant="standard"
                    onChange={(e)=>handleEdit(e, item)} margin='dense'
                />
                <Typography variant='span' sx={{ml:2}} onClick={()=>setFocus(false)}>
                    <Edit />
                </Typography>

                <p>You {formatRelative(item.time, new Date())}</p>

                <Button variant="contained" size="small" startIcon={<Delete/>}
                    onClick={()=>handleDelete(item)}
                >
                    Delete
                </Button>
            </Box>
        </InfoWindow>
    )
})

export default MarkInfo