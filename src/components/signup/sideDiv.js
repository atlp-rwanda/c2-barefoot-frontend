import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    sideNav: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: '1.5rem',
        '@media(max-width: 740px)' : {
            width: '80%'
        }
    },
    locationImg: {
        width: '70%',
        '@media(max-width: 740px)' : {
            display: 'none',
        }
    },
    img:{
        textAlign: 'center'
    },
    imgSkeleton: {
        width: '70%',
        maxWidth: '300px',
        minHeight: '248px',
        marginLeft: 'auto',
        marginRight: 'auto',
        '@media(max-width: 740px)' : {
            display: 'none'
        }
    },
    sideText:{
        textAlign: 'center',
        color: 'dodgerblue',
        '@media(max-width: 740px)' : {
            fontSize: '18px',
            marginBottom: '20px'
          },
          '@media(max-width: 360px)' : {
            marginBottom: '0'
          }
    },
    textBox: {
        height: '25px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '0.5rem',
        width: '100%',
        maxWidth: '300px'
      },
  }));
function SideDiv({loading}){
    const classes = useStyles();
    return(
        <div className={classes.sideNav}>
            { loading ? (
                <Box className={classes.box}>
                    <Skeleton variant="rect" className={classes.textBox}/>
                    <Skeleton variant="rect" className={classes.textBox} />
                </Box>
            ) : (
                <div className={classes.sideText}>
                    <p>Please create account to get </p>
                    <p>started with Barefoot Nomard.</p>
                </div>
            )
            }
            {loading ? (
                <Box className={classes.box}>
                    <Skeleton variant="rect" className={classes.imgSkeleton}/>
                </Box>
            ) : (
                <div className={classes.img}>
                    <img className={classes.locationImg} src={'../public/images/location.png'} alt='Barefoot Nomards'/>
                </div>
            )}
        </div>
    )
}

export default SideDiv