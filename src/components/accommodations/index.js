import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AccountBalance, AddPhotoAlternate, CheckBox, DevicesOther, LocationOn, Title } from '@material-ui/icons';
import { Box, Button, Select, Snackbar } from '@material-ui/core';
import TextField from 'material-ui/TextField';
import DropZoneField from "../locations/dropzoneField";
import MuiAlert from '@material-ui/lab/Alert';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { closeSnackbar, createAccommodation, updateAccommodation } from '../../redux/actions/createAccommodationAction'
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import Checkbox from 'material-ui/Checkbox'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    background: '#ABD5ED',
    opacity: '0.6',
    color:'#000',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    justifyContent:'center'
  },
}))(MuiAccordionDetails);

const useStyle = makeStyles(theme => ({
  col_box:{
    display:'flex',
    justifyContent:'space-around'
  },
  detailBox:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  },
  input:{
    width:'100%'
  }
}))

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
  );

const renderTextField = (
  { input, type, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
    {...custom}
  />
);

const renderField = ({ input, label, type, textarea, meta: { touched, error, warning, invalid } }) => {
  const textareaType = <textarea {...input} type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
  const inputType = <input {...input} type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;

  return (
      <div>
          <label>{label}</label>
          <div>
              {textarea ? textareaType : inputType}
              {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
      </div>
  );
};

const renderSelectField = ({
  input,
  label,
  data,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <>
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    // name={'city'}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    
    children={children}
    {...custom}
  />
  </>
)

const formSelector = formValueSelector('CreateAccommodation')
let city={}
const imageIsRequired = (value) => (!value ? "Required" : undefined);

export function CreateAccommodation(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [Thumb, setThumb] = React.useState('')
  const [suggestion, setSuggestion] = React.useState([])
  const [executed, setExecuted] = React.useState(false)
  const [isUpdate, setIsUpdate] = React.useState(true)
  let {locationID, country} = ''
  // const [selected, setSelected] = React.useState({});
  const classes = useStyle();
const { handleSubmit, pristine, reset, submitting } = props
  
  // helps to expand or collapse the accordion
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // helps to know if we are in create mode or update mode. it runs once to avoid 'too many re-renders error'
  const createOrUpdate = () => {
    if(!executed){
      setExecuted(true)
      console.log("CHOOSE")
      props.initialValues
        ? setIsUpdate(true)
        : setIsUpdate(false)
    }
  }
  createOrUpdate()
  const token = localStorage.getItem('barefootUserToken');
  const handleFormSubmit = formProps => {
    const formData = new FormData();
    const accommodation_picture = formProps.location_image ? formProps.location_image[0] : ''
    formData.append('upload_preset', process.env.UPLOAD_PRESET)
    formData.append('file', accommodation_picture)  
      
    const {name, locationId , country} = formProps.city
    const {location_image, city,...data} = {...formProps}
    
    data.city = name 
    data.country = country  
    data.locationID = locationId  

    //this help to get only amenities from form data
    const amenitiesFilter = (
        {wifi=false,airConditioner=false,shampoo=false,ironing=false,tv=false,smokeDetector=false,fireExtinguisher=false,lockOnDoor=false}
      )=>(
        {wifi,airConditioner,shampoo,ironing,tv,smokeDetector,fireExtinguisher,lockOnDoor}
      )
    const amenitiesData = amenitiesFilter(formProps)
    // console.log(formData)
    if(isUpdate && !formProps.location_image){
      console.log('update')
      //this is run when you update anything else without updating image
      props.dispatch(updateAccommodation(data, amenitiesData, token))
    }else{
      console.log('create')
      axios.post(process.env.IMAGE_UPLOAD_LINK, formData)
      .then(res => {
        data.photos = res.data.secure_url
        // alert(JSON.stringify(data, null, 4));
        //this help create accommodation or update accommodation with image
        isUpdate 
          ? props.dispatch(updateAccommodation(data, amenitiesData, token))
          : props.dispatch(createAccommodation(data, amenitiesData, token));
      })
      .catch(err => { console.log(err) })
    }
  };

  const handleSuggestions = (value) => {
    axios.get(`${process.env.REACT_APP_BACKEND_LINK}/search/locations/all`)
    .then(res => {
      setSuggestion(res.data.locations.rows)
    })
  }

  // load locations data from database for a city dropdown
  window.onload = function(){
    setExecuted(true)
    handleSuggestions()
  }

  useEffect(() => {
    handleSuggestions()
  }, []);

  const handleClose = () => {
    props.dispatch(closeSnackbar());
  };

  const handleOnDrop = newImageFile => {setThumb(newImageFile);};

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
  }
  
  const amenities = [
    'wifi',
    'airConditioner',
    'shampoo',
    'ironing',
    'tv',
    'smokeDetector',
    'fireExtinguisher',
    'lockOnDoor'
  ];

  // helps to populate form with message depanding on functionality
  const text ={
    title: isUpdate ? 'Update Accommodation' : 'Create accommodation',
    successMessage: isUpdate ? 'Updated Successfully' : 'Created Successfully'
  }

  return (
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Snackbar open={props.AccommodationState.errorOpen} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error" >
          Error: {props.AccommodationState.error ? JSON.stringify(props.AccommodationState.error).replace(/[\\'"]+/g, '') : 'Error'}
        </Alert>
      </Snackbar>
      <Snackbar open={props.AccommodationState.successOpen} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="success" >
          Success: {props.AccommodationState.successMessage ? text.successMessage : 'Message Not set'}
        </Alert>
      </Snackbar>
        <Box>
  <div style={{textAlign:'center'}}><p>{text.title}</p></div>
          <Box style={{margin:'10px'}}>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><LocationOn/></Typography>
                  <Typography>Select location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  
                  <Typography className={classes.detailBox}>
                    <Typography>Where is the accommodation located?</Typography>
                    {/* <div>
                      <Field
                        name="country"
                        label="Country/Region"
                        component={renderTextField}
                        onChange={handleSuggestions}
                        fullWidth={true}
                      />
                    </div> */}
                    <div>
                      <Field
                        name="city"
                        component={renderSelectField}
                        label="City"
                        defaultValue="Motel"
                        // data={city ? city.name : 'Motel'}
                        fullWidth={true}
                      >
                        {
                        (suggestion.map(location => (
                        <MenuItem value={ {name : location.LocationName, locationID:location.id, country:location.country}}  primaryText={location.LocationName} />
                         ))) }
                        
                        <MenuItem value="Motel" primaryText="Motel" />
                        <MenuItem value="Lodge" primaryText="Lodge" />
                      </Field>
                    </div>
                      <div style={{marginLeft:'5px'}}>
                        <Field
                          name="state"
                          label="State"
                          component={renderTextField}
                          fullWidth={true}
                        />
                      </div>
                    <div>
                        <Field
                          name="streetAddress"
                          label="Street Address"
                          component={renderTextField}
                          fullWidth={true}
                        />
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
                  <Typography><AccountBalance/></Typography>
                  <Typography>Accommodation capacity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Typography>What type or capacity of this accommodation?</Typography>
                    <div>
                      <Field
                        name="propertyType"
                        component={renderSelectField}
                        label="Choose a property type"
                        fullWidth={true}
                      >
                        <MenuItem value="Hostel" primaryText="Hostel" />
                        <MenuItem value="Motel" primaryText="Motel" />
                        <MenuItem value="Lodge" primaryText="Lodge" />
                      </Field>
                    </div>
                    <div >
                      <Field
                        name="numberOfRooms"
                        label="Number Of Rooms"
                        type="number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        component={renderTextField}
                        normalize={ val => (val || "").replace(/[^\d]/g, "") }
                        fullWidth={true}
                      />
                    </div>
                    <div>
                      <Field
                        name="typeOfBed"
                        component={renderSelectField}
                        label="Type Of Bed"
                        fullWidth={true}
                      >
                        <MenuItem value="Double Decker" primaryText="Double Decker" />
                        <MenuItem value="Flat" primaryText="Flat" />
                        <MenuItem value="Poster" primaryText="Poster" />
                      </Field>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
                <Typography><Title/></Typography>
                  <Typography>Add title and description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                  <div>
                      <Field
                        name="title"
                        label="Add A Title Of Accommodation"
                        component={renderTextField}
                        fullWidth={true}
                      />
                  </div>
                  <div>
                      <Field 
                        name="description"  
                        component={renderField} 
                        type="text" 
                        label="Description" 
                        textarea={true} 
                      />
                  </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
                <Typography><AddPhotoAlternate/></Typography>
                  <Typography>Add photos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Field
                      name="location_image"
                      component={DropZoneField}
                      type="file"
                      imagefile={Thumb}
                      handleOnDrop={handleOnDrop}
                      validate={!isUpdate ? [imageIsRequired] : ''}
                    />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
                <Typography><DevicesOther/></Typography>
                  <Typography>Select amenities</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', columnGap:'10px' }}>
                    {amenities.map(option => (
                      <Field name={option} component={renderCheckbox} label={option} />
                    ))}
                    
                  </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <div style={{display:'flex',justifyContent:'center', marginTop:'15px'}}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size='large'
                    disabled={pristine || submitting}
                    style={{margin:'0 5px'}}
                  >
                    Post
                  </Button>
                  <Button 
                    type="button" 
                    color="secondary"
                    variant="contained"
                    size='large'
                    disabled={pristine || submitting} 
                    onClick={reset}
                    style={{margin:'0 5px'}}
                  >
                    Cancel
                  </Button>
                </div>
            </Form>
          </Box>
        </Box>
      </MuiThemeProvider>
    </div>
  );
}

const mapStateToProps = state => {
  city = formSelector(state, 'city')
  
  return{AccommodationState: state.createAccommodation,}
  
}
const decoratedComponent = connect(mapStateToProps,{createAccommodation})(CreateAccommodation);
export default reduxForm({ form: "CreateAccommodation" }) (decoratedComponent)
