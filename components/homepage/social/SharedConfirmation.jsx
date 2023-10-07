import React from "react";
import { useState } from "react";
import { Modal, message, Button, notification } from "antd";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";

function SharedConfirmation({ postId, setVisibleShared, setOnSuccess }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const labels = Labels();
  const handleClose = () => {
    setVisibleShared(false);
    setShow(false);
  };
  const sharedPostHandler = () => {
    Axios.post(
      apis.sharedpost,
      {
        parent_id: postId,
        post_type: "Shared",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    )
      .then((res) => {
        setVisibleShared(false);
        
        if (res.data.status === 1) {
          notification.success({
            message: t("Success"),
            description: `${labels["Post shared successfully"]}`,
          });
          setOnSuccess((prev) => !prev);
        }
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      open={show}
      onCancel={handleClose}
      ClassName="shared-confirm-modal"
      centered
      footer={[
        <Button key="cancel" type="secondary" onClick={handleClose}>
          {t("Cancel")}
        </Button>,
        <Button
          key="submit"
          style={{ backgroundColor: "#17A803" }}
          type="primary"
          onClick={sharedPostHandler}
        >
          Ok
        </Button>,
      ]}
    >
      <p>Are you sure to share this post</p>
    </Modal>
  );
}

export default SharedConfirmation;
