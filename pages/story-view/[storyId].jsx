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
  }, []);

  function timeSincePost(posted) {
    const timeDiff = moment.duration(moment().diff(moment(posted)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  }

  const stories = [];
  storyList.map((item) => {
    console.log("storyData733", item);
    const user = item.user;
    item.story.map((storyData) =>
      stories.push({
        url: `${constants.port}${storyData.image}`,
        duration: 5000,
        header: {
          heading: user.name,
          subheading: `Posted ${timeSincePost(storyData.posted)}`,
          profileImage: `${constants.port}/media/${user.image}`,
        },
      })
    );
  });

  console.log("storyData7", stories);

  // const stories2 = [
  //   {
  //     url: "https://i.ibb.co/fY1DmQW/8aacdef9ba37db60c7a96271877cfbb5.jpg",
  //     duration: 5000,
  //     header: {
  //       heading: "Mohit Karekar",
  //       subheading: "Posted 30m ago",
  //       profileImage:
  //         "https://i.ibb.co/fY1DmQW/8aacdef9ba37db60c7a96271877cfbb5.jpg",
  //     },
  //   },
  //   {
  //     url: "https://i.ibb.co/MGbfDTH/Group-13.png",
  //     duration: 5000,
  //     header: {
  //       heading: "Mohit Karekar",
  //       subheading: "Posted 30m ago",
  //       profileImage: "https://i.ibb.co/MGbfDTH/Group-13.png",
  //     },
  //   },
  //   {
  //     url: "https://i.ibb.co/fY1DmQW/8aacdef9ba37db60c7a96271877cfbb5.jpg",
  //     duration: 5000,
  //     header: {
  //       heading: "Mohit Karekars",
  //       subheading: "Posted 30m ago",
  //       profileImage: "https://i.ibb.co/MGbfDTH/Group-13.png",
  //     },
  //   },
  // ];
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <main className="main-container">
        <section className="content-container">
          <div className="content">
            {/* <StoriesMainPage /> */}
            {stories.length > 0 && (
              <Stories
                loop={true}
                stories={stories}
                // renderers={}
                // onStoryEnd={(s, st) => console.log("story ended", s, st)}
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
