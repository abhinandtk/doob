import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import React from "react";
import { Card, CardImg } from "react-bootstrap";

function UserProfileActivityTab({ activityData }) {
  return (
    <div>
      <Card className="card-tab">
        {activityData.map((item, index) => (
          <div key={index}>
            <h6
              key={index}
              style={{
                color: "#000",
                fontWeight: "600",
                fontSize: "18px",
                marginLeft: "43px",
                marginTop: "44px",
                textAlign: "left",
              }}
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
                            <p className=" Book">
                              {item_.title} {item_.booking.stadium_name}
                            </p>
                          </div>
                          <p className="small-time ">
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
                          <p className="small-time ">
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
                          <p className="small-time ">
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
                          <p className="small-time ">
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
                          <p className="small-time ">
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

        <br></br>
      </Card>
    </div>
  );
}

export default UserProfileActivityTab;
