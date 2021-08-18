import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup"
import PokeNews from "./containers/PokeNews"
import Trainer from "./containers/Trainer"
import Search from "./containers/Search"
import NotFound from "./common/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} props={childProps} />
      <AppliedRoute path="/login" exact component={Login} props={childProps} />
      <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
      <AppliedRoute path="/pokenews" exact component={PokeNews} props={childProps} />
      <AppliedRoute path="/trainer" exact component={Trainer} props={childProps} />
      <AppliedRoute path="/search" exact component={Search} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
