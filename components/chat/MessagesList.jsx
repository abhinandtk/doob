import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { Realtime } from "ably";
import { useTranslation } from "next-i18next";
function MessagesList({ onChatSelect, onNewMsg }) {
  const router = useRouter();
  const [inboxUsers, setInboxUsers] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [onSuccess, setOnSuccess] = useState(false);

  const { t } = useTranslation();

  const { theme } = useTheme();

  const updateChat = useSelector((state) => state.chatUsers.chatUpdate);
  const currentUser = constants.user_id;
  const ably = new Realtime({
    key: "dGiWMQ.qq3hMA:fOVhH1gp60ls_buWMB5F71wmw1IYa8cOSGrhMQe_iK8",
  });
  const channel = ably.channels.get(currentUser);
  channel.subscribe((message) => {
    setOnSuccess((prev) => !prev);
    console.log("dddddd", message);
  });
  console.log("updateChat");

  function lastSeenHandler(lastLoginTime, n) {
    const currentTime = moment();
    const loginTime = moment(lastLoginTime);

    const timeDiff = currentTime.diff(loginTime, "minutes");

    return timeDiff <= 3;
  }
  useEffect(() => {
    if (searchQuery.trim() === "") {
      Axios.get(apis.inboxUser, {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }).then((res) => {
        console.log("ioooioioioioioi", res);
        setInboxUsers(res.data.data);
      });
    } else {
      Axios.post(
        apis.chatInboxSearch,
        {
          user_input: searchQuery,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        setInboxUsers(res.data.data);
      });
    }
  }, [updateChat, searchQuery, onSuccess]);
  return (
    <Fragment>
      <div className="leftSide">
        <div className="header">
          <div className="text">
            <h6
              className="dark-theme-color"
              style={{
                fontWeight: "600",
                fontSize: "17px",
                marginLeft: "3px",
              }}
            >
              {t("Messages")}
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
            onClick={() => onNewMsg("new")}
          >
            {t("New Message")}
          </h6>
        </div>
        <div className="search_chat">
          <div>
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search Contacts")}
            ></input>
          </div>
        </div>
        <div className="chatlist">
          {inboxUsers &&
            inboxUsers.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setOnSuccess((prev) => !prev);
                  onChatSelect(item.chat.id);
                  setCurrentId(item.chat.id);
                }}
                className="block active"
                style={{
                  backgroundColor:
                    item.chat.id === currentId
                      ? theme === "dark"
                        ? "#40474c"
                        : "#e9e9e9"
                      : "transparent",
                }}
              >
                <div className="imgBox">
                  <img
                    src={
                      item.recipeint.user_image
                        ? `${constants.port}${item.recipeint.user_image}`
                        : item.recipeint.type === "group"
                        ? "/images/accounts/group_default.png"
                        : "/images/accounts/user_default.png"
                    }
                    className="cover"
                    alt=""
                  />
                  {lastSeenHandler(item.recipeint.last_logined) &&
                    item.chat.type !== "group" && (
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
                    )}
                </div>
                <div className="details">
                  <div className="listHead">
                    <p>
                      {item.recipeint.name}
                      {item.recipeint.user_type === "star" &&
                        item.chat.type === "single" && (
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
                        )}
                    </p>
                    {item.latest_message_count && (
                      <b>{item.latest_message_count}</b>
                    )}
                  </div>
                  <div className="message_p">
                    <p className="last_msg">{item.last_message}</p>
                    <p className="time">
                      {moment(item.date).format("hh:mm A")}
                    </p>
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
