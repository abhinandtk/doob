import { useRouter } from "next/router";
import React from "react";

function ModuleSharedPostDetails({ data }) {
  const router = useRouter();
  const { locale } = router;

  const productDesc =
    locale === "en"
      ? data.products.Description
      : data.products.arabic_description;
  const productName =
    locale === "en"
      ? data.products.product_name
      : data.products.arabic_translator;
  return (
    <div>
      <div className="post__likes">
        <h6 className="post-names">
          {data.post_type === "Product"
            ? productName
            : data.post_type === "Store"
            ? data.stores.title
            : data.stadiums.stadium_name}
        </h6>
      </div>
      <div className="comments my-2">
        {data.post_type === "Product"
          ? productDesc
          : data.post_type === "Store"
          ? data.stores.description
          : data.stadiums.description}
      </div>
    </div>
  );
}

export default ModuleSharedPostDetails;
