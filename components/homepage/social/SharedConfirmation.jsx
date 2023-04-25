import React from 'react'
import { useState } from 'react';
import {Modal,message,Button} from 'antd'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis';
import constants from '@/public/data/my-constants/Constants';

function SharedConfirmation({postId,setVisibleShared,setOnSuccess}) {
    const [show,setShow] = useState(true)
    const handleClose = () => {
        setVisibleShared(false)
        setShow(false);
    }
    const sharedPostHandler =()=>{
        console.log('weeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        console.log('8898989898989898989899',{
            parent_id:postId,
            post_type:'Shared'

        })
        Axios.post(apis.sharedpost,{
            parent_id:postId,
            post_type:'Shared'

        },
        {
            headers:{
                'Authorization':`Token ${constants.token_id}`
            }
        }).then((res)=>{
            setVisibleShared(false)
            console.log('8898989898989898989899',{
                parent_id:postId,
                post_type:'Shared'
    
            })
            if(res.data.status === 1){
                message.success('Post shared Successfully')
                setOnSuccess(prev => !prev)

            }
            console.log(res)
        }).catch((error)=>{
            console.error(error)
        })
    }

  return (
    <Modal 
    open={show} 
    onCancel={handleClose} 
    ClassName='shared-confirm-modal'
    centered
    footer={[
        <Button key='cancel' type='secondary' onClick={handleClose}>Cancel</Button>,
        <Button key='submit' style={{backgroundColor:'#17A803'}} type='primary' onClick={sharedPostHandler}>Ok</Button>
    ]}>
        <p>Are you sure to share this post</p>

    </Modal>


  )
}

export default SharedConfirmation