import React, { Fragment, useState } from 'react'
import { Modal, Form, Input, Button } from 'antd';
import Axios from 'axios'
import apis from '@/public/data/my-constants/Apis'
import constants from '@/public/data/my-constants/Constants'
import { Upload, message } from 'antd';
import { notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { TextArea } = Input;
function UploadFiles({setUploadShow}) {

    const [file,setFile] = useState(null)
    const [caption,setCaption] = useState('')
    const[show,setShow] =useState(true);
    const[showModal2,setShowModal2]=useState(false);


    const handleFileChange =(e) =>{
        if (e.fileList.length > 0) {
            setFile(e.fileList[0].originFileObj);
          }
        
    }

    const uploadSubmitHandler =()=>{
        Axios.post(apis.homepageapi,{
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
                message.success('Post uploaded successfully!');
                notification.success({
                    message: 'Notification Title',
                    description: 'This is the content of the notification.',
                  });
            }else{
                console.log('failed')
            }
        }).catch((error)=>{
            console.log('Eroor:',error)
    })  
    setShow(false) 
    setUploadShow(false)   
    }


  return (
    <Fragment>
        <Modal
        title='Create a post'
        open={show}
        onCancel={()=>{
            setShow(false)
            setUploadShow(false)
        }}
        className='upload_file'
        centered
        footer={[
            <Button key="submit" type="primary" onClick={uploadSubmitHandler}>
            Share
            </Button>,
        ]}>

    
            <Form>
                <div style={{width:'100%',maxHeight:'70vh'}}>
                    <Upload.Dragger
                    name="file"
                    accept=".jpg,.png"
                    beforeUpload={() => false}
                    onChange={handleFileChange}
                    showUploadList={false}
                    >
                    {file ? (
                        <div style={{ textAlign: 'center' }}>
                            <img src={URL.createObjectURL(file)} alt="Uploaded Image" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
                        </div>
                    ):(
                        <>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                        </>
                    )}
                    </Upload.Dragger>
                </div>
                <div style={{width:'100%',marginTop: '1rem'}}>
                    Description
                    <Form.Item>
                    <TextArea rows={4} value={caption} onChange={(e) => setCaption(e.target.value)} />
                    </Form.Item>
                </div>
            </Form>
        </Modal>

        <Modal
      open={showModal2}
      title="Upload Image"
      onCancel={()=>setShowModal2(false)}
      footer={[
        <Button key="back" onClick={()=>setShowModal2(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={uploadSubmitHandler}>
          Share
        </Button>,
      ]}
    >
      <Form>
        {/* <Form.Item>
          <input type="file" onChange={handleFileChange} />
        </Form.Item> */}
        {file && (
          <div style={{ textAlign: 'center' }}>
            <img src={URL.createObjectURL(file)} alt="Uploaded Image" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
          </div>
        )}
        <Form.Item label="Description">
          <TextArea rows={4} value={caption} onChange={(e) => setCaption(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>

        {/* {file ? 
        <img src={URL.createObjectURL(file)} alt="Uploaded file" style={{ maxHeight: 200 }} />} */}

        {/* <Modal 
        show={show}
        onHide={()=>{
            setShow(false) 
            setUploadShow(false)
        }}
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
        </Modal> */}
        {/* <Modal 
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
        </Modal> */}
    </Fragment>
  )
}

export default UploadFiles