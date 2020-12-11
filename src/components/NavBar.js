import React from 'react'
import { AppBar, Toolbar, Typography, Button, makeStyles} from '@material-ui/core'
import {PersonAddOutlined, PersonOutlined} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between'
    }
  }))

function Header (){
    const classes = useStyles()
    const barefootLogo = <Typography href='/' variant='h6'component='h1'>
                Barefoot Nomad
            </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar className={classes.navDisplay}>
            {barefootLogo}
            <nav>
                <Button href="/login" color='inherit' startIcon={ <PersonOutlined/> }>Login</Button>
                <Button href="/signup" color='inherit' startIcon = { <PersonAddOutlined/> }>Signup</Button>
            </nav>
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