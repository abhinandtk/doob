import constants from "@/public/data/my-constants/Constants";
import React, { Fragment } from "react";

function OrderProductCard({ products }) {
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
              className="pictures"
            ></img>
            <div className="shop-content">
              <div class="shopping-card__details">
                <div class="shopping-card__title">{item.Name}</div>
                <div class="shopping-card__options">
                  <div>
                    <small class="option__key">Quantity: </small>
                    <small class="option__value">{item.count}</small>
                  </div>
                  {item.size && (
                    <div>
                      <small class="option__key">Size: </small>
                      <small class="option__value">{item.size}</small>
                    </div>
                  )}
                </div>
                <div class="shopping-card__options">
                  <div>
                    <small class="option__key">Color: </small>
                    <small class="option__value">{item.color}</small>
                  </div>
                  <div>
                    <small class="option__key">SKU: </small>
                    <small class="option__value">{item.sku}</small>
                  </div>
                </div>
                <div class="shopping-card__options">
                  <div>
                    <small class="option__key">Price: </small>
                    <small class="option__value">{item.amount} KD x {item.count}</small>
                  </div>
                  <div>
                    <small class="option__value ">{item.amount * item.count} KD</small>
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
