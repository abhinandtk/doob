import React, { useState } from 'react'
import {Dropdown, CardImg, } from 'react-bootstrap';
import { Modal, Form, Input, Button } from 'antd';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';
export default function PostActions({postId,user,setOnSuccess,sharedClick}) {
    const [show,setShow] = useState(false)
    const [visible,setVisible] = useState(false)
    const [reason,setReason] = useState('')
    const postReportHandler =(e)=>{
      console.log('ppppppppppp',postId)
      e.preventDefault()
      Axios.post(apis.reportpost,{
        post:postId,
        reason:reason
      },
      {
        headers:{
          'Authorization':`Token ${constants.token_id}`
        }
      }).then((res)=>{
        setShow(false)
        console.log('*/*/*/*/*/*/*/*/*/*/*/*/**',res)
      })

    }

    const deletePostHandler =()=>{
      Axios.post(apis.deletepost,{
        post_id:postId
      },
      {
        headers:{
          'Authorization':`Token ${constants.token_id}`
        }
      }).then((res)=>{
        setOnSuccess(prev => !prev)
        console.log('result',res)
      })
      setVisible(false)
    }

  return (
    <>

  <Modal
        title="Why are you reporting this post ??"
        open={show}
        centered
        closable
        maskClosable
        footer={null}
        onCancel={()=>setShow(false)}
      >
       <Form onSubmitCapture={(e)=>postReportHandler(e)}>
          <Form.Item >
            <Input.TextArea
              placeholder="Please enter your reason for reporting"
              autoSize={{ minRows: 5}}
              // value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Form.Item>

          <Form.Item>
            <Button 
            type="primary" 
            htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>


        
      </Modal>
  <Modal
        title="Are you sure to delete this post??"
        open={visible}
        centered
        closable
        maskClosable
        onCancel={()=>setVisible(false)}
        footer={[
          <Button key="back" onClick={()=>setVisible(false)}>
            Cancel
          </Button>,
          <Button style={{backgroundColor:'#17A803'}} key="submit" type="primary" onClick={deletePostHandler}>
            Submit
          </Button>,
        ]}
      >
        
      </Modal>

    <Dropdown className='Drop' >
        <Dropdown.Toggle    variant="" id="dropdown-basic"  style={{ color:'black',borderColor:'transparent',background:'transparent'}}>
        <i className='bi bi-three-dots-vertical'></i>
        </Dropdown.Toggle>

        <Dropdown.Menu  align="center" className='Menu' >
          {constants.user_id !== user ? 
            <Dropdown.Item onClick={()=>setShow(true)}>Report</Dropdown.Item>
            :<Dropdown.Item onClick={()=>setVisible(true)}>Delete</Dropdown.Item>}
            <Dropdown.Item onClick={()=>sharedClick(postId)}>Share</Dropdown.Item>

        </Dropdown.Menu>
    </Dropdown> 
    </> 
    )
}
