import React, { useState } from "react";
import { Dropdown, CardImg } from "react-bootstrap";
import { Modal, Form, Input, Button, notification } from "antd";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Login from "@/components/user/Login";
import AuthenticationModals from "@/components/shared/AuthenticationModals";
import { useDispatch } from "react-redux";
import { activeModalShow } from "@/Redux/loginShow";

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
  const labels = Labels("en");
  const dispatch = useDispatch();

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
        message: t("Success"),
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
        message: t("Success"),
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
  const reportModalHandler = () => {
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      setShow(true);
    } else {
      dispatch(activeModalShow("login"));
    }
  };
  const deleteModalHandler = () => {
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      setVisible(true);
    } else {
      dispatch(activeModalShow("login"));
    }
  };

  return (
    <>
      {/* <AuthenticationModals /> */}

      <Modal
        title={t("Why are you reporting this post?")}
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
              placeholder={t("Please enter your reason for reporting")}
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
              {t("Confirm")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={t("Are you sure to delete this post?")}
        open={visible}
        centered
        closable
        maskClosable
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            {t("Cancel")}
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={deletePostHandler}
          >
            {t("Confirm")}
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
            <Dropdown.Item onClick={() => reportModalHandler()}>
              {t("Report")}
            </Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => deleteModalHandler()}>
              {t("Delete")}
            </Dropdown.Item>
          )}
          {/* {data.post_type === "Product" ||
          data.post_type === "Store" ||
          data.post_type === "Field" ||
          data.owner_user_detail !== null ? (
            ""
          ) : (
            <Dropdown.Item onClick={() => sharedClick(postId)}>
              {t("Share")}
            </Dropdown.Item>
          )} */}
          <Dropdown.Item onClick={() => handleSend(data.slug)}>
            {t("Send")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
