import React from 'react'
import { Fragment } from 'react';
import { useState,useEffect,useRef } from 'react'
import {Button,Dropdown, CardImg} from 'react-bootstrap';
import {Modal} from 'antd'
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import constants from '@/public/data/my-constants/Constants';
import apis from '@/public/data/my-constants/Apis';
import CommentActions from './CommentActions';

function Comments({setVisibleComment,postId,slug}) {
    const [show,setShow] = useState(true)
    const [comment,setComment] = useState('')
    const [showComments,setShowComments]= useState([])
    const [replayTo,setReplayTo] = useState(null)

    const inputRef = useRef()
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

            console.log(res.data.data.comments)
        })
    },[showComments])
    const onHideHandler =()=>{
        setShow(false)
        setVisibleComment(false)
    }
    const commentPostHandler =(e)=>{
        e.preventDefault()
        let data = {content: comment, post_id: postId}
        if (replayTo){
            data.parent_id=replayTo
        }
        Axios.post(
            apis.postcomment,
            data,
            {
              headers: {
                'Authorization': `Token ${constants.token_id}`,
                'Content-Type': 'application/json',
              }
            }
          ).then((res)=>{
            inputRef.current.value=''
            setReplayTo(null)
            
          });
    }
    const handleReply = (commentId) => {
        setReplayTo(commentId)
        inputRef.current.focus()
      }
    
            
       
    
  return (
    <div style={{ position: 'relative' }}>
    <Modal 
    visible={show}  
    className='index' 
    closable 
    maskClosable 
    onCancel={onHideHandler}
    footer={[]}
    >
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
                    
                    <div className='small d-flex align-items-center' style={{color:'#959595',fontWeight:'500',fontSize:'13px'}}>
                        <span>
                            <a onClick={() => handleReply(item.id)}>Reply</a>
                        </span>
                        <span className='ms-3'>
                            <CommentActions user={item.user.id} commentId={item.id}/>
                        </span>
                    </div>

                    
                    {item.replies !== null && item.replies.length > 0 ?
                        item.replies.map((reply) => (
                            <div className='ms-5 mt-2'>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0" style={{ fontWeight: '600' }}>
                                {/* {reply.user.username}{" "} */}
                                <span className="small" style={{ color: '#959595', fontWeight: '500', fontSize: '13px' }}>4 hrs</span>
                                </p>
                            </div>
                            <p className="small mb-0">
                                {reply.content}
                            </p>
                            </div>
                        ))
                        :
                        ''
}

                </div>
            </div>
        </div>
        ))}

       
        <div className='d-flex flex-start mt-5 mx-2' style={{position:'sticky',bottom:'0'}}>
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
                                onChange={(e)=>setComment(e.target.value)}
                                ref={inputRef}/> 
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

    </Modal>
    </div>
  )
}

export default Comments