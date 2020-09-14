import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class SignUpForm extends React.Component{
    constructor(props){
      super(props);

      this.state = {
            username:"", pwd:"", email:"", fname:"", lname:"",check:false, emsg:false, smsg:false,

          // errors : {
            errusername:"", errpwd:"", erremail:"", errfname:"", errlname:"",
          // }
      }
    }

    componentDidMount(){
      let Id = localStorage.getItem("currentUserId");
      if(Id){
        this.props.history.push('/');
        console.log('wow its working',Id);
      }
    }

    handleChange = (event) =>{
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleChangebox = (event) =>{
      if(this.state.check === false){
        this.setState({check: true});
      }else{
        this.setState({check: false});  
      }
    }

    handleValidation = () =>{
      let formValid = true;
      console.log("this.state == ", this.state.check);

      if(this.state.username.length == '0'){
        formValid = false;
        this.setState({errusername : "Can't be empyt"});
      }
      // else{
      //     if(!this.state.username.match('/^[a-zA-Z]+$/')){
      //       formValid = false;
      //       this.setState({errusername : "Invalid User Name"});
      //       }
            else{
                this.setState({errusername : ""});
            // }
      }
      
      if(this.state.pwd.length == '0'){
        formValid = false;
        this.setState({errpwd : "Can't be empyt"})
      }else{
        if(this.state.pwd.length <= 6 ){
          formValid = false;
          this.setState({errpwd : "Password must be greater than 6 digits"})
        }else{
          this.setState({errpwd : ""});
        }
      }
      
      if(this.state.email.length == '0'){
        formValid = false;
        this.setState({erremail: "Can't be empyt"});
      }else{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!pattern.test(this.state.email)){
          formValid = false;
          this.setState({erremail: "Invalid Email id"});
        }else{
          this.setState({erremail : ""});
        }
      }

      if(this.state.fname.length == '0'){
        formValid = false;
        this.setState({errfname : "Can't be empyt"});
      }else{
        this.setState({errfname : ""});
      }

      if(this.state.lname.length == '0'){
        formValid = false;
        this.setState({errlname : "Can't be empyt"});
      }else{
        this.setState({errlname : ""});
      }

      if(this.state.check === false){
        alert("Please accept Term & Conditions");
        formValid = false;
      }
      
      return formValid; 
    }


    handleSubmit = (event) =>{
      event.preventDefault();

      if(this.handleValidation()){
        axios.post('http://localhost:8000/signup', this.state).then(res =>{
          if(res.data){
            this.setState({smsg:true,emsg:false});
            this.setState(this.state);
          }else{
            this.setState({smsg:false,emsg:true});
          }
        }); 
      }
    }

	render(){
		return(
			<div>
        <meta charSet="utf-8" />
        <title>Create An Account</title>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>

                  { this.state.emsg && <li><span style={{backgroundColor:'red', color:'#fff', textAlign:'center'}}>EmailId is already Registered</span></li>}

                  { this.state.smsg && <li><span style={{backgroundColor:'green', color:'#fff', textAlign:'center'}}>We have save your response</span></li>}

                  <form onSubmit={this.handleSubmit}>
                  <li><span>Username</span><input type="text" name="username" placeholder="Enter your username" onChange={this.handleChange} />
                  <small style={{color:'red'}}>{ this.state.errusername}</small></li>

                  <li><span>Password</span><input type="password" name="pwd" placeholder="Enter your password" onChange={this.handleChange} />
                  <small style={{color:'red'}}>{ this.state.errpwd}</small></li>

                  <li><span>Email</span><input type="text" name="email" placeholder="Enter your email" onChange={this.handleChange} />
                  <small style={{color:'red'}}>{ this.state.erremail}</small></li>

                  <li><span>First Name</span><input type="text" name="fname" placeholder="Enter your first name" onChange={this.handleChange} />
                  <small style={{color:'red'}}>{ this.state.errfname}</small></li>

                  <li><span>Last Name</span><input type="text" name="lname" placeholder="Enter your last name" onChange={this.handleChange} />
                  <small style={{color:'red'}}>{ this.state.errlname}</small></li>

                  <li><input type="checkbox" name="check" onChange={this.handleChangebox} />I agree to Term &amp; Conditions</li>
                  <li><input type="submit" defaultValue="Register" /></li>
                  </form>
                </ul>
                <div className="addtnal_acnt">I already have an account.<a href>
                <Link to="/">Login My Account !</Link></a></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" /> </div>
          </div>
        </div>
        <div className="clear" />
      </div>

		);
	}	
}

export default SignUpForm;