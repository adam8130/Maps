import axios from "axios";

export const getPlaceData = async ({ Ra, ub }) => {
    try {
        console.log(Ra,ub);
        const { data: {data} } = await axios.request({
            method: 'POST',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/v2/list',
            params: {currency: 'USD', units: 'km', lang: 'en_US'},
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '6109d48420msh1dd2a70cfb93d08p1b5e5djsn8a29f63fedf8',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            },
            data: `{"geoId":293928,"partySize":2,"reservationTime":"2022-03-07T20:00","sort":"POPULARITY","sortOrder":"desc","filters":[{"id":"establishment","value":["10591"]}],"boundingBox":{"northEastCorner":{"latitude":${ub.hi},"longitude":${Ra.hi}},"southWestCorner":{"latitude":${ub.lo},"longitude":${Ra.lo}}},"updateToken":""}`
          })
        return data
    }
    catch (error) {
        console.log(error)
    }
}


// {
//     params: {
//       bl_latitude: ub.lo,
//       tr_latitude: ub.hi,
//       bl_longitude: Ra.lo,
//       tr_longitude: Ra.hi,
//     },
//     headers: {
//       'X-RapidAPI-Key': '6109d48420msh1dd2a70cfb93d08p1b5e5djsn8a29f63fedf8',
//       'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//     }
// }