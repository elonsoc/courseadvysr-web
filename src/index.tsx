import ReactDOM from "react-dom";
import React from "react";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";
import Schedule from "./pages/Schedule";


ReactDOM.render(
  // Commenting out React.StrictMode due to React-Table problem:
  // https://github.com/tannerlinsley/react-table/issues/2171
  // Some say that StrictMode does not affect Prod builds?
  // <React.StrictMode>


    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/courses">
          <Courses />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/schedule">
          <Schedule />
        </Route>
        <Route exact path="/me">
          <Me />
        </Route>
      </Switch>
    </BrowserRouter>
,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
