import { fetchAccommodationsReducer } from '../../src/redux/reducers/accommodationsReducer';
import * as types from '../../src/redux/actions/fetchAccommodations';
import { accommodationsPayload } from '../../dummyData';

describe('Fetch accommodations reducer', () => {

  it('Should get initial state', () => {
    expect(fetchAccommodationsReducer(undefined, {})).toEqual(
      {
        pending: true,
        accommodations: [],
        error: null
      }
    )
    })


  it('Should handle FETCH_ACCOMMODATIONS_SUCCESS', () => {
    expect(fetchAccommodationsReducer(undefined, {
      type: types.FETCH_ACCOMMODATIONS_SUCCESS,
      payload: accommodationsPayload
    })
    ).toEqual(
      {
        pending: false,
        accommodations: accommodationsPayload,
        error: null
      }
    )
  })

  it('Should handle FETCH_ACCOMMODATIONS_ERROR', () => {
    expect(fetchAccommodationsReducer(undefined, {
      type: types.FETCH_ACCOMMODATIONS_ERROR,
      error: 'Error getting the accommodations'
    })
    ).toEqual(
      {
        pending: false,
        accommodations: [],
        error: 'Error getting the accommodations'
      }
    )
  })
})