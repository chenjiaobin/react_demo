import { Multiply } from '../Action/action_2'

// state可以是任何类型，数组，对象，布尔值等等
export default (state = [], action) => {
  const { counterCaption } = action

  switch(action.type) {
    case Multiply:
      return [ ...state, counterCaption ]
    default: 
      return state
  }
}