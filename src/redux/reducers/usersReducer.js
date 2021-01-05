import {FETCH_USERS_SUCCESS, FETCH_USERS_ERROR} from '../actions/fetchUsersAction'

const initialState = {
  pending: true,
  users: [],
  error: null
}

export function fetchUsersReducer(state = initialState, action){
  switch(action.type){
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
    default:
      return state
  } 
 

}