import React, {  useState } from 'react';
import { Switch, withRouter, Redirect, Route } from 'react-router-dom';
import Courses from '../../pages/Courses';
import Login from '../../pages/Login';




function App() {
  const [isLoggedIn, setLoggedState] = useState(false);
  const [isLoading, setLoading] = useState(true);
  return (


    <Switch>
      <Route exact path="/">{isLoggedIn ? <Redirect to="/courses" /> : <Redirect to="/login" />} </Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/courses"><Courses /></Route>
    </Switch>


  );
}

export default withRouter(App);
