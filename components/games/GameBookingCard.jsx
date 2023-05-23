import moment from "moment";
import React from "react";
import { Fragment } from "react";

function GameBookingCard({ data }) {
  console.log("ffffffffffff", data);

  return (
    <Fragment>
      {data &&
        data.map((value, index) => (
          <div key={index} className="card  book">
            <div className="card-body">
              <div className="clearfix  dot-web">
                <div className="float-end dots">
                  <svg
                    width="28"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4629 19.5441C12.4629 18.9445 12.9701 18.4583 13.5959 18.4583C14.2216 18.4583 14.7289 18.9445 14.7289 19.5441C14.7289 20.1438 14.2216 20.6299 13.5959 20.6299C12.9701 20.6299 12.4629 20.1438 12.4629 19.5441Z"
                      fill="black"
                    />
                    <path
                      d="M12.4629 13.0294C12.4629 12.4297 12.9701 11.9436 13.5959 11.9436C14.2216 11.9436 14.7289 12.4297 14.7289 13.0294C14.7289 13.6291 14.2216 14.1152 13.5959 14.1152C12.9701 14.1152 12.4629 13.6291 12.4629 13.0294Z"
                      fill="black"
                    />
                    <path
                      d="M12.4629 6.5147C12.4629 5.91504 12.9701 5.42892 13.5959 5.42892C14.2216 5.42892 14.7289 5.91504 14.7289 6.5147C14.7289 7.11436 14.2216 7.60049 13.5959 7.60049C12.9701 7.60049 12.4629 7.11436 12.4629 6.5147Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div className="book-content">
                <div className="book-date">
                  <h5 style={{ color: "#17A803", fontWeight: "700" }}>
                    {moment(value.stadium_details.date).format("D")}
                  </h5>
                  <p>{moment(value.stadium_details.date).format("MMM")}</p>
                </div>
                <div className="book-details">
                  <p style={{ color: "#959595" }}>9.00 AM to 12.00 PM</p>
                  <p>{value.stadium_details.stadium_name}</p>
                  <p>
                    {value.stadium_details.location},{" "}
                    {value.stadium_details.city}
                  </p>
                </div>
              </div>
              <hr></hr>
              <div className="book-profile">
                <span>
                  <img
                    src="../images/tournament/c1.png"
                    style={{ width: "30px", height: "30px" }}
                  ></img>{" "}
                  <span className="mx-2">
                    <span style={{ color: "#17A803" }}>Hosted by</span> Muhammad
                    Alsalah
                  </span>
                </span>
                <p className="my-2" style={{ color: "#959595" }}>
                  Do you want to invite people?
                </p>
              </div>
              <button type="button" className="yes-btn float-end mx-1">
                No
              </button>{" "}
              <button type="button" className="yes1-btn float-end">
                Yes
              </button>
            </div>
          </div>
        ))}
    </Fragment>
  );
}

export default GameBookingCard;
