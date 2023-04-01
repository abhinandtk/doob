import React from 'react'
import {Modal,Button,Dropdown, CardImg} from 'react-bootstrap';

function CommentActions() {
  return (

    <Dropdown className='Drop' >
        <Dropdown.Toggle    variant="" id="dropdown-basic"  style={{ color:'#959595',borderColor:'transparent'}}>
        <i className='bi bi-three-dots'></i>
        </Dropdown.Toggle>

        <Dropdown.Menu  align="center" className='Menu'   >
            <Dropdown.Item href="#">Report</Dropdown.Item>
            <Dropdown.Item href="#">Delete</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default CommentActions