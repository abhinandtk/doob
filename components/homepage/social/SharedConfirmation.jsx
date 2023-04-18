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
            if(res.data.status === 1){
                message.success('Post shared Successfully')
                setOnSuccess(prev => !prev)

            }
            console.log(res)
        })
    }

  return (
    <Modal 
    open={show} 
    onCancel={handleClose} 
    ClassName='shared-confirm-modal'
    centered
    footer={[
        <Button type='secondary' onClick={handleClose}>Cancel</Button>,
        <Button type='primary' onClick={sharedPostHandler}>Ok</Button>
    ]}>
        <p>Are you sure to share this post</p>

    </Modal>


  )
}

export default SharedConfirmation