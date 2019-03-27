import React from 'react';
import TabContent0 from './TabContent0';
import TabContent1 from './TabContent1';
import TabContent2 from './TabContent2';
import { withStyles } from '@material-ui/core';

const styles = theme=>({
    tabContainer:{
        
    },
})
class TabContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {classes} = this.props
        return(
            <div className={classes.tabContainer}>
                {this.props.value===0 && <TabContent0/>}
                {this.props.value===1 && <TabContent1/>}
                {this.props.value===2 && <TabContent2/>}
            </div>
        );
    }
}
export default withStyles(styles)(TabContainer);