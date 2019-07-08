import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from './components/Forms/Login'
import AppliedRoute from "./containers/AppliedRoute";
import Lander from "./pages/Lander";
import Signup from "./components/Forms/Signup";
import AuthenticatedRoute from "./containers/AuthenticatedRoute";
import UnauthenticatedRoute from "./containers/UnauthenticatedRoute";

import LogsPage from './pages/LogsPage'
import BookmarksPage from './pages/BookmarksPage'



export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Lander} props={childProps} />
  <AuthenticatedRoute path = "/logs" exact component = {LogsPage} props = {childProps}/>
  <AuthenticatedRoute path = "/bookmarks" exact component = {BookmarksPage} props = {childProps}/>
    <Route component={NotFound} />
  </Switch>;