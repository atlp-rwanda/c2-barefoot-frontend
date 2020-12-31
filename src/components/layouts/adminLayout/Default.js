import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AdminNavBar from '../../adminNavbar'
import Footer from '../../Footer'


const useStyles = makeStyles(() => ({
  
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }
}));

const DefaultM = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div >
      <AdminNavBar/>
      <main className={classes.content}>
        {children}
      </main>
      <Footer/>
    </div>
  );
};

DefaultM.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default DefaultM;