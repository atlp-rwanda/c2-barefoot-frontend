import React from 'react'
import { AppBar, Toolbar, Button, makeStyles, List, Box, Typography} from '@material-ui/core'
import AdminDrawer from './AdminDrawer'

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        textDecorationLine: 'none',
        color: 'inherit'
    },
    innerBox: {
        display: 'flex',
        alignItems: 'center'
    }
  }))

function Header (){
    const classes = useStyles()

    const barefootLogo = <Typography href='/welcome' variant='h6'component='a' className={classes.logo}> Barefoot Nomad </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Box  className={classes.navDisplay}>
                <Box className={classes.innerBox}>
                    <AdminDrawer/>
                    {barefootLogo}
                </Box>
              
                    <List component='nav'>
                        <Button href="/login" color='inherit'>Logout</Button>
                    </List>
            </Box>
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