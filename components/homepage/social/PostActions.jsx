import React, { useState } from 'react'
import {Modal,Button,Dropdown, CardImg, Form} from 'react-bootstrap';

export default function PostActions() {
    const [show,setShow] = useState(false)

  return (
    <>

    <Modal show={show} onHide={()=>setShow(false)} className='post-repor'>
    
    <Modal.Header closeButton>
    
    <Modal.Title style={{fontWeight:'700',fontSize:'16px',marginLeft:'300px',marginTop:'24px'}}>Report</Modal.Title>
    </Modal.Header>
  
    <Modal.Title  style={{fontSize:'15px',marginLeft:'180px',marginTop:'24px'}}>        Why are you reporting this post           </Modal.Title>
    <Modal.Body>
      <Form >
    <Form.Group className="" controlId="exampleForm.ControlInput1">
    <Form.Label></Form.Label>
    <Form.Control   
    type='textarea'
    className='mx-auto dot'   
    placeholder="Password" 
    style={{width:'359px',marginTop:'-29px'}}
    required
    />
    </Form.Group>
    <br></br>

     
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

    <Dropdown className='Drop' >
        <Dropdown.Toggle    variant="" id="dropdown-basic"  style={{ color:'black',borderColor:'transparent'}}>
        <i className='bi bi-three-dots-vertical'></i>
        </Dropdown.Toggle>

        <Dropdown.Menu  align="center" className='Menu'   >
            <Dropdown.Item href="#">Report</Dropdown.Item>
            <Dropdown.Item href="#">Delete</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown> 
    </> 
    )
}
