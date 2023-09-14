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
import { useRouter } from "next/router";
import Link from "next/link";
function Notifications({ setNotificationShow }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const [notificationData, setNotificationData] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const router = useRouter();
  const { locale } = router;
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
          message: t("Success"),
          description: `${labels["Accepted successfully"]}`,
        });
      }
      console.log("reeacccept", res);
    });
  };
  const rejectRequestHandler = (id) => {
    Axios.post(
      apis.rejectRequest,
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
        <section className="side-menu-sections " style={{ direction: locale === 'ar' ? 'rtl' : "" }}>

          <div className="side-menu__suggestions-sections ">
            {notificationData.map((item, index) => {
              return (
                <div key={index} className="side-menu__suggestions-contents">
                  {item.type === "Follow" ? (
                    <div className="side-menu__suggestions">
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}
                          style={{ textDecoration: "none", marginRight: locale === 'ar' ? '15px' : "" }}
                        >
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"

                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                          >
                            Started Following <br></br>you.
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
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
                          onClick={() => followAccount(item.user_id)}
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
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}
                          style={{textDecoration: "none",marginRight:locale==='ar'?'15px':""}}
                        >
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                          >
                            requested to follow you.
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
                      </div>

                      <button
                        onClick={() => acceptRequestHandler(item.user_id)}
                        className="side-suggestion-button2"
                        style={{ marginRight: "6px" }}
                      >
                        {t("Accept")}
                      </button>
                      <button
                        onClick={() => rejectRequestHandler(item.user_id)}
                        className="side-suggestion-button2"
                        style={{
                          marginRight: "6px",
                          backgroundColor: "#90978f",
                        }}
                      >
                        {t("Reject")}
                      </button>
                    </div>
                  ) : item.type === "Marketting Message" ? (
                    <div className="side-menu__suggestions">
                      {/* <Link href={`/userprofile/${item.user_id}`} className="side-menu__suggestion-avatars">
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
                      </Link> */}
                      <div className="side-menu__suggestion-infos"  >
                        <Link
                          href={`/userprofile/${item.user_id}`}

                        >
                          {" "}
                  
                     <span   style={{fontWeight:'600',fontSize:'14px',color:'#000',marginRight:locale==='ar'?'15px':""}}> {item.name} </span>
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '15px' : "" }}
                          >
                            {item.message}&nbsp;
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
                      </div>

                      <button
                        // onClick={() => acceptRequestHandler(item.user_id)}
                        className="side-suggestion-button2"
                      >
                        {t("View")}
                      </button>
                    </div>
                  ) : item.type === "Game Invitation" ? (
                    <div className="side-menu__suggestions">
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}

                          style={{ textDecoration: "none", marginRight: locale === 'ar' ? '15px' : "" }}
                        >
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                          >
                            {item.message}&nbsp;
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
                      </div>

                      <button
                        onClick={() =>
                          router.push({
                            pathname: "/games/all-games",
                            query: { tab: "invited" },
                          })
                        }
                        className="side-suggestion-button2"
                      >
                        {t("View")}
                      </button>
                    </div>
                  ) : item.type === "Live" ? (
                    <></>
                  ) : item.type === "Order" ? (
                    <div className="side-menu__suggestions">
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}
                          style={{textDecoration: "none",marginRight:locale==='ar'?'15px':""}}
                        >
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                          >
                            {item.message}&nbsp;
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
                      </div>

                      <button
                        onClick={() =>
                          router.push({
                            pathname: "/shop/admin-all-orders",
                            query: { tab: "invited" },
                          })
                        }
                        className="side-suggestion-button2"
                      >
                        {t("View")}
                      </button>
                    </div>
                  ) : item.type === "Order Status Changed" ? (
                    <div className="side-menu__suggestions">
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}
                          style={{textDecoration: "none",marginRight:locale==='ar'?'15px':""}}
                        >
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                          >
                            {item.message}&nbsp;
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
                      </div>

                      <button
                        onClick={() =>
                          router.push({
                            pathname: "/page/my-orders",
                            query: { tab: "invited" },
                          })
                        }
                        className="side-suggestion-button2"
                      >
                        {t("View")}
                      </button>
                    </div>
                  ) : item.type === "Stadium Booking" ? (
                    <div className="side-menu__suggestions">
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}
                          style={{textDecoration: "none",marginRight:locale==='ar'?'15px':""}}
                        >
                          {" "}
                          {item.name}
                          <span
                            className="ms-1 dark-theme-color"
                            style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                          >
                            {item.message}&nbsp;
                            <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                          </span>
                        </Link>
                      </div>

                      <button
                        onClick={() =>
                          router.push({
                            pathname: "/play-ground/admin-bookings-ground",
                          })
                        }
                        className="side-suggestion-button2"
                      >
                        {t("View")}
                      </button>
                    </div>
                  ) : (
                    <div className="side-menu__suggestions">
                      <Link
                        href={`/userprofile/${item.user_id}`}
                        className="side-menu__suggestion-avatars"
                      >
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
                      </Link>
                      <div className="side-menu__suggestion-infos">
                        <Link
                          href={`/userprofile/${item.user_id}`}

                          style={{ textDecoration: "none", marginRight: locale === 'ar' ? '15px' : "" }}
                        >
                          {" "}
                          {item.name}
                          {item.type === "Comment" ? (
                            <span
                              className="ms-1 dark-theme-color"
                              style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                            >
                              Commented on your post.
                              <span>{notificationTime(item.created_at)}</span>
                            </span>
                          ) : (
                            <span
                              className="ms-1 dark-theme-color"
                              style={{ fontSize: "12px", marginRight: locale === 'ar' ? '10px' : "" }}
                            >
                              Liked your photo.
                              <span style={{ marginRight: locale === 'ar' ? '10px' : "" }} >{notificationTime(item.created_at)}</span>
                            </span>
                          )}
                        </Link>
                      </div>
                      <div className="side-suggestion-button1">
                        {" "}
                        <img
                          src={`${constants.port}${item.liked_post}`}
                          style={{
                            marginTop: "25px",
                            width: "44px",
                            height: "44px",
                            objectFit: "cover",
                            cursor: "hidden",
                          }}
                        />
                      </div>
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
