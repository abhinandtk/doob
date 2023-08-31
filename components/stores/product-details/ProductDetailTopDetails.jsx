import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { notification } from "antd";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReviewProduct from "../review/ReviewProduct";
import { useTranslation } from "next-i18next";
import ShareToUserChat from "@/components/homepage/social/share/ShareToUserChat";
import Login from "@/components/user/Login";

function ProductDetailTopDetails({ product, setApiSuccess }) {
  console.log("===============", product);
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;
  const [showLogin, setShowLogin] = useState(false);

  const labels = Labels();
  let productStock;
  let productNameExtension;
  const [wishlistStatus, setwishlistStatus] = useState(null);
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
      ((productNameExtension = "| " + item.values_values),
        (productStock = item.stock));
  });
  useEffect(() => {
    product.Product_Items.map((item, index) => {
      item.multivarient.length !== 0
        ? item.multivarient.map((item_, index_) => {
          if (item_.slug_id === prVarientId) {
            setwishlistStatus(item_.wishlist_status === 0 ? false : true);
          }
        })
        : setwishlistStatus(item.wishlist_status === 0 ? false : true);
    });
  }, [prVarientId]);

  const shareToPostHandler = () => {
    Axios.post(
      apis.shareProductToPost,
      {
        product_slug: prVarientId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res87", res);
      notification.success({
        message: constants.Success,
        description: `${labels["Product shared"]}`,
      });
    });
  };

  const wishlistHandler = () => {
    const api = wishlistStatus ? apis.removewishlist : apis.addwishlist;
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      Axios.post(
        api,
        {
          product_id: prVarientId,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log("weeeeresult34", res);
        setwishlistStatus(!wishlistStatus);
        // setApiSuccess((prev) => !prev);
      });
    } else {
      setShowLogin(true);
    }
  };
  const handleSend = async () => {
    try {
      await navigator.share({
        url: `${window.location.href}page/post/${prVarientId}`,
      });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Fragment>
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <span className={locale === "en" ? "float" : "float_ar"}>
        {/* <i
          className={`${
            wishlistStatus ? "bi bi-suit-heart-fill" : "bi bi-suit-heart"
          }`}
          style={{ color: wishlistStatus ? "#17A803" : "#fff" ,border:'1px solid black'}}
        ></i> */}
        <span onClick={() => wishlistHandler()} style={{ cursor: "pointer" }}>
          <svg
            width="18"
            height="17"
            className="mx-2"
            viewBox="0 0 19 18"
            fill="none"
            border="1px solid black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 18C9.5 18 0 12.3609 0 5.59388C0 -1.17312 7.38889 -1.73704 9.5 3.55748C11.6111 -1.73704 19 -1.17312 19 5.59388C19 12.3609 9.5 18 9.5 18Z"
              fill={`${wishlistStatus ? "#17A803" : "#c3bfbf"}`}
            />
          </svg>
        </span>
        <ShareToUserChat slug={prVarientId} type="product" />
        {/* <span
          onClick={() => shareToPostHandler()}
          style={{ cursor: "pointer" }}
        >
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
        </span> */}
        <span>
          <Dropdown className="" style={{ display: "inline-block" }}>
            <Dropdown.Toggle
              variant=""
              id="dropdown-basic"
              style={{
                color: "black",
                borderColor: "transparent",
                background: "transparent",
                padding: "0px",
              }}
            >
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
            </Dropdown.Toggle>

            <Dropdown.Menu align="center" className="Menu">
              <Dropdown.Item onClick={() => handleSend()}>
                {t("Send")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </span>
      <h5 className="col-md-9 headings ">
        {locale === "en" ? product.Name : product.arabic_translator}
        {productNameExtension}
      </h5>
      <ReviewProduct product={product} />

      <p style={{ fontSize: "14px", fontWeight: "400" }}>
        {locale === "en" ? product.Description : product.arabic_description}
      </p>
    </Fragment>
  );
}

export default ProductDetailTopDetails;
