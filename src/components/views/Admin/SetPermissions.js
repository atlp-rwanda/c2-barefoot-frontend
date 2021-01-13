import React, {useEffect} from 'react'
import {Typography, makeStyles, Slide, Box, Snackbar, Divider, Grid, CssBaseline, Checkbox, FormControlLabel, TextField, FormGroup, Button} from '@material-ui/core'
import { connect } from 'react-redux'
import { getRoles, clearSnackBar } from '../../../redux/actions/fetchRolesAction'
import RolesCard from '../../rolesCard'
import Loader from '../../Loader'
import { Alert } from '@material-ui/lab';
import { changePermission, updatePermission, clearPermissionSnackbar } from '../../../redux/actions/PermissionsAction'

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

  const closeRoleSnackBarTimer = () => {
    props.clearSnackBar()
  }

  const closePermissionsSnackBarTimer = () => {
    props.clearPermissionSnackbar()
  }

  const handleCheckBox = (event) => {
    let allowed = event.target.checked ? 1 : 0
    const changed = [event.target.name, allowed]
    const index = event.target.id
    console.log(event.target.value)
    props.changePermission(index, changed)
  }

function Perm(){
    props.permissions.permissions.map(([name, allowed]) => (
      this[name] = allowed
    ))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    props.updatePermission(new Perm, props.permissions.selectedRole)
   
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
        <Loader open={props.permissions.pending}/>

        {/* This snackbar is for the roles column */}
        <Snackbar
        open={props.savedRoles.snackBarMessage.open}
        onClose={closeRoleSnackBarTimer}
        autoHideDuration={4000}
        TransitionComponent={TransitionUp}>
          <Alert
          severity={props.savedRoles.snackBarMessage.severity}
          variant='filled'
          elevation={6}>
            {props.savedRoles.snackBarMessage.message}
          </Alert>
        </Snackbar>

      {/* This snackbar is for the permisions column */}
        <Snackbar
        open={props.permissions.snackBarMessage.open}
        onClose={closePermissionsSnackBarTimer}
        autoHideDuration={4000}
        TransitionComponent={TransitionUp}>
          <Alert
          severity={props.permissions.snackBarMessage.severity}
          variant='filled'
          elevation={6}>
            {props.permissions.snackBarMessage.message}
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

            <form onSubmit = {handleSubmit}>
              <FormGroup>
                {props.permissions && props.permissions.permissions.map(([name, allowed], index) => (
                  <FormControlLabel
                  key={name}
                  control={<Checkbox checked={allowed ? true : false}  name={name} id={index}  onChange={handleCheckBox} />}
                  label={name}
                />))}
              </FormGroup>
              <Button variant='contained' size='medium' color='primary' type="submit" disabled={load}>Save</Button>
            </form>

          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state =>({
  savedRoles: state.roles,
  permissions: state.permissions
})

export default  connect(mapStateToProps, {getRoles, clearSnackBar, changePermission, updatePermission, clearPermissionSnackbar})(SetPermissions);