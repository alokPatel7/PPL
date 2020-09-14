import React from 'react';

class Demo extends React.Component{
    constructor(props){
        super(props);
        // console.log("this.props in demo === ",this.props);
    }
    click=()=> {
        this.props.someMethod();
    }
    render(){
        return(
            <div>
                <center><div onClick={this.click}>Hello Child </div></center>
                </div>
        );
    }
}

class Parent extends React.Component{
    constructor(props) {
        super(props);
        };

    someMethod =() =>{
        console.log('bar');
    }

    render() {
          return <Demo parentMethod={this.someMethod}>Hello Parent, {this.props.children}</Demo>
    }
}
export default Demo;