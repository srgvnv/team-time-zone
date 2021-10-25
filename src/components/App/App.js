import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import TimeZones from '../TimeZones/TimeZones';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path="/" component={TimeZones} />
          <Route path="/users" component={Users} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
