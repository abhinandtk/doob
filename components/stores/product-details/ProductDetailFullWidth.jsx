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
import { Labels } from "@/public/data/my-constants/Labels";
import { toggle } from "@/Redux/updateNavbar";
import { useTranslation } from "next-i18next";
import Login from "@/components/user/Login";

function ProductDetailFullWidth({ product, setApiSuccess }) {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const labels = Labels();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const prVarientId = useSelector((state) => state.product.proVarient);
  const proPrimaryVarientId = useSelector(
    (state) => state.product.proPrimaryVarientId
  );

  console.log("det32 prvarId first", prVarientId);
  console.log("sdcsdcsdcsdc", product);
  let priceView;
  let productStock;
  let varientStatus;
  useEffect(() => {
    product &&
      Array.isArray(product) &&
      product[0] &&
      product[0].Product_Items &&
      product[0].Product_Items.map((item, index) => {
        item.multivarient.length !== 0
          ? item.multivarient.map((item_, index_) => {
              console.log("det32 secondvarId", prVarientId);
              if (item_.slug_id === prVarientId) {
                productStock = item_.stock;
                (varientStatus = item_.status),
                  (priceView = (
                    <p
                      className="price"
                      style={{
                        color: "gray",
                        fontWeight: "400",
                        float: locale === "ar" && "left",
                      }}
                    >
                      <s style={{ float: locale === "ar" && "left" }}>
                        {item_.cut_prize} KD
                      </s>
                      <span
                        className="mx-2"
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          color: "#17a803",
                        }}
                      >
                        {item_.actual_prize} KD
                      </span>
                      <span></span>
                    </p>
                  ));

                dispatch(setProPrimaryVarientId(item.varent_id));
                dispatch(setProSecondaryVarientId(item_.slug_id));
                // setSuccess(true);
              }
            })
          : dispatch(setProPrimaryVarientId(item.varent_id));
        console.log(
          "det32 item.varent_idsingle",
          item,
          item.varent_id,
          "var==id",
          prVarientId
        ),
          item.slug_id === prVarientId &&
            ((productStock = item.stock),
            (varientStatus = item.status),
            (priceView = (
              <p style={{ color: "gray", fontWeight: "400" }}>
                <s>{item.cut_prize} KD</s>
                <span
                  className="mx-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#17a803",
                  }}
                >
                  {item.actual_prize} KD
                </span>
                <span></span>
              </p>
            )));
      });
  }, []);
  console.log("det32 firstloading,,", proPrimaryVarientId);

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
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
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
        console.log("storreCountries", res);
        dispatch(toggle());
        if (res.data.status == 1) {
          notification.success({
            message: "Success",
            description: `${labels["Added to cart"]}`,
          });
        } else {
          notification.error({
            message: constants.Error,
            description:
              locale === "en" ? res.data.message_en : res.data.message_ar,
          });
        }
        //  if(res.data.status == 1){

        //   notification.success({
        //     message:'Success',
        //     description:`${labels['Added to cart']}`
        //   }),

        //  }
        // notification.success({
        //   message:'Success',
        //   description:`${labels['Added to cart']}`
        // }),
        console.log("res", res);
      });
    } else {
      setShowLogin(true);
    }
  };
  return (
    <Fragment>
      {showLogin && <Login setShowLogin={setShowLogin} />}

      {product.map((product, index) => {
        return (
          <>
            <ProductDetailImages product={product} />
            <div className="col-md-5 shop-cart ">
              <div className=" justify-content-between align-items-center ">
                <ProductDetailTopDetails
                  product={product}
                  setApiSuccess={setApiSuccess}
                />
                <ModuleVariants product={product} />
                <ModuleSecondVariants product={product} />
                <br></br>

                {productStock <= 0 ? (
                  <p className="my-1" style={{ color: "red" }}>
                    Out of stock
                  </p>
                ) : product.Product_Brand.status === "Active" &&
                  product.Product_Category.status == true &&
                  product.status === "Active" 
                  // varientStatus === "Active" 
                  ? (
                  <div>
                    {priceView}
                    <div   className={locale==='ar'?"qty_ar":"qty"}>            
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
                      {t("Add to Cart")}
                    </Button>
                  </div>
                ) : (
                  <p className="my-1" style={{ color: "red" }}>
                    Currently Unavailable
                  </p>
                )}
              </div>
            </div>
          </>
        );
      })}
    </Fragment>
  );
}

export default ProductDetailFullWidth;
