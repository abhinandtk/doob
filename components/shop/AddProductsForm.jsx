import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
function AddProductsForm() {
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

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

    // const submitHandler = (e) => {
    //   e.preventDefault();
    //   Axios.post(apis.addProduct,{
    //     Name
    //     arabic_translator
    //     brand_id
    //     category_id
    //     sub_category_id
    //     tags


    //   });
    // };
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                  >
                    <option>No</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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
                    onChange={(e) => handleChange(e)}
                  >
                    <option>No</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
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
              <button type="button" className="submit-cart-btn">
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

export default AddProductsForm;
