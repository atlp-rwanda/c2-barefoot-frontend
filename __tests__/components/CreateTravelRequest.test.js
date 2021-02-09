import React from 'react';
import {CreateTravelRequest} from '../../src/components/views/user/CreateTravelRequest';
import {CssBaseline, Grid, Snackbar} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from '../../src/components/Loader';
import { props, props2 } from '../../dummyData';


describe('<CreateTravelRequest />', () =>{
    let wrapper;
    
    it('if it matches snapshot', () => {

        wrapper = mount(<CreateTravelRequest travelRequest={props2} {...props} /> );
        
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    

})