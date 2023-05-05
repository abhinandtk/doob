import React from "react";
import { Fragment } from "react";

function PlayGroundTopDetails() {
  return (
    <Fragment>
      <div className="my-3">
        <img
          src="../images/tournament/stadium 3.jpg"
          className="img-fluid"
          style={{ width: "100%", height: "auto" }}
        ></img>
      </div>

      <h5 style={{ fontWeight: "700", fontSize: "18px" }}>
        Mohammed Al‑Hamad Stadium
      </h5>
      <p style={{ fontSize: "14px", color: "gray", fontWeight: "500" }}>
        Hawally,Kuwait
      </p>
      <div className="clearfix rating">
        <span className="float-start ml-5">
          <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
          <span className="mx-2">4.5</span>
        </span>
        <p
          className="float-end"
          style={{ fontWeight: "700", color: "#17A803" }}
        >
          5.000 KD<span style={{ fontWeight: "400" }}>/slot</span>
        </p>
      </div>
      <span className="sports-type">
        <img src="../images/tournament/footballs.png"></img>
        <span className="mx-1">
          <img src="../images/tournament/Basketball.png"></img>
        </span>
        <span className="mx-1">
          <img src="../images/tournament/Cricket.png"></img>
        </span>
      </span>
      <br></br>

      <hr></hr>
      <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Description</h5>
      <p className="col-md-12">
        Mohammed al-Hamad Stadium is a multi-purpose stadium in Hawally, Kuwait.
        It is currently used mostly for football matches. The stadium holds
        26,000. This Stadium is the home ground for Al Qadsia Kuwait.
      </p>
    </Fragment>
  );
}

export default PlayGroundTopDetails;
