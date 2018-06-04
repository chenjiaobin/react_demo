var React = require('react')
var ReactDom = require ('react-dom')
import ComponentHeader from  './components/header.js'
import ComponentBody from  './components/bodyIndex.js'
import ComponentBottom from  './components/footer.js'

class Index extends React.Component {

  render () {
    return (
    		<div>
        	<ComponentHeader name="我是阿布"/>
        	<ComponentBody/>
        	<ComponentBottom/>
    		</div>	
      )
  }
}

ReactDom.render(
    <Index/>,
    document.getElementById('app')
  )