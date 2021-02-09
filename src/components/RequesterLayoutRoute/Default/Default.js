import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NavBar from '../NavBar'
import Footer from '../../AuthorizeUserFooter'
import { SideBar } from '../sideNav';
import SideDrawer from '../SideDrawer';
import jwt from 'jwt-decode';

const useStyles = makeStyles(() => ({
  
  content: {
    height: '100%',
    marginBottom:'70px'
  }
}));

const RequesterDefault = props => {
  const { children } = props;
  const classes = useStyles();
  useEffect(() =>{
    return Authorization();
  },[])
  const Authorization = () =>{
    const userToken = localStorage.getItem('barefootUserToken');
    if(userToken){
      const decoded = jwt(userToken);
      if(decoded.role === '45429837-ed2c-435d-bc22-ad9c5dbe3782' || decoded.role=== '7254a9e7-2e1b-4f83-ad73-78b90dd3df77'){
        return true;
         
      }
    }
    return props.children.props.history.push('/login'); 
  }

  return (
    <div >
      <NavBar />
      <main className={classes.content}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

RequesterDefault.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default RequesterDefault;