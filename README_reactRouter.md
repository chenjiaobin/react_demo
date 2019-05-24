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