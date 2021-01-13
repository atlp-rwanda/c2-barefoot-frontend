import { FETCH_PERMISSIONS_ERROR, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_PENDING, CHECKBOX_CHANGED } from '../actions/PermissionsAction'
import { UPDATE_PERMISSIONS_ERROR,  UPDATE_PERMISSIONS_SUCCESS, UPDATE_PERMISSIONS_PENDING, CLEAR_PERMISSIONS_SNACKBAR } from '../actions/PermissionsAction'

const initialState = {
  pending: false,
  permissions: [],
  error: null,
  selectedRole: '',
  snackBarMessage: {
    open: false,
    severity: '',
    message: null
  }
}

export function permissionsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_PERMISSIONS_PENDING:
      return{
        ...state,
        pending: true
      }
    case FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        selectedRole: action.role,
        permissions: Object.entries(action.payload)
      }
    case FETCH_PERMISSIONS_ERROR:
      return {
        ...state,
        pending: false,
        snackBarMessage: {
          open: true,
          severity: 'error',
          message: action.error
        }
      }
    case CHECKBOX_CHANGED:
      const copy = state.permissions.slice()
      copy[action.index] = action.payload
      return{
        ...state,
        permissions: copy
      }
    case UPDATE_PERMISSIONS_PENDING:
      return {
        ...state,
        pending: true
      }
    case UPDATE_PERMISSIONS_SUCCESS:
      return{
        ...state,
        pending: false,
        snackBarMessage: {
          open: true,
          severity: 'success',
          message: action.message
        }
      }
    case UPDATE_PERMISSIONS_ERROR:
      return{
        ...state,
        pending: false,
        error: action.error,
        snackBarMessage: {
        open: true,
        severity: 'error',
        message: action.error
        }
      }
    case CLEAR_PERMISSIONS_SNACKBAR:
      return{
        ...state,
        snackBarMessage:{
          open: false,
          severity: '',
          message: null
        }
      }
      default:
    return state
  }
}