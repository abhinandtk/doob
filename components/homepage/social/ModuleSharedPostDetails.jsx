import React from "react";

function ModuleSharedPostDetails({ data }) {
  return (
    <div>
      <div className="post__likes">
        <h6 className="post-names">
          {data.post_type === "Product"
            ? data.product.product_name
            : data.post_type === "Store"
            ? data.store.title
            : data.stadium.stadium_name}
        </h6>
      </div>
      <div className="comments my-2">
        {data.post_type === "Product"
          ? data.product.Description
          : data.post_type === "Store"
          ? data.store.description
          : data.stadium.description}
      </div>
    </div>
  );
}

export default ModuleSharedPostDetails;
