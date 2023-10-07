import React, { Fragment, useState } from "react";
import { Modal, Form, Input, Button, Collapse } from "antd";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Upload, message } from "antd";
import { notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { apiCallSuccess } from "@/Redux/apiSuccess";
const { TextArea } = Input;
import { useTranslation } from "next-i18next";

function UploadFiles({ setUploadShow }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { Panel } = Collapse;

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [show, setShow] = useState(true);
  const [hideLike, setHideLike] = useState(false);
  const [hideComment, setHIdeComment] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleFileChange = (e) => {
    if (e.fileList.length > 0) {
      setFile(e.fileList[0].originFileObj);
    }
  };
  const handleCaptionChange = (e) => {
    if (e.target.value.length < 300) {
      setCaption(e.target.value);
    } else {
      notification.error({
        message: t("Error"),
        description: "Character limit exceeded ",
      });
    }
  };

  const uploadSubmitHandler = () => {
    Axios.post(
      apis.homepageapi,
      {
        caption: caption,
        image: file,
        hide_comment: hideComment,
        hide_like: hideLike,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        
        if (res.data.status === 1) {
          console.log("sucesss");
          dispatch(apiCallSuccess());
          notification.success({
            message: "Success",
            description: "Post created Successfully",
          });
        } else {
          console.log("failed");
        }
      })
      .catch((error) => {
        notification.error({
          message: "error",
          description: "Please upload image less than 1 mb ",
        });
        console.log("Eroorss:", error, {
          caption: caption,
          image: file,
        });
      });
    setShow(false);
    setUploadShow(false);
  };

  return (
    <Fragment>
      <Modal
        title={t("Create a post")}
        open={show}
        onCancel={() => {
          setShow(false);
          setUploadShow(false);
        }}
        className="upload_file"
        centered
        footer={[
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={uploadSubmitHandler}
          >
            {t("Share")}
          </Button>,
        ]}
      >
        <Form>
          <div style={{ width: "100%", maxHeight: "70vh" }}>
            <Upload.Dragger
              name="file"
              accept=".jpg,.png"
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
            >
              {file ? (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded Image"
                    style={{ maxWidth: "100%", maxHeight: "70vh" }}
                  />
                </div>
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className=" dark-theme-color ">
                    {t("Click or drag file to upload")}
                  </p>
                </>
              )}
            </Upload.Dragger>
          </div>
          <div
            className=" dark-theme-color"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {t("Description")}
            <Form.Item>
              <TextArea
                className="cont-theme-bg"
                rows={4}
                value={caption}
                onChange={(e) => handleCaptionChange(e)}
                maxLength={300}
              />
            </Form.Item>
          </div>
        </Form>
        <Collapse bordered={false}>
          <Panel header={t("Advanced settings")} key="1">
            <div>
              <p className="dark-theme-color">
                {t("Hide like and view counts")}
              </p>
              <div
                className="toggle1"
                style={{ marginRight: "0px", marginTop: "-35px" }}
              >
                {" "}
                <input
                  placeholder="Active"
                  onChange={(e) => setHideLike(e.target.checked ? true : false)}
                  checked={hideLike}
                  type="checkbox"
                />
                <label></label>{" "}
              </div>
            </div>
            <div>
              <p className="dark-theme-color">{t("Turn off commenting")}</p>
              <div
                className="toggle1"
                style={{ marginRight: "0px", marginTop: "-35px" }}
              >
                {" "}
                <input
                  placeholder="Active"
                  onChange={(e) =>
                    setHIdeComment(e.target.checked ? true : false)
                  }
                  checked={hideComment}
                  type="checkbox"
                />
                <label></label>{" "}
              </div>
            </div>
          </Panel>

          {/* Add more panels as needed */}
        </Collapse>
      </Modal>

      <Modal
        open={showModal2}
        title="Upload Image"
        onCancel={() => setShowModal2(false)}
        footer={[
          <Button key="back" onClick={() => setShowModal2(false)}>
            {t("Cancel")}
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={uploadSubmitHandler}
          >
            {t("Share")}
          </Button>,
        ]}
      >
        <Form>
          {/* <Form.Item>
          <input type="file" onChange={handleFileChange} />
        </Form.Item> */}
          {file && (
            <div style={{ textAlign: "center" }}>
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                style={{ maxWidth: "100%", maxHeight: "70vh" }}
              />
            </div>
          )}
          <Form.Item label="Description">
            <TextArea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
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
  );
}

export default UploadFiles;
