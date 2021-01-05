
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FirstStep } from '../../src/components/signup/firstStep';
import { mount, shallow } from 'enzyme';

describe('Very important form', () => {
    let formData = new FormData()
    const mock = jest.fn()
    const props = {
        formData:formData,
        setFormData: function(){},
        nextStep: function(){},
        prevStep: function(){},
        profile_picture: 'image.jpg'
    }
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        occupation: '',
        username: '',
        bio: '',
        address: '',
        language: '',
        password: '',
        profile_picture: ''
    }
    it("submits correct values", async () => {
        const wrapper = shallow(<FirstStep onSubmit={mock} {...props} values="custom value" />)
        const component = mount(<FirstStep initialValues={initialValues} {...props} />) 
        const form = component.find('[form-data="form-1"]').first()

        const { container } = render(<FirstStep onSubmit={mock} {...props} values="custom value" />)
        const first_name = container.querySelector('input[name="first_name"]')
        const last_name = container.querySelector('input[name="last_name"]')
        const username = container.querySelector('input[name="username"]')
        const email = container.querySelector('input[name="email"]')
        const password = container.querySelector('input[name="password"]')
        const confirmPassword = container.querySelector('input[name="confirmPassword"]')
        const submit = container.querySelector('button[type="submit"]')
        const results = container.querySelector("textarea");
        
      
        await waitFor(() => {
          fireEvent.change(first_name, {
            target: {
              value: "mockname"
            }
          })
        })
      
        await waitFor(() => {
            fireEvent.change(last_name, {
              target: {
                value: "mocknamel"
              }
            })
          })

        await waitFor(() => {
        fireEvent.change(username, {
            target: {
            value: "mockname"
            }
        })
        })
        await waitFor(() => {
          fireEvent.change(email, {
            target: {
              value: "mock@email.com"
            }
          })
        })
      
        await waitFor(() => {
          fireEvent.change(password, {
            target: {
              value: "12345678"
            }
          })
        })
      
        await waitFor(() => {
            fireEvent.change(confirmPassword, {
              target: {
                value: "12345678"
              }
            })
          })
        await waitFor(() => {
          fireEvent.click(submit)
        })
        expect(form.length).toBe(1)
      })
});

