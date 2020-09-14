import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from "./Header";  

class TimeLine extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            popbox : false,           //set popup box state
            category:"",
            myFile:"",
            userName:'',
            desc:'',
            currentUserId:'',
            categoryerror:false,
            fileerr:false,
            currentUserAllPost:[],            // state contain current user post only
            timelinePost:[],                 //state contain all post
        }      
        // console.log("user data =" ,this.props);
    }

    componentDidMount() {
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      let Id = localStorage.getItem("currentUserId");
          if(Id){
            this.setState({currentUserId:Id});
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
          }else{
            this.props.history.push('/')
          }
      this.timelinePost();
      console.log("props ============",this.props);
    }


    // get request for featch data for timeline
   timelinePost =()=>{
      axios.get("http://localhost:8000/timelinepost").then(response =>{
        if(response.data){
          this.setState({currentUserAllPost:[]});
          this.setState({timelinePost:response.data});
          // console.log("timeline data === ",response.data);
        }
      }).catch(err =>{
        console.log("timeline error",err);
      })
    }

    // handel popupbox 
    handlePopUp =()=>{
        if(this.state.popbox === true){
            this.setState({popbox:false});
        }else{
            this.setState({popbox:true});
        }
    }

    handleChange =(event)=>{
      if(event.target.name === 'myFile'){
        this.setState(
          {myFile:event.target.files[0]}
        )
      }else{
        this.setState({
          [event.target.name]:event.target.value
        },()=>{
          // console.log("after change ====== ",this.state);
        });
      }
    };

    // Function handle like requests 
    likeFunction =(postId)=>{
      let userId = localStorage.getItem("currentUserId");
      axios.get("http://localhost:8000/likepost", {params:{postId,userId}}).then(response =>{
        if(response.data){
          this.setState({timelinePost:response.data});
          // console.log("like okay",response.data);
        }
      }).catch(err=>{
        console.log("err",err)
        });
    } 

    handleValidation =()=>{
      let formValidation = true;

      // if(this.state.category === 'none'){
      //   formValidation = false;
      //   this.setState({categoryerror : true})
      // }else{
      //   this.setState({categoryerror : false})
      //   formValidation = true;
      // }


      // if(this.state.myFile === ''){
      //   formValidation = false;
      //   this.setState({fileerr : true})
      // }else{
      //   formValidation = true;
      //   this.setState({fileerr : false})
      // }

      return formValidation;
    };

    handleSubmit =(event)=>{
      event.preventDefault();
      let formdata=new FormData();
      formdata.append("userName",this.state.userName)
      formdata.append("category",this.state.category)
      formdata.append("myFile",this.state.myFile)
      formdata.append("desc",this.state.desc)
      formdata.append("currentUserId",this.state.currentUserId)


      if(this.handleValidation()){
        axios.post('http://localhost:8000/postUpload', formdata ).then(response =>{
          if(response.data){
            this.setState({popbox : false});
            this.setState({timelinePost:response.data});
            // this.setState({userName:response.data.fname})
          }
        });
      }else{
        console.log(this.state);
      }
    };

