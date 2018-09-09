var React = require('react')
var ReactDom = require ('react-dom')
import { BrowserRouter} from 'react-router-dom'

class Index extends React.Component {

  render () {
    return (
			<BrowserRouter>
    		<div>
        	这是todo测试
    		</div>
			</BrowserRouter>
      )
  }
}

ReactDom.render(
	<Index/>,
	document.getElementById('app')
)
