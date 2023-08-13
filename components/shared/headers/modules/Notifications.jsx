import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Modal, notification } from "antd";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import moment from "moment";
import { Labels } from "@/public/data/my-constants/Labels";
import { toggle } from "@/Redux/updateNavbar";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
function Notifications({ setNotificationShow }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const [notificationData, setNotificationData] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const labels = Labels();
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get(apis.notification, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("reerererrererererr", res);
      dispatch(toggle());
      setNotificationData(res.data.data);
    });
  }, [followStatus]);

  const notificationTime = (time) => {
    const timeDiff = moment.duration(moment().diff(moment(time)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  };

  const followAccount = (id) => {
    Axios.post(
      apis.follow,
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setFollowStatus(!followStatus);
      console.log("reefollow request", res);
    });
  };
  const acceptRequestHandler = (id) => {
    Axios.post(
      apis.acceptRequest,
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setFollowStatus(!followStatus);
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
          description: `${labels["Accepted successfully"]}`,
        });
      }
      console.log("reeacccept", res);
    });
  };

  const unFollowAccount = (id) => {
    Axios.delete(apis.follow, {
      data: { user_id: id },
      headers: { Authorization: `Token ${constants.token_id}` },
    })
      .then((response) => {
        setFollowStatus(!followStatus);
        console.log("response:", response);
      })
      .catch((error) => {
        console.error("handleUnfollow error:", error);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        title="Notifications"
        open={show}
        onCancel={() => {
          setShow(false);
          setNotificationShow(false);
        }}
        maskClosable
        footer={null}
        style={{ position: "absolute", right: 0 }}
        bodyStyle={{ maxHeight: "70vh", overflowY: "scroll" }}
      >
        <section className="side-menu-sections ">
          <div className="side-menu__suggestions-sections ">
            {notificationData.map((item, index) => {
              return (
                <div key={index} className="side-menu__suggestions-contents">
                  {item.type === "Follow" ? (
                    <div className="side-menu__suggestions">
                      <a href="#" className="side-menu__suggestion-avatars">
                        {item.image ? (
                          <img
                            src={`${constants.port}/media/${item.image}`}
                            style={{ objectFit: "cover" }}
                            alt="User Picture"
                          />
                        ) : (
                          <img
                            src="/images/accounts/user_default.png"
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              // width: "30px",
                              // height: "30px",
                              // borderRadius: "50%",
                            }}
                          />
                        )}
                      </a>
                      <div className="side-menu__suggestion-infos">
                        <a href="#" style={{ textDecoration: "none" }}>
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px" }}
                          >
                            Started Following <br></br>you.
                            <span>{notificationTime(item.created_at)}</span>
                          </span>
                        </a>
                      </div>
                      {item.is_following === 1 ? (
                        <button
                          onClick={() => unFollowAccount(item.user_id)}
                          className="side-suggestion-button1"
                        >
                          Following
                        </button>
                      ) : item.is_requested == 1 ? (
                        <button
                          type="button"
                          style={{ backgroundColor: "grey" }}
                          className="side-suggestion-button2"
                        >
                          Requested
                        </button>
                      ) : (
                        <button
                          onClick={() => followAccount(item.user_id)}
                          className="side-suggestion-button2"
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  ) : item.type === "Follow_request" ? (
                    <div className="side-menu__suggestions">
                      <a href="#" className="side-menu__suggestion-avatars">
                        {item.image ? (
                          <img
                            src={`${constants.port}/media/${item.image}`}
                            style={{ objectFit: "cover" }}
                            alt="User Picture"
                          />
                        ) : (
                          <img
                            src="/images/accounts/user_default.png"
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              // width: "30px",
                              // height: "30px",
                              // borderRadius: "50%",
                            }}
                          />
                        )}
                      </a>
                      <div className="side-menu__suggestion-infos">
                        <a href="#" style={{ textDecoration: "none" }}>
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px" }}
                          >
                            requested to follow<br></br>you.
                            <span>{notificationTime(item.created_at)}</span>
                          </span>
                        </a>
                      </div>

                      <button
                        onClick={() => acceptRequestHandler(item.user_id)}
                        className="side-suggestion-button2"
                      >
                        {t("Accept")}
                      </button>
                    </div>
                  ) : (
                    <div className="side-menu__suggestions">
                      <a href="#" className="side-menu__suggestion-avatars">
                        {item.image ? (
                          <img
                            src={`${constants.port}/media/${item.image}`}
                            style={{ objectFit: "cover" }}
                            alt="User Picture"
                          />
                        ) : (
                          <img
                            src="/images/accounts/user_default.png"
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              // width: "30px",
                              // height: "30px",
                              // borderRadius: "50%",
                            }}
                          />
                        )}
                      </a>
                      <div className="side-menu__suggestion-infos">
                        <a href="#" style={{ textDecoration: "none" }}>
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px" }}
                          >
                            Liked your photo.
                            <span>{notificationTime(item.created_at)}</span>
                          </span>
                        </a>
                      </div>
                      <button className="side-suggestion-button1">
                        {" "}
                        <img
                          src={`${constants.port}${item.liked_post}`}
                          style={{
                            marginTop: "25px",
                            width: "44px",
                            height: "44px",
                            objectFit: "cover",
                          }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </Modal>
    </div>
  );
}

export default Notifications;
