import React from 'react'
import { useState } from 'react';
import {Container,Nav,Navbar,Dropdown,Modal,Button, Form} from 'react-bootstrap';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';

function SharedConfirmation({postId}) {
    const [show,setShow] = useState(true)
    const handleClose = () => setShow(false);
    const sharedPostHandler =()=>{
        Axios.post(apis.sharedpost,{
            parent_id:postId,
            post_type:'Shared'

        },
        {
            headers:{
                'Authorization':`Token ${constants.token_id}`
            }
        }).then((res)=>{
            console.log(res)
        })
    }

  return (
    <Modal 
    show={show} 
    onHide={handleClose} 
    dialogClassName='shared-confirm-modal'>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body>
        <Modal.Title style={{fontWeight:'700',fontSize:'16px',marginLeft:'300px',marginTop:'24px'}}>confirm</Modal.Title>
        <Modal.Title  style={{fontSize:'15px',marginLeft:'180px',marginTop:'24px'}}>Are you sure to continue           </Modal.Title>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" onClick={sharedPostHandler}>
            Submit
            </Button>
            </Modal.Footer>
        </Modal>


  )
}

export default SharedConfirmation