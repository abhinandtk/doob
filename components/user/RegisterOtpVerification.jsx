import React, { useEffect, useState } from "react";
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
import { useTranslation } from "next-i18next";
function RegisterOtpVerification({ setActiveModal }) {
  const [show, setShow] = useState(true);
  const [otp, setOtp] = useState("");
  const { t } = useTranslation();

  const [showResendButton, setShowResendButton] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setShowResendButton(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendEmail = (e) => {
    e.preventDefault();
    Axios.post(apis.resendotp, {
      email: localStorage.getItem("otp-email"),
    }).then((res) => {
      setResendTimer(60);
      setShowResendButton(false);
    });
  };

  const submitVerify = (e) => {
    e.preventDefault();
    Axios.post(apis.verifyotp, {
      email: localStorage.getItem("otp-email"),
      otp: otp,
    }).then((res) => {
      if (res.data.status === 1) {
        setActiveModal("login");
        localStorage.setItem("regist-token-id", res.data.token);
      }
    });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} className="login">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title className="circle">
        <img src="/images/1.png" className="circle"></img>
      </Modal.Title>

      <Modal.Title className="title2">{t("Confirm Your Email")}</Modal.Title>
      <Modal.Title className="lorum ">
        {t("To verify your email , we’ve sent a One Time Password(OTP) to")}{" "}
      </Modal.Title>
      <Modal.Title className="email">
        {typeof localStorage !== "undefined"
          ? localStorage.getItem("otp-email")
          : null}
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={(e) => submitVerify(e)}>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              className="mx-auto dot input-theme-prod dark-theme-color"
              placeholder="Code"
              style={{ width: "359px", marginTop: "-29px" }}
              maxLength="6"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>

          <Modal.Footer>
            {showResendButton ? (
              <Button
                className="mx-auto text-black "
                style={{
                  backgroundColor: "#EEEEEE",
                  fontWeight: "600",
                  width: "360px",
                }}
                onClick={handleResendEmail}
              >
                {t("Resend Email")}
              </Button>
            ) : (
              <div
                className="mx-auto"
                style={{
                  backgroundColor: "",
                  fontWeight: "400",
                  width: "360px",
                }}
              >
                {t("Resend OTP in")} {resendTimer} {t("seconds")}
              </div>
            )}

            <button
              type="submit"
              className="text-white mx-auto mt-2 "
              style={{
                backgroundColor: "#17A803",
                fontWeight: "600",
                width: "363px",
              }}
            >
              {t("Confirm")}
            </button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterOtpVerification;
