import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";

function SharedPostHeaders({ data }) {
  function timeSincePost(posted) {
    const timeDiff = moment.duration(moment().diff(moment(posted)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  }
  return (
    <Fragment>
      {data && (
        <div className="post__profile">
          <div className="post__avatar">
            {data.user_detail.image ? (
              <img
                src={`${constants.port}/media/${data.user_detail.image}`}
                alt="User Picture"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <img
                src="/images/accounts/user_default.png"
                alt="User Picture"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
          <div className="users">
            <div className="post__likes">
              <div href="" className="post__user">
                <Link
                  href={
                    constants.user_id === data.user_detail.id
                      ? "/profile"
                      : `/userprofile/${data.user_detail.id}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  {data.user_detail.name}
                  {data.user_detail.account_type === "star" ? (
                    <span>
                      <img src="/images/Star.png" className="mx-1 mb-1"></img>
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
                <span className="mx-1" style={{ color: "#616661" }}>
                  Shared
                </span>{" "}
                <span
                  className="product-name-shared"
                  style={{ fontWeight: "500" }}
                >
                  {data.post_type === "Product"
                    ? data.product.product_name
                    : data.post_type === "Store"
                    ? data.store.title
                    : data.post_type === "Field" && data.stadium.stadium_name}
                </span>
              </div>
            </div>
            <div className="time">{timeSincePost(data.posted)}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default SharedPostHeaders;
