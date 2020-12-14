import React from 'react'
import { AppBar, Toolbar, Typography, Button, makeStyles, List, Container, Hidden} from '@material-ui/core'
import {PersonAddOutlined, PersonOutlined} from '@material-ui/icons'
import SideDrawer from './SideDrawer'

const navLinks = [
    {title: 'Login', path: '/login'},
    {title: 'Signup', path: '/signup'}
]

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
  }))

function Header (){
    const classes = useStyles()
    const barefootLogo = <Typography href='/' variant='h6'component='h1'>
                Barefoot Nomad
            </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Container maxWidth='lg' className={classes.navDisplay}>
                {barefootLogo}
                <Hidden smDown>
                    <List component='nav'>
                        <Button href="/login" color='inherit' startIcon={ <PersonOutlined/> }>Login</Button>
                        <Button href="/signup" color='inherit' startIcon = { <PersonAddOutlined/> }>Signup</Button>
                    </List>
                </Hidden>
                <Hidden mdUp>
                    <SideDrawer navLinks={navLinks}/>
                </Hidden>
            </Container>
        </Toolbar>
        )
    }

     return(
         <React.Fragment>
            <AppBar position='static'>{displayDesktop()}</AppBar>
         </React.Fragment>
     )
 
}
export default Header;