import { configureStore } from '@reduxjs/toolkit'
import { Global, MapList } from './Reducer'


export default configureStore({
    reducer: {
        Global: Global.reducer,
        MapList: MapList.reducer
    },
    middleware: getDefaultMiddleware => (
        getDefaultMiddleware({
            serializableCheck: false,
        })
    )
})