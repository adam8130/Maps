import { createStore, combineReducers } from 'redux'
import { Global, MapList } from './legacy_reducer'


const reducer = combineReducers({
    Global,
    MapList
})
const store = createStore(reducer)
export default store