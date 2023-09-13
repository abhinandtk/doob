import React from "react";
import { Fragment } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { CardImg } from "react-bootstrap";
import { Rate, message } from "antd";
import Axios from "axios";
import { useTranslation } from "next-i18next";
function StoreReviewList({ reviewData, setOnSuccess }) {
  console.log("oooppppooopopopopopopopo", reviewData);
  const {t}=useTranslation()

  const deleteReview = (id) => {
    console.log("reviewdelete", id);

    Axios.post(
      apis.removeStoreReview,
      {
        language: "",
        review_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("reviewdelete", res);
      setOnSuccess((prev) => !prev);
      message.success(t("Review Deleted"));
    });
  };

  return (
    <Fragment>
      {reviewData &&
        reviewData.map((content, index) => (
          <>
            {content.logined_user &&
              content.logined_user.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-start justify-content-end mt-4 mx-2"
                >
                  <a className="mx-2" href="">
                    {item.user_image ? (
                      <CardImg
                        className="rounded-circle shadow-1-strong "
                        src={`${constants.port}${item.user_image}`}
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
                          className="mb-0 dark-theme-color"
                          style={{
                            fontWeight: "600",

                            fontSize: "15px",
                          }}
                        >
                          {item.customer_name} <br></br>
                          <span>
                            <Rate disabled value={item.rating} />
                          </span>
                        </p>
                      </div>

                      <p
                        className="col-md-7 dark-theme-color"
                        style={{
                          fontWeight: "400",
                          fontSize: "14px",
                          // float: "left",
                        }}
                      >
                        {item.description}
                        <br></br>
                        {item.image && (
                          <img
                            src={`${constants.port}${item.image}`}
                            className="mt-2"
                            style={{
                              width: "130px",
                              height: "90px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => deleteReview(item.id)}
                    className="comment-options"
                    style={{ cursor: "pointer" }}
                  >
                    <i class="bi bi-trash " style={{ fontSize: "1rem" }}></i>
                  </div>
                </div>
              ))}

            {content.other_user.map((item, index) => (
              <div key={index} className="d-flex flex-start mt-4 mx-2">
                <a className="mx-2" href="">
                  {item.user_image ? (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={`${constants.port}${item.user_image}`}
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
                        className="mb-0 dark-theme-color"
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {item.customer_name} <br></br>
                        <span>
                          <Rate disabled value={item.rating} />
                        </span>
                      </p>
                    </div>

                    <p
                      className="col-md-7 dark-theme-color"
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        // float: "left",
                      }}
                    >
                      {item.description}
                      <br></br>
                      {item.image && (
                        <img
                          src={`${constants.port}${item.image}`}
                          className="mt-2"
                          style={{
                            width: "130px",
                            height: "90px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))}
    </Fragment>
  );
}

export default StoreReviewList;
