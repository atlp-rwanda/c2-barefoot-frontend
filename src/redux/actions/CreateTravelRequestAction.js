export const RETURNING = 'RETURNING';
export const TRAVEL_DATES = 'TRAVEL_DATES';
export const SEARCH_LOCATIONS = 'SEARCH_LOCATIONS';
export const SEARCH_LOCATIONS_LOADING = 'SEARCH_LOCATIONS_LOADING';
export const DESTINATION_LOCATION = 'DESTINATION_LOCATION';
export const CURRENT_LOCATION = 'CURRENT_LOCATION';
export const SEARCH_ACCOMMODATIONS = 'SEARCH_ACCOMMODATIONS';
export const SEARCH_ACCOMMODATIONS_LOADING = 'SEARCH_ACCOMMODATIONS_LOADING';
export const SELECT_ACCOMMODATION = 'SELECT_ACCOMMODATION';
export const HANDLE_ERRORS = 'HANDLE_ERRORS';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const ADD_TRAVEL_REASON = 'ADD_TRAVEL_REASON';
export const SEND_TRAVEL_REQUEST = 'SEND_TRAVEL_REQUEST';
export const SEND_TRAVEL_REQUEST_LOADING = 'SEND_TRAVEL_REQUEST_LOADING';
export const ADD_MULTI_CITY_TRAVEL_REQUEST = 'ADD_MULTI_CITY_TRAVEL_REQUEST';
export const REMOVE_MULTI_CITY_TRAVEL_REQUEST = 'REMOVE_MULTI_CITY_TRAVEL_REQUEST';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CANCEL_TRAVEL_REQUEST = 'CANCEL_TRAVEL_REQUEST';

import axios from 'axios';

export const CheckReturningAction = (data) => dispatch =>{
    return dispatch({
        type: RETURNING,
        payload: data.isReturning
    })
}

export const checkTravelDatesAction = (data) => dispatch =>{
    return dispatch({
        type: TRAVEL_DATES,
        payload: data
    })
}
export const getLocationsAction = () => async (dispatch) =>{
    try{
        dispatch({
            type: SEARCH_LOCATIONS_LOADING
        })
        const getData = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/search/locations/all`);
        return dispatch({
            type: SEARCH_LOCATIONS,
            payload: getData.data.locations.rows
        })
    }catch(error){
    }
    
}

export const searchCurrentLocationAction = (data) => async (dispatch) =>{
    //get the text field id
    const selectedOption = data.textField.split("-",1)

    if((data.textField === "currentLocationId") || (selectedOption[0] === "currentLocationId")){
        if(!data.searchKeyword){
            return dispatch({
                type: CURRENT_LOCATION,
                payload: ''
            })            
        }
        dispatch({
            type: CURRENT_LOCATION,
            payload:data.searchKeyword
        });
    }
    if(data.textField === "destinationLocationId" || (selectedOption[0] === "destinationLocationId")){
        if(!data.searchKeyword){
            return dispatch({
                type: DESTINATION_LOCATION,
                payload: ''
            })            
        }
        const country = data.searchKeyword.country;
        const city = data.searchKeyword.LocationName;
        const page = data.page || 1;
        dispatch({
            type: DESTINATION_LOCATION,
            payload: `${city}, ${country}`
        });
        dispatch({
            type: SEARCH_ACCOMMODATIONS_LOADING
        })
        try{
            const getAccommodations = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/search/accommodations?fromLocation=${country}&city=${city}&page=${page}&limit=6`);
            return dispatch({
                type: SEARCH_ACCOMMODATIONS,
                payload: getAccommodations.data.rows
            })
        }catch(error){
            if(error.response.status === 404){
                return dispatch({
                    type:SEARCH_ACCOMMODATIONS,
                    payload: []
                })
            }
        }
    }
}


export const selectAccommodationAction = (accommodation) => dispatch => {
    if(accommodation.checked){
        return dispatch({
            type: SELECT_ACCOMMODATION,
            payload: {
                accommodation: accommodation.selected,
                displaySelection: !accommodation.checked,
                displaySelected: accommodation.checked
            }
        })
    }
    
}

export const handleErrorsAction = (errorMessage) => dispatch =>{
    return dispatch({
        type: HANDLE_ERRORS,
        payload: errorMessage
    })
}

export const closeSnackbar = () => dispatch =>{
    dispatch({
        type: CLOSE_SNACKBAR
    });
}

export const addTravelReasonAction = (data) => dispatch =>{
    return dispatch({
        type: ADD_TRAVEL_REASON,
        payload: data
    })
}

export const sendTravelRequestAction = (data) => async (dispatch) =>{
    try{
        dispatch({
            type: SEND_TRAVEL_REQUEST_LOADING,
        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.authToken}`;
        await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/requests/request`, data.travelRequest);
        return dispatch({
            type: SEND_TRAVEL_REQUEST,
            payload: true
        })
        
    }
    catch(error){
        return dispatch({
            type: SEND_TRAVEL_REQUEST,
            payload: false
        })
    }
}

export const addMultiCityAction = (data) => dispatch =>{
    
    dispatch({
        type: ADD_MULTI_CITY_TRAVEL_REQUEST,
        payload: data
    })
    return dispatch({
        type: TRAVEL_DATES,
        payload:{departureDate: '', returnDate:''}
    })
}
export const removeMultiCityAction = (data) => dispatch =>{
    dispatch({
        type: REMOVE_MULTI_CITY_TRAVEL_REQUEST,
        payload: data
    })
    
}

export const openModalAction = (data) => dispatch =>{
    return dispatch({
        type: OPEN_MODAL,
        payload:data
    });
}
export const cancelTravelRequestAction = () => dispatch  =>{
    return dispatch({
        type: CANCEL_TRAVEL_REQUEST
    })
}