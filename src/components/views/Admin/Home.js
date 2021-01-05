import React, {useEffect} from 'react'
import {Typography, makeStyles, Box, Divider, Grid, Container} from '@material-ui/core'
import { connect } from 'react-redux'
import { getLocations } from '../../../redux/actions/fetchLocationsAction'
import { getAccommodations } from '../../../redux/actions/fetchAccommodations'
import { getUsers } from '../../../redux/actions/fetchUsersAction'
import { getRoles } from '../../../redux/actions/fetchRolesAction'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root:{
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
    color: theme.palette.primary.main,

  },
  introduction: {
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));

function Home (props) {

  useEffect(() => {
    props.getRoles()
    props.getUsers()
    props.getLocations()
    props.getAccommodations()
  }, [])

  const skeletonData = (<Skeleton variant='text' width='100%'/>)

  const classes = useStyles()
  return(
    <Container className={classes.root}>

      <Box className={classes.introduction}>
        <Typography variant='subtitle1'>Welcome back Administrator!</Typography>
        <Typography variant='subtitle1'>This is how your system looks like so far</Typography>
      </Box>
      <Grid 
        container 
        spacing={6}
        direction='row'
        justify='center'
        alignItems='center'>
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
          {props.rolesData.pending ? skeletonData : `${props.rolesData.roles.count} Roles`}
          </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
          {props.usersData.pending ? skeletonData : `${props.usersData.users.count} Users`}
          </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
          {props.locationsData.pending ? skeletonData : `${props.locationsData.locations.count} Locations`}
          </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
          {props.accommodationsData.pending ? skeletonData : `${props.accommodationsData.accommodations.count} Accommodations`}
          </Typography>
        </Grid>
      </Grid>
    </Container>  
    
    
  )

}
const mapStateToProps = state => ({
  locationsData: state.fetchLocations,
  accommodationsData: state.fetchAccommodations,
  usersData: state.users,
  rolesData: state.roles
})

export default connect(mapStateToProps,{getLocations, getAccommodations, getUsers, getRoles})(Home)