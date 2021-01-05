import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { TextField, Select, InputAdornment, CircularProgress, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { AccountCircle, Language, Subject, EventBusy } from "@material-ui/icons";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media(max-width: 320px)' : {
      display: 'grid'
    },
  },
  button: {
    margin: theme.spacing(1)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  button: {
    margin: theme.spacing(1),
  },
  label: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5d5d5',
    color: 'black',
    padding: '0.3rem',
    fontFamily: 'sans-serif',
    borderRadius: '0.3rem',
    cursor: 'pointer',
    margin: '1rem',
  },
  uploadSpinner: {
    width: '20px !important',
    height: '20px !important',
    margin: '0 5px -5px 5px'
  }
}));

export  const SecondStep = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { setLoading(false); setPhoto('') }, [])
  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={classes.form}>
            <Box display='inline-flex' justifyContent='center' alignItems='center'>
              <Avatar 
              alt="user" 
              name='profile_picture' 
              margin='normal'
              src={photo ? photo : formData.profile_picture }
              className={classes.large}/>
              <input 
              id="file" 
              name="profile_picture" 
              type="file" 
              hidden={true}
              onChange={(e) => {
                const profile_picture = e.target.files[0]
                const formData = new FormData()
                formData.append('upload_preset', process.env.UPLOAD_PRESET)
                formData.append('file', profile_picture)
                setLoading(true) 
                setPhoto('')               
                axios.post(process.env.IMAGE_UPLOAD_LINK, formData)
                .then(res => {setFieldValue("profile_picture", res.data.secure_url); setLoading(false); setPhoto(res.data.secure_url)})
                .catch(err => { setLoading(false) })
              }}
              />
              
              <label htmlFor="file" className={classes.label}>
                <i className="fa fa-cloud-upload" aria-hidden="true"></i> 
                <div>
                Upload Profile Image {loading ? <CircularProgress className={classes.uploadSpinner}/> : ''}
                </div>

              </label>
            </Box>
            <Field 
            name='bio' 
            label='Biography' 
            as={TextField} 
            margin='normal'
              inputprops={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Subject />
                  </InputAdornment>
                ),
              }}
            />
            <Field 
            name='occupation' 
            label='Occupation' 
            as={TextField} 
            margin='normal'
              inputprops={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventBusy />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl>
              <InputLabel>Address</InputLabel>
              <Field 
              as={Select} 
              name="address" 
                inputprops={{
                  startAdornment: (
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                  ),
                }}
              >
                <MenuItem selected value="kk 509 st">kk 509 st</MenuItem>
                <MenuItem value="kk 309 st">kk 309 st</MenuItem>
                <MenuItem value="kk 280 st">kk 280 st</MenuItem>
              </Field>
            </FormControl>
            <FormControl>
              <InputLabel>Language</InputLabel>
              <Field 
              as={Select} 
              name="language" 
                inputprops={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Language />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem selected value="Kinyarwanda">Kinyarwanda</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Franch">Franch</MenuItem>
              </Field>
            </FormControl>
            
            <div>
              <Button
                type='submit'
                
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={() => {
                  setDirection('back'); 
                }}
              >
                Back
              </Button>
              <Button
                type='submit'
                id='backBtn'
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={() => setDirection('forward')}
              >
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

SecondStep.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
