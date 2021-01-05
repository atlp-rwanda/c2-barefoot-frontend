import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
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

function Locations(props) {
  const classes = useStyles();
  return (
    
    <Card className={classes.root}>
      <CardActionArea>
        
       { props.pending ? (
         <Skeleton variant='rect' animation="wave" className={classes.media} />
       )
        :(<CardMedia
          className={classes.media}
          image={props.location.link}
          title={props.location.LocationName}/>)}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.pending ? (<Skeleton animation="wave"  width="50%"/>) : (props.location.LocationName)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { props.pending ? (
            <React.Fragment>
              <Skeleton animation="wave"/>
              <Skeleton animation="wave" width='80%' />
            </React.Fragment>) : 
            (props.location.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          { props.pending ? <Skeleton animation='wave' width='100%'/> :"Learn More"}
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
  pending: state.fetchLocations.pending,
})

export default connect(mapStateToProps, null)(Locations);
