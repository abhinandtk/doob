import React from 'react'
import { Fragment } from 'react';
import { useState,useEffect } from 'react'
import {Modal,Button, CardImg} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
function Comments({setVisibleComment,postId,slug}) {
    const [show,setShow] = useState(true)
    const [comment,setComment] = useState('')
    const [showComments,setShowComments]= useState([])
    useEffect(()=>{

        Axios.post(apis.commentlist,{
            post_id:postId,
            post_slug:slug
        },{
            headers:{
                'Authorization':`Token ${constants.token_id}`
            }
        }).then((res)=>{
            setShowComments(res.data.data.comments)
        })
    })
    const onHideHandler =()=>{
        setShow(false)
        setVisibleComment(false)
    }
    const commentPostHandler =(e)=>{
        e.preventDefault()
        Axios.post(
            apis.postcomment,
            {
              content: comment,
              post_id: postId
            },
            {
              headers: {
                'Authorization': `Token ${constants.token_id}`,
                'Content-Type': 'application/json',
              }
            }
          ).then((res)=>{
            // setShowComments(res.data)
            
          });
    }
            
       
    
  return (
    <Fragment>
    <Modal show={show} onHide={onHideHandler} className='index' >
        <Modal.Header closeButton>
     
        </Modal.Header>
        <Modal.Body style={{overflowY:'scroll'}}>
        <Modal.Title style={{fontWeight:'700',fontSize:'16px',marginTop:'-43px'}}>Comments</Modal.Title>
        {showComments.map((item)=>(

        <div className='d-flex flex-start mt-4 mx-2'>
            <div className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c1.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                            {item.user.username}{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>4 hrs</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    {item.content}
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>
                </div>
            </div>
        </div>
        ))}

        <div className='d-flex flex-start mt-4 mx-2'>
            <div   className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c2.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                            Faisal{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>6 hrs</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    Lorem Ipsum is simply dummy text
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>
                </div>
            </div>
        </div>
    
       
    
        <div className='d-flex flex-start mt-4 mx-2'>
            <div className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c3.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                            Sulthan Almubarak{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>1 d</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    There are many variations of passages
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>
                </div>
            </div>
        </div>
        
        <div className='d-flex flex-start mt-4 mx-2'>
            <div   className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c4.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                        Musaid{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>1 d</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    It is a long established fact that a reader will be distracted by the readable content
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>  
                </div>
            </div>                                                                                                 
        </div>
        <div className='d-flex flex-start mt-4 mx-2'>
            <div   className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c2.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                            Faisal{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>6 hrs</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    Lorem Ipsum is simply dummy text
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>
                </div>
            </div>
        </div>
    
        <div className='d-flex flex-start mt-4 mx-2'>
            <div className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c3.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                            Sulthan Almubarak{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>1 d</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    There are many variations of passages
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>
                </div>
            </div>
        </div>
        
        <div className='d-flex flex-start mt-4 mx-2'>
            <div   className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c4.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{fontWeight:'600'}}>
                        Musaid{" "}
                            <span className="small" style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>1 d</span>
                        </p>
                    </div>
                    <p className="small mb-0">
                    It is a long established fact that a reader will be distracted by the readable content
                    </p>
                    <p className='small ' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        Reply
                    </p>  
                </div>
            </div>                                                                                                 
        </div>
        
        <div className='d-flex flex-start mt-5 mx-2'>
            <div   className='me-2' href=''>
                <CardImg  className='rounded-circle shadow-1-strong ' src="../images/c8.png" style={{width:'44px',height:'44px'}} ></CardImg>
            </div>
            <div className="flex-grow-1 flex-shrink-1 " style={{marginBottom:'-24px'}}>
                <div>
                        <Form >
                    <div className="d-flex justify-content-between align-items-center">
                            <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                                <Form.Control type="" 
                                placeholder="Add a comment" 
                                className='mark' style={{fontSize:'13px',height:'37px'}} 
                                onChange={(e)=>setComment(e.target.value)}/> 
                            </Form.Group>  
                            <p  
                            className='mx-2'
                            style={{color:'black',textDecoration:'none'}}
                            onClick={commentPostHandler}
                            >
                                Post
                            </p>
                    </div>
                        </Form>
                </div>
            </div>
        </div>

        </Modal.Body>
    </Modal>
    </Fragment>
  )
}

export default Comments