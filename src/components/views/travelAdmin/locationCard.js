import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box, IconButton, Snackbar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import { connect } from 'react-redux'
import { Delete, Edit } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import { closeDeleteSnackbar, deleteLocation } from '../../../redux/actions/deleteLocationAction';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import EditLocation from '../../locations/editLocation';
import Popover from '@material-ui/core/Popover';
import MuiAlert from '@material-ui/lab/Alert';
import { getLocations } from '../../../redux/actions/fetchLocationsAction';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  media: {
    height: 140
  },
  editButtons:{
      display:'flex',
      justifyContent:'space-between',
      width:'100px'
  },
  paper: {
    position: 'absolute',
    width: '50%',
    margin:'0 auto',
    backgroundColor: '#EAF4FB',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    
  },
  a:{
    textDecoration:'none'
  }
}));

function getModalStyle() {
  const top = 10;
  return {
    top: `${top}%`,
    margin: 'auto'
  };
}

function Locations(props) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const token = localStorage.getItem('barefootUserToken'); 
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
    props.dispatch(getLocations())
  };
  const handleDelete = ()=>{
    console.log('clicked delete')
    props.dispatch(deleteLocation(props.location.id, token));
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}  itemID='alert' />;
  }
  
  const body = (
      <Card style={modalStyle} className={classes.paper}>
      <CardActionArea>
        
        { props.pending ? (
          <Skeleton variant='rect' animation="wave" className={classes.media} />
        )
         :(<CardMedia
           className={classes.media}
           image={props.location.link}
           title={props.location.LocationName}/>)}
         <CardContent>
           <Typography gutterBottom variant="h5" component="h2">
            {props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.location.LocationName)}
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
             { props.pending ? (
             <React.Fragment>
               <Skeleton animation="wave"/>
               <Skeleton animation="wave" width='80%' />
             </React.Fragment>) : 
             (props.location.description)}
           </Typography>
         </CardContent>
        </CardActionArea>
        <CardActions style={{justifyContent:'space-between'}}>
          <Button size="small" color="primary" onClick={handleOpen}>
            { props.pending ? 
            <Skeleton animation='wave' width='100%'/> 
            :
            <Typography href={props.location.link} component='a' className={classes.a}>Read more about this on wikipedia</Typography>
            }
          </Button>
        </CardActions>
      </Card>
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
          
        { props.pending ? (
          <Skeleton variant='rect' animation="wave" className={classes.media} />
        )
          :(<CardMedia
            className={classes.media}
            image={props.location.link}
            title={props.location.LocationName}/>)}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.location.LocationName)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.pending ? (
              <React.Fragment>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave" width='80%' />
              </React.Fragment>) : 
              (props.location.description)}
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
          <EditLocation initialValues={props.location}/>
        </Modal>
      </Card>
    </>
  );
}

const mapStateToProps = state => ({
  pending: state.fetchLocations.pending,
  delete: state.deleteLocation
})

export default connect(mapStateToProps, null)(Locations);