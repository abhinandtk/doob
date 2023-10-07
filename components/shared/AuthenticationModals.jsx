import { Modal, Button } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import constants from "@/public/data/my-constants/Constants";
import apis from "@/public/data/my-constants/Apis";
import Login from "@/components/user/Login";
import Register from "@/components/user/Register";
import ForgetEmail from "@/components/user/ForgetMail";
import RegisterOtpVerification from "@/components/user/RegisterOtpVerification";
import ForgetOtp from "@/components/user/ForgetOtp";
import PasswordChange from "@/components/user/PasswordChange";
import SsoRegister from "@/components/user/SsoRegister";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { activeModalShow } from "@/Redux/loginShow";
function AuthenticationModals() {
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();

  const activemodal = useSelector((state) => state.activeShow.activeModal);
  const dispatch = useDispatch();

  const [countryModalShow, setCountryModalShow] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  //   const [activemodal, setActiveModal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasReloaded = localStorage.getItem("hasReloaded");
    if (!token && !hasReloaded) {
      localStorage.setItem("hasReloaded", true);

      window.location.reload();
    }
  }, []);

  const handleCountry = (e) => {
    setRegionData([]);
    const countryId = e.target.value;
    localStorage.setItem("country-select", countryId);
    const cData = countryData.find(
      (country) => country.country_name === countryId
    );

    if (cData && cData.regions) {
      setRegionData(cData.regions);
    }
  };

  const regionChange = (e) => {
    const regId = e.target.value;
    localStorage.setItem("region-select", regId);
  };

  const countrySubmitHandler = (e) => {
    e.preventDefault();

    setCountryModalShow(false);
    dispatch(activeModalShow("login"));
  };

  useEffect(() => {
    axios.post(apis.country).then((res) => {
      setCountryData(res.data.country);
    });
  }, []);
  return (
    <div>
      {" "}
      {constants.country === null ? (
        <Modal
          show={countryModalShow}
          // onHide={() => setCountryModalShow(false)}
          className="country_select"
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <Modal.Title className="title1">
              {t("Please Choose Your location")}
            </Modal.Title>
            <Form style={{ marginTop: "34px" }} onSubmit={countrySubmitHandler}>
              <Form.Group className="mb-1 country ">
                <Form.Label>{t("Select Country")}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleCountry}
                  className="input-theme-prod dark-theme-color"
                  required
                >
                  <option value="">{t("Country")}</option>
                  {countryData.map((item) => (
                    <option key={item.id} value={item.country_name}>
                      {item.country_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 location">
                <Form.Label>{t("Select Location")}</Form.Label>
                <Form.Select
                  className="input-theme-prod dark-theme-color"
                  aria-label="Default select example"
                  required
                  onChange={(e) => regionChange(e)}
                >
                  <option value="">{t("Locations")}</option>
                  {regionData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.region_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Modal.Footer>
                <Button type="submit" className="mx-auto text-white submit1">
                  {t("Continue")}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
      {activemodal === "login" && <Login />}
      {activemodal === "register" && <Register countries={countryData} />}
      {activemodal === "registerotp" && <RegisterOtpVerification />}
      {activemodal === "forgetemail" && <ForgetEmail />}
      {activemodal === "forgetotp" && <ForgetOtp />}
      {activemodal === "passwordchange" && <PasswordChange />}
      {activemodal === "ssoregister" && <SsoRegister countries={countryData} />}
    </div>
  );
}

export default AuthenticationModals;
