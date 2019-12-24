import React from 'react'
import ReactDom from 'react-dom'
const appRoot = document.getElementById('app')

class PortalPage extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount () {
    appRoot.appendChild(this.el)
  }
  componentWillUnmount () {
    appRoot.removeChild(this.el)
  }

  // this.props.children将会被插入到this.el标签上去
  render () {
    return ReactDom.createPortal(
        this.props.children,
        this.el
      )
  }
}

export default PortalPage