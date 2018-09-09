
## 安装依赖
npm install
## 启动项目
npm run dev
## 组件两大类(展示组件和容器组件)
- 容器组件特征：
1. 负责管理数据和业务逻辑，不负责 UI 的呈现
2. 带有内部状态
3. 使用 Redux 的 API

- 展示组件特征：
1. 只负责 UI 的呈现，不带有任何业务逻辑
2. 所有数据都由参数（this.props）提供
3. 不使用任何 Redux 的 API

- webpack
1. path.resolve()和path.join()的区别
```
path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
相当于
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd

path.join()方法可以连接任意多个路径字符串，并且也会对路径进行规范化，要连接的多个路径可做为参数传入
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
'/foo/bar/baz/asdf' 
```
两者之间的对比
```
const path = require('path'); 
let myPath = path.join(__dirname,'/img/so'); 
let myPath2 = path.join(__dirname,'./img/so'); 
let myPath3 = path.resolve(__dirname,'/img/so'); 
let myPath4 = path.resolve(__dirname,'./img/so'); 
console.log(__dirname); //D:\myProgram\test 
console.log(myPath); //D:\myProgram\test\img\so 
console.log(myPath2); //D:\myProgram\test\img\so 
console.log(myPath3); //D:\img\so<br> 
console.log(myPath4); //D:\myProgram\test\img\so
```
