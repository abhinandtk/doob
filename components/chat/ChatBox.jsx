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
import Link from "next/link";
import { useRouter } from "next/router";
function ChatBox({ selectedId, onNewMsg }) {
  const [chatHeader, setChatHeader] = useState(null);
  const [chatList, setChatList] = useState([]);
  const router = useRouter();
  const { locale } = router;
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

      <div className="rightSide1 ">
        <ChatBoxHeader
          details={chatHeader}
          selectedId={selectedId}
          setOnSuccess={setOnSuccess}
          onNewMsg={onNewMsg}
        />

        <div
          className="chat-container tour-detail-ar "
          style={{ height: "70%", overflow: "auto" }}
        >
          {chatList.map((item, index) => (
            <div ref={divRef} key={index} className="chatbox">
              <button type="button" className="btn btn-success btn-sm">
                {formatDate(item.date)}
              </button>
              {item.messages.map((msg, index_) => (
                <>
                  {msg.message_type === "create" ? (
                    <div className="create-msg">
                      <p className="p-2 my-2">
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
                            {msg.body.includes(constants.domain) ? (
                              <p>
                                <Link
                                  href={{
                                    pathname: msg.body,
                                    query: {
                                      date: moment().format("YYYY-MM-DD"),
                                    },
                                  }}
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {msg.body}
                                </Link>
                              </p>
                            ) : (
                              <p>
                                {msg.body}
                                <br></br>
                              </p>
                            )}
                          </div>
                          <div className="my_chatam" style={{direction:locale==='ar'?'ltr':"", float:locale==='ar'?'left':""}}>
                            {moment(msg.date).format("hh:mm A")}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div        className={locale === "en" ? "message frnd_message" : "message_ar frnd_message"} >
                   
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
                              {msg.body.includes(constants.domain) ? (
                                <Link
                                  href={{
                                    pathname: msg.body,
                                    query: {
                                      date: moment().format("YYYY-MM-DD"),
                                    },
                                  }}
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {msg.body}
                                </Link>
                              ) : (
                                <>
                                  <br></br>
                                  {msg.body}
                                  <br></br>
                                </>
                              )}
                            </p>
                          </div>
                          <div className="frnd_chatam"   style={{direction:locale==='ar'?'ltr':"",float:locale==='ar'?'right':""}}>
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
