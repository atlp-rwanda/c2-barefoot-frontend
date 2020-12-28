import React, {Component} from 'react'
import FacebookLoginWithButton from 'react-facebook-login';
import GoogleLoginButton from 'react-google-login'


const responseGoogle = (response) => {
    console.log(response);
  }
class SocialButtons extends Component{
    render(){
        return(
            
            (this.props.stepIndex == 0 ? (
                <>
                    <p>Or</p>
                    
                    <FacebookLoginWithButton
                        appId="1206715649505081"
                        textButton='Signup with facebook'
                        size= 'small'
                        fields="name,email,picture"
                        icon="fa-facebook"/>
                    <p>Or</p>
                    <GoogleLoginButton
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        // render={renderProps => (
                        //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                        // )}
                        buttonText="SIGNUP WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </>
            ): '')
        )
    }
}

export default SocialButtons