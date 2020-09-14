import React from 'react';
import axios from 'axios';

class RightHeader extends React.Component{
        constructor(props){
            super(props);
            this.state ={
              popbox : false,           //set popup box state
              popbox : false,           //set popup box state
              category:"",
              myFile:"",
              userName:'',
              desc:'',
              currentUserId:'',
              categoryerror:false,
              fileerr:false,
            }
        }


        componentDidMount() {
          // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          let Id = localStorage.getItem("currentUserId");
          console.log("usr id = ",Id);
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
              }
              else{
                this.props.history.push('/')
              }
          // this.timelinePost();
          // console.log("props ============",this.props);
        }

        
        // handel popupbox 
    handlePopUp =()=>{
      if(this.state.popbox === true){
          this.setState({popbox:false});
      }else{
          this.setState({popbox:true});
      }
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
          this.setState({popbox : false,},()=>console.log("kakkkakakakakaka"));
          // this.setState({userName:response.data.fname})
        }
      });
    }else{
      console.log(this.state);
    }
  };
        render(){
            return(
                <div>
                    {/* popup box  */}
    { this.state.popbox && 

<div className="popup_sec" id="pop_forgt" style={{height:"500px", width:'650px',borderRadius:'30px 0 30px 0px'}}>
  <div className="clos_btn"><img src="images/clos.png" alt="" id="clos_pop" 
  onClick={this.handlePopUp} /></div>
  <div className="pop_hdr">Details About Post</div>
  <div className="man_contnt">

  <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
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
                </div>
            )
        }
}

export default RightHeader;