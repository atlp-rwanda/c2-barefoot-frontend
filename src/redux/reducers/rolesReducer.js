import {FETCH_ROLES_SUCCESS, FETCH_ROLES_ERROR} from '../actions/fetchRolesAction'

const initialState = {
  pending: true,
  roles: [],
  error: null
}

export function fetchRolesReducer(state = initialState, action){
  switch(action.type){
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        pending: false,
        roles: action.payload
      }
    case FETCH_ROLES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  } 
 

}