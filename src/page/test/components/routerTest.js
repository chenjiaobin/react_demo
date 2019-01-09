import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, NavLink  } from "react-router-dom";
import Son from './contextDemo/index'

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/user">带参数的url</Link>
          </li>
          <li>
          <Link to="/about/me">嵌套路由</Link>
          </li>
          {/* NavLink测试，和link的区别就是navlink激活会自带一个classname,默认active */}
          <li>
            <NavLink to="/tonav">navLink测试</NavLink>
          </li>
          <li>
            <NavLink to="/context">测试Decorator</NavLink>
          </li>
        </ul>
        <hr />
        {/* 如果不加这个switch那么但我们访问/about的时候，/:id也会被访问，加了这个switch就有唯一性，加载匹配到的第一个 */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
          <Route path="/tonav" component={Tonav}/>
          <Route path="/context" component={Son}></Route>
          <Route path="/:id" component={User}/>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About({ match }) {
  return (
    <div>
      <h2>About<Route path={`${match.path}/me`} component={Me}></Route></h2>
    </div>
  );
}

function Me () {
  return (
    <div>叫我爸爸</div>
  )
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

function User ({ match }) {
  return (
    <div>
      <h3>hello{match.params.id}</h3>
    </div>
  )
}

function Tonav () {
  return (
    <div>
      <h3>navlink测试哈</h3>
    </div>
  )
}

export default BasicExample;