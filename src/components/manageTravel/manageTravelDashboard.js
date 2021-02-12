import React, {useState, useEffect}from 'react'
import { Typography, makeStyles, useTheme, Drawer, Grid, TextField, Card, GridList, GridListTile, CardActionArea, CardMedia, CardContent, IconButton, CardActions, Avatar, Button, Paper, Modal } from "@material-ui/core";
import { connect } from 'react-redux'
 import dateFormat from 'dateformat';
import Model from "./Modal";
import { Skeleton } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import { getTravelRequest } from "../../redux/actions/fetchTravelRequestAction";
import { updateSingleTravelRequest } from "../../redux/actions/updateTravelRequestAction";
import { getSingleTravelRequest } from "../../redux/actions/singleTravelAction";

const useStyles = makeStyles((theme) => ({
    container:{
        // height:'100vh',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'0%',
    marginTop:'20px',
    flexDirection:'column',
    paddingBottom:'80px'
    },
    
  root: {
    padding:'0%',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    // width:'80%',
    marginTop:'20px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  image:{
      width:'300px',
      height:'300px'
  },
  name:{
      left:'10px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: 'space-between'
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  description:{
      width:'500px'
  },
  requesterProfi: {
      display: 'flex',
      width:'350px',
      flexDirection:'row',
      padding:'10px',
      marginTop:'0px',
      justifyContent:'space-between'
  },
  imageContainer:{
      width:'300px',
      height:'300px',
      marginLeft:'0%'
  },
  approveButton:{
      backgroundColor:'#219653',
      borderRadius:'0px'
  },
  rejectButton: {
      borderRadius:'0px',
      marginLeft:'20px'
  },
  paganete:{
    marginTop:'30px',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  buttons:{
    float:'inline-end',
    marginRight:'20px',
    justifyContent:'space-evenly',
    display:'inline-block',

  }
}));
function manageTravelDashboard(props) {
    const classes = useStyles()
     const theme = useTheme();
     const loading = props.travelRequest.loading;
     const travel = props.travelRequest.travel
     const [openModal, setOpenModal] = useState(false)

     useEffect(() => {
         props.getTravelRequest()
     }, [])
    
    //updatting travel request
    const handleUpdateTravel = (id) => {
        props.updateSingleTravelRequest(id)
    }
    //formating dsate
    const dateFormat = (date) =>{
        return dataFormat(date, "mmmm dS, yyyy")
    }
     // openning modal
     const handleModalOpen = () => {
         setOpenModal(true)
     }
     //getting single travel
     const handleSingleTravel = (id) =>{
         console.log('single travel')
         console.log(id)
         handleModalOpen()
         props.getSingleTravelRequest(id)
     }

     console.log(props.travelRequest)
     const cardImage = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg";

     // closing modal
     const handleModalClose = () => {
         setOpenModal(false)
     }
    return (
        <div className={classes.container} style={{boxShadow:'none'}}>
           {
           loading? <>
           <Card className={classes.root} style={{boxShadow:'none'}}>
            <Paper className={classes.imageContainer}>
                <Skeleton variant='rect' animation="wave" height='300px' width='320px' />
            </Paper>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <div className={classes.requesterProfi}>
                        <Skeleton variant='circle' width={40} height={40}/>
                        <Skeleton variant='text' width='190px' height='20'  className={classes.name}/>
                        <Skeleton variant='text' height='20' width='100px' style={{float:'right'}}/>
                        </div>
                        <Skeleton variant='text' width='300px' height='40px' style={{marginLeft:'30px'}}/>
                        <Skeleton variant='text' width='100px' height='40px' style={{marginLeft:'30px'}}/>
                        <div className={classes.controls}>
                            <Skeleton variant='text' width='100px' height='40px' style={{marginLeft:'23px'}} />
                        <div className={classes.buttons}>
                            <Skeleton variant='text' width='150px' height='40px' />      
                            </div>
                        </div>
                    </CardContent>
                </div>
                
           </Card>
           </>
            : 
           <>
           {travel.map((trav)=> (

            <Card className={classes.root} key={trav.travelId}>
                        <Grid>
                        <Paper className={classes.imageContainer}>
                            <img src={cardImage} alt='card image' className={classes.image} /> 
                        </Paper>
                                   
                    </Grid>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <div className={classes.requesterProfi}>
                          <Avatar alt="Remy Sharp" src={trav.profile_picture} /> 
                        <Typography component="h5" variant="h5" className={classes.name}>
                          {trav.requesterInfo.first_name} {trav.requesterInfo.last_name}
                        </Typography>
                        
                        
                        <Typography style={{float:'right', color:'#54AD7D', right:'0px'}}>{trav.createdAt}</Typography>
                    </div>
                    <Typography component="h6" variant="h6" style={{textAlign:'start'}}>
                           Trips on this Travel request
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" className={classes.description}>
                        {trav.Trip.length} Trip(s)
                        </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                        <>
                        <Button color="primary" onClick={() => handleSingleTravel(trav.travelId)}>view more</Button>    
                        </>
                        <div className={classes.buttons}>
                            <Button variant="contained" onClick={() => handleUpdateTravel(trav.travelId)}color="primary" className={classes.approveButton}>Approve</Button>
                            <Button variant="contained" color="secondary" className={classes.rejectButton}>Reject</Button>
                        </div>
                        </div>
                    </div>
                    <Model openModal={openModal} setOpenModal={setOpenModal} onClose={handleModalClose}>
                    <div>this is details of travel request</div>
                    </Model>
            </Card>
           ))}

            
        <div className={classes.paganete}>
            <Pagination count={10} color="primary" />
        </div>
        </>
           } 
    </div>
    )
}
const mapStateToProps = state => ({
    travelRequest: state.manageTravel,
    singleTravel: state.manageSingleTravel,
    updateSingleTravel: state.updateTravel
})
export default connect(mapStateToProps, {getTravelRequest, getSingleTravelRequest, updateSingleTravelRequest})(manageTravelDashboard)
