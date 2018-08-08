import { Increment, Decrement } from '../Action/index'

export default (state, action) => {
    const { counterCaption } = action
    switch (action.type) {
        case Increment:
            return {...state, [counterCaption]:state[counterCaption]+1}
        case Decrement:
            return {...state, [counterCaption]:state[counterCaption]+1}
        default:
            return state
    }
}