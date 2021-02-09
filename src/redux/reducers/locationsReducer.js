import {FETCH_LOCATIONS_PENDING, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR} from '../actions/fetchLocationsAction'

const initialState = {
  pending: false,
  locations: [],
  error: null
}

export function fetchLocationsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_LOCATIONS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        count: action.count,
        locations: action.payload
      }
    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  } 
 

}