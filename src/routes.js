import Admin from "./containers/admin/Admin";
import Home from "./containers/home/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";

export const routes = [
    {
        isPublic: true,
        path: "/login",
        component: Login
    },
    {
        isPublic: true,
        path: "/register",
        component: Register
    },
    {
        isPublic: false,
        path: "/home",
        component: Home,
        userRole: 1
    },
    {
        isPublic: false,
        path: "/admin/home",
        component: Admin,
        userRole: 3
    },
    {
        isPublic: true,
        path: "/",
        exact: true,
        component: Login
    },
]