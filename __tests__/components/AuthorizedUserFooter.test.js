import React from 'react';
import Footer from '../../src/components/AuthorizeUserFooter';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('<AuthorizedUserFooter />', () =>{
    let wrapper;
    it("should be rendered without errors", () =>{
        wrapper = mount(<Footer/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})