import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    tabs:{  
        display: 'flex',
        flexGlow : 2,
        justifyContent : 'center',
        backgroundColor: theme.palette.background.paper,
    },
});

function LinkTab (props){
    return(
        <Link  to={props.href} onClick={props.onClick} style={{textDecoration: 'none', color:'#646464'}} >
            <Tab label={props.label}/>
        </Link>
    )
}
function TabBar(props){
    const {classes} = props;
    return (
        <AppBar  position="static" color="default">
            <div className={classes.tabs}>
            <Tabs
                value={props.value}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
            >
                <LinkTab href="/list" label="list" onClick={props.onChange(0)} />
                <LinkTab href="/write" label="write" onClick={props.onChange(1)} />
                <LinkTab href="/list" label="etc" onClick={props.onChange(2)} />
                <LinkTab href="/list" label="etc" onClick={props.onChange(3)} />
                <LinkTab href="/list" label="etc" onClick={props.onChange(4)} />
                <LinkTab href="/list" label="etc" onClick={props.onChange(5)} />
                
            </Tabs>
            </div>
        </AppBar>
    );
}

export default withStyles(styles)(TabBar);