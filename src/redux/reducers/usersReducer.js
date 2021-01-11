import {FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, FETCH_USERS_PENDING} from '../actions/UsersAction'
import { DELETE_USERS_PENDING, DELETE_USERS_SUCCESS, DELETE_USERS_ERROR, CLEAR_SNACKBAR} from '../actions/UsersAction'

const initialState = {
  pending: true,
  users: {},
  error: null,
  load: false,
  snackBarMessage: {
    open: false,
    severity: '',
    message: null
  }
}

export function UsersReducer(state = initialState, action){
  switch(action.type){
    case FETCH_USERS_PENDING:
      return{
        ...state,
        pending: true

      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        users: action.payload
      }
    case FETCH_USERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case DELETE_USERS_PENDING:
      return{
        ...state,
        load: true
      }
    case DELETE_USERS_SUCCESS: 
      return{
        ...state,
        load: false,
        users: {
          ...state.users,
          rows: [...state.users.rows.slice(0, action.index), ...state.users.rows.slice(action.index + 1)]
        },
        snackBarMessage: {
          open: true,
          severity: 'success',
          message: action.payload
        }
      }
    case DELETE_USERS_ERROR: 
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