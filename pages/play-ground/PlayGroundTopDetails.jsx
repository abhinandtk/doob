import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";

function PlayGroundTopDetails({ details }) {
  console.log("qqqqqqqqqqqqqqq", details);
  //   console.log("qqqqqqqqqqqqqqq45", details.city.region_name);
  return (
    <Fragment>
      {/* <div className="my-3">
        {details.images && details.images.length > 0 && (
          <img
            src={`${constants.port}${details.images[0].images}`}
            className="img-fluid"
            style={{ width: "100%", height: "auto" }}
          ></img>
        )}
      </div>

      <h5 style={{ fontWeight: "700", fontSize: "18px" }}>
        {details.stadium_name}
      </h5>
      <p style={{ fontSize: "14px", color: "gray", fontWeight: "500" }}>
        {details.location},{details.city && details.city.region_name}
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
          {details.amount}<span style={{ fontWeight: "400" }}>/slot</span>
        </p>
      </div>

      <span className="sports-type">
        {details.game && details.game.map((game,index)=>(
        
        <span key={index} className="mx-1">
          <img src={`${constants.port}${game.logo}`} style={{width:'18px',height:'18px',objectFit:'cover'}}></img>
        </span>
        ))}
      </span>
      <br></br>

      <hr></hr>
      <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Description</h5>
      <p className="col-md-12">{details.description}</p> */}
    </Fragment>
  );
}

export default PlayGroundTopDetails;
