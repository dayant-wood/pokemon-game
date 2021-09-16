import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import Footer from './components/Footer/footer';
import MenuHeader from './components/MenuHeader/MenuHeader';
import GamePage from './routes/Game/game';
import HomePage from './routes/Home/home';
import AboutPage from './routes/About/about';
import ContactPage from './routes/Contacts/contact';
import NotFound from './routes/NotFound/NotFound';
import s from './App.module.css';
import About from './routes/About/about';

const App = () => {
  const match = useRouteMatch('/');
  console.log(match);
  return (
    <Switch>
      <Route path="/NotFound" component={NotFound} />

      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <div
            className={classNames(s.wrap, { [s.isHomePage]: match.isExact })}
          >
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/game" component={GamePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />

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
  );
};

export default App;
