var React = require('react')
var ReactDom = require ('react-dom')
import ComponentHeader from  './components/header.js'

class Index extends React.Component {
  render () {
    return (
        <ComponentHeader/>
      )
  }
}

ReactDom.render(
    <Index/>,
    document.getElementById('app')
  )