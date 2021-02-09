import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Checkbox} from '@material-ui/core';
import { Place } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import colors from './colors';
import Ratings from './RatingStars';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 360,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 140
  },
  checkbox:{
      display: 'block',
      position:'absolute',
      color: 'secondary',
      right: 0,
      fontSize:'25px'
  },
  cardActions:{
      display: 'flex',
      flexDirection:'column',
      alignItems:'flex-start',
  },
  reviews:{
      fontSize: '14px',
      color: colors.primary100,
  },
  cardContent:{
    overflow: 'hidden'
  },
  titleText:{
    [theme.breakpoints.down('sm')]:{
      fontSize:'18px',
    }
  }
}));

function Accommodations(props) {
    const classes = useStyles();
    const open = false; 
    const handleSelection = (event) =>{
      const accommodation={
        selected:props.accommodation,
        checked: event.target.checked,
      };
    
      return props.selectAccommodationAction(accommodation);

    }    
    
    
    let check=false;
    props.travelRequest.selectedAccommodation.map( selected =>{
      selected.id === props.accommodation.id ? check=true : null
    })
    const handleViewMore =() =>{
      return props.openModalAction({open: true, data: props.accommodation});
    }


  return (
    <Card className={classes.root} >
      {(props.pending ? 
        <CardActionArea>
          <Skeleton animation="wave" variant="rect" className={classes.media} />
          <CardContent className={classes.cardContent} >
            <Skeleton animation="wave" height={30} width="60%" />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Skeleton animation="wave" height={30} width="60%" />
          </CardActions>
        </CardActionArea>
        :
      <>
      <CardActionArea>
        <Checkbox
        onChange={handleSelection}
        checked={check}
        className={classes.checkbox}/>
        <CardMedia
          onClick={handleViewMore}
          className={classes.media}
          image={props.accommodation.photos}
          title={props.accommodation.title}
        />
        <CardContent onClick={handleViewMore} className={classes.cardContent} >
          <Typography gutterBottom variant="h5" component="h2" className={classes.titleText}>
           {props.accommodation.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap >
            {props.accommodation.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleViewMore} startIcon={<Place color="secondary" />}> {props.accommodation.state}, {props.accommodation.city} </Button>
        <Ratings highRating={3} />
        <Typography className={classes.reviews}>
            25 Reviews
        </Typography>
      </CardActions>
      </>
      )}
    </Card>
  );
}

export default Accommodations;
