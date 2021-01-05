import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/redux/actions/LogoutAction';
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

describe('logout actions', () => {
  let store;

  beforeEach(() => {
    moxios.install()
    store = mockStore({logout: {}})
  })
  afterEach(() => moxios.uninstall())

  it('Creates LOGOUT_SUCCESS after logout is successful', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
       status: 200,
       response: {
          data: {
            results: "data"
          }
       }
       })
    })

    return store.dispatch(actions.logoutAction('the token')).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions[0].type).toEqual('LOGOUT_PENDING')
      expect(expectedActions[1].type).toEqual('LOGOUT_SUCCESS')
    })
  })

  it('Dispatches LOGOUT_FAIL after logout is failed because of the network error', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject({
        status: 400,
        response:{
          data:{message:"Network Error"}
        }
      })
    })

    return store.dispatch(actions.logoutAction('fake token string')).then(() => {
      const expectedActions = [
        {type: 'LOGOUT_PENDING'},
        {type: 'LOGOUT_FAIL', error: 'Network Error'}
      ]
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  it("should dispatch LOGOUT_FAILS for any other reason of failure", () =>{
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response:{
          data:{
            message:'Fail to logout'
          }
        }
      })
    })

    return store.dispatch(actions.logoutAction('fake token')).then(() =>{
      const expectedActions = [
        {type: 'LOGOUT_PENDING'},
        {type: 'LOGOUT_FAIL', error: 'Fail to logout'}
      ]    
      expect(store.getActions()).toEqual(expectedActions);  
    }) 

  })

})

