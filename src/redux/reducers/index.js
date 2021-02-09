import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from "redux-form";
import { NewPasswordReducer, ResetPasswordEmailReducer } from './resetPasswordEmail';
import {loginReducer} from './loginReducer'
import { signupRequestReducer } from './signupReducer'
import {fetchLocationsReducer} from './locationsReducer'
import { fetchAccommodationsReducer, fetchSingleAccommodationsReducer } from './accommodationsReducer'
import { createLocationReducer } from './createLocationReduce';
import { createAccommodationReducer } from './createAccommodationReducer';
import { deleteLocationReducer } from './deleteLocationReducer'
import { deleteAccommodation } from '../actions/deleteLocationAction';
import { updateLocation } from '../actions/createLocationAction';
import { updateAccommodation } from '../actions/createAccommodationAction';
import { logoutReducer } from './logoutReducer';

const reducers = combineReducers({
  logout: logoutReducer,
  login: loginReducer,
  signup: signupRequestReducer,
  fetchLocations: fetchLocationsReducer,
  fetchAccommodations: fetchAccommodationsReducer,
  createLocation: createLocationReducer,
  createAccommodation: createAccommodationReducer,
  deleteLocation: deleteLocationReducer,
  deleteAccommodation: deleteAccommodation,
  updateLocation: updateLocation,
  updateAccommodation: updateAccommodation,
  form: reduxFormReducer,  
  sendEmail: ResetPasswordEmailReducer,
  signup: signupRequestReducer,
  newPassword: NewPasswordReducer,
  fetchLocations: fetchLocationsReducer,
  fetchAccommodations: fetchAccommodationsReducer,
  fetchSingleAccommodation: fetchSingleAccommodationsReducer
  })

export default reducers


