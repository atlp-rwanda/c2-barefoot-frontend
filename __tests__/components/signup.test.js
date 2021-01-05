import { shallow, mount } from "enzyme";
import React from 'react';
import toJson from "enzyme-to-json";
import { FirstStep } from "../../src/components/signup/firstStep";
import { SecondStep } from "../../src/components/signup/secondStep";
import Signup from '../../src/components/signup'
import { Confirm } from "../../src/components/signup/thirdStep";
import SocialButtons from '../../src/components/signup/socialButton'
import SideDiv from "../../src/components/signup/sideDiv";
import {act} from 'react-dom/test-utils'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { signupState} from '../../dummyData'
import thunk from "redux-thunk";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
let store;
describe('Signup', () => {
    let formData = new FormData()
    store = mockStore({
        signup: signupState,
      });
    const props = {
        formData:formData,
        setFormData: function(){},
        nextStep: function(){},
        prevStep: function(){},
        profile_picture: 'image.jpg'
    }
    describe('Signup Rendering', ()=>{
        
        it('renders correctly first step', () => {
            const wrapper = shallow(<FirstStep {...props}/>)
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('renders correctly Signup index', () => {
            const wrapper = shallow(<Signup {...props}/>)
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('renders correctly Third step', () => {
            const wrapper = shallow(<Provider store={store}><Confirm {...props}/></Provider>)
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('renders side div correctly', () => {
            const wrapper = shallow(<SideDiv />)
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('renders Social buttons correctly', () => {
            const wrapper = shallow(<SocialButtons />)            
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        
    })
    describe('Functionalities', () => {
        it('should call onChange prop with input value', () => {
        
                const onSearchMock = jest.fn();
                const component = mount(<SecondStep onChange={onSearchMock} {...props} value="custom value" />);
                act( () => {   
                    component.find('#file').simulate('change');
                })
            
        });
        it('should call onSubmit on first step', () => {
        
            const onSubmit = jest.fn();
            const component = mount(<Router><FirstStep onSubmit={onSubmit} {...props} values="custom value" /></Router>);
            act( () => {   
                component.find('[type="submit"]').first().simulate('click');
            })
        
        });
        it('should call onSubmit on Second step', () => {
        
            const onSubmit = jest.fn();
            const component = mount(<Router><SecondStep onSubmit={onSubmit} {...props} values="custom value" /></Router>);
            act( () => {   
                component.find('[type="submit"]').first().simulate('click');
            })
        
        });
        it('should call onSubmit on Third step', () => {
        
            const onClick = jest.fn();
            const component = mount(<Provider store={store}><Router><Confirm onClick={onClick} {...props} values="custom value" /></Router></Provider>);
            act( () => {   
                component.find('[id="backBtn"]').first().simulate('click');
            })
        
        });
        it('should call onClick for backward on second step', async() => {
            
            const signupRequest = jest.fn()
                         
            const component = mount(<SecondStep onClick={signupRequest} {...props} />) 
            const button = component.find('#backBtn').at(0)
            await act( async() => {
                button.simulate('click');
            });
            expect(button.length).toBe(1)
            expect(signupRequest.mock.calls.length).toEqual(0);
        });
        it('should call onClick to submit form', async() => {
            
            const signupRequest = jest.fn()
                         
            const component = mount(<Provider store={store}><Confirm {...props} /></Provider>) 
            const button = component.find('[btn="submitBtn"]').first()
            await act( async() => {
                button.simulate('click');
            });
            expect(button.length).toBe(1)
            expect(signupRequest.mock.calls.length).toEqual(0);
        });
        it('submit form', async() => {
            const component = mount(<Router store={store}><FirstStep {...props} /></Router>) 
            const button = component.find('[form-data="form-1"]').first()
            await act( async() => {
                button.simulate('submit');
            });
            expect(button.length).toBe(1)
        });

    })

})
