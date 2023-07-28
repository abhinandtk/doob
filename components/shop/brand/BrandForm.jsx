import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

function BrandForm({handleBrandForm,editDetails}) {
  console.log('popopooooooooooooooo78',editDetails)
  // console.log('popopooooooooooooooo',editDetails.icon)
  const router=useRouter()
  const [formData, setFormData] = useState({
    name: "",
    nameArabic: "",
    // formFile: "",
    display: "",
  });

  useEffect(()=>{
    if (editDetails){
      setFormData({
        name:editDetails.brand,
        nameArabic:editDetails.arabic_translator,
        // formFile:editDetails.icon,
        display:editDetails.display_order
      })
    }
  },[])

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
            class="ad-input-form form-control p-2"
            
            id="name"
            onChange={(e) => handleChange(e)}
            value={formData.name}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Brand Name in Arabic</label>
          <input
            type="text"
            class="ad-input-form form-control p-2"
            
            id="nameArabic"
            onChange={(e) => handleChange(e)}
            value={formData.nameArabic}
          />
        </div>
        {/* <div className="form-group my-2">
          <label for="exampleFormControlInput1" id="formfile">
            Image
          </label>
          <input
            type="file"
            id="formFile"
            class="ad-input-form form-control p-2 grey"
            
            placeholder="No file choosen"
            onChange={(e) => handleChange(e)}
            value={formData.formFile}
          />
        </div> */}

        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Display Order</label>
          <input
            type="text"
            class="ad-input-form form-control p-2"
            
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
