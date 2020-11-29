import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import NoMatch from './components/NoMatch';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Spinner from './utilComponents/Spinner/Spinner';
import { routes } from './routes';
import Auth from './auth/Auth';

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
      <Auth>
        <Router>
          <Suspense fallback={<div>...Loading</div>}>
            <Switch>
              {routesComponents}
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
            <Spinner />
          </Suspense>
        </Router>
      </Auth>
    </div>
  );
}

export default App;