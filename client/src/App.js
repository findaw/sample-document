import React, { Component } from 'react';
import './App.css';
import {withStyles} from '@material-ui/core';
import MainBar from './components/MainBar';
import TabBar from './components/TabBar';
import DocumentList from './containers/DocumentList';
import DocumentView from './containers/DocumentView';
import DocumentWrite from './containers/DocumentWrite';

const styles = theme=>({
  app : {
      
  },
})

class App extends Component {
  constructor(props){ 
    super(props);
    this.state={
      tabValue : 0,
    }
  }
  handleTabBarChange = (evnet,value)=>{
    this.setState({tabValue : value});
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.app}>
        <MainBar />
        <TabBar  onChange={this.handleTabBarChange} value={this.state.tabValue}/>
        <div>
          {this.state.tabValue === 0 && <DocumentList/>}
          {this.state.tabValue === 1 && <DocumentView/>}
          {this.state.tabValue === 2 && <DocumentWrite/>}
          
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(App);
