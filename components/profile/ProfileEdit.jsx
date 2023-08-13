import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Modal, notification, Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function ProfileEdit({ data, setSuccess }) {
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const router = useRouter();
  const { locale } = router;
  console.log("444478", data);

  const [profileFormData, setProfileFormData] = useState({
    name: "",
    username: "",
    code: "",
    phone: "",
    gender: "",
    nationality: "",
    dob: "",
  });

  useEffect(() => {
    if (data) {
      setProfileFormData({
        name: data.name,
        username: data.username,
        code: data.country_code,
        phone: data.phone,
        gender: data.gender,
        nationality: data.country,
        dob: data.dob,
      });
    }
    Axios.post(apis.country).then((res) => {
      setCountryData(res.data.country);
      console.log("4444country", res);
    });
  }, [data]);
  const handleInputChange = (e) => {
    const newProfileData = { ...profileFormData };
    newProfileData[e.target.id] = e.target.value;
    setProfileFormData({ ...newProfileData });
  };

  const editProfileSubmit = (e) => {
    e.preventDefault();
    Axios.put(
      apis.editProfile,
      {
        name: profileFormData.name,
        username: profileFormData.username,
        phone: profileFormData.phone,
        gender: profileFormData.gender,
        nationality: profileFormData.nationality,
        dob: profileFormData.dob,
        country_code: profileFormData.code,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("resreg", res);
      if (res.data.status === 1) {
        setSuccess((prev) => !prev);
        setShowEdit(false);
        notification.success({
          message: constants.Success,
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      } else {
        notification.error({
          message: constants.Error,
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };
  return (
    <div>
      <Modal
        open={showEdit}
        onCancel={() => setShowEdit(false)}
        title={t("Edit Profile")}
        footer={[
          <Button key="back" onClick={() => setShowEdit(false)}>
            {t("Cancel")}
          </Button>,
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={(e) => editProfileSubmit(e)}
          >
            {t("Submit")}
          </Button>,
        ]}
      >
        <Form onSubmit={(e) => editProfileSubmit(e)}>
          <Form.Group className="mb-1 " controlId="formBasicEmail">
            <Form.Label>{t("Name")}*</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder=""
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.name}
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-1 ">
            <Form.Label>Username*</Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder=""
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.username}
              required
            />
          </Form.Group>

          <Form.Label className="">Phone Number*</Form.Label>
          <Form.Group className="mb-2 d-flex justify-content-between align-items-center  ">
            <Form.Select
              id="code"
              className="dot"
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.code}
              required
            >
              <option value=""></option>
              {countryData.map((item) => (
                <option key={item} value={item.phone_prefix}>
                  {item.phone_prefix}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              id="phone"
              type="text"
              maxLength="10"
              placeholder=""
              className="dot1"
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.phone}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2 ">
            <Form.Label>Gender*</Form.Label>
            <Form.Select
              id="gender"
              aria-label="Default select example"
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.gender}
              required
            >
              <option value="">Select</option>
              <option value="Male">{t("Male")}</option>
              <option value="Female">{t("Female")}</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2 ">
            <Form.Label>Nationality*</Form.Label>
            <Form.Select
              id="nationality"
              aria-label="Default select example"
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.nationality}
              required
            >
              <option value="">--Select--</option>
              {countryData.map((item) => (
                <option key={item.id} value={item.country_name}>
                  {item.country_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2 ">
            <Form.Label>Date of Birth*</Form.Label>
            <Form.Control
              id="dob"
              type="date"
              placeholder=""
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={profileFormData.dob}
              required
            />
          </Form.Group>
        </Form>
      </Modal>
      <button
        onClick={() => setShowEdit(true)}
        className=" btn profile-edit-btn1"
      >
        {t("Edit")}
      </button>
    </div>
  );
}

export default ProfileEdit;
