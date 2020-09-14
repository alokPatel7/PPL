import React from 'react';
import { render } from 'react-dom';

class Logout extends React.Component{
    constructor(props){
    super(props);
    let id = localStorage.getItem('currentUserId');
    if(id){
        localStorage.removeItem("currentUserId");
        this.props.history.push('/');
    }else{
        this.props.history.push('/')
    }
    }

    render(){
        return(
            <div></div>
        );
    }
}
export default Logout;