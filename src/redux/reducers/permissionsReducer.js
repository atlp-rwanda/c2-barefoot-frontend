import { array } from 'yup'
import { FETCH_PERMISSIONS_ERROR, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_PENDING, CHECKBOX_CHANGED } from '../actions/fetchPermissions'

const initialState = {
  pending: false,
  permissions: [],
  error: null,
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
      default:
    return state
  }
}