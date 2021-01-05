import axios from 'axios'

const token = window.localStorage.getItem('barefootUserToken')

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'


export const getUsers = () => dispatch => {
  return axios.get(`${process.env.REACT_APP_BACKEND_LINK}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: res.data.users
      })
      }
    )
    .catch(err => {
      dispatch({
        type: FETCH_USERS_ERROR,
        error: err
      })
    })
}

