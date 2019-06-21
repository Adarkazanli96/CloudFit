import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from './containers/Login'
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import LogsPage from './containers/LogsPage'
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Home} props={childProps} />
    {/*     <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />*/}
  <AuthenticatedRoute path = "/logs" exact component = {LogsPage} props = {childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;