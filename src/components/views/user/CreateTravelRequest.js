import React from 'react';
import SearchLocations from '../../travelRequests/SearchTravelRequest';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import colors from '../../colors'
import { connect } from 'react-redux';
import { CheckReturningAction, checkTravelDatesAction, searchCurrentLocationAction } from '../../../redux/actions/CreateTravelRequestAction';


const useStyles = makeStyles((theme) =>({
    main:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1,0)
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
    return ( 
        <Grid container direction="column" className = {classes.main}>
            <Grid item xs={12} className={classes.title}>
                <Typography variant="h6" style={{color: colors.primary100}}> 
                    Create Travel Request
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.content}>
                <SearchLocations {...props} />
            </Grid>
        </Grid>
     );
}
 

const mapStateToProps = state =>({
    travelRequest: state.createTravelRequest
});
export default connect(mapStateToProps, {CheckReturningAction, checkTravelDatesAction, searchCurrentLocationAction})(CreateTravelRequest);

