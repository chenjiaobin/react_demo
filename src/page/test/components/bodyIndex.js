import React from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'
import BodyChild from './bodyChild.js'
import PureCom from './pureComponentTest'
import Reftext from './reftext.js'
// 这个是es6使用mixin的时候才会用到的
import ReactMixin from 'react-mixin'
import mixinLog from './mixin'
import { Link, Switch, Route } from 'react-router-dom'

import Home from './home'
import RouterTest from './goods'
import footerCss from '@/css/footer.css'

export default class ComponentBody extends React.Component {

	// 在子类继承中是没有这个getInitialState的钩子的，在React.createClass就有
	// getInitialState () {
	// 	console.log('这是初始化数据')
	// }
	constructor () {
		super () //调用基类的所有的初始化方法
		// 在这种继承的方式创建组件有this.state代替getInitialState
		this.state = {
			name: '刘亦菲',
			age: 0,
			arr: [{name:'陈',age:2},{name:'小龙女',age:3}],
			num: 0,
			word: ['陈类似的九分裤']
		}
		this.changeName = this.changeName.bind(this)
		this.test = this.test.bind(this)
		// createRef试用
		this.myref = React.createRef()
		// 回调ref的试用
		this.textInput = null
		this.setTextInputRef = element => {
			this.textInput = element
		}
		this.fromC = null
		this.fromChild = element => {
			this.fromC = element
		}
	}

	// 注意：使用这个static的时候需要安装babel-preset-stage-0插件
	// 如果父组件没有传递指定的值过来，我们可以通过这个方式设置，默认值
// es6类中只允许定义方法并不允许定义类属性，所以像这种定义默认值和类型检查现在都是放在后面
	// static defaultProps = {
	// 	country: '这是默认值'
	// }

	// static propTypes  = {
	// 	userId: PropTypes.number.isRequired
	// }

	componentWillMount() {
		console.log('componentWillMount');
	}

	componentDidMount() {
		console.log('componentDidMount')
	}

	// onClick事件的测试
	changeName () {
		// this.setState({name: '小龙女'})
		console.log('sedfsad')
		this.setState((pre, prop) => {
			console.log('酒店开发接口对接')
			console.log(pre)
			console.log(prop)
		})
		// 调用mixin的方法
		mixinLog.log()
	}

	// setState传递对象和函数的区别
	add () {
		// 下面这个会加2
		this.setState((pre, prop) => {
			return { num: pre.num + 1 }
		})
		this.setState((pre, prop) => {
			return { num: pre.num + 1 }
		})
		// state更新可能是异步的，React 可能会出于性能考虑将多个 setState() 调用合并成一个批处理更新操作，因此下面第二个state的num会覆盖第一个num，所以这里只会加1
		// this.setState({ num: this.state.num + 1 })
		// this.setState({ num: this.state.num + 1 })
	}

	// 事件参数传递测试，这种是通过this.方法.bind(this,参数)来传值的，接收参数的时候最后一个参数是this
	receiveProp (value, event) {
		console.log(value)
		console.log(event)
	}

	// ref的威力
	// 注意：this.refs.dom这种获取元素后面版本可以能会被移除，建议使用回调函数
	refTest () {
		// 原生js改变样式
		var nat = document.getElementById('who')
		ReactDom.findDOMNode(nat).style.color = 'red'

		// ref的使用
		this.refs.who.style.color = 'green'

		// ref获取子组件dom
		// 这样获取到的是子组件的实例
		// var domTemp = this.refs.childRef
		// 通过配合findDomNode和refs就能拿到子组件的dom了
		var domTemp = ReactDom.findDOMNode(this.refs.childRef)
		console.log(domTemp)
	}

	// 这个是给子组件调用的事件，这样就实现了子组件修改父组件的变量,实现了双向绑定
	handlerChangeAge (event) {
		this.setState({age: event.target.value})
	}

	test () {
		return 2 + 2
	}

	// 16.3版本引入，新版本还是推荐使用回调形式的refs
	// 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref
	// 当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current
	// 不能在函数组件上使用ref属性，因为他们没有实例
	createrefTest () {
		console.log(this.myref.current)
	}

	// 回调ref的测试，这个是最推荐使用的
	createrefTest_2 () {
		console.log(this.textInput)
	}

