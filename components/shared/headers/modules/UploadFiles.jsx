import React, { Fragment, useState } from 'react'
import { Modal,Form,Button, ModalBody } from 'react-bootstrap'
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
function UploadFiles({setUploadShow}) {

    const [file,setFile] = useState(null)
    const [caption,setCaption] = useState('')
    const[show,setShow] =useState(true);
    const[showModal1,setShowModal2]=useState(false);

    const handleUpload = (e) =>{
        e.preventDefault()
        setShow(false)
        setShowModal2(true)
    }

    const handleFileChange =(e) =>{
        setFile(e.target.files[0])
    }

    const uploadSubmitHandler =(e)=>{
        e.preventDefault()
        setShowModal2(false)
        Axios.post(apis.uploadpost,{
            caption:caption,
            image:file
        },{
            headers:{
                'Authorization':`Token ${constants.token_id}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res)=>{
            if (res.data.status === 1){
                console.log('sucesss')
            }else{
                console.log('failed')
            }
        }).catch((error)=>{
            console.log('Eroor:',error)
    })      
    }


  return (
    <Fragment>
        <Modal 
        show={show}
        
        onHide={()=>setShow(false)}
        className='upload_file'
        centered>
            <Modal.Header closeButton style={{textAlign:'center'}}>
            <Modal.Title> create new post</Modal.Title>
            </Modal.Header>
            <ModalBody style={{margin:'10%'}}>
                <Form onSubmit={(e)=>handleUpload(e)}>
                    <Form.Group>
                    <Form.Label>Select a file to upload</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} required/>
                    </Form.Group>
                    <Modal.Footer>

                    <Button type="submit">Upload</Button>
                    </Modal.Footer>
            </Form>
        </ModalBody>
        </Modal>
        <Modal 
        show={showModal1}
        onHide={()=>setShowModal2(false)}
        className='upload_files'
        centered>
            <div className='modal-contents'>
            <Form onSubmit={(e)=>uploadSubmitHandler(e)}>
            <ModalBody className='row'>
                <div className='col-12'>
                    {file != null && <img src={URL.createObjectURL(file)} alt="Uploaded Image" width='100%' style={{objectPosition:'top',objectFit:'fit',maxHeight:'70vh'}}/> }                  
                </div>
                
                <div className='col-12'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" onChange={(e)=>setCaption(e.target.value)} />
                </div>
            </ModalBody>
            <Modal.Footer>
                <Button type='submit'>share</Button>
            </Modal.Footer>
            </Form>
            </div>
        </Modal>
    </Fragment>
  )
}

export default UploadFiles