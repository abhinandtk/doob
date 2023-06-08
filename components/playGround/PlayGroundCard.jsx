import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

function PlayGroundCard({ content }) {
  const router = useRouter();

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
          {/* View all */}
        </p>
      </div>
        
      <div className="playgrounds " style={{cursor:'pointer'}}>
        {content.map((item, index) => (
          <div
            onClick={() =>
              router.push({
                pathname: `/play-ground/${item.slug_field}`,
                query: {
                  stadium_id: item.id,
                  date: moment().format("YYYY-MM-DD"),
                },
              })
            }
            key={index}
            className="card playground-card"
          >
            {item.images[0] && (
              <img
                src={`${constants.port}${item.images[0].image_url.slice(7)}`}
                style={{
                  height: "190px",
                  borderRadius: "20px 20px 0px 0px",
                  objectFit: "cover",
                }}
                alt="..."
              />
            )}
            <div className="card-body play-body">
              <p className="stadium-name">{item.stadium_name}</p>
              <div style={{ marginTop: "-5px" }}>
                <div className="stadiums">
                  <i className="bi bi-geo-alt" style={{ color: "green" }}></i>
                  <div className="mx-2 places">{item.location}, Kuwait</div>
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span>
                  <i
                    className="bi bi-star-fill"
                    style={{ color: "yellow" }}
                  ></i>
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
