import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/redux/actions/fetchAccommodations';
import { accommodationsPayload } from '../../dummyData'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

describe('Fetch accommodations actions', () => {
  let store;

  beforeEach(() => {
    moxios.install()
    store = mockStore({fetchAccommodations: {}})
  })
  afterEach(() => moxios.uninstall())

  it('Creates FETCH_ACCOMMODATIONS_SUCCESS after task is successful', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
       status: 200,
       response: {
          accommodations: {
            rows: accommodationsPayload
          }
       }
       })
    })

    return store.dispatch(actions.getAccommodations()).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions[0].type).toEqual('FETCH_ACCOMMODATIONS_PENDING')
      expect(expectedActions[1].type).toEqual('FETCH_ACCOMMODATIONS_SUCCESS')
    })
  })

  it('Dispatches FETCH_ACCOMMODATIONS_ERROR after task is unsuccessful', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
       status: 500,
       response: {
         Error: 'Internal Error'
        }
       
       })
    })

    return store.dispatch(actions.getAccommodations()).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions[0].type).toEqual('FETCH_ACCOMMODATIONS_PENDING')
      expect(expectedActions[1].type).toEqual('FETCH_ACCOMMODATIONS_ERROR')
    })
  })

})