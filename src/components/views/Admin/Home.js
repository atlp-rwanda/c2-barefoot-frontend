import React from 'react'
import {Typography, makeStyles, Box, Divider, Grid, Container} from '@material-ui/core'

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

function Home () {
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
            0 Roles
          </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
            0 users
          </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
            0 Locations
          </Typography>
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={4} sm={4} md={2}>
          <Typography>
            0 Accommodations
          </Typography>
        </Grid>
      </Grid>
    </Container>  
    
    
  )

}

export default Home