import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NavBar from '../NavBar'
import Footer from '../Footer'
import { SideBar } from '../sideNav';
import header from '../../AuthorizedUserNavBar'


const useStyles = makeStyles(() => ({
  
  content: {
    height: '100%',
    // paddingLeft:'220px',
    marginBottom:'70px',
    '@media(max-width:840px)':{
      paddingLeft:'inherit'
    }
  }
}));

const TravelAdminDefault = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div >
      <NavBar />
      {/* <SideBar/> */}
      <main className={classes.content}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

TravelAdminDefault.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default TravelAdminDefault;