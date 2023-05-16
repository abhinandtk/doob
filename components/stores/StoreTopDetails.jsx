import React, { useState } from "react";
import { Fragment } from "react";
import { Collapse } from "antd";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import moment from "moment";
const { Panel } = Collapse;

function StoreTopDetails({ data }) {
  const [descShow, setDescShow] = useState(false);

  const storeWishlistHandler = (id, favorite) => {
    const api = favorite ? apis.removestorewishlist : apis.addstorewishlist;
    Axios.post(
      api,
      {
        slug_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("restttttttttttttttttttttttttttttttttttttt", res);
    });
  };

  return (
    <Fragment>
      <div className="banner my-3">
        <img
          src={`${constants.port}${data.cover_photo}`}
          className="img-fluid"
        ></img>
        <span className="span-icon">
          <svg
            onClick={() =>
              storeWishlistHandler(data.slug_store, data.is_favorite)
            }
            width="25"
            height="22"
            viewBox="0 0 25 22" 
            fill={`${data.is_favorite ? "red" : "none"}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2133 20.8391C12.2133 20.8391 1 14.5938 1 7.09945C1 -0.394922 9.72146 -1.01945 12.2133 4.84416C14.7052 -1.01945 23.4266 -0.394922 23.4266 7.09945C23.4266 14.5938 12.2133 20.8391 12.2133 20.8391Z"
              stroke="white"
              stroke-width="1.35919"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
          <svg
            width="35"
            height="34"
            viewBox="0 0 35 34"
            fill="none"
            className="ms-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9854 24.9206C15.9854 24.156 16.6322 23.5361 17.43 23.5361C18.2279 23.5361 18.8747 24.156 18.8747 24.9206C18.8747 25.6853 18.2279 26.3051 17.43 26.3051C16.6322 26.3051 15.9854 25.6853 15.9854 24.9206Z"
              stroke="white"
              stroke-width="1.4447"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.9854 16.614C15.9854 15.8494 16.6322 15.2295 17.43 15.2295C18.2279 15.2295 18.8747 15.8494 18.8747 16.614C18.8747 17.3786 18.2279 17.9985 17.43 17.9985C16.6322 17.9985 15.9854 17.3786 15.9854 16.614Z"
              stroke="white"
              stroke-width="1.4447"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.9854 8.30686C15.9854 7.54223 16.6322 6.92236 17.43 6.92236C18.2279 6.92236 18.8747 7.54223 18.8747 8.30686C18.8747 9.0715 18.2279 9.69136 17.43 9.69136C16.6322 9.69136 15.9854 9.0715 15.9854 8.30686Z"
              stroke="white"
              stroke-width="1.4447"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <img src={`${constants.port}${data.logo}`} className="foot-png"></img>
      </div>

      <div className="my-3">
        <div className="row">
          <div className="col-md-6">
            <h5>{data.title}</h5>
            <p style={{ fontSize: "13px", color: "gray" }}>{data.address}</p>
            <span>
              <p className="mx-1">
                <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
                4.5 <span style={{ color: "grey" }}>(12.30 reviews)</span>
              </p>
            </span>
            <p>
              <i className="bi bi-clock"></i>
              <span className="mx-2">
                {moment(data.start_time, "HH:mm:ss").format("hh:mm A")} -
                {moment(data.end_time, "HH:mm:ss").format("hh:mm A")}
              </span>
            </p>
          </div>

          <div className="col-md-6">
            <div className="more" onClick={() => setDescShow(!descShow)}>
              More
              {descShow ? (
                <i className="bi bi-chevron-down "></i>
              ) : (
                <i className="bi bi-chevron-right "></i>
              )}
            </div>
          </div>
          <hr className="line "></hr>
          {descShow && (
            <div className="text">
              <div className="description">
                <h5>Description</h5>
                <p className="col-md-12">{data.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default StoreTopDetails;
