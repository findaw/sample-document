import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';
import DocumentView from './DocumentView';
import DocumentWrite from './DocumentWrite';
import DocumentList from './DocumentList';

const styles = theme => ({
    tabs:{  
        display: 'flex',
        flexGlow : 2,
        justifyContent : 'center',
        backgroundColor: theme.palette.background.paper,
    },
});

class TabBarRouter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value : 0,
        }
    }
    handleChange = (e, value) => {
        this.setState({ value });
      };
    render() {
        const {classes} = this.props;
        return (
          <div>
              <AppBar  position="static" color="default">
                <div className={classes.tabs}>
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                  >
                      <Tab label="list" />
                      <Tab label="view" />
                      <Tab label="write" />
                      <Tab label="etc" />
                      <Tab label="etc" />
                      <Tab label="etc" />
                      <Tab label="more" />
                  </Tabs>
                </div>
              </AppBar>
                <div>
                  {this.state.value === 0 && <DocumentList/>}
                  {this.state.value === 1 && <DocumentView/>}
                  {this.state.value === 2 && <DocumentWrite/>}
                  
                </div>
          </div>
        );
    }
}

export default withStyles(styles)(TabBarRouter);