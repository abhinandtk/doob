import React from "react";

function ModuleSharedPostDetails({ data }) {
  return (
    <div>
      <div className="post__likes">
        <h6 className="post-names">
          {data.post_type === "Product"
            ? data.products.product_name
            : data.post_type === "Store"
            ? data.stores.title
            : data.stadiums.stadium_name}
        </h6>
      </div>
      <div className="comments my-2">
        {data.post_type === "Product"
          ? data.products.Description
          : data.post_type === "Store"
          ? data.stores.description
          : data.stadiums.description}
      </div>
    </div>
  );
}

export default ModuleSharedPostDetails;
