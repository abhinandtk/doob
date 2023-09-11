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
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { activeModalShow } from "@/Redux/loginShow";
function PasswordChange() {
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const labels = Labels();

  const submitPasswordChange = (e) => {
    e.preventDefault();
    if (password === password2) {
      Axios.post(
        apis.passwordchange,
        {
          password: password,
          password2: password2,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("forgot-psw-token")}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        console.log("ree", res);
        if (res.data.status === 1) {
          notification.success({
            message: t("Success"),
            description: `${labels["Password Changed Successfully"]}`,
          });
          dispatch(activeModalShow("login"));
        }
      });
    } else {
      setError("Passwords does not match");
    }
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
        {t("Change Your Password")}
      </Modal.Title>
      <Modal.Title
        style={{ fontSize: "15px", marginLeft: "180px", marginTop: "24px" }}
      ></Modal.Title>
      <Modal.Body>
        <Form onSubmit={(e) => submitPasswordChange(e)}>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              className="mx-auto dot modal-in input-theme-prod dark-theme-color"
              placeholder={t("Password")}
              style={{ marginTop: "-29px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br></br>

          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              className="mx-auto dot modal-in input-theme-prod dark-theme-color"
              placeholder={t("Confirm Password")}
              style={{ marginTop: "-29px" }}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </Form.Group>
          <div
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* Use Bootstrap icons here */}
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <Modal.Footer>
            <Button
              type="submit"
              className="text-white modal-bt  mx-auto mt-2 "
            >
              {t("Confirm")}
            </Button>
          </Modal.Footer>
          <center>
            <p style={{ color: "red" }}>{error}</p>
          </center>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PasswordChange;
