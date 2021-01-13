import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box, IconButton, Snackbar, Grid, FormControlLabel} from '@material-ui/core';
import { CheckBox, Delete, Edit, Place } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import { closeDeleteSnackbar, deleteAccommodation } from '../../../redux/actions/deleteLocationAction';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import MuiAlert from '@material-ui/lab/Alert';
import CreateAccommodation from '../../accommodations'
// import Field from 'redux-form/lib/Field';
import Checkbox from 'material-ui/Checkbox'
import { getAccommodations } from '../../../redux/actions/fetchAccommodations';
import { UpdateAccommodation } from '../../accommodations/editAccommodation';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 140
  },
  mediaModel: {
    height: 300
  },
  editButtons:{
    display:'flex',
    justifyContent:'space-between',
    width:'100px'
  },
  paper: {
    position: 'absolute',
    width: '80%',
    margin:'0 auto',
    backgroundColor: '#EAF4FB',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    
  },
  editModel:{
    backgroundColor:'#fff'
  }
}));
const amenities = [
  // 'AccommodationId',
  'wifi',
  'airConditioner',
  'shampoo',
  'ironing',
  'tv',
  'smokeDetector',
  'fireExtinguisher',
  'lockOnDoor'
];
function getModalStyle() {
  const top = 10;
  return {
    top: `${top}%`,
    margin: 'auto',
  };
}
const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
  );

function Accommodations(props) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const token = localStorage.getItem('barefootUserToken'); 
  const handleDelete = ()=>{
    // console.log(props.accommodation.id)
    props.dispatch(deleteAccommodation(props.accommodation.id, token));
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false)
    props.dispatch(closeDeleteSnackbar())
    // props.dispatch(getAccommodations())
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
  }
  // console.log("PROPS: " + props.updateAccommodation)
  {console.log(props.accommodation)}
  const body = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Card style={modalStyle} className={classes.paper}>
        <CardActionArea>
          
          { props.pending ? (
            <Skeleton variant='rect' animation="wave" className={classes.media} />
          )
          :(<CardMedia
            className={classes.mediaModel}
            image={props.accommodation.photos}
            title={props.accommodation.title}/>)}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.title)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.pending ? (
              <React.Fragment>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave" width='80%' />
              </React.Fragment>) : 
              (props.accommodation.description)}
            </Typography>
          </CardContent>
          </CardActionArea>
          <CardActions style={{justifyContent:'space-between'}}>
            {/* <Button size="small" color="primary" onClick={handleOpen}>
              { props.pending ? 
              <Skeleton animation='wave' width='100%'/> 
              :
              <Typography href={props.accommodation.link} component='a' className={classes.a}>Read more about this on wikipedia</Typography>
              }
            </Button> */}
            <Grid container style={{justifyContent:'space-between'}}>
              <Grid item>
                <h4>Location</h4>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.country)}</p>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.city)}</p>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.state)}</p>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.streetAddress)}</p>
              </Grid>
              <Grid item>
                <h4>Capacity</h4>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.propertyType)}</p>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.numberOfRooms)}</p>
                <p>{props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.accommodation.typeOfBed)}</p>
              </Grid>
              <Grid item>
                <h4>Amenities</h4>
                <div style={{display:'grid', gridTemplateColumns:'1fr' }}>
                  {amenities.map(option => (
                    <Box style={{display:"flex"}}>
                      <input type='checkbox' disabled name={option} style={{margin:0, padding:0}} /> {option}
                    </Box>
                  ))}
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </MuiThemeProvider>
  );

  const DeleteButton = (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton color="primary" aria-label="upload picture" component="span" {...bindTrigger(popupState)} >
            <Delete />
          </IconButton>
          <Popover {...bindPopover(popupState)} anchorOrigin={{vertical: 'bottom',horizontal: 'center',}} transformOrigin={{vertical: 'top',horizontal: 'center',}}>
            <Box p={2}>
              <Button type="button" color="secondary" variant="contained" onClick={handleDelete} style={{margin:'0 5px'}}>Delete</Button>
              <Button type="button" color="primary" style={{margin:'0 5px'}} onClick={popupState.close}>Cancel</Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );

  return (
    <>
    {/* {console.log(props.delete)} */}
      <Snackbar open={props.delete.errorOpen} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error" >
          Error: {props.delete.error ? JSON.stringify(props.delete.error).replace(/[\\'"]+/g, '') : 'Error Not set'}
        </Alert>
      </Snackbar>
      {console.log(props.delete.successMessage)}
      <Snackbar open={props.delete.successOpen} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="success" >
          Success: {props.delete.successMessage ? JSON.stringify(props.delete.successMessage.message) : 'Message Not set'}
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardActionArea>
          { props.pending ? 
          (<Skeleton variant='rect' animation="wave" className={classes.media} />)
          :
          (<CardMedia
            className={classes.media}
            image={props.accommodation.photos}
            title={props.accommodation.title}
          />)}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            { props.pending ? (<Skeleton animation="wave" width="50%"/>)
            : (props.accommodation.title)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.pending ? 
              (<React.Fragment>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" width='80%' />
              </React.Fragment>)
              : (props.accommodation.description)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{justifyContent:'space-between'}}>
        <Button size="small" color="primary" onClick={handleOpen}>
            { props.pending ? <Skeleton animation='wave' width='100%'/> :"Learn More"}
        </Button>
        <Box className={classes.editButtons}>
              {DeleteButton}
              <IconButton color="primary" aria-label="edit" component="span" onClick={handleEditOpen}>
                  <Edit />
              </IconButton>
          </Box>
        </CardActions>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          {body}
        </Modal>

        <Modal
          open={openEdit}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <Box className={classes.editModel}>
            <CreateAccommodation initialValues={props.accommodation}/>
          </Box>
        </Modal>
      </Card>
    </>
  );
}

const mapStateToProps = state => ({
  pending: state.fetchAccommodations.pending,
  delete: state.deleteLocation,
  AccommodationState: state.updateAccommodation,
})

export default connect(mapStateToProps, null)(Accommodations);