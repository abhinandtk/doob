import React, { Fragment, useState } from 'react'
import { Modal, Button, Upload, message } from 'antd';
import { Card,Tab,Tabs,CardImg } from 'react-bootstrap'
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
function ProfileHeaderDetails({data}) {

    const [visible,setVisible] = useState(false)
    const [uploadImageUrl,setUploadImageUrl]=useState(null)

    const [followersListShow,setFollowersListShow]=useState(false)
    const [followingListShow,setFollowingListShow]=useState(false)

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    const uploadShowHandler =()=>{
        setVisible(true)
    }

    const handleUpload = (file)=>{
      const formData = new FormData();
      formData.append('image', file);
      
      Axios.post(apis.profilepage,formData,
      {
        headers:{
          'Authorization':`Token ${constants.token_id}`
        }
      }).then((res)=>{
        console.log('iiooooooooooooooooooooooooooo',res)
        setUploadImageUrl(URL.createObjectURL(file))
        message.success('profile image updated successfully')
      })
    }

    const deleteProfileImg =()=>{
      Axios.delete(apis.profilepage,{
        headers:{
          'Authorization':`Token ${constants.token_id}`
        }
      }).then((res)=>{
        setVisible(false)
        console.log('ressssssssssssssssssssssssss',res)
      })
    }

  return (

    <Fragment>
        <Modal
        title="Upload or Delete Profile Picture"
        open={visible}
        // onOk={handleOk}
        onCancel={()=>setVisible(false)}
        footer={[
          <Button key="back" onClick={()=>setVisible(false)} >
            Cancel
          </Button>,
          <Button key="delete" onClick={deleteProfileImg}>
            Delete
          </Button>,
          <Button key="submit" type="primary" >
            Save
          </Button>,
        ]}
      >
        <Upload
          name="profilePicture"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={(file) => {
            // validate file type and size here
            return true;
          }}
          customRequest={({ file }) => {
            handleUpload(file);
          }}
        >
          {uploadImageUrl ? (
            <img src={uploadImageUrl} style={{width:'100%'}}/>
          ):(
            uploadButton
          )}

          
        </Upload>
      </Modal>
    <Card className='container' style={{width:'910px',marginLeft:'395px',marginTop:'23px',height:'290px'}}>
            <Card.Body>
             <div className='row'>
                <div className='col-md-6'>
                <button class="btn profile-edit-btn">Rank</button> <span> <button class="btn profile-edit-btn1">Edit</button></span>
                <div class="profile-image">
                    <img style={{borderRadius:'50%'}} src={`${constants.port}${data.user_image}`} alt=""></img>
                </div>
                <div class="profile-cam1" onClick={uploadShowHandler}>
                    <img src="../images/accounts/camera.png" href='#'  alt=""></img>
                </div>
                </div>
                <div className='col-md-6'>
              
              

                <div class="profile-stats">
                    <ul>
                    <h1 class="profile-user-name">{data.name}<span><img src='../images/accounts/stars.png' className='mx-1 mb-1'></img></span><span><img src='../images/accounts/iconoir_help-circles.png' className=' mb-1'></img></span></h1><br></br>
                    <h1 class="profile-user-names">{data.username}</h1>
                    <br></br>
                    <li><span class="profile-stat-count">{data.post_count}</span> <span style={{color:'#959595'}}>posts</span></li>
                    <li onClick={()=>setFollowersListShow(true)}><span class="profile-stat-count" >{data.followers_count}</span>  <span style={{color:'#959595'}}>followers</span></li>
                    <li onClick={()=>setFollowingListShow(true)}><span class="profile-stat-count">{data.following_count}</span>  <span style={{color:'#959595'}}>following</span></li>
                    <br></br>
                    <li><span class="profile-stat-count " style={{color:'#959595'}}>Age:</span>  <span >{data.age}</span></li>
                    <li><span class="profile-stat-count" style={{color:'#959595'}}>Gender:</span>  <span > {data.gender}</span></li>
                    <br></br>
                    <li><span > <img src={`${constants.port}/media/${data.country_image}`} width={'30p'} alt="" ></img></span><span class="profile-stat-count mx-1">{data.country}</span> <span style={{color:'#959595'}} className='mx-3'>+More</span></li>
                    </ul>

                </div>
                </div>
             </div>
             {followersListShow && <FollowersList setFollowersListShow={setFollowersListShow}/>}
             {followingListShow && <FollowingList setFollowingListShow={setFollowingListShow}/>}

                    
               
                
            
            </Card.Body>
        </Card>
        </Fragment>
  )
}

export default ProfileHeaderDetails