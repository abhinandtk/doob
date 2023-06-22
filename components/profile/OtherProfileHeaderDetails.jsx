import React, { Fragment, useState } from "react";
import { Tab, Tabs, Card, CardImg } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Button, Modal, notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
function OtherProfileHeaderDetails({ data, id, isPrivate, setIsSuccess }) {
  const [show, setShow] = useState(false);
  const [showRank, setShowRank] = useState(false);
  console.log("daaata", data, isPrivate);
  const labels = Labels();

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
          message: constants.Success,
          description: `${labels["Followed successfully"]}`,
        });
      } else if (res.data.status === 3) {
        setIsSuccess((prev) => !prev);
        notification.success({
          message: constants.Success,
          description: `${labels["Requested successfully"]}`,
        });
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
  return (
    <Fragment>
      <Modal
        open={show}
        closable
        maskClosable
        centered
        onCancel={() => setShow(false)}
        footer={[
          <Button key="back" type="secondary" onClick={() => setShow(false)}>
            cancel
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={handleUnfollow}
          >
            Confirm
          </Button>,
        ]}
      >
        <div className="modal-body d-flex align-items-center justify-content-center">
          <div className="w-40 d-flex flex-column align-items-center">
            <div className="mb-2">
              <img
                src={`${constants.port}/media/${data.user_image}`}
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
              <b>Are you sure to unfollow?</b>
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        title=" "
        open={showRank}
        onCancel={() => setShowRank(false)}
        closable
        maskClosable
        centered
        footer={null}
      >
        <div style={{ fontWeight: "600", fontSize: "16px" }}>
          Game
          <span
            style={{ fontWeight: "600", fontSize: "16px", marginLeft: "310px" }}
          >
            Rank
          </span>
        </div>
        <div style={{ fontWeight: "400", fontSize: "16px" }}>
          Football
          <span
            style={{ fontWeight: "600", fontSize: "16px", marginLeft: "300px" }}
          >
            #200
          </span>
        </div>
        <div style={{ fontWeight: "400", fontSize: "16px" }}>
          Basketball
          <span
            style={{ fontWeight: "600", fontSize: "16px", marginLeft: "285px" }}
          >
            #1200
          </span>
        </div>
      </Modal>

      <Card className="cord">
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              {/* <button onClick={()=>setShowRank(true)} className="btn profile-edit-btn">Rank</button> */}
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
            <div className="col-md-6">
              <div className="profile-stats">
                <ul>
                  <h1 className="profile-user-name">{data.name}</h1>
                  {data.account_type === "star" ? (
                    <span>
                      <img src="/images/Star.png" className="mx-1 mb-1"></img>
                    </span>
                  ) : (
                    ""
                  )}
                  <br></br>
                  <h1 className="profile-user-names">@{data.username}</h1>
                  <br></br>
                  <li>
                    <span className="profile-stat-count">
                      {data.post_count}
                    </span>{" "}
                    <span style={{ color: "#959595" }}>posts</span>
                  </li>
                  <li>
                    <span className="profile-stat-count">
                      {data.followers_count}
                    </span>{" "}
                    <span style={{ color: "#959595" }}>followers</span>
                  </li>
                  <li>
                    <span className="profile-stat-count">
                      {data.following_count}
                    </span>{" "}
                    <span style={{ color: "#959595" }}>following</span>
                  </li>
                  <br></br>
                  <li>
                    <span
                      className="profile-stat-count "
                      style={{ color: "#959595" }}
                    >
                      Age:
                    </span>{" "}
                    <span>{data.age}</span>
                  </li>
                  <li>
                    <span
                      className="profile-stat-count"
                      style={{ color: "#959595" }}
                    >
                      Gender:
                    </span>{" "}
                    <span> {data.gender}</span>
                  </li>
                  <br></br>
                  <li>
                    <span>
                      {" "}
                      <img src="../images/accounts/kuwait.png" alt=""></img>
                    </span>
                    <span className="profile-stat-count mx-1">
                      {data.country}{" "}
                    </span>
                    {/* <span style={{color:'#959595'}} className='mx-3'>+More</span> */}
                  </li>

                  <br></br>
                  {data.is_following === 1 ? (
                    <button
                      onClick={() => setShow(true)}
                      className="side-menu__suggestion-buttons "
                      style={{ backgroundColor: "#EFEFEF", color: "#000000" }}
                    >
                      Following <i className="bi bi-chevron-down "></i>
                    </button>
                  ) : isPrivate ? (
                    <button
                      onClick={followHandler}
                      className="side-menu__suggestion-buttons "
                      style={{ backgroundColor: "grey" }}
                    >
                      {data.is_requested == 0 ? "Request" : "Requested"}
                    </button>
                  ) : (
                    <button
                      onClick={followHandler}
                      className="side-menu__suggestion-buttons "
                    >
                      Follow{" "}
                    </button>
                  )}
                  {/* <button className="side-menu__suggestion-button3 ">Message</button> */}
                </ul>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className="ceed">
        <Card.Body>
          {/* <button className=" profile-edits-btn">Rank</button> */}

          <div className="avatar">
            <img
              className="user-avatar"
              src={`${constants.port}/media/${data.user_image}`}
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
              {data.post_count} <span style={{ color: "#959595" }}>posts</span>
              <span className="mx-1">
                {data.followers_count}{" "}
                <span style={{ color: "#959595" }}>followers</span>
              </span>
              <span>
                {data.following_count}{" "}
                <span style={{ color: "#959595" }}>following</span>
              </span>{" "}
            </div>
            <div className="profile-age">
              Age:<span>{data.age}</span>
              <span className="mx-2">Gender: {data.gender}</span>
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
                <button
                  onClick={() => setShow(true)}
                  className="side-menu__suggestion-buttons "
                  style={{ backgroundColor: "#EFEFEF", color: "#000000" }}
                >
                  Following <i className="bi bi-chevron-down "></i>
                </button>
              ) : isPrivate ? (
                <button
                  onClick={followHandler}
                  className="side-menu__suggestion-buttons "
                  style={{ backgroundColor: "grey" }}
                >
                  {data.is_requested == 0 ? "Request" : "Requested"}
                </button>
              ) : (
                <button
                  onClick={followHandler}
                  className="side-menu__suggestion-buttons "
                >
                  Follow{" "}
                </button>
              )}
              {/* <button className="side-menu__suggestion-button3 ">Message</button> */}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default OtherProfileHeaderDetails;
