import React from 'react'
import { AppBar, Toolbar, Typography, Button, makeStyles} from '@material-ui/core'
import {PersonAddOutlined, PersonOutlined} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    stickToBottom: {
        position: "fixed",
        bottom: 0,

    }
  }))

function Footer (){
    const classes = useStyles()
    const barefootLogo = <Typography href='/' variant='body1'component='p'>
               &#169; 2020, BareFoot Nomad, All rights reserved.
            </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar className={classes.navDisplay}>
            {barefootLogo}
            <nav>
                {/* <Button href="/login" color='inherit' startIcon={ <PersonOutlined/> }>Login</Button>
                <Button href="/signup" color='inherit' startIcon = { <PersonAddOutlined/> }>Signup</Button> */}
            </nav>
        </Toolbar>
        )
    }

     return(
         <React.Fragment>
            <div className={classes.offset}></div>            
            <AppBar className={classes.stickToBottom} position='static'>{displayDesktop()}</AppBar>
         </React.Fragment>
     )
 
}
export default Footer;