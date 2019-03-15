import React from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  drawer: {
    display : 'flex',
    justifyContent : 'center',
    width : 'auto',
  },
  menuLink:{
    textDecoration : 'none',
  },
};
  

class MenuDrawer extends React.Component{
    constructor(props){
        super(props);
        this.state={
          item : ['Write', 'Starred', 'Send email'],
          item2 : ['Drafts','All mail', 'Trash', 'Spam'],
        }
    }
    render(){
        const { classes } = this.props;
        const draweritems = (
            <div className={classes.drawer}>
              <List>
                {this.state.item.map((text, index) => (
                  <a className={classes.menuLink} href={`./${text}`}><ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem></a>
                ))}
              </List>
              <List>
                {this.state.item2.map((text, index) => (
                  <a className={classes.menuLink} href={`./${text}`}><ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem></a>
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

export default withStyles(styles)(MenuDrawer);