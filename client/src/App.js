import React, { Component } from 'react';
import './App.css';
import MainBar from './components/MainBar';
import TabBarContainer from './components/TabBarContainer';
import {withStyles} from '@material-ui/core';

const styles = theme=>({
  app : {
      
  },
})

class App extends Component {
  constructor(props){ 
    super(props);

  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.app}>
        <MainBar />
        <TabBarContainer />
      </div>
    );
  }

}

export default withStyles(styles)(App);
