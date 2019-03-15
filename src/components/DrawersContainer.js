import React from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
    drawer: {
      width: 'auto',
    },
  };
  

class DrawersContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;
        const draweritems = (
            <div className={classes.drawer}>
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
        );
        return(
            <Drawer anchor="top" open={this.props.isOpen} onClose={this.props.toggleDrawer('isOpen', false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={this.props.toggleDrawer('isOpen', false)}
                onKeyDown={this.props.toggleDrawer('isOpen', false)}
            >
                {draweritems}
            </div>
            </Drawer>
        );
    }
}

export default withStyles(styles)(DrawersContainer);