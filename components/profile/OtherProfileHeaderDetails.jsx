import React, { Fragment, useState } from "react";
import { Tab, Tabs, Card, CardImg, Dropdown } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Button, List, Modal, notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
import moment from "moment";
import StarInfo from "./StarInfo";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";
import MessageFromProfile from "./MessageFromProfile";
function OtherProfileHeaderDetails({
  data,
  id,
  isPrivate,
  setIsSuccess,
  blockedfrom,
  blockedby,
  storeDetail,
  groundDetail,
}) {
  const [show, setShow] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showField, setShowField] = useState(false);
  console.log("daaata", data, groundDetail);
  const labels = Labels();
  const router = useRouter();
  const { locale } = router;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const followHandler = () => {
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
      if (res.data.status === 1) {
        setIsSuccess((prev) => !prev);
        notification.success({
          message: t("Success"),
          description: `${labels["Followed successfully"]}`,
        });
      } else if (res.data.status === 3) {
        setIsSuccess((prev) => !prev);
        notification.success({
          message: t("Success"),
          description: `${labels["Requested successfully"]}`,
        });
      } else {
        setIsSuccess((prev) => !prev);
      }
      console.log("reeeeeeesul", res);
    });
  };
  const handleUnfollow = () => {
    Axios.delete(apis.follow, {
      data: { user_id: id },
      headers: { Authorization: `Token ${constants.token_id}` },
    })
      .then((response) => {
        setShow(false);
        setIsSuccess((prev) => !prev);
        console.log("response:", response);
      })
      .catch((error) => {
        console.error("handleUnfollow error:", error);
      });
  };

  const blockUserHandler = () => {
    console.log("resultBlock", id);

    Axios.post(
      apis.blockUser,
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setIsSuccess((prev) => !prev);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Blocked user successfully"]}`,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
      console.log("resultBlock", res);
    });
  };

  const unBlockUserHandler = () => {
    Axios.post(
      apis.unblockUser,
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setIsSuccess((prev) => !prev);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Unblocked user successfully"]}`,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
      console.log("result", res);
    });
  };
  return (
    <Fragment>
      <Modal
        open={show}
        closable
        maskClosable
        centered
        onCancel={() => setShow(false)}
        footer={[
          <Button
            className="dark-theme-color"
            key="back"
            type="secondary"
            onClick={() => setShow(false)}
          >
            {t("Cancel")}
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={handleUnfollow}
          >
            {t("Confirm")}
          </Button>,
        ]}
      >
        <div className="modal-body d-flex align-items-center justify-content-center">
          <div className="w-40 d-flex flex-column align-items-center">
            <div className="mb-2">
              <img
                src={
                  data.user_image
                    ? `${constants.port}/media/${data.user_image}`
                    : "/images/accounts/user_default.png"
                }
                className="rounded-circle shadow-1-strong"
                style={{ width: "100px", height: "100px" }}
                alt="Profile"
              />
            </div>
            <div className="text-center mb-3">
              <p className="mb-0">
                <b>{data.name}</b>
              </p>
            </div>
            <hr className="col-md-12 line"></hr>

            <p>
              <b>{t("Are you sure to unfollow?")}</b>
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        title={t("Rank")}
        open={showRank}
        onCancel={() => setShowRank(false)}
        closable
        maskClosable
        centered
        footer={null}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontWeight: "600",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        >
          <div>{t("Game")}</div>
          <div style={{ textAlign: "right" }}>{t("Rank")}</div>
        </div>
        {data.user_rank &&
          data.user_rank.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                fontWeight: "400",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              <div>{item.game}</div>
              <div style={{ textAlign: "right" }}>#{item.rank}</div>
            </div>
          ))}
      </Modal>
      <Modal
        title={t("Fields")}
        open={showField}
        onCancel={() => setShowField(false)}
        closable
        maskClosable
        centered
        footer={null}
      >
        <List
          dataSource={groundDetail}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={() =>
                router.push({
                  pathname: `/play-ground/${item.slug_field}`,
                  query: {
                    stadium_id: item.id,
                    date: moment().format("YYYY-MM-DD"),
                  },
                })
              }
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <a className="mx-2" href="">
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src={`${constants.port}${item.stadium_image}`}
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "cover",
                    }}
                  ></CardImg>
                </a>
                <div
                  className="flex-grow-1 flex-shrink-1 "
                  style={{ marginBottom: "-24px" }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="mb-0 dark-theme-color"
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {item.stadium_name}
                      </p>
                    </div>

                    <p
                      className="small dark-theme-color"
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        marginTop: "-3px",
                        float: "left",
                      }}
                    >
                      @{item.location}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          style={{ height: "250px", overflowY: "auto" }}
        />
      </Modal>

      <Card className="cord">
        <Card.Body>
          <div className="row">
            <div className={`col-md-6 ${locale === "ar" && "order-2"}`}>
              {/* <button
                onClick={() => setShowRank(true)}
                className="btn profile-edit-btn"
                style={{ float: locale === "ar" && "right" }}
              >
                {t("Rank")}
              </button> */}
              <div className="profile-image">
                {data.user_image ? (
                  <img
                    src={`${constants.port}/media/${data.user_image}`}
                    alt="image"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  ></img>
                ) : (
                  <img
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    src="/images/accounts/user_default.png"
                    alt=""
                  ></img>
                )}
              </div>
            </div>
            <div className={`col-md-6 ${locale === "ar" && "order-1"}`}>
              <div
                className="profile-stats"
                style={{ marginLeft: locale === "en" ? "-130px" : "0px" }}
              >
                <ul>
                  <h1 className="profile-user-name">{data.name}</h1>
                  {data.account_type === "star" ? (
                    <span>
                      <img src="/images/Star.png" className="mx-1 mb-1"></img>
                    </span>
                  ) : (
                    <StarInfo />
                  )}
                  <br></br>
                  <h1 className="profile-user-names">@{data.username}</h1>
                  <br></br>
                  <li>
                    <span className="profile-stat-count">
                      {data.post_count}
                    </span>{" "}
                    <span style={{ color: "#959595" }}>{t("Posts")}</span>
                  </li>
                  <li>
                    <span className="profile-stat-count">
                      {data.followers_count}
                    </span>{" "}
                    <span style={{ color: "#959595" }}>{t("Followers")}</span>
                  </li>
                  <li>
                    <span className="profile-stat-count">
                      {data.following_count}
                    </span>{" "}
                    <span style={{ color: "#959595" }}>{t("Following")}</span>
                  </li>
                  <br></br>
                  <li>
                    <span
                      className="profile-stat-count "
                      style={{ color: "#959595" }}
                    >
                      {t("Age")}:
                    </span>{" "}
                    <span>{data.age}</span>
                  </li>
                  <li>
                    <span
                      className="profile-stat-count"
                      style={{ color: "#959595" }}
                    >
                      {t("Gender")}:
                    </span>{" "}
                    <span> {data.gender}</span>
                  </li>
                  <li>
                    <span
                      className="profile-stat-count"
                      onClick={() => setShowRank(true)}
                      style={{ color: "#959595", cursor: "pointer" }}
                    >
                      {t("Rank")}
                    </span>{" "}
                  </li>
                  <br></br>
                  <li>
                    <span>
                      {" "}
                      <img src="/images/accounts/kuwait.png" alt=""></img>
                    </span>
                    <span className="profile-stat-count mx-1">
                      {data.country}{" "}
                    </span>
                    {/* <span style={{color:'#959595'}} className='mx-3'>+More</span> */}
                  </li>

                  <br></br>
                  {blockedby ? (
                    <button
                      onClick={() => unBlockUserHandler()}
                      className="side-menu__suggestion-buttons "
                      style={{ backgroundColor: "#EFEFEF", color: "#000000" }}
                    >
                      {t("Unblock")}
                    </button>
                  ) : blockedfrom ? (
                    ""
                  ) : data.is_following === 1 ? (
                    <>
                      <button
                        onClick={() => setShow(true)}
                        className="side-menu__suggestion-buttons "
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#EFEFEF" : "#EFEFEF",
                          color: "#000000",
                        }}
                      >
                        {t("Following")} <i className="bi bi-chevron-down "></i>
                      </button>
                      <MessageFromProfile />
                    </>
                  ) : isPrivate ? (
                    <button
                      onClick={followHandler}
                      className="side-menu__suggestion-buttons "
                      style={{
                        backgroundColor:
                          data.is_requested == 0 ? "#17A803" : "grey",
                      }}
                    >
                      {data.is_requested == 0 ? t("Follow") : t("Requested")}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={followHandler}
                        className="side-menu__suggestion-buttons "
                      >
                        {t("Follow")}{" "}
                      </button>
                      <MessageFromProfile />
                    </>
                  )}

                  {(data.usertype === "Pro" || data.usertype === "Store") && (
                    <button
                      className="side-menu__suggestion-buttons "
                      style={{ backgroundColor: "#17A803" }}
                      onClick={() =>
                        router.push(
                          `/store/${storeDetail && storeDetail.slug_store}`
                        )
                      }
                    >
                      {t("Shop Now")}
                    </button>
                  )}
                  {(data.usertype === "Pro" || data.usertype === "Field") && (
                    <button
                      className="side-menu__suggestion-buttons "
                      style={{ backgroundColor: "#17A803" }}
                      onClick={() => setShowField(true)}
                    >
                      {t("Book Now")}
                    </button>
                  )}
                </ul>
              </div>
              <Dropdown
                className="Drop"
                style={{
                  float: locale === "en" ? "right" : "left",
                  top: locale === "en" ? "" : "-88%",
                }}
              >
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-basic"
                  style={{
                    color: "black",
                    borderColor: "transparent",
                    background: "transparent",
                  }}
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu align="center" className="Menu">
                  {blockedby ? (
                    <Dropdown.Item onClick={() => unBlockUserHandler()}>
                      {t("Unblock")}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => blockUserHandler()}>
                      {t("Block")}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className="ceed">
        <Card.Body className="dark-theme-color">
          {/* <button className=" profile-edits-btn">{t("Rank")}</button> */}

          <div className="avatar">
            <img
              className="user-avatar"
              src={
                data.user_image
                  ? `${constants.port}/media/${data.user_image}`
                  : "/images/accounts/user_default.png"
              }
              alt=""
            />
          </div>

          <div className="main-ceed">
            <div className="profile-name">
              {data.name}
              {/* <span>
            <img src='../images/accounts/stars.png' className='mx-1 mb-1'></img>
            <span>
            <img src='../image      s/accounts/iconoir_help-circles.png' className=' mb-1'></img></span>
            </span> */}
            </div>
            <div className="profile-role">@{data.username}</div>
            <div className="profile-followers">
              {data.post_count}{" "}
              <span style={{ color: "#959595" }}>{t("Posts")}</span>
              <span className="mx-1">
                {data.followers_count}{" "}
                <span style={{ color: "#959595" }}>{t("Followers")}</span>
              </span>
              <span>
                {data.following_count}{" "}
                <span style={{ color: "#959595" }}>{t("Following")}</span>
              </span>{" "}
            </div>
            <div className="profile-age">
              {t("Age")}:<span>{data.age}</span>
              <span className="mx-2">
                {t("Gender")}: {data.gender}
              </span>
              <span
                className="mx-2"
                onClick={() => setShowRank(true)}
                style={{ cursor: "pointer" }}
              >
                {t("Rank")}
              </span>
            </div>
            <div className="profile-country">
              {" "}
              <img
                src={`${constants.port}/media/${data.country_image}`}
                width={"30px"}
                alt=""
              ></img>
              <span className=" mx-1">{data.country}</span>
              {/* <span style={{color:'#959595'}} className='mx-1'>+More</span> */}
            </div>
            <div className="following">
              {" "}
              {data.is_following === 1 ? (
                <>
                  <button
                    onClick={() => setShow(true)}
                    className="side-menu__suggestion-buttons "
                    style={{ backgroundColor: "#EFEFEF", color: "#000000" }}
                  >
                    {t("Following")} <i className="bi bi-chevron-down "></i>
                  </button>
                  <MessageFromProfile />
                </>
              ) : isPrivate ? (
                <button
                  onClick={followHandler}
                  className="side-menu__suggestion-buttons "
                  style={{
                    backgroundColor:
                      data.is_requested == 0 ? "#17A803" : "grey",
                  }}
                >
                  {data.is_requested == 0 ? t("Follow") : t("Requested")}
                </button>
              ) : (
                <>
                  <button
                    onClick={followHandler}
                    className="side-menu__suggestion-buttons "
                  >
                    {t("Follow")}{" "}
                  </button>
                  <MessageFromProfile />
                </>
              )}
              {(data.usertype === "Pro" || data.usertype === "Store") && (
                <button
                  className="side-menu__suggestion-buttons "
                  style={{ backgroundColor: "#17A803" }}
                  onClick={() =>
                    router.push(
                      `/store/${storeDetail && storeDetail.slug_store}`
                    )
                  }
                >
                  {t("Shop Now")}
                </button>
              )}
              {(data.usertype === "Pro" || data.usertype === "Field") && (
                <button
                  className="side-menu__suggestion-buttons "
                  style={{ backgroundColor: "#17A803" }}
                  onClick={() => setShowField(true)}
                >
                  {t("Book Now")}
                </button>
              )}
              {/* <button className="side-menu__suggestion-buttons ">Message</button> */}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default OtherProfileHeaderDetails;
