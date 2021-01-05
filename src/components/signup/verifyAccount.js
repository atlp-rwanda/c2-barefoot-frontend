import { Box, Button, makeStyles } from '@material-ui/core'
import Devider from '@material-ui/core/Divider'
import { CheckCircle } from '@material-ui/icons'
import Axios from 'axios'
import React, { useState } from 'react'
import queryString from 'query-string';
import { Skeleton } from '@material-ui/lab'

const useStyle = makeStyles(theme => ({
    container: {
        display: 'grid',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px',
        padding: '10px'
    },
    boxContainer: {
        textAlign: 'center'
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        color: '#90a4ae'
    },
    hr: {
        height: '2px',
        margin: '5px -10px',
        '@media(max-width: 740px)': {
            margin: '5px'
        }
    },
    tokenMissing: {
        fontSize: '5vh',
        padding: '20px',
        marginBottom: '10px',
        borderBottom: '2px black solid',
    }
}))
const verify = (token, verified, setVerified ,setError) => {
    Axios.patch(`https://barefoot-nomad-app-v1.herokuapp.com/api/v1/user/verification?token=` + token)
    .then(res => {
      setVerified(true)
    })
    .catch(err => { 
      if (err.response){
        setError(err.response.data.error)
      }else if(err.request){
        setError(err.request)
      }else if(err.message){
        setError(err.message)
      }
    })
}
const verifyAccount = () => {
    const classes = useStyle()
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');
    const parsed = queryString.parse(location.search);
    const [checked, setChecked] = useState(false)
    const token = parsed.token
    
    if(!checked){
        verify(token, verified, setVerified, setError)
        setChecked(true)
    }
    
    return (
        
        <div className={classes.container}>
            <Box className={classes.boxContainer}>
                {token && verified ? (
                <>
                    <Box className={classes.box}>
                        <CheckCircle style={{color: '#1b5e20'}}/>Your e-mail has been verified
                    </Box>
                    <Devider flexItem className={classes.hr}/>
                    <Box className={classes.box}>
                        Thank you for verifying your account. You can now continue to use BarefootNomad
                    </Box>
                    
                </>) : (
                    (!error ? (
                        <Box>
                            <Skeleton variant="text" width={300} height={40}/>
                            <Skeleton variant="text" width={300} height={40}/>
                        </Box>
                    ) : (
                        <Box className={classes.tokenMissing}>
                            { JSON.stringify(error).replace(/['"]+/g, '')}
                        </Box>
                    ))
                    
                )}
                { !error && !verified ? (
                    <Skeleton variant="rect" width={70} height={50} style={{marginLeft: 'auto', marginRight: 'auto'}}/>
                ) : (
                    <Button variant="contained" color="primary" href='/'> Go Home</Button>
                )}
                
            </Box>
            
        </div>
        
        
    )
}

export default verifyAccount