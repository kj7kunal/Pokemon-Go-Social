import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup"
import NotFound from "./common/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} props={childProps} />
      <AppliedRoute path="/login" exact component={Login} props={childProps} />
      <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
