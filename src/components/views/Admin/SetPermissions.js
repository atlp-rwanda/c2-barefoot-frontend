import React from 'react'
import {Typography, makeStyles, Box, Divider, Container} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
 root: {
   display: 'flex',
   flexDirection: 'column',
   alignContent: 'center',
   justifyContent: 'center'
 }
}))

function SetPermissions(){
  const classes = useStyles()
  return(
    <Container className={classes.root}>
      <Box>
        <Typography variant='h5' >Allow users to perform their operations</Typography>
        <Divider/>
      </Box>
    </Container>
    
  )
}

export default SetPermissions;