import axios from 'axios'

export const FETCH_ACCOMMODATIONS_PENDING = 'FETCH_ACCOMMODATIONS_PENDING'
export const  FETCH_ACCOMMODATIONS_SUCCESS = 'FETCH_ACCOMMODATIONS_SUCCESS'
export const FETCH_ACCOMMODATIONS_ERROR = 'FETCH_ACCOMMODATIONS_ERROR'


export const getAccommodations = () => dispatch => {
  return axios.get(`${process.env.REACT_APP_BACKEND_LINK}/accommodations`)
    .then(res => {
      dispatch({
        type: FETCH_ACCOMMODATIONS_SUCCESS,
        payload: res.data.accommodations
      })
      }
    )
    .catch(err => {
      dispatch({
        type: FETCH_ACCOMMODATIONS_ERROR,
        error: err
      })
    })
}

