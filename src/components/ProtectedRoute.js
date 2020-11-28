import { Redirect, Route } from 'react-router-dom';
import HOC from './HOC';

const ProtectedRoute = (props) => {
    const {component, userRole, ...rest} = props;

    const redirectToDesiredDashboard = (userRole) => {
        if(Number(userRole) === 3) {
            return <Redirect to="/admin/home" />
        }
        return <Redirect to="/home" />
    }

    const getReturnableComponent = (props) => {
        const authUserRole = localStorage.getItem('role')
        if(localStorage.getItem('token')) {
            if(authUserRole == userRole) {
                return HOC(component, props);
            } else {
                return redirectToDesiredDashboard(authUserRole);
            }
        } else {
            return (<Redirect to={{ 
                    pathname: "/login",
                    state: { from: props.location } 
                }}
            />)
        }
    }

    return ( <Route {...rest} render={ (props) => {return getReturnableComponent(props)}} /> )
};

export default ProtectedRoute;