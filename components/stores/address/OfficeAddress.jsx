import { Checkbox } from "antd";
import React, { useState } from "react";

function OfficeAddress({ handleAddAddress, areaData }) {
  console.log("area34", areaData);

  const [formData, setFormData] = useState({
    name: "",
    area: "",
    block: "",
    street: "",
    avenue: "",
    officeName: "",
    phone: "",
    officePhone: "",
    remark: "",
  });
  const [defaultAddress, setDefaultAddress] = useState(false);

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };
  const submitForm = (e) => {
    e.preventDefault();
    handleAddAddress(formData, defaultAddress);
  };
  return (
    <form onSubmit={(e) => submitForm(e)}>
      <div className="my-4">
        <div className="form-group my-2 ">
          <label for="exampleFormControlInput1">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlSelect1">Select Area*</label>
          <select
            id="area"
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          >
            <option value="">select</option>
            {areaData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.region_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Block*</label>
          <input
            id="block"
            type="text"
            value={formData.block}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Street*</label>
          <input
            id="street"
            type="text"
            value={formData.street}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Avenue</label>
          <input
            id="avenue"
            type="text"
            value={formData.avenue}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Office Name</label>
          <input
            type="text"
            id="officeName"
            value={formData.officeName}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>

        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Phone Number</label>
          <input
            id="phone"
            type="text"
            value={formData.phone}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Office Number</label>
          <input
            id="officePhone"
            type="text"
            value={formData.officePhone}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2 ">
          <label for="exampleFormControlInput1">Remark</label>
          <input
            id="remark"
            type="text"
            value={formData.remark}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2 ">
          <Checkbox
            onChange={(e) => setDefaultAddress(e.target.checked)}
            checked={defaultAddress}
          >
            Make this as the default address
          </Checkbox>
        </div>
        <br></br>
        <button type="submit" className="submit-cart-btn ">
          {" "}
          Save{" "}
        </button>
      </div>
    </form>
  );
}

export default OfficeAddress;
