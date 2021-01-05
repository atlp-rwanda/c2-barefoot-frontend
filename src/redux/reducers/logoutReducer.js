import { LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_FAIL, CLOSE_SNACKBAR } from "../actions/LogoutAction";

const initialState ={
    pending: false,
    success: false,
    snackBarMessage: false,
    error: '',
}
export const logoutReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOGOUT_PENDING :
            return {
                ...state,
                pending: true
            }
        case LOGOUT_SUCCESS :
            return {
                ...state,
                success: true,
                pending: false
            }
        case LOGOUT_FAIL :
            return {
                ...state,
                error: action.error,
                snackBarMessage: true,
                success: false,
                pending: false
            }
        case CLOSE_SNACKBAR :
            return {
                ...state,
                snackBarMessage: false
            }
        default:
            return state;
    }
}