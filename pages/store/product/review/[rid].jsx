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
function ReviewPage() {
  const [reviewData, setReviewData] = useState([]);
  const [reviewAdded, setReviewAdded] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  const router =useRouter()
  const {rid} = router.query
  useEffect(() => {
    Axios.post(
      apis.viewReview,
      {
        language: "",
        productSlugId: rid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setReviewAdded(res.data.logined_user);
      setReviewData([res.data]);
      console.log("reviwwwwwwwwwwwww", res.data.other_user);
    });
  }, [onSuccess]);
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <section className="h-100 h-custom">
        <div className="store-container  my-4">
          <div className="row d-flex justify-content-center align-items-center h-100  ">
            <h5>Reviews</h5>
            <div className="col ">
              <div className="review card ">
                <div className="card-body p-5 ">
                  <div className="row">
                    {reviewAdded.length === 0 ? <ProductReviewForm setOnSuccess={setOnSuccess}/> : <></>}
                    <ProductReviewList reviewData={reviewData} setOnSuccess={setOnSuccess}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default ReviewPage;
