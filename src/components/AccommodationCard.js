import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import { Place } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { connect } from 'react-redux'



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 140
  },
}));

function Accommodations(props) {
  
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        { props.pending ? 
        (<Skeleton variant='rect' animation="wave" className={classes.media} />)
        :
        (<CardMedia
          className={classes.media}
          image={props.accommodation.photos}
          title={props.accommodation.title}
        />)}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           { props.pending ? (<Skeleton animation="wave" width="50%"/>)
           : (props.accommodation.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { props.pending ? 
            (<React.Fragment>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width='80%' />
            </React.Fragment>)
            : (props.accommodation.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {props.pending ? (<Skeleton animation='wave' width='20%' height='20px' />) :
        <Button size="small" color="primary" startIcon={<Place />}> {props.accommodation.city} </Button>
      }
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
  pending: state.fetchAccommodations.pending,
})

export default connect(mapStateToProps, null)(Accommodations);
