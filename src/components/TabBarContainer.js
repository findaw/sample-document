import React from 'react';
import TabContainer from './TabContainer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';

const styles = theme => ({

    tabs:{  
        display: 'flex',
        flexGlow : 2,
        justifyContent : 'center',
        backgroundColor: theme.palette.background.paper,
    },
  });

class TabBarContainer extends React.Component{
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
                      <Tab label="main" />
                      <Tab label="case" />
                      <Tab label="document" />
                      <Tab label="more" />
                      <Tab label="etc" />
                      <Tab label="etc" />
                      <Tab label="etc" />
                      <Tab label="etc" />
                  </Tabs>
                </div>
              </AppBar>
                <div>
                  <TabContainer value={this.state.value}/>
                </div>
          </div>
        );
    }
}

export default withStyles(styles)(TabBarContainer);