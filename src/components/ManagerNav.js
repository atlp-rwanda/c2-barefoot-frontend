import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import DrawerComponent from './sideBarDrawer/Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link:{
      '&:hover':{
          cursor:'pointer',
          textDecoration:"none"
      }
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [sideBar, setSideBar] = useState(false)
  const showSideBar = () => setSideBar(!sideBar)
  const handleClockMenuIcon = () => {
      console.log('hahahahahahahahahaha')
     return (
     <>
        <DrawerComponent />
      </>
      )    
  } 
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <DrawerComponent />
          <Typography variant="h6" className={classes.title}>
           <Link className={classes.link} href="/" color="inherit">
    
            Barefoot Nomad
  </Link>
          </Typography>
          <Button href="/logout" color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
