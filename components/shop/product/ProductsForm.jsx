import React, { useEffect } from "react";
import { useState } from "react";
// import { Button } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { notification } from "antd";
import { Upload, Button, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
function ProductsForm({ handleProductAdd, editData }) {
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [primaryValues, setPrimaryValues] = useState([]);
  const [secondaryValues, setSecondaryValues] = useState([]);

  const [image, setImage] = useState(null);
  const router = useRouter();
  console.log("editdata", router.query);
  const id = router.query.id;
  const [formData, setFormData] = useState({
    name: "",
    nameArabic: "",
    brand: "",
    category: "",
    subCategory: "",
    tag: [],
    primary: "",
    thumbnail: "",
    secondary: "",
    description: "",
    description_ar: "",
    status: "",
    variants: [
      {
        sku: "",
        quantity: "",
        formFile: [],
        color: "",
        size: "",
        actualPrize: "",
        sellingPrice: "",
        slug: "",
      },
    ],
  });

  const handleImageChange = (e, variantIndex) => {
    const files = e.target.files[0]; // Get selected files
    const formdata = new FormData();
    formdata.append("file_field_name", files);
    console.log("inputcorrect", e.target.files);

    Axios.post(apis.allImagesUpload, formdata, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("res434", res);
      const updatedVariants = [...formData.variants];
      updatedVariants[variantIndex].formFile = [
        ...updatedVariants[variantIndex].formFile,
        res.data.image_url,
      ];

      setFormData((prevState) => ({
        ...prevState,
        variants: updatedVariants,
      }));
    });

    console.log("iop", formData);
  };

  const removeImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...formData.variants]; // Create a copy of variants array
    updatedVariants[variantIndex].formFile.splice(imageIndex, 1); // Remove the specified image from the images array

    setFormData({ ...formData, variants: updatedVariants }); // Update the formData state
  };

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

    if (editData === "true") {
      Axios.post(
        apis.getByidProduct,
        {
          product_id: id,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log("uuouoououououououo", res);
        if (res.data.status == 1) {
          const variants = res.data.data[0].variants.map((variant) => ({
            sku: variant.sku_code,
            quantity: variant.quantity,
            formFile: variant.images.map((image) => image.image),
            color: variant.primary_variant_value_id,
            size: variant.secondary_variant_value_id,
            actualPrize: variant.actual_price,
            sellingPrice: variant.selling_price,
            slug: variant.slug_id,
            varStatus: variant.product_varient_status,
          }));

          setFormData({
            name: res.data.data[0].name,
            nameArabic: res.data.data[0].name_ar,
            brand: res.data.data[0].brand_id,
            category: res.data.data[0].category_id,
            subCategory: res.data.data[0].subcategory_id,
            thumbnail: res.data.data[0].thumbnail_image,
            tag: res.data.data[0].tags,
            primary: res.data.data[0].primary_variant_id,
            secondary: res.data.data[0].secondary_variant_id,
            description: res.data.data[0].description,
            description_ar: res.data.data[0].description_ar,
            status: res.data.data[0].product_status,
            variants: variants,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (editData === "true" && formData.category) {
      const subData = categoryData.find((item) => item.id == formData.category);
      if (subData && subData.subcategories) {
        setSubCategory(subData.subcategories);
      }
    }
    if (editData === "true" && formData.primary) {
      const primaryData = variantData.find((pid) => pid.id == formData.primary);
      if (primaryData && primaryData.variant_value) {
        setPrimaryValues(primaryData.variant_value);
      }
    }
    if (editData === "true" && formData.secondary) {
      const secondaryData = variantData.find(
        (pid) => pid.id == formData.secondary
      );
      if (secondaryData && secondaryData.variant_value) {
        setSecondaryValues(secondaryData.variant_value);
      }
    }
  }, [
    editData,
    formData.category,
    categoryData,
    formData.primary,
    formData.secondary,
    variantData,
  ]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "category") {
      setSubCategory([]);
      const catId = e.target.value;
      const subData = categoryData.find((item) => item.id == catId);
      if (subData && subData.subcategories) {
        setSubCategory(subData.subcategories);
      }
    }

    if (e.target.id === "primary") {
      const primaryId = e.target.value;
      const primaryData = variantData.find((pid) => pid.id == primaryId);

      if (primaryData && primaryData.variant_value) {
        setPrimaryValues(primaryData.variant_value);
      }
    }
    if (e.target.id === "secondary") {
      const secondaryId = e.target.value;
      const secondaryData = variantData.find((pid) => pid.id == secondaryId);

      if (secondaryData && secondaryData.variant_value) {
        setSecondaryValues(secondaryData.variant_value);
      }
    }
    const newFormData = { ...formData };
    if (e.target.id === "thumbnail") {
      const formdata = new FormData();
      formdata.append("file_field_name", e.target.files[0]);
      console.log("inputcorrect", e.target.files[0]);
      Axios.post(apis.allImagesUpload, formdata, {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }).then((res) => {
        console.log("res434", res);
        newFormData[e.target.id] = res.data.image_url;
        setFormData({ ...newFormData });
        console.log(",form23", newFormData);
      });
    }
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
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
      formFile: [],
      color: "",
      size: "",
      actualPrize: "",
      sellingPrice: "",
      varStatus: "",
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
      variants: newVariants,
    });
  };

  const duplicateVariant = (index) => {
    const variantToDuplicate = formData.variants[index];
    const duplicatedVariant = {
      ...variantToDuplicate,
      formFile: [...variantToDuplicate.formFile],
    };
    delete duplicatedVariant.slug;
    console.log("product8id", duplicatedVariant.slug);
    formData.variants.splice(index + 1, 0, duplicatedVariant);
    setFormData({ ...formData });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleProductAdd(formData);
  };

  return (
    <div className="content-topic  ">
      <div className="bottom dark-theme-color">
        <h6 className="dark-theme-color-grw ms-4" style={{ fontWeight: "700" }}>
          {editData === "true" ? "Edit Products" : "Add Products"}
        </h6>

        <div className="my-4 mx-4 ">
          <h6 style={{ fontSize: "14px", fontWeight: "700" }}>Basic Details</h6>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="form-group my-2 ">
              <label for="exampleFormControlInput1">Name</label>
              <input
                type="text"
                className="add-prod-input add-prod-input form-control p-2"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">Name in Arabic</label>
              <input
                type="text"
                className="add-prod-input form-control p-2"
                id="nameArabic"
                value={formData.nameArabic}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">Brand</label>
              <select
                className="add-prod-input form-control p-2"
                id="brand"
                value={formData.brand}
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Selelct--</option>
                {brandData.map((item, index) => (
                  <option
                    selected={editData === "true" && formData.brand == item.id}
                    key={index}
                    value={item.id}
                  >
                    {item.brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">Category</label>
              <select
                className="add-prod-input form-control p-2"
                id="category"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Selelct--</option>
                {categoryData.map((item, index) => (
                  <option
                    selected={
                      editData === "true" && formData.category == item.id
                    }
                    key={index}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">Sub Category</label>
              <select
                className="add-prod-input form-control p-2"
                id="subCategory"
                onChange={(e) => handleChange(e)}
                value={formData.subCategory}
              >
                <option value="">--Select--</option>
                {subCategory.map((item, index) => (
                  <option
                    selected={
                      editData === "true" && formData.subCategory == item.id
                    }
                    key={index}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group  my-2">
              <label for="exampleFormControlInput1" id="thumbnail">
                Thumbnail Image
              </label>
              <input
                type="file"
                id="thumbnail"
                className="add-prod-input form-control  p-2 "
                placeholder="No file choosen"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlInput1">Tag</label>
              <input
                type="text"
                className="add-prod-input form-control p-2"
                id="tag"
                value={formData.tag}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">Primary Variant</label>
              <select
                className="add-prod-input form-control p-2"
                id="primary"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Select--</option>
                {variantData.map((item, index) => (
                  <option
                    selected={
                      editData === "true" && formData.primary == item.id
                    }
                    key={index}
                    value={item.id}
                  >
                    {item.Varient_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-2">
              <label for="exampleFormControlSelect1">Secondary Variant</label>
              <select
                className="add-prod-input form-control p-2"
                id="secondary"
                onChange={(e) => handleChange(e)}
              >
                <option value="">--Select--</option>
                {variantData.map((item, index) => (
                  <option
                    selected={
                      editData === "true" && formData.secondary == item.id
                    }
                    key={index}
                    value={item.id}
                  >
                    {item.Varient_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group my-2 ">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                className="add-prod-input form-control"
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
                className="add-prod-input form-control"
                id="description_ar"
                rows="3"
                value={formData.description_ar}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            {editData === "true" && (
              <div className="form-group my-2">
                <label for="exampleFormControlSelect1">Product Status</label>
                <select
                  className="add-prod-input form-control p-2"
                  style={{
                    border: "0px",
                    background: "#eeeeee",
                    color: "grey",
                  }}
                  id="status"
                  onChange={(e) => handleChange(e)}
                  value={formData.status}
                >
                  <option value="Active">Active</option>
                  <option value="Not verified">Not verified</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            )}
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
                    className="add-prod-input form-control p-2"
                    id="sku"
                    value={item.sku}
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">Quantity</label>
                  <input
                    type="text"
                    className="add-prod-input form-control p-2"
                    id="quantity"
                    value={item.quantity}
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>

                {/* <div className="form-group  my-2">
                  <label for="exampleFormControlInput1" id="formfile">
                    Image
                  </label>
                  <input
                    type="file"
                    id="formFile"
                    className="add-prod-input form-control p-2 "
                    
                    placeholder="No file choosen"
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div> */}
                <div className="form-group  my-2">
                  <label for="exampleFormControlInput1" id="formfile">
                    Image
                  </label>

                  <input
                    type="file"
                    id="formFile"
                    className="add-prod-input form-control p-2 "
                    placeholder="No file choosen"
                    onChange={(e) => handleImageChange(e, index)}
                    multiple // Allow selecting multiple images
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  {item.formFile &&
                    item.formFile.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        style={{ position: "relative", marginRight: "10px" }}
                      >
                        <img
                          src={`${constants.port}${image}`}
                          alt={`Image ${imageIndex}`}
                          style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, imageIndex)}
                          style={{
                            position: "absolute",
                            top: "-18px",
                            right: "-8px",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                    ))}
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlSelect1">Color</label>
                  <select
                    className="add-prod-input form-control p-2"
                    id="color"
                    onChange={(e) => handleVariantChange(e, index)}
                  >
                    <option value="">--Select--</option>
                    {primaryValues.map((item_, index) => (
                      <option
                        selected={editData === "true" && item.color == item_.id}
                        key={index}
                        value={item_.id}
                      >
                        {item_.Varient_Values}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlSelect1">Size</label>
                  <select
                    className="add-prod-input form-control p-2"
                    id="size"
                    onChange={(e) => handleVariantChange(e, index)}
                  >
                    <option value="">--Select--</option>
                    {secondaryValues.map((item_, index) => (
                      <option
                        selected={editData === "true" && item.size == item_.id}
                        key={index}
                        value={item_.id}
                      >
                        {item_.Varient_Values}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    Actual Price in KD
                  </label>
                  <input
                    type="text"
                    className="add-prod-input form-control p-2"
                    id="actualPrize"
                    value={item.actualPrize}
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    Selling Price in KD
                  </label>
                  <input
                    type="text"
                    className="add-prod-input form-control p-2"
                    id="sellingPrice"
                    value={item.sellingPrice}
                    onChange={(e) => handleVariantChange(e, index)}
                  />
                </div>
                {editData === "true" && (
                  <div className="form-group my-2">
                    <label for="exampleFormControlSelect1">
                      Variant Status
                    </label>
                    <select
                      className="add-prod-input form-control p-2"
                      id="varStatus"
                      onChange={(e) => handleVariantChange(e, index)}
                      value={item.varStatus}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                )}
                <div className="product-submit ">
                  {index > 0 && (
                    <h6 onClick={() => removeVariantField(index)}>Remove</h6>
                  )}
                  <span>
                    <h6
                      className="mx-3"
                      onClick={() => duplicateVariant(index)}
                    >
                      Duplicate
                    </h6>
                  </span>
                </div>
                <br></br>
                <hr style={{ fontSize: "24px" }}></hr>
              </div>
            ))}

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

export default ProductsForm;
