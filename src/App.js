import React from 'react';
import Header from './componentes/Header.js';
import Timeline from './componentes/Timeline.js';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';

const store = createStore(timeline, applyMiddleware(thunkMiddleware));

function App(match) {

  let possuiLogin;
  if(match?.match?.params)
    possuiLogin = match.match.params["login"];  

  return (
    <div id="root">
      <div className="main">
        <Header store={ store } />
        <Timeline login={possuiLogin} store={store}/>
      </div>
    </div>
  );
}
export default App;