import { makeStyles } from '@material-ui/core'
import React, {Component, useEffect} from 'react'
import Devider from '@material-ui/core/Divider'
import { connect, useDispatch } from 'react-redux'
import { getAccommodations } from '../../../redux/actions/fetchAccommodations'
import { getLocations } from '../../../redux/actions/fetchLocationsAction'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'400px',
        textAlign:'center',
        color:'#257AAA',
    },
    counter:{
        display:'flex',
        margin:'20px'
    },
    hr:{
        height: 'unset',
        border: '1px solid',
        margin: '0 5px',
        color: '#257AAA'
    }
  }))
function TravelAdmin(props){
    const dispatch = useDispatch()
    const classes = useStyles()
    
    useEffect(() => {
        props.getLocations()
        props.getAccommodations()
      }, [])

    const skeletonData = (<Skeleton variant='text' width='200px'/>)

    console.log(props.locationsData.pending)
    return(
        <div className={classes.container}>
            <div >
                <p>Welcome back the adminstrator!</p>
                <p>This is how your system looks so far</p>
            </div>
            {props.locationsData.pending 
            ? skeletonData 
            :(<div className={classes.counter}>
                <div>{ props.locationsData.count} locations </div>
                <Devider className={classes.hr}/>
                <div>{props.accommodationsData.count} accommodations</div>
            </div>)
            }
        </div>
        
    )
}

const mapStateToProps = state => ({
    locationsData: state.fetchLocations,
    accommodationsData: state.fetchAccommodations,

})

export default connect(mapStateToProps,{getLocations, getAccommodations})(TravelAdmin)