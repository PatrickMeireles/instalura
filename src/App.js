import React from 'react';
import Header from './componentes/Header.js';
import Timeline from './componentes/Timeline.js';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import TimeLineStore from './logicas/TimelineStore';

const timeLineStore = new TimeLineStore([]);

function App(match) {

  let possuiLogin;
  if(match?.match?.params)
    possuiLogin = match.match.params["login"];  

  return (
    <div id="root">
      <div className="main">
        <Header store={ timeLineStore } />
        <Timeline login={possuiLogin} store={ timeLineStore }/>
      </div>
    </div>
  );
}

export default App;