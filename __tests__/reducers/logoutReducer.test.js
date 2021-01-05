import {logoutReducer} from '../../src/redux/reducers/logoutReducer';
import { LOGOUT_PENDING,LOGOUT_SUCCESS,CLOSE_SNACKBAR, LOGOUT_FAIL } from "../../src/redux/actions/LogoutAction";

describe('logoutReducer(state, action)', () =>{
    const initialState ={
        pending: false,
        success: false,
        snackBarMessage: false,
        error: '',
    } 
    it('should return the initialState for no action', () =>{
        const reducer = logoutReducer(undefined, {});
        expect(reducer).toEqual(initialState);
    })
    it('should return success with true when logout success', () =>{
        const action ={
            type: LOGOUT_SUCCESS
        } 
        const reducer = logoutReducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            success: true,
            pending: false
            }
        );

    })
    
    it('should return error when logout fails', () =>{
        const action ={
            type: LOGOUT_FAIL,
            error: 'Network Error'
        } 
        const reducer = logoutReducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            pending: false,
            success: false,
            snackBarMessage: true,
            error: action.error
            }
        );

    })
    it('should set pending to true to show skeletons', () =>{
        const action ={
            type: LOGOUT_PENDING
        } 
        const reducer = logoutReducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            pending: true
            }
        );

    })
    it('should return with changes of snackBarMessage status to false', () =>{
        const action ={
            type: CLOSE_SNACKBAR
        } 
        const reducer = logoutReducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            snackBarMessage: false
            }
        );

    })
})

