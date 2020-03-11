import React from 'react'
import { Route, withRouter } from 'react-router-dom'


import Login from './pages/Login'
import Main from './pages/Main'
import Header from './components/Header'
import Products from './pages/Products'
import Sales from './pages/Sales'



const Routes = withRouter(({location})=> {
    return (
        <>
            {location.pathname!=='/' && <Header/>}
            <Route path="/" exact component={Login} />
            <Route path="/app" component={Main}/>
            <Route path="/sales" component={Sales}/>
            <Route path="/products" component={Products}/>
        </>
    )
})

export default Routes;