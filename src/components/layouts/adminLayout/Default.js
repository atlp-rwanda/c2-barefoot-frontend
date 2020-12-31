import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import AdminNavBar from '../../adminNavbar'



const useStyles = makeStyles(() => ({
  
  content: {
    height: '100%'
  }
}));

const DefaultM = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div >
      <AdminNavBar/>
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