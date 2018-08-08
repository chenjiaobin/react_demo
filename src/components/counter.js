import React from 'react'
import { increment, decrement } from '../Redux/Action/index'
import { connect } from 'react-redux'

function Counter ({caption, Increment, Decrement, value}) {
    return (
        <div>
            <button onClick={Increment}>+</button>
            <button onClick={Decrement}>-</button>
            <span>{caption}{value}</span>
        </div>
    )
}

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

export default connect(mapState, mapDispath)(Counter)