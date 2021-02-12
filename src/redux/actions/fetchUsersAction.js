import axios from 'axios'

export const FETCH_USERS_LOADING = 'FETCH_USERS_LOADING'
export const  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

const token = localStorage.getItem('barefootUserToken')

export const getUsers = () => dispatch => {
    // dispatch({
    //     type:FETCH_USERS_LOADING
    // })
    return axios.get('https://barefoot-nomad-app-v1.herokuapp.com/api/v1/assignUserstoManager/verified-users', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {  
        console.log(res.data)
        dispatch({
            type:FETCH_USERS_SUCCESS,
            payload:res.data.verifiedUsers.rows
            })         
        }).catch(err => {
            if(err.message === 'Network Error'){
            dispatch({
                type: FETCH_USERS_ERROR,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: FETCH_USERS_ERROR,
                error:err
            })

        }
        })
}