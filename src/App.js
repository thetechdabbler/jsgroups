import './App.css';
import { lazy, Suspense } from 'react';
import Register from './containers/Register';
import Login from "./containers/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import NoMatch from './components/NoMatch';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Spinner from './utilComponents/Spinner/Spinner';
import Home from './containers/home/Home';
import Admin from './containers/admin/Admin';
import { routes } from './routes';

// const Home = lazy(() => import('./containers/home/Home'));
// const Admin = lazy(() => import('./containers/Admin/Admin'));

toast.configure()



function App(props) {
  const publicRoute = (route) => {
    return (
      <PublicRoute
        key={route.path}
        path={route.path}
        exact={route.exact ? true : false}
        component={route.component} />
    )
  }
  
  const privateRoute = (route) => {
    return (
      <ProtectedRoute
          key={route.path}
          path={route.path}
          exact={route.exact ? true : false}
          component={route.component}
          userRole={route.userRole}
      />
    )
  }
  
  const routesComponents = routes.map(route => {
    if (route.isPublic) {
        return publicRoute(route);
    } else {
      return privateRoute(route);
    }
  });

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>...Loading</div>}>
          <Switch>
            {routesComponents}
            {/* <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <ProtectedRoute path="/home" userRole="1" component={Home} />
            <ProtectedRoute path="/admin/home" userRole="2" component={Admin} />
            <PublicRoute path="/" exact component={Login} /> */}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
          <Spinner />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;