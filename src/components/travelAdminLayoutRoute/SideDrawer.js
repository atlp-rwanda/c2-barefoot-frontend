import React from 'react'
import { IconButton, Drawer, List, ListItem, ListItemText, Typography, Box, Avatar } from "@material-ui/core"
import { AddLocation, Business, Home, LocationCity, Menu, PinDrop } from "@material-ui/icons"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: 'black'
  },
  menuIcon: {
    color: 'white'
  },
  container: {
    width: 250,
    position: 'absolute',
    top: 64,
    bottom: 0,
    backgroundColor:'#EAF4FB',
    overflow:'auto'
},
adminBox:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    height:70,
},
linkBox: {
  display:'flex',
  padding:'20px',
  color:'#43A0D6',
  '&:hover':{
      background: '#ABD5ED',
      borderLeft: '6px solid  #257AAA'
    }
},
a:{
    textDecoration:'none',
    color:'#43A0D6',
    
},
}))

const SideDrawer = ({navLinks}) => {
  const classes = useStyles()
  const [state, setState] = useState({ right: false })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setState({ [anchor]: open })
  }

  const sideDrawerList = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
            <Box className={classes.adminBox}>
                <Typography><Avatar/></Typography>
                <Typography>Admin Name</Typography>
            </Box>
            <Divider/>
            <Typography className={classes.a} href='/admin/travel' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><Home/></Typography>
                  <Typography>Home</Typography>
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/admin/travel/location/create' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><AddLocation/></Typography>
                  Create location
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/admin/travel/location/view' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><PinDrop/></Typography>
                  List location
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/admin/travel/accommodations/create' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><Business/></Typography>
                  Create accommodations
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/admin/travel/accommodations/view' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><LocationCity/></Typography>
                  List accommodation
              </ListItem>
            </Typography>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton 
      edge="start" 
      aria-label="menu"
      onClick={toggleDrawer("left", true)}
      >
        <Menu fontSize='large' className={classes.menuIcon}/>
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onOpen={toggleDrawer("left", true)}
        onClose={toggleDrawer("left", false)}
        
      >
  {sideDrawerList("left")}
</Drawer>
    </React.Fragment>
  )
}

export default SideDrawer