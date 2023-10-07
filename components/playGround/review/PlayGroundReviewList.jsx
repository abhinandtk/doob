import React from "react";
import { Fragment } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { CardImg } from "react-bootstrap";
import { Rate, message } from "antd";
import Axios from "axios";
import { useTranslation } from "next-i18next";
function PlayGroundReviewList({ reviewData, setOnSuccess }) {
  const { t } = useTranslation();
  const deleteReview = (id) => {
    Axios.post(
      apis.stadiumReviewRemove,
      {
        review_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      message.success(t("Review Deleted"));
    });
  };

  return (
    <Fragment>
      {reviewData &&
        reviewData.map((content, index) => (
          <>
            {content.logged_user &&
              content.logged_user.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-start justify-content-end mt-4 mx-2"
                >
                  <a className="mx-2" href="">
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={
                        item.user_image
                          ? `${constants.port}/media/${item.user_image}`
                          : "/images/accounts/user_default.png"
                      }
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                      }}
                    ></CardImg>
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
                          {item.user_name} <br></br>
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
                        {item.review}
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
                  >
                    <i class="bi bi-trash " style={{ fontSize: "1rem" }}></i>
                  </div>
                </div>
              ))}

            {content.other_user.map((item, index) => (
              <div key={index} className="d-flex flex-start mt-4 mx-2">
                <a className="mx-2" href="">
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src={
                      item.user_image
                        ? `${constants.port}/media/${item.user_image}`
                        : "/images/accounts/user_default.png"
                    }
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "cover",
                    }}
                  ></CardImg>
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
                        {item.user_name} <br></br>
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
                      {item.review}
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

export default PlayGroundReviewList;
