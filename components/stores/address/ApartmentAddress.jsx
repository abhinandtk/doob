import { Checkbox } from "antd";
import React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
function ApartmentAddress({ handleAddAddress, areaData, edit }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { adId } = router.query;
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    block: "",
    street: "",
    avenue: "",
    building: "",
    floor: "",
    flatNo: "",
    phone: "",
    remark: "",
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
          building: res.data.data.building,
          floor: res.data.data.floor,
          flatNo: res.data.data.flat_no,
          phone: res.data.data.phone,
          remark: res.data.data.remark,
        });
        setDefaultAddress(res.data.data.is_default);
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
        <div className="form-group my-2 ">
          <label for="exampleFormControlInput1">{t("Name")}</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlSelect1">{t("Select Area")}*</label>
          <select
            id="area"
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
            value={formData.area}
          >
            <option value="">{t("--Select--")}</option>
            {areaData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.region_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2 ">
          <label for="exampleFormControlInput1">{t("Block")}*</label>
          <input
            id="block"
            type="text"
            value={formData.block}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">{t("Street")}*</label>
          <input
            id="street"
            type="text"
            value={formData.street}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">{t("Avenue")}</label>
          <input
            id="avenue"
            type="text"
            value={formData.avenue}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">{t("Building")}*</label>
          <input
            id="building"
            type="text"
            value={formData.building}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">{t("Floor")}*</label>
          <input
            id="floor"
            type="text"
            value={formData.floor}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">{t("Flat No")}</label>
          <input
            id="flatNo"
            type="text"
            value={formData.flatNo}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleFormControlInput1">{t("Phone Number")}</label>
          <input
            id="phone"
            type="text"
            value={formData.phone}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2 ">
          <label for="exampleFormControlInput1">{t("Remark")}</label>
          <input
            id="remark"
            type="text"
            value={formData.remark}
            className="form-control input-theme-prod p-2"
            onChange={(e) => handleChange(e)}
            style={{ border: "0px" }}
          />
        </div>
        <div className="form-group my-2 ">
          <Checkbox
            onChange={(e) => setDefaultAddress(e.target.checked)}
            checked={defaultAddress}
            className="dark-theme-color"
          >
            {t("Make this as the default address")}
          </Checkbox>
        </div>{" "}
        <br></br>
        <button type="submit" className="submit-cart-btn ">
          {" "}
          {t("Save")}{" "}
        </button>
      </div>
    </form>
  );
}

export default ApartmentAddress;
