import * as types from "../../src/redux/actions/signupRequestAction";
import { signupRequestReducer } from "../../src/redux/reducers/signupReducer";

describe('Signup reducer', () => {
    const initialState ={
        requesting: false,
        success: false,
        successMessage: '',
        errorOpen: false,
        error: '',
    } 
    it('should return success with true when signup succedd', () =>{
        const action ={
            type: types.REQUEST_SUCCESS
        } 
        const reducer = signupRequestReducer(initialState, action)
        expect(reducer).toEqual({
            ...initialState,
            success: true
            }
        );

    })
    it('Should handle CLOSE_SNACKBAR', () => {
        expect(signupRequestReducer(initialState, {
          type: types.CLOSE_SNACKBAR
        })
        ).toEqual({
          ...initialState,
          errorOpen: false
        })
      })
    it('Should return initial state', () => {
    expect(signupRequestReducer(undefined, {})
    ).toEqual({
        requesting: false,
        success: false,
        successMessage: '',
        errorOpen: false,
        error: '',
    })
    })
})