import { Rate, message } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function ProductReviewForm({ setOnSuccess, userImg }) {
  console.log("rwd", userImg);
  const router = useRouter();
  const { rid } = router.query;
  const [count, setCount] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    description: "",
    image: "",
  });
  const prVarientId = useSelector((state) => state.product.proVarient);
  console.log("slugreview-form", prVarientId);



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

  const handleProductReview = (e) => {
    e.preventDefault();
    console.log("d", reviewForm);
    let formdata = new FormData();
    formdata.append("language", "");
    formdata.append("rating", count);
    formdata.append("title", "");
    formdata.append("description", reviewForm.description);
    formdata.append("productSlugId", prVarientId);
    formdata.append("image", reviewForm.image);
    Axios.post(apis.addReview, formdata, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("result74", res);

      setCount(0);
      setReviewForm({
        description: "",
        image: "",
      });
      setOnSuccess((prev) => !prev);
      message.success("Review Added");
    });
  };
  return (
    <div className="col-lg-12">
      <h5 className="mb-3">
        <a href="#" className="text-body">
          <img
            src={
              userImg
                ? `${constants.port}${userImg}`
                : "/images/accounts/user_default.png"
            }
            style={{
              width: "44px",
              height: "44px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          ></img>
          <span className="mx-2">
            <Rate onChange={handleStarChange} />
          </span>
        </a>
      </h5>

      <form onSubmit={(e) => handleProductReview(e)}>
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductReviewForm;
