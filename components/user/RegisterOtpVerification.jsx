import React, { useEffect, useState } from 'react'
import {Container,Nav,Navbar,Dropdown,Modal,Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
function RegisterOtpVerification({setActiveModal}) {

  const [show,setShow] = useState(true)
  const [otp,setOtp] = useState('')

  const [showResendButton,setShowResendButton] = useState(false)
  const [resendTimer,setResendTimer] = useState(60)

  useEffect(()=>{
    let interval;
    if (resendTimer > 0){
      interval = setInterval(()=>{
        setResendTimer((prev)=>prev - 1);
      },1000)
    }else{
      setShowResendButton(true)
    }
    return () => clearInterval(interval)
    
  },[resendTimer])

  const handleResendEmail=(e)=>{
    e.preventDefault()
    Axios.post(apis.resendotp,{
      email:localStorage.getItem('otp-email')
    }).then((res)=>{
      setResendTimer(60)
      setShowResendButton(false)
    })

  }

  const submitVerify = (e) =>{
      e.preventDefault()
      Axios.post(apis.verifyotp,{
          email:localStorage.getItem('otp-email'),
          otp:otp
      }).then((res)=>{
          if (res.data.status===1){
              setActiveModal('login')
              localStorage.setItem('regist-token-id',res.data.token)
          }

      })
    }

  return (
    <Modal show={show} onHide={()=>setShow(false)} className='login'>
    
    <Modal.Header closeButton>
    
    </Modal.Header>
    <Modal.Title  style={{marginLeft:'340px',marginTop:'10px'}}><img src='../images/1.png' style={{width:'64px',height:'64px'}} ></img></Modal.Title>
  
    <Modal.Title style={{fontWeight:'700',fontSize:'16px',marginLeft:'300px',marginTop:'24px'}}>Confirm Your Email</Modal.Title>
    <Modal.Title  style={{fontSize:'15px',marginLeft:'180px',marginTop:'24px'}}>To verify your email , we’ve sent a One Time Password(OTP) to             </Modal.Title>
    <Modal.Title  style={{fontSize:'15px',marginLeft:'260px'}}>{typeof localStorage !== 'undefined' ? localStorage.getItem('otp-email'):null}</Modal.Title>
    <Modal.Body>
      <Form onSubmit={(e)=>submitVerify(e)}>
      <Form.Group className="" controlId="exampleForm.ControlInput1">
    <Form.Label></Form.Label>
    <Form.Control   
    className='mx-auto dot'   
    placeholder="Code" 
    style={{width:'359px',marginTop:'-29px'}}
    maxLength='6'
    onChange={(e)=>setOtp(e.target.value)}
    />
  </Form.Group>
     
  <Modal.Footer  >
    {showResendButton ? (
      <Button  
      className='mx-auto text-black ' 
      style={{backgroundColor:'#EEEEEE',fontWeight:'600',width:'360px'}}
      onClick={handleResendEmail}>
        Resend Email
      </Button>
    ):(
      <div  className='mx-auto' style={{backgroundColor:'',fontWeight:'400',width:'360px'}}>
        Resend OTP in {resendTimer} seconds
      </div>
    )}

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

export default RegisterOtpVerification