import React from "react";
import { Fragment } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { CardImg } from "react-bootstrap";
import { Rate, message } from "antd";
import Axios from "axios";
function ProductReviewList({ reviewData, setOnSuccess }) {
  console.log("oooppppooopopopopopopopo", reviewData);

  const deleteReview = (id) => {
    Axios.post(
      apis.deleteReview,
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
      setOnSuccess((prev) => !prev);
      message.success("Review Deleted");
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
                  <a className="me-2" href="">
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={`${constants.port}${item.user_image}`}
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
                          float: "left",
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
                  >
                    <i class="bi bi-trash " style={{ fontSize: "1rem" }}></i>
                  </div>
                </div>
              ))}

            {content.other_user.map((item, index) => (
              <div key={index} className="d-flex flex-start mt-4 mx-2">
                <a className="me-2" href="">
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src={`${constants.port}${item.user_image}`}
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
                        className="mb-0"
                        style={{
                          fontWeight: "600",
                          color: "#000",
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
                      className="col-md-7"
                      style={{
                        color: "#000",
                        fontWeight: "400",
                        fontSize: "14px",
                        float: "left",
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

export default ProductReviewList;
