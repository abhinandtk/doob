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
function ChatBox({ selectedId,onNewMsg }) {
  const [chatHeader, setChatHeader] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  useEffect(() => {
    Axios.post(
      apis.chatView,
      {
        recipient_id: selectedId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.data) {
        setChatHeader(res.data.data.user_header);
        setChatList(res.data.data.messages);
      }
    });
  }, [selectedId,onSuccess]);
  return (
    <Fragment>
      <div className="rightSide1">
        <ChatBoxHeader details={chatHeader} selectedId={selectedId} setOnSuccess={setOnSuccess}/>
        <hr
          style={{ color: "grey", width: "95%" }}
          className="col-md-7 mx-3"
        ></hr>
        <button type="button" class="btn btn-success btn-sm">
          Today
        </button>
        {chatList.map((item, index) => (
          <div key={index} className="chatbox">
            {item.chat.is_sender == true ? (
              <div>
                <div className="message my_message">
                  <p>
                    {item.body}
                    <br></br>
                  </p>
                </div>
                <div className="my_chatam">
                  {moment(item.date).format("hh:mm A")}
                </div>
              </div>
            ) : (
              <div>
                <div className="message frnd_message">
                  <p>
                    {item.body}
                    <br></br>
                  </p>
                </div>
                <div className="frnd_chatam">
                  {moment(item.date).format("hh:mm A")}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* sajin chat end  */}

        <ChatInputUpload selectedId={selectedId} setOnSuccess={setOnSuccess} onNewMsg={onNewMsg}/>
      </div>
    </Fragment>
  );
}

export default ChatBox;
