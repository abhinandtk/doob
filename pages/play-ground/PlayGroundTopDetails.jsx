import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";
import Axios from 'axios'
import apis from "@/public/data/my-constants/Apis";
import { Labels } from "@/public/data/my-constants/Labels";
import { notification } from "antd";
function PlayGroundTopDetails({ details }) {
  const router = useRouter();
  const { pgid } = router.query;
  const labels=Labels()
  const handleShareFieldPost = () => {
    Axios.post(
      apis.shareFieldToPost,
      { stadium_slug: pgid },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
          description: `${labels["PlayGround shared"]}`,
        });
      }
      console.log("res@@", res);
    });
  };
  console.log("qqqqqqqqqqqqqqq", details, pgid);
  //   console.log("qqqqqqqqqqqqqqq45", details.city.region_name);
  return (
    <Fragment>
      {details && (
        <>
          <div className="banner my-3">
            {details.images && details.images.length > 0 && (
              <img
                src={`${constants.port}${details.images[0].images}`}
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              ></img>
            )}
            <span className="span-icon" style={{ marginLeft: "-70px" }}>
              <span
                onClick={() => handleShareFieldPost()}
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="30"
                  height="28"
                  viewBox="0 0 30 28"
                  className="ms-3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8848 15.9742L18.9425 10.3203"
                    stroke="white"
                    stroke-width="1.50701"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z"
                    stroke="white"
                    stroke-width="1.50701"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </span>
          </div>

          <h5 style={{ fontWeight: "700", fontSize: "18px" }}>
            {details.stadium_name}
          </h5>
          <p style={{ fontSize: "14px", color: "gray", fontWeight: "500" }}>
            {details.location},{details.city && details.city.region_name}
          </p>
          <div className="clearfix rating">
            {/* <span className="float-start ml-5">
              <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
              <span className="mx-2">{details.rating}</span>
            </span> */}
            <p
              className="float-end"
              style={{ fontWeight: "700", color: "#17A803" }}
            >
              {details.amount} KD
              <span style={{ fontWeight: "400" }}>/slot</span>
            </p>
          </div>

          <span className="sports-type">
            {details.game &&
              details.game.map((game, index) => (
                <span key={index} className="mx-1">
                  <img
                    src={`${constants.port}${game.logo}`}
                    style={{
                      width: "18px",
                      height: "18px",
                      objectFit: "cover",
                    }}
                  ></img>
                </span>
              ))}
          </span>
          <br></br>

          <hr></hr>
          <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Description</h5>
          <p className="col-md-12">{details.description}</p>
        </>
      )}
    </Fragment>
  );
}

export default PlayGroundTopDetails;
