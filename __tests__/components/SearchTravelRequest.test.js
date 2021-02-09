import React from 'react';
import SearchLocations from '../../src/components/travelRequests/SearchTravelRequest';
import {  mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { props, props2 } from '../../dummyData';
import AddAccommodation from '../../src/components/travelRequests/addAccommodation';
import {ViewTravelRequest} from '../../src/components/views/user/ViewTravelRequest';

describe('<SearchLocations />', () =>{
    let wrapper;
    
    it('if it matches snapshot', () => {

        wrapper = mount(<SearchLocations travelRequest={props2} {...props} /> );
        
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('<AddAccommodation />', () =>{
    let wrapper;
    
    it('if it matches snapshot', () => {

        wrapper = mount(<AddAccommodation travelRequest={props2} {...props} /> );
        
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('<ViewTravelRequest />', () =>{
    let wrapper;
    
    it('if it matches snapshot', () => {

        wrapper = shallow(<ViewTravelRequest listTravelRequest={props2} {...props} /> );
        
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});