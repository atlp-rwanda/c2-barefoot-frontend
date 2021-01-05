import {FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR} from '../actions/fetchLocationsAction'

const initialState = {
  pending: true,
  locations: [],
  error: null
}

export function fetchLocationsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
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