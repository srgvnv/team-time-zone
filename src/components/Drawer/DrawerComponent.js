import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const useStyles = makeStyles(()=>({
  link: {
    textDecoration: 'none',
    color: 'blue',
  },
  icon: {
    color: '#fff'
  }
}));

function DrawerComponent(props) {
  const classes = useStyles();
  const {setUser, user} = props;

  const loginSuccess = (response) => {
    setUser(response.profileObj);
  }

  const logOutSuccess = () => {
    setUser(null);
  }

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box ml="auto">
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>Time zones</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/users" className={classes.link}>Users</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          {user
            ? <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/profile" className={classes.link}>Profile</Link>
                </ListItemText>
              </ListItem>
            : null
          }
          <Divider/>
          {user ? <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onLogoutSuccess={logOutSuccess}
              render={(renderProps) => {
                return <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <a href={'/'} onClick={renderProps.onClick}>Logout</a>
                  </ListItemText>
                </ListItem>
              }}
            />
            : <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={loginSuccess}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              render={(renderProps) => {
                return <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <a href={'/'} onClick={renderProps.onClick}>Login</a>
                  </ListItemText>
                </ListItem>
              }}
            />
          }
          <Divider/>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon/>
      </IconButton>
    </Box>
  );
}
export default DrawerComponent;
