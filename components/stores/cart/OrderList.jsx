import constants from "@/public/data/my-constants/Constants";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
function OrderList({ product, setOnSuccess }) {
  console.log("rrrrrrrrrrrrrrrrrrr", product.quantity);
  const [quantity, setQuantity] = useState(parseInt(product.quantity));

  const handleCartUpdate = (slug, qty) => {
    console.log("ututututuutututu", slug, qty);
    Axios.post(
      apis.updateCart,
      {
        productSlugVarient: slug,
        quantity: qty,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      console.log("ututututuutututu", res);
    });
  };

  const handleIncreaseQty = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
    let qty = quantity;
    console.log("popop", qty);
    handleCartUpdate(product.slug_Id, quantity + 1);
  };

  const handleDecreaseQty = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      handleCartUpdate(product.slug_Id, quantity - 1);
    }
  };

  const removeFromCart = (slug) => {
    Axios.post(
      apis.removeCart,
      {
        productSlugVarient: slug,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      console.log("removeweeeeeeeeeeeeeee", res);
    });
  };
  return (
    <Fragment>
      <div className="card mb-2 ">
        <div className="card-body">
          <div className="d-flex justify-content-between ">
            <div className="d-flex flex-row align-items-center ">
              <div>
                <img
                  src={`${constants.port}${product.Thumbnail_image}`}
                  className="pixels-png"
                ></img>
              </div>
              <div className=" add-left">
                <h6>{product.Name}</h6>
                <p className="address-card-price">{product.selling_prize} KD</p>
              </div>
            </div>
            <div className="trash">
              <div
                onClick={() => removeFromCart(product.slug_Id)}
                style={{ cursor: "pointer" }}
              >
                <span>
                  <img src="../images/store/trash.png"></img>
                </span>
              </div>
            </div>
          </div>
          <div className="qty1">
            <div onClick={(e) => handleIncreaseQty(e)} className="plus ">
              +
            </div>
            <input
              type="number"
              className="count"
              name="qty1"
              value={quantity}
              disabled
            />
            <div onClick={(e) => handleDecreaseQty(e)} className="minus ">
              -
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OrderList;
