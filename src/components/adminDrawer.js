import React, {useState} from 'react'
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Box, Avatar, Typography, Collapse} from '@material-ui/core';
import { PlusOne, Home, People, Delete, Settings, Menu, AccountCircle, ExpandLess, ExpandMore } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
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
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({left: false});
  const [drop, setDrop] = React.useState(false);

  const firstLinks = [
    {title: 'Create Roles', path: '/admin/roles'},
    {title: 'Set permissions', path:'/admin/permissions'}
  ]

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [anchor]: open });
  };

  const handleClick = () => {
    setDrop(!drop)
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className={classes.accountInfo}>
        <Avatar className={classes.paper}>
          <AccountCircle fontSize='large' className={classes.listIcons}/>
        </Avatar>
        <Typography>Admin Name</Typography>
      </Box>
      <Divider/>
      <List>
          <Link to='/admin' key='Home' className={classes.linkText} >
            <ListItem button>
              <ListItemIcon> <Home className={classes.listIcons}/> </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>

            <ListItem button onClick={handleClick}>
              <ListItemIcon> <Settings className={classes.listIcons} /> </ListItemIcon>
              <ListItemText primary='ROLES' />
              {drop ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={drop} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {firstLinks.map(({title, path}) => (
                  <Link to={path} key={title} className={classes.nested}>
                    <ListItem button >
                      <ListItemText primary={title}/>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Collapse>
      </List>
      <Divider/>
      <List>
        <Link to='/users' key='List users' className={classes.linkText}>
          <ListItem button>
            <ListItemIcon> <People className={classes.listIcons}/> </ListItemIcon>
            <ListItemText primary= 'List users' />
          </ListItem>
        </Link>
      </List>
      <Divider/>
      <List>
        <Link to='/trash' key='Trash' className={classes.linkText}>
          <ListItem button>
            <ListItemIcon> <Delete className={classes.listIcons}/> </ListItemIcon>
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
            classes = {{paper: classes.paper}}
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