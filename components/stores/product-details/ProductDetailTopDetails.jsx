import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function ProductDetailTopDetails({ product }) {
  let productStock;
  let productNameExtension;

  const prVarientId = useSelector((state) => state.product.proVarient);

  let priceView;

  product.Product_Items.map((item, index) => {
    item.multivarient.length !== 0
      ? item.multivarient.map((item_, index_) => {
          if (item_.slug_id === prVarientId) {
            productStock = item_.stock;
            productNameExtension =
              "| " + item.values_values + "| " + item_.values;
          }
        })
       : item.slug_id === prVarientId &&
          (
            productNameExtension = "| " + item.values_values,
            productStock = item.stock
          );
  }); 
   
  
  return (
    <Fragment>
      <span className="float">
        <svg
          width="18"
          height="17"
          className="mx-2"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 18C9.5 18 0 12.3609 0 5.59388C0 -1.17312 7.38889 -1.73704 9.5 3.55748C11.6111 -1.73704 19 -1.17312 19 5.59388C19 12.3609 9.5 18 9.5 18Z"
            fill="black"
          />
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.58936 11.41L12.6278 7.37158"
            stroke="black"
            stroke-width="0.814796"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.69367 8.55832C2.02124 8.2221 2.10272 7.23757 2.82127 7.01648L15.9955 2.96286C16.6349 2.76612 17.2338 3.36502 17.0371 4.00441L12.9835 17.1787C12.7624 17.8972 11.7778 17.9787 11.4416 17.3063L8.64987 11.7228C8.56923 11.5615 8.43846 11.4307 8.27719 11.3501L2.69367 8.55832Z"
            stroke="black"
            stroke-width="0.814796"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3735 14.9998C10.3735 14.5396 10.7629 14.1665 11.2431 14.1665C11.7233 14.1665 12.1127 14.5396 12.1127 14.9998C12.1127 15.4601 11.7233 15.8332 11.2431 15.8332C10.7629 15.8332 10.3735 15.4601 10.3735 14.9998Z"
            stroke="black"
            stroke-width="0.814796"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.3735 10.0003C10.3735 9.54009 10.7629 9.16699 11.2431 9.16699C11.7233 9.16699 12.1127 9.54009 12.1127 10.0003C12.1127 10.4606 11.7233 10.8337 11.2431 10.8337C10.7629 10.8337 10.3735 10.4606 10.3735 10.0003Z"
            stroke="black"
            stroke-width="0.814796"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.3735 4.99984C10.3735 4.5396 10.7629 4.1665 11.2431 4.1665C11.7233 4.1665 12.1127 4.5396 12.1127 4.99984C12.1127 5.46007 11.7233 5.83317 11.2431 5.83317C10.7629 5.83317 10.3735 5.46007 10.3735 4.99984Z"
            stroke="black"
            stroke-width="0.814796"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <h5 className="col-md-9">{product.Name}{productNameExtension}</h5>
      <p className="mx-1 mb-2">
        <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>4.5
        <span style={{ color: "grey" }}>(203 reviews)</span>
      </p>
      <p style={{ fontSize: "14px", fontWeight: "400" }}>
        {product.Description}
      </p>
    </Fragment>
  );
}

export default ProductDetailTopDetails;
