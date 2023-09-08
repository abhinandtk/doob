import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import Axios from "axios";
import { useEffect } from "react";

import { Button } from "react-bootstrap";
import { Modal, Select, notification } from "antd";
import { Fragment } from "react";
import MobileFooter from "@/components/shared/MobileFooter";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
const { Option } = Select;
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function SupportAddPage() {
  const [supportList, setSupportList] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const labels = Labels();
  const [formData, setFormData] = useState({
    description: "",
    category: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };
  const submitHandler = (e) => {
    console.log("uuuuuuu", formData);
    e.preventDefault();
    Axios.post(
      apis.createSupport,
      {
        description: formData.description,
        category: formData.category,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        router.back();
        notification.success({
          message: t("Success"),
          description: `${labels["Support added"]}`,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
      console.log("responsert", res);
    });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container1">
        <div className="Bottom">
          <PlayGroundSideBar currentPage="support" />

          <div className="content-topics">
            <div className="bottom">
              <h6
                className="All-order"
                style={{
                  color: "#17a803",
                  fontWeight: "700",
                  marginBottom: "30px",
                }}
              >
                {t("Add Support")}
              </h6>

              <div className="my-4 mx-4 ">
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="form-group my-2">
                    <label for="exampleFormControlInput1">
                      {t("Description")}
                    </label>
                    <input
                      type="text"
                      class="form-control input-theme-prod p-2"
                      style={{
                        border: "0px",

                        color: "grey",
                      }}
                      id="description"
                      onChange={(e) => handleChange(e)}
                      value={formData.description}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label for="exampleFormControlInput1">
                      {t("Category")}
                    </label>
                    <input
                      type="text"
                      class="form-control input-theme-prod p-2"
                      style={{
                        border: "0px",

                        color: "grey",
                      }}
                      id="category"
                      onChange={(e) => handleChange(e)}
                      value={formData.category}
                    />
                  </div>

                  <div className="product-submit my-3">
                    <button type="submit" className="submit-cart-btn">
                      {t("Submit")}
                    </button>
                    <button
                      onClick={() => router.back()}
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
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default SupportAddPage;
