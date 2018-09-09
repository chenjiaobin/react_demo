import React from 'react'

import Counter from './counter'
import Summary from './summary'

export default class ControlPannel extends React.Component {
    render () {
        return (
            <div>
                <Counter caption="first"></Counter>
                <Counter caption="second"></Counter>
                <Counter caption="third"></Counter>
                <hr/>
                <Summary/>
            </div>
        )
    }
}