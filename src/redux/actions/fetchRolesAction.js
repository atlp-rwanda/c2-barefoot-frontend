import axios from 'axios'

const token = window.localStorage.getItem('barefootUserToken')

export const DELETE_ROLE_PENDING = 'DELETE_ROLE_PENDING'
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS'
export const FETCH_ROLES_ERROR = 'FETCH_ROLES_ERROR'
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS'
export const DELETE_ROLE_ERROR = 'DELETE_ROLE_ERROR'
export const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR'

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

export const deleteRoleAction = (payload, title) => dispatch => {
  console.log(title)
  dispatch({
    type: DELETE_ROLE_PENDING
  })
  return axios.delete(`${process.env.REACT_APP_BACKEND_LINK}/admin/roles`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      role: title
    }
  })
  .then(() => {
    dispatch({
      type: DELETE_ROLE_SUCCESS,
      payload: payload
    })
  })
  .catch(err => {
    dispatch({
      type: DELETE_ROLE_ERROR,
      error: err.message
    })
  })
  
}

export const clearSnackBar = () => dispatch => {
  dispatch({
    type: CLEAR_SNACKBAR
  })
}