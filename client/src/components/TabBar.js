import React from 'react';
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

function TabBar(props){
    const {classes} = props;
    return (
        <AppBar  position="static" color="default">
            <div className={classes.tabs}>
            <Tabs
                value={props.value}
                onChange={props.onChange}
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
    );
}

export default withStyles(styles)(TabBar);