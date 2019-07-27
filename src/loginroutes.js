import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Elements/Login/login.js";

class LoginRoute extends Component {
    render(){
        return(
            <Switch>
                <Route path= '/login' exact component = {Login}/>
            </Switch>
        )
    }
}
export default LoginRoute;