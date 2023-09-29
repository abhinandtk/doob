import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { CardImg } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { useTranslation } from "next-i18next";
function SupportMessages({ data, setSuccess, status }) {
  const router = useRouter();
  const { spId } = router.query;
  const { t } = useTranslation();
  const inputRef = useRef();
  const [comment, setComment] = useState("");
  const timeSinceComment = (time) => {
    const timeDiff = moment.duration(moment().diff(moment(time)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  };
  console.log("result,rdes", data);

  const supportMessageHandler = () => {
    Axios.post(
      apis.userSupportMsg,
      {
        ticket_no: spId,
        message: comment,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setSuccess((prev) => !prev);
      inputRef.current.value = "";
      console.log("result,res", res);
    });
  };

  return (
    <div className="message-section">
      <div className="message-container">
        <div className="message-content">
          <div className="message"></div>
        </div>
        {data &&
          data.map((item, index) => (
            <div key={index} className="message-item">
              <div className="message-avatar">
                {item.user.is_admin ? (
                  <CardImg
                    className="rounded-circle shadow-1-strong"
                    src="/images/accounts/technical-support.png"
                    style={{
                      width: "34px",
                      height: "34px",
                      objectFit: "cover",
                    }}
                  />
                ) : item.user.image ? (
                  <CardImg
                    className="rounded-circle shadow-1-strong"
                    src={`${constants.port}${item.user.image}`}
                    style={{
                      width: "34px",
                      height: "34px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <CardImg
                    className="rounded-circle shadow-1-strong"
                    src="/images/accounts/user_default.png"
                    style={{
                      width: "34px",
                      height: "34px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div className="message-text">
                <div className="message-sender">
                  <p
                    className="mb-0 dark-theme-color"
                    style={{ fontWeight: "600" }}
                  >
                    {item.user.username ? item.user.username : "Admin"}&nbsp;
                    <span
                      className="small"
                      style={{
                        color: "#959595",
                        fontWeight: "500",
                        fontSize: "13px",
                      }}
                    >
                      {timeSinceComment(item.created_at)}
                    </span>
                  </p>
                </div>
                <p className="small mb-0 dark-theme-color">{item.message}</p>
              </div>
            </div>
          ))}

        {/* Post message input */}
        <div className="post-message-input">
          <div className="message-avatar">{/* Render avatar */}</div>
          <div className="message-input">
            {status != 2 && status != 1 && (
              <Form onSubmit={supportMessageHandler}>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Group
                    className="mb-3 w-100"
                    controlId="formBasicPassword"
                  >
                    <Form.Control
                      type=""
                      // placeholder="Add a comment"
                      className="mark input-theme-prod"
                      style={{ fontSize: "13px", height: "37px" }}
                      onChange={(e) => setComment(e.target.value)}
                      ref={inputRef}
                    />
                  </Form.Group>

                  <p
                    className="mx-2 dark-theme-color"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    onClick={supportMessageHandler}
                  >
                    {t("Send")}
                  </p>
                </div>
              </Form>
            )}
          </div>
        </div>
        {/* End of post message input */}
      </div>
    </div>
  );
}

export default SupportMessages;
