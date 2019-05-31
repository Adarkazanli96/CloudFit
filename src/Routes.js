import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home'
import NotFound from "./containers/NotFound";
import Login from './containers/Login'
import AppliedRoute from "./components/AppliedRoute";
import NewNote from "./containers/NewNote";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/" exact component={NewNote} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;