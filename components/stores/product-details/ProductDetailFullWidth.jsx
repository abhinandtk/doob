import React from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ModuleVariants from "./ModuleVariants";
import ModuleSecondVariants from "./ModuleSecondVariants";
import { Fragment } from "react";
import ProductDetailImages from "./ProductDetailImages";
import ProductDetailTopDetails from "./ProductDetailTopDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  setProPrimaryVarientId,
  setProSecondaryVarientId,
} from "@/Redux/productDetail";
import { useEffect } from "react";
import { notification } from "antd";
function ProductDetailFullWidth({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const prVarientId = useSelector((state) => state.product.proVarient);
  const proPrimaryVarientId = useSelector(
    (state) => state.product.proPrimaryVarientId
  );

  console.log("detaillllllllllspag14", prVarientId);
  console.log("sdcsdcsdcsdc", product);
  let priceView;
  // useEffect(() => {
  product &&
    Array.isArray(product) &&
    product[0] &&
    product[0].Product_Items &&
    product[0].Product_Items.map((item, index) => {
      item.multivarient.length !== 0
        ? item.multivarient.map((item_, index_) => {
            if (item_.slug_id === prVarientId) {
              priceView = (
                <p className="price" style={{ color: "gray", fontWeight: "400" }}>
                  <s>{item_.cut_prize}</s>
                  <span
                    className="mx-2"
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#17a803",
                    }}
                  >
                    {item_.actual_prize}
                  </span>
                  <span></span>
                </p>
              );
              dispatch(setProPrimaryVarientId(item.varent_id));
              dispatch(setProSecondaryVarientId(item_.slug_id));
              // setSuccess(true);
            }
          })
        : dispatch(setProPrimaryVarientId(item.varent_id));
      item.slug_id === prVarientId &&
        (priceView = (
          <p style={{ color: "gray", fontWeight: "400" }}>
            <s>{item.cut_prize}</s>
            <span
              className="mx-2"
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#17a803",
              }}
            >
              {item.actual_prize}
            </span>
            <span></span>
          </p>
        ));
    });
  // }, []);
  console.log("firstloading,,", proPrimaryVarientId);

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQty = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };
  const handleDecreaseQty = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    Axios.post(
      apis.addtoCart,
      {
        product_var_slug: prVarientId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      notification.success({
        message:'Success',
        description:'Item added to cart'
      }),
      console.log("res", res);
    });
  };
  return (
    <Fragment>
      {product.map((product, index) => {
        return (
          <>
            <ProductDetailImages product={product}/>
            <div className="col-md-5 shop-cart ">
              <div className=" justify-content-between align-items-center ">
                <ProductDetailTopDetails product={product} />
                <ModuleVariants product={product} />
                <ModuleSecondVariants product={product} />
                <br></br>
                
                
                {priceView}
                <div className="qty">
                  <div
                    onClick={(e) => handleDecreaseQty(e)}
                    className="minus "
                    style={{ backgroundColor: "#959595" }}
                  >
                    _
                  </div>
                  <input
                    type="number"
                    className="count"
                    name="qty"
                    value={quantity}
                    disabled
                  />
                  <div
                    onClick={(e) => handleIncreaseQty(e)}
                    className="plus"
                    style={{ backgroundColor: "#959595" }}
                  >
                    +
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={(e) => addToCartHandler(e)}
                  className="add-cart-btn "
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </>
        );
      })}
    </Fragment>
  );
}

export default ProductDetailFullWidth;
