import React from 'react'
import { Typography, makeStyles, Toolbar } from "@material-ui/core";
import { sideBarData } from './sideBarData'
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    sideBar:{
        display:'flex',
        height:'100vh',
        width:'20%',
        backgroundColor:'green',
        marginTop:'0px',
        zIndex:100
        // marginLeft:'-100%'
    },

    sideBarList:{
        width:'100%',
        height:'100%',
        // paddingTop:'10px'
    },
    row:{
        width:'100%',
        height:'50px',
        margin:'0%',
        display:'flex',
        flexDirection:'row',
         '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#257AAA'
        },
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        flex:'30%',
        display:'grid',
        placeItems:'center'
    },
    title:{
        flex:'70%',
        justifyContent:'center',
        alignItems:'center'
    },
    closeIcon:{
        color:'white',
        padding:'20px'
    }
}))
function Sidebar() {
    const classes = useStyles()
    return (
        <div className={classes.sideBar} >
        <div>
            <div className={classes.closeIcon}><CloseIcon /></div>
            <ul className={classes.sideBarList}>
                {sideBarData.map((value, key) => {
                   return (
                        <li className={classes.row} key={key} onClick={()=>{window.location.pathname = value.link}}> 
                            <div className={classes.icon}>{value.icon}</div>
                            <div className={classes.title}>{value.title}</div>
                        </li>
                    )
                  })
                }
            </ul>
        </div>
        </div>
    )
}

export default Sidebar
