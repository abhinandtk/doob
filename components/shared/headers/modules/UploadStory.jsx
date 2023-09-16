import React, { Fragment, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
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

function UploadStory({ setAddStoryShow }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [show, setShow] = useState(true);

  const handleFileChange = (e) => {
    if (e.fileList.length > 0) {
      setFile(e.fileList[0].originFileObj);
    }
  };
  const handleCaptionChange = (e) => {
    if (e.target.value.length < 100) {
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
      apis.addStory,
      {
        caption: caption,
        image: file,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        console.log("Eroor:", res);
        if (res.data.status === 1) {
          console.log("sucesss");
          dispatch(apiCallSuccess());
          notification.success({
            message: t("Success"),
            description: t("Story Added Successfully"),
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
    setAddStoryShow(false);
  };

  return (
    <Fragment>
      <Modal
        title={t("Add a Story")}
        open={show}
        onCancel={() => {
          setShow(false);
          setAddStoryShow(false);
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
            {t("Caption")}
            <Form.Item>
              <TextArea
                className="cont-theme-bg"
                rows={4}
                value={caption}
                onChange={(e) => handleCaptionChange(e)}
                maxLength={100}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default UploadStory;
