import React, { Component } from 'react';
import './App.css';
import MainBar from './components/MainBar';
import TabBarContainer from './components/TabBarContainer';


class App extends Component {
  constructor(props){ 
    super(props);

  }

  render() {
    return (
      <div>
        <MainBar />
        <TabBarContainer />
      </div>
    );
  }

}

export default App;
