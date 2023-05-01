import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

function BrandForm({handleBrandForm}) {
    const router=useRouter()
  const [formData, setFormData] = useState({
    name: "",
    nameArabic: "",
    formFile: "",
    display: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };

  const submitHandler=(e)=>{
    e.preventDefault()
    handleBrandForm(formData)
  }

  return (
    <div className="my-4 mx-4 ">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Brand Name</label>
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
            value={formData.name}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Brand Name in Arabic</label>
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
            value={formData.nameArabic}
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
            value={formData.formFile}
          />
        </div>

        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Display Order</label>
          <input
            type="text"
            class="form-control p-2"
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "grey",
            }}
            id="display"
            onChange={(e) => handleChange(e)}
            value={formData.display}
          />
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
  );
}

export default BrandForm;
