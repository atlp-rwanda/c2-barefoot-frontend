import { CREATE_ROLE_ERROR, CREATE_ROLE_PENDING, CREATE_ROLE_SUCCESS, CLEAR_SNACKBAR } from '../actions/createRoleAction'

const initialState ={
  pending: false,
  snackBarMessage: false,
  error: null
}

export const createRoles = (state = initialState, action) => {
  switch(action.type){
    case CREATE_ROLE_PENDING:
      return{
        ...state,
        pending: true
      }
    case CREATE_ROLE_SUCCESS:
      return{
        ...state,
        pending: false,
        snackBarMessage: true
      }
    case CREATE_ROLE_ERROR:
      return{
        ...state,
        pending: false,
        error: action.error
      }
    case CLEAR_SNACKBAR:
      return{
        ...state,
        snackBarMessage: false
      }
    default:
      return state
  }
}