import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import DrawerComponent from '../Drawer/DrawerComponent';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import * as React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => ({
  navLinks: {
    marginLeft: theme.spacing(5),
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    marginLeft: theme.spacing(5),
    '&:hover': {
      color: '#ddd',
      borderBottom: '1px solid #fff',
    },
  },
  profile: {
      color: '#fff',
      marginLeft: 'auto',
  }
}));

function Header(props) {
  const {setUser, user} = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const loginSuccess = (response) => {
    setUser(response.profileObj);
  }

  const logOutSuccess = () => {
    setUser(null);
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          TeamTimeZone
        </Typography>
        {isMobile
          ?
            <DrawerComponent setUser={setUser} user={user}/>
          :
            <div className={classes.navLinks}>
                <Link to="/" className={classes.link}>
                    1. Select Users
                </Link>
                <Link to="/timezones" className={classes.link}>
                    2. Compare Time Zones
                </Link>
              {user ?
                  <Link to="/profile" className={classes.profile}>
                          <IconButton>
                              <PersonOutlineIcon style={{fill: "#fff"}} />
                          </IconButton>
                          <GoogleLogout
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onLogoutSuccess={logOutSuccess}
                            render={(renderProps) => {
                              return  <IconButton onClick={renderProps.onClick}>
                                <LogoutIcon style={{fill: "#fff"}} />
                              </IconButton>
                            }}
                          />
                  </Link>
                  : <Link to="/" className={classes.profile}>
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      onSuccess={loginSuccess}
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={true}
                      render={(renderProps) => {
                        return <IconButton onClick={renderProps.onClick}>
                          <LoginIcon style={{fill: "#fff"}} />
                        </IconButton>
                      }}
                    />
                </Link>
              }
            </div>
        }
      </Toolbar>
    </AppBar>
  );
}
export default Header;
