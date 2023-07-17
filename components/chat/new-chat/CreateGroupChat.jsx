import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Upload, Avatar, Button, Input, Modal, List, notification } from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { CardImg } from "react-bootstrap";
import { Labels } from "@/public/data/my-constants/Labels";

function CreateGroupChat({ onChatSelect, onNewMsg, onGrpShow }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [groupProfilePic, setGroupProfilePic] = useState(null);
  const [visible, setVisible] = useState(false);
  const labels = Labels();

  const [selectedUser, setSelectedUser] = useState([]);
  const [names, setNames] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setNames(e.target.value);
    Axios.post(apis.usersearch, {
      user_input: names,
    }).then((res) => {
      if (res.data.status === 1) {
        setSearchResult(res.data.data.results);
      }
    });
  };

  const handleSelect = (id) => {
    const selected = searchResult.find((item) => item.id === id);
    if (selectedUser.includes(selected)) {
      notification.info({
        message: constants.Info,
        description: `${labels["User already selected"]}`,
      });
    } else {
      setSelectedUser((prev) => [...prev, selected]);
    }
    setVisible(false);
  };
  const removeUserHandler = (id) => {
    setSelectedUser(selectedUser.filter((item) => item.id != id));
  };
  console.log("selectedUser", selectedUser);
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
                <a className="me-2" href="">
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
                </a>
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
                onClick={() => onGrpShow(false)}
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
              Create Group
            </h6>
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
            {/* <div
              style={{
                margin: "8px",
                fontSize: "18px",
                width: "100%",
                textAlign: "center",
              }}
            >
             
            </div> */}
            <Upload
              beforeUpload={(file) => {
                // Perform validation, e.g., file type and size
                // Set the group profile picture
                setGroupProfilePic(file);
                return false; // Prevent file upload
              }}
              showUploadList={false}
            >
              {groupProfilePic ? (
                <div>
                  <Avatar
                    size={128}
                    src={URL.createObjectURL(groupProfilePic)}
                  />
                  <Button
                    type="text"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => setGroupProfilePic(null)}
                  />
                </div>
              ) : (
                <Avatar size={128} icon={<UserOutlined />} />
              )}
            </Upload>
            <Input
              className="my-2"
              placeholder="Group Name"
              style={{
                border: "none",
                borderBottom: "1px solid #17A803",
                borderRadius: "0",
                backgroundColor: "transparent",
              }}
            />
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "17px",
              display: "flex",
            }}
          >
            <p style={{ width: "50%" }}>Group members</p>
            <div className="mx-2" style={{ width: "50%", textAlign: "right" }}>
              <Button
                type="primary"
                key="add"
                style={{ backgroundColor: "#17A803" }}
                onClick={() => setVisible(true)}
              >
                Add members
              </Button>
            </div>
          </div>
          <div style={{ height: "50%", overflow: "auto" }}>
            {selectedUser &&
              selectedUser.map((item, index) => (
                <div key={index} className="block active">
                  <div className="imgBox">
                    <img
                      src={
                        item.image
                          ? `${constants.port}/media/${item.image}`
                          : "/images/accounts/user_default.png"
                      }
                      className="cover"
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <div className="listHead">
                      <p>{item.name}</p>
                    </div>
                    <div className="message_p">
                      <p className="note">@{item.username}</p>
                    </div>
                  </div>
                  <p onClick={() => removeUserHandler(item.id)}>
                    <i className="bi bi-x" style={{ fontSize: "20px" }} />
                  </p>
                </div>
              ))}
          </div>
          <center>
            <div className="right-arrow">
              <ArrowRightOutlined />
            </div>
          </center>
        </div>
      </div>
    </Fragment>
  );
}

export default CreateGroupChat;
