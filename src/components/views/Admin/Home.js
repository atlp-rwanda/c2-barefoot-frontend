import React from 'react'
import {Typography, makeStyles, Box, Divider, List, ListItem} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root:{
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around'
  },
  introduction: {
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  systemData:{
    width: '50%',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    alignContent: 'center',
    color: theme.palette.primary.main,

  }
  
}));

function Home () {
  const classes = useStyles()
  return(
    <Box className={classes.root}>

      <Box className={classes.introduction}>
        <Typography variant='subtitle1'>Welcome back Administrator!</Typography>
        <Typography variant='subtitle1'>This is how your system looks like so far</Typography>
      </Box>
      <List className={classes.systemData} spacing={3}>
        <ListItem>
          <Typography>
            0 Roles
          </Typography>
        </ListItem>
        <Divider orientation='vertical' flexItem />
        <ListItem>
          <Typography>
            0 users
          </Typography>
        </ListItem>
        <Divider orientation='vertical' flexItem />
        <ListItem>
          <Typography>
            0 Locations
          </Typography>
        </ListItem>
        <Divider orientation='vertical' flexItem />
        <ListItem>
          <Typography>
            0 Accommodations
          </Typography>
        </ListItem>
      </List>
    </Box>  
    
    
  )

}

export default Home