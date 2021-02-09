import { Avatar, Box, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import { AccountCircle, AddLocation, Business, Home, LocationCity, PinDrop } from '@material-ui/icons'
import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
    container: {
        width: 220,
        position: 'absolute',
        top: 64,
        bottom: 0,
        backgroundColor:'#EAF4FB',
        overflow:'auto',
        '@media(max-width:840px)':{
            display:'none'
        }
    },
    adminBox:{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:70,
    },
    linkBox: {
      display:'flex',
      padding:'15px',
      color:'#43A0D6',
      '&:hover':{
        background: '#ABD5ED',
        borderLeft: '6px solid  #257AAA'
      }
    },
    a:{
        textDecoration:'none',
        color:'#43A0D6',
    },
    menuIcon: {
      color: 'white'
    },
    menuText: {
        width:'100%',
        textAlign:'center'
    }
  }))
export function SideBar(){
    const classes = useStyles()
    const [selected, setSelected]  = useState(0);
    return(
        <div className={classes.container}>
            <List component="nav">
                <Box className={classes.adminBox}>
                    <Typography><Avatar/></Typography>
                    <Typography>Admin Name</Typography>
                </Box>
                <Typography className={classes.a} href='/admin/travel' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><Home/></Typography>
                    <Typography className={classes.menuText}>Home</Typography>
                </ListItem>
                </Typography>
                <Divider/>
                <Typography className={classes.a} href='/admin/travel/location/create' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><AddLocation/></Typography>
                    <Typography className={classes.menuText}>Create location</Typography>
                </ListItem>
                </Typography>
                <Typography className={classes.a} href='/admin/travel/location/view' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><PinDrop/></Typography>
                    <Typography className={classes.menuText}>List location</Typography>
                </ListItem>
                </Typography>
                <Divider/>
                <Typography className={classes.a} href='/admin/travel/accommodations/create' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><Business/></Typography>
                    <Typography className={classes.menuText}>Create accommodations</Typography>
                </ListItem>
                </Typography>
                <Typography className={classes.a} href='/admin/travel/accommodations/view' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><LocationCity/></Typography>
                    <Typography className={classes.menuText}>List accommodation</Typography>
                </ListItem>
                </Typography>
                <Divider/>
            </List>
        </div>
    )
}