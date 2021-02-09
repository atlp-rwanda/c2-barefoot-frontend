export const FETCH_TRAVEL_REQUEST_LOADING = 'FETCH_TRAVEL_REQUEST_LOADIN';
export const FETCH_TRAVEL_REQUEST_SUCCESS = 'FETCH_TRAVEL_REQUEST_SUCCESS';
export const FETCH_TRAVEL_REQUEST_FAIL = 'FETCH_TRAVEL_REQUEST_FAIL';

import axios from 'axios';

export const GetTravelRequestsAction = (data) =>  async (dispatch) => {
    const page = data.page-1 || 0;
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.userToken}`;
    dispatch({
        type: FETCH_TRAVEL_REQUEST_LOADING
    });
    
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/requests?from=${page}&to=3`);
        return dispatch({
            type: FETCH_TRAVEL_REQUEST_SUCCESS,
            payload: res.data
        });
    }
    catch(error){
        return dispatch({
            type: FETCH_TRAVEL_REQUEST_FAIL,
            payload: 'something went wrong, try again!'
        })
    }

}
