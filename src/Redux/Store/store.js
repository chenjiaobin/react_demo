import {createStore, combineReducers} from 'redux'
import reducer1 from '../Reducer/index'
import reducer2 from '../Reducer/reducer_2'
// 下面这些变量可以统一写在一个文件好一点，我这里就简单写在这里了
export const REDUCER_1 = 'num_1'
export const REDUCER_2 = 'num_2'

const initState = {
    [REDUCER_1]: {
        'first': 12,
        'second': 13,
        'third': 14
    }
}

// combieReducer是合并多个reducer，它会 实施一次安全检查，用以确保reducer永远不会返回undefined，所以在reducer的参数state最好是给个默认值，请参考reducer/reducer_2.js文件
var reducer = combineReducers({
    [REDUCER_1]: reducer1,
    [REDUCER_2]: reducer2
})
// 这个最终返回的值类似
// {
//     num_1: {},
//     num_2: []
// }

const store = createStore(reducer, initState)

export default store