import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux/actions/LogoutAction';
import { closeSnackbar } from '../../redux/actions/loginAction';
import PropTypes from 'prop-types';

import { Skeleton } from '@material-ui/lab';
import { Snackbar, Typography, Slide, Grid} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    waitingResponse:{
        display: 'Flex',
        flexDirection:'column',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainGrid:{
        height: '80vh'
    }
}));

function Logout(props){
    const classes = useStyles();

    useEffect(()=>{
        const authToken = localStorage.getItem('barefootUserToken');
        props.logoutAction(authToken);
        return localStorage.clear();
    },[]);

    const closeSnackbarTimer = ()=>{
        props.closeSnackbar();
    };

    const transitionSnackbar = (props)=>{
        return <Slide {...props} direction ="right"/>;
    }

    if(props.logout.success){
        props.history.push('/login');
    }

    return (
        <React.Fragment>
            <Grid container  className={classes.mainGrid}>
            <div>
                <Snackbar
                open={props.logout.snackBarMessage}
                onClose={closeSnackbarTimer}
                autoHideDuration={5000}
                TransitionComponent={transitionSnackbar}
                >
                    <MuiAlert 
                    severity="error" 
                    variant="filled"
                    elevation={6}
                    >{props.logout.error}</MuiAlert>
                </Snackbar>
            </div>
            
                <div className={classes.waitingResponse}>
                   {props.logout.pending ? 
                   <React.Fragment>
                        <Skeleton height={40} width={500} />
                        <Skeleton height={40} width={500} />
                        <Skeleton height={40} width={500} />
                    </React.Fragment> 
                    :
                    <Typography variant="h5">{props.logout.error}</Typography>
                  }
                </div>
            
            
            </Grid>
        </React.Fragment>
    )
}

Logout.prototypes = {
    logoutAction: PropTypes.func.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
    logout: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    logout: state.logout
});

export {Logout};
export default connect(mapStateToProps, {logoutAction, closeSnackbar})(Logout);
