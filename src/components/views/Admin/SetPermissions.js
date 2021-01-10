import React, {useEffect} from 'react'
import {Typography, makeStyles, Slide, Box, Snackbar, Divider, Grid, CssBaseline, FormGroup, Checkbox, FormControlLabel, TextField} from '@material-ui/core'
import { connect } from 'react-redux'
import { getRoles, clearSnackBar } from '../../../redux/actions/fetchRolesAction'
import RolesCard from '../../rolesCard'
import Loader from '../../Loader'
import {Alert} from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
 root: {
   height: '90vh'
 }
}))

const skeletonData = (<Grid item sm={8} xs={10}><RolesCard/></Grid>)

function SetPermissions(props){
  useEffect(() => {
    props.getRoles()
  }, [])

  const classes = useStyles()

  const load = props.savedRoles.load

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const closeSnackBarTimer = () => {
    props.clearSnackBar()
  }

  return(
    <>
      <Grid 
      container 
      component='main' 
      justify='center'
      spacing={4}>
        
        <CssBaseline/>

        <Loader open={load}/>

        <Snackbar
        open={props.savedRoles.snackBarMessage.open}
        onClose={closeSnackBarTimer}
        autoHideDuration={4000}
        TransitionComponent={TransitionUp}>
          <Alert
          severity={props.savedRoles.snackBarMessage.severity}
          variant='filled'
          elevation={6}>
            {props.savedRoles.snackBarMessage.message}
          </Alert>
        </Snackbar>

        <Grid container sm={4} xs={12}  justify='center'>
          <Box>
            <Typography variant='h5'>Created Roles</Typography>
            <Divider/>
          </Box>
          <Grid container xs={12} justify='center'>
          <form>
            <TextField label='Search' variant='outlined'/>
          </form>
          </Grid>

          <Grid container justify='center' spacing={2} style={{maxHeight: '80%', overflow: 'auto'}}>

            {props.savedRoles.pending ? skeletonData : props.savedRoles.roles.rows.map((role, index) => (
               <Grid item sm={9} xs={10} key={role.id}>
               <RolesCard roleTitle={role.name} idx={index}/>
             </Grid>
            ))}
           
          </Grid>
        </Grid>
        <Divider orientation='vertical'/>
        <Grid container sm={4} xs={12} justify='center' spacing={3}>
          <Box>
            <Typography variant='h5' >Permissions</Typography>
            <Divider/>
          </Box>
          <Grid container justify='center'>
            <form>
              <FormGroup>
                <FormControlLabel
                control={<Checkbox  name='Edit Profile' />}
                label='Edit Profile'
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                control={<Checkbox/>}
                label='Assign requesters to manager'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='Create travel requests'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='View travel requests'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='Edit travel requests'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='Cancel travel requests'
                />
              </FormGroup>
              <FormGroup>
              <FormControlLabel
              control={<Checkbox/>}
              label='Approve direct reports travel requests'
              />
              <FormControlLabel
              control={<Checkbox/>}
              label='View direct reports travel requests'
              />
              <FormControlLabel
              control={<Checkbox/>}
              label='Reject direct reports travel requests'
              />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                control={<Checkbox/>}
                label='Create accommodations'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='Update accommodations'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='Delete accommodations'
                />
                <FormControlLabel
                control={<Checkbox/>}
                label='Book accommodations'
                />
              </FormGroup>
              <FormGroup>
                  <FormControlLabel
                  control={<Checkbox/>}
                  label='Create locations'
                  />
                  <FormControlLabel
                  control={<Checkbox/>}
                  label='Update locations'
                  />
                  <FormControlLabel
                  control={<Checkbox/>}
                  label='Delete locations'
                  />
              </FormGroup>
            </form>    
          </Grid>
          
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state =>({
  savedRoles: state.roles
})

export default  connect(mapStateToProps, {getRoles, clearSnackBar})(SetPermissions);