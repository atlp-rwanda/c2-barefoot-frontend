import axios from 'axios'

export const FETCH_LOCATIONS_PENDING = 'FETCH_LOCATIONS_PENDING'
export const  FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS'
export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR'


export const getLocations = () => dispatch => {
  dispatch({
    type: FETCH_LOCATIONS_PENDING
  })
  axios.get('https://barefoot-nomad-app-v1.herokuapp.com/api/v1/locations')
    .then(res => {
      dispatch({
        type: FETCH_LOCATIONS_SUCCESS,
        payload: res.data.locations.rows
      })
      }
    )
    .catch(err => {
      dispatch({
        type: FETCH_LOCATIONS_ERROR,
        error: err
      })
    })
}

