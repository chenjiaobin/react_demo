import React from 'react'

export default class PureCom extends React.PureComponent {
  constructor () {
    super()
  }
  render () {
    return (
      <div>{this.props.word.join(',')}</div>
    )
  }
}