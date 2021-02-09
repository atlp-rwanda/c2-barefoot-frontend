import axios from 'axios'

export const CREATE_LOCATION = 'CREATE_LOCATION'
export const  CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS'
export const CREATE_LOCATION_ERROR = 'CREATE_LOCATION_ERROR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const  UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS'
export const UPDATE_LOCATION_ERROR = 'UPDATE_LOCATION_ERROR'

export const createLocation = (location, token) => dispatch => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  dispatch({
    type: CREATE_LOCATION
  })
  return axios.post(`${process.env.REACT_APP_BACKEND_LINK}/locations`, location, config)
    .then(res => {
      dispatch({
        type: CREATE_LOCATION_SUCCESS,
        payload: res.data
      })
      }
    )
    .catch(err => {
      if (err.response){
        dispatch({
            type: CREATE_LOCATION_ERROR,
            error: err.response.data.error,
          })
      }else if(err.request){
        dispatch({
            type: CREATE_LOCATION_ERROR,
            error: err.request.data.error,
          })
      }else if(err.message){
        dispatch({
            type: CREATE_LOCATION_ERROR,
            error: err.message.data,
          })     
      }
    })
}

export const updateLocation = (location, token) => dispatch => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log(config)
  dispatch({
    type: UPDATE_LOCATION
  })
  const url = `${process.env.REACT_APP_BACKEND_LINK}/locations/${location.id}`
  console.log(url)
  return axios.patch( url, location, config)
    .then(res => {
      dispatch({
        type: UPDATE_LOCATION_SUCCESS,
        payload: res.data
      })
      }
    )
    .catch(err => {
      if (err.response){
        dispatch({
            type: UPDATE_LOCATION_ERROR,
            error: err.response.data.error,
          })
      }else if(err.request){
        dispatch({
            type: UPDATE_LOCATION_ERROR,
            error: err.request.data.error,
          })
      }else if(err.message){
        dispatch({
            type: UPDATE_LOCATION_ERROR,
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
