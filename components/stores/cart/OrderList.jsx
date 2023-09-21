import constants from "@/public/data/my-constants/Constants";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useDispatch } from "react-redux";
import { toggle } from "@/Redux/updateNavbar";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function OrderList({ product, setOnSuccess }) {
  console.log("rrrrrrrrrrrrrrrrrrr", product);
  const [quantity, setQuantity] = useState(parseInt(product.quantity));
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const labels = Labels();
  const dispatch = useDispatch();

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

  const handleIncreaseQty = () => {
    console.log("yyyyyyyyyyyyyyyy");
    setQuantity(quantity + 1);
    let qty = quantity;
    console.log("popop", qty);
    handleCartUpdate(product.slug_Id, quantity + 1);
  };

  const handleDecreaseQty = () => {
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
      dispatch(toggle());
      notification.success({
        message: t("Success"),
        description: `${labels["Item removed from cart successfully"]}`,
      });
      console.log("removeweeeeeeeeeeeeeee", res);
    });
  };
  // const handleIncreaseQty=()=>{
  //   console.log('ooooooooo')
  // }
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
              <div
                className={locale === "en" ? "add-left" : "add-left_ar"}
                style={{ maxWidth: "45%" }}
              >
                <h6>{locale === "en" ? product.Name : product.arabic_name}</h6>
                {product.product_stock <= 0 ? (
                  <p className="my-1" style={{ color: "red" }}>
                    {t("Out of Stock")}
                  </p>
                ) : product.product_brand_status === "Active" &&
                  product.product_category_status === "True" &&
                  product.product_status === "Active" &&
                  product.product_varient_status === "Active" ? (
                  <p className="address-card-price">
                    {product.selling_prize} KD
                  </p>
                ) : (
                  <p className="my-1" style={{ color: "red", width: "250px" }}>
                    {t("Product is currently unavailable")}
                  </p>
                )}
              </div>
            </div>
            <div className="trash">
              <div
                onClick={() => removeFromCart(product.slug_Id)}
                style={{ cursor: "pointer" }}
              >
                <span>
                  <img src="/images/store/trash.png"></img>
                </span>
              </div>
            </div>
          </div>

          {product.product_stock !== 0 ? (
            <div className="qty1 ">
              <div onClick={() => handleDecreaseQty()} className="minus ">
                -
              </div>
              <input
                type="number"
                className="count"
                name="qty1"
                value={quantity}
                disabled
              />

              <div onClick={() => handleIncreaseQty()} className="plus">
                +
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default OrderList;
