import React, { Component } from 'react';
import './App.css';
import {withStyles} from '@material-ui/core';
import MainBar from './components/MainBar';
import TabBar from './components/TabBar';
import {Route} from 'react-router-dom';
import {DocumentList,DocumentView, DocumentWrite} from './containers/pages';

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
  handleTabBarChange = value =>event=>{
    this.setState({tabValue : value});
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.app}>
        <MainBar />
        <TabBar  onChange={this.handleTabBarChange} value={this.state.tabValue}/>
        <div>
          <Route exact path="/" component={DocumentList}/>
          <Route exact path="/list" component={DocumentList} />
          <Route path="/write" component={DocumentWrite} />
          <Route path="/view/:id" render={() => (<DocumentView/>)} />
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(App);
