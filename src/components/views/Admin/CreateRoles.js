import React from 'react'
import { Typography, makeStyles, Divider, Box, Button, Grid} from '@material-ui/core'
import { createRoleAction, clearSnackBar } from '../../../redux/actions/createRoleAction'
import { connect } from 'react-redux'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { FormGroup, TextField, Slide, CssBaseline, Snackbar} from '@material-ui/core';
import Loader from '../../Loader';
import MuiAlert from '@material-ui/lab/Alert';

const initialValues = {
  role: '',
  description: ''
}
//form validation with yup
const roleForm = Yup.object().shape({
  role: Yup.string().required('The role name is required'),
  description: Yup.string().min(5, 'At least 5 characters').required('Description of the role is required')
})

const useStyles = makeStyles((theme) => ({
  titleBox: {
    marginBottom: theme.spacing(5)
  },
  createForm:{

  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  TextField: {
    marginBottom: theme.spacing(2)
  },
  formButtons: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    justifyContent: 'space-around'
  }
}))

function CreateRoles (props) {
  const classes = useStyles()

  const handleSubmition = (payload, {resetForm}) => {
    props.createRoleAction(payload)
    resetForm({payload: ''})

    
  }

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const closeSnackBarTimer = () => {
    props.clearSnackBar()
  }

  let load = props.createRoles.pending

  return(
    <Grid 
    container 
    justify='center'
    >
      <CssBaseline/>

      <Grid item md={3} sm={6} xs={10}>
        <Loader open={load}/>
        
        <Snackbar
        open={props.createRoles.snackBarMessage}
        onClose={closeSnackBarTimer}
        autoHideDuration={4000}
        TransitionComponent={TransitionUp}
        >
          <MuiAlert
          severity='success'
          variant='filled'
          elevation={6}
          >Role Successfully Created!</MuiAlert>
        </Snackbar>

        <div className={classes.titleBox}>
        <Typography variant='h5' align='center'>Create new Role</Typography>
        <Divider/>
        </div>
        <div className={classes.createForm}>
          <Formik
          initialValues={initialValues}
          validationSchema={roleForm}
          onSubmit={handleSubmition}
          >
            {({errors, touched}) => (
              <Form className={classes.form} noValidate>
                <FormGroup className={classes.TextField}>
                  <Field as={TextField} 
                  label='Role title'
                  name= 'role' 
                  fullWidth 
                  autoFocus
                  required
                  disabled={load}
                  />
                  {errors.role && touched.role ? (<div style={{textAlign: 'left', color:'red'}}>{errors.role}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Field as={TextField}
                   label='Role description' 
                   variant='outlined' 
                   name='description' 
                   fullWidth
                   disabled={load}
                   />
                   {errors.description && touched.description ? (<div style={{textAlign: 'left', color:'red'}}>{errors.description}</div>) : null}
                </FormGroup>
            <Box className={classes.formButtons} >
              <Button variant='contained' size='medium' color='primary' type="submit" disabled={load}>Save</Button>
              <Button variant='contained' size='medium' color='secondary'>Cancel</Button>
            </Box>
          </Form>
              
            )}
          </Formik>
        </div>
      </Grid>
      
    </Grid>
  )
}

const mapStateToProps = state =>({
  createRoles: state.createRoles
})

export default connect(mapStateToProps, {createRoleAction, clearSnackBar})(CreateRoles)