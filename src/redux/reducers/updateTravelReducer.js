import { FETCH_TRAVEL_REQUEST_LOADING, FETCH_TRAVEL_REQUEST_SUCCESS, FETCH_TRAVEL_REQUEST_ERROR } from "../actions/fetchTravelRequestAction";

const initialState = {
    loading:false,
    travel:{},
    error:null
}

export const updateSingleTravelReducer = (state=initialState, action) => {
    switch (action.type){
        case FETCH_TRAVEL_REQUEST_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_TRAVEL_REQUEST_SUCCESS:
            return {
                ...state,
                loading:false,
                travel: action.payload
            }
        case FETCH_TRAVEL_REQUEST_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}