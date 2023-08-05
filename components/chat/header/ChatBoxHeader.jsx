import React, { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import ChatHeaderActions from "./ChatHeaderActions";
import constants from "@/public/data/my-constants/Constants";
import ChatHeaderActionsGroup from "./ChatHeaderActionsGroup";

function ChatBoxHeader({ details, selectedId, setOnSuccess, onNewMsg }) {
  return (
    <Fragment>
      <div className="header-full-chat">
        {details && (
          <div className="header">
            <div className="imgText">
              <div className="userimg">
                {details.type === "group" ? (
                  <img
                    src={
                      details.user_image
                        ? `${constants.port}${details.user_image}`
                        : "/images/accounts/group_default.png"
                    }
                    alt=""
                    className="pic"
                  ></img>
                ) : (
                  <img
                    src={
                      details.image
                        ? `${constants.port}/media/${details.image}`
                        : "/images/accounts/user_default.png"
                    }
                    alt=""
                    className="pic"
                  ></img>
                )}

                <p
                  style={{
                    marginLeft: "90px",
                    marginTop: "36px",
                    fontWeight: "600",
                    fontSize: "14px",
                    minWidth: "100px",
                  }}
                >
                  {details.name}
                  <br></br>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "13px",
                      color: "#797C7B",
                    }}
                  >
                    Active Now
                  </span>
                </p>
              </div>
              <svg
                width="10"
                height="10"
                style={{
                  marginLeft: "-68px",
                  marginTop: "63px",
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
            {details.type === "group" ? (
              <ChatHeaderActionsGroup
                details={details}
                selectedId={selectedId}
                setOnSuccess={setOnSuccess}
                onNewMsg={onNewMsg}
              />
            ) : (
              <ChatHeaderActions
                selectedId={selectedId}
                setOnSuccess={setOnSuccess}
                details={details}
              />
            )}
          </div>
        )}
        <hr
          style={{ color: "grey", width: "95%" }}
          className="col-md-7 mx-3"
        ></hr>
      </div>
    </Fragment>
  );
}

export default ChatBoxHeader;
