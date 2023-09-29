import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import Axios from "axios";
import { useEffect } from "react";

import { Button } from "react-bootstrap";
import { Modal, Select } from "antd";
import { Fragment } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MobileFooter from "@/components/shared/MobileFooter";
import Link from "next/link";
import { useRouter } from "next/router";
const { Option } = Select;
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function SupportPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [supportList, setSupportList] = useState([]);
  useEffect(() => {
    Axios.get(apis.supportView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setSupportList(res.data.data);
    });
  }, []);
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="support" />

          <div className="content-topic  ">
            <div className="bottom">
              <h6
                className="All-order"
                style={{
                  color: "#17a803",
                  fontWeight: "700",
                  marginBottom: "30px",
                }}
              >
                {t("Support")}
                <span>
                  <Button
                    onClick={() => router.push("/page/support/add-support")}
                    type="button"
                    className="order-btn "
                  >
                    {t("Add support")}
                  </Button>
                </span>
              </h6>

              {supportList &&
                supportList.map((item, index) => (
                  <div key={index} className="my-3">
                    <div
                      className="   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span
                        className="dark-theme-color"
                        style={{ fontWeight: "500" }}
                      >
                        #{item.ticket_no}
                      </span>
                      <span className="dark-theme-color">
                        {item.status == 0
                          ? "Open"
                          : item.status == 1
                          ? "Resolved"
                          : item.status == 2
                          ? "Closed"
                          : "Pending"}
                      </span>
                    </div>

                    <hr className="mx-auto" style={{ width: "90%" }}></hr>
                    <div
                      className="p-2 mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>
                        {item.description}
                      </span>
                    </div>

                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>
                        {moment(item.created_at).format("DD-MMM-YYYY")}
                      </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}></span>
                      <Link
                        href={`/page/support/${item.ticket_no}`}
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          style={{
                            color: "#17A803",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          {t("View More")}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default SupportPage;
