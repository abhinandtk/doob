import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Nav, Navbar, Dropdown, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import Axios from "axios";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function FeedbackPage() {
  const labels = Labels();
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    description: "",
  });
  const changeHandler = (e) => {
    e.preventDefault();
    const newForm = { ...formData };
    newForm[e.target.id] = e.target.value;
    setFormData({ ...newForm });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    Axios.post(
      apis.feedback,
      {
        title: formData.title,
        description: formData.description,
        email: formData.email,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setFormData({
        title: "",
        email: "",
        description: "",
      });
      console.log(res);
      notification.success({
        message: "Success",
        description: `${labels["Feedback Submitted SuccessFully"]}`,
      });
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="side-container">
        <PagesSideBar currentPage="feedback" />

        <div
          className="content-page"
          style={{ direction: locale === "en" ? "ltr" : "rtl" }}
        >
          <br></br>
          <div className="head dark-theme-color">{t("Feedback")}</div>

          <Form className="my-3" onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3 m-2" controlId="formBasicEmail">
              <Form.Label className="dark-theme-color">{t("Title")}*</Form.Label>
              <Form.Control
                required
                id="title"
                type="text"
                placeholder=""
                className="input-theme-prod mx-2 op"
                style={{ width: "90%" }}
                value={formData.title}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3 m-2" controlId="formBasicEmail">
              <Form.Label className="dark-theme-color">{t("Email")}*</Form.Label>

              <Form.Control
                required
                id="email"
                type="email"
                placeholder=""
                className="input-theme-prod mx-2 op"
                style={{ width: "90%" }}
                value={formData.email}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3 m-2 " controlId="formBasicEmail">
              <Form.Label className="dark-theme-color">
                {t("Description")}
              </Form.Label>

              <textarea
                className="form-control input-theme-prod mx-2 op"
                style={{ width: "90%", height: "190px" }}
                id="description"
                rows="3"
                placeholder=""
                value={formData.description}
                onChange={(e) => changeHandler(e)}
              ></textarea>
            </Form.Group>
            <button
              type="submit"
              style={{
                float: locale === "en" ? "right" : "left",
                marginLeft: locale === "en" ? "" : "62px",
              }}
              className="side-menus__suggestions-btns"
            >
              {t("Submit")}
            </button>
          </Form>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default FeedbackPage;
