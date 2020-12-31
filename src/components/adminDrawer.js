import React, {useState} from 'react'
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Box, Avatar, Typography} from '@material-ui/core';
import { PlusOne, Home, People, Delete, Settings, Menu, AccountCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
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
    
    
  }
});

const firstLinks = [
  {title: 'Home', path: '/adminHome', icon: <Home/>},
  {title: 'Create Roles', path: '/roles', icon: <PlusOne/>},
  {title: 'Set permissions', path:'/permissions', icon: <Settings/>}
]

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({left: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className={classes.accountInfo}>
        <Avatar>
          <AccountCircle fontSize='large'/>
        </Avatar>
        <Typography>Admin Name</Typography>
      </Box>
      <Divider/>
      <List>
        {firstLinks.map(({title, path, icon}) => (
          <Link to={path} key={title} className={classes.linkText} >
            <ListItem button>
              <ListItemIcon> {icon} </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider/>
      <List>
        <Link to='/users' key='List users' className={classes.linkText}>
          <ListItem button>
            <ListItemIcon> <People/> </ListItemIcon>
            <ListItemText primary= 'List users' />
          </ListItem>
        </Link>
      </List>
      <Divider/>
      <List>
        <Link to='/trash' key='Trash' className={classes.linkText}>
          <ListItem button>
            <ListItemIcon> <Delete/> </ListItemIcon>
            <ListItemText primary= 'Trash' />
          </ListItem>
        </Link>
      </List>
    </div>
  )

  return(
    <div>
      
        <React.Fragment>
          <IconButton edge='start' onClick={toggleDrawer('left', true)}>
            <Menu fontSize='large' className = {classes.menuIcon} />
          </IconButton>
          <Drawer 
            anchor='left' 
            open={state.left} 
            onOpen={toggleDrawer('left', true)}
            onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
      
    </div>
  )
}