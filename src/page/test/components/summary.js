import React from 'react'
import { connect } from 'react-redux'
import { REDUCER_1, REDUCER_2 } from '@/Redux/Store/store'

function Summary ({ value }) {
    return (
        <div>总和是:{value}</div>
    )
}

function mapState (state) {
    let sum = 0
    let data = state[REDUCER_1]
    for(const key in data) {
        if (data.hasOwnProperty(key)){
            sum += data[key]
        }
    }
    return { value: sum }
}
 export default connect(mapState)(Summary)