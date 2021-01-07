import React, {useEffect} from 'react'
import {Typography, makeStyles, Box, Divider, Grid, CssBaseline} from '@material-ui/core'
import { connect } from 'react-redux'
import { getRoles } from '../../../redux/actions/fetchRolesAction'
import { Skeleton } from '@material-ui/lab'
import RolesCard from '../../rolesCard'

const useStyles = makeStyles((theme) => ({
 root: {
   height: '90vh'
 }
}))

const skeletonData = (<Grid item sm={8} xs={10} spacing={4}><RolesCard/></Grid>)

function SetPermissions(props){
  useEffect(() => {
    props.getRoles()
  }, [])

  const classes = useStyles()

  return(
    <>
      <Grid 
      container 
      component='main' 
      justify='center'
      spacing={4}
      >
        <CssBaseline/>

        <Grid item sm={4} xs={12} justify='center' className={classes.root} spacing={2}>
          <Box>
            <Typography variant='h5' align='center'>Created Roles</Typography>
            <Divider/>
          </Box>
          <Grid container justify='center' spacing={2}>

            {props.savedRoles.pending ? skeletonData : props.savedRoles.roles.rows.map(({id, name}) => (
               <Grid item sm={8} xs={10}>
               <RolesCard roleTitle={name}/>
             </Grid>
            ))}
           
          </Grid>
        </Grid>
        <Divider orientation='vertical'/>
        <Grid item sm={4} xs={12}>
          <Box>
            <Typography variant='h5' align='center'>Permissions</Typography>
            <Divider/>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state =>({
  savedRoles: state.roles
})

export default  connect(mapStateToProps, {getRoles})(SetPermissions);