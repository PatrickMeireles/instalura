import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login.js';
import Logout from './componentes/Logout.js';
import { BrowserRouter as Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';
import { createBrowserHistory} from 'history';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';
import {notificacao} from './reducers/header';
import { Provider } from 'react-redux';

const reducers = combineReducers({timeline, notificacao});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function verificaAutenticacao(nextState, replace) { 
  const match = matchPath('/timeline', {
      path: nextState.match.url,
      exact: true
  })  

  let valida = false
  if (match !== null) {
      valida = match.isExact
  }

  if (valida && localStorage.getItem('auth-token') === null) { 
      return <Redirect to={{
          pathname: '/',
          state:  {msg: 'Faça login para acessar esta página'}
      }}/>
  }
  return <App match={nextState.match}/>
}

ReactDOM.render( 
  (
    <Provider store={ store }>
      <Router history={createBrowserHistory}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/timeline/:login?" render={verificaAutenticacao} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Router>
    </Provider>), 

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
