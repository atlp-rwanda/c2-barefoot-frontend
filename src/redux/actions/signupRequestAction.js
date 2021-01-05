import axios from 'axios'

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_ERROR = 'REQUEST_ERROR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'


export const requestSignup = (user, nextStep) => async dispatch => {
  dispatch({
    type: REQUEST_SIGNUP
  })
  return axios.post( `https://barefoot-nomad-app-v1.herokuapp.com/api/v1/user/signup`, user)
    .then(res => {
      dispatch({
        type: REQUEST_SUCCESS,
        payload: res.data
      })
      nextStep()
      }
    )
    .catch(err => {
        if (err.response){
            dispatch({
                type: REQUEST_ERROR,
                error: err.response.data.error,
              })
          }else if(err.request){
            dispatch({
                type: REQUEST_ERROR,
                error: err.request.data.error,
              })
          }else if(err.message){
            dispatch({
                type: REQUEST_ERROR,
                error: err.message.data,
              })     
          }
    })
}
export const closeSnackbar = () => dispatch =>{
  dispatch({
      type: CLOSE_SNACKBAR
  });
}
