import { REQUEST_SIGNUP, REQUEST_SUCCESS, REQUEST_ERROR, CLOSE_SNACKBAR} from '../actions/signupRequestAction'

const initialState = {
  requesting: false,
  success: false,
  successMessage: '',
  errorOpen: false,
  error: '',
}

export function signupRequestReducer(state = initialState, action){
  switch(action.type){
    case REQUEST_SIGNUP:
      return {
        ...state,
        requesting: true,
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        success: true,
        requesting: false,
        succesMessage: action.payload
      }
    case REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        errorOpen: true,
        error: action.error
      }
    case CLOSE_SNACKBAR:
        return {
            ...state,
            errorOpen: false,
            error: ''
        }
    default:
      return state
  } 
 
}