import React from 'react';
import TabContent0 from './TabContent0';
import TabContent1 from './TabContent1';
import TabContent2 from './TabContent2';

class TabContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {this.props.value===0 && <TabContent0/>}
                {this.props.value===1 && <TabContent1/>}
                {this.props.value===2 && <TabContent2/>}
            </div>
        );
    }
}
export default TabContainer;