  
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ManagerNav from '../../ManagerNav'
import Footer from './Footer'


const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
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
      <ManagerNav/>
      {/* <div className={classes.toolbar} /> */}
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