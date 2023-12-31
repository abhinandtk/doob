import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Modal, notification } from "antd";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { CardImg } from "react-bootstrap";
import Axios from "axios";
import { Labels } from "@/public/data/my-constants/Labels";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
function FollowersList({ setFollowersListShow, setSuccess }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  const labels = Labels();

  // const followListApi = () => {
  useEffect(() => {
    Axios.get(apis.followerslist, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setFollowers(res.data.data);
    });
  }, [apiSuccess]);
  // };
  // useEffect(() => {}, []);

  const removeAccount = (id) => {
    Axios.delete(apis.removefollower, {
      data: { user_id: id },
      headers: { Authorization: `Token ${constants.token_id}` },
    })
      .then((res) => {
        console.log("rest", res);
        setApiSuccess((prev) => !prev);
        setSuccess((prev) => !prev);
        if (res.data.status === 1) {
          notification.success({
            message: t("Success"),
            description: `${labels["Remove user"]}`,
          });
        }
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
          setFollowersListShow(false);
        }}
        footer={null}
        width={500}
        closable
        maskClosable
        centered
        bodyStyle={{ maxHeight: "50vh", overflowY: "scroll" }}
        title={t("Followers")}
      >
        <div style={{ padding: "16px" }}>
          {followers &&
            followers.map((item, index) => (
              <div key={index} className="side-menu__suggestion">
                <div className="mx-2 side-menu__suggestion-avatar">
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
                <button
                  onClick={() => removeAccount(item.user_id)}
                  className="side-menu__suggestion-buttons"
                  style={{ backgroundColor: "#EFEFEF", color: "#000000" }}
                >
                  {" "}
                  {t("Remove")}
                </button>
              </div>
            ))}
        </div>
      </Modal>
    </Fragment>
  );
}

export default FollowersList;
