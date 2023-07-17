import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
function MessagesList({ onChatSelect, onNewMsg }) {
  const router = useRouter();
  const [inboxUsers, setInboxUsers] = useState([]);

  const updateChat = useSelector((state) => state.chatUsers.chatUpdate);
  console.log("updateChat");
  useEffect(() => {
    Axios.get(apis.inboxUser, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setInboxUsers(res.data.data);
    });
  }, [updateChat]);
  return (
    <Fragment>
      <div className="leftSide">
        <div className="header">
          <div className="text">
            <h6
              style={{
                fontWeight: "600",
                fontSize: "17px",
                marginLeft: "3px",
              }}
            >
              Messages
            </h6>
          </div>
          <h6
            style={{
              fontWeight: "600",
              color: "#17a803",
              fontSize: "15px",
              marginRight: "8px",
              cursor: "pointer",
            }}
            onClick={() => onNewMsg(true)}
          >
            New Message
          </h6>
        </div>
        <div className="search_chat">
          <div>
            <input type="text" placeholder="Search Contacts"></input>
          </div>
        </div>
        <div className="chatlist">
          {inboxUsers.map((item, index) => (
            <div
              key={index}
              onClick={() => onChatSelect(item.reciepient.user_id)}
              className="block active"
            >
              <div className="imgBox">
                <img
                  src={
                    item.reciepient.user_image
                      ? `${constants.port}${item.reciepient.user_image}`
                      : "/images/accounts/user_default.png"
                  }
                  className="cover"
                  alt=""
                />
                <svg
                  width="10"
                  height="10"
                  style={{
                    marginLeft: "30px",
                    marginTop: "35px",
                    position: "absolute",
                  }}
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="4.82459"
                    cy="5.16357"
                    rx="4.66443"
                    ry="4.83643"
                    fill="#17A803"
                  />
                </svg>
              </div>
              <div className="details">
                <div className="listHead">
                  <p>
                    {item.reciepient.name}
                    <span>
                      <img
                        src="/images/Star.png"
                        className=" mb-1"
                        style={{
                          width: "10px",
                          height: "10px",
                          marginLeft: "1px",
                        }}
                      ></img>
                    </span>
                  </p>
                  {item.latest_message_count && (
                    <b>{item.latest_message_count}</b>
                  )}
                </div>
                <div className="message_p">
                  <p>{item.last_message}</p>
                  <p className="time">{moment(item.date).format("hh:mm A")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default MessagesList;
