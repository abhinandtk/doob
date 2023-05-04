import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { notification } from "antd";
function ProductsForm({ handleProductAdd, editData }) {
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    nameArabic: "",
    brand: "",
    category: "",
    subCategory: "",
    tag: [],
    primary: "",
    secondary: "",
    description: "",
    description_ar: "",
    variants: [
      {
        sku: "",
        quantity: "",
        formFile: "",
        color: "",
        size: "",
        actualPrize: "",
        sellingPrice: "",
      },
    ],
  });
  useEffect(() => {
    Axios.get(apis.categoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCategoryData(res.data.data.categories);
      setBrandData(res.data.data.brand);
      setVariantData(res.data.data.variant_types);
    });

    if (editData) {
      setFormData({
        name: editData.name,
        nameArabic: editData.name_ar,
        brand: "",
        category: "",
        subCategory: "",
        tag: [],
        primary: "",
        secondary: "",
        description: "",
        description_ar: "",
        variants: [
          {
            sku: "",
            quantity: "",
            formFile: "",
            color: "",
            size: "",
            actualPrize: "",
            sellingPrice: "",
          },
        ],
      });
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id === "category") {
      setSubCategory([]);
      const catId = e.target.value;
      const subData = categoryData.find((item) => item.id == catId);
      if (subData && subData.subcategories) {
        setSubCategory(subData.subcategories);
        console.log("jjjjjjjjjjjjjjj");
      }
    }
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
    console.log("oooooooooooooorrrrr", formData);
  };
  const handleVariantChange = (e, index) => {
    e.preventDefault();
    setFormData((prev) => {
      const variants = [...prev.variants];
      variants[index][e.target.id] = e.target.value;
      return { ...prev, variants };
    });
    console.log("trrrrrrrrrrrrrrrrrruiououo8745884", formData);
  };

  const addVariantFields = () => {
    const newVariants = {
      sku: "",
      quantity: "",
      formFile: "",
      color: "",
      size: "",
      actualPrize: "",
      sellingPrice: "",
    };
    setFormData({
      ...formData,
      variants: [...formData.variants, newVariants],
    });
  };

  const removeVariantField = (index) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({
      ...formData,
      variants: [newVariants],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleProductAdd(formData);
  };

  return (
    <div class="content-topic  ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Add Products
        </h6>

        <div className="my-4 mx-4 ">
          <h6 style={{ fontSize: "14px", fontWeight: "700" }}>Basic Details</h6>
          <form onSubmit={(e) => submitHandler(e)}>
            <div class="form-group my-2 ">
              <label for="exampleFormControlInput1">Name</label>
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
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div class="form-group my-2">
              <label for="exampleFormControlInput1">Name in Arabic</label>
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
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Brand</label>
              <select
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="brand"
                value={formData.brand}
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Selelct--</option>
                {brandData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.brand}
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Category</label>
              <select
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="category"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Selelct--</option>
                {categoryData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Sub Category</label>
              <select
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="subCategory"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Select--</option>
                {subCategory.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group my-2">
              <label for="exampleFormControlInput1">Tag</label>
              <input
                type="text"
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="tag"
                value={formData.tag}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Primary Variant</label>
              <select
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="primary"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Select--</option>
                {variantData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.Varient_Name}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group my-2">
              <label for="exampleFormControlSelect1">Secondary Variant</label>
              <select
                class="form-control p-2"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="secondary"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Select--</option>
                {variantData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.Varient_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group my-2 ">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                class="form-control"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="description"
                rows="3"
                value={formData.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="form-group my-2 ">
              <label for="exampleFormControlTextarea1">
                Description in Arabic
              </label>
              <textarea
                class="form-control"
                style={{
                  border: "0px",
                  background: "#eeeeee",
                  color: "grey",
                }}
                id="description_ar"
                rows="3"
                value={formData.description_ar}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="clearfix ">
              <p className="order-code2" style={{ fontWeight: "500" }}>
                Variants
              </p>
              <Button
                onClick={addVariantFields}
                type="button"
                className="Add-btn"
              >
                Add
              </Button>
            </div>
            {formData.variants.map((item, index) => (
              <div key={index}>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">SKU</label>
                  <input
                    type="text"
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="sku"
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">Quantity</label>
                  <input
                    type="text"
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="quantity"
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1" id="formfile">
                    Image
                  </label>
                  <input
                    type="file"
                    id="formFile"
                    class="form-control p-2 grey"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    placeholder="No file choosen"
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                <div class="form-group my-2">
                  <label for="exampleFormControlSelect1">Color</label>
                  <select
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="color"
                    onChange={(e) => handleVariantChange(e, index)}
                  >
                    <option>No</option>
                    
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div class="form-group my-2">
                  <label for="exampleFormControlSelect1">Size</label>
                  <select
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="size"
                    onChange={(e) => handleVariantChange(e, index)}
                  >
                    <option>No</option>
              
                    <option value="7">7</option>
                    <option value="7">8</option>
                  </select>
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    Actual Price in KD
                  </label>
                  <input
                    type="text"
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="actualPrize"
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    Selling Price in KD
                  </label>
                  <input
                    type="text"
                    class="form-control p-2"
                    style={{ border: "0px", background: "#eeeeee" }}
                    id="sellingPrice"
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                {index > 0 && (
                  <h6
                    onClick={() => removeVariantField(index)}
                    className="product-submit "
                  >
                    Remove
                  </h6>
                )}
                <br></br>
                <hr style={{ fontSize: "24px" }}></hr>
              </div>
            ))}
            <h6 className="product-submit ">Duplicate</h6>

            <div className="product-submit my-3">
              <button type="submit" className="submit-cart-btn">
                Submit
              </button>
              <button type="button" className="sub-cart-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductsForm;
