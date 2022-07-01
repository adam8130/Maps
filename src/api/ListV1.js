import axios from "axios"



const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlaceData = async ({ Ra, wb }) => {
    try {
        const { data: {data} } = await axios.get(URL, {
            params: {
              bl_latitude: wb.lo,
              tr_latitude: wb.hi,
              bl_longitude: Ra.lo,
              tr_longitude: Ra.hi,
              limit: '30',
              currency: 'TWD',
              open_now: 'false',
              lunit: 'km',
              lang: 'zh_TW'
            },
            headers: {
              'X-RapidAPI-Key': '6109d48420msh1dd2a70cfb93d08p1b5e5djsn8a29f63fedf8',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          })
        return data
    }
    catch (error) {
        console.log(error)
    }
}