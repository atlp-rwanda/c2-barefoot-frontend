import axios from 'axios';

const token = window.localStorage.getItem('barefootUserToken')


export const FETCH_MANAGERS_PENDING = 'FETCH_MANAGERS_PENDING'
export const FETCH_MANAGERS_SUCCESS = 'FETCH_MANAGERS_SUCCESS'
export const FETCH_MANAGERS_ERRORS = 'FETCH_MANAGERS_ERRORS'

export const getManagers = () => dispatch => {

  return axios.get(`${process.env.REACT_APP_BACKEND_LINK}/assignUserstoManager/verified-users/managers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    dispatch({
      type: FETCH_MANAGERS_SUCCESS,
      payload: res.data.managers
    })
  })
  .catch(err => {
    dispatch({
      type: FETCH_MANAGERS_ERRORS,
      error: err.message
    })
  })
}