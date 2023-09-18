import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Stories, { WithSeeMore } from "react-insta-stories";
import Axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { notification } from "antd";
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoriesView() {
  const [countryData, setCountryData] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [loginedStoryList, setLoginedStoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const { storyId } = router.query;
  const { logined_user } = router.query;

  const [currentStoryIndex, setCurrentStoryIndex] = useState(parseInt(storyId));
  console.log("storyId", storyId, currentStoryIndex);

  useEffect(() => {
    axios.post(apis.country).then((res) => {
      setCountryData(res.data.country);
    });
  }, []);

  useEffect(() => {
    Axios.get(apis.userStoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setStoryList(res.data.data.user_story);
      setLoginedStoryList(res.data.data.requested_user_story);
      setIsLoading(false);
      console.log("response67", res);
    });
  }, [storyId]);

  function timeSincePost(posted) {
    const timeDiff = moment.duration(moment().diff(moment(posted)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  }

  const deleteStoryHandler = (slug) => {
    Axios.post(
      apis.deleteStory,
      { story_slug: slug },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
        router.push("/");
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };

  function handleStoryEnd() {
    if (currentStoryIndex < storyList.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      router.push("/");
    }
  }
  let formattedStoryList;
  let loginedUserStory;
  if (loginedStoryList) {
    loginedUserStory = loginedStoryList.map((userItem) => {
      const userStories = userItem.story.map((storyData) => ({
        content: (props) => (
          <div className="story-view-user" style={{ width: "100%" }}>
            <div className="story-header-user">
              <div style={{ display: "flex" }}>
                <img
                  src={
                    userItem.user.image
                      ? `${constants.port}/media/${userItem.user.image}`
                      : "/images/accounts/user_default.png"
                  }
                />
                <span className="story-head-text">
                  <p className="heading">{userItem.user.name}</p>
                  <p className="subheading">{`Posted ${timeSincePost(
                    storyData.posted
                  )}`}</p>
                </span>
              </div>
              <div>
                <span
                  onClick={() => deleteStoryHandler(storyData.post_slug)}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1002,
                  }}
                >
                  <i
                    className="bi bi-trash mx-3"
                    style={{ fontSize: "16px", color: "white" }}
                  />
                </span>
                <span
                  onClick={() => router.push("/")}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1002,
                  }}
                >
                  <i
                    className="bi bi-x"
                    style={{ fontSize: "20px", color: "white" }}
                  />
                </span>
              </div>
            </div>

            <img
              class="story-image"
              src={`${constants.port}${storyData.image}`}
              alt="Story Image"
            />

            <p className="caption">{storyData.caption}</p>
          </div>
        ),
      }));

      return { story: userStories };
    });
  }
  if (storyList) {
    formattedStoryList = storyList.map((userItem) => {
      const userStories = userItem.story.map((storyData) => ({
        // url: `${constants.port}${storyData.image}`,
        // duration: 5000,
        // header: {
        //   heading: userItem.user.name,
        //   subheading: `Posted ${timeSincePost(storyData.posted)}`,
        //   profileImage: `${constants.port}/media/${userItem.user.image}`,
        // },
        // content: (props) => (
        //   <div className={styles.container}>
        //     <div style={styles.main}>
        //       {userItem.user.image && <img style={styles.img} src={`${constants.port}/media/${userItem.user.image}`} />}
        //       <span style={styles.text}>
        //         <p style={styles.heading}>{userItem.user.name}</p>
        //         <p style={styles.subheading}>{`Posted ${timeSincePost(storyData.posted)}`}</p>
        //       </span>
        //     </div>
        //     <img className={styles.story} src={`${constants.port}${storyData.image}`} alt="Story" />
        //     <div className="custom-caption">
        //       <p>currentStory.caption</p>
        //     </div>
        //   </div>
        // ),
        content: (props) => (
          <div className="story-view-user" style={{ width: "100%" }}>
            <div className="story-header-user">
              <div style={{ display: "flex" }}>
                <img
                  src={
                    userItem.user.image
                      ? `${constants.port}/media/${userItem.user.image}`
                      : "/images/accounts/user_default.png"
                  }
                />
                <span className="story-head-text">
                  <p className="heading">{userItem.user.name}</p>
                  <p className="subheading">{`Posted ${timeSincePost(
                    storyData.posted
                  )}`}</p>
                </span>
              </div>
              <div>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1002,
                  }}
                >
                  <i
                    className="bi bi-x"
                    style={{
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                </span>
              </div>
            </div>

            <img
              className="story-image"
              src={`${constants.port}${storyData.image}`}
              alt="Story Image"
            />

            <p className="caption">{storyData.caption}</p>
          </div>
        ),
      }));

      return { story: userStories };
    });
  }
  console.log("logined_user", logined_user);

  const currentStory = logined_user
    ? loginedUserStory[0]
    : formattedStoryList[currentStoryIndex];

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <main className="main-container">
        <section className="content-container">
          <div className="content">
            {currentStory && (
              <Stories
                loop={true}
                stories={currentStory.story}
                progressStyles={false}
                onAllStoriesEnd={handleStoryEnd}
                // onStoryStart={(s, st) => console.log("story started", s, st)}
                // defaultInterval={1500}
                // width={432}
                // height={768}
              />
            )}
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default StoriesView;
