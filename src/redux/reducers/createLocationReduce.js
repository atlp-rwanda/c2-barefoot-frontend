import { CREATE_LOCATION, CREATE_LOCATION_SUCCESS, CREATE_LOCATION_ERROR, CLOSE_SNACKBAR, DELETE_LOCATION } from '../actions/createLocationAction'
import { UPDATE_LOCATION, UPDATE_LOCATION_ERROR, UPDATE_LOCATION_SUCCESS } from '../actions/createLocationAction'

const initialState = {
  requesting: false,
  success: false,
  successMessage: '',
  errorOpen: false,
  successOpen: false,
  error: '',
}

export function createLocationReducer(state = initialState, action){
  switch(action.type){
    case CREATE_LOCATION:
      return {
        ...state,
        requesting: true,
      }
    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        success: true,
        successOpen: true,
        requesting: false,
        successMessage: action.payload
      }
    case CREATE_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successOpen:false,
        errorOpen: true,
        error: action.error
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        successOpen:false,
        errorOpen: false,
      }
    case UPDATE_LOCATION:
      return {
        ...state,
        requesting: true,
      }
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        success: true,
        successOpen: true,
        requesting: false,
        successMessage: action.payload
      }
    case UPDATE_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successOpen:false,
        errorOpen: true,
        error: action.error
      }
    default:
      return state
  } 
 
}