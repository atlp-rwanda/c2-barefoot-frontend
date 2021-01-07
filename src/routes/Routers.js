import React from 'react';
import Login from '../components/views/Login'
import signup from '../components/views/Signup'
import verifyAccount from '../components/signup/verifyAccount'
import Landing from '../components/views/LandingPage'
import PageNotFound from '../components/views/PageNotFound'
import Unauthorized from '../components/views/Unauthorized'
import Profile from '../components/views/Profile';
import adminHome from '../components/views/Admin/Home';
import CreateRoles from '../components/views/Admin/CreateRoles';
import SetPermissions from '../components/views/Admin/SetPermissions'
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout  from '../components/RouteWithLayout';
import {  DefaultLayout, AuthorizedUserLayout, AdminLayout, ErrorLayout } from '../components/layouts';
import Logout from '../components/views/Logout';

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
          component={Profile}
          exact
          layout={AuthorizedUserLayout}
          path="/profile"
        />
        <RouteWithLayout
          component={adminHome}
          exact
          layout={AdminLayout}
          path="/admin"
        />
        <RouteWithLayout
          component = {CreateRoles}
          exact
          layout={AdminLayout}
          path="/admin/roles"
        />
        <RouteWithLayout
          component={SetPermissions}
          exact
          layout={AdminLayout}
          path="/admin/permissions"
        />
        <RouteWithLayout
          component={Logout}
          exact
          layout={AuthorizedUserLayout}
          path="/logout"
        />
        <RouteWithLayout
          component={PageNotFound}
          exact
          layout={ErrorLayout}
          path="/PageNotFound"
        />
        <RouteWithLayout
          component={Unauthorized}
          exact
          layout={ErrorLayout}
          path="/unauthorized"
        />
        <RouteWithLayout 
            path="/signup" 
            component={signup}
            layout={DefaultLayout}
        />
        <RouteWithLayout 
            path="/user/verification/:token" 
            component={ verifyAccount }
            layout={DefaultLayout}
        />
        <RouteWithLayout 
            path="/user/verification/" 
            component={ verifyAccount }
            layout={DefaultLayout}
        />
        
        <Redirect to="/PageNotFound" />
      </Switch>
    );
  };
  
  export default Routes;

