import {createStore} from 'redux'
import reducer from '../Reducer/index'

const initState = {
    'first': 12,
    'second': 13,
    'third': 14
}
const store = createStore(reducer, initState)
export default store