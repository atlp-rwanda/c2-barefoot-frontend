import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, FormControl,CardActionArea, CardActions, CardContent, Grid, Select, FormHelperText} from '@material-ui/core';
import {CardMedia, Button, Typography, IconButton, Avatar, Modal, MenuItem, InputLabel} from '@material-ui/core';
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
      
  },
  formConternt: {
    display: 'flex',
    flexDirection: 'column',
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

  

  const handleSubmit = () => {

  }

  const [role, setRole] = useState(props.UserData && props.UserData.user_role.name)

  const handleChange = (e) => {
    setRole(e.target.value)
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
    <Card className={classes.root} key={props.UserData && props.UserData.id}>
      <CardActionArea>
        {props.pending ? 
        (<Skeleton variant='rect' className={classes.media} />)
        :
        (<CardMedia
          className={classes.media}
          image={props.UserData.profile_picture}
        />)}
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="subtitle1">
            {props.pending ? (<Skeleton width='100%'/>)
            :
            (props.UserData.first_name)+ " "+ (props.UserData.last_name)}
          </Typography>
          <form className={classes.formConternt}>
          <FormControl>

            <Select
            id='role'
            onChange={handleChange}
            value={props.UserData && props.UserData.user_role.name}
            >
              {props.rolesList.pending ? (<Skeleton width='100%'/>) : props.rolesList.roles.rows.map((roles) => (
              <MenuItem value={roles.name} key={roles.id}>{roles.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>User Role</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel id='manager_id'>{ props.UserData && (props.UserData.line_manager ? props.UserData.line_manager.first_name + " " + props.UserData.line_manager.last_name: 'None')}</InputLabel>
            <Select
            labelId='manager_id'
            >
            {props.managers.pending ? (<Skeleton width='100%'/>) : props.managers.managers.rows.map((manager) => (
              <MenuItem value={manager.username} key={manager.id}>{manager.first_name} {manager.last_name}</MenuItem>
            ))}
            </Select>
            <FormHelperText>Line Manager</FormHelperText>
          </FormControl>
          </form>
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
  pending : state.users.pending,
  rolesList: state.roles,
  managers: state.managerReducer
})

export default connect(mapStateToProps, {getUsers, deleteUser})(UserCard)
