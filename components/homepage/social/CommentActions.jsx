import React, { useState } from "react";
import { Dropdown, CardImg } from "react-bootstrap";
import { Modal, Form, Input, Button, notification } from "antd";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";

function CommentActions({ user, commentId, setSuccessApi, postOwner }) {

  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");

  const labels = Labels();

  const commentReportHandler = (e) => {
    e.preventDefault();
    Axios.post(
      apis.reportcomment,
      {
        comment: commentId,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setSuccessApi((prev) => !prev);
      setShow(false);
      notification.success({
        message: t("Success"),
        description: `${labels["Reported successfully"]}`,
      });
    });
  };

  const deleteCommentHandler = () => {
    Axios.post(
      apis.deletecomment,
      {
        comment_id: commentId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setVisible(false);
      setSuccessApi((prev) => !prev);
      notification.success({
        message: t("Success"),
        description: `${labels["Comment deleted successfully"]}`,
      });
    });
  };

  return (
    <>
      <Modal
        zIndex={1100}
        title={t("Why are you reporting this comment?")}
        open={show}
        centered
        closable
        maskClosable
        footer={null}
        onCancel={() => setShow(false)}
      >
        <Form onSubmitCapture={(e) => commentReportHandler(e)}>
          <Form.Item>
            <Input.TextArea
              className="input-theme-prod"
              placeholder=""
              autoSize={{ minRows: 5 }}
              // value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                backgroundColor: "#17A803",
              }}
              type="primary"
              htmlType="submit"
            >
              {t("Confirm")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        zIndex={1100}
        title={t("Are you sure to delete this comment?")}
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
            type=""
            onClick={deleteCommentHandler}
          >
            {t("Submit")}
          </Button>,
        ]}
      ></Modal>

      <Dropdown className="Drop">
        <Dropdown.Toggle
          variant=""
          id="dropdown-basic"
          style={{
            color: "#959595",
            borderColor: "transparent",
            background: "transparent",
          }}
        >
          <i className="bi bi-three-dots"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu align="center" className="Menu">
          {constants.user_id != user && (
            <Dropdown.Item onClick={() => setShow(true)}>
              {t("Report")}
            </Dropdown.Item>
          )}
          {(constants.user_id == user || constants.user_id == postOwner) && (
            <Dropdown.Item onClick={() => setVisible(true)}>
              {t("Delete")}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default CommentActions;
