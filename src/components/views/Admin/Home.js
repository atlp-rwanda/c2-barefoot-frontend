import React from 'react'
import {Container, Typography, makeStyles, Box} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'inherit'
  },
  introduction: {
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  
}));

function Home () {
  const classes = useStyles()
  return(
    <Container className={classes.root}>

      <Box className={classes.introduction}>
        <Typography variant='subtitle1'>Welcome back Administrator!</Typography>
        <Typography variant='subtitle1'>This is how your system looks like so far</Typography>
      </Box>
      
    </Container>
    
  )

}

export default Home