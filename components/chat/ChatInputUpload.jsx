import React, { Fragment, useRef } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleChat } from "@/Redux/chatRefresh";
import { notification } from "antd";
import { useRouter } from "next/router";
function ChatInputUpload({ selectedId, setOnSuccess, onNewMsg }) {
  const [messages, setMessages] = useState("");
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const sendRef = useRef();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (isSending) {
      return;
    }
    if (messages) {
      setIsSending(true);
      Axios.post(
        apis.sendMessage,
        {
          chat_id: selectedId,
          body: messages,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        setOnSuccess((prev) => !prev);
        setIsSending(false);
        if (res.data.status === 1) {
          dispatch(toggleChat());
          onNewMsg(null);
          setMessages("");
        } else {
          notification.error({
            message: constants.Error,
            description:
              locale === "en" ? res.data.message_en : res.data.message_ar,
          });
        }
      });
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSendMessage}>
        <div className="chat_input">
          <input
            type="text"
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Write your message"
            value={messages}
          />

          <span
            onClick={handleSendMessage}
            ref={sendRef}
            style={{ cursor: "pointer" }}
          >
            <svg
              width="28"
              height="26"
              viewBox="0 0 28 26"
              className="mx-1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0254 14.833L17.6792 9.58301"
                stroke="white"
                stroke-width="1.85685"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.77104 11.1263C2.82963 10.6892 2.94371 9.40933 3.94968 9.12191L22.3937 3.85221C23.2888 3.59645 24.1273 4.37501 23.8518 5.20623L18.1768 22.3328C17.8672 23.2669 16.4889 23.3728 16.0182 22.4987L12.1097 15.2401C11.9968 15.0304 11.8138 14.8604 11.588 14.7556L3.77104 11.1263Z"
                stroke="white"
                stroke-width="1.85685"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1316_10557)">
              <path
                d="M8.80292 6.68722V7.41958C9.04779 7.41958 9.27646 7.29721 9.41228 7.09346L8.80292 6.68722ZM10.3702 4.33631L9.76083 3.93007V3.93007L10.3702 4.33631ZM18.3806 4.33632L18.9899 3.93007L18.3806 4.33632ZM19.9478 6.68722L19.3385 7.09346C19.4743 7.29721 19.703 7.41958 19.9478 7.41958V6.68722ZM16.9865 15.0459C16.9865 16.488 15.8175 17.657 14.3754 17.657V19.1217C16.6264 19.1217 18.4512 17.2969 18.4512 15.0459H16.9865ZM14.3754 17.657C12.9333 17.657 11.7643 16.488 11.7643 15.0459H10.2995C10.2995 17.2969 12.1244 19.1217 14.3754 19.1217V17.657ZM11.7643 15.0459C11.7643 13.6038 12.9333 12.4348 14.3754 12.4348V10.9701C12.1244 10.9701 10.2995 12.7949 10.2995 15.0459H11.7643ZM14.3754 12.4348C15.8175 12.4348 16.9865 13.6038 16.9865 15.0459H18.4512C18.4512 12.7949 16.6264 10.9701 14.3754 10.9701V12.4348ZM9.41228 7.09346L10.9796 4.74256L9.76083 3.93007L8.19356 6.28098L9.41228 7.09346ZM12.2248 4.07611H16.5259V2.61139H12.2248V4.07611ZM17.7712 4.74256L19.3385 7.09346L20.5572 6.28098L18.9899 3.93007L17.7712 4.74256ZM16.5259 4.07611C17.0263 4.07611 17.4936 4.3262 17.7712 4.74256L18.9899 3.93007C18.4407 3.10623 17.5161 2.61139 16.5259 2.61139V4.07611ZM10.9796 4.74256C11.2571 4.3262 11.7244 4.07611 12.2248 4.07611V2.61139C11.2347 2.61139 10.3101 3.10623 9.76083 3.93007L10.9796 4.74256ZM24.7879 11.1452V18.9466H26.2526V11.1452H24.7879ZM21.0623 22.6722H7.68843V24.1369H21.0623V22.6722ZM3.96283 18.9466V11.1452H2.49811V18.9466H3.96283ZM7.68843 22.6722C5.63084 22.6722 3.96283 21.0042 3.96283 18.9466H2.49811C2.49811 21.8132 4.82189 24.1369 7.68843 24.1369V22.6722ZM24.7879 18.9466C24.7879 21.0042 23.1199 22.6722 21.0623 22.6722V24.1369C23.9289 24.1369 26.2526 21.8132 26.2526 18.9466H24.7879ZM21.0623 7.41958C23.1199 7.41958 24.7879 9.08759 24.7879 11.1452H26.2526C26.2526 8.27865 23.9289 5.95486 21.0623 5.95486V7.41958ZM7.68843 5.95486C4.8219 5.95486 2.49811 8.27865 2.49811 11.1452H3.96283C3.96283 9.08759 5.63084 7.41958 7.68843 7.41958V5.95486ZM7.68843 7.41958H8.80292V5.95486H7.68843V7.41958ZM21.0623 5.95486H19.9478V7.41958H21.0623V5.95486Z"
                fill="white"
              />
              <circle cx="13.3743" cy="6.68676" r="1.11449" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_1316_10557">
                <rect width="26.7478" height="26.7478" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </form>
    </Fragment>
  );
}

export default ChatInputUpload;
