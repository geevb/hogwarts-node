import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import HomePage from './components/homepage/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};
