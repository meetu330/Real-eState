import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Component/Admin/Pages/Home";
import Propertiescreate from "./Component/Admin/Pages/Propertiescreate";
import Calander from "./Component/Admin/Pages/Calander";
import Register from "./Component/User/Register";
import Login from "./Component/User/Login";
import 'animate.css';
import ForgotPassword from "./Component/User/ForgotPassword";
import ChangePassword from "./Component/User/ChangePassword";

const App = () => {

  var userId = localStorage.getItem('userId');

return (
<div> 
    <Router>
    <Switch>

          <Route exact path="/dashboard" component={userId ? Home : Login} />
          <Route exact path="/propertiescreate" component={userId ? Propertiescreate : Login} />
          <Route exact path="/calander" component={Calander} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route default path="/" component={Login} />
          
    </Switch>
    </Router>
  </div>
);
};

export default App;