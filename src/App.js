import {
  useLocation,
  useRouteMatch,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import classNames from 'classnames';

import { NotificationContainer } from 'react-notifications';

import Footer from './components/Footer/footer';
import MenuHeader from './components/MenuHeader/MenuHeader';
import GamePage from './routes/Game/game';
import HomePage from './routes/Home/home';
import AboutPage from './routes/About/about';
import ContactPage from './routes/Contacts/contact';
import NotFound from './routes/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAsynch, selectUserLoading } from './store/user';
import s from './App.module.css';
import UserPage from './routes/User/UserPage';

const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding =
    location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsynch());
  }, []);

  if (isUserLoading) {
    return 'Loading...';
  }

  return (
    <>
      <Switch>
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={classNames(s.wrap, { [s.isHomePage]: isPadding })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/contact" component={ContactPage} />
                <PrivateRoute path="/NotFound" component={NotFound} />
                <PrivateRoute path="/user" component={UserPage} />

                <Route
                  path="/about"
                  render={() => <h1> This is page About! </h1>}
                />
                <Route render={() => <Redirect to="/NotFound" />} />
              </Switch>
            </div>

            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  );
};

export default App;
