import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import LocationCard from './locationCard';
import { getLocations } from '../../../redux/actions/fetchLocationsAction'
import { Pagination } from '@material-ui/lab';

// const useStyles={}
// redirect a user if he not in a suitable land 

   const useStyles = makeStyles((theme) => ({
      root:{
          display:'flex',
          flexWrap: 'wrap',
          padding:10,
          // '@media(max-width:560px)':{
          //   display:'flex'
          // }
      },
      paper: {
          padding: theme.spacing(2),
          color: theme.palette.text.secondary,
        },
      pagination: {
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        padding:'inherit'
      },
      paginationBox: {
        display: 'flex',
        justifyContent: 'center'
      }
  }));
  const locationSkeleton = (<Grid item xs={12} sm={6} md={4}> <LocationCard/> </Grid>)

  function ListLocations(props) {
    const [page, setPage] = React.useState(1);
    const classes = useStyles();
    const pageNumber = Math.ceil(props.locationsData.count / 5)
    // console.log(pageNumber)
    // console.log(props)
    useEffect(() => {
      props.getLocations(page)
    }, [])
    const handleChange = (event, value) => {
      setPage(value);
      props.getLocations(value)
    };

    // console.log(props.deleteLocationData)
    return (
      <>
        <Box className={classes.root}>
            {props.locationsData.pending ? locationSkeleton :props.locationsData.locations.map((location) => (
                <Grid item xs={12} sm={6} md={4} className={classes.paper} key = {location.id}>
                  <LocationCard location={location}/>
                </Grid>
              ))}
            {/* <LocationCard/> */}
        </Box>
        <Box className={classes.paginationBox}>
          <div className={classes.pagination}>
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination count={pageNumber} page={page} onChange={handleChange} />
          </div>
        </Box>
      </>
    );
  }

  const mapStateToProps = state => ({
      locationsData: state.fetchLocations,
      deleteLocationData: state.deleteLocation
    })

    export {ListLocations}
    export default connect(mapStateToProps, { getLocations })(ListLocations)
  
  
  