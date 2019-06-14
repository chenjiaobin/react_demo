var React = require('react')
var ReactDom = require ('react-dom')
import ComponentHeader from  './components/header.js'
import ComponentBody from  './components/bodyIndex.js'
import ComponentBottom from  './components/footer.js'
import { BrowserRouter} from 'react-router-dom'
import { DatePicker, Switch, LocaleProvider } from 'antd'
// import 'antd/dist/antd.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
// 汉化的时候记得把moment也要汉化一下，要不可能导致moment格式化日期的时候出现英文的问题
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


class Index extends React.Component {

  render () {
    return (
			<BrowserRouter>
			<LocaleProvider locale={zh_CN}> 
    		<div>
        	<ComponentHeader name="我是阿布"/>
        	<ComponentBody userId={123456} sex="male"/>
        	<ComponentBottom/>
					<DatePicker />
					<Switch defaultChecked={false} />
    		</div>
				</LocaleProvider>
			</BrowserRouter>
      )
  }
}

ReactDom.render(
	<Index/>,
	document.getElementById('app')
)
