import { useRouteMatch, Switch, Route } from 'react-router-dom';
import StartPage from './routes/Start/start';
import BoardPage from './routes/Board/board';
import FinishPage from './routes/Finish/finish';

const GamePage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/`} exact component={StartPage} />
      <Route path={`${match.path}/board`} component={BoardPage} />
      <Route path={`${match.path}/finish`} component={FinishPage} />
    </Switch>
  );
};

export default GamePage;
