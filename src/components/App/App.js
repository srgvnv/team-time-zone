import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Header from '../Header/Header';
import TimeZones from '../TimeZones/TimeZones';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';

const useStyles = makeStyles((theme) => ({
  loginButtonBox: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

function App() {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  const loginSuccess = (response) => {
    setUser(response.profileObj);
  }

  return (
    <BrowserRouter>
      <Header />
      {!user
        ? <Box mt={24} className={classes.loginButtonBox}>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={loginSuccess}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </Box>
        : <Switch>
          <Route exact path="/" component={TimeZones} />
          <Route path="/users" component={Users} />
          <Route path="/profile" render={(props) => <Profile {...props} user={user}/>} />
        </Switch>
      }
    </BrowserRouter>
  );
}

export default App;
