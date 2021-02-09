import React from 'react';
import {Modal, Fade, Typography, CardMedia,Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    modal:{
        display: 'Flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader:{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        padding: theme.spacing(2, 4, 3),
        textAlign: 'left',
        width:'50%',
        height: 'auto',
        [theme.breakpoints.down('sm')]:{
            width:'70%'
        }
    },
    media:{
        height:"300px",
        [theme.breakpoints.down('sm')]:{
            height:"200px"
        }
    },
    otherInfo:{
        borderTop: '1px solid darkCyan',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]:{
            fontSize:"18px"
        }
    }

}));

function AccommodationModal (props) {

    const classes = useStyles();
    const handleCloseModal = () =>{
        return props.openModalAction({open:false,data:props.data});
    }
    return (
        <React.Fragment>
            <Modal
            className={classes.modal}
            open={props.open}
            closeAfterTransition
            onClick={handleCloseModal}
            >
                <Fade in={props.open}>
                    <div className={classes.loader}>
                        <CardMedia
                        className={classes.media} 
                        image={props.data.photos}
                        title={props.data.title}
                        />
                        <Typography variant="h5" component="h5">
                            {props.data.title}
                        </Typography>
                        <Typography
                        variant="subtitle1"
                        >{props.data.description}</Typography>
                        <Grid item className={classes.otherInfo}>
                            <Typography variant="subtitle2">Country: {props.data.country}</Typography>
                            <Typography variant="subtitle2">City: {props.data.city}</Typography>
                            <Typography variant="subtitle2">State: {props.data.state}</Typography>
                            <Typography variant="subtitle2" style={{marginBottom:'15px'}}>Street: {props.data.streetAddress}</Typography>

                            <Typography variant="subtitle2">Type of Property: {props.data.propertyType}</Typography>
                            <Typography variant="subtitle2">Number of Rooms: {props.data.numberOfRooms}</Typography>
                            <Typography variant="subtitle2">Type of Beds: {props.data.typeOfBed}</Typography>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default AccommodationModal;