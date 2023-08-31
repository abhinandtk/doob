import { Checkbox } from "antd";
import React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
function ThirdPartyAddress({ handleAddAddress, areaData, edit }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { adId } = router.query;
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    block: "",
    street: "",
    avenue: "",
    address: "",
    phone: "",
    remark: "",
    providerName: "",
    providerArea: "",
    providerBlock: "",
    providerStreet: "",
    providerAvenue: "",
  });
  const [defaultAddress, setDefaultAddress] = useState(true);

  useEffect(() => {
    if (edit) {
      Axios.post(
        apis.singleAddressView,
        {
          address_id: adId,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log("wetytyty", res);
        setFormData({
          name: res.data.data.name,
          area: res.data.data.region,
          block: res.data.data.block,
          street: res.data.data.street,
          avenue: res.data.data.avenue,
          address: res.data.data.building_flat_house_all,
          phone: res.data.data.phone,
          remark: res.data.data.remark,
          providerName: res.data.data.providor_name,
          providerArea: res.data.data.providor_area,
          providerBlock: res.data.data.providor_block,
          providerStreet: res.data.data.providor_street,
          providerAvenue: res.data.data.providor_avenue,
        });
        setDefaultAddress(res.data.data.is_default)
      });
    }
  }, []);
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
        <h6 className="my-4">Customer Address</h6>
        <div className="form-group my-2 ">
          <label for="exampleFormControlInput1">{t("Name")}</label>
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
            value={formData.area}
          >
            <option value="">select</option>
            {areaData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.region_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2 ">
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
          <label for="exampleFormControlInput1">
            Building/Flat/Floor/House Name*
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
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
        <h6 className="my-4">Provider Address </h6>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Provider Name*</label>
          <input
            id="providerName"
            type="text"
            value={formData.providerName}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlSelect1">Select Area*</label>
          <select
            id="providerArea"
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
            id="providerBlock"
            type="text"
            value={formData.providerBlock}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Street*</label>
          <input
            id="providerStreet"
            type="text"
            value={formData.providerStreet}
            className="form-control p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px", background: "#eeeeee" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">Avenue</label>
          <input
            id="providerAvenue"
            type="text"
            value={formData.providerAvenue}
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

export default ThirdPartyAddress;
