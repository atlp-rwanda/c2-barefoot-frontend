import ResetPasswordEmailForm from '../components/resetPassword/ResetPasswordEmailForm';
import NewPassword from '../components/resetPassword/NewPassword'

import React from 'react';
import Login from '../components/views/Login'
import SignUp from '../components/signup';
import signup from '../components/views/Signup'
import verifyAccount from '../components/signup/verifyAccount'
import Landing from '../components/views/LandingPage'
import PageNotFound from '../components/views/PageNotFound'
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout  from '../components/RouteWithLayout';
import TravelAdminDefault  from '../components/travelAdminLayoutRoute/Default';
import { createLocation } from '../components/views/travelAdmin/createLocations';
import { createAccomodations } from '../components/views/travelAdmin/createAccommodations';
import TravelAdmin from '../components/views/travelAdmin';
import TravelAdminRoute from '../components/travelAdminLayoutRoute';
import ListLocations from '../components/views/travelAdmin/viewLocations';
import ListAccommodation from '../components/views/travelAdmin/viewAccommodations';
// import { redirectUser, toBeRedirected } from '../../../services/userInfo';
import Profile from '../components/views/Profile';
import {  DefaultLayout, AuthorizedUserLayout } from '../components/layouts';
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
        <RouteWithLayout
          component={Logout}
          exact
          layout={AuthorizedUserLayout}
          path="/logout"
        />
        <RouteWithLayout
          component={PageNotFound}
          exact
          layout={DefaultLayout}
          path="/PageNotFound"
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
        <RouteWithLayout 
            path="/admin/travel" 
            exact
            component={ TravelAdmin }
            layout={TravelAdminDefault}
        />
        <RouteWithLayout 
            path="/admin/travel/location/create" 
            component={ createLocation }
            layout={TravelAdminDefault}
        />
        <RouteWithLayout 
            path="/admin/travel/location/view" 
            component={ ListLocations }
            layout={TravelAdminDefault}
        />
        <RouteWithLayout 
            path="/admin/travel/accommodations/create" 
            component={ createAccomodations }
            layout={TravelAdminDefault}
        />
        <RouteWithLayout 
            path="/admin/travel/accommodations/view" 
            component={ ListAccommodation }
            layout={TravelAdminDefault}
        />
        
        <Redirect to="/PageNotFound" />
      </Switch>
    );
  };
  
  export default Routes;
