import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from './containers/Login'
import AppliedRoute from "./components/AppliedRoute";
import Lander from "./containers/Lander";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import LogsPage from './containers/LogsPage'
import BookmarksPage from './containers/BookmarksPage'



export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Lander} props={childProps} />
    {/*     <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />*/}
  <AuthenticatedRoute path = "/logs" exact component = {LogsPage} props = {childProps}/>
  <AuthenticatedRoute path = "/bookmarks" exact component = {BookmarksPage} props = {childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;