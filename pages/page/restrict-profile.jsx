import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
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
import { Modal, notification, Button } from "antd";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ThemeSwitcher from "@/components/shared/headers/ThemeSwitcher";
import LanguageSwitcher from "@/components/shared/headers/LanguageSwitcher";
import LanguageSwitcherMobile from "@/components/shared/headers/LanguageSwitcherMobile";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoreSettingsPage() {
  const { t } = useTranslation();
  const labels = Labels();
  const [accountStatus, setAccountStatus] = useState(false);
  const [userType, setUserType] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [blockedShow, setBlockedShow] = useState(false);
  const [blockedList, setBlockedList] = useState([]);
  const router = useRouter();
  const { locale } = router;

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <div className="bottom">
          <PagesSideBar currentPage="settings" />
          <div className="content-topic">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                {t("Restrict User")}
              </h6>
              <div className="my-4 dark-theme-color mx-4 ">
                <div className="basic">
                  <div>
                    <h6 className="my-4 dark-theme-color">
                      {t("Hide Post")}
                    </h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        placeholder="Active"
                        //   onChange={(e) => statusHandlerChange(e)}
                        //   checked={accountStatus}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                  <div>
                    <h6 className="my-4 dark-theme-color">
                      {t("Hide Story")}
                    </h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        placeholder="Active"
                        //   onChange={(e) => statusHandlerChange(e)}
                        //   checked={accountStatus}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                  <div>
                    <h6 className="my-4 dark-theme-color">
                      {t("Hide Message")}
                    </h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        placeholder="Active"
                        //   onChange={(e) => statusHandlerChange(e)}
                        //   checked={accountStatus}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                  <div>
                    <h6 className="my-4 dark-theme-color">
                      {t("Hide Notification")}
                    </h6>{" "}
                    <div
                      className="toggle1"
                      style={{ marginRight: "50px", marginTop: "-40px" }}
                    >
                      {" "}
                      <input
                        placeholder="Active"
                        //   onChange={(e) => statusHandlerChange(e)}
                        //   checked={accountStatus}
                        type="checkbox"
                      />
                      <label></label>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreSettingsPage;
