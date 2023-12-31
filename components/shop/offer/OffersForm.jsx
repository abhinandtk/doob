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
import { useTranslation } from "next-i18next";
function OffersForm({ OfferSubmitHandler, editData }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { slugId } = router.query;
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

  useEffect(() => {
    Axios.get(apis.listingVarients, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setProductsList(res.data.data);
      console.log("resy", res);
    });
  }, []);

  useEffect(() => {
    if (editData === "true") {
      Axios.post(
        apis.offers_view_get,
        {
          slug_offer: slugId,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log(";resultgrt", res);
        setFormData({
          name: res.data.data[0].offer_name,
          nameArabic: res.data.data[0].arabic_translator,
        });
        setSelectedItems(
          res.data.data[0].product_varient.map((item) => item.id)
        );
      });
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    OfferSubmitHandler(formData, selectedItems);
  };

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          {editData === "true" ? t("Edit Offers") : t("Add Offers")}
        </h6>
        <div className="my-4 mx-4 ">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">{t("Offer Name")}*</label>
              <input
                required
                type="text"
                class="form-control input-theme-prod p-2"
                style={{
                  border: "0px",
                  
                  color: "grey",
                }}
                id="name"
                value={formData.name}
                onChange={(e) => handleOfferChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">
                {t("Offer Name in Arabic")}*
              </label>
              <input
                required
                type="text"
                class="form-control input-theme-prod p-2"
                style={{
                  border: "0px",
                  
                  color: "grey",
                }}
                id="nameArabic"
                value={formData.nameArabic}
                onChange={(e) => handleOfferChange(e)}
              />
            </div>
            <div class="form-group  my-2">
              <label for="exampleFormControlSelect1">
                {t("Offer Products")}*
              </label>
              <Select
                required
                mode="multiple"
                style={{ width: "100%"}}
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
                {t("Submit")}
              </button>
              <button
                onClick={() => router.push("/shop/offer-management")}
                type="button"
                className="sub-cart-btn"
              >
                {t("Cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OffersForm;
