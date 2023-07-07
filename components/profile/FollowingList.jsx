import { Modal, notification } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { CardImg } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";

function FollowingList({ setFollowingListShow, setSuccess }) {
  const [visible, setVisible] = useState(true);
  const [following, setFollowing] = useState([]);
  const labels=Labels()

  // const [showFollow, setShowFollow] = useState(true);
  const [apiSuccess, setApiSuccess] = useState(false);

  useEffect(() => {
    Axios.get(apis.followinglist, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setFollowing(res.data.data);
      console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", res);
    });
  }, [apiSuccess]);

  const handleUnFollow = (id, index) => {
    Axios.delete(apis.follow, {
      data: { user_id: id },
      headers: { Authorization: `Token ${constants.token_id}` },
    })
      .then((response) => {
        setApiSuccess((prev) => !prev);
        setSuccess((prev) => !prev);
        setFollowing((prevFollowing) => {
          const updatedFollowing = [...prevFollowing];
          updatedFollowing[index].showFollow = false;
          return updatedFollowing;
        });
        if(response.data.status===1){
          notification.success({
            message:constants.Success,
            description:`${labels['Unfollowed successfully']}`
          })
        }
        console.log("response:", response);
      })
      .catch((error) => {
        console.error("handleUnfollow error:", error);
      });
  };

  return (
    <Fragment>
      <Modal
        open={visible}
        onCancel={() => {
          setVisible(false);
          setFollowingListShow(false);
        }}
        footer={null}
        width={500}
        closable
        maskClosable
        centered
        bodyStyle={{ maxHeight: "50vh", overflowY: "scroll" }}
        title="Followings"
      >
        <div style={{ padding: "16px" }}>
          {following.map((item, index) => (
            <div key={index} className="side-menu__suggestion">
              <div className="side-menu__suggestion-avatar">
                {item.image ? (
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src={`${constants.port}${item.image}`}
                    style={{
                      width: "46px",
                      height: "46px",
                      objectFit: "cover",
                    }}
                  ></CardImg>
                ) : (
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src="/images/accounts/user_default.png"
                    style={{
                      width: "46px",
                      height: "46px",
                      objectFit: "cover",
                    }}
                  ></CardImg>
                )}
              </div>
              <div className="side-menu__suggestion-info">
                <p>
                  <b>{item.name}</b>
                  <br></br>
                  {item.username}
                </p>
              </div>
              {item.showFollow ? (
                <button className="side-menu__suggestion-buttons ">
                  Follow <i className="bi bi-chevron-down "></i>
                </button>
              ) : (
                <button
                  onClick={() => handleUnFollow(item.user_id, index)}
                  className="side-menu__suggestion-buttons"
                  style={{ marginTop: "-2px" }}
                >
                  {" "}
                  Following
                </button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </Fragment>
  );
}

export default FollowingList;
