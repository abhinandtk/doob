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
import MobileFooter from "@/components/shared/MobileFooter";
import StoreReviewList from "./StoreReviewList";
import StoreReviewForm from "./StoreReviewForm";
import { Modal } from "antd";
import { useTranslation } from "next-i18next";

function ReviewStore({ data }) {
  const { t } = useTranslation();
  const [reviewData, setReviewData] = useState([]);
  const [reviewAdded, setReviewAdded] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { sid } = router.query;

  useEffect(() => {
    Axios.post(
      apis.storeReviewView,
      {
        language: "",
        store_slug: sid,
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
          className="mx-1 dark-theme-color"
          style={{ cursor: "pointer" }}
          onClick={() => setVisible(true)}
        >
          <i className="bi bi-star-fill" style={{ color: "yellow" }}></i>
          {data.review_average_rating}{" "}
          <span style={{ color: "grey" }}>({data.review_count} {t("reviews")})</span>
        </p>
      </span>
      <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
        <div className="card-body p-5 ">
          <div className="row">
            {reviewAdded.length === 0 ? (
              <StoreReviewForm
                setOnSuccess={setOnSuccess}
                userImg={reviewData[0] && reviewData[0].image}
              />
            ) : (
              <></>
            )}
            <StoreReviewList
              reviewData={reviewData}
              setOnSuccess={setOnSuccess}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default ReviewStore;
