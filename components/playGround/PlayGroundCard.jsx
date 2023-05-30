import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";

function PlayGroundCard({ content }) {
  const router =useRouter()
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
      <div className="playgrounds">
        {content.map((item, index) => (
          <div
            onClick={() =>
              router.push({
                pathname: `/play-ground/${item.slug_field}`,
                query: {
                  stadium_id: item.id,
                  date: moment().format('YYYY-MM-DD'),
                },
              })
            }
            key={index}
            class="card playground-card"
          >
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
              <p>{item.stadium_name}</p>
              <div style={{ marginTop: "-5px" }}>
                <span>
                  <i class="bi bi-geo-alt" style={{ color: "green" }}></i>
                  <span className="mx-2">{item.location}, Kuwait</span>
                </span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span>
                  <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                  <span className="mx-2">4.5</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default PlayGroundCard;
