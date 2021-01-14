import React, {useEffect} from 'react';
import { Grid, makeStyles, Typography, Container, GridListTileBar, Button } from '@material-ui/core';
import colors from '../../colors'
import { connect } from 'react-redux';
import { GetTravelRequestsAction } from '../../../redux/actions/ViewTravelRequestAction';
import DisplayTravelRequest from '../../travelRequests/DisplayTravelRequest';
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

const ViewTravelRequest = (props) => {
    const classes = useStyles();
    useEffect(()=>{
        const userToken = localStorage.getItem('barefootUserToken');
        if(userToken){
            return props.GetTravelRequestsAction(userToken);
        }
        },[])

    return ( 
        <Grid container direction="column" className = {classes.main}>
            <Loader open={false} />
            <Grid item xs={12} className={classes.title}>
                <Typography variant="h6" style={{color: colors.primary100}}> 
                    View Travel Requests
                </Typography>
            </Grid>
            
            <Grid item xs={12} className={classes.content}>
                <DisplayTravelRequest {...props} />
            </Grid>
            
        </Grid>
     );
}
 

const mapStateToProps = state =>({
    listTravelRequest: state.viewTravelRequest
});
export default connect(mapStateToProps, {GetTravelRequestsAction})(ViewTravelRequest);
