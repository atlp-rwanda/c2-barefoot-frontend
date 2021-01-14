import { FETCH_MANAGERS_ERRORS, FETCH_MANAGERS_SUCCESS } from '../actions/managersAction'

const initialState = {
  pending: true,
  managers: [],
  error: null
}

export function managerReducer(state = initialState, action){
  switch(action.type){
    case FETCH_MANAGERS_SUCCESS:
      return{
        ...state,
        pending: false,
        managers: action.payload
      }
    case FETCH_MANAGERS_ERRORS:
      return{
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}