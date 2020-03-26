import React from 'react';
import Header from './componentes/Header.js';
import Timeline from './componentes/Timeline.js';
import './css/reset.css';
import './css/timeline.css';

function App() {
  return (
    <div id="root">
    <div className="main">
       <Header/>
      <Timeline/>
    </div>
  </div>
  );
}

export default App;
