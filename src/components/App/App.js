import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import TimeZones from '../TimeZones/TimeZones';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import usersContext from '../../users.context';

function App() {
  const theme = createTheme();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
         <Header setUser={setUser} user={user} />
         <usersContext.Provider value={{ users, setUsers }}>
            <Switch>
              <Route path="/timezones" render={(props) => <TimeZones {...props} users={users}/>} />
              <Route exact path="/" render={(props) => <Users {...props} users={users}/>} />
              <Route path="/profile" render={(props) => <Profile {...props} user={user}/>} />
            </Switch>
        </usersContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
