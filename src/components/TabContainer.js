import React, { Component } from 'react';
import TabContainer0 from './TabContainer0';
import TabContainer1 from './TabContainer1';
import TabContainer2 from './TabContainer2';

class TabContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {this.props.value===0 && <TabContainer0/>}
                {this.props.value===1 && <TabContainer1/>}
                {this.props.value===2 && <TabContainer2/>}
            </div>
        )
    }
}
export default TabContainer