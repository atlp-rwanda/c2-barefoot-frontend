import { Box, Button, Card, Snackbar } from "@material-ui/core";
import TextField from 'material-ui/TextField';
import React, { Component } from "react";
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "./dropzoneField";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiAlert from '@material-ui/lab/Alert';
import './styles.css'
import axios from "axios";
import { createLocation, updateLocation } from "../../redux/actions/createLocationAction";
import { closeSnackbar } from "../../redux/actions/signupRequestAction";

const imageIsRequired = value => (!value ? "Required" : undefined);

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

class CreateLocation extends Component {
  state = { imageFile: [] };
  token = localStorage.getItem('barefootUserToken');
  handleFormSubmit = formProps => {
    
    const formData = new FormData();
    const profile_picture = formProps.location_image[0]
    formData.append('upload_preset', process.env.UPLOAD_PRESET)
    formData.append('file', profile_picture)
    axios.post(process.env.IMAGE_UPLOAD_LINK, formData)
      .then(res => {
        const {location_image,...data} = {...formProps}
        data.LocationImage = res.data.secure_url
        alert(JSON.stringify(data, null, 4));
        const { dispatch } = this.props;                
        dispatch(updateLocation(data, this.token));
      })
      .catch(err => { console.log(err) })
    
    // append any additional Redux form fields
    // create an AJAX request here with the created formData
  };
  handleClose = () => {
    this.props.dispatch(closeSnackbar());
  };
  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

  resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

  Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
  }
  render = (LocationSates) => (
    <>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Snackbar open={this.props.LocationSates.errorOpen} autoHideDuration={6000} onClose={this.handleClose} >
        <this.Alert onClose={this.handleClose} severity="error" >
          Error: {this.props.LocationSates.error ? JSON.stringify(this.props.LocationSates.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
        </this.Alert>
      </Snackbar>
      <Snackbar open={this.props.LocationSates.successOpen} autoHideDuration={6000} onClose={this.handleClose} >
        <this.Alert onClose={this.handleClose} severity="success" >
          Success: {this.props.LocationSates.successMessage ? 'Location update successfully' : 'Message Not set'}
        </this.Alert>
      </Snackbar>
      {console.log(this.props.initialValues)}
      <div className="app-container">
        <div className="title-box">
          <h1 className="title hr">Create Location</h1>
        </div>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Card className="card">
            <Field
              name="location_image"
              component={DropZoneField}
              type="file"
              imagefile={this.state.imageFile}
              editPreview= {this.props.initialValues.link}
              handleOnDrop={this.handleOnDrop}
              validate={[imageIsRequired]}
            />
            <div className="fields-input">
              <div>
                <Field
                  name="LocationName"
                  label="Location Name"
                  component={renderTextField}
                />
              </div>
              <div>
                <Field
                  name="country"
                  label="Country"
                  component={renderTextField}
                />
              </div>
              <div>
                <Field
                  name="description"
                  label="Description"
                  component={renderTextField}
                />
              </div>
              <div>
                <Field
                  name="link"
                  label="Link"
                  component={renderTextField}
                />
              </div>
            </div>
          </Card>
          <Box className="buttons">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={this.props.submitting}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              disabled={this.props.pristine || this.props.submitting}
              onClick={this.resetForm}
              style={{ float: "right" }}
            >
              Clear
            </Button>
          </Box>
        </Form>
        <div className="clear" />
      </div>
    </MuiThemeProvider>
    </>
  );
}
const mapStateToProps = state => {
  return{LocationSates: state.createLocation,}
  
}
const decoratedComponent = connect(mapStateToProps,{updateLocation})(CreateLocation);
export default reduxForm({ form: "UpdateLocation", enableReinitialize: true }) (decoratedComponent)
