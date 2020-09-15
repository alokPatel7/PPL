import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Demo from "./Components/demo";
import TimeLine from "./Components/TimeLine";
import Logout from "./Components/Logout";
import SinglePost from "./Components/SinglePost";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

class App extends Component {
  render() {
    return (
      <>
        {/* <Route path="/timeline" component={Header}/> */}
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="/timeline" component={TimeLine} />
          <Route path="/logout" component={Logout} />
          <Route path="/demo" component={Demo} />
          <Route path="/singlepost/:post" component={SinglePost} />
          <Route path="/singlepost" component={TimeLine} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
