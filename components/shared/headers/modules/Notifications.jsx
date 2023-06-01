import {Container,Nav,Navbar,Dropdown} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Modal } from 'antd';
import Axios from 'axios'
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
import moment from 'moment';
function Notifications({setNotificationShow}) {
    const [show,setShow]=useState(true)
    const [notificationData,setNotificationData]=useState([])
    const [followStatus,setFollowStatus]=useState(false)
    useEffect(()=>{
      Axios.get(apis.notification,{
          headers:{
              'Authorization':`Token ${constants.token_id}`,
          }
      }).then((res)=>{
          console.log('reerererrererererr',res)
          setNotificationData(res.data.data)
      })
    },[followStatus])

    const notificationTime =(time)=>{
      const timeDiff = moment.duration(moment().diff(moment(time)))
      const timeString = timeDiff.humanize() + ' ago'
      return timeString
    }

    const followAccount=(id)=>{
      Axios.post(apis.follow,{
        user_id:id
      },{
        headers:{
          'Authorization':`Token ${constants.token_id}`,
        }
      }).then((res)=>{
        setFollowStatus(!followStatus)
        console.log(res)
      })
    }

    const unFollowAccount=(id)=>{
      Axios.delete(apis.follow, {
        data: { user_id: id },
        headers: { Authorization: `Token ${constants.token_id}` },
      })
        .then((response) => {
          setFollowStatus(!followStatus)
          console.log('response:', response);
        })
        .catch((error) => {
          console.error('handleUnfollow error:', error);
        });
    }
        
  return (
    <div style={{position:'relative'}}>
      <Modal
      title='Notifications'
      open={show}
      onCancel={
        ()=>{
          setShow(false)
          setNotificationShow(false)
        }
      }
      maskClosable
      footer={null}
      style={{position:'absolute',right:0}}
      bodyStyle={{maxHeight:'70vh',overflowY:'scroll'}}
      >
      
          <section className="side-menu-sections ">
          <div className="side-menu__suggestions-sections " > 
          {notificationData.map((item,index)=>{
                return(
            <div key={index} className="side-menu__suggestions-contents">
              {item.type==='Follow'?(
              <div className="side-menu__suggestions">
                <a href="#" className="side-menu__suggestion-avatars">
                  <img src={`${constants.port}/media/${item.image}`} style={{objectFit:'cover'}} alt="User Picture" />
                </a>
                <div className="side-menu__suggestion-infos">
                <a href="#"> {item.name}
                  <span className='ms-1 text-black' style={{fontSize:'12px'}}>Started Following <br></br>you.<span></span>{notificationTime(item.created_at)}</span></a>
                </div>
                {item.is_following === 1 ?(
                    <button onClick={()=>unFollowAccount(item.user_id)} className="side-suggestion-button1" >Following</button>
                    ):(
                    <button onClick={()=>followAccount(item.user_id)} className="side-suggestion-button2">Follow</button>
                    )}
              </div>
              ):(
              <div className="side-menu__suggestions">
                <a href="#" className="side-menu__suggestion-avatars">
                <img src={`${constants.port}/media/${item.image}`} style={{objectFit:'cover'}} alt="User Picture" />
                </a>
                <div className="side-menu__suggestion-infos">
                <a href="#"> {item.name}
                  <span className='ms-1 text-black' style={{fontSize:'12px'}}>Liked your photo.<span></span>{notificationTime(item.created_at)}</span></a>
                </div>
                <button className="side-suggestion-button1"> <img src={`${constants.port}${item.liked_post}`} style={{marginTop:'25px',width:'44px',height:'44px',objectFit:'cover'}} /></button>
              </div>
              )}
              
            </div>
            )})}
          
          </div>
        </section>
      </Modal>
    </div>
  )
}

export default Notifications