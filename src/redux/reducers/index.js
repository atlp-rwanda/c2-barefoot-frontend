import { combineReducers } from 'redux'
import {loginReducer} from './loginReducer'
import { signupRequestReducer } from './signupReducer'
import {fetchLocationsReducer} from './locationsReducer'
import { fetchAccommodationsReducer } from './accommodationsReducer'
import { logoutReducer } from './logoutReducer';
import { fetchUsersReducer } from './usersReducer'
import { fetchRolesReducer } from './rolesReducer'
import { createRoles } from './createRoleReducer'
const reducers = combineReducers({
  logout: logoutReducer,
  login: loginReducer,
  signup: signupRequestReducer,
  fetchLocations: fetchLocationsReducer,
  fetchAccommodations: fetchAccommodationsReducer,
  users: fetchUsersReducer,
  roles: fetchRolesReducer,
  createRoles
  
})

export default reducers