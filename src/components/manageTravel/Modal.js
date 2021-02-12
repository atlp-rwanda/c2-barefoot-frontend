import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Grid, Paper, Card, CardActions, CardActionArea, Avatar, CardMedia, Typography, Button, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getSingleTravelRequest } from "../../redux/actions/singleTravelAction";

const useStyle = makeStyles(theme => ({
    grid:{
        width:'100%',
        justifyContent:'center'
    },
    originCityImage:{
        width:'100%',
        height:'300px'
    },
     gridDestination:{
        width:'300px',
        justifyContent:'center'
    },
   destinationCityImage:{
        width:'100%',
        height:'200px'
    },
    closeIcon:{
        position:'absolute',
        justifyContent:'space-between',
        color:'red',
        top: '2rem',
        right:'10px',
        '&:hover':{
            cursor: 'pointer'
        }
    },
    travelAddress:{
        display:'flex',
        justifyContent:'space-between',
        marginTop:'15px',
        marginBottom:'15px',
        '&:hover':{
            borderBottom:'2px solid lightgrey',
            padding:'10px',
            boxShadow:true
        }
    },
    addressPaper:{
        border:'none',
        boxShadow:'0px 0px 0px 0px',
        marginTop:'20px',
        padding:"5px"
    },
    travelDetails:{
        justifyContent:'center',
        alignItems:'center',
        boxShadow:'none'
    },
    gridDestination:{
        flexGrow:1
    },
    buttons:{
    float:'inline-end',
    marginRight:'20px',
    justifyContent:'space-evenly',
    display:'inline-block',
    backgroundColor: 'yellow'
  },
  approveButton:{
      backgroundColor:'green'
  },
  rejectButton:{
    //   marginRight:'20px'
  },
  travelData:{
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      display:"flex"
  },
  profile:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'10px'
  },
  status:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'10px'
  }, 
  trips: {
      textAlign:'center',
      justifyContent:'center',
      alignItems: 'center'
  }
}))

function Modal(props) {
    const classes = useStyle()
    const {title, children, openModal, onClose, setOpenModal, singleTravel} = props;

    useEffect(() => {
        getSingleTravelRequest()
        
    }, [])
    const travelrequest = singleTravel.travel[0]
    const requester = singleTravel.travel[0].requesterInfo

    console.log(travelrequest);

    const cardImage = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg";
    const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
    return (
       <Dialog open={openModal} TransitionComponent={Transition} onClose={onClose} maxWidth='md'>
            <DialogTitle style={{textAlign:'center'}}>
                Travel request details
                <CloseIcon className={classes.closeIcon}/>
            </DialogTitle>
            <DialogContent>
                <Card>
                <CardActionArea>
                <Grid className={classes.grid}>
                        
                        <Paper className={classes.originCityImage}>
                            <img src={cardImage} alt='card image' className={classes.originCityImage}/>
                        </Paper>
                       
                    </Grid>
                    <Grid className={classes.travelData}>
                        <Paper className={classes.travelDetails}>
                            <Typography variant='h6' component='h6' >Travel information</Typography>
                            <div className={classes.profile}> 
                                <Avatar alt="Remy Sharp" src={requester.profile_picture} /> 
                                <Typography style={{marginLeft:'20px'}}>{requester.first_name} {requester.last_name}</Typography>
                            </div>
                            <div className={classes.status}>
                                <Typography variant='h6' component='h6'>status:</Typography>
                                <Typography style={{marginLeft:'20px'}}>{travelrequest.status}</Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Divider />
                    <Typography varient='h6' component="he" className={classes.trips} style={{textAlign:'center', marginTop:'20px'}}>{travelrequest.Trip.length} Trips</Typography>
                    {travelrequest.Trip.map( data => (
                    <Grid className={classes.travelAddress} key={data.tripId}>
                    <Paper className={classes.addressPaper}>
                        <Typography variant='h6' component='h6'>Lacation destination</Typography>
                        <Typography>{data.originCity} To {data.destination} </Typography>
                        {/* <Typography>Kampala, Uganda To Kenya, Nairobi </Typography>
                        <Typography>Kenya, Nairobi To Egypt, Cairo </Typography>
                        <Typography>{travelrequest.status} </Typography> */}
                    </Paper>
                     <Paper className={classes.addressPaper}>
                        <Typography variant='h6' component='h6'> Travel Date</Typography>
                        <Typography>08/10/2020</Typography>
                    </Paper>
                     <Paper className={classes.addressPaper}>
                        <Typography variant='h6' component='h6'>Reason</Typography>
                        <Typography>{data.reason}</Typography>
                    </Paper>
                     <Paper className={classes.addressPaper}>
                        <Typography variant='h6' component='h6'>Date of Returning</Typography>
                        <Typography>01/05/2021</Typography>
                    </Paper>
                    </Grid>

                    ))}
                    
                    {/* <Grid className={classes.gridDestination}>
                        <Grid>
                            <div className={classes.buttons}>
                                <Button variant="contained" color="primary" className={classes.approveButton}>Approve</Button>
                                <Button variant="contained" color="secondary" className={classes.rejectButton}>Reject</Button>
                            </div>
                        </Grid>
                    
                     <Grid></Grid>
                    </Grid> */}

                </CardActionArea>
                </Card>
            </DialogContent>
       </Dialog>
    )
}

const mapStateToProps = state => ({
    singleTravel:state.manageSingleTravel
})
// export default Modal
export default connect(mapStateToProps, {getSingleTravelRequest})(Modal)
