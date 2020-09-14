import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class SinglePost extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            postid:this.props.match.params.post,
            userName:'',
            singlepostdata:[],
            comments:'',
            userid:localStorage.getItem('currentUserId')

        }
        console.log('inside singlepost == ',this.state.postid)
    }

    handleChange = (event) =>{
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    // Single post function 
    componentDidMount(){
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            let postid = this.state.postid;
            axios.get('http://localhost:8000/imagesinglepost', {params:{postid}}).then(response =>{
                if(response.data){
                    this.setState({singlepostdata:response.data})
                // console.log("okay Ali",this.state.singlepostdata);
                }
            }).catch(err=>{
                console.log(err);
            });

            let Id = localStorage.getItem('currentUserId');
            if(!Id){
                this.props.history.push('/')
            }else{
                this.setState({currentUserId:Id});
                axios.get("http://localhost:8000/curentUserdata", { params:{Id} }).then(
                    response=>{
                    if(response.data){
                        this.setState({userName:response.data[0].fname})
                        // console.log('userdata axioswlkhfdgfljsa  data ===', this.state.userName);
                    }else{
                        console.log("no data retrive");
                    }
                    }
                ).catch(err =>{
                    console.log('erroe from currentuser data',err);
                });
            }
    }

    submitComment = (e)=>{
      e.preventDefault();
      let postid = this.state.postid;
      let userid = localStorage.getItem('currentUserId');
      axios.post('http://localhost:8000/submitcomment', this.state).then(response =>{
        if(response.data){
          this.setState({singlepostdata:response.data})
          console.log("okay",response.data);
        }
      });
      console.log('comments is working',this.state.postid);
    }

    render(){
        return(
        <div>
          <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="../images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="../images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="../images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="../images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    <li><a href="#"><span className="list_icon"><img src="../images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a href="#"><span className="list_icon"><img src="../images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a href="#"><span className="list_icon"><img src="../images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a href="#"><span className="list_icon"><img src="../images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a href="#"><span className="list_icon"><img src="../images/icon_05.png" alt="up" /></span> Others</a></li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="../images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="../images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="../images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="content_lft">

            {this.state.singlepostdata && this.state.singlepostdata.map((item,i) =>(
              <div>
                <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                  <div className="div_top">
            <div className="div_top_lft"><img src="../images/img_6.png" />{item.userName}</div>
            <div className="div_top_rgt"><span className="span_date">{item.postdate}</span><span className="span_time">{item.posttime}</span></div>
                  </div>
                  <div className="div_image"><img src={"http://localhost:8000/"+item.myFile} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="../images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="../images/icon_002.png" alt="share" /></span>Flag</a></li>
            <li><a href="#"><span className="btn_icon"><img src="../images/icon_003.png" alt="share" /></span>{item.likes.length} Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="../images/icon_004.png" alt="share" /></span>{item.comments.length} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="contnt_3">
                <ul>
                { item.comments.map((com,i)=>(
                  <div>
                    <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="../images/post_img.png" /></div>
                      <div className="image_name">{com.userName}</div>
                    </ div>
                    <div className="list_info">
                      {com.desc}
                    </div>
                    <input type="button" defaultValue="Reply" className="orng_btn" />
                  </li>
                  </div>
                ))}


<li>
                    <div className="cmnt_div1">
                     <form onSubmit={this.submitComment}>
                     <input type="text" name="comments" placeholder="enter comments" className="cmnt_bx1" onChange={this.handleChange} required/>
                      <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
                     </form>
                    </div>
                  </li>
                </ul>
                <div className="view_div"><a href="#">View more</a></div>
              </div>
              </div>
            ))}
              
              


            </div>
          </div>
        </div>
        </div>
        );
    }
}

export default SinglePost;