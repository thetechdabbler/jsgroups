import Home from "./containers/user/home/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import * as URL from "./appUrlConstants";
import AdminHome from "./containers/admin/home/AdminHome";

export const routes = [
  {
    isPublic: true,
    path: URL.APP_LOGIN_URL,
    component: Login,
  },
  {
    isPublic: true,
    path: URL.APP_REGISTER_URL,
    component: Register,
  },
  {
    isPublic: false,
    path: URL.APP_USER_HOME,
    component: Home,
    userRole: 1,
  },
  {
    isPublic: false,
    path: URL.APP_ADMIN_HOME,
    component: AdminHome,
    userRole: 3,
  },
  {
    isPublic: true,
    path: URL.APP_ROOT_URL,
    exact: true,
    component: Login,
  },
];
