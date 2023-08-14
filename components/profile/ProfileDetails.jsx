import React, { Fragment } from "react";
import { useState } from "react";
import { Card, Tab, Tabs, CardImg, Dropdown } from "react-bootstrap";
import ProfileHeaderDetails from "./ProfileHeaderDetails";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import UserProfileActivityTab from "../homepage/social/UserProfileActivityTab";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
function ProfileDetails() {
  const { t } = useTranslation();
  const [key, SetKey] = useState(1);
  const [page, setPage] = useState(1);
  const [userDetials, setUserDetails] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const apiSuccess = useSelector((state) => state.api);

  const [success, setSuccess] = useState(true);
  useEffect(() => {
    const paginationApiUrl = `${apis.profilepage}?page=${page}`;
    Axios.get(paginationApiUrl, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setUserDetails(res.data.data.user_details);

      if (page === 1) {
        setPostDetails(res.data.data.post_details);
        setActivityData(res.data.data.activity_serializer);
      } else {
        setPostDetails((prevPosts) => [
          ...prevPosts,
          ...res.data.data.post_details,
        ]);
        setActivityData((prevActivity) => [
          ...prevActivity,
          ...res.data.data.activity_serializer,
        ]);
      }
      console.log("POsts result=-----------------------", res);
    });
  }, [success, apiSuccess, page]);

  // Axios.get(apis.activity, {
  //   headers: {
  //     Authorization: `Token ${constants.token_id}`,
  //   },
  // }).then((res) => {
  //   setActivityData(res.data.data);
  // });

  return (
    <Fragment>
      <ProfileHeaderDetails data={userDetials} setSuccess={setSuccess} />
      <div className="container2">
        <section id="tabs">
          <Tabs
            // id="uncontrolled-tab-example"
            style={{ display: "flex", justifyContent: "space-evenly" }}
            // defaultActiveKey='1'
            activeKey={key}
            onSelect={(e) => SetKey(e)}
          >
            <Tab eventKey={1} title="Feeds">
              <hr className=" line"></hr>

              <div className="row images">
                {postDetails.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6 col-sm-4 col-xs-2"
                      tabindex="0"
                    >
                      <Link href={`/page/post/${item.slug}`}>
                        <img
                          key={index}
                          src={`${constants.port}${item.image}`}
                          className="image"
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Tab>
            <Tab eventKey={2} title="Activities">
              <hr className=" line "></hr>
              <UserProfileActivityTab activityData={activityData} />
              <p
                onClick={() => setPage((prev) => prev + 1)}
                className="dark-theme-color my-2"
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                {t("Load More")}
              </p>
            </Tab>
          </Tabs>
        </section>
      </div>
    </Fragment>
  );
}

export default ProfileDetails;
