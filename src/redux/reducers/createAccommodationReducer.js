import { CREATE_ACCOMMODATION, CREATE_ACCOMMODATION_SUCCESS, CREATE_ACCOMMODATION_ERROR, CLOSE_SNACKBAR } from '../actions/createAccommodationAction'
import { UPDATE_ACCOMMODATION, UPDATE_ACCOMMODATION_SUCCESS, UPDATE_ACCOMMODATION_ERROR } from '../actions/createAccommodationAction'

const initialState = {
  requesting: false,
  success: false,
  successMessage: '',
  errorOpen: false,
  successOpen: false,
  error: '',
}

export function createAccommodationReducer(state = initialState, action){
  switch(action.type){
    case CREATE_ACCOMMODATION:
      return {
        ...state,
        requesting: true,
      }
    case CREATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        success: true,
        successOpen: true,
        requesting: false,
        successMessage: action.payload
      }
    case CREATE_ACCOMMODATION_ERROR:
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
    case UPDATE_ACCOMMODATION:
      return {
        ...state,
        requesting: true,
      }
    case UPDATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        success: true,
        successOpen: true,
        requesting: false,
        successMessage: action.payload
      }
    case UPDATE_ACCOMMODATION_ERROR:
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