import React from 'react'
import { AppBar, Toolbar, Button, makeStyles, List, Container, Hidden, Typography, Box} from '@material-ui/core'
import {Lock, PersonAddOutlined, PersonOutlined} from '@material-ui/icons'
import SideDrawer from './SideDrawer'


const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        textDecorationLine: 'none',
        color: 'inherit'
    },
    appBar:{
        position:'fixed',
        [theme.breakpoints.down('sm')]:{
            position:'static'
        }
    }
  }))

function Header (){
    const classes = useStyles()

    const barefootLogo = <Typography href='/welcome' variant='h6'component='a' className={classes.logo}> Barefoot Nomads </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar >
            <Container maxWidth='lg' className={classes.navDisplay}>
                <Box>
                    <SideDrawer />
                    {barefootLogo}
                </Box>
                <Hidden smDown>
                    <List component='nav'>
                        <Button href="/profile" color='inherit' startIcon={ <PersonOutlined/> }>Profile</Button>
                        <Button href="/logout" color='inherit' startIcon = { <Lock/> }>Logout</Button>
                    </List>
                </Hidden>
                
            </Container>
        </Toolbar>
        )
    }

     return(
         <React.Fragment>
            <AppBar className={classes.appBar}>{displayDesktop()}</AppBar>
         </React.Fragment>
     )
 
}
export default Header;