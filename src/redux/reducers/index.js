import { combineReducers } from 'redux'
import {loginReducer} from './loginReducer'
import { signupRequestReducer } from './signupReducer'
import {fetchLocationsReducer} from './locationsReducer'
import { fetchAccommodationsReducer } from './accommodationsReducer'
import { logoutReducer } from './logoutReducer';

const reducers = combineReducers({
  logout: logoutReducer,
  login: loginReducer,
  signup: signupRequestReducer,
  fetchLocations: fetchLocationsReducer,
  fetchAccommodations: fetchAccommodationsReducer,
  
})

export default reducers