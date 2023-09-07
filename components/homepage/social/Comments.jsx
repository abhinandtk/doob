import React from "react";
import { Fragment } from "react";
import { useState, useEffect, useRef } from "react";
import { Button, Dropdown, CardImg } from "react-bootstrap";
import { Modal } from "antd";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import CommentActions from "./CommentActions";
import moment from "moment";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";

function Comments({ setVisibleComment, postId, slug }) {
  const { t } = useTranslation();

  const [show, setShow] = useState(true);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState([]);
  const [replayTo, setReplayTo] = useState(null);
  const [isDisabled, setIsDisabled] = useState();
  const [loginUserImg, setLoginUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  const [successApi, setSuccessApi] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    Axios.post(
      apis.commentlist,
      {
        post_id: postId,
        post_slug: slug,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("titiitititiitititititiiti", res);
      setIsLoading(false);
      setLoginUser(res.data.data.login_user);
      setShowComments(res.data.data.comments);
    });
  }, [successApi]);
  const onHideHandler = () => {
    setShow(false);
    setVisibleComment(false);
  };
  const commentPostHandler = (e) => {
    setIsDisabled(true);
    e.preventDefault();
    let data = { content: comment, post_id: postId };
    if (replayTo) {
      data.parent_id = replayTo;
    }
    Axios.post(apis.postcomment, data, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setComment("");
      setIsDisabled(false);
      setSuccessApi((prev) => !prev);
      inputRef.current.value = "";
      setReplayTo(null);
    });
  };
  const handleReply = (commentId) => {
    setReplayTo(commentId);
    inputRef.current.focus();
  };
  const timeSinceComment = (time) => {
    const timeDiff = moment.duration(moment().diff(moment(time)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission behavior
  //   commentPostHandler(e); // Call the function to handle form submission
  // };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        title={t("Comments")}
        open={show}
        className="index"
        closable
        maskClosable
        onCancel={onHideHandler}
        footer={[]}
      >
        {isLoading
          ? null
          : showComments &&
            showComments.map((item, index) => (
              <div key={index} className="d-flex flex-start mt-4 mx-2">
                <div className="me-2" href="">
                  {item.user.image ? (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={`${constants.port}/media/${item.user.image}`}
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                      }}
                    ></CardImg>
                  ) : (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src="/images/accounts/user_default.png"
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                      }}
                    ></CardImg>
                  )}
                </div>
                <div
                  className="flex-grow-1 flex-shrink-1 "
                  style={{ marginBottom: "-24px" }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="dark-theme-color mb-0"
                        style={{ fontWeight: "600" }}
                      >
                        {item.user.username}&nbsp;
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
                    <p className="dark-theme-color small mb-0">
                      {item.content}
                    </p>

                    <div
                      className="small d-flex align-items-center"
                      style={{
                        color: "#959595",
                        fontWeight: "500",
                        fontSize: "13px",
                      }}
                    >
                      <span>
                        <a onClick={() => handleReply(item.id)}>{t("Reply")}</a>
                      </span>
                      <span className="ms-3">
                        <CommentActions
                          user={item.user.id}
                          commentId={item.id}
                          setSuccessApi={setSuccessApi}
                        />
                      </span>
                    </div>

                    {item.replies !== null && item.replies.length > 0
                      ? item.replies.map((reply, index) => (
                          <div
                            key={index}
                            className="ms-auto mt-2 d-flex align-items-start"
                          >
                            {reply.user_details.image ? (
                              <CardImg
                                className="rounded-circle shadow-1-strong me-3"
                                src={`${constants.port}${reply.user_details.image}`}
                                style={{ width: "44px", height: "44px" }}
                              ></CardImg>
                            ) : (
                              <CardImg
                                className="rounded-circle shadow-1-strong me-3"
                                src="/images/accounts/user_default.png"
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  objectFit: "cover",
                                }}
                              ></CardImg>
                            )}
                            <div className="d-flex flex-column justify-content-between">
                              <div className="mb-0">
                                <p
                                  className="mb-0"
                                  style={{ fontWeight: "600" }}
                                >
                                  {reply.user_details.name}&nbsp;
                                  <span
                                    className="small"
                                    style={{
                                      color: "#959595",
                                      fontWeight: "500",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {timeSinceComment(reply.created_at)}
                                  </span>
                                </p>
                                <p className="small mb-0">{reply.content}</p>
                              </div>
                              <div
                                className="small d-flex align-items-center"
                                style={{
                                  color: "#959595",
                                  fontWeight: "500",
                                  fontSize: "13px",
                                }}
                              >
                                <span>
                                  <CommentActions
                                    user={reply.user_details.id}
                                    commentId={reply.id}
                                    setSuccessApi={setSuccessApi}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            ))}

        <div
          className="d-flex flex-start mt-5 mx-2"
          style={{ position: "sticky", bottom: "0" }}
        >
          <div className="me-2" href="">
            {loginUserImg ? (
              <CardImg
                className="rounded-circle shadow-1-strong "
                src={`${constants.port}${loginUserImg}`}
                style={{ width: "44px", height: "44px",objectFit:"cover" }}
              ></CardImg>
            ) : (
              <CardImg
                className="rounded-circle shadow-1-strong "
                src="../images/accounts/user_default.png"
                style={{ width: "44px", height: "44px" }}
              ></CardImg>
            )}
          </div>
          <div
            className="flex-grow-1 flex-shrink-1 "
            style={{ marginBottom: "-24px" }}
          >
            <div>
              <Form onSubmit={commentPostHandler}>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Group
                    className="mb-3 w-100"
                    controlId="formBasicPassword"
                  >
                    <Form.Control
                      type=""
                      placeholder={t("Add a comment")}
                      className="mark dark-theme-color"
                      style={{
                        fontSize: "13px",
                        height: "37px",
                        backgroundColor: theme === "dark" ? "#343C42" : "",
                      }}
                      onChange={(e) => setComment(e.target.value)}
                      ref={inputRef}
                    />
                  </Form.Group>
                  <p
                    className="mx-2"
                    style={{
                      color: theme === "dark" ? "#17A803" : "black",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    onClick={commentPostHandler}
                    disabled={isDisabled}
                  >
                    {t("Post")}
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Comments;
