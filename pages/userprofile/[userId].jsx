import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Tab, Tabs, Card } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import OtherProfileHeaderDetails from "@/components/profile/OtherProfileHeaderDetails";
import { useEffect } from "react";
import UserProfileActivityTab from "@/components/homepage/social/UserProfileActivityTab";
function OtherUserAccount() {
  const router = useRouter();
  const { userId } = router.query;

  const [postDetails, setPostDetails] = useState([]);
  const [profileDetails, setProfileDetials] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [isPrivate, setIsPrivate] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    Axios.post(
      apis.otheruser,
      { user_id: userId },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    )
      .then((res) => {
        console.log("Response:", res);
        setIsPrivate(res.data.data.is_private);
        setProfileDetials(res.data.data.user_details);
        setPostDetails(res.data.data.post_details);
        setActivityData(res.data.data.activity_serializer);
        // Handle the response data here
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle any errors here
      });
  }, [isSuccess]);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />

      <div className="container2">
        <OtherProfileHeaderDetails
          data={profileDetails}
          id={userId}
          isPrivate={isPrivate}
          setIsSuccess={setIsSuccess}
        />
        {profileDetails.is_following === 1 ? (
          <section id="tabs">
            <Tabs
              id="uncontrolled-tab-example"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Tab eventKey={1} title="Feeds">
                <hr className=" line"></hr>

                <div className="row images">
                  {postDetails.map((item, index) => (
                    <div key={index} className="col-md-4" tabindex="0">
                      <img
                        src={`${constants.port}${item.image}`}
                        style={{ objectFit: "cover" }}
                        className="image"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey={2} title="Activities">
                <hr className=" line "></hr>
                <UserProfileActivityTab activityData={activityData} />
              </Tab>
            </Tabs>
          </section>
        ) : (
          <div className="profile-private">
            <h5 className="text-center">This Account is Private</h5>
            <p className="text-center">
              Follow to see their photos and videos.
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default OtherUserAccount;
