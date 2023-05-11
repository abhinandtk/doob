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
  setProPrimaryVarient,
  setProSecondaryVarientId,
} from "@/Redux/productDetail";
import { useEffect } from "react";
function ProductDetailFullWidth({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const prVarientId = useSelector((state) => state.product.proVarient);

  console.log("detaillllllllllspag14", prVarientId);
  console.log("detaillllllllllspag14", product);
  useEffect(() => {
    product && product.Product_Items && product.Product_Items.map((item, index) => {
      item.multivarient.length !== 0
        ? item.multivarient.map((item_, index_) => {
            if (item_.slug_id === prVarientId) {
              dispatch(setProPrimaryVarient(item.varent_id));
              dispatch(setProSecondaryVarientId(item_.slug_id));
              // setSuccess(true);
            }
          })
        : dispatch(setProPrimaryVarientId(item.varent_id));
    });
  }, []);

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

  const addToCartHandler = (slug) => {
    console.log("erer", slug);
    Axios.post(
      apis.addtoCart,
      {
        product_var_slug: slug,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res", res);
    });
  };
  return (
    <Fragment>
      {product.map((product, index) => {
        return (
          <>
            <ProductDetailImages />
            <div className="col-md-5 ">
              <div className=" justify-content-between align-items-center ">
                <ProductDetailTopDetails product={product} />
                <ModuleVariants product={product} />
                <ModuleSecondVariants product={product} />
                <br></br>
                <p style={{ color: "gray", fontWeight: "400" }}>
                  <s>15.000 KD</s>
                  <span
                    className="mx-2"
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#17a803",
                    }}
                  >
                    13.000 KD
                  </span>
                  <span></span>
                </p>
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
                  onClick={() =>
                    addToCartHandler(
                      product.Product_Items[0].multivarient[0].slug_id
                    )
                  }
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
