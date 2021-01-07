import React from 'react'
import {Box, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    color: "#fff",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

function Unauthorized (){
  const classes = useStyles();

  return(
    <React.Fragment>
      <Box className={classes.box}>
        <Typography variant='h1' >401</Typography>
        <Typography variant='h4' >Unauthorized :(</Typography>
      </Box>
    </React.Fragment>
  )
}

export default Unauthorized