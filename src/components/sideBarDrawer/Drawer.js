import React, { useState } from 'react'
import { Menu, AccountCircle } from '@material-ui/icons'
import { makeStyles, IconButton, Drawer, Box, Avatar, Typography, Collapse, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {sideBarData} from "../../components/sideBarDrawer/sideBarData";
import { Link } from 'react-router-dom';

const useStyles = makeStyles( theme =>({
    list: {
    width: 250,
  },
  menuIcon: {
    color: 'white'
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: 'black'
  },
  accountInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 80
  },
  paper: {
    backgroundColor: '#EAF4FB'
  },
  listIcons: {
    color: theme.palette.primary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    textDecoration: `none`,
    color: 'black'
    
  },
}))

function DrawerComponent() {
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(true)
    const [state, setState] = useState({left: false});
    const [drop, setDrop] = React.useState(false);
    // console.log(sideBarData)
    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [anchor]: open });
  };
    const drawSideBar = (anchor) => (
        <>
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
        </div>
        <Box className={classes.accountInfo}>
        <Avatar className={classes.paper}>
          <AccountCircle fontSize='large' className={classes.listIcons}/>
        </Avatar>
        <Typography>Manager Name</Typography>
      </Box>
      <Divider/>
      <List>
      {sideBarData.map(list => (
          <Link to={list.link} key={list.title} className={classes.nested}>
            <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText>
                        {list.title}
                    </ListItemText>
                </ListItem>
                </Link>
            ))}
                
            </List>
      </>
    )
    return (
        <React.Fragment>
         <IconButton edge='start' onClick={toggleDrawer('left', true)}>
            <Menu fontSize='large' className = {classes.menuIcon} />
          </IconButton>
        <Drawer 
        anchor='left'
        open={state.left} 
        onClose={toggleDrawer('left', false)}>
            {drawSideBar('left')}
        </Drawer>
        </React.Fragment>
    )
}

export default DrawerComponent
