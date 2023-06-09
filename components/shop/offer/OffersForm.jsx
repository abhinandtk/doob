import React from "react";
import Axios from "axios";
import { useState } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";
import { Select } from "antd";
const { Option } = Select;

function OffersForm({ OfferSubmitHandler, editData }) {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    nameArabic: "",
  });

  const handleSelectChange = (selectedValues) => {
    setSelectedItems(selectedValues);
  };

  const handleOfferChange = (e) => {
    e.preventDefault();
    const newForm = { ...formData };
    newForm[e.target.id] = e.target.value;
    setFormData({ ...newForm });
  };
  console.log("selectedItems", selectedItems);

  useEffect((res) => {
    Axios.get(apis.listingVarients, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setProductsList(res.data.data);
      console.log("resy", res);
    });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    OfferSubmitHandler(formData,selectedItems);
  };

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Add Offers
        </h6>
        <div className="my-4 mx-4 ">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">Offer Name</label>
              <input
                type="text"
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="name"
                value={formData.name}
                onChange={(e) => handleOfferChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">Offer Name in Arabic</label>
              <input
                type="text"
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="nameArabic"
                value={formData.nameArabic}
                onChange={(e) => handleOfferChange(e)}
              />
            </div>
            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Offer Products</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select items"
                value={selectedItems}
                onChange={handleSelectChange}
              >
                {productsList &&
                  productsList.map((item, index) => (
                    <Option key={index} value={item.product_id}>
                      {item.variant_name}&nbsp;{item.variant_name}&nbsp;
                      {item.multivarient}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="product-submit my-3">
              <button type="submit" className="submit-cart-btn">
                Submit
              </button>
              <button
                onClick={() => router.back()}
                type="button"
                className="sub-cart-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OffersForm;
