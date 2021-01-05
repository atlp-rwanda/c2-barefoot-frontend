import {FETCH_ACCOMMODATIONS_PENDING, FETCH_ACCOMMODATIONS_SUCCESS, FETCH_ACCOMMODATIONS_ERROR} from '../actions/fetchAccommodations'

const initialState = {
  pending: true,
  accommodations: [],
  error: null
}

export function fetchAccommodationsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_ACCOMMODATIONS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ACCOMMODATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        accommodations: action.payload
      }
    case FETCH_ACCOMMODATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  } 
 

}