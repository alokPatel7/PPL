import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from "react-router-dom";


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state ={
          userName:'',              //state contain all post
      }      

    }

    componentDidMount(){
      let Id = localStorage.getItem("currentUserId");
          if(Id){
            // this.setState({currentUserId:Id});
            axios.get("http://localhost:8000/curentUserdata", { params:{Id} }).then(
            response=>{
              if(response.data){
                this.setState({userName:response.data[0].fname});
                console.log('userdata axioswlkhfdgfljsa  data ===', this.state.userName);
              }else{
                console.log("no data retrive");
              }
            }
          ).catch(err =>{
            console.log('erroe from currentuser data',err);
          });
          }
      
    }

    LogOut =()=>{
      localStorage.removeItem("currentUserId");
      this.setState({userName:''});
      // alert('khdlsajd');
      this.props.history.push('/')
    }

    render(){
        return(
            <div>
                 <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" href>PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><a tabIndex={-1} >My Profile</a></li>
                  <li><a tabIndex={-1} >Message Box</a></li>
                  <li><a tabIndex={-1} >Change Language</a></li>


{ this.state.userName ? <div>
                  <li><a href>
                <Link to="/logout">

                <button style={{width:'150px', height:'40px',border:'none', backgroundColor:"red", color:'#fff', fontSize:'20px', borderRadius:'10px'}} >{ this.state.userName &&  <div>{this.state.userName } LogOut</div> }</button>
                
                </Link>
                </a></li> </div>: <div>Me</div> }

                  <li className="divider" />
                  <li><a tabIndex={-1} >
                      <input type="text" placeholder="search" />
                    </a></li>
                    
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active"> <a href>Home</a> </li>
                  <li className> <a href>Login</a> </li>
                  <li className> <a href>SignUp</a> </li>
                  <li className> <a href>E-Coupons</a> </li>
                  <li className> <a href>E-Brands</a> </li>
                  <li className> <a href>Resuse Market</a> </li>
                  <li className> <a href>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header">
          <div className="header_lft">
            <div className="logo"><a ><img src="images/logo.png" /></a></div>
            <div className="navigatn">
              <ul>
              <li><a  className="active">Home</a></li>


          { (localStorage.getItem("currentUserId")) ?  <div>

                  {/* <li><a >Home </a></li> */}
                  <li><a ><Link to='/timeline'>Timeline </Link></a></li> 
                  {/* <li><a > Resuse Market </a></li> */}
                  <li><a style={{fontSize:"20px"}}> UserName : {localStorage.getItem("currentUserName") }</a></li>
                  {/* <li><a > Logout</a></li> */}
                </div> : <div>
                
                <li className><Link to="/"> <a href>Login</a></Link>  </li>
                <li className> <Link to="/signup"><a href>SignUp</a> </Link> </li>
                {/* <li><a > Lost and Found</a></li> */}
                </div> 
                  
                }
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div"><img src="images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a ><span className="msg_count">100</span></a></div>
            <div className="info_div">
              <div className="image_div"> <img src="images/pic.png" /> </div>

        { (localStorage.getItem("currentUserId")) ? <div>
              <div className="info_div1">
              <a href>
                {/* <Link to="/logout"> */}

                <button onClick={this.LogOut} style={{width:'150px', height:'40px',border:'none', backgroundColor:"red", color:'#fff', fontSize:'20px', borderRadius:'10px'}} >{<div>  LogOut</div> }</button>
                
                {/* </Link> */}
                </a>
              </div>
              </div>:<div className="info_div1">Me</div>}
            </div>
          </div>
        </div>
        
            </div>
        );
    }
}
export default Header;