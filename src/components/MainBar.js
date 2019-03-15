import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuDrawer from './MenuDrawer';
import { deepOrange } from '@material-ui/core/colors';

class MainBar extends React.Component{
    constructor(props){ 
        super(props);
        this.state={
          isOpen : false
        }
      }
      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.mainBar}>
                <AppBar color="secondary" position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={this.toggleDrawer('isOpen', true)} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    Material-UI
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        }}
                    />
                    </div>
                </Toolbar>
                </AppBar>
                <MenuDrawer isOpen={this.state.isOpen} toggleDrawer={this.toggleDrawer}/>
            </div>
        );
    }
}

const styles = theme => ({
    mainBar: {
        width: '100%',
        minLength : 600,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'block',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      maxLength : 200,
  
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });


export default withStyles(styles)(MainBar);