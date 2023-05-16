import 'bootstrap-icons/font/bootstrap-icons.css';
import {Container,Nav,Navbar,Dropdown,Modal,Button} from 'react-bootstrap';
import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import apis from '@/public/data/my-constants/Apis';
function Register({setActiveModal,countries}) {
    const [show,setShow] = useState(true)
    const [errorMsg,setErrorMsg] = useState('')

    const selectedCountry =localStorage.getItem('country-select')
    const[registerFormData,setRegisterFormData] = useState({
        name:'',
        username:'',
        email:'',
        code:'',
        phone:'',
        gender:'',
        nationality:'',
        dob:'',
        password:'',
        confirmpsw:''
  })
  const handleInputChange = (e) =>{
    const newRegFormData = {...registerFormData}
    newRegFormData[e.target.id]=e.target.value
    setRegisterFormData({...newRegFormData})

  }

  const registerSubmit = (e) =>{
    e.preventDefault()
    if (registerFormData.password === registerFormData.confirmpsw){

      axios.post(apis.register,{

        email: registerFormData.email,
        username:registerFormData.username,
        password:registerFormData.password,
        password2: registerFormData.confirmpsw,
        Details: {
        
          dob: registerFormData.dob,
          nationality: registerFormData.nationality,
          phone: registerFormData.phone,
          name: registerFormData.name,
          Gender: registerFormData.gender,
          country_code:registerFormData.code,
          platform:"0",
          fcm_token:""   
        }
        }).then((res) =>{
          if(res.data.status === 1){
            setActiveModal('registerotp')
            localStorage.setItem('otp-email',registerFormData.email)
            
          }else{
            setErrorMsg(res.data.message_en)
          }
      })
    }else{
      setErrorMsg('password and confirm password deos not match')
    }
    


  }
  return (
    <Modal  
      show={show} 
      onHide={()=>setShow(false)} 
    >
      <div className='modal-contents'>
        <Modal.Header closeButton >
        </Modal.Header>
        <p style={{color:'red',textAlign:'center'}}>{errorMsg}</p>
     
        <Modal.Title className='register'>Registration</Modal.Title>
        <Modal.Body>
          <Form onSubmit={(e)=>registerSubmit(e)}>
        <Form.Group 
        className="mb-1 white"  
        
        controlId="formBasicEmail"
        
        >
        <Form.Label>Name*</Form.Label>
        <Form.Control 
        id="name"
        type="text" 
        placeholder="" 
        
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.name}
        required/>
        <Form.Text className="text-muted">
       
        </Form.Text>
      </Form.Group>
         
      <Form.Group className="mb-1 white"   >
        <Form.Label>Username*</Form.Label>
        <Form.Control
        id="username"
        type="text" 
        placeholder="" 
        
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.username}
        required/>
       
      </Form.Group>

      <Form.Group className="mb-1 white"   >
        <Form.Label>Email*</Form.Label>
        <Form.Control
        id="email"
        type="email" 
        placeholder="" 
  
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.email}
        required/>
       
      </Form.Group>

      <Form.Label className='white'>Phone Number*</Form.Label>
      <Form.Group className="mb-2 d-flex justify-content-between align-items-center white "  >
      
        <Form.Select 
        id="code" 
        className='dot'
        
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.code}
        required>
          <option value=''></option>
          {countries.map((item)=>(
            <option key={item} value={item.phone_prefix}>{item.phone_prefix}</option>
          ))}
        </Form.Select>
        <Form.Control
        id="phone"
        type="text" 
        maxLength='10'
        placeholder="" 
        className='dot1'
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.phone}
        required/>
      </Form.Group>

      <Form.Group className="mb-2 white"  >

        <Form.Label>Gender*</Form.Label>
        <Form.Select 
        id="gender"
        aria-label="Default select example" 
        
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.gender}
        required
        >
        <option value=''>Select</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>

  
        </Form.Select>

      </Form.Group>
      <Form.Group className="mb-2 white" >
        <Form.Label>Nationality*</Form.Label>
        <Form.Select 
        id="nationality"
        aria-label="Default select example" 
        
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.nationality}
        required
        >
        <option value=''>--Select--</option>
        {countries.map((item)=>(
         selectedCountry !== item.country_name ? 
        <option key={item.id} value={item.country_name}>{item.country_name}</option>:''
        ))}
      
     
        </Form.Select>
      </Form.Group>
     

            <Form.Group className="mb-2 white"  >
        <Form.Label>Date of Birth*</Form.Label>
        <Form.Control 
        id="dob"
        type="date" 
        placeholder="" 
      
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.dob}
        required
        />
       
      </Form.Group>

            <Form.Group className="mb-1 white"  >
        <Form.Label>Password*</Form.Label>
        <Form.Control 
        id="password"
        type="text" 
        placeholder="" 
       
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.password}
        required
        />
       
      </Form.Group>
      <Form.Group className="mb-1 white"  >
        <Form.Label>Confirm Password*</Form.Label>
        <Form.Control 
        id="confirmpsw"
        type="text" 
        placeholder="" 
     
        onChange={(e)=>{handleInputChange(e)}}
        value={registerFormData.confirmpsw}
        required
        />
       
      </Form.Group>

      <Modal.Footer >
          <Button 
          type="submit"  
          className='mx-auto text-white submit1 ' 
          >
            Submit
          </Button>
      
        </Modal.Footer>
    </Form>
        </Modal.Body>
        </div>
       
      </Modal>
  )
}

export default Register