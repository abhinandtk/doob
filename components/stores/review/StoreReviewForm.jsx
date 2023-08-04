import { Rate, message } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
function StoreReviewForm({ setOnSuccess, userImg }) {
  const { t } = useTranslation();
  console.log("rwd", userImg);
  const router = useRouter();
  const { sid } = router.query;

  const [count, setCount] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    description: "",
    image: "",
  });

  const handleStarChange = (value) => {
    setCount(value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const newForm = { ...reviewForm };
    if (e.target.id === "image") {
      newForm[e.target.id] = e.target.files[0];
    } else {
      newForm[e.target.id] = e.target.value;
    }
    setReviewForm({ ...newForm });
  };

  const handleStoreReview = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("store_slug", sid);
    formdata.append("description", reviewForm.description);
    formdata.append("title", "");
    formdata.append("rating", count);
    formdata.append("language", "english");
    formdata.append("image", reviewForm.image);
    Axios.post(apis.addStoreReview, formdata, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("result74", res);
      setOnSuccess((prev) => !prev);
      message.success("Review Added");
    });
  };
  return (
    <div className="col-lg-12">
      <h5 className="mb-3">
        <a href="#!" className="text-body">
          {userImg ? (
            <img
              src={`${constants.port}${userImg}`}
              style={{
                width: "44px",
                height: "44px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            ></img>
          ) : (
            <img
              src="/images/accounts/user_default.png"
              style={{
                width: "44px",
                height: "44px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            ></img>
          )}
          <span className="mx-2">
            <Rate onChange={handleStarChange} />
          </span>
        </a>
      </h5>

      <form onSubmit={(e) => handleStoreReview(e)}>
        <div className="form-group">
          <textarea
            className="form-control op p-4  "
            style={{
              backgroundColor: "#EEEEEE",
              border: "0px",
            }}
            placeholder="Share your Review "
            id="description"
            rows="3"
            onChange={(e) => handleChange(e)}
          ></textarea>
          <br></br>
          <input
            type="file"
            className="form-control op p-3 "
            style={{
              backgroundColor: "#EEEEEE",
              border: "0px",
            }}
            id="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit" className="submits-cart-btn ">
          {t("Submit")}
        </button>
      </form>
    </div>
  );
}

export default StoreReviewForm;
