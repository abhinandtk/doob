import React, { Fragment } from "react";

function GamesCard() {
  return (
    <Fragment>
      <div className="card  book">
        <div className="card-body">
          <div className="clearfix">
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
              <h5 style={{ color: "#17A803", fontWeight: "700" }}>24</h5>
              <p>Feb</p>
            </div>
            <div className="book-details">
              <h5 style={{ fontWeight: "700" }}>Football League 2023</h5>
              <p style={{ color: "#959595" }}>9.00 AM to 12.00 PM</p>
              <p>Mohammed Al‑Hamad Stadium</p>
              <p>Hawally, Kuwait</p>
            </div>
          </div>
          <div class="route d-flex my-3">
            <img
              className="rounded-circle default-avatar member-overlap-item"
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
            ></img>
            <img
              className="rounded-circle default-avatar member-overlap-item"
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
            ></img>
            <img
              className="rounded-circle default-avatar member-overlap-item"
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
            ></img>
            <img
              className="rounded-circle default-avatar member-overlap-item"
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
            ></img>
            <span className="mx-4" style={{ color: "#959595" }}>
              +7 more participants
            </span>{" "}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GamesCard;
