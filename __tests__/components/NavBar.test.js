import React from 'react';
import Header from '../../src/components/NavBar';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('<Header />', () =>{
    let wrapper;
    it("should be rendered without errors", () =>{
        wrapper = mount(<Header/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})