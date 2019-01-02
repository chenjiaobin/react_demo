import React, { PureComponent } from 'react'
import Son from './son'

export default class Father extends PureComponent {
  render () {
    return (
      <Son></Son>
    )
  }
}