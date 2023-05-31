import React from "react";
import { Fragment } from "react";
import Axios from 'axios'

function  PlayGroundCard({content}) {
    
  return (
    <Fragment>
      <div className="clearfix mt-3 ">
        <h5
          className="float-start"
          style={{ fontWeight: "700", fontSize: "19px", marginLeft: "-6px" }}
        >
          Playground
        </h5>
        <p className="float-end" style={{ color: "#959595" }}>
          View all
        </p>
      </div>
     
      <div className="playgrounds ">
      {content.map((item,index)=>(
        <div key={index} class="card playground-card">
          <img
            src="/images/tournament/soccer-players-action-professional-stadium 2.png"
            style={{
              height: "190px",
              borderRadius: "20px 20px 0px 0px",
              objectFit: "cover",
            }}
            alt="..."
          />
          <div class="card-body play-body">
            <p className="stadium-name">{item.stadium_name}</p>
            <div style={{ marginTop: "-5px" }}>
              <div className="stadiums">
                <i class="bi bi-geo-alt" style={{ color: "green" }}></i>
                <div className="mx-2 places">{item.location}, Kuwait</div>
              </div>
            </div>
            <div style={{ marginTop: "8px" }}>
              <span>
                <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                <span className="mx-2">4.5</span>
              </span>
            </div>
          </div>
        </div>))}
      </div>
     
    </Fragment>
  );
}

export default PlayGroundCard;
