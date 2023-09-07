import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { useTranslation } from "next-i18next";
function SsoRegister({ setActiveModal, countries }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  const [ssoRegisterForm, setSsoRegisterForm] = useState({
    name: "",
    username: "",
    email: "",
    code: "",
    phone: "",
    gender: "",
    nationality: "",
    dob: "",
  });
  const handleInputChange = (e) => {
    const newRegFormData = { ...ssoRegisterForm };
    newRegFormData[e.target.id] = e.target.value;
    setSsoRegisterForm({ ...newRegFormData });
  };

  const ssoRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post(apis.ssoregister, {
        social_authId: localStorage.getItem("sso-user-id"),
        email: ssoRegisterForm.email,
        username: ssoRegisterForm.username,

        Details: {
          dob: ssoRegisterForm.dob,
          nationality: ssoRegisterForm.nationality,
          phone: ssoRegisterForm.phone,
          name: ssoRegisterForm.name,
          Gender: ssoRegisterForm.gender,
          country_code: ssoRegisterForm.code,
          platform: "0",
          fcm_token: "",
        },
      })
      .then((res) => {
        if (res.data.status === 1) {
          console.log("-------------------------------------78", res);
        }
      });
  };
  return (
    <Modal show={show} onHide={() => setShow(false)} className="SsoRegister">
      <div className="modal-contents">
        <Modal.Header closeButton></Modal.Header>

        <Modal.Title
          style={{ fontWeight: "700", fontSize: "16px", marginLeft: "195px" }}
        >
          Registration
        </Modal.Title>
        <Modal.Body>
          <Form onSubmit={(e) => ssoRegisterSubmit(e)}>
            <Form.Group className="mb-1" style={{ marginLeft: "180px" }}>
              <Form.Label>{t("Name")}*</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder=""
                style={{ width: "360px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.name}
                required
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-1" style={{ marginLeft: "180px" }}>
              <Form.Label>{t("Username")}*</Form.Label>
              <Form.Control
                id="username"
                type="text"
                placeholder=""
                style={{ width: "360px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.username}
                required
              />
            </Form.Group>

            <Form.Group className="mb-1" style={{ marginLeft: "180px" }}>
              <Form.Label>{t("Email")}*</Form.Label>
              <Form.Control
                id="email"
                type="text"
                placeholder=""
                style={{ width: "360px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.email}
                required
              />
            </Form.Group>

            <Form.Label style={{ marginLeft: "176px" }}>
              {t("Phone Number")}*
            </Form.Label>
            <Form.Group
              className=" d-flex justify-content-between align-items-center "
              style={{ marginLeft: "180px" }}
            >
              <Form.Select
                id="code"
                className="dot"
                style={{ width: "90px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.code}
                required
              >
                <option value=""></option>
                {countries.map((item) => (
                  <option key={item} value={item.phone_prefix}>
                    {item.phone_prefix}
                  </option>
                ))}
              </Form.Select>

              <Form.Control
                id="phone"
                type="text"
                placeholder=""
                className="dot "
                style={{ width: "276px", marginRight: "173px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.phone}
                required
              />
            </Form.Group>

            <Form.Group className="mb-1" style={{ marginLeft: "180px" }}>
              <Form.Label>{t("Gender")}*</Form.Label>
              <Form.Select
                id="gender"
                aria-label="Default select example"
                style={{ width: "360px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.gender}
              >
                <option value="Male">{t("Male")}</option>
                <option value="Female">{t("Female")}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1" style={{ marginLeft: "180px" }}>
              <Form.Label>{t("Nationality")}*</Form.Label>
              <Form.Select
                id="nationality"
                aria-label="Default select example"
                style={{ width: "360px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.nationality}
              >
                <option value="INDIA">INDIA</option>
                <option value="usa">uSA</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-1" style={{ marginLeft: "180px" }}>
              <Form.Label>{t("Date of Birth")}*</Form.Label>
              <Form.Control
                id="dob"
                type="text"
                placeholder=""
                style={{ width: "360px" }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={ssoRegisterForm.dob}
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                type="submit"
                className="mx-auto text-white  "
                style={{
                  backgroundColor: "#17A803",
                  fontWeight: "600",
                  width: "360px",
                }}
              >
                {t("Submit")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default SsoRegister;
