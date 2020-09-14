import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// import SignUpForm from './Components/SignUpForm';
// import LoginForm from './Components/LoginForm';
// import TimeLine from './Components/TimeLine';
import RightHeader from './Components/RightHeader';

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <RightHeader /> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
