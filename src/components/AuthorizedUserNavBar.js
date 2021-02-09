import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, makeStyles, List, Container, Hidden, Typography} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import SideDrawer from './SideDrawer'
import { isAdmin, redirectUser } from '../services/userInfo'
import { Security } from '@material-ui/icons';

const navLinks = [
    {title: 'Logout', path: '/logout'}
]

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        textDecorationLine: 'none',
        color: 'inherit'
    }
  }))

function Header (){
    const classes = useStyles()
    const [admin,setAdmin] = useState(false)
    useEffect(()=>{
        setAdmin(isAdmin())
    })

    const barefootLogo = <Typography href='/welcome' variant='h6'component='a' className={classes.logo}> Barefoot Nomad </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Container maxWidth='lg' className={classes.navDisplay}>
                {barefootLogo}
                <Hidden smDown>
                    <List component='nav'>
                        {
                            admin
                            ? <Button onClick={redirectUser} color='inherit' startIcon={ <Security/> }>Manage</Button>
                            : null
                        }
                        
                        <Button href="/logout" color='inherit' startIcon = { <LockIcon/> }>Logout</Button>
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