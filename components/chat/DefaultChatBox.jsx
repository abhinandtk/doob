import React from "react";
import { Fragment } from "react";

function DefaultChatBox() {
  return (
    <Fragment>
      <div className="rightSides">
        <div className="chatbox">
          <div className="tex-message">
            <img
              src="/images/share.png"
              style={{
                width: "35px",
                height: "35px",
                marginLeft: "115px",
                marginTop: "-5px",
              }}
            ></img>
            <h2
              style={{
                marginLeft: "82px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Send Messages
            </h2>
            <p style={{ fontSize: "14px", fontWeight: "400" }}>
              Send Photos and Message to Friend&apos;s or Group
            </p>
          </div>
          <div className="sent">Send Message</div>
        </div>
      </div>
    </Fragment>
  );
}

export default DefaultChatBox;
