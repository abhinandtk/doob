import React, { useState } from 'react'
import {Container,Nav,Navbar,Dropdown,Modal,Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
function ForgetEmail({setActiveModal}) {

  const [show,setShow] = useState(true)

  const [email,setEmail] = useState('')
  

  const submitForgotEmail = (e) =>{
      e.preventDefault()
      Axios.post(apis.forgetemail,{
          email:email,
      }).then((res)=>{
          if (res.data.status===1){
              setActiveModal('forgetotp')
              localStorage.setItem('forget-psw-email',email)
          }

      })
    }

  return (
    <Modal show={show} onHide={()=>setShow(false)} className='login'>
    
    <Modal.Header closeButton>
    
    </Modal.Header>
    <Modal.Title  style={{display:'flex',justifyContent:'center',marginTop:'10px'}}><img src='../images/1.png' style={{width:'64px',height:'64px'}} ></img></Modal.Title>
  
    <Modal.Title style={{fontWeight:'700',fontSize:'16px',display:'flex',justifyContent:'center',marginTop:'24px'}}>Confirm Your Email</Modal.Title>
    <Modal.Title  style={{fontSize:'15px',display:'flex',justifyContent:'center',marginTop:'24px'}}>To reset your password , Please Enter a Email            </Modal.Title>
    <Modal.Body>
      <Form onSubmit={(e)=>submitForgotEmail(e)}>
      <Form.Group className="" controlId="exampleForm.ControlInput1">
    <Form.Label></Form.Label>
    <Form.Control   
    type='email'
    className='mx-auto dot'   
    placeholder="Email" 
    style={{width:'50%',marginTop:'-29px'}}
    onChange={(e)=>setEmail(e.target.value)}
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

export default ForgetEmail