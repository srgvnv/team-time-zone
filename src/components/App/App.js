import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import TimeZones from '../TimeZones/TimeZones';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={TimeZones} />
        <Route path="/users" component={Users} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
