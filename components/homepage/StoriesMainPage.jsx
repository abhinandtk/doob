import React, { useEffect, useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import UploadStory from "../shared/headers/modules/UploadStory";
function StoriesMainPage() {
  const router = useRouter();
  const [storyList, setStoryList] = useState([]);
  const [loginedStoryList, setLoginedStoryList] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [addStoryShow, setAddStoryShow] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    Axios.get(apis.userStoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setStoryList(res.data.data.user_story);
      setLoginedStoryList(res.data.data.requested_user_story);
      setUserImage(res.data.data.user_image);
      console.log("response67", res);
    });
  }, []);
  const addStoryHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddStoryShow(true);
  };

  return (
    <div
      className="stories"
      // style={{ height: `${storyList || loginedStoryList ? "" : "0px"}` }}
    >
      {/* {(storyList || loginedStoryList) && ( */}
      <div className="ms-1 dark-theme-color" style={{ fontWeight: 500 }}>
        {t("My Followers")}
      </div>
      {/* )} */}
      <button className="stories__left-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#fff"
            d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"
          ></path>
        </svg>
      </button>

      <div className="stories__content">
        {loginedStoryList ? (
          loginedStoryList.map((item, index) => (
            <button
              onClick={() =>
                router.push({
                  pathname: `/story-view/${index}`,
                  query: {
                    logined_user: true,
                  },
                })
              }
              key={index}
              className="story story--has-story"
            >
              <div className="story__avatar">
                <div className="story__border">
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="31" cy="32" cx="32" />
                  </svg>
                </div>
                <div className="story__picture">
                  {/* <img
                    src={
                      item.user.image
                        ? `${constants.port}/media/${item.user.image}`
                        : "/images/accounts/user_default.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  /> */}
                  <div className="story__picture">
                    <img
                      src={
                        userImage
                          ? `${constants.port}${userImage}`
                          : "/images/accounts/user_default.png"
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      className="story__image"
                    />
                  </div>
                </div>
                <div className="add-icon" onClick={addStoryHandler}>
                  +
                </div>
              </div>
            </button>
          ))
        ) : (
          <button className="story story--has-story">
            <div className="story__avatar">
              <div className="story__border">
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <circle r="31" cy="32" cx="32" />
                </svg>
              </div>
              <div className="story__picture">
                <div className="story__picture">
                  <img
                    src={
                      userImage
                        ? `${constants.port}${userImage}`
                        : "/images/accounts/user_default.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    className="story__image"
                  />
                </div>
              </div>
              <div className="add-icon" onClick={addStoryHandler}>
                +
              </div>
            </div>
          </button>
        )}
        {storyList &&
          storyList.map((item, index) => (
            <button
              onClick={() =>
                router.push({
                  pathname: `/story-view/${index}`,
                })
              }
              key={index}
              className="story story--has-story"
            >
              <div className="story__avatar">
                <div className="story__border">
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="31" cy="32" cx="32" />
                  </svg>
                </div>
                <div className="story__picture">
                  <img
                    src={
                      item.user.image
                        ? `${constants.port}/media/${item.user.image}`
                        : "/images/accounts/user_default.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
      </div>
      {addStoryShow && <UploadStory setAddStoryShow={setAddStoryShow} />}
      <button className="stories__right-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#fff"
            d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default StoriesMainPage;
