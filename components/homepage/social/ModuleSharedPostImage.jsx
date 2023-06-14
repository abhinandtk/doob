import moment from "moment";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";

function ModuleSharedPostImage({ data }) {
  return (
    <Fragment>
      {data && (
        <Link
          href={
            data.post_type === "Product"
              ? `/store/product/${data.product.slug_product_varient}`
              : data.post_type === "Store"
              ? `/store/${data.store.slug_store}`
              : data.post_type === "Field"
              ? {
                  pathname: `/play-ground/${data.stadium.slug_field}`,
                  query: { stadium_id: data.stadium.id, date: moment().format("YYYY-MM-DD") }, // Add your query parameters here
                }
              : ""
          }
          style={{ textDecoration: "none" }}
        >
          <div className="post__medias">
            <img
              className="post__media"
              src={`${data.image}`}
              alt="Post Content"
            />
            {/* multiple image */}
            {/* <img
                  className="post__media"
                  src="../images/soccer-into-goal-success-concept 2.png"
                  alt="Post Content"
                /> */}
          </div>
        </Link>
      )}
    </Fragment>
  );
}

export default ModuleSharedPostImage;
