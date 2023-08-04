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
import { notification } from "antd";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoreSettingsPage() {
  const [storeStatus, setStoreStatus] = useState(true);
  const [onSuccess, setOnSuccess] = useState(false);

  useEffect(() => {
    Axios.get(apis.storeSettings, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setStoreStatus(res.data.data.status);
      console.log("storeset", res);
    });
  }, [onSuccess]);

  const statusHandlerChange = (e) => {
    Axios.put(
      apis.updateStoreStatus,
      {
        status: e.target.checked == true ? "True" : "False",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res", res);
      if (res.data.status === 1) {
        setOnSuccess((prev) => !prev);
        notification.success({
          message: "Success",
          description: "Status changed successfully",
        });
      }
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar currentPage="settings" />
          <div className="content-topics ">
            <div className="bottom">
              <h6
                className="dark-theme-color-grw ms-4"
                style={{ fontWeight: "700" }}
              >
                Store Settings
              </h6>
              <div className="my-4 mx-4 ">
                <div className="basic">
                  <Link
                    href="/shop/store-edit"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6>
                      Edit Details{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-chevron-right arrow-icon"
                          viewBox="0 0 16 16"
                          style={{ marginRight: "50px" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/shop/banner-management"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6 className="my-4">
                      Banner Management{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-chevron-right arrow-icon"
                          viewBox="0 0 16 16"
                          style={{ marginRight: "50px" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/shop/offer-management"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6 className="my-4">
                      Offer Management{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-chevron-right arrow-icon"
                          viewBox="0 0 16 16"
                          style={{ marginRight: "50px" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <h6 className="m">Store Status</h6>{" "}
                  <div className="toggle1" style={{ marginRight: "50px" }}>
                    {" "}
                    <input
                      placeholder="Active"
                      onChange={(e) => statusHandlerChange(e)}
                      checked={storeStatus}
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
      <MobileFooter />
    </div>
  );
}

export default StoreSettingsPage;
