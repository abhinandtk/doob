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
function BannerForm({ bannerSubmitHandler, editData }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { bannerId } = router.query;
  const [selectedItems, setSelectedItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    bannerUrl: "",
    display: "",
    image: "",
    appImage: "",
    type: "",
  });

  const handleBannerChange = (e) => {
    e.preventDefault();
    const newForm = { ...formData };
    if (e.target.id === "image" || e.target.id === "appImage") {
      const formdata = new FormData();
      formdata.append("file_field_name", e.target.files[0]);
      Axios.post(apis.allImagesUpload, formdata, {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }).then((res) => {
        newForm[e.target.id] = res.data.image_url;
        setFormData({ ...newForm });
      });
    } else {
      newForm[e.target.id] = e.target.value;
      setFormData({ ...newForm });
    }
  };
  console.log("selectedItems", selectedItems);

  useEffect(() => {
    if (editData === "true") {
      Axios.post(
        apis.getbyIdBanner,
        {
          slug: bannerId,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log(";resultgrt", res, res.data.data.Banner_name);
        setFormData({
          name: res.data.data.Banner_name,
          bannerUrl: res.data.data.Banner_URL,
          display: res.data.data.Banner_Display_Order,
          image: res.data.data.Banner_image,
          appImage: res.data.data.App_Banner_image,
          type: res.data.data.type,
        });
      });
    }
  }, [bannerId]);
  const submitHandler = (e) => {
    e.preventDefault();
    bannerSubmitHandler(formData);
  };

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          {editData === "true" ? t("Edit Banners") : t("Add Banners")}
        </h6>
        <div className="my-4 mx-4 ">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">{t("Banner Name")}*</label>
              <input
                required
                type="text"
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="name"
                value={formData.name}
                onChange={(e) => handleBannerChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">{t("Banner url")}*</label>
              <input
                required
                type="text"
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="bannerUrl"
                value={formData.bannerUrl}
                onChange={(e) => handleBannerChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">
                {t("Display Order")}*
              </label>
              <input
                required
                type="number"
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="display"
                value={formData.display}
                onChange={(e) => handleBannerChange(e)}
              />
            </div>
            <div className="form-group  my-2">
              <label for="exampleFormControlInput1" id="image">
                {t("Banner Web Image")}*{" "}
                <span style={{ color: "red", fontSize: "11px" }}>
                  (Please upload an image with dimensions 800x400)
                </span>
              </label>
              <input
                required={editData !== "true"}
                type="file"
                id="image"
                className="form-control  p-2 "
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                placeholder="No file choosen"
                onChange={(e) => handleBannerChange(e)}
              />
            </div>
            {/* <div className="form-group  my-2">
              <label for="exampleFormControlInput1" id="image">
                Banner App Image
              </label>
              <input
                type="file"
                id="appImage"
                className="form-control  p-2 "
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                placeholder="No file choosen"
                onChange={(e) => handleBannerChange(e)}
              />
            </div> */}
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">{t("Banner Type")}</label>
              <select
                className="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="type"
                value={formData.type}
                onChange={(e) => handleBannerChange(e)}
              >
                <option value="">--Select--</option>
                <option value="card_mid">Card Mid</option>
              </select>
            </div>
            <div className="product-submit my-3">
              <button type="submit" className="submit-cart-btn">
                {t("Submit")}
              </button>
              <button
                onClick={() => router.push("/shop/banner-management")}
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

export default BannerForm;
