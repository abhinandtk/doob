import React, { useState } from 'react'
import {Dropdown, CardImg, } from 'react-bootstrap';
import { Modal, Form, Input, Button } from 'antd';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';

function CommentActions({user,commentId}) {
  console.log(user,constants.user_id,'=======')
  const [show,setShow] = useState(false)
  const [visible,setVisible] = useState(false)
  const [reason,setReason] = useState('')

  const commentReportHandler =(e)=>{
    e.preventDefault()
    Axios.post(apis.reportcomment,{
      comment:commentId,
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

  const deleteCommentHandler =()=>{
    Axios.post(apis.deletecomment,{
      comment_id:commentId
    },
    {
      headers:{
        'Authorization':`Token ${constants.token_id}`
      }
    }).then((res)=>{
      setVisible(false)
      console.log('result',res)
    })
  } 

  return (
    <>
    <Modal
        zIndex={1100}
        title="Why are you reporting this comment ??"
        open={show}
        centered
        closable
        maskClosable
        footer={null}
        onCancel={()=>setShow(false)}
      >
       <Form onSubmitCapture={(e)=>commentReportHandler(e)}>
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
            style={{backgroundColor:'#17A803'}}
            type="primary" 
            htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>


        
      </Modal>
  <Modal
        zIndex={1100}
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
          <Button style={{backgroundColor:'#17A803'}} key="submit" type="" onClick={deleteCommentHandler}>
            Submit
          </Button>,
        ]}
      >
        
      </Modal>

    <Dropdown className='Drop' >
        <Dropdown.Toggle    variant="" id="dropdown-basic"  style={{ color:'#959595',borderColor:'transparent'}}>
        <i className='bi bi-three-dots'></i>
        </Dropdown.Toggle>

        <Dropdown.Menu  align="center" className='Menu'  >
          {constants.user_id !== user?
            <Dropdown.Item onClick={()=>setShow(true)}>Report</Dropdown.Item>
            :<Dropdown.Item onClick={()=>setVisible(true)}>Delete</Dropdown.Item>}
        </Dropdown.Menu>
    </Dropdown>
    </>
  )
}

export default CommentActions