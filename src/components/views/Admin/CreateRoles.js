import React from 'react'
import { Typography, makeStyles, Divider, Container, Box,  TextareaAutosize, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
  },
  titleBox: {
    margin: theme.spacing(2)
  },
  form: {
    margin: theme.spacing(4),
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent:'center'
  },
  TextField: {
    marginBottom: theme.spacing(4)
  },
  formButtons: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    justifyContent: 'space-around'
  }
}))

function CreateRoles () {
  const classes = useStyles()

  return(
    <Container className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography variant='h5' >Create new Role</Typography>
        <Divider/>
      </Box>
      <form className={classes.form}>
        <TextField 
          label='Role title' 
          fullWidth 
          required 
          InputProps={{
            className: classes.TextField
          }}/>
        <TextField label='Role description' variant='outlined' fullWidth/>
        <Box className={classes.formButtons} >
          <Button variant='contained' size='medium' color='primary'>Save</Button>
          <Button variant='contained' size='medium' color='secondary'>Cancel</Button>
        </Box>
      </form>
      <Box>
        <Typography variant='h5' >Created Roles</Typography>
        <Divider/>
      </Box>
    </Container>
  )
}

export default CreateRoles