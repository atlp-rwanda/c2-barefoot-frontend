import React, {useEffect} from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { getUsers } from '../../../redux/actions/fetchUsersAction'
import UserCard from '../../UserCard'

const skeletonData = (<Grid item sm={8} xs={10}><UserCard/></Grid>)

function ListUsers(props) {
  useEffect(() => {
    props.getUsers()
  }, [])

  return(
    <Grid 
    container
    justify='center'
    direction='column'
    alignItems='center'
    spacing={4}
    >
      <Grid item>
        <Typography variant='subtitle1'>All Users are listed Below</Typography>
        <Divider />
      </Grid>
      <Grid container justify='center' spacing={4} alignItems='center'>
        {props.usersData.pending ? skeletonData: props.usersData.users.rows.map((user, index) =>(
          <Grid item sm={6} xs={12} md={3} key={user.id}>
            <UserCard UserData={user} idx={index}/>
          </Grid>
        )) }
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  usersData: state.users
})

export default connect(mapStateToProps, {getUsers})(ListUsers)