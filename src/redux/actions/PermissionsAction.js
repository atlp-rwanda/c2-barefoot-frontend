import axios from 'axios'

const token = window.localStorage.getItem('barefootUserToken')

export const FETCH_PERMISSIONS_PENDING = 'FETCH_PERMISSIONS_PENDING'
export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS'
export const FETCH_PERMISSIONS_ERROR = 'FETCH_PERMISSIONS_ERROR'
export const CHECKBOX_CHANGED = 'CHECKBOX_CHANGED'
export const UPDATE_PERMISSIONS_PENDING = 'UPDATE_PERMISSIONS_PENDING'
export const UPDATE_PERMISSIONS_SUCCESS = 'UPDATE_PERMISSIONS_SUCCESS'
export const UPDATE_PERMISSIONS_ERROR = 'UPDATE_PERMISSIONS_ERROR'
export const CLEAR_PERMISSIONS_SNACKBAR = ' CLEAR_PERMISSIONS_SNACKBAR'

export const getPermissions = (payload) => dispatch => {
  dispatch({
    type: FETCH_PERMISSIONS_PENDING
  })

  return axios.get(`${process.env.REACT_APP_BACKEND_LINK}/admin/permissions`, {
    params: {
      role: payload
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    dispatch({
      type: FETCH_PERMISSIONS_SUCCESS,
      payload: res.data,
      role: payload
    })
  })
  .catch(err => {
    dispatch({
      type: FETCH_PERMISSIONS_ERROR,
      error: err.message
    })
  })
}

export const changePermission = (index,payload) => dispatch =>{
  dispatch({
    type: CHECKBOX_CHANGED,
    payload: payload,
    index: index
  })
}

export const updatePermission = (payload, role) => dispatch => {
  dispatch({
    type: UPDATE_PERMISSIONS_PENDING
  })

  return axios.put(`${process.env.REACT_APP_BACKEND_LINK}/admin/roles/update`, {
    role: role,
    permissions: payload
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    dispatch({
      type: UPDATE_PERMISSIONS_SUCCESS,
      message: 'Permissions Updated Successfully'
    })
    
  })
  .catch((err) => {
    dispatch({
      type: UPDATE_PERMISSIONS_ERROR,
      error: err.message
    })
    
  })
}

export const clearPermissionSnackbar = () => dispatch => {
  dispatch({
    type: CLEAR_PERMISSIONS_SNACKBAR
  })
}