//  current user all post 
    myPosts =()=>{
      let id = localStorage.getItem("currentUserId");
      axios.get('http://localhost:8000/mypost', {params:{id}}).then(response =>{
        if(response.data){
          this.setState({timelinePost:response.data});
          // this.setState({currentUserAllPost:response.data});
          // console.log(this.state.currentUserAllPost[0].myFile);
        }
      });
    }

    

    render(){
        return(
            <div>
                <div>
        <title>Home</title>
          {/* <Header /> */}
{/* popup box  */}
    { this.state.popbox && 

        <div className="popup_sec" id="pop_forgt" style={{height:"500px", width:'650px',borderRadius:'30px 0 30px 0px'}}>
          <div className="clos_btn"><img src="images/clos.png" alt="" id="clos_pop" 
          onClick={this.handlePopUp} /></div>
          <div className="pop_hdr">Details About Post</div>
          <div className="man_contnt">

          <form onSubmit={this.handleSubmit} enctype="multipart/form-data" >
            <h4>Select Category</h4>
            <select name="category" onChange={this.handleChange}>
                <option value="none">Select</option>  
                <option value="cat">Cats</option>
                <option value="dog">Dogs</option>
                <option value="bird">Birds</option>
                <option value="rabbit">Rabbit</option>
                <option value="other">Others</option>
            </select>
            <small style={{color:'red',fontSize:'15px'}}>{ this.state.categoryerror && <div>Select category </div>}</small>
            <h4>Caption</h4>
            <textarea name="desc" onChange={this.handleChange} style={{margin: '0px', width: '466px', height: '89px'}}></textarea> <br /> <br/>
            Select image to upload: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="file" name="myFile" onChange={this.handleChange} /> 
            <small style={{color:'red',fontSize:'15px'}}>{ this.state.categoryerror && <div>Select file </div>}</small> <br/>
            <input type="submit" value="Upload Image" />
            </form>

          </div>
        </div>

    }
{/* ========================== */}
        <div className="container">
          <div className="content">
            <div className="content_rgt" >
              <div className="rght_btn" style={{cursor:"pointer"}} onClick={this.handlePopUp}> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> 
              <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span>


               <a >Upload Post</a> 
               

               </div>
              <div className="rght_btn" style={{cursor:"pointer"}}> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a >Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    <li><a ><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a ><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a ><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a ><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a ><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</a></li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.jpeg" />
                      <div className="profile_text"><a >Change Profile Pic</a></div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div"><a >Edit <img src="images/timeline_img.png" /></a></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">{this.state.userName }</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Male</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                              or sub comments as you like and manage all of your content inside Account.</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul style={{cursor:"pointer"}}>




                      <li onClick={this.timelinePost}><a  className="active">Timeline    </a></li>
                      <li><a >About  </a></li>
                      <li><a >Album</a></li>
                      <li><a > Pets</a></li>
                      <li ><a onClick={this.myPosts}>My Uploads </a></li>



                    </ul>
                  </div>
                </div>
              </div>

              {/* { this.state.currentUserAllPost && this.state.currentUserAllPost.map(item =>(
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc" style={{textTransform: 'capitalize'}}>{item.categeory}</div>
                  </div>
                  <div className="div_top">
                  <div className="div_top_lft"><img src="images/img_6.png" />{item.userName}</div>
                    <div className="div_top_rgt"><span className="span_date">{item.postdate}</span><span className="span_time">{item.posttime}</span></div>
                  </div>
                  <Link to={"/singlepost/"+item._id}>
                  <div style={{cursor:"pointer"}} className="div_image"><img src={"http://localhost:8000/"+item.myFile} alt="pet" /></div></Link>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul style={{cursor:'pointer'}}>
                        <li><a ><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a ><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        
                        <li style={{cursor:'pointer'}} onClick={()=>this.likeFunction(item._id)}><a ><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{item.likes.length} Likes</a></li>
                        
              <li><a ><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{item.comments.length}Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              ))} */}

{/* for timeline  */}

                { this.state.timelinePost.map(item =>(
               <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc" style={{textTransform: 'capitalize'}}>{item.categeory}</div>
                  </div>
                  <div className="div_top">
                <div className="div_top_lft"><img src="images/img_6.png" />{item.userName}</div>
                <div className="div_top_rgt"><span className="span_date">{item.postdate}</span><span className="span_time">{item.posttime}</span></div>
                  </div>
                  <Link to={"/singlepost/"+item._id}>
                  <div style={{cursor:"pointer"}} className="div_image" ><img src={"http://localhost:8000/"+item.myFile} alt="pet" /></div></Link>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a ><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a ><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        {/* const {postid} = {item._id} */}
                <li style={{cursor:'pointer'}} onClick={()=>this.likeFunction(item._id)}><a ><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{item.likes.length} Likes</a></li>

                        <li><a ><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{item.comments.length} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> 
                ))}


            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
            </div>
        );
    }
}

export default TimeLine;