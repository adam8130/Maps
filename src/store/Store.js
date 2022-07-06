import { combineReducers, createStore } from 'redux'
import { Global, MapList } from './Reducer'



const reducer = combineReducers({
    Global,
    MapList
})

export const store = createStore(reducer)