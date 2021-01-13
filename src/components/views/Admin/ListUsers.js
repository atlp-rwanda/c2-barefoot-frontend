import React, {useEffect} from 'react'
import { Divider, Grid, Typography, makeStyles, Snackbar, Slide, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { getUsers, clearSnackBar } from '../../../redux/actions/UsersAction'
import UserCard from '../../UserCard'
import Loader from '../../Loader'
import { Pagination, Alert } from '@material-ui/lab'
import { getRoles } from '../../../redux/actions/fetchRolesAction'


const useStyles = makeStyles((theme) => ({
  pagination:{
    '& > *': {
      marginTop: theme.spacing(4),
    }}
}))

const skeletonData = (<Grid item sm={8} xs={10}><UserCard/></Grid>)

function ListUsers(props) {
  const classes = useStyles()

  useEffect(() => {
    props.getUsers()
    props.getRoles()
  }, [])

  const load = props.usersData.load

  const handlePagination = (event, value) => {
    props.getUsers(value)
  }

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const closeSnackBarTimer = () => {
    props.clearSnackBar()
  }

  return(
    <Grid 
    container
    justify='center'
    direction='column'
    alignItems='center'
    spacing={4}
    >
      <Loader open={load}/>

      <Snackbar
      open={props.usersData.snackBarMessage.open}
      onClose={closeSnackBarTimer}
      autoHideDuration={4000}
      TransitionComponent={TransitionUp}>
        <Alert
        severity={props.usersData.snackBarMessage.severity}
        variant='filled'
        elevation={6}>
          {props.usersData.snackBarMessage.message}
        </Alert>
      </Snackbar>

      <Grid item>
        <Typography variant='subtitle1'>All Users are listed Below</Typography>
        <Divider />
      </Grid>
      <Grid container justify='center' spacing={4} alignItems='center'>
        {props.usersData.pending ? skeletonData : props.usersData.users.rows.map((user, index) =>(
          <Grid item sm={6} xs={12} md={3} key={user.id}>
            <UserCard UserData={user} idx={index}/>
          </Grid>
        )) }
      </Grid>
      <div className={classes.pagination}>
        <Pagination variant='outlined' color='primary' count={10} onChange={handlePagination} />
      </div>
      
    </Grid>
  )
}

const mapStateToProps = state => ({
  usersData: state.users
})

export default connect(mapStateToProps, {getUsers, clearSnackBar, getRoles})(ListUsers)