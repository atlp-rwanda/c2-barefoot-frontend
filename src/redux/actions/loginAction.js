import axios from 'axios';

export const USER_LOGIN = 'LOGIN';
export const LoGIN_LOADING = 'LOADING';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const loginAction = (userCredentials) => dispatch => {
    dispatch({
        type: LoGIN_LOADING
    });
    axios.post('https://barefoot-nomad-app-v1.herokuapp.com/api/v1/user/login',
    {
        email: userCredentials.email,
        password: userCredentials.password
    }
    )
    .then(() => {
        dispatch({
            type: USER_LOGIN
        })
    })
    .catch(err=>{
        if(err.message === 'Network Error'){
            console.log(err.message);
            dispatch({
                type: USER_LOGIN,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: USER_LOGIN,
                error: 'Email or password is invalid, try again!'
            })
        }

    });
}

export const closeSnackbar = () => dispatch =>{
    dispatch({
        type: CLOSE_SNACKBAR
    });
}
