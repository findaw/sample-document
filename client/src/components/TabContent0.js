import React from 'react';
import DocumentList from './DocumentList';



class TabContent0 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <DocumentList />
            </div>
        );
    }
}

export default TabContent0;