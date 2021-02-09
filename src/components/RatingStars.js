import React from 'react';
import { Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const RatingStars = (props) =>{
    return (
        <Grid container>
            <Rating name="read-only" value={props.highRating} readOnly />
        </Grid>
    )
}

export default RatingStars;