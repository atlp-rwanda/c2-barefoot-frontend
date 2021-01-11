import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, FormControl,TextField,  CardActionArea, CardActions, CardContent} from '@material-ui/core';
import {CardMedia, Button, Typography, IconButton, Avatar, Modal} from '@material-ui/core';
import { Delete, Email, Place, Language, Work, SupervisedUserCircle, AccountCircle } from '@material-ui/icons'
import { connect } from 'react-redux'
import { getUsers, deleteUser } from '../redux/actions/UsersAction';
import { Skeleton } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 265,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#EAF4FB',
  },
  media: {
    height: 140
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    color: '#43A0D6'
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#EAF4FB",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  modalItems: {
    display: "flex",
    justifyContent: 'center'
    
    
  }
  
}));


function UserCard(props) {
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const openProfile = () => {
    setOpen(true)
  }

  const closeProfile = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    props.deleteUser(props.idx, props.UserData.email)
  }

  const ProfileModal = (
      <Modal className={classes.modal} open={open} onClose={closeProfile}>
        <div className={classes.paper}>
          <Avatar
            alt="profile picture"
            src={props.UserData && (props.UserData.profile_picture)}
            className={classes.modalAvatar}
          />
          <div className={classes.modalItems}>
            <AccountCircle />
            <Typography> {props.UserData && (props.UserData.first_name)} {props.UserData && (props.UserData.last_name)}</Typography>
          </div>
          <div className={classes.modalItems}>
            <Email/>
            <Typography> {props.UserData && (props.UserData.email)} </Typography>
          </div>
          <div className={classes.modalItems}>
            <Place />
            <Typography>{props.UserData && (props.UserData.address)}</Typography>
          </div>
          <div className={classes.modalItems}>
            <Language />
            <Typography>{props.UserData && (props.UserData.language)}</Typography>
          </div>
          <div className={classes.modalItems}>
            <Work />
            <Typography>Software Engineer</Typography>
          </div>
          <div className={classes.modalItems}>
            <SupervisedUserCircle />
            <Typography> Line manager</Typography>
          </div>
        </div>
      </Modal>
  )

  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        {props.pending ? 
        (<Skeleton variant='rect' className={classes.media} />)
        :
        (<CardMedia
          className={classes.media}
          image='https://i.ibb.co/MGMCsqm/profile-Picture.png'
        />)}
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="subtitle1">
            {props.pending ? (<Skeleton width='100%'/>)
            :
            (props.UserData.first_name)+ " "+ (props.UserData.last_name)}
          </Typography>
          <FormControl>
            <TextField
            select
            id='role'
            label='assign role'
            />
          </FormControl>
          <FormControl>
            <TextField
            select
            label = 'assign line manager'
            />
          </FormControl>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <IconButton onClick={handleDelete}>
          <Delete color='secondary'/>
        </IconButton>
        <Button size="small" color="primary" onClick={openProfile}> Profile </Button>
      </CardActions>
      {ProfileModal}
    </Card>
  );
}

const mapStateToProps = state => ({
  pending : state.users.pending
})

export default connect(mapStateToProps, {getUsers, deleteUser})(UserCard)
