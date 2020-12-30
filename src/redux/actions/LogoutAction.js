import { API } from "./AxiosAPI";

export const LOGOUT_PENDING = "LOGOUT_PENDING";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
 
export const logoutAction =(authToken) => dispatch =>{
        API.defaults.headers.common['Authorization'] =`Bearer ${authToken}`;
        dispatch({
            type: LOGOUT_PENDING
        })
        return API.post('/user/logout').then(()=>{
            dispatch({
                type:LOGOUT_SUCCESS
            })
        })
        .catch(err=>{
            if(err.message === "Network Error"){
                dispatch({
                    type: LOGOUT_FAIL,
                    error: 'Network Error'
                })
            }
            if(err.response){
                dispatch({
                    type: LOGOUT_FAIL,
                    error: err.response.data.message
                })
            }
        
    })
    
}

export const closeSnackbar = () => dispatch =>{
    dispatch({
        type: CLOSE_SNACKBAR
    });
}