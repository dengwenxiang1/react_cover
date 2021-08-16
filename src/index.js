import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch}from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register/register'
import Main from './pages/main/main'
import {Provider}from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route component={Main}></Route> {/*默认路由组件*/}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);