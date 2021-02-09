import React from 'react';

import {Snackbar, Slide} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBarMessage = (props) => {
    const transitionSnackbar = (props)=>{
        return <Slide {...props} direction ="right"/>;
    }

    const closeTimer= () =>{
        return props.closeSnackbar();
    }
    return ( 
        <div>
            <Snackbar
            open={props.travelRequest.snackBarMessage.open}
            onClose={closeTimer}
            autoHideDuration={5000}
            TransitionComponent={transitionSnackbar}
            key={`${props.travelRequest.snackBarMessage.message}`}
            >
                <MuiAlert 
                severity={props.travelRequest.snackBarMessage.severity} 
                variant="filled"
                elevation={6}
                >{props.travelRequest.snackBarMessage.message}</MuiAlert>
            </Snackbar>
        </div>
     );
}
 
export default SnackBarMessage;