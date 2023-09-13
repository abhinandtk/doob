import { Button, Input, List, Modal, notification } from "antd";
import React, { Fragment } from "react";
import { useState } from "react";
import { CardImg, Dropdown } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import CreateGroupChat from "../new-chat/CreateGroupChat";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
function ChatHeaderActionsGroup({
  selectedId,
  setOnSuccess,
  details,
  onNewMsg,
}) {
  const { t } = useTranslation();
  const labels = Labels();
  const [visible, setVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const { theme } = useTheme();

  const clearChatHandler = () => {
    Axios.post(
      apis.clearChat,
      {
        chat_id: selectedId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      if (res.data.status === 1) {
        setVisible(false);
        notification.success({
          message: t("Success"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };

  const exitGroupHandler = () => {
    Axios.post(
      apis.exitGroup,
      {
        chat_id: details.id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setLeftVisible(false);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };

  const modalMessage = details.is_admin
    ? t("Are you sure to close this group")
    : t("Are you sure to exit this group");

  return (
    <Fragment>
      <Modal
        title="Clear this chat?"
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
            onClick={clearChatHandler}
          >
            {t("Submit")}
          </Button>,
        ]}
      ></Modal>
      <Modal
        title={modalMessage}
        open={leftVisible}
        centered
        closable
        maskClosable
        onCancel={() => setLeftVisible(false)}
        footer={[
          <Button key="back" onClick={() => setLeftVisible(false)}>
            {t("Cancel")}
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type=""
            onClick={exitGroupHandler}
          >
            {t("Submit")}
          </Button>,
        ]}
      ></Modal>

      <ul className="nav_icons" style={{ marginTop: "35px" }}>
        {/* <svg
          width="23"
          height="25"
          className="mt-1 ms-2 "
          viewBox="0 0 23 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.125 19.8421V18.2066C20.125 17.3939 19.6478 16.6632 18.9202 16.3614L16.9708 15.5529C16.0452 15.169 14.9904 15.5848 14.5446 16.5093L14.375 16.8611C14.375 16.8611 11.9792 16.3642 10.0625 14.3769C8.14583 12.3896 7.66667 9.90538 7.66667 9.90538L8.00593 9.72949C8.89753 9.26725 9.29857 8.17355 8.92835 7.21388L8.1486 5.19262C7.85753 4.43811 7.15275 3.94336 6.36902 3.94336H4.79167C3.73312 3.94336 2.875 4.83312 2.875 5.9307C2.875 14.7113 9.73997 21.8294 18.2083 21.8294C19.2669 21.8294 20.125 20.9397 20.125 19.8421Z"
            stroke="black"
            stroke-width="1.12994"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          width="33"
          height="33"
          className="mx-2"
          viewBox="0 0 33 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.3124 24.8564H7.67651C5.99774 24.8564 4.6377 23.4462 4.6377 21.7055V11.9028C4.6377 10.1621 5.99774 8.75195 7.67651 8.75195H18.3124C19.9912 8.75195 21.3512 10.1621 21.3512 11.9028V21.7055C21.3512 23.4462 19.9912 24.8564 18.3124 24.8564Z"
            stroke="black"
            stroke-width="1.27896"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.3516 18.3405L26.477 22.6173C27.4711 23.4477 28.9486 22.7139 28.9486 21.3905V12.218C28.9486 10.8946 27.4711 10.1608 26.477 10.9913L21.3516 15.268"
            stroke="black"
            stroke-width="1.27896"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg> */}
        <Dropdown className="">
          <Dropdown.Toggle
            variant=""
            id="dropdown-basic"
            style={{
              color: "black",
              borderColor: "transparent",
              background: "transparent",
              padding: 0,
            }}
          >
            <svg
              width="4"
              height="31"
              viewBox="0 0 4 16"
              className="me-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 7.99251L2 8.00749M2 2L2 2.01498M2 13.985L2 14"
                stroke={theme === "light" ? "black" : "white"}
                stroke-width="2.36268"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu align="center" className="Menu">
            <Dropdown.Item onClick={() => setVisible(true)}>
              {t("Clear chat")}
            </Dropdown.Item>

            <Dropdown.Item onClick={() => onNewMsg("info")}>
              {t("Group Info")}
            </Dropdown.Item>
            {details.is_admin ? (
              <Dropdown.Item onClick={() => setLeftVisible(true)}>
                {t("Close group")}
              </Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => setLeftVisible(true)}>
                {t("Exit group")}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </Fragment>
  );
}

export default ChatHeaderActionsGroup;
