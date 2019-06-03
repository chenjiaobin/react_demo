import { Increment, Decrement } from '../Action/index'

/**
 * state是旧的state，也就是改变之前的state值
 * action也是旧的action
 */
export default (state = {}, action) => {
    console.log(state)
    console.log(action)
    const { counterCaption } = action
    switch (action.type) {
        case Increment:
            // return的时候不要去改变第一个参数的值，也就是不能这样使用Object.assign(state,[counterCaption]:state[counterCaption]+1)
            // 但是你可以通过赋值到一个新的对象Object.assign({},state,[counterCaption]:state[counterCaption]+1),这样就不会改变state的值了
            // 也可以通过下面这种写法，es6的对象展开符
            return {...state, [counterCaption]:state[counterCaption]+1}
        case Decrement:
            return {...state, [counterCaption]:state[counterCaption]-1}
        default:
            return state
    }
}