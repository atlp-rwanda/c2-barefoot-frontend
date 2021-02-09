import { makeStyles } from '@material-ui/core'
import React, { Component } from  'react'
import CreateAccommodations from '../../accommodations'
  
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: 345,
        color: 'red'
    },
    Button:{
        color: 'red'
    }
  }));

export class createAccomodations extends Component {
    render(){
        return(
            <div style={{maxWidth:'800px',margin:'auto', padding:'10px'}}>
                <CreateAccommodations/>
            </div>
        )
    }
    
}
