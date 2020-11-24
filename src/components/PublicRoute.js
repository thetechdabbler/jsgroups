import { Redirect, Route } from "react-router-dom";
import HOC from "./HOC";

const PublicRoute = ({component, ...rest})  => {
    const getReturnableComponent = (props) => {
        if(!localStorage.getItem('token')) {
            return HOC(component, props);
        } else {
            return (<Redirect to="/home"/>)
        }
    }
    return ( <Route {...rest} render={ (props) => {return getReturnableComponent(props)}} /> )
}

export default PublicRoute;
