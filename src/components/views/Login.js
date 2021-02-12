import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginAction, closeSnackbar, loadSkeletons } from '../../redux/actions/loginAction';
import PropTypes from 'prop-types';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { FormGroup, TextField, Link, Slide, Button} from '@material-ui/core';
import {CssBaseline, Grid, Paper, Snackbar, Avatar, Typography} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Skeleton } from '@material-ui/lab';
import loginStyles from '../styles/Login';

import Loader from '../Loader';

//initials of the login form
const initialValues ={
    email : '',
    password: ''
};

//form validation with yup
const loginForm = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Your email is required'),
    password: Yup.string().min(8, 'At least 8 characters').required('Your password is required')
});

function Login(props) {
    const classes = loginStyles();
    
    useEffect(() =>{
        props.loadSkeletons(true);
        const userToken = localStorage.getItem("barefootUserToken");
        if(userToken){
            props.history.push('/profile');
        }
        const timer = setTimeout(() =>{
            props.loadSkeletons(false);
        }, 2000);
        return () => clearTimeout(timer);
        
    }, []);


    const handleSubmition = (values) => { 
        props.loginAction(values);
    }

    const transitionSnackbar = (props)=>{
        return <Slide {...props} direction ="right"/>;
    }
    
    const closeSnackbarTimer = ()=>{
        props.closeSnackbar();
    };

    let load = false;
    if(props.login.loading){
        load = true;
    } else{
        load = false;
    } 

    if(props.login.success){
        props.history.push('/managerTravel');
    }

    return(
        <>
        <Grid container component="main" className={classes.Login}>
            <CssBaseline/> 
            
            <Grid item container sm={8} xs={12} component={Paper} elevation={6} square>
                <Loader open={load} />
                <div>
                    <Snackbar
                    open={props.login.snackBarMessage}
                    onClose={closeSnackbarTimer}
                    autoHideDuration={5000}
                    TransitionComponent={transitionSnackbar}
                    >
                        <MuiAlert 
                        severity="error" 
                        variant="filled"
                        elevation={6}
                        >{props.login.error}</MuiAlert>
                    </Snackbar>
                </div>
                <div className={classes.paper}>
                    
                    {/*logic for skeletons*/}
                    {(!props.login.showSkeletons ? 
                    <>
                    <Typography component="h1" variant="h5">
                        Sign in to Barefoot Nomad
                    </Typography>
                    <Formik 
                    initialValues={initialValues} 
                    validationSchema={loginForm}  
                    onSubmit={handleSubmition} 
                    >
                        {({errors, touched}) => (
                        <Form className={classes.form} noValidate>
                            <FormGroup>
                                <Field as={TextField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                disabled={load}
                                autoFocus
                                />
                                {errors.email && touched.email ? (<div style={{textAlign: 'left', color:'red'}}>{errors.email}</div>) : null}
                            </FormGroup>
                            <FormGroup>
                                <Field as={TextField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                disabled={load}
                                />
                                {errors.password && touched.password ? (<div style={{textAlign: 'left', color:'red'}}>{errors.password}</div>) : null}
                            </FormGroup>
                            <Grid container item >
                                <Grid item xs className={classes.forgotPassword} >
                                    <Link href="/forgetpassword" variant="body2">Forgot password?</Link> 
                                </Grid>
                            </Grid>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={load}
                            className={classes.login}
                            >Login</Button>
                        </Form>
                        )}
                    </Formik>
                    </> : 
                    
                    <React.Fragment>
                        {/*the skeleton itself*/}
                        <Typography component="h1" variant="h5">
                            <Skeleton width={300} />
                        </Typography>
                        <div className={classes.form} >
                        <Skeleton height={40} width={400} />
                        <Skeleton height={40} width={400} />
                        <Grid container item >
                            <Grid item xs className={classes.forgotPassword} >
                                <Skeleton width={150}/>
                            </Grid>
                        </Grid>
                        <Skeleton 
                        variant='rect' 
                        className={classes.login} 
                        height={35} 
                        width={150} 
                        style={{margin:'auto'}}
                        />
                        </div>
                        <Grid container direction="column" className={classes.social_media_grid} >
                        <Typography variant="h6" component="h6">
                            <Skeleton style={{margin:'auto'}} width={150} />
                        </Typography>
                        
                        <Grid item container justify='space-between'>
                            <Skeleton variant='rect' className={classes.social_media} width={120} height={30} />
                            <Skeleton variant='rect' className={classes.social_media} height={30} width={120}/>
                        </Grid>
                        
                    </Grid>
                    </React.Fragment>)}
                </div>

                {(!props.login.showSkeletons ?
                <Grid container direction="column" className={classes.social_media_grid} >
                        <Typography variant="h6" component="h6">
                            Or Login with
                        </Typography>
                        <Grid item container justify='space-between' >
                            <Button
                            variant="contained"
                            disabled={load}
                            className={classes.social_media}
                            startIcon={<Avatar className={classes.image_icon} src={'https://res.cloudinary.com/barefoot-nomad-app/image/upload/v1609406918/images/facebook_cdieom.svg'}/>}
                            >
                            Facebook
                            </Button>
                        
                            <Button
                            variant="contained"
                            disabled={load}
                            className={classes.social_media}
                            startIcon={<Avatar className={classes.image_icon} src={'https://res.cloudinary.com/barefoot-nomad-app/image/upload/v1609407032/images/google_gd4tb4.svg'}/>}
                            >
                                Google
                            </Button>
                        </Grid>
                        
                </Grid> : null )}
            </Grid>
            <Grid item container sm={4} xs={12} style={{background:"#257AAA"}}>
                <div className={classes.paper2} text='primary'>
                
                    {(!props.login.showSkeletons ? 
                    <>
                    <Typography component="h1" variant="h5">
                        Hello, Friend!
                    </Typography>
                    <Grid item container className={classes.secondpart}>
                        <Typography variant="subtitle1">
                            Enter your personal details and start your journey with us.
                        </Typography>
                        
                    </Grid>
                    <Typography variant="subtitle1">
                        Don't have an account?
                    </Typography>
                    <Button
                        href="/signup" 
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        disabled={load}
                    >Signup</Button>
                    </> : 
                    <>
                        <Typography component="h1" variant="h5">
                        <Skeleton width={150} />
                        </Typography>
                        <Grid item container className={classes.secondpart}>
                            <Skeleton height={20} width={200} /> <Skeleton height={20} width={200} />
                        </Grid>
                        <Typography variant="subtitle1">
                            <Skeleton width={150} />
                        </Typography>
                        <Skeleton variant='rect' height={35} width={150} style={{margin:'auto'}}/>
                    </>)}

                </div>

            </Grid>
        </Grid>
        </>
    )
}

Login.protoTypes={
    loginAction: PropTypes.func.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
    loadSkeletons: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    login: state.login
});

export {Login};
export default connect(mapStateToProps, { loginAction, closeSnackbar, loadSkeletons})(Login);
