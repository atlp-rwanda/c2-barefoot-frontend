import { FirstStep } from './firstStep';
import { SecondStep } from './secondStep';
import { Confirm } from './thirdStep';
import SideNav from './sideDiv'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import SocialButtons from '../signup/socialButton'
import { Avatar, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    float: 'right',
    backgroundColor: '#fff',
  },
  rightSide: {
    border: '2px solid lightblue',
    padding: '1.5rem',
    '@media(max-width: 740px)' : {
      maxWidth: '450px',
    },
    '@media(max-width: 370px)' : {
      border: 'none',
      padding: 'unset'
    },
  },
  h3:{
    color: 'dodgerblue',
    margin: '1em',
    '@media(max-width: 740px)' : {
      fontSize: '15px'
    }
  },
  container: {
    display: 'grid',
    fontFamily: "'Poppins', sans-serif",
    '@media(max-width: 740px)' : {
      display: 'flex',
      flexDirection: 'column'
    },
    gridTemplateColumns: '1fr 1fr', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    boxSizing: 'border-box',
    marginBottom: '100px'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textBox: {
    height: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '0.5rem',
    width: '100%',
    maxWidth: '200px'
  },
  box: {
    display: 'grid',
    alignItems: 'center'
  },
  stepperContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '400px',
    marginTop: '4px',
    
    '@media(max-width: 800px)' : {
      width: '330px'
    },
    '@media(max-width: 740px)' : {
      width: 'unset'
    },
  },
  stepperBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100px'
  },
  stepperText: {
    height: '10px',
    width: '70%',
    marginTop: '5px'
  }
}));

function getSteps() {
  return ['Basic Information', 'More information', 'All information'];
}

function getStepContent(loading, stepIndex, formData, setFormData, handleNext, handleBack) {
  switch (stepIndex) {
    case 0:
      return (
        <FirstStep
          formData={formData}
          setFormData={setFormData}
          nextStep={handleNext}
          loading = {loading}
        />
      );
    case 1:
      return (
        <SecondStep
          formData={formData}
          setFormData={setFormData}
          nextStep={handleNext}
          prevStep={handleBack}
          loading = {loading}
        />
      );
    case 2:
      return (
        <Confirm formData={formData} nextStep={handleNext} prevStep={handleBack} loading = {loading} />
      );
    default:
  }
}

export default function SignUp() {
  const [formData, setFormData] = React.useState({
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
  });
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true)
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  setTimeout(() => { setLoading(false)}, 1000);
  return (
    <div className={classes.container}>
      <SideNav loading={loading}/>
      <div className={classes.root}>
        <div className={classes.rightSide}>
          { loading ? (
            <Box className={classes.box}>
              <Skeleton variant="rect" className={classes.textBox}/>
            </Box>
          ) : (
            <h3 className={classes.h3}>Signup with your credentials</h3>
          )}
          
          { loading ? (
            <Box className={classes.stepperContainer}>
              <Box className={classes.stepperBox}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.stepperText}/>
                <Skeleton variant="rect" className={classes.stepperText}/>
              </Box>
              <Box className={classes.stepperBox}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.stepperText}/>
                <Skeleton variant="rect" className={classes.stepperText}/>
              </Box>
              <Box className={classes.stepperBox}>
                <Skeleton variant="circle">
                  <Avatar/>
                </Skeleton>
                <Skeleton variant="rect" className={classes.stepperText}/>
                <Skeleton variant="rect" className={classes.stepperText}/>
              </Box>
            </Box>
          ) : (
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>Well Done <i class="fa fa-thumbs-up"></i></Typography>
                <Typography className={classes.instructions}>Now, Check your inbox <p>to verify your account</p></Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(loading, activeStep, formData, setFormData, handleNext, handleBack)}</Typography>
              </div>
            )}
          </div>
        </div>
        <SocialButtons stepIndex={activeStep} loading={loading}/>
      </div>
    </div>
  );
}

