import { DELETE_LOCATION_SUCCESS, DELETE_LOCATION_ERROR, DELETE_LOCATION } from '../actions/deleteLocationAction'
import { DELETE_ACCOMMODATION, DELETE_ACCOMMODATION_ERROR, DELETE_ACCOMMODATION_SUCCESS, CLOSE_SNACKBAR} from '../actions/deleteLocationAction'

const initialState = {
  requesting: false,
  success: false,
  successMessage: '',
  errorOpen: false,
  successOpen: false,
  error: '',
}

export function deleteLocationReducer(state = initialState, action){
  switch(action.type){
    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        success: true,
        successOpen: true,
        requesting: false,
        successMessage: action.payload
      }
    case DELETE_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successOpen:false,
        errorOpen: true,
        error: action.error
      }
      case DELETE_LOCATION:
      return {
        ...state,
        requesting: true,
        // successOpen:true,
        // errorOpen: false,
      }
      case DELETE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        success: true,
        successOpen: true,
        requesting: false,
        successMessage: action.payload
      }
    case DELETE_ACCOMMODATION_ERROR:
      return {
        ...state,
        requesting: false,
        successOpen:false,
        errorOpen: true,
        error: action.error
      }
      case DELETE_ACCOMMODATION:
      return {
        ...state,
        requesting: true,
      }
      case CLOSE_SNACKBAR:
      return {
        ...state,
        successOpen:false,
        errorOpen: false,
      }
    default:
      return state
  } 
 
}