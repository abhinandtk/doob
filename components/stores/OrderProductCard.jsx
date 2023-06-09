import constants from "@/public/data/my-constants/Constants";
import React, { Fragment } from "react";

function OrderProductCard({ products }) {
  console.log('resw',products)
  return (
    <Fragment>
      {products.map((item, index) => (
        <div
        key={index}
          className=" mt-2  mx-auto d-flex justify-content-between align-items-center"
          style={{ width: "90%" }}
        >
          <div class="item1_clearfix">
            <img
              src={`${constants.port}${item.Thumbnail_image}`}
              alt='Doob'
              className="pictures"
            ></img>
            <div className="shop-content">
              <div class="shopping-card__details">
                <div class="shopping-card__title">{item.product_name}</div>
                <div class="shopping-card__options">
                  <div>
                    <small class="option__key">Quantity: </small>
                    <small class="option__value">{item.product_quantity}</small>
                  </div>
                  {item.product_multivarient_name && (
                    <div>
                      <small class="option__key">Size: </small>
                      <small class="option__value">{item.product_multivarient_name}</small>
                    </div>
                  )}
                </div>
                <div class="shopping-card__options">
                  <div >
                    <small class="option__key_color">Color: </small>
                    <small class="option__value_colors">{item.product_varinet_name}</small>
                  </div>
                  <div className="value-down" >
                    <small class="option__key1">SKU: </small>
                    <small class="option__value1">{item.product_sku}</small>
                  </div>
                </div>
                <div class="shopping-card__options">
                  <div>
                    <small class="option__key_price">Price: </small>
                    <small class="option__value_prices">{item.product_selling_price} KD x {item.count}</small>
                  </div>
                  <div>
                    <small class="option__value ">{item.product_selling_price * item.count} KD</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default OrderProductCard;
