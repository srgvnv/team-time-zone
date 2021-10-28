import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Header from '../Header/Header';
import TimeZones from '../TimeZones/TimeZones';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import usersContext from "../../users.context";

const useStyles = makeStyles((theme) => ({
  loginButtonBox: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

function App() {
  const theme = createTheme();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  const loginSuccess = (response) => {
    setUser(response.profileObj);
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
         <usersContext.Provider value={{ users, setUsers }}>
            <Switch>
              <Route path="/timezones" render={(props) => <TimeZones {...props} users={users}/>} />
              <Route exact path="/" render={(props) => <Users {...props} users={users}/>} />
              <Route path="/profile" render={(props) => !user
                  ?
                  <Box mt={24} className={classes.loginButtonBox}>
                      <GoogleLogin
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          buttonText="Login with Google"
                          onSuccess={loginSuccess}
                          cookiePolicy={'single_host_origin'}
                          isSignedIn={true}
                      />
                  </Box>
                  : <Profile {...props} user={user}/>} />
            </Switch>
        </usersContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
