import {FETCH_ACCOMMODATIONS_PENDING, FETCH_ACCOMMODATIONS_SUCCESS, FETCH_ACCOMMODATIONS_ERROR} from '../actions/fetchAccommodations'
import { FETCH_SINGLE_ACCOMMODATIONS_PENDING, FETCH_SINGLE_ACCOMMODATIONS_SUCCESS, FETCH_SINGLE_ACCOMMODATIONS_ERROR } from '../actions/fetchAccommodations'

const initialState = {
  pending: false,
  accommodations: [],
  error: null
}
const singleInitialState ={
  singlePending: false,
  singleAccommodation: [],
  singleError: null
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
        count: action.count,
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

export function fetchSingleAccommodationsReducer(state = singleInitialState, action){
  switch(action.type){
    case FETCH_SINGLE_ACCOMMODATIONS_PENDING:
      return {
        ...state,
        singlePending: true
      }
    case FETCH_SINGLE_ACCOMMODATIONS_SUCCESS:
      return {
        ...state,
        singlePending: false,
        // count: action.count,
        amenities: action.payload
      }
    case FETCH_SINGLE_ACCOMMODATIONS_ERROR:
      return {
        ...state,
        singlePending: false,
        singleError: action.error
      }
    default:
      return state
  } 
}