import AdminHome from "./containers/admin/home/AdminHome";
import Home from "./containers/user/home/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import * as url from "../src/appUrlConstants";
import * as roles from './rolesConstants';

export const routes = [
    {
        isPublic: true,
        path: url.APP_LOGIN_URL,
        component: Login,
    },
    {
        isPublic: true,
        path: url.APP_REGISTER_URL,
        component: Register,
    },
    {
        isPublic: false,
        path: url.APP_USER_HOME,
        component: Home,
        userRole: roles.USER_ROLE,
    },
    {
        isPublic: false,
        path: url.APP_ADMIN_HOME,
        component: AdminHome,
        userRole: roles.ADMIN_ROLE,
    },
    {
        isPublic: true,
        path: url.APP_ROOT_URL,
        exact: true,
        component: Login,
    },
];
