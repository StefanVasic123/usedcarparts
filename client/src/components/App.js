import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Add from './pages/home/Add';
import Search from './pages/home/Search';

const history = createHistory();

function App() {
  return (
  <Router history={history} basename={process.env.PUBLIC_URL}>
      <div>
        <Switch>
          <Route path="/" exact component={withRouter(Landing)} />
          <Route path="/home" component={withRouter(Home)} />
          <Route path="/submit" component={withRouter(Add)} />
          <Route path="/search" component={withRouter(Search)} />
        </Switch>
      </div>
  </Router>
  );
}

export default App;
