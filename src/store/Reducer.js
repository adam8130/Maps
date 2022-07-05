const initState = {
    themeMode: 'light',
    center: {},  // initCenter for the map
    bounds: {},  // scope in the current map
    nearList: [],  // places mapping on the map
    detail: null,  // selected point's index    
    userList: [],
    selected: null,
    isClear: false,
}

const AppReducer = (prev, act) => {
    let newState = {...prev}
    switch(act.type){
        case 1:
            return
        default:
            return prev
    }
}

