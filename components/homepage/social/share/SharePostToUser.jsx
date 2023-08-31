import { Button, Input, List, Modal, notification } from "antd";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { CardImg } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Login from "@/components/user/Login";

function SharePostToUser({ slug }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [names, setNames] = useState("");
  const labels = Labels();
  const [showLogin, setShowLogin] = useState(false);

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

  const handleClick = (id) => {
    setSelectedItems([...selectedItems, id]);

    // if (selectedItems.includes(id)) {
    //   setSelectedItems(
    //     selectedItems.filter((selectedItem) => selectedItem !== id)
    //   );
    // } else {
    //   setSelectedItems([...selectedItems, id]);
    // }
    Axios.post(
      apis.createChat,
      {
        type: "single",
        user: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res787", res);
      if (res.data.status === 1) {
        Axios.post(
          apis.sendMessage,
          {
            chat_id: res.data.data.id,
            body: `${constants.domain}/page/post/${slug}`,
          },
          {
            headers: {
              Authorization: `Token ${constants.token_id}`,
            },
          }
        ).then((res) => {
          if (res.data.status === 1) {
            notification.success({
              message: constants.Success,
              description: `${labels["Share post user"]}`,
            });
          } else {
            notification.error({
              message: constants.Error,
              description:
                locale === "en" ? res.data.message_en : res.data.message_ar,
            });
          }
        });
      } else {
        notification.error({
          message: constants.Error,
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };
  const doneHandler = () => {
    setVisible(false);
    setSelectedItems([]);
    setNames("");
    setSearchResult([]);
  };
  const postShareChatHandler = () => {
    if (constants.token_id) {
      setVisible(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <Fragment>
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <Modal
        open={visible}
        onCancel={() => {
          setVisible(false);
          setSearchResult([]);
          setSelectedItems([]);
          setNames("");
        }}
        footer={
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={doneHandler}
          >
            {t("Done")}
          </Button>
        }
        centered
        title={t("Share to")}
      >
        <Input
          placeholder={t("Search")}
          value={names}
          onChange={(e) => handleChange(e)}
        />
        <List
          dataSource={searchResult}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ padding: "0px", cursor: "pointer" }}
              onClick={() => handleClick(item.id)}
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <a className="me-2" href="">
                  {item.image ? (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={`${constants.port}/media/${item.image}`}
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
              <div className="mx-2">
                {selectedItems.includes(item.id) ? (
                  <div>{t("Send")}</div>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 30 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8848 15.9742L18.9425 10.3203"
                      stroke="black"
                      stroke-width="1.50701"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z"
                      stroke="black"
                      stroke-width="1.50701"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </div>
            </List.Item>
          )}
          style={{ height: "250px", overflowY: "auto" }}
        />
      </Modal>
      <button
        onClick={() => postShareChatHandler()}
        className="post__button"
        style={{ marginLeft: "-11px" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8848 15.9742L18.9425 10.3203"
            stroke="black"
            stroke-width="1.50701"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z"
            stroke="black"
            stroke-width="1.50701"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </Fragment>
  );
}

export default SharePostToUser;
