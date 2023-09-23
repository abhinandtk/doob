import React, { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import ChatHeaderActions from "./ChatHeaderActions";
import constants from "@/public/data/my-constants/Constants";
import ChatHeaderActionsGroup from "./ChatHeaderActionsGroup";
import moment from "moment";
import { useRouter } from "next/router";

function ChatBoxHeader({ details, selectedId, setOnSuccess, onNewMsg }) {
  const router = useRouter();
  const { locale } = router;
  console.log("trtrtrtrtrweee", details);
  function lastSeenHandler(lastLoginTime) {
    const currentTime = moment();
    const loginTime = moment(lastLoginTime);
    const timeDiff = currentTime.diff(loginTime, "minutes");

    return timeDiff <= 3;
  }
  return (
    <Fragment>
      <div className="header-full-chat tour-detail-ar ">
        {details && (
          <div className="header ">
            <span
            // onClick={() => onNewMsg(null)}
            // style={{
            //   cursor: "pointer",
            //   marginLeft: locale === "ar" ? "12px" : "",
            // }}
            >
              <svg
                width="15"
                height="14"
                style={{ marginRight: "4px" }}
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.84842 12.8221C6.0442 13.0178 6.28878 13.1156 6.53357 13.1156C6.77834 13.1156 7.02292 13.0178 7.21872 12.8221C7.61028 12.4305 7.61028 11.8188 7.21872 11.4272L3.35251 7.53656H14.0213C14.5596 7.53656 15 7.0962 15 6.55787C15 6.01953 14.5596 5.57916 14.0213 5.57916H3.35251L7.24315 1.68853C7.6347 1.29697 7.6347 0.685225 7.24315 0.293666C6.85159 -0.0978886 6.23985 -0.0978886 5.84829 0.293666L0.293666 5.87276C-0.0978886 6.26431 -0.0978886 6.87606 0.293666 7.26762L5.84842 12.8221Z"
                  fill="black"
                />
              </svg>
            </span>
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
                    className={locale === "en" ? "pic" : "pic_ar"}
                  ></img>
                ) : (
                  <img
                    src={
                      details.image
                        ? `${constants.port}/media/${details.image}`
                        : "/images/accounts/user_default.png"
                    }
                    alt=""
                    className={locale === "en" ? "pic" : "pic_ar"}
                  ></img>
                )}

                <p
                  className="chats-para"
                  style={{
                    marginRight: locale === "ar" ? "90px" : "",
                    marginLeft: locale === "en" ? "90px" : "",
                  }}
                  // style={{
                  //   marginLeft: "90px",
                  //   marginTop: "36px",
                  //   fontWeight: "600",
                  //   fontSize: "14px",
                  //   minWidth: "100px",
                  // }}
                >
                  {details.name}
                  <br></br>
                  {lastSeenHandler(details.last_login) &&
                    details.type !== "group" && (
                      <span
                        style={{
                          fontWeight: "400",
                          fontSize: "13px",
                          color: "#797C7B",
                        }}
                      >
                        Active Now
                      </span>
                    )}
                  &nbsp;
                </p>
              </div>
              {lastSeenHandler(details.last_login) &&
                details.type !== "group" && (
                  <svg
                    width="10"
                    height="10"
                    style={{
                      marginTop: "63px",
                      position: "absolute",
                      left: locale === "en" ? "70px" : "",
                      right: locale === "ar" ? "70px" : "",
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
