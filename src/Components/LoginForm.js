import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// export const BASE_URL = 'localhost:30000/'

const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inValidLogin: false,
      email: "",
      pwd: "",
      erremail: "",
      errpwd: ""

    }
    // console.log("this.props in login == ",this.props)
  }

  componentDidMount() {
    let Id = localStorage.getItem("currentUserId");
    document.title = `Login | PPL `
    if (Id) {
      this.props.history.push('/timeline');
      // console.log('wow its working',Id);
    }
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }


  formValidation = () => {
    let formValidation = true;

    if (this.state.email.length == '0') {
      formValidation = false;
      this.setState({ erremail: "Can't be empty" });
    } else {
      var pattern = new RegExp(emailRegex);
      if (!pattern.test(this.state.email)) {
        formValidation = false;
        this.setState({ erremail: "Invalid Email id" });
      } else {
        this.setState({ erremail: "" });
      }
    }

    if (this.state.pwd.length == '0') {
      formValidation = false;
      this.setState({ errpwd: "Can't be empty" });
    } else {
      this.setState({ errpwd: "" });
    }

    return formValidation;
  }

// this functions calls to API for login
  sendData = (event) => {
    event.preventDefault();

    if (this.formValidation()) {
      axios.post("http://localhost:8000/login", this.state).then(res => {
        if (res.data) {
          this.setState({ inValidLogin: false });
          localStorage.setItem("currentUserId", res?.data[0]?._id);
          localStorage.setItem("currentUserName", res?.data[0]?.fname);
          this.props.history.push("/timeline");
        } else {
          this.setState({ inValidLogin: true });
        }
      });
    }
  }


  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Login Account</title>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit={this.sendData}>
                  <ul>
                    {this.state.inValidLogin && <li><span style={{ color: "#fff", backgroundColor: "red", textAlign: 'center' }}>Invalid Email or password</span></li>}

                    <li><span>Email-ID</span><input type="text" name="email" placeholder="Enter your email"
                      onChange={this.handleChange} />
                      <small style={{ color: 'red' }}>{this.state.erremail}</small></li>

                    <li><span>Password</span><input type="password" name="pwd" placeholder="Enter your password"
                      onChange={this.handleChange} />
                      <small style={{ color: 'red' }}>{this.state.errpwd}</small></li>

                    <li><input type="checkbox" />Remember Me</li>
                    <li><input type="submit" defaultValue="Log In" /><a href>Forgot Password</a></li>
                  </ul>
                </form>
                <div className="addtnal_acnt">I do not have any account yet.<a href >
                  <Link to="/signup">Create My Account Now !</Link></a></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                </p>
              <img src="images/img_9.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;