	createrefTest_3 () {
		console.log(this.fromC)
	}
	
	cc = () => {
		console.log(this.input.value)
	}

	// 测试pureComponent数据突变的问题
	pureComTest = () => {
		// push一个值然后再设置到state这样是不会更新pureComponet的组件的，因为pureCompoent的prop的新旧值还是一样的，pureComponent这是浅比较（也就是只是比较指针的异同），一下的这个并没有改变指针，所以就不会更新这个味组件
		// let words = this.state.word
		// words.push('电视剧啊哈哈')
		// this.setState({ word: words })

		// 下面通过concat改变了原本的指针
		this.setState(prev => {
			return {
				word: prev.word.concat(['收款单'])
			}
		})

	}

	render () {
		var userName = '张三丰&nbsp;后裔'

		return (
				<div>
					{/*jsx的注释写法，下面这个danger是为了将userName的&nbsp转换成空格，这个要防止代码注入的问题。也可以通过将空格转换成unicode来进行显示*/}
					这是<p dangerouslySetInnerHTML = {{__html:userName}}></p>
					{/* 要编写一个非受控组件，而非为每个状态更新编写事件处理程序，你可以 使用 ref 从 DOM 获取表单值, */}
					{/* defaultValue这个可以给input，select,textarea设置默认值，defaultChecked可以给checkbox和radio设置默认值 */}
					<input type="text" defaultValue="测试" ref={(input) => this.input = input} />
					<p onClick={this.cc}>点击</p>

					<p ref={this.myref}>测试通过16.6.3引入的createRef获取ref</p>
					<input type="button" value="createRef测试" onClick={this.createrefTest.bind(this)}/>

					<p ref={this.setTextInputRef}>回调ref的使用</p>
					<input type="button" value="回调ref测试" onClick={this.createrefTest_2.bind(this)}/>
					<Reftext refInput={this.fromChild}></Reftext>
					<input type="button" value="回调ref测试,父组件获取子组件dom节点" onClick={this.createrefTest_3.bind(this)}/>

					<PureCom word={this.state.word}></PureCom>
					<p onClick={this.pureComTest}>点我测试pureComponent属性突变的问题</p>

					{/*直接在花口号里面写函数 */}
					<div>{this.test()}</div>
					<p>{this.state.name}</p>
					<p>我是来自父组件的: {this.props.userId}</p>
					<p>我是来自父组件：country: {this.props.country}</p>
					<p>我{this.state.age}岁</p>
					{/*注意，这里必须bind(this)绑定this,或者直接在constructor里面绑定，这是一种更好的办法，如上*/}
					<input type="button" value="提交" onClick={this.changeName}/>
					{/**只能通过在标签里面绑定this，即bind(this),才能传递参数，不能通过this.receivePeop('参数')来传递参数 */}
					<input type="button" value="参数传递" onClick={this.receiveProp.bind(this,'降龙十八掌')}/>
					{/*通过...this.props来将父组件传过来的所有参数传递给子组件*/}
					<BodyChild ref='childRef' {...this.props} handlerChangeAge={this.handlerChangeAge.bind(this)}  arr={this.state.arr}/>
					
					<p id="who">通过ref改变我比原生的js改变我要好</p>
					<p ref='who'>ref使用</p>
					<button onClick={this.refTest.bind(this)}>点击测试ref</button>
					<div>{this.state.num}</div>
					<button onClick={this.add.bind(this)}>测试setState</button>
					<p className={footerCss.minFooter}>我是局部样式</p>
					<div>
						{/* 这个是因为我在footer.css添加了全局样式global，所以可以直接这样用，因为css-module不会去改变样式的名字，如果不加global默认是local，那么只能按照上面那种方式去使用 */}
						<h1 className="allArea">路由测试</h1>
						<Switch>
							<Route component={Home} exact path='/'></Route>
							<Route component={RouterTest} path="/goods/:id"></Route>
						</Switch>
					</div>
				</div>
			)
	}
}


	ComponentBody.defaultProps = {
		country: '这是默认值'
	}
// react在15.5.0版本以后就见propType移除，被独立成一个新的包prop-type,记得安装prop-types,并在组件中import进来
ComponentBody.propTypes  = {
	userId: PropTypes.number.isRequired
}

ReactMixin(ComponentBody.prototype, mixinLog)