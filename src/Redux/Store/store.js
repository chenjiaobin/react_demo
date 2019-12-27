import {createStore, combineReducers, applyMiddleware } from 'redux'
import reducer1 from '../Reducer/index'
import reducer2 from '../Reducer/reducer_2'

// 使用middleware中间件
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// let loggerMidderleware = createLogger()

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

// 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象
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

// 也可以不用设置key值
// var reducer = combineReducers({
//     reducer1,
//     reducer2
// })

// 上面这个相当于
// function reducer (state = {}, action) {
//     return {
//         reducer1: reducer1(state.reducer1, action),
//         reducer2: reducer1(state.reducer2, action),
//     }
// }


const store = createStore(reducer, initState)
// 第二个参数(初始化数据是可选的)
// const store = createStore(
//     reducer,
//     initState,
//     applyMiddleware(thunkMiddleware, loggerMiddleware)
//     )

// const store = createStore(reducer, applyMiddleware(thunk))

export default store