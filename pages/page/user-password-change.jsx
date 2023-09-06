import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import Link from "next/link";
import apis from "@/public/data/my-constants/Apis";
import Axios from "axios";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function UserPasswordChange() {
  const { t } = useTranslation();
  const router = useRouter();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const labels = Labels();

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post(
      apis.changePasswordSettings,
      {
        current_password: password1,
        password2: password2,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
          description: `${labels["Password Changed Successfully"]}`,
        });
        router.push("/page/settings-page");
      } else {
        notification.error({
          message: constants.Error,
          description: `${labels["Current password is incorrect"]}`,
        });
      }
      console.log("response", res);
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <div className="bottom">
          <PagesSideBar currentPage="settings" />
          <div className="content-topics ">
            <h6
              className=" my-4"
              style={{ color: "#17a803", fontWeight: "700" }}
            ></h6>

            <div className="my-4 mx-4 ">
              <h6 style={{ fontSize: "14px", fontWeight: "700" }}>
                {t("Change Password")}
              </h6>
              <br></br>
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-group my-2 ">
                  <label for="exampleFormControlInput1">
                    {t("Current Password")}
                  </label>
                  <input
                    type="password"
                    className="form-control input-theme-prod p-2"
                    style={{
                      border: "0px",
                      color: "grey",
                    }}
                    id="name"
                    // value={formData.name}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleFormControlInput1">
                    {t("New Password")}
                  </label>
                  <input
                    type="password"
                    className="form-control input-theme-prod p-2"
                    style={{
                      border: "0px",
                      color: "grey",
                    }}
                    id="nameArabic"
                    // value={formData.nameArabic}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
                <div className="product-submit my-3">
                  <button type="submit" className="submit-cart-btn">
                    {t("Submit")}
                  </button>
                  <button
                    onClick={() => router.push("/page/settings-page")}
                    type="button"
                    className="sub-cart-btn"
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default UserPasswordChange;
