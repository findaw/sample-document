import React from 'react';
import DocumentView from './DocumentView';



class TabContent0 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <DocumentView />
            </div>
        );
    }
}

export default TabContent0;