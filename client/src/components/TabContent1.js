import React from 'react';
import DocumentWrite from './DocumentWrite';


class TabContent1 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div >
                <DocumentWrite/>
            </div>
        );
    }
}

export default TabContent1;