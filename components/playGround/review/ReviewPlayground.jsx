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
import { Modal } from "antd";
import PlayGroundReviewList from "./PlayGroundReviewList";
import PlayGroundReviewForm from "./PlayGroundReviewForm";
function ReviewPlayground({ setVisible }) {
  const [reviewData, setReviewData] = useState([]);
  const [reviewAdded, setReviewAdded] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);
  // const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { pgid } = router.query;
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    Axios.post(
      apis.stadiumReviewView,
      {
        slug_id: pgid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setReviewAdded(res.data.data.logged_user);
      setReviewData([res.data.data]);
      console.log("reviwwwwwwwwwwwww", res);
    });
  }, [onSuccess]);
  return (
    <Fragment>
      <div className="review-md">
        <Modal open={true} onCancel={handleCancel} footer={null}>
          {/* <section className="h-100 h-custom"> */}
          {/* <div className="store-container  my-4"> */}
          {/* <div className="row d-flex justify-content-center align-items-center h-100  ">
              <h5>Reviews</h5> */}
          {/* <div className=" "> */}
          {/* <div className="review card "> */}
          <div className="card-body p-5 ">
            <div className="row">
              {reviewAdded.length === 0 ? (
                <PlayGroundReviewForm
                  setOnSuccess={setOnSuccess}
                  userImg={reviewData[0] && reviewData[0].current_user_image}
                />
              ) : (
                <></>
              )}
              <PlayGroundReviewList
                reviewData={reviewData}
                setOnSuccess={setOnSuccess}
              />
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </section> */}
        </Modal>
      </div>
    </Fragment>
  );
}

export default ReviewPlayground;
