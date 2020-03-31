import React, { Component } from 'react';
import Header from './componentes/Header.js';
import Timeline from './componentes/Timeline.js';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import PropTypes from 'prop-types';
import {ReactReduxContext} from "react-redux";

class App extends Component {
  render() {
      const { login } = this.props.match.params;
      return (
          <ReactReduxContext.Consumer>
              {( {store} ) =>
                  {
                      return (
                          <div id="root">
                              <div className="main">
                                  <Header store={store}/>
                                  <Timeline login={ login }/>
                              </div>
                          </div>
                      )
                  }
              }
          </ReactReduxContext.Consumer>
      );
  }
}

App.contextTypes = {
  store : PropTypes.object.isRequired
}


export default App;