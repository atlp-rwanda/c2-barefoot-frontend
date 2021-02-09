import React  from 'react';
import colors from '../colors';
import { 
    Button, 
    FormControlLabel, 
    Grid, Typography, 
    Checkbox, TextField, 
    Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useStyles from '../styles/searchTraveRequest';
import { Skeleton } from '@material-ui/lab';

const SearchLocations = (props) => {
    const classes = useStyles();
    
    let data = {
        isReturning: props.travelRequest.isReturning,
        departureDate: props.travelRequest.departureDate,
        returnDate: props.travelRequest.returnDate
    };
    const  handleDepartureDateChange=(date) => {
        data.departureDate = date.toISOString();
        return props.checkTravelDatesAction(data);
    }
    const  handleReturnDateChange=(date) => {
        data.returnDate = date.toISOString();
        return props.checkTravelDatesAction(data);
    }
    const handleCheckboxChange =(event) => {
        data.isReturning = event.target.checked
        return props.CheckReturningAction(data);
    }
    const handleCurrentLocationChange = (event,newValue) =>{
        const data = {
            textField: event.target.id,
            searchKeyword: newValue
        }
        return props.searchCurrentLocationAction(data);
    }
    
    const handleSelectDestination = (event, newValue) =>{
        return handleCurrentLocationChange(event,newValue );
    }
    
    const handleAddMultiCity = () =>{
        const locations = {            
            current: `${props.travelRequest.currentLocation.LocationName}, ${props.travelRequest.currentLocation.country}`,
            destination: props.travelRequest.destinationLocation,
            travelDate: props.travelRequest.departureDate,
            returnDate: props.travelRequest.returnDate,
        }
        if(!props.travelRequest.currentLocation){
            return props.handleErrorsAction('Please add the current location');
        }
        if(!props.travelRequest.destinationLocation){
            return props.handleErrorsAction('Please add the destination location');
        }
        if(!props.travelRequest.departureDate){
            return props.handleErrorsAction('Please add the departure date!');
        }
        
        return props.addMultiCityAction(locations);
    }
    const handleClose = (event) =>{
        const closeId = event.target.id.split('-',2);
        const tabIndex = closeId[1];
        const selected = props.travelRequest.selectedLocations;
        const removed = selected.filter(location => location !== selected[tabIndex]);
        return props.removeMultiCityAction(removed);
    }

    const {searchLocations} = props.travelRequest;
    const destinationLocationOptions = searchLocations.filter(n => n !== props.travelRequest.currentLocation);
    let {selectedLocations}= props.travelRequest
    selectedLocations = selectedLocations ? selectedLocations : [{current:'', destination:''}];
    const display = selectedLocations ? 'flex' : 'none';
    const disabled = selectedLocations.length ? true : false;
    const handleTagClick = (event) =>{
        let ev = {target:{
            id: 'destinationLocationId'
        }}
        const index = event.target.id.split('-',2);

        let newValue= props.travelRequest.selectedLocations[Number(index[1])].destination.split(', ',2);
        return handleCurrentLocationChange(ev, {country: newValue[1], LocationName:newValue[0]});
    }
    return ( 
        <>
        {(props.travelRequest.searchLocationsLoading ? 
            <Grid container direction="row" className={classes.main} >
                <Grid  item direction="column">
                     <Skeleton animation="wave" variant="rect" style={{width:'300px', height:'40px', margin: '10px'}}  />
                </Grid>
                <Grid  item direction="column">
                     <Skeleton animation="wave" variant="rect" style={{width:'300px',height:'40px', margin: '10px'}}  />
                </Grid>
                <Grid  item direction="column">
                     <Skeleton animation="wave" variant="rect" style={{width:'300px',height:'40px', margin: '10px'}}  />
                </Grid>
               
            </Grid>
            
            :
            
        <Grid container direction="row" className={classes.main} >
            <Grid  item direction="column">
                <Typography>Enter your location</Typography>
                <div className={classes.searchLocation}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <Autocomplete
                        id="currentLocationId"
                        key={`${props.travelRequest.selectedLocations}`}
                        options={props.travelRequest.searchLocations}
                        className={classes.searchCurrentLocation}
                        classes={{input:classes.inputText}}
                        getOptionLabel={(option) => (`${option.LocationName}, ${option.country}`)}
                        onInputChange={handleCurrentLocationChange}
                        onChange={handleCurrentLocationChange}
                        autoComplete
                        includeInputInList
                        clearText="no value"
                        closeIcon={<closeIcon fontSize='small' />}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                value={props.travelRequest.currentLocation}
                                placeholder="Search your Location ..."
                                id='currentLocationId'
                            />
                            
                        )}
                    />
                </div>
            </Grid>
            <Grid item direction="column">
                <Typography>Enter your Destination</Typography>
                <div className={classes.searchLocation}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <Autocomplete
                        id="destinationLocationId"
                        key={`${props.travelRequest.selectedLocations}`}
                        options={destinationLocationOptions}
                        className={classes.searchCurrentLocation}
                        classes={{input:classes.inputText}}
                        getOptionLabel={(option) => (`${option.LocationName}, ${option.country}`)}
                        onChange={handleSelectDestination}
                        includeInputInList
                        clearText="no value"
                        closeIcon={<closeIcon fontSize='small' />}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                placeholder="Search your Destionation ..."
                                value={props.travelRequest.destinationLocation}
                            />
                            
                        )}
                    />

                </div>
            </Grid>
            <Grid item direction="column">
                <Tooltip title="Click here to search accommodations" placement="bottom-end" arrow>
                    <Button variant="contained" onClick={handleAddMultiCity} className={classes.addButton}>Add</Button>
                </Tooltip>
                
            </Grid>
            <Grid item direction="column" >
                <Typography>Date of travel</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                        key={`${props.travelRequest.selectedLocations}`}
                        disableToolbar
                        variant="dialog"
                        inputVariant="filled"
                        format="MM/dd/yyyy"
                        value={props.travelRequest.departureDate}
                        onChange={handleDepartureDateChange}
                        InputProps={{className: classes.datesPicker}}
                    />
                </MuiPickersUtilsProvider>
                <div className={classes.dates}>
                    <FormControlLabel 
                    control={
                        <Checkbox
                        checked={props.travelRequest.isReturning}
                        disabled={disabled}
                        fontSize="small"
                        style={{color:colors.neutralWhite}}
                        onChange={handleCheckboxChange}
                        /> 
                    }

                    label="Returning Back?"
                    />
                </div>
                

                <div style={{display: props.travelRequest.isReturning ? 'block' : 'none'}}>
                    <Typography>Date of return</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker 
                            key={`${props.travelRequest.selectedLocations}`}
                            disableToolbar
                            variant="dialog"
                            inputVariant="filled"
                            format="MM/dd/yyyy"
                            value={data.returnDate}
                            onChange={handleReturnDateChange}
                            InputProps={{className: classes.datesPicker}}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                
            </Grid>
            <Grid container item style={{display: display}} className={classes.selectedLocations}>
                    {selectedLocations.map((location, index) =>(
                        <Grid xs={6} sm={3} md={2} item id={`tab-${index}`}className={classes.oneSelected}>
                            <div 
                            className={classes.closeSelectedLocations} 
                            id={`close-${index}`} 
                            onClick={handleClose}>
                                &times;
                            </div>
                            <di className={classes.citiesSelected} id={`div-${index}`} onClick={handleTagClick} >
                                <Typography  id={`text1-${index}`}>{location.current}-</Typography>
                                <Typography  id={`text2-${index}`}>{location.destination} </Typography>
                            </di>
                            
                        </Grid>
                    ))}
                    
            </Grid>
            
        </Grid>
        )}
        </>
     );
}
 
export default SearchLocations;