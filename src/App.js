import {
  useLocation,
  useRouteMatch,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import classNames from 'classnames';

import Footer from './components/Footer/footer';
import MenuHeader from './components/MenuHeader/MenuHeader';
import GamePage from './routes/Game/game';
import HomePage from './routes/Home/home';
import AboutPage from './routes/About/about';
import ContactPage from './routes/Contacts/contact';
import NotFound from './routes/NotFound/NotFound';
import { FireBaseContext } from './context/firebaseContext';
import Firebase from './service/firebase';

import s from './App.module.css';

const App = () => {
  const location = useLocation();
  const isPadding =
    location.pathname === '/' || location.pathname === '/game/board';

  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={classNames(s.wrap, { [s.isHomePage]: isPadding })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/NotFound" component={NotFound} />
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
    </FireBaseContext.Provider>
  );
};

export default App;
