import axios from 'axios'

const token = window.localStorage.getItem('barefootUserToken')

export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS'
export const FETCH_ROLES_ERROR = 'FETCH_ROLES_ERROR'


export const getRoles = () => dispatch => {
  return axios.get(`${process.env.REACT_APP_BACKEND_LINK}/admin/roles`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch({
        type: FETCH_ROLES_SUCCESS,
        payload: res.data.roles
      })
      }
    )
    .catch(err => {
      dispatch({
        type: FETCH_ROLES_ERROR,
        error: err
      })
    })
}

