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
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import MobileFooter from "@/components/shared/MobileFooter";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function WalletPage() {
  const [walletData, setWalletData] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const today = moment();
  const router = useRouter();
  const { locale } = router;
  const targetDate = moment("2023-06-15");

  const diffInDays = targetDate.diff(today, "days");
  const { t } = useTranslation();

  console.log(diffInDays);

  useEffect(() => {
    Axios.get(apis.walletView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setWalletData(res.data.data);
      setTotalCount(res.data.total_balance);
      console.log("resoooooo", res);
    });
  }, []);

  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="side-container">
        <PagesSideBar currentPage="wallet" />

        <div className="content-pages">
          <br></br>
          <div className="head">{t("My Wallet")}</div>

          <Card className="wallet">
            <Card.Body>
              <Card.Text className="text-white ">
                <span>
                  <svg
                    width="31"
                    height="23"
                    viewBox="0 0 31 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.7372 0.0664062H2.6161C1.25864 0.0664062 0.158203 1.33879 0.158203 2.90835V19.96C0.158203 21.5296 1.25864 22.802 2.6161 22.802H24.7372C26.0947 22.802 27.1951 21.5296 27.1951 19.96V2.90835C27.1951 1.33879 26.0947 0.0664062 24.7372 0.0664062Z"
                      fill="white"
                    />
                    <rect
                      x="18.9249"
                      y="5.92974"
                      width="11.0093"
                      height="9.16592"
                      rx="4.58296"
                      fill="white"
                      stroke="#17A803"
                      stroke-width="1.89463"
                    />
                    <circle
                      cx="23.201"
                      cy="10.5125"
                      r="0.921712"
                      fill="#17A803"
                    />
                    <rect
                      x="5.38146"
                      y="2.21739"
                      width="7.3737"
                      height="0.614475"
                      rx="0.307238"
                      fill="#343C42"
                      stroke="#17A803"
                      stroke-width="0.614475"
                    />
                  </svg>
                </span>
                <span className="mx-2">{t("My Wallet")}</span>{" "}
              </Card.Text>
              <Card.Text className="text-white ">{t("Total Wallet")}</Card.Text>
              <Card.Title className="text-white ">
                {" "}
                {totalCount ? totalCount : "0.000"} KD
                <span style={{ float: locale === "en" ? "right" : "left" }}>
                  {t("Transactions History")}
                </span>
              </Card.Title>
              <Card.Text className="text-white "></Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <p className="field">{t("Fields")}</p>
          {walletData.map((item, index) => (
            <div key={index} className="d-flex flex-start mt-4 mx-4">
              <a className="mx-2" href="">
                <CardImg
                  className="rounded-circle shadow-1-strong wallet-img "
                  src={`${constants.port}${item.stadium.stadium_image}`}
                ></CardImg>
              </a>
              <div
                className="flex-grow-1 flex-shrink-1 "
                style={{ marginTop: "4px" }}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 wallet-name">
                      {item.stadium.stadium_name}
                    </p>
                    <span className="rate-dinar">{item.balance} KD</span>
                  </div>

                  <p className=" expires-date ">
                    {item.balance} KD {t("expires in")}{" "}
                    {moment(item.expiry_date).diff(moment(), "days")} days
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default WalletPage;
