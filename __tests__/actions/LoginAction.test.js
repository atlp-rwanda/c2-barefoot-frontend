import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';	
import axios from 'axios';	
import MockAdapter from 'axios-mock-adapter';
import {loginAction, closeSnackbar, loadSkeletons, DISPLAY_SKELETONS} from '../../src/redux/actions/loginAction';	
const middleware = [thunk];	
const mockStore = configureStore(middleware);	
const mock = new MockAdapter(axios);	
const store = mockStore({});
import { USER_LOGIN, LoGIN_LOADING, CLOSE_SNACKBAR } from "../../src/redux/actions/loginAction";

describe('loginStore(creds)', () =>{
    beforeEach(()=>{
        store.clearActions();
    });

    it('dispatches USER_LOGIN after login success', () =>{
        mock.onPost(process.env.REACT_APP_BACKEND_LINK+'/user/login')
        .reply(200, {response:{data:{data:'success login'}}});
        store.dispatch(loginAction({email:'test@test.test', password:'test12345678'})).then(()=>{
            let expectedActions =[
                {type: LoGIN_LOADING},
                {type: USER_LOGIN}
            ];
            expect(store.getActions()).toEqual(expectedActions);
        });
        

    },50000)
    
})

describe('closeSnackbar() action', ()=>{
    it('should dispatch the CLOSE_SNACKBAR action', () => {
        store.clearActions();
        store.dispatch(closeSnackbar())
            let expectedAction = [{type:CLOSE_SNACKBAR}];
            expect(store.getActions()).toEqual(expectedAction);
    })
})
describe('loadSkeletons() action', ()=>{
    it('should dispatch the DISPLAY_SKELETONS action with false', () => {
        store.clearActions();
        store.dispatch(loadSkeletons(false))
        let expectedAction = [{
            type: DISPLAY_SKELETONS,
            payload: false
        }];
        expect(store.getActions()).toEqual(expectedAction);
    })
    it('should dispatch the DISPLAY_SKELETONS action with true', () => {
        store.clearActions();
        store.dispatch(loadSkeletons(true))
        let expectedAction = [{
            type: DISPLAY_SKELETONS,
            payload: true
        }];
        expect(store.getActions()).toEqual(expectedAction);
    })
})