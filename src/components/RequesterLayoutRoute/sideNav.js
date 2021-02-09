import { Avatar, Box, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import {  AddLocation,Person, Business, Home, LocationCity,  PinDrop } from '@material-ui/icons'
import React from 'react'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
    container: {
        width: 240,
        position: 'fixed',
        top: 64,
        bottom: 0,
        backgroundColor:'#EAF4FB',
        overflow:'auto',
        '@media(max-width:840px)':{
            display:'none'
        },
        [theme.breakpoints.down('sm')]:{
            display:'none',
            position:'absolute'
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
    return(
        <div className={classes.container}>
            <List component="nav">
                <Box className={classes.adminBox}>
                    <Typography><Avatar/></Typography>
                    <Typography>Requester Name</Typography>
                </Box>
                <Typography className={classes.a} href='/requester/profile' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><Person/></Typography>
                    <Typography className={classes.menuText}>Profile</Typography>
                </ListItem>
                </Typography>
                <Divider/>
                <Typography className={classes.a} href='/requester/create-travel-request' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><AddLocation/></Typography>
                    <Typography className={classes.menuText}>Create TRavel request</Typography>
                </ListItem>
                </Typography>
                <Typography className={classes.a} href='/requester/view-travel-requests' component='a'>
                <ListItem className={classes.linkBox}>
                    <Typography><PinDrop/></Typography>
                    <Typography className={classes.menuText}>View Travel Requests</Typography>
                </ListItem>
                </Typography>
                <Divider/>
            </List>
        </div>
    )
}