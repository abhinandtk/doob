import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Upload, Avatar, Button, Input, Modal, List, notification } from "antd";
import { UserOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { CardImg } from "react-bootstrap";
import { Labels } from "@/public/data/my-constants/Labels";
import { useEffect } from "react";

function GroupInfo({ onChatSelect, onNewMsg, onGrpShow, selectedId }) {
  const [apiSuccess, setApiSuccess] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [groupProfilePic, setGroupProfilePic] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const labels = Labels();

  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [names, setNames] = useState("");
  const [grpName, setGrpName] = useState("");

  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    Axios.post(
      apis.groupInfo,
      {
        chat_id: selectedId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setProfileDetails(res.data.data);
      setGrpName(res.data.data.group.name);
      setGroupProfilePic(res.data.data.group.user_image);
      setSelectedUser(res.data.data.members);
      setIsAdmin(res.data.data.group.is_admin);

      console.log("rest", res);
    });
  }, [selectedId, apiSuccess]);

  const currentUser = constants.user_id;

  const handleChange = (e) => {
    e.preventDefault();
    setNames(e.target.value);
    Axios.post(
      apis.usersearch,
      {
        user_input: names,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setSearchResult(res.data.data.results);
      }
    });
  };

  const handleSelect = (id) => {
    Axios.post(
      apis.addMemberGroup,
      {
        chat_id: selectedId,
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("rescon", res);
      if (res.data.status === 1) {
        setApiSuccess((prev) => !prev);
        notification.success({
          message: constants.Success,
          description: `${labels["Add members"]}`,
        });
      } else {
        notification.error({
          message: constants.Error,
          description: res.data.message_en,
        });
      }
    });

    setVisible(false);
  };
  const removeUserHandler = (id) => {
    Axios.post(
      apis.removeMemberGroup,
      {
        chat_id: selectedId,
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("rescon", res);
      if (res.data.status === 1) {
        setApiSuccess((prev) => !prev);
        notification.success({
          message: constants.Success,
          description: `${labels["Remove members"]}`,
        });
      } else {
        notification.error({
          message: constants.Error,
          description: res.data.message_en,
        });
      }
    });
  };
  console.log("selectedUser", selectedUser, selectedUserId);

  const handleUpload = (file) => {
    console.log("imagetyu");
    const formData = new FormData();
    formData.append("file_field_name", file);

    Axios.post(apis.allImagesUpload, formData, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("imagetyu", res);
      setGroupProfilePic(res.data.image_url);
    });
  };

  const editGroupHandler = () => {
    Axios.post(
      apis.editGroup,
      {
        chat_id: selectedId,
        group_image: groupProfilePic,
        group_name: grpName,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res", res);
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
          description: res.data.message_en,
        });
        // onChatSelect(res.data.data.chat_id);
        onNewMsg(null);
      } else {
        notification.error({
          message: constants.Error,
          description: res.data.message_en,
        });
      }
    });
  };
  const beforeUpload = (file) => {
    if (!isAdmin) {
      notification.error({
        message: constants.Error,
        description: "only admin can change profile",
      });
      return false; // Prevent file upload
    }
    // return true; // Allow file upload
  };
  return (
    <Fragment>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        title="Add Members"
      >
        <Input
          placeholder="Enter names"
          // value={names}
          onChange={(e) => handleChange(e)}
        />
        <List
          dataSource={searchResult}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ padding: "0px" }}
              onClick={() => handleSelect(item.id)}
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <span className="me-2">
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src={
                      item.image
                        ? `${constants.port}/media/${item.image}`
                        : "/images/accounts/user_default.png"
                    }
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "cover",
                    }}
                  ></CardImg>
                </span>
                <div
                  className="flex-grow-1 flex-shrink-1 "
                  style={{ marginBottom: "-24px" }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="mb-0"
                        style={{
                          fontWeight: "600",
                          color: "#000",
                          fontSize: "15px",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>

                    <p
                      className="small "
                      style={{
                        color: "#000",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginTop: "-3px",
                        float: "left",
                      }}
                    >
                      @{item.username}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          style={{ height: "250px", overflowY: "auto" }}
        />
      </Modal>
      <div className="leftSide">
        <div className="header">
          <div className="text">
            <h6
              style={{
                fontWeight: "600",
                fontSize: "17px",
                marginLeft: "11px",
              }}
            >
              {" "}
              <span
                onClick={() => onNewMsg(null)}
                style={{ cursor: "pointer" }}
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
              Group Info
            </h6>
          </div>
          <div className="mx-2">
            {isAdmin && (
              <Button
                key="save"
                type="primary"
                style={{ backgroundColor: "#17A803" }}
                onClick={() => editGroupHandler()}
              >
                Save
              </Button>
            )}
          </div>
        </div>

        <div className="chatlist">
          <div
            className="my-2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="flex">
              <Upload
                beforeUpload={beforeUpload}
                showUploadList={false}
                showUploadButton={false}
                customRequest={({ file }) => {
                  handleUpload(file);
                }}
              >
                {groupProfilePic ? (
                  <div>
                    <Avatar
                      size={128}
                      src={`${constants.port}${groupProfilePic}`}
                    />
                  </div>
                ) : (
                  <Avatar size={128} src="/images/accounts/group_default.png" />
                )}
              </Upload>
              {isAdmin && groupProfilePic && (
                <Button
                  type="text"
                  key="submit"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setGroupProfilePic(null);
                  }}
                />
              )}
            </div>
            <div>
              {grpName}
              {isAdmin && (
                <span onClick={() => setShowEditName(true)}>
                  <i
                    className="bi bi-pencil-fill mx-2"
                    style={{ color: "grey" }}
                  />
                </span>
              )}
            </div>
            <p>{selectedUser.length}&nbsp; Participants</p>
            {showEditName && (
              <Input
                className="my-2"
                placeholder="Group Name"
                onChange={(e) => setGrpName(e.target.value)}
                value={grpName}
                style={{
                  border: "none",
                  borderBottom: "1px solid #17A803",
                  borderRadius: "0",
                  backgroundColor: "transparent",
                }}
              />
            )}
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "17px",
              display: "flex",
            }}
          >
            <p style={{ width: "50%" }}>Group members</p>
            {isAdmin && (
              <div
                className="mx-2"
                style={{ width: "50%", textAlign: "right" }}
              >
                <Button
                  type="primary"
                  key="add"
                  style={{ backgroundColor: "#17A803" }}
                  onClick={() => setVisible(true)}
                >
                  Add members
                </Button>
              </div>
            )}
          </div>
          <div style={{ height: "50%", overflow: "auto" }}>
            {selectedUser &&
              selectedUser.map((item, index) => (
                <div key={index} className="block active">
                  <div className="imgBox">
                    <img
                      src={
                        item.user.image
                          ? `${constants.port}/media/${item.user.image}`
                          : "/images/accounts/user_default.png"
                      }
                      className="cover"
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <div className="listHead">
                      <p>{item.user.name}</p>
                    </div>
                    <div className="message_p">
                      <p className="note">@{item.user.username}</p>
                    </div>
                  </div>
                  {item.user.is_admin && (
                    <p className="grp-admin-label mx-2">Group Admin</p>
                  )}
                  {isAdmin && currentUser != item.user.id && (
                    <p onClick={() => removeUserHandler(item.user.id)}>
                      <i className="bi bi-x" style={{ fontSize: "20px" }} />
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GroupInfo;
