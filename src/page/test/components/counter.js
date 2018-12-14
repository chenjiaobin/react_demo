import React from 'react'
import { increment, decrement } from '@/Redux/Action/index'
import { connect } from 'react-redux'

function Counter ({caption, Increment, Decrement, value}) {
  return (
    <div>
      <button onClick={Increment}>
        +
      </button>
      <button onClick={Decrement}>
        -
      </button>
      <span>{caption}{value}</span>
    </div>
  )
}

// 下面这种es6的写法可以直接通过this.props取到redux的值

// class Counter extends React.Component {
// 	constructor () {
// 		super()
// 	}
// 	render () {
// 		return (
// 				<div>
// 					<button onClick={this.props.Increment}>
// 					+
// 				</button>
// 				<button onClick={this.props.Decrement}>
// 					-
// 				</button>
// 				<span>{`${this.props.caption}${this.props.value}`}</span>
// 			</div>
// 		)
// 	}
// }
/**
 * 用于建立store的state的映射关系，可以传入两个参数，必须返回一个对象，会订阅store的状态的变化，每次的store的state发生变化的时候都会被调用
 * 第二个参数代表本组件的props（也可以不传），如果有传递这个值，那么props发什么变化的时候这个函数会被重新执行
 */

function mapState (state, ownProps) {
  return {
    value: state[ownProps.caption]
  }
}

function mapDispath (dispath, ownProps) {
  return {
    Increment: () => {
      dispath(increment(ownProps.caption))
    },
    Decrement: () => {
      dispath(decrement(ownProps.caption))
    }
  }
}
/**
 * connect（参数的顺序不要颠倒了）
 * 第一个参数将store中的数据作为props绑定到组件上面
 * 第二个参数将action作为props绑定到组件上面
 * 第三个参数用于自定义merge流程，将stateProps 和 dispatchProps merge 到parentProps之后赋给组件。通常情况下，你可以不传这个参数，connect会使用 Object.assign。
 * 第四个参数如果指定这个参数，可以定制 connector 的行为。一般不用。
 */
export default connect(mapState, mapDispath)(Counter)
