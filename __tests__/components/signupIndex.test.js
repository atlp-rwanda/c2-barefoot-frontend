import signup from '../../src/components/views/Signup'
import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from 'enzyme';

describe('Signup index', () => {
    it('renders correctly first step', () => {
        const wrapper = shallow(<signup />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
