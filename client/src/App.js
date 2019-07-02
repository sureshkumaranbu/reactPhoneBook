import './App.css';

import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './components/pages/About';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts'
import AuthState from './context/auth/AuthState'
import ContactState from './context/contact/ContactState';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute'
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              
            </Switch>
          </div>
        </Fragment>
      </Router>
      </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
