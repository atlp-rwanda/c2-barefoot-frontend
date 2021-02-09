import ResetPasswordEmailForm from '../components/resetPassword/ResetPasswordEmailForm';
import NewPassword from '../components/resetPassword/NewPassword'

import React from 'react';
import Login from '../components/views/Login'
import signup from '../components/views/Signup'
import verifyAccount from '../components/signup/verifyAccount'
import Landing from '../components/views/LandingPage'
import PageNotFound from '../components/views/PageNotFound'
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout  from '../components/RouteWithLayout';
import Profile from '../components/views/Profile';
import {  DefaultLayout, AuthorizedUserLayout } from '../components/layouts';
import Logout from '../components/views/Logout';
import CreateTravelRequest from '../components/views/user/CreateTravelRequest';
import RequesterDefault  from '../components/RequesterLayoutRoute/Default';
import ViewTravelRequest from '../components/views/user/ViewTravelRequest';
import RequesterRoute from '../components/RequesterLayoutRoute';


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
        <RequesterRoute
          component={Profile}
          exact
          layout={RequesterDefault}
          path="/profile"
        />
         <RouteWithLayout
          component={signup}
          exact
          layout={DefaultLayout}
          path="/signup"
        />
        <RouteWithLayout
          component={ResetPasswordEmailForm}
          exact
          layout={DefaultLayout}
          path="/forgetpassword"
        />
        <RouteWithLayout
          component={NewPassword}
          exact
          layout={DefaultLayout}
          path="/user/reset-password"
        />
        <RequesterRoute
          component={Logout}
          exact
          layout={RequesterDefault}
          path="/logout"
        />
        <RouteWithLayout
          component={PageNotFound}
          exact
          layout={DefaultLayout}
          path="/PageNotFound"
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
        <RequesterRoute 
            path="/requester/create-travel-request" 
            component={ CreateTravelRequest }
            layout={RequesterDefault}
        />
        
        <RequesterRoute 
            path="/requester/view-travel-requests" 
            exact
            component={ ViewTravelRequest }
            layout={RequesterDefault}
        />
        
        <Redirect to="/PageNotFound" />
      </Switch>
    );
  };
  
  export default Routes;
