import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import TimeZones from '../TimeZones/TimeZones';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

function App() {
  const theme = createTheme();
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header setUser={setUser} user={user} />
        <Switch>
          <Route exact path="/" component={TimeZones} />
          <Route path="/users" component={Users} />
          {user ?
            <Route path="/profile" render={(props) => <Profile {...props} user={user}/>} />
            : null
          }
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
