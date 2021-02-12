import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    
    stickToBottom: {
        position: "fixed",
        bottom: 0,

    }
  }))

function Footer (){
    const classes = useStyles()

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Typography href='/' variant='body1'component='p'>
               &#169; 2020, BareFoot Nomad, All rights reserved.
            </Typography>
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