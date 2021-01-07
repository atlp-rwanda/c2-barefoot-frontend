import axios from 'axios'

const token = window.localStorage.getItem('barefootUserToken')

export const CREATE_ROLE_PENDING = 'CREATE_ROLE_PENDING'
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS'
export const CREATE_ROLE_ERROR =  'CREATE_ROLE_ERROR'
export const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR'

export const createRoleAction = (payload) => dispatch => {
  dispatch({
    type: CREATE_ROLE_PENDING
  })
  return axios.post(`${process.env.REACT_APP_BACKEND_LINK}/admin/roles`, payload,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    dispatch({
      type: CREATE_ROLE_SUCCESS
    })
  })
  .catch(err => {
      dispatch({
        type: CREATE_ROLE_ERROR,
        error: err.message
      })
  })
}

export const clearSnackBar = () => dispatch => {
  dispatch({
    type: CLEAR_SNACKBAR
  })
}