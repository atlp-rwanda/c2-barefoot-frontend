import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import AccommodationCard from './AccommodationCard';
import { getAccommodations, getSingleAccommodation } from '../../../redux/actions/fetchAccommodations'
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        padding:10,
        flexWrap: 'wrape',
        '@media(max-width:560px)':{
          display:'block'
        }
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

const accommodationSkeleton = <Grid item xs={12} sm={6} md={4}> <AccommodationCard/> </Grid>

function ListAccommodation(props) {
  const [page, setPage] = React.useState(1);
  const classes = useStyles();
  const pageNumber = Math.ceil(props.accommodationsData.count / 2)
  useEffect(() => {
    props.getAccommodations(page)
  }, [])
  const handleChange = (event, value) => {
    setPage(value);
    props.getAccommodations(value)
  };

  console.log(props.accommodationsData.count)
  return (
    <>
      <Box className={classes.root}>
          {props.accommodationsData.pending ? accommodationSkeleton : props.accommodationsData.accommodations.map((accommodation)=> (
              <Grid item xs={12} sm={6} md={4} className={classes.paper} key = {accommodation.id}>
                  <AccommodationCard accommodation={accommodation} singleAccommodation={props.singleAccommodationData}/>
              </Grid>
          ))}
      </Box>
      <Box className={classes.paginationBox}>
        <div className={classes.pagination}>
          <Pagination count={pageNumber} page={page} onChange={handleChange} />
        </div>
      </Box>
    </>
  );
}

const mapStateToProps = state => ({
    accommodationsData: state.fetchAccommodations,
    singleAccommodationsData: state.fetchSingleAccommodations
  })
  
const actions = {getAccommodations, getSingleAccommodation}
  export {ListAccommodation}
  export default connect(mapStateToProps, actions)(ListAccommodation)
  
  