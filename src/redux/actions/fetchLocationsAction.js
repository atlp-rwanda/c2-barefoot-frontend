import axios from 'axios'

export const FETCH_LOCATIONS_PENDING = 'FETCH_LOCATIONS_PENDING'
export const  FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS'
export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR'


export const getLocations = (page=1) => dispatch => {
  dispatch({
    type: FETCH_LOCATIONS_PENDING
  })
  return axios.get(`${process.env.REACT_APP_BACKEND_LINK}/locations`,{ params: { page: page }})
    .then(res => {
      // console.log(res.data.locations)
      dispatch({
        type: FETCH_LOCATIONS_SUCCESS,
        count: res.data.locations.count,
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

