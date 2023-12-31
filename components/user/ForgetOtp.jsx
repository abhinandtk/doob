import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import { Labels } from "@/public/data/my-constants/Labels";
import { notification } from "antd";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { activeModalShow } from "@/Redux/loginShow";
function ForgetOtp() {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();

  const [fotp, setFotp] = useState("");
  const labels = Labels();
  const dispatch = useDispatch();

  const submitForgotOtp = (e) => {
    e.preventDefault();
    Axios.post(apis.forgetotpverify, {
      email: localStorage.getItem("forget-psw-email"),
      otp: fotp,
    }).then((res) => {
      console.log("res", res);
      if (res.data.status === 1) {
        dispatch(activeModalShow("passwordchange"));
        localStorage.setItem("forgot-psw-token", res.data.data.token);
        notification.success({
          message: t("Success"),
          description: `${labels["Otp verification is complete"]}`,
        });
      } else {
        notification.error({
          message: t("Error"),
          description: `${labels["Otp is invalid"]}`,
        });
      }
    });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} className="login">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title
        style={{ marginLeft: "auto", marginTop: "10px", marginRight: "auto" }}
      >
        <img
          src="/images/1.png"
          style={{ width: "64px", height: "64px" }}
        ></img>
      </Modal.Title>

      <Modal.Title
        style={{
          fontWeight: "700",
          fontSize: "16px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "24px",
        }}
      >
        {t("Enter Your OTP")}
      </Modal.Title>
      <Modal.Title
        style={{
          fontSize: "15px",
          marginLeft: "auto",
          marginTop: "24px",
          marginRight: "auto",
        }}
      >
        {t("To reset your password , Please Enter an OTP")}
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={(e) => submitForgotOtp(e)}>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              className="mx-auto modal-in input-theme-prod dark-theme-color"
              // placeholder={t("OTP")}
              style={{ marginTop: "-29px" }}
              onChange={(e) => setFotp(e.target.value)}
              maxLength="6"
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button
              type="submit"
              className="text-white mx-auto mt-2 "
              style={{
                backgroundColor: "#17A803",
                fontWeight: "600",
                width: "363px",
              }}
            >
              {t("Confirm")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgetOtp;
