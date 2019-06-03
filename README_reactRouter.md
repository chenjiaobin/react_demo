## 路由
> react-router和react-router-dom的区别

* react-router: 实现了路由的核心功能
* react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能，例如：Link组件，会渲染一个a标签，Link组件源码a标签行; BrowserRouter和HashRouter组件，前者使用pushState和popState事件构建路由，后者使用window.location.hash和hashchange事件构建路由。
* react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。

react-router-dom其实一些API也只是从react-router中导入组件，然后重新导出而已。所以我们在项目中用到的路由直接安装使用就可以了。
## 安装使用
* 安装：`npm install react-router-dom -S`
* 使用：`import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';`

注意：路由跳转正常，但是刷新就404，找不到页面，是因为文档中提到了使用browserHistory时，会创建真实的URL，处理初始/请求没有问题，但是对于跳转路由后，刷新页面或者直接访问该URL时，会发现无法正确相应，解决方法（http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html ）（ https://www.jb51.net/article/131789.htm ）

重要的提示：Hash history不支持location.key或location.state。在以前的版本中，我们试图减少行为，但是有一些边缘案例我们无法解决。
任何需要此行为的代码或插件将无法正常工作。由于此技术仅用于支持旧版浏览器，因此我们建议您将服务器配置为使用<BrowserHistory>

### API
`withRouter`：是专门用来处理数据更新问题的，在使用redux的connect()或者mobx的inject()的组件中，如果依赖路由的更新需要重新渲染，会出现路由更新了但是组件没有重新渲染的问题，这是因为redux和mobx的这些连接方法会修改组件的的shouldComponentUpdate,用withRouter可以解决这种问题
> mobX是flux的后起之秀，也是前端数据流（flux、redux、mobX、Vuex）中的一种，mobx则更加简洁, 更符合对store 增删改查的操作概念（ https://cn.mobx.js.org/ ）

默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行`this.props.history.push('/detail')`跳转到对应路由的页面，然而不是所有组件都直接（直接地址栏输入地址）与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props