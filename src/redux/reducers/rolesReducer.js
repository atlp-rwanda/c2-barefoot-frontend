import {FETCH_ROLES_SUCCESS, FETCH_ROLES_ERROR} from '../actions/fetchRolesAction'
import {DELETE_ROLE_SUCCESS, DELETE_ROLE_PENDING, DELETE_ROLE_ERROR, CLEAR_SNACKBAR} from '../actions/fetchRolesAction'

const initialState = {
  pending: true,
  roles: {},
  error: null,
  load: false,
  snackBarMessage: {
    open: false,
    severity: '',
    message: null
  }
}

export function RolesReducer(state = initialState, action){
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
    case DELETE_ROLE_PENDING:
      return {
        ...state,
        load: true
      }
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        load: false,
        roles: {
          ...state.roles,
          rows: [...state.roles.rows.slice(0, action.payload), ...state.roles.rows.slice(action.payload + 1)]
        },
        snackBarMessage: {
          open: true,
          severity: 'success',
          message: 'Role deleted successfully!'
        }
      }
    case DELETE_ROLE_ERROR:
      return{
        ...state,
        load: false,
        error: action.error,
        snackBarMessage: {
          open: true,
          severity: 'error',
          message: action.error
        }
      }
    case CLEAR_SNACKBAR:
      return{
        ...state,
        snackBarMessage: {
          open: false,
          severity: '',
          message: null
        }
        
      }
    default:
      return state
  } 
 

}