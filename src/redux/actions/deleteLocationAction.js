import axios from 'axios'

export const DELETE_LOCATION = 'DELETE_LOCATION'
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS'
export const DELETE_LOCATION_ERROR = 'DELETE_LOCATION_ERROR'

export const DELETE_ACCOMMODATION = 'DELETE_ACCOMMODATION'
export const DELETE_ACCOMMODATION_SUCCESS = 'DELETE_ACCOMMODATION_SUCCESS'
export const DELETE_ACCOMMODATION_ERROR = 'DELETE_ACCOMMODATION_ERROR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const deleteLocation = (locationId, token) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    dispatch({
      type: DELETE_LOCATION
    })
    return axios.delete(`${process.env.REACT_APP_BACKEND_LINK}/locations/${locationId}`, config)
      .then(res => {
        dispatch({
          type: DELETE_LOCATION_SUCCESS,
          payload: res.data
        })
        }
      )
      .catch(err => {
        if (err.response){
          dispatch({
              type: DELETE_LOCATION_ERROR,
              error: err.response.data.error,
            })    
        }
      })
  }

export const deleteAccommodation = (accommodationId, token) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    dispatch({
      type: DELETE_ACCOMMODATION
    })
    return axios.delete(`${process.env.REACT_APP_BACKEND_LINK}/accommodations/${accommodationId}`, config)
      .then(res => {
        dispatch({
          type: DELETE_ACCOMMODATION_SUCCESS,
          payload: res.data
        })
        }
      )
      .catch(err => {
        if (err.response){
          dispatch({
              type: DELETE_ACCOMMODATION_ERROR,
              error: err.response.data.error,
            })    
        }
      })
  }
  export const closeDeleteSnackbar = () => dispatch =>{
    dispatch({
        type: CLOSE_SNACKBAR
    });
  }