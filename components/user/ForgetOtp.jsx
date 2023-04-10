import React, { useState } from 'react'
import {Container,Nav,Navbar,Dropdown,Modal,Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
function ForgetOtp({setActiveModal}) {

  const [show,setShow] = useState(true)

  const [fotp,setFotp] = useState('')
  

  const submitForgotOtp = (e) =>{
  
      e.preventDefault()
      Axios.post(apis.forgetotpverify,{
          email:localStorage.getItem('forget-psw-email'),
          otp:fotp
      }).then((res)=>{
          if (res.data.status===1){
            setActiveModal('passwordchange')
            localStorage.setItem('forgot-psw-token',res.data.data.token)
          }

      })
    }

  return (
    <Modal show={show} onHide={()=>setShow(false)} className='login'>
    
    <Modal.Header closeButton>
    
    </Modal.Header>
    <Modal.Title  style={{marginLeft:'340px',marginTop:'10px'}}><img src='../images/1.png' style={{width:'64px',height:'64px'}} ></img></Modal.Title>
  
    <Modal.Title style={{fontWeight:'700',fontSize:'16px',marginLeft:'300px',marginTop:'24px'}}>Confirm Your Email</Modal.Title>
    <Modal.Title  style={{fontSize:'15px',marginLeft:'180px',marginTop:'24px'}}>To reset your password , Please Enter a Email            </Modal.Title>
    <Modal.Body>
      <Form onSubmit={(e)=>submitForgotOtp(e)}>
      <Form.Group className="" controlId="exampleForm.ControlInput1">
    <Form.Label></Form.Label>
    <Form.Control   
    type='text'
    className='mx-auto '   
    placeholder="OTP" 
    style={{width:'50%',marginTop:'-29px'}}
    onChange={(e)=>setFotp(e.target.value)}
    maxLength='6'
    required
    />
  </Form.Group>
     
  <Modal.Footer  >

      <Button 
      type="submit" 
      className='text-white mx-auto mt-2 ' 
      style={{backgroundColor:'#17A803',fontWeight:'600',width:'363px'}}>
     Confirm
      </Button>
  
    </Modal.Footer>
</Form>
    </Modal.Body>
 
    
  </Modal>
  )
}

export default ForgetOtp