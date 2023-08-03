import React, { useState } from "react";
import { Dropdown, CardImg } from "react-bootstrap";
import { Modal, Form, Input, Button, notification } from "antd";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
export default function PostActions({
  postId,
  user,
  setOnSuccess,
  sharedClick,
  data,
  singlePost,
}) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");
  const router = useRouter();
  const labels = Labels();

  const postReportHandler = (e) => {
    console.log("ppppppppppp", postId);
    e.preventDefault();
    Axios.post(
      apis.reportpost,
      {
        post: postId,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setShow(false);
      notification.success({
        message: constants.Success,
        description: `${labels["Reported successfully"]}`,
      });
    });
  };

  const deletePostHandler = () => {
    Axios.post(
      apis.deletepost,
      {
        post_id: postId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      notification.success({
        message: constants.Success,
        description: `${labels["Post deleted successfully"]}`,
      });
      if (singlePost) {
        router.back();
      }
    });
    setVisible(false);
  };
  const handleSend = async (slug) => {
    try {
      await navigator.share({
        url: `${window.location.href}page/post/${slug}`,
      });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <Modal
        title="Why are you reporting this post ??"
        open={show}
        centered
        closable
        maskClosable
        footer={null}
        onCancel={() => setShow(false)}
      >
        <Form onSubmitCapture={(e) => postReportHandler(e)}>
          <Form.Item>
            <Input.TextArea
              placeholder="Please enter your reason for reporting"
              autoSize={{ minRows: 5 }}
              // value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{ backgroundColor: "#17A803" }}
              type="primary"
              htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Are you sure to delete this post??"
        open={visible}
        centered
        closable
        maskClosable
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={deletePostHandler}
          >
            Submit
          </Button>,
        ]}
      ></Modal>

      <Dropdown className="Drop">
        <Dropdown.Toggle
          variant=""
          id="dropdown-basic"
          style={{
            color: "black",
            borderColor: "transparent",
            background: "transparent",
          }}
        >
          <i className="three-dots bi bi-three-dots-vertical"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu align="center" className="Menu">
          {constants.user_id !== user ? (
            <Dropdown.Item onClick={() => setShow(true)}>
              {t("Report")}
            </Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => setVisible(true)}>
              {t("Delete")}
            </Dropdown.Item>
          )}
          {data.post_type === "Product" ||
          data.post_type === "Store" ||
          data.post_type === "Field" ||
          data.owner_user_detail !== null ? (
            ""
          ) : (
            <Dropdown.Item onClick={() => sharedClick(postId)}>
              Share
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={() => handleSend(data.slug)}>
          {t("Send")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
