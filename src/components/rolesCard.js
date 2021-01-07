import React from "react";
import { Card, CardContent, Typography, CardActions, IconButton, makeStyles, CardActionArea } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import {connect} from 'react-redux'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ABD5ED',
    borderRadius: 0
  }
}))

function RolesCard(props) {
  const classes = useStyles()
  return (
      <div className={classes.root}>

        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography  variant='h6' component='h2'>{props.pending ? (<Skeleton variant='text'/>) : props.roleTitle}
              </Typography>
            </CardContent>

          </CardActionArea>
          <CardActions>
            <IconButton>
              <Delete color='secondary'/>
            </IconButton>
          </CardActions>
        </Card>
        </div>
  );
}

const mapStateToProps = state => ({
  pending: state.roles.pending
})

export default connect(mapStateToProps, null)(RolesCard)