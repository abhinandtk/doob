import React, { Fragment, useState } from "react";
import { Modal, Button, Upload, message, Icon, Spin, Tooltip } from "antd";
import { Card, Tab, Tabs, CardImg } from "react-bootstrap";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";
import StarInfo from "./StarInfo";
import { useTheme } from "next-themes";
import ProfileEdit from "./ProfileEdit";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function ProfileHeaderDetails({ data, setSuccess }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [visible, setVisible] = useState(false);
  const [uploadImageUrl, setUploadImageUrl] = useState(null);
  console.log("4444", data);

  const [followersListShow, setFollowersListShow] = useState(false);
  const [followingListShow, setFollowingListShow] = useState(false);

  const [showRank, setShowRank] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadShowHandler = () => {
    setVisible(true);
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    Axios.post(apis.profilepage, formData, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("iiooooooooooooooooooooooooooo", res);
      setSuccess((prev) => !prev);
      setUploadImageUrl(URL.createObjectURL(file));
      message.success(t("Profile image updated successfully"));
      setVisible(false);
    });
  };

  const deleteProfileImg = () => {
    setVisible(false);
    setLoading(true);
    Axios.delete(apis.profilepage, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setVisible(false);
      if (res.data.status === 1) {
        setSuccess((prev) => !prev);
        setLoading(false);
      }
      message.success(t("Profile image deleted successfully"));
    });
  };

  return (
    <Fragment>
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
          className="profile-rank-modal"
          style={{
            fontWeight: "600",
          }}
        >
          <div>{t("Game")}</div>
          <div style={{ textAlign: locale === "en" ? "right" : "left" }}>
            {t("Rank")}
          </div>
        </div>
        {data.user_rank &&
          data.user_rank.map((item, index) => (
            <div
              key={index}
              className="profile-rank-modal"
              style={{
                fontWeight: "400",
              }}
            >
              <div>{item.game}</div>
              <div style={{ textAlign: locale === "en" ? "right" : "left" }}>
                #{item.rank}
              </div>
            </div>
          ))}
      </Modal>

      <Modal
        open={visible}
        style={{ padding: "0" }}
        onCancel={() => setVisible(false)}
        footer={[]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme === "dark" ? "#FFFF" : "",
          }}
        >
          <div
            style={{
              margin: "8px",
              fontSize: "18px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {t("Change profile photo")}
            <hr></hr>
          </div>
          <div
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Upload
              name="profilePicture"
              showUploadList={false}
              beforeUpload={(file) => {
                const maxSize = 1024 * 1024;
                if (file.size > maxSize) {
                  message.error("Image size should be less than 1 MB");
                  return false;
                }
                return true;
              }}
              customRequest={({ file }) => {
                handleUpload(file);
              }}
              style={{ color: "#FFFF" }}
            >
              <span style={{ color: theme === "dark" ? "#FFFF" : "" }}>
                {t("Add photo")}
              </span>
            </Upload>
          </div>
          {data.user_image && (
            <div
              onClick={deleteProfileImg}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {t("Remove Photo")}
            </div>
          )}
          <div style={{ cursor: "pointer" }} onClick={() => setVisible(false)}>
            {t("Cancel")}
          </div>
        </div>
      </Modal>

      <div className="container2">
        <Card className="cord">
          <Card.Body>
            <div className="row">
              <div className={`col-md-6 ${locale === "ar" && "order-2"}`}>
                <button
                  onClick={() => setShowRank(true)}
                  className="btn profile-edit-btn"
                  style={{ float: locale === "ar" && "right" }}
                >
                  {t("Rank")}
                </button>
                <div className="profile-image">
                  {loading ? (
                    <Spin
                      style={{ position: "absolute", top: "50%", left: "50%" }}
                      spinning={loading}
                      indicator={<LoadingOutlined />}
                    />
                  ) : data.user_image ? (
                    <img
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      src={`${constants.port}/media/${data.user_image}`}
                      alt=""
                    ></img>
                  ) : (
                    <img
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      src="/images/accounts/user_default.png"
                      alt=""
                    ></img>
                  )}
                </div>
                <div className="profile-cam1" onClick={uploadShowHandler}>
                  <img src="/images/accounts/camera.png" alt=""></img>
                </div>
              </div>
              <div className={`col-md-6 ${locale === "ar" && "order-1"}`}>
                <div
                  className="profile-stats"
                  style={{ marginLeft: locale === "en" ? "-130px" : "0px" }}
                >
                  <ul>
                    <h1 className="profile-user-name">
                      {data.name}
                      <span>
                        {data.account_type === "star" ? (
                          <span>
                            <img
                              src="/images/Star.png"
                              className="mx-1 mb-1"
                            ></img>
                          </span>
                        ) : (
                          <StarInfo />
                        )}
                      </span>
                    </h1>
                    <br></br>
                    <h1 className="profile-user-names">@{data.username}</h1>
                    <br></br>
                    <li>
                      <span className="profile-stat-count">
                        {data.post_count}
                      </span>{" "}
                      <span style={{ color: "#959595" }}>{t("Posts")}</span>
                    </li>
                    <li onClick={() => setFollowersListShow(true)}>
                      <span className="profile-stat-count">
                        {data.followers_count}
                      </span>{" "}
                      <span style={{ color: "#959595" }}>{t("Followers")}</span>
                    </li>
                    <li onClick={() => setFollowingListShow(true)}>
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
                    <br></br>
                    <li>
                      <span>
                        {" "}
                        <img
                          src={`${constants.port}/media/${data.country_image}`}
                          width={"30px"}
                          alt=""
                        ></img>
                      </span>
                      <span className="profile-stat-count mx-1">
                        {data.country}{" "}
                      </span>
                      {/* <span style={{color:'#959595'}} className='mx-3'>+More</span> */}
                    </li>
                  </ul>
                </div>
                <ProfileEdit data={data} setSuccess={setSuccess} />
              </div>
            </div>

            {followersListShow && (
              <FollowersList
                setFollowersListShow={setFollowersListShow}
                setSuccess={setSuccess}
              />
            )}
            {followingListShow && (
              <FollowingList
                setFollowingListShow={setFollowingListShow}
                setSuccess={setSuccess}
              />
            )}
          </Card.Body>
        </Card>

        <Card className="ceed">
          <Card.Body>
            <button
              onClick={() => setShowRank(true)}
              className="btn profile-edit-btn"
            >
              {t("Rank")}
            </button>

            {/* <button className=" profile-edits-btn">Rank</button>
                <button className="profile-edit-btn2">Edit</button>  */}
            <div className="avatar">
              <div
                className="user-online-indicator"
                onClick={uploadShowHandler}
              >
                <img src="../images/accounts/camera.png" alt="" />
              </div>
              {loading ? (
                <Spin
                  style={{ position: "absolute", top: "50%", left: "50%" }}
                  spinning={loading}
                  indicator={<LoadingOutlined />}
                />
              ) : data.user_image ? (
                <img
                  className="user-avatar"
                  src={`${constants.port}${data.user_image}`}
                  alt=""
                />
              ) : (
                <img
                  className="user-avatar"
                  src="../images/accounts/user_default.png"
                  alt=""
                />
              )}
            </div>

            <div className="main-ceed">
              <div className="profile-name">
                {data.name}
                {/* <span>
            <img src='../images/accounts/stars.png' className='mx-1 mb-1'></img>
            <span><img src='../images/accounts/iconoir_help-circles.png' className=' mb-1'></img></span>
          </span> */}
              </div>
              <div className="profile-role">@{data.username}</div>
              <div className="profile-followers">
                {data.post_count}
                <span style={{ color: "#959595" }}>posts</span>
                <span
                  onClick={() => setFollowersListShow(true)}
                  className="mx-1"
                >
                  {data.followers_count}{" "}
                  <span style={{ color: "#959595" }}>followers</span>
                </span>
                <span onClick={() => setFollowingListShow(true)}>
                  {data.following_count}{" "}
                  <span style={{ color: "#959595" }}>following</span>
                </span>{" "}
              </div>
              <div className="profile-age">
                {t("Age")}:<span>{data.age}</span>
                <span className="mx-2">
                  {t("Gender")}: {data.gender}
                </span>
              </div>
              <div className="profile-country">
                {" "}
                <img
                  src={`${constants.port}/media/${data.country_image}`}
                  width={"30px"}
                  alt=""
                ></img>
                <span className=" mx-1">{data.country} </span>
                {/* <span style={{color:'#959595'}} className='mx-1'>+More</span> */}
              </div>
            </div>

            {/* {followersListShow && (
              <FollowersList setFollowersListShow={setFollowersListShow} />
            )}
            {followingListShow && (
              <FollowingList setFollowingListShow={setFollowingListShow} />
            )} */}
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
}

export default ProfileHeaderDetails;
