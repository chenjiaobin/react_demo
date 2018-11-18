var React = require('react')
var ReactDom = require ('react-dom')
import ComponentHeader from  './components/header.js'
import ComponentBody from  './components/bodyIndex.js'
import ComponentBottom from  './components/footer.js'
import { BrowserRouter} from 'react-router-dom'
import { DatePicker, Switch } from 'antd'
// import 'antd/dist/antd.css'

class Index extends React.Component {

  render () {
    return (
			<BrowserRouter>
    		<div>
        	<ComponentHeader name="我是阿布"/>
        	<ComponentBody userId={123456} sex="male"/>
        	<ComponentBottom/>
					<DatePicker />
					<Switch defaultChecked={false} />
    		</div>
			</BrowserRouter>
      )
  }
}

ReactDom.render(
	<Index/>,
	document.getElementById('app')
)
