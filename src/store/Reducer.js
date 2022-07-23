import { createSlice } from "@reduxjs/toolkit"


const Global = createSlice({
    name: 'Global',
    initialState: {
        mode: 'light',
        map: null,
        bounds: null,
        isMobile: false,
        isClear: false,
        footbar: false,
    },
    reducers: {
        setMode: (state, act) => { state.mode = act.payload },
        setMap: (state, act) => { state.map = act.payload },
        setBounds: (state, act) => { state.bounds = act.payload },
        setIsMobile: (state, act) => { state.isMobile = act.payload },
        setIsClear: (state, act) => { state.isClear = act.payload },
        setFootbar: (state, act) => { state.footbar = act.payload },
    }
})

const MapList = createSlice({
    name: 'Maplist',
    initialState: {
        nearlist: [],
        markerlist: [],
        listType: 'Near',
        myItem: null,
        selected: null,
        openDetail: false,
        infowindow: null,
        detailCond: false,
    },
    reducers: {
        setNearlist: (state, act) => { 
            state.nearlist = act.payload
            state.openDetail = false 
        },
        setMarkerlist: (state, act) => { state.markerlist = act.payload },
        setListType: (state, act) => { state.listType = act.payload },
        setMyItem: (state, act) => { state.myItem = act.payload },
        setSelected: (state, act) => { state.selected = act.payload },
        setOpenDetail: (state, act) => { state.openDetail = act.payload },
        setInfowindow: (state, act) => { state.infowindow = act.payload},
        setDetailCond: (state, act) => { state.detailCond = act.payload}
    }
})

export const actions = {...Global.actions,...MapList.actions}
export { Global, MapList }