import React from "react";
import Axios from "axios";
import { useState } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";
import { useTranslation } from "next-i18next";
function CategoriesForm({ categorySubmitHandler, editData }) {
  const router = useRouter();
  const { t } = useTranslation();
  console.log("cattttttttttttttttttttttsada", editData);
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nameArabic: "",
    parentCat: "",
    display: "",
  });

  const handleCategoryChange = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };

  useEffect(() => {
    Axios.get(apis.categoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCategoryList(res.data.data.categories);
    });

    if (editData) {
      setFormData({
        name: editData.title,
        nameArabic: editData.title_arabic,
        parentCat: editData.parent_id,
        display: editData.display_order,
      });
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    categorySubmitHandler(formData);
  };

  return (
    <div className="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          {editData ? t("Edit Categories") : t("Add Categories")}
        </h6>
        <div className="my-4 mx-4 ">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">{t("Category Name")}</label>
              <input
                type="text"
                className="ad-input-form form-control p-2"
                id="name"
                value={formData.name}
                onChange={(e) => handleCategoryChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">
                {t("Category Name in Arabic")}
              </label>
              <input
                type="text"
                className="ad-input-form form-control p-2"
                id="nameArabic"
                value={formData.nameArabic}
                onChange={(e) => handleCategoryChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">
                {t("Parent Category")}
              </label>
              <select
                className="ad-input-form form-control   "
                id="parentCat"
                onChange={(e) => handleCategoryChange(e)}
              >
                <option value="">select</option>
                {categoryList.map((item, index) => (
                  <option
                    key={index}
                    selected={editData != null && formData.parentCat == item.id}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">{t("Display Order")}</label>
              <input
                type="text"
                className="ad-input-form form-control p-2"
                id="display"
                value={formData.display}
                onChange={(e) => handleCategoryChange(e)}
              />
            </div>
            <div className="product-submit my-3">
              <button type="submit" className="submit-cart-btn">
                {t("Submit")}
              </button>
              <button
                onClick={() => router.back()}
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

export default CategoriesForm;
