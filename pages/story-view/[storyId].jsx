import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";

import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import SingleContainerHomePosts from "@/components/homepage/SingleContainerHomePosts";
import StoriesMainPage from "@/components/homepage/StoriesMainPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Stories, { WithSeeMore } from "react-insta-stories";
import { Avatar, Card, List } from "antd";
import Axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { storyId } = router.query;

  const [currentStoryIndex, setCurrentStoryIndex] = useState(storyId);
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
      setIsLoading(false);
      console.log("response67", res);
    });
  }, [storyId]);

  function timeSincePost(posted) {
    const timeDiff = moment.duration(moment().diff(moment(posted)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  }

  function handleStoryEnd() {
    // Check if there are more stories
    if (currentStoryIndex < storyList.length - 1) {
      // Increment the current story index
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // All stories have ended, you can handle this case here
      console.log("All stories have ended.");
    }
  }
  let formattedStoryList;
  // Render stories based on the current story index
  if (storyList) {
    formattedStoryList = storyList.map((userItem) => {
      const userStories = userItem.story.map((storyData) => ({
        url: `${constants.port}${storyData.image}`,
        duration: 5000,
        header: {
          heading: userItem.user.name,
          subheading: `Posted ${timeSincePost(storyData.posted)}`,
          profileImage: `${constants.port}/media/${userItem.user.image}`,
        },
      }));

      return { story: userStories };
    });
  }

  const currentStory = formattedStoryList[currentStoryIndex];

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <main className="main-container">
        <section className="content-container">
          <div className="content">
            {/* <StoriesMainPage /> */}
            {formattedStoryList.length > 0 && currentStory && (
              <Stories
                loop={true}
                stories={currentStory.story}
                progressStyles={false}
                onAllStoriesEnd={() =>
                  setCurrentStoryIndex(currentStoryIndex + 1)
                }
                // onStoryStart={(s, st) => console.log("story started", s, st)}
                // defaultInterval={1500}
                // width={432}
                // height={768}
              />
            )}

            {/* <SingleContainerHomePosts story={true} /> */}
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default StoriesView;
