import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ProductReviewForm from "@/components/stores/review/ProductReviewForm";
import ProductReviewList from "@/components/stores/review/ProductReviewList";
import React, { Fragment } from "react";
import { CardImg } from "react-bootstrap";
import Axios from "axios";
import { useState } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { Modal } from "antd";
import { useSelector } from "react-redux";

function ReviewProduct({ data ,product}) {
  const [reviewData, setReviewData] = useState([]);
  const [reviewAdded, setReviewAdded] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const prVarientId = useSelector((state) => state.product.proVarient);
  console.log("slugreview-product", prVarientId);

  useEffect(() => {
    Axios.post(
      apis.viewReview,
      {
        language: "",
        productSlugId: prVarientId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setReviewAdded(res.data.logined_user);
      setReviewData([res.data]);
      console.log("reviwwwwwwwwwwwww", res);
    });
  }, [onSuccess]);
  return (
    <Fragment>
      <span>
        <p
          className="mx-1 mb-2  "
          style={{ cursor: "pointer" }}
          onClick={() => setVisible(true)}
        >
          <i className="bi bi-star-fill me-1" style={{ color: "yellow" }}></i>
          {product.product_review.average_rating
            ? product.product_review.average_rating
            : "0"}
          <span className="mx-2" style={{ color: "grey" }}>
            ({product.product_review.count} reviews)
          </span>
        </p>
      </span>
      <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
        <div className="card-body p-5 ">
          <div className="row">
            {reviewAdded.length === 0 ? (
              <ProductReviewForm
                setOnSuccess={setOnSuccess}
                userImg={reviewData[0] && reviewData[0].image}
              />
            ) : (
              <></>
            )}
            <ProductReviewList
              reviewData={reviewData}
              setOnSuccess={setOnSuccess}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default ReviewProduct;
