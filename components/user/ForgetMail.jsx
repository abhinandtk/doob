import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
function ForgetEmail({ setActiveModal }) {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const labels = Labels();

  const submitForgotEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();
    Axios.post(apis.forgetemail, {
      email: email,
    }).then((res) => {
      console.log("res12", res);
      if (res.data.status === 1) {
        setActiveModal("forgetotp");
        localStorage.setItem("forget-psw-email", email);
        notification.success({
          message: t("Success"),
          description: `${labels["New OTP has send"]}`,
        });
        setIsLoading(false);
      } else {
        notification.error({
          message: t("Error"),
          description: `${labels["Email address does not exist"]}`,
        });
      }
    });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} className="login">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
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
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
        }}
      >
        {t("Confirm Your Email")}
      </Modal.Title>
      <Modal.Title
        style={{
          fontSize: "15px",
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
        }}
      >
        {t("To reset your password , Please Enter a Email")}{" "}
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={(e) => submitForgotEmail(e)}>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              type="email"
              className="mx-auto dot modal-in input-theme-prod dark-theme-color"
              placeholder="Email"
              style={{  marginTop: "-29px" }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button
              type="submit"
              className="text-white mx-auto mt-2 modal-bt"
              
            >
              {isLoading ? (
                <>
                  {t("Loading")}
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    variant="light"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              ) : (
                t("Confirm")
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgetEmail;
