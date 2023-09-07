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
function PasswordChange({setActiveModal}) {
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const {t}=useTranslation()

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const labels=Labels()

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
            message:constants.Success,
            description:`${labels['Password Changed Successfully']}`
          })
          setActiveModal('login')
        }
      });
    } else {
      setError("Passwords does not match");
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} className="login">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title style={{ marginLeft: "340px", marginTop: "10px" }}>
        <img
          src="/images/1.png"
          style={{ width: "64px", height: "64px" }}
        ></img>
      </Modal.Title>

      <Modal.Title
        style={{
          fontWeight: "700",
          fontSize: "16px",
          marginLeft: "300px",
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
              className="mx-auto dot input-theme-prod dark-theme-color"
              placeholder={t("Password")}
              style={{ width: "359px", marginTop: "-29px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br></br>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              className="mx-auto dot input-theme-prod dark-theme-color"
              placeholder={t("Confirm Password")}
              style={{ width: "359px", marginTop: "-29px" }}
              onChange={(e) => setPassword2(e.target.value)}
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
          <center>
            <p style={{ color: "red" }}>{error}</p>
          </center>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PasswordChange;
