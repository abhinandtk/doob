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
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import OtherUserProfileActivity from "@/components/homepage/social/OtherUserProfileActivity";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function OtherUserAccount() {
  const { t } = useTranslation();
  const router = useRouter();
  const { userId } = router.query;
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [postDetails, setPostDetails] = useState([]);
  const [profileDetails, setProfileDetials] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [isPrivate, setIsPrivate] = useState(null);
  const [blockedby, setBlockedby] = useState(null);
  const [blockedfrom, setBlockedfrom] = useState(null);
  const [storeDetail, setStoreDetail] = useState(null);
  const [groundDetail, setGroundDetail] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const paginationApiUrl = `${apis.otheruser}?page=${page}`;
    Axios.post(
      paginationApiUrl,
      { user_id: userId },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    )
      .then((res) => {
        console.log("Response:", res);
        setGroundDetail(res.data.data.stadium_detail);
        setStoreDetail(res.data.data.store_detail);
        setIsPrivate(res.data.data.is_private);
        setBlockedby(res.data.data.blocked_by);
        setBlockedfrom(res.data.data.blocked_from);
        setProfileDetials(res.data.data.user_details);
        setActivityData(res.data.data.activity_serializer);
        setProfileDetials(res.data.data.user_details);

        setLoadMore(!!res.data.next);
        if (page === 1) {
          setPostDetails(res.data.data.post_details);
        } else {
          setPostDetails((prev) => [...prev, ...res.data.data.post_details]);
        }

        // Handle the response data here
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle any errors here
      });
  }, [isSuccess, userId, page]);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />

      <div className="container2">
        <OtherProfileHeaderDetails
          data={profileDetails}
          id={userId}
          isPrivate={isPrivate}
          blockedby={blockedby}
          blockedfrom={blockedfrom}
          setIsSuccess={setIsSuccess}
          groundDetail={groundDetail}
          storeDetail={storeDetail}
        />
        {profileDetails.is_following === 1 ||
        (!isPrivate && !blockedfrom && !blockedby) ? (
          <section id="tabs">
            <Tabs
              id="uncontrolled-tab-example"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Tab eventKey={1} title={t("Feeds")}>
                <hr className=" line"></hr>

                <div className="row images">
                  {postDetails.map((item, index) => (
                    <div key={index} className="col-md-4" tabindex="0">
                      <Link href={`/page/post/${item.slug}`}>
                        <img
                          src={`${constants.port}${item.image}`}
                          style={{ objectFit: "cover" }}
                          className="image"
                          alt=""
                        />
                      </Link>
                    </div>
                  ))}
                  {loadMore && (
                    <p
                      onClick={() => setPage((prev) => prev + 1)}
                      className="dark-theme-color my-3"
                      style={{ cursor: "pointer", textAlign: "center" }}
                    >
                      {t("Load More")}
                    </p>
                  )}
                </div>
              </Tab>
              <Tab eventKey={2} title={t("Activities")}>
                <hr className=" line "></hr>
                <OtherUserProfileActivity />
              </Tab>
            </Tabs>
          </section>
        ) : (
          <div className="profile-private">
            <h5 className="text-center dark-theme-color">
              {blockedfrom || blockedby
                ? t("Currently unavailable")
                : t("This Account is Private")}
            </h5>
            <p className="text-center dark-theme-color">
              {!blockedfrom && !blockedby
                ? t("Follow to see their photos and videos")
                : null}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default OtherUserAccount;
