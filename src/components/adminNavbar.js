import React from 'react'
import { AppBar, Toolbar, Button, makeStyles, List, Container, Typography} from '@material-ui/core'
import AdminDrawer from './adminDrawer'

const useStyles = makeStyles(theme => ({
    navDisplay: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logo: {
        textDecorationLine: 'none',
        color: 'inherit'
    }
  }))

function Header (){
    const classes = useStyles()

    const barefootLogo = <Typography href='/welcome' variant='h6'component='a' className={classes.logo}> Barefoot Nomad </Typography>

    const displayDesktop = () => {
    return (
        <Toolbar>
            <Container maxWidth='lg' className={classes.navDisplay}>

              <AdminDrawer/>

                {barefootLogo}
                    <List component='nav'>
                        <Button href="/login" color='inherit'>Logout</Button>
                    </List>
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