// const initState = {
//     themeMode: 'light',
//     center: {},  // initCenter for the map
//     bounds: {},  // scope in the current map
//     nearList: [],  // places mapping on the map
//     detail: null,  // selected point's index    
//     userList: [],
//     selected: null,
//     isClear: false,
// }

const Global = (prev={
    mode: 'light',
    bounds: {},
    selected: null,
}, act) => {
    let next = {...prev}
    switch(act.type){
        case 'setMode':
            next.mode = act.payload
            return next
        case 'setBounds':
            next.bounds = act.payload
            return next
        case 'setIsClear':
            next.isClear = act.payload
            return next
        case 'setCenter':
            next.center = act.payload
            return next
        case 'setIsMobile':
            next.isMobile = act.payload
            return next
        case 'setSelected':
            next.selected = act.payload
            return next
        case 'setDetail':
            next.detail = act.payload
            return next
        default:
            return prev
    }
}

const MapList = (prev = {
    nearList: [],
    markerList: [],
    myItem: null,
    listType: 'Near',
}, act) => {
    let next = {...prev}
    switch(act.type){
        case 'setNearList':
            next.nearList = act.payload
            return next
        case 'setMarkerList':
            next.markerList = act.payload
            return next
        case 'setListType':
            next.listType = act.payload
            return next
        case 'setMyItem':
            next.myItem = act.payload
            return next
        default:
            return prev
    }
}

export {Global, MapList}