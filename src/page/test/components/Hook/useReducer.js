import React, {useReducer} from 'react'

const initCount = {
  count: 1
}

function reducer (state, action) {
  switch(action.type) {
    case 'add':
      return { count: state.count + 1 }
    case 'reduce': 
      return { count: state.count - 1 }
    case 'reset':
      return initCount
    default:
      return { count: state.count }
  }
}

function Hook () {
  let [state, dispatch] = useReducer(reducer, initCount)

  return (
    <div>
      <h3>useReducer测试</h3>
      <p>count：{state.count}</p>
      <button onClick={() => dispatch({ type: 'add' })}>加+1</button>
      <button onClick={() => dispatch({ type: 'reduce' })}>减-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  )
}

export default Hook