import { getUser } from "./service/auth";
import { Route , Redirect } from "react-router-dom"
import { Component } from "react";

const AdminRoute = ({component:Component,...rest}) => (
    <Route
        {...rest}
        render = {props => 
            getUser() ? (<Component {...props}/> ) : (<Redirect to={{pathname:"/login",state:{from:props.location}}}/>)
        }
    />
)

export default AdminRoute

