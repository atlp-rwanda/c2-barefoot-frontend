import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import { AccountCircle, Email, BusinessCenter, Language, Subject, EventBusy } from "@material-ui/icons";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loader from '../Loader'
import { requestSignup } from '../../redux/actions/signupRequestAction'
import { useDispatch, useSelector } from 'react-redux'
import { closeSnackbar } from '../../redux/actions/signupRequestAction';


const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'left'
  },
  textCenter: {
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(1)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));


export const Confirm = ({ formData, prevStep, nextStep }) => {
  const classes = useStyles();
  const { first_name, last_name, email, username, occupation, bio, address, language, profile_picture} = formData;

  const dispatch = useDispatch();
  const requestingState = useSelector(state => state.signup.requesting);
  const openError = useSelector(state => state.signup.errorOpen);
  const errorMsg = useSelector(state => state.signup.error);

  const signupRequest = () => {
    const{confirmPassword, ...user} = {...formData}
    dispatch(requestSignup(user, nextStep))
  }
  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
  }
  return (
    <>
      <Loader open={requestingState} />
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error" >
          Error: {errorMsg ? JSON.stringify(errorMsg).replace(/[\\'"]+/g, '') : 'Error Not set'}
        </Alert>
      </Snackbar>
      <div>
        <List>
        <ListItem>
            <Avatar alt="user" name='file' src={profile_picture ? profile_picture : ''} className={classes.large}/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText
              primary='Names'
              secondary={first_name + ' ' + last_name}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText
              primary='Username'
              secondary={username}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email/>
            </ListItemIcon>
            <ListItemText
              primary='Email'
              secondary={email}
              
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText
              primary='Occupation'
              secondary={occupation}
              
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BusinessCenter />
            </ListItemIcon>
            <ListItemText
              primary='Address'
              secondary={address}
              
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary='Language'
              secondary={language}
              
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Subject />
            </ListItemIcon>
            <ListItemText
              primary='Biography'
              secondary={bio}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EventBusy />
            </ListItemIcon>
            <ListItemText
              primary='Occupation'
              secondary={occupation}
            />
          </ListItem>
        </List>
        <div className={classes.textCenter}>
          <Button
            color='secondary'
            variant='contained'
            id="backBtn"
            className={classes.button}
            onClick={() => prevStep()}
          >
            Back
          </Button>

          <Button
            color='primary'
            variant='contained'
            btn='submitBtn'
            className={classes.button}
            onClick={() => signupRequest()}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

Confirm.propTypes = {
  formData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  requestSignup: state.signup,
})

export default connect(mapStateToProps, { requestSignup })(Confirm)