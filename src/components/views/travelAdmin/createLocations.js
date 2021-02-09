import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React, { Component } from  'react'
import CreateLocations from '../../locations'

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: 345,
        color: 'red'
    },
    Button:{
        color: 'red'
    }
  }));
  
export class createLocation extends Component {
    render(){
        // const classes = useStyles();
        return(
            <div >
                <CreateLocations/>
            </div>
        )
    }
    
}
