import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import routers from "@/router";
import Menu from "./menu";
const Layout = () => {
  return (
    <div className="childapp_content">
      <BrowserRouter basename={process.env.baseName}>
        <Menu />
        <div className="wrap_content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routers.map((item) => {
              return <Route component={item.component} path={item.path} key={item.name} exact={item.exact || false} />;
            })}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default Layout;
