import React from 'react';
import { Grid, Container, makeStyles, Typography, Divider } from '@material-ui/core';
import AccommodationCard from '../AccommodationCardWithReviews';
import colors from '../colors';
import { Place } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    insideGrid:{
        margin: theme.spacing(2,0,0,2),
    },
    title:{
        padding: theme.spacing(1),
        flexDirection:'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFound:{
        height: '200px',
        borderBottom:'1px solid blue',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        opacity:'0.5',
    }
}))

function AddAccommodation(props) {
    const classes = useStyles();
    const accommodations = !props.travelRequest.searchAccommodationsLoading ? props.travelRequest.searchAccommodations : [{},{},{}];
    const display = accommodations.length ? 'none' : 'flex';
    const getNextPage = (event, value)=>{
        const search = props.travelRequest.destinationLocation.split(', ',2);
        const data = {
            textField: 'destinationLocationId',
            searchKeyword: {country: search[1], LocationName: search[0]},
            page: value
        }
        return props.searchCurrentLocationAction(data);
    }

    return (
        <React.Fragment>
            <Grid container item xs={12} className={classes.title}>
                <Typography variant="h6" style={{color: colors.primary100}}> 
                    Choose Accommodation:
                </Typography>
                <Divider style={{width:'50%'}} variant='middle' />
                <Typography variant="subtitle1" style={{color: colors.primary100}}> 
                    <Place color="secondary"/> {props.travelRequest.destinationLocation}
                </Typography>            

            </Grid>
            <Grid container className={classes.container}>
                
                {accommodations.map((accommodation) =>(
                    <Grid item xs={10} sm={4} md={3} className={classes.insideGrid}>
                        <AccommodationCard pending={props.travelRequest.searchAccommodationsLoading} accommodation={accommodation} {...props}  />
                    </Grid>
                ))}
                
                <Grid container item style={{display: display}} className={classes.notFound}>
                    <Typography variant="h6" color="secondary" component="h6">No Accommodations found in {props.travelRequest.destinationLocation}</Typography>
                </Grid>
                <Grid container item justify="center" style={{marginTop:'50px'}}>
                   <Pagination count={10} variant="outlined" color="primary" onChange={getNextPage} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddAccommodation;