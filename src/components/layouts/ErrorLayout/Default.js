import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import NavBar from '../../NavBar'



const useStyles = makeStyles(() => ({
  
  content: {
    height: '100vh'
  }
}));

const DefaultM = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div >
      <NavBar />
      <main className={classes.content}>{children}
      
      </main>
    </div>
  );
};

DefaultM.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default DefaultM;