import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Place } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: theme.palette.primary
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
        <CardMedia
          className={classes.media}
          image={props.accommodation.image}
          title={props.accommodation.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.accommodation.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.accommodation.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" startIcon={<Place />}>
          {props.accommodation.location}
        </Button>
      </CardActions>
    </Card>
  );
}

export default Accommodations