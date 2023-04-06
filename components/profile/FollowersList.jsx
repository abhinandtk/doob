import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import { Modal } from 'antd'
import React from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { CardImg } from 'react-bootstrap'
import Axios from 'axios'

function FollowersList({setFollowersListShow}) {

    const [visible,setVisible]=useState(true)
    const [followers,setFollowers]=useState([])

    Axios.get(apis.followerslist,{
        headers:{
            'Authorization':`Token ${constants.token_id}`
        }
    }).then((res)=>{
        setFollowers(res.data.data)
    })
    const removeAccount = (id) => {
        Axios.delete(apis.removefollower, {
          data: { user_id: id },
          headers: { Authorization: `Token ${constants.token_id}`},
        })
          .then((response) => {
            console.log('response:', response);
          })
          .catch((error) => {
            console.error('handleUnfollow error:', error);
          });
      };


  return (
    <Fragment>
        <Modal
      open={visible}
      onCancel={()=>{
        setVisible(false)
        setFollowersListShow(false)
        }}
      footer={null}
      width={500}
      closable
      maskClosable
      centered
      bodyStyle={{ maxHeight: '50vh', overflowY: 'scroll' }}
      title='Followers'
    >
     
      <div style={{ padding: '16px' }}>
        {followers.map((item)=>(

        <div className="side-menu__suggestion">
            <div className="side-menu__suggestion-avatar">
            <CardImg  className='rounded-circle shadow-1-strong ' src={`${constants.port}${item.image}`} style={{width:'46px',height:'46px'}} ></CardImg>
            </div>
            <div className="side-menu__suggestion-info">
                <p><b>{item.name}</b><br></br>{item.username}</p>
            </div>
            <button onClick={()=>removeAccount(item.user_id)} className="side-menu__suggestion-buttons" style={{backgroundColor:'#EFEFEF',color:'#000000'}}> Remove</button>
        </div>
        ))}
       
      </div>
    </Modal>
    </Fragment>
  )
}

export default FollowersList