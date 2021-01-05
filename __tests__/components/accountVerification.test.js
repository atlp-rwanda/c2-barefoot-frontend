import { shallow, mount } from "enzyme";
import React from 'react';
import toJson from "enzyme-to-json";
import { Confirm } from "../../src/components/signup/thirdStep";
import VerifyAccount from "../../src/components/signup/verifyAccount";


describe('Account verifacation', () => {
    let formData = new FormData()

    const props = {
        formData:formData,
        setFormData: function(){},
    }
    describe('Account verification Rendering', ()=>{
        
        it('renders Account varidation correctly', () => {
            const wrapper = mount(<VerifyAccount />)
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        
    })

})
