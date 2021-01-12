import axios from 'axios'

const token = window.localStorage.getItem('barefootUserToken')

export const FETCH_PERMISSIONS_PENDING = 'FETCH_PERMISSIONS_PENDING'
export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS'
export const FETCH_PERMISSIONS_ERROR = 'FETCH_PERMISSIONS_ERROR'
export const CHECKBOX_CHANGED = 'CHECKBOX_CHANGED'

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
      payload: res.data
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