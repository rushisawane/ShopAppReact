import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../Screens/Auth/AuthScreen';
import ProductOverview from '../Screens/Shop/ProductOverviewScreen';
import ProductDetail from '../Screens/Shop/ProductDetailScreen';
import Cart from '../Screens/Shop/CartScreen';
import Header from '../Screens/Header';
import Logout from '../Screens/Auth/Logout';

import {BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';

const Navigator = props => {

  const isAuthenticated = useSelector(state=>state.authReducer.token!==null);

  let routes = (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Redirect to="/"/>
    </Switch>
  )

  if(isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/home' exact component={ProductOverview}/>
        <Route path='/productdetail/:prodid' exact component={ProductDetail}/>
        <Route path='/cart' exact component={Cart}/>
        <Route path='/header' exact component={Header}/>
        <Route path='/logout' exact component={Logout}/>

        {/* <Route path='/orders/:ccode' exact component={Orders}/>
        <Route path='/moduleselection' exact component={ModuleSelection}/>
        <Route path='/scaleselection/:ccode' exact component={ScaleSelection}/>
        <Route path='/safety/:ccode' exact component={Safety}/>
        <Route path='/instructions/:ccode' exact component={Instructions}/>
        <Route path='/countbyweigh/:ccode' exact component={CountByWeigh}/>
        <Route path='/weighnotes/:ccode' exact component={WeighNotes}/>
        <Route path='/containers/:ccode' exact component={ContainerInfo}/> 
        <Route path='/logout' exact component={Logout}/> */}
        <Redirect to="/home" />
      </Switch>
      
    )
  }

  return (
    <Router>
       {routes}
    </Router>
  );
}

export default Navigator;
