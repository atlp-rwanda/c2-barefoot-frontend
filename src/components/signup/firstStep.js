import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import {TextField, InputAdornment, Box, Avatar} from '@material-ui/core';
import { AccountCircle, Email, Lock } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import { Login } from '../views/Login';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media(max-width: 320px)' : {
      display: 'unset'
    },
  },
  button: {
    margin: theme.spacing(1)
  },
  stepButtons: {
    display: 'grid',
    gridTemplateColumns: ' auto 1fr auto',
    alignItems: 'center',
    '@media(max-width: 740px)' : {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
  },
  box:{
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    marginTop: '16px',
    marginBottom: '8px',
  },
  textBox: {
    height: '38px',
    marginLeft: '0.5rem',
    width: '100%',
  },
  skeletonButton: {
    width: '68px',
    height: '38px',
    borderRadius: '5px'
  },
  skeletonLink: {
    width: '120px',
    borderRadius: '5px'
  }
}));

const validationSchema = yup.object({
    first_name: yup
        .string()
        .required('First Name is required')
        .max(20),
    last_name: yup
        .string()
        .required('Last Name is required')
        .max(20),
    username: yup
        .string()
        .required('Username is required')
        .max(20),
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .required("Password is required")
        .min(8),
    confirmPassword: yup
        .string()
        .required("Confirm Password")
        .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Passwords must be equel"
        )
    })

});

export const FirstStep = ({ loading, formData, setFormData, nextStep }) => {
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={classes.form} form-data='form-1'>
            {loading ? (
              <Box className={classes.box}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.textBox} />
              </Box>
              
            ) : (
              <Field
                name='first_name'
                label='First Name *'
                margin='normal'
                as={TextField}
                error={touched.first_name && errors.first_name}
                helperText={touched.first_name && errors.first_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {loading ? (
              <Box className={classes.box}>
              <Skeleton variant="circle">
                <Avatar/>
              </Skeleton>
              <Skeleton variant="rect" className={classes.textBox} />
            </Box>
            ) : (
              <Field
                name='last_name'
                label='Last Name *'
                margin='normal'
                as={TextField}
                error={touched.last_name && errors.last_name}
                helperText={touched.last_name && errors.last_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {loading ? (
              <Box className={classes.box}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.textBox} />
              </Box>
            ) : (
              <Field
                name='username'
                label='Username *'
                margin='normal'
                as={TextField}
                error={touched.username && errors.username}
                helperText={touched.username && errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            
            {loading ? (
              <Box className={classes.box}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.textBox} />
              </Box>
            ) : (
              <Field
                type='email'
                name='email'
                label='Email *'
                margin='normal'
                as={TextField}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            
            {loading ? (
              <Box className={classes.box}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.textBox} />
              </Box>
            ) : (
              <Field
                type='password'
                name='password'
                label='Password *'
                margin='normal'
                as={TextField}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            
            {loading ? (
              <Box className={classes.box}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.textBox} />
              </Box>
            ) : (
              <Field
                type='password'
                name='confirmPassword'
                label='Confirm Password *'
                margin='normal'
                as={TextField}
                error={touched.confirmPassword && errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            
            <div className={classes.stepButtons}>
              {loading ? (
                <Box className={classes.box}>
                  <Skeleton variant="rect" className={classes.skeletonLink} />
                </Box>
              ) : (
                <a href='/login' style={{textDecoration:'none'}}>Sign in instead</a>
              )}
              
              <div></div>
              { loading ? (
              <Box className={classes.box}>
                <Skeleton variant="rect" className={classes.skeletonButton} />
              </Box>
              
            ) : (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Next
              </Button>
            )}
              
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

FirstStep.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
