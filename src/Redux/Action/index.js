export const Increment = 'increment'
export const Decrement = 'decrement'

export const increment = (counterCaption) => {
    return {
        type: Increment,
        counterCaption
    }
}

export const decrement = (counterCaption) => {
    return {
        type: Decrement,
        counterCaption
    }
}

// 如果为了减少这些样板代码（如上），可以写一个action creator生成器
function makeActionCreator (type, ...argNames) {
    return function (...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
            action[arg] = args[index]
        })
        return action
    }
}
// 当然也可以通过redux-act和redux-actions来帮助我们生成

// 也可以直接在页面需要用到的地方通过以下方式引入
// import { bindActionCreators } from 'redux'
// import * as NumberActions from '../action'

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators(NumberActions,dispatch)
// }