import React, { Fragment,useState } from 'react'
import {Tab,Tabs,Card, CardImg} from 'react-bootstrap';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';
import { Button, Modal } from 'antd';
function OtherProfileHeaderDetails({data,id}) {

    const [show,setShow]=useState(false)
    // console.log('343434344343434',data.is_following)
    // console.log('iiiiiiiiiiiiidddddddddddddddd',id)
    const followHandler=()=>{
        console.log('9888889989898989898989',data.is_following)
        Axios.post(apis.follow,{
            user_id:id
        },
        {
            headers:{
                'Authorization':`Token ${constants.token_id}`
            }
        }).then((res)=>{
            console.log('reeeeeeesul',res)
        })
    }
    const handleUnfollow = () => {
        Axios.delete(apis.follow, {
          data: { user_id: id },
          headers: { Authorization: `Token ${constants.token_id}` },
        })
          .then((response) => {
            setShow(false)
            console.log('response:', response);
          })
          .catch((error) => {
            console.error('handleUnfollow error:', error);
          });
      };
  return (
    <Fragment>

        <Modal 
        open={show}
        closable
        maskClosable
        centered
        onCancel={()=>setShow(false)}
        footer={[
            <Button key='back' type='secondary' onClick={()=>setShow(false)}>
                cancel
            </Button>,
            <Button key='submit' type='primary' onClick={handleUnfollow}>
            Confirm
            </Button>
            
        ]}
        >

            <div className="modal-body d-flex align-items-center justify-content-center">
                <div className="w-40 d-flex flex-column align-items-center">
                    <div className="mb-2">
                        <img src={`${constants.port}/media/${data.user_image}`} className="rounded-circle shadow-1-strong" style={{width:'100px',height:'100px'}} alt="Profile"/>
                    </div>
                    <div className="text-center mb-3">
                        <p className="mb-0"><b>{data.name}</b></p>
                    </div>
                    <hr  className='col-md-12 line' ></hr>


                    <p><b>Are you sure to unfollow?</b></p>

                    
                </div>
                
            </div>

        </Modal>
        <Card className='container' style={{width:'910px',marginLeft:'395px',marginTop:'23px',height:'290px'}}>
            <Card.Body>
                <div className='row'>
                    <div className='col-md-6'>
                    <button class="btn profile-edit-btn">Rank</button> 
                    <div class="profile-images" >
                        <img src={`${constants.port}/media/${data.user_image}`} alt=""></img>
                    </div>
                    </div>
                    <div className='col-md-6'>
                        
                

                    <div class="profile-stats">
                        <ul>
                        <h1 class="profile-user-name">{data.name}<span><img src='../images/accounts/stars.png' className='mx-1 mb-1'></img></span><span><img src='../images/accounts/iconoir_help-circles.png' className=' mb-1'></img></span></h1><br></br>
                        <h1 class="profile-user-names">@{data.username}</h1>
                        <br></br>
                        <li><span class="profile-stat-count">{data.post_count}</span> <span style={{color:'#959595'}}>posts</span></li>
                        <li><span class="profile-stat-count">{data.followers_count}</span>  <span style={{color:'#959595'}}>followers</span></li>
                        <li><span class="profile-stat-count">{data.following_count}</span>  <span style={{color:'#959595'}}>following</span></li>
                        <br></br>
                        <li><span class="profile-stat-count " style={{color:'#959595'}}>Age:</span>  <span >{data.age}</span></li>
                        <li><span class="profile-stat-count" style={{color:'#959595'}}>Gender:</span>  <span >{data.gender}</span></li>
                        <br></br>
                        <li><span > <img src="../images/accounts/kuwait.png" alt="" ></img></span><span class="profile-stat-count mx-1">{data.country} </span> <span style={{color:'#959595'}} className='mx-3'>+More</span></li>
                        </ul>
                        {data.is_following===1 ?
                        <button onClick={()=>setShow(true)} className="side-menu__suggestion-buttons " style={{backgroundColor:'#EFEFEF',color:'#000000'}}>Following <i className="bi bi-chevron-down "></i></button>  
                        :<button onClick={followHandler} className="side-menu__suggestion-buttons ">Follow <i className="bi bi-chevron-down "></i></button>  }
                        
                        <button className="side-menu__suggestion-button3 ">Message</button>
                    </div>
                    </div>
                </div>
                
                </Card.Body>
            </Card>
        </Fragment>
  )
}

export default OtherProfileHeaderDetails