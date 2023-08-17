import React from "react";
import { Fragment } from "react";
import ChatBoxHeader from "./header/ChatBoxHeader";
import { useEffect } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { headers } from "@/next.config";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import moment from "moment";
import ChatInputUpload from "./ChatInputUpload";
import { useRef } from "react";
import { Realtime } from "ably";
function ChatBox({ selectedId, onNewMsg }) {
  const [chatHeader, setChatHeader] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  const currentUser = constants.user_id;
  const ably = new Realtime({
    key: "dGiWMQ.qq3hMA:fOVhH1gp60ls_buWMB5F71wmw1IYa8cOSGrhMQe_iK8",
  });
  const channel = ably.channels.get(currentUser);
  channel.subscribe((message) => {
    setOnSuccess((prev) => !prev);
    console.log("dddddd", message);
  });
  useEffect(() => {
    Axios.post(
      apis.chatView,
      {
        chat_id: selectedId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("check4566", res);
      if (res.data.data) {
        setChatHeader(res.data.data.user_header);
        setChatList(res.data.data.messages);
      }
    });
  }, [selectedId, onSuccess]);

  const formatDate = (date) => {
    const today = moment().format("DD-MM-YYYY");
    const yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");

    if (date === today) {
      return "Today";
    } else if (date === yesterday) {
      return "Yesterday";
    } else {
      return date;
    }
  };

  const divRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);
  const scrollToBottom = () => {
    if (divRef.current) {
      const lastElement = divRef.current.lastElementChild;
      if (lastElement) {
        lastElement.scrollIntoView({ behavior: "auto", block: "end" });
      }
    }
  };

  return (
    <Fragment>
      <div className="rightSide1">
        <ChatBoxHeader
          details={chatHeader}
          selectedId={selectedId}
          setOnSuccess={setOnSuccess}
          onNewMsg={onNewMsg}
        />

        <div
          className="chat-container"
          style={{ height: "70%", overflow: "auto" }}
        >
          {chatList.map((item, index) => (
            <div ref={divRef} key={index} className="chatbox">
              <button type="button" class="btn btn-success btn-sm">
                {formatDate(item.date)}
              </button>
              {item.messages.map((msg, index_) => (
                <>
                  {msg.message_type === "create" ? (
                    <div className="create-msg">
                      <p className="px-1 my-2">
                        {`${
                          currentUser == msg.chat.id ? "You" : msg.chat.name
                        }`}
                        &nbsp;{msg.body}
                      </p>
                    </div>
                  ) : (
                    <div key={index_}>
                      {msg.chat.is_sender == true ? (
                        <div>
                          <div className="message my_message">
                            {msg.body.includes(constants.port) ? (
                              <p>
                                <a href={msg.body} target="_blank">
                                  {msg.body}
                                </a>
                              </p>
                            ) : (
                              <p>
                                {msg.body}{constants.domain}
                                <br></br>
                              </p>
                            )}
                          </div>
                          <div className="my_chatam">
                            {moment(msg.date).format("hh:mm A")}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="message frnd_message">
                            {chatHeader.type === "group" && (
                              <img
                                src={
                                  msg.chat.user_image
                                    ? `${constants.port}${msg.chat.user_image}`
                                    : "/images/accounts/user_default.png"
                                }
                                className="grp-user-img mx-2"
                              />
                            )}
                            <p>
                              {chatHeader.type === "group" && (
                                <span
                                  style={{
                                    fontSize: "smaller",
                                    color: "#17A803",
                                  }}
                                >
                                  {msg.chat.name}
                                </span>
                              )}
                              <br></br>
                              {msg.body}
                              <br></br>
                            </p>
                          </div>
                          <div className="frnd_chatam">
                            {moment(msg.date).format("hh:mm A")}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ))}
            </div>
          ))}

          {/* sajin chat end  */}
        </div>
        {chatHeader && chatHeader !== undefined ? (
          chatHeader.is_left ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              You can&apos;t send messages to this group because you are no
              longer in this group
            </div>
          ) : (
            <ChatInputUpload
              selectedId={selectedId}
              setOnSuccess={setOnSuccess}
              onNewMsg={onNewMsg}
            />
          )
        ) : null}
      </div>
    </Fragment>
  );
}

export default ChatBox;
