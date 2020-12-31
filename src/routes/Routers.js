
import React from 'react';
import Login from '../components/views/Login'
import Signup from '../components/views/Signup';
import Landing from '../components/views/LandingPage'
import PageNotFound from '../components/views/PageNotFound'
import Profile from '../components/views/Profile';
import adminHome from '../components/views/Admin/Home'
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout  from '../components/RouteWithLayout';
import {  DefaultLayout, AdminLayout } from '../components/layouts';
const Routes = () => {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/welcome"
        />
        <RouteWithLayout
          component={Landing}
          exact
          layout={DefaultLayout}
          path="/welcome"
        />
        <RouteWithLayout
          component={Login}
          exact
          layout={DefaultLayout}
          path="/login"
        />
         <RouteWithLayout
          component={Signup}
          exact
          layout={DefaultLayout}
          path="/signup"
        />
         <RouteWithLayout
          component={Profile}
          exact
          layout={DefaultLayout}
          path="/profile"
        />
        <RouteWithLayout
          component={adminHome}
          exact
          layout={AdminLayout}
          path="/adminHome"
        />
        <RouteWithLayout
          component={PageNotFound}
          exact
          layout={DefaultLayout}
          path="/PageNotFound"
        />
        
        <Redirect to="/PageNotFound" />
      </Switch>
    );
  };
  
  export default Routes;

