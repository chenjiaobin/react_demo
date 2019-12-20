var React = require('react')
var ReactDom = require ('react-dom')
import Home from './components/index'
import Hook from './components/Hook/index'
import { BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
// 汉化的时候记得把moment也要汉化一下，要不可能导致moment格式化日期的时候出现英文的问题
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


class Index extends React.Component {

  render () {
    return (
			<BrowserRouter>
				<ConfigProvider locale={zh_CN}> 
					<ul>
						<li><Link to="/home_1">首页1</Link></li>
						<li><Link to="/home_2">首页2</Link></li>
					</ul>
					<Switch>
						<Route component={ Home } path="/home_1"></Route>
						<Route component={ Hook } path="/home_2"></Route>
					</Switch>
				</ConfigProvider>
			</BrowserRouter>
      )
  }
}

ReactDom.render(
	<Index/>,
	document.getElementById('app')
)
