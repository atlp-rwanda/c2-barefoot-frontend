import React from 'react';
import {Logout} from '../../src/components/views/Logout';
import { Grid, Snackbar, Typography} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('<Logout />', () =>{
    let wrapper;
    const props = {
            logoutAction : jest.fn(),
            closeSnackbar : jest.fn(),
            logout:{
                success: false,
                pending: false,
                snackBarMessage: false,
                error: ''
            }
        }
    it('if it matches snapshot', () => {

        wrapper = mount(<Logout {...props} /> );
        
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    

    it('if it should render 1 Grid, 1 Snackbar, 0 Skeleton, and 1 Typography', () =>{
        expect(wrapper.find(Grid).length).toBe(1);
        expect(wrapper.find(Snackbar).length).toBe(1);
        expect(wrapper.find(Skeleton).length).toBe(0);
        expect(wrapper.find(Typography).length).toBe(1);

    });
});
describe("Skeletons should be available", ()=>{
    const props = {
        logoutAction : jest.fn(),
        closeSnackbar : jest.fn(),
        logout:{
            success: false,
            pending: true,
            snackBarMessage: false,
            error: ''
        }
    }
    it('if it should render 3 skeletons when pending is true', () =>{
        let wrapper = shallow(<Logout {...props} />);

        expect(wrapper.find(Skeleton).length).toBe(3);

    });
})
