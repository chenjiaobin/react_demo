var React = require('react')
var ReactDom = require ('react-dom')
import ComponentHeader from  './page/test/header.js'
import ComponentBody from  './page/test/bodyIndex.js'
import ComponentBottom from  './page/test/footer.js'
import { BrowserRouter} from 'react-router-dom'

class Index extends React.Component {

  render () {
    return (
			<BrowserRouter>
    		<div>
        	<ComponentHeader name="我是阿布"/>
        	<ComponentBody userId={123456} sex="male"/>
        	<ComponentBottom/>
    		</div>
			</BrowserRouter>
      )
  }
}

ReactDom.render(
	<Index/>,
	document.getElementById('app')
)
