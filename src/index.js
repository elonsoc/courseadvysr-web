import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Courses from "./Courses";
import Login from "./Login";
import Register from "./Register";
import { UserProvider } from './contexts/UserContext';


ReactDOM.render(
  
  <React.StrictMode>
    <UserProvider>
    <BrowserRouter>
    
      <Switch>
        <Route exact path="/">
        
            <App/>
        </Route>
        <Route path="/courses">
          <Courses/>
        </Route>
        <Route path="/login">
          
            <Login/>
          
        </Route>
        <Route exact path="/register">
        
            <Register/>
        </Route>
      </Switch>
      
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
