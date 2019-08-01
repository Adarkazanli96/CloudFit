import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./js/pages/NotFound";
import Lander from "./js/pages/Lander";
import AuthenticatedRoute from "./js/containers/AuthenticatedRoute";
import UnauthenticatedRoute from "./js/containers/UnauthenticatedRoute";

import LogsPage from './js/pages/LogsPage'
import BookmarksPage from './js/pages/BookmarksPage'
import StreamsPage from './js/pages/StreamsPage'



export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Lander} props={childProps} />
  <AuthenticatedRoute path = "/streams" exact component = {StreamsPage} props = {childProps}/>
  <AuthenticatedRoute path = "/logs" exact component = {LogsPage} props = {childProps}/>
  <AuthenticatedRoute path = "/bookmarks" exact component = {BookmarksPage} props = {childProps}/>
    <Route component={NotFound} />
  </Switch>;