import React from 'react';
import colors from '../colors';
import { Button,  Grid, makeStyles, Typography, Checkbox, TextField, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    main:{
        backgroundColor: colors.neutralWhite,
        width:'90%',
        margin:'auto',
        justifyContent: 'space-evenly',
        padding: theme.spacing(3),
        flexDirection:'column'
    },
    travelData:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    data:{
        flexDirection:'column',
    },
    titleButtons:{
        justifyContent: 'flex-end',
        flexDirection:'row',
        margin: theme.spacing(1,0),
    },
    headers:{
        fontSize:'18px',
    },
    requestGrid:{
        background: colors.grey6,
        margin: theme.spacing(0,0,3,0),
        border:'2px solid #257AAA',
        padding:theme.spacing(2),
    },
    editButton:{
        margin:theme.spacing(0,2)
    },
    reasonOfTravel:{
        overflow:'hidden',
        flexDirection:'column'
    }
}))

const DisplayTravelRequest = (props) => {
    const classes = useStyles();
    const travelRequests = !props.listTravelRequest.fetchLoading ? props.listTravelRequest.travelRequests : [{Trip:[{}]},{Trip:[{}]}];

    return ( 
        <Grid container  className={classes.main} >
            {travelRequests.map((request) =>{
                
                let color = colors.neutralBlack;
                if(request.status === 'pending'){
                    color = colors.orange100;
                }
                else if(request.status === 'approved'){
                    color = colors.green3;
                }else{
                    color = colors.red;
                }
                const returning= request.Trip[0].returnDate ? 'Yes' : 'No';
            
            return (
            <Grid container item className={classes.requestGrid} key={request.travelId}>      
                {(props.listTravelRequest.fetchLoading? 
                    <>
                        <Skeleton animation="wave" variant="rect" style={{width:'40%'}}/>
                        <Grid container item className={classes.travelData}>
                            <Grid container item  xs={12} sm={12} md={12}  className={classes.data}>
                                <Skeleton animation="wave" variant="rect" style={{width:'80%', height:'30px', margin:'2px'}}/>
                                <Skeleton animation="wave" variant="rect" style={{width:'80%', height:'10px', margin:'2px'}}/>
                                <Skeleton animation="wave" variant="rect" style={{width:'80%', height:'10px', margin:'2px'}}/>
                                <Skeleton animation="wave" variant="rect" style={{width:'80%', height:'10px', margin:'2px'}}/>
                                <Skeleton animation="wave" variant="rect" style={{width:'80%', height:'10px', margin:'2px'}}/>
                                <Skeleton animation="wave" variant="rect" style={{width:'80%', height:'10px', margin:'2px'}}/>
                            </Grid>
                            <Grid container item className={classes.titleButtons} >
                                <Skeleton animation="wave" variant="rect" style={{width:'40%', height:'30px', marginRight:'20px'}}/>
                            </Grid>
                        </Grid>
                    </>
                :
                <>
                <Typography>
                    Status: <Button style={{color: color}}>{request.status}</Button>
                </Typography>
                <Grid container item className={classes.travelData}>
                    <Grid container item  xs={10} sm={4} md={3} className={classes.data}>
                        <Typography variant="h6" component="h6" className={classes.headers} color="primary">Location - Destination</Typography>
                        {request.Trip.map((trip) =>(
                            <Typography variant="subtitle2" key={trip.tripId}>{trip.originCity} to {trip.destination}</Typography>
                        ))}
                        
                    </Grid>
                    <Grid container item  xs={10} sm={4} md={2} className={classes.data}>
                        <Typography variant="h6" color="primary">Date of travel</Typography>
                        {request.Trip.map((trip) =>{
                            const date= trip.tripDate.split('T',1);
                            return (<Typography variant="subtitle2" key={trip.tripId}>{date[0]}</Typography>)
                        })}
                    </Grid>
                    <Grid container item  xs={10} sm={4} md={2} className={classes.data}>
                        <Typography variant="h6" color="primary">Returning</Typography>
                        <Typography variant="subtitle2">{returning}</Typography>
                    </Grid>
                    <Grid container item  xs={10} sm={4} md={2} className={classes.data}>
                        <Typography variant="h6" color="primary">Return date</Typography>
                        {request.Trip.map((trip) =>{
                            const date= trip.returnDate ? trip.returnDate.split('T',1) : ['-'];
                            return (<Typography variant="subtitle2" key={trip.tripId}>{date[0]}</Typography>)
                        })}
                    </Grid>
                    <Grid container item  xs={10} sm={4} md={2} className={classes.reasonOfTravel}>
                        <Typography variant="h6" color="primary">Reason of travel</Typography>
                        <Typography gutterBottom variant="subtitle2" noWrap>{request.Trip[0].reason}</Typography>
                    </Grid>
                </Grid>
                <Grid container item className={classes.titleButtons} >
                    <Button variant="contained" className={classes.editButton} key={request.travelId}>Edit</Button>
                    <Button variant="contained" color="secondary" key={request.travelId}>Cancel Travel request</Button>
                </Grid>
                </>
                )}
            </Grid>
            )})}
        </Grid>
     );
}
 
export default DisplayTravelRequest;