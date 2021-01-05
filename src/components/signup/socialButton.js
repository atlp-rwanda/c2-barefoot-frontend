import React, {Component} from 'react'
import FacebookLoginWithButton from 'react-facebook-login';
import GoogleLoginButton from 'react-google-login'


class SocialButtons extends Component{
    render(){
        return(
            
            (this.props.stepIndex == 0 ? (
                <>
                    <p>Or</p>
                    
                    <FacebookLoginWithButton
                        textButton='Signup with facebook'
                        size= 'small'
                        fields="name,email,picture"
                        icon="fa-facebook"/>
                    <p>Or</p>
                    <GoogleLoginButton
                        buttonText="SIGNUP WITH GOOGLE"
                        cookiePolicy={'single_host_origin'}
                    />
                </>
            ): '')
        )
    }
}

export default SocialButtons