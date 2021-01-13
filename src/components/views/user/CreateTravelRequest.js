import React, {useEffect} from 'react';
import SearchLocations from '../../travelRequests/SearchTravelRequest';
import { Grid, makeStyles, Typography, Container, GridListTileBar, Button } from '@material-ui/core';
import colors from '../../colors'
import { connect } from 'react-redux';
import { CheckReturningAction, checkTravelDatesAction, searchCurrentLocationAction, selectAccommodationAction, getLocationsAction, searchAccommodationAction, closeSnackbar, handleErrorsAction, addTravelReasonAction, sendTravelRequestAction, addMultiCityAction, removeMultiCityAction } from '../../../redux/actions/CreateTravelRequestAction';
import AddAccommodation from '../../travelRequests/addAccommodation';
import AddTravelReason from '../../travelRequests/addTravelReason';
import SnackBarMessage from '../../SnackBarMessage';
import Loader from '../../Loader';

const useStyles = makeStyles((theme) =>({
    main:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1,0),
        [theme.breakpoints.up('sm')]:{
            margin: theme.spacing(7,0,0,0)
        }
    },
    title:{
        padding: theme.spacing(1),
        
    },
    content:{
        width: '100%',
        height: 'auto'
    }
}))

const CreateTravelRequest = (props) => {
    const classes = useStyles();
    useEffect(()=>{
        console.log('the engine starts');
        props.getLocationsAction();
    },[])
    // console.log('locations');
    // console.log(props.travelRequest.searchLocations);
    const display = props.travelRequest.displaySelection ? 'block' : 'none';
    // const display2 = 'block';
    const display2 = props.travelRequest.displaySelected ? 'block' : 'none';

    // console.log('props for loading', props.travelRequest);
    return ( 
        <Grid container direction="column" className = {classes.main}>
            <Loader open={props.travelRequest.sendLoading} />
            <SnackBarMessage {...props} />
            <Grid item xs={12} className={classes.title}>
                <Typography variant="h6" style={{color: colors.primary100}}> 
                    Create Travel Request
                </Typography>
            </Grid>
            
            <Grid item xs={12} className={classes.content}>
                <SearchLocations {...props} />
            </Grid>
            <Grid item container xs={12}>
                <Grid container style={{display:display}}>
                   <AddAccommodation {...props} /> 
                </Grid>
                <Grid container style={{display:display2}}>
                   <AddTravelReason {...props} /> 
                </Grid>
            </Grid>
        </Grid>
     );
}
 

const mapStateToProps = state =>({
    travelRequest: state.createTravelRequest
});
export default connect(mapStateToProps, {CheckReturningAction, checkTravelDatesAction, searchCurrentLocationAction, selectAccommodationAction, getLocationsAction, searchAccommodationAction, closeSnackbar, handleErrorsAction, addTravelReasonAction, sendTravelRequestAction, addMultiCityAction, removeMultiCityAction})(CreateTravelRequest);

