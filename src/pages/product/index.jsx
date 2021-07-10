import React, { Component } from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'

import ProductHome from './Home'
import ProductAddUpdate from './addupdate'
import ProductDetail from './detail'
import './product.less'

export default class Product extends Component {
    render() {
        return (
            <div>
              <Switch>
                    < Route path='/product' component={ProductHome} exact />
                    < Route path='/product/addupdate' component={ProductAddUpdate }/>
                    < Route path='/product/detail' component={ProductDetail} />
                    <Redirect to='/product' />
              </Switch>
            </div>
        )
    }
}
