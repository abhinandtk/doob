import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import React from "react";
import Axios from "axios";
import { Fragment } from "react";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";

import SupportMessages from "@/components/shop/support/SupportMessages";
import { useState } from "react";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function SupportDetailsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { spId } = router.query;
  const [supportDetails, setSupportDetails] = useState();
  const [supportMessages, setSupportMessages] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    Axios.post(
      apis.supportDetail,
      { ticket_no: spId },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("resrt", res);
      if (res.data.data) {
        setSupportDetails(res.data.data.ticket_details);
        setSupportMessages(res.data.data.message);
      }
    });
  }, [spId, success]);
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <PlayGroundSideBar currentPage="support" />

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
                Ticket Details
              </h6>
              {supportDetails && (
                <div className="my-3">
                  <hr className="mx-auto" style={{ width: "90%" }}></hr>
                  <div
                    className="p-2 mx-auto d-flex justify-content-between align-items-center"
                    style={{ width: "90%" }}
                  >
                    <span style={{ color: "#959595" }}>Ticket No</span>
                    <span style={{ color: "#959595" }}>
                      {supportDetails.ticket_no}
                    </span>
                  </div>
                  <div
                    className="p-2 mx-auto d-flex justify-content-between align-items-center"
                    style={{ width: "90%" }}
                  >
                    <span style={{ color: "#959595" }}>User name</span>
                    <span style={{ color: "#959595" }}>
                      {supportDetails.user?.username}
                    </span>
                  </div>
                  <div
                    className="p-2 mx-auto d-flex justify-content-between align-items-center"
                    style={{ width: "90%" }}
                  >
                    <span style={{ color: "#959595" }}>{t("Description")}</span>
                    <span
                      className="address-admin"
                      style={{ color: "#959595" }}
                    >
                      {supportDetails.description}
                    </span>
                  </div>

                  <div
                    className="p-2   mx-auto d-flex justify-content-between align-items-center"
                    style={{ width: "90%" }}
                  >
                    <span style={{ color: "#959595" }}>Date</span>
                    <span style={{ color: "#959595" }}>
                      {moment(supportDetails.created_at).format("DD-MMM-YYYY")}
                    </span>
                  </div>
                  <div
                    className="p-2 mx-auto d-flex justify-content-between align-items-center"
                    style={{ width: "90%" }}
                  >
                    <span style={{ color: "#959595" }}>Status</span>
                    <span>
                      {supportDetails.status == 0
                        ? "Open"
                        : supportDetails.status == 1
                        ? "Resolved"
                        : "Closed"}
                    </span>
                  </div>
                </div>
              )}

              <SupportMessages
                data={supportMessages}
                status={supportDetails && supportDetails.status}
                setSuccess={setSuccess}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default SupportDetailsPage;
