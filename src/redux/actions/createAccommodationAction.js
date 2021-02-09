import axios from 'axios'

export const CREATE_ACCOMMODATION = 'CREATE_LOCATION'
export const  CREATE_ACCOMMODATION_SUCCESS = 'CREATE_LOCATION_SUCCESS'
export const CREATE_ACCOMMODATION_ERROR = 'CREATE_LOCATION_ERROR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const UPDATE_ACCOMMODATION = 'UPDATE_LOCATION'
export const  UPDATE_ACCOMMODATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS'
export const UPDATE_ACCOMMODATION_ERROR = 'UPDATE_LOCATION_ERROR'


export const createAccommodation= (accommodation, amenitities, token) => dispatch => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  dispatch({
    type: CREATE_ACCOMMODATION
  })
  return axios.post(`${process.env.REACT_APP_BACKEND_LINK}/accommodations`, accommodation, config)
    .then(res => {
      axios.patch(`${process.env.REACT_APP_BACKEND_LINK}/amenities`,)
      dispatch({
        type: CREATE_ACCOMMODATION_SUCCESS,
        payload: res.data
      })
      }
    )
    .catch(err => {
      if (err.response){
        dispatch({
            type: CREATE_ACCOMMODATION_ERROR,
            error: err.response.data.error,
          })
      }else if(err.request){
        dispatch({
            type: CREATE_ACCOMMODATION_ERROR,
            error: err.request.data.error,
          })
      }else if(err.message){
        dispatch({
            type: CREATE_ACCOMMODATION_ERROR,
            error: err.message.data,
          })     
      }
    })
}

export const closeSnackbar = () => dispatch =>{
  dispatch({
      type: CLOSE_SNACKBAR
  });
}

export const updateAccommodation= (accommodation, amenities, token) => dispatch => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  dispatch({
    type: CREATE_ACCOMMODATION
  })
  return axios.patch(`${process.env.REACT_APP_BACKEND_LINK}/accommodations/${accommodation.id}`, accommodation, config)
    .then(res => {
      dispatch({
        type: UPDATE_ACCOMMODATION_SUCCESS,
        payload: res.data
      })
      }
    )
    .catch(err => {
      if (err.response){
        dispatch({
            type: UPDATE_ACCOMMODATION_ERROR,
            error: err.response.data.error,
          })
      }else if(err.request){
        dispatch({
            type: UPDATE_ACCOMMODATION_ERROR,
            error: err.request.data.error,
          })
      }else if(err.message){
        dispatch({
            type: UPDATE_ACCOMMODATION_ERROR,
            error: err.message.data,
          })     
      }
    })
}

