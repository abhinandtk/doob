import React, { Fragment } from "react";
import { useState } from "react";
import { Card, Tab, Tabs, CardImg, Dropdown } from "react-bootstrap";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function UserProfileActivityTab() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { locale } = router;
  const [loadMore, setLoadMore] = useState(true);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const paginationApiUrl = `${apis.userActivity}?page=${page}`;
    Axios.get(paginationApiUrl, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setLoadMore(!!res.data.next);
      if (page === 1) {
        setActivityData(res.data.data.activity_serializer);
      } else {
        setActivityData((prevActivity) => [
          ...prevActivity,
          ...res.data.data.activity_serializer,
        ]);
      }
      console.log("ACTIVITY result=-----------------------", res);
    });
  }, [page]);
  return (
    <div>
      <Card className="card-tab">
        {activityData.map((item, index) => (
          <div key={index}>
            <h6
              key={index}
              className={locale === "en" ? "activity-date" : "activity-date_ar"}
            >
              {item.date}
            </h6>
            {item.data.map((item_, index_) => (
              <>
                {item_.type === "Bookings" && item_.booking ? (
                  <>
                    <div key={index_} className="d-flex flex-start mt-3 mx-5">
                      {/* <a className="me-2" href=""> */}
                      {item_.booking && (
                        <CardImg
                          src={`${constants.port}${item_.booking.image}`}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "0px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      )}
                      {/* </a> */}
                      <div
                        className="flex-grow-1 flex-shrink-1 mx-2 mt-2 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p
                              className={locale === "en" ? "Books" : "Books_ar"}
                            >
                              {item_.title} {item_.booking.stadium_name}
                            </p>
                          </div>
                          <p
                            className={
                              locale === "en" ? "small-time" : "small-time_ar"
                            }
                            style={{ direction: "ltr" }}
                          >
                            {moment(item_.created_at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className=" line1 mx-5"></hr>
                  </>
                ) : item_.type === "Like" ? (
                  <>
                    <div key={index_} className="d-flex flex-start mt-3 mx-5">
                      {/* <a className="me-2" href=""> */}
                      {item_.post && (
                        <CardImg
                          src={`${constants.port}${item_.post.image}`}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "0px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      )}
                      {/* </a> */}
                      <div
                        className="flex-grow-1 flex-shrink-1 mx-2 mt-2 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className=" Book">
                              Liked {item_.post.user} Post
                            </p>
                          </div>
                          <p
                            className={
                              locale === "en" ? "small-time" : "small-time_ar"
                            }
                            style={{ direction: "ltr" }}
                          >
                            {moment(item_.created_at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className=" line1 mx-5"></hr>
                  </>
                ) : item_.type === "Share" ||
                  item_.type === "Post" ||
                  item_.type === "Shared" ? (
                  <>
                    <div key={index_} className="d-flex flex-start mt-3 mx-5">
                      {/* <a className="me-2" href=""> */}
                      {item_.post && (
                        <CardImg
                          src={`${constants.port}${item_.post.image}`}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "0px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      )}
                      {/* </a> */}
                      <div
                        className="flex-grow-1 flex-shrink-1 mx-2 mt-2 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className=" Book">
                              {item_.type === "Post"
                                ? "Posted"
                                : "Shared a Post"}
                            </p>
                          </div>
                          <p
                            className={
                              locale === "en" ? "small-time" : "small-time_ar"
                            }
                            style={{ direction: "ltr" }}
                          >
                            {moment(item_.created_at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className=" line1 mx-5"></hr>
                  </>
                ) : item_.type === "Follow" || item_.type === "Unfollow" ? (
                  <>
                    <div key={index_} className="d-flex flex-start mt-3 mx-5">
                      {/* <a className="me-2" href=""> */}
                      {item_.post && (
                        <CardImg
                          src={`${constants.port}${item_.post.image}`}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "0px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      )}
                      {/* </a> */}
                      <div
                        className="flex-grow-1 flex-shrink-1 mx-2 mt-2 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className=" Book">{item_.title}</p>
                          </div>
                          <p
                            className={
                              locale === "en" ? "small-time" : "small-time_ar"
                            }
                            style={{ direction: "ltr" }}
                          >
                            {moment(item_.created_at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className=" line1 mx-5"></hr>
                  </>
                ) : item_.type === "Login" || item_.type === "Logout" ? (
                  <>
                    <div key={index_} className="d-flex flex-start mt-3 mx-5">
                      {/* <a className="me-2" href=""> */}
                      {item_.post && (
                        <CardImg
                          src={`${constants.port}${item_.post.image}`}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "0px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      )}
                      {/* </a> */}
                      <div
                        className="flex-grow-1 flex-shrink-1 mx-2 mt-2 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className=" Book">You &nbsp;{item_.title}</p>
                          </div>
                          <p
                            className={
                              locale === "en" ? "small-time" : "small-time_ar"
                            }
                            style={{ direction: "ltr" }}
                          >
                            {moment(item_.created_at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className=" line1 mx-5"></hr>
                  </>
                ) : item_.type === "Order" ? (
                  <>
                    <div key={index_} className="d-flex flex-start mt-3 mx-5">
                      {/* <a className="me-2" href=""> */}
                      {item_.order.image && (
                        <CardImg
                          src={`${constants.port}${item_.order.image}`}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "0px",
                            objectFit: "cover",
                          }}
                        ></CardImg>
                      )}
                      {/* </a> */}
                      <div
                        className="flex-grow-1 flex-shrink-1 mx-2 mt-2 "
                        style={{ marginBottom: "-24px" }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p
                              className=" Book"
                              style={{ textAlign: "start", width: "100%" }}
                            >
                              {" "}
                              {item_.title}&nbsp;{item_.order.product_name}
                            </p>
                          </div>
                          <p
                            className={
                              locale === "en" ? "small-time" : "small-time_ar"
                            }
                            style={{ direction: "ltr" }}
                          >
                            {moment(item_.created_at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className=" line1 mx-5"></hr>
                  </>
                ) : (
                  ""
                )}
              </>
            ))}
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

        <br></br>
      </Card>
    </div>
  );
}

export default UserProfileActivityTab;
