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
import { notification } from "antd";
import constants from "@/public/data/my-constants/Constants";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { activeModalShow } from "@/Redux/loginShow";
import { useDispatch } from "react-redux";
function Register({ countries }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { locale } = router;
  const dispatch = useDispatch();

  const selectedCountry = localStorage.getItem("country-select");
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    username: "",
    email: "",
    code: "",
    phone: "",
    gender: "",
    nationality: "",
    dob: "",
    password: "",
    confirmpsw: "",
  });
  const handleInputChange = (e) => {
    const newRegFormData = { ...registerFormData };
    newRegFormData[e.target.id] = e.target.value;
    setRegisterFormData({ ...newRegFormData });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (registerFormData.password === registerFormData.confirmpsw) {
      axios
        .post(apis.register, {
          email: registerFormData.email,
          username: registerFormData.username,
          password: registerFormData.password,
          password2: registerFormData.confirmpsw,
          Details: {
            dob: registerFormData.dob,
            nationality: registerFormData.nationality,
            phone: registerFormData.phone,
            name: registerFormData.name,
            Gender: registerFormData.gender,
            country_code: registerFormData.code,
            platform: "0",
            fcm_token: "",
          },
        })
        .then((res) => {
          console.log("resreg", res);
          if (res.data.status === 1) {
            dispatch(activeModalShow("registerotp"));
            localStorage.setItem("otp-email", registerFormData.email);
          } else {
            notification.error({
              message: t("Error"),
              description:
                locale === "en" ? res.data.message_en : res.data.message_ar,
            });
            setErrorMsg(
              locale === "en" ? res.data.message_en : res.data.message_ar
            );
          }
        });
    } else {
      setErrorMsg("password and confirm password deos not match");
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        dispatch(activeModalShow(null));
      }}
    >
      <div className="modal-contents">
        <Modal.Header closeButton></Modal.Header>
        <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>

        <Modal.Title className="register">{t("Registration")}</Modal.Title>
        <Modal.Body>
          <Form onSubmit={(e) => registerSubmit(e)}>
            <Form.Group className="mb-1 white" controlId="formBasicEmail">
              <Form.Label>{t("Name")}*</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder=""
                className="input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.name}
                required
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-1 white">
              <Form.Label>{t("Username")}*</Form.Label>
              <Form.Control
                id="username"
                type="text"
                placeholder=""
                className="input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.username}
                required
              />
            </Form.Group>

            <Form.Group className="mb-1 white">
              <Form.Label>{t("Email")}*</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder=""
                className="input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.email}
                required
              />
            </Form.Group>

            <Form.Label className="white">{t("Phone Number")}*</Form.Label>
            <Form.Group className="mb-2 d-flex justify-content-between align-items-center white ">
              <Form.Select
                id="code"
                className="dot input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.code}
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
                maxLength="10"
                placeholder=""
                className="dot1 input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.phone}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2 white">
              <Form.Label>{t("Gender")}*</Form.Label>
              <Form.Select
                id="gender"
                className="input-theme-prod dark-theme-color"
                aria-label="Default select example"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.gender}
                required
              >
                <option value="">{t("--Select--")}</option>
                <option value="Male">{t("Male")}</option>
                <option value="Female">{t("Female")}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2 white">
              <Form.Label>{t("Nationality")}*</Form.Label>
              <Form.Select
                className="input-theme-prod dark-theme-color"
                id="nationality"
                aria-label="Default select example"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.nationality}
                required
              >
                <option value="">{t("--Select--")}</option>
                {countries.map((item) => (
                  <option key={item.id} value={item.country_name}>
                    {item.country_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2 white">
              <Form.Label>{t("Date of Birth")}*</Form.Label>
              <Form.Control
                id="dob"
                type="date"
                placeholder=""
                className="input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.dob}
                required
              />
            </Form.Group>

            <Form.Group className="mb-1 white">
              <Form.Label>{t("Password")}*</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder=""
                className="input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.password}
                required
              />
            </Form.Group>
            <Form.Group className="mb-1 white">
              <Form.Label>{t("Confirm Password")}*</Form.Label>
              <Form.Control
                id="confirmpsw"
                type="password"
                placeholder=""
                className="input-theme-prod dark-theme-color"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={registerFormData.confirmpsw}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" className="mx-auto text-white submit1 ">
                {t("Submit")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default Register;
