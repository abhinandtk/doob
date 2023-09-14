import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Carousel,
  Card,
  Button,
  Form,
  CardImg,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import { useRouter } from "next/router";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function OrderSuccessPage() {
  const router = useRouter();
  const {t}=useTranslation()

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container  my-5">
        <div className="card ">
          <div className="card-body p-5  ">
            <div className="success " style={{ textAlign: "center" }}>
              <img src="/images/store/success.png" className="greenlogo"></img>
              <h5
                className="text-center
            "
              >
                {t("Payment Successful")}
              </h5>
              <p className="text-center">
                {t("Your order has been Placed Successfully")}
              </p>
              <Button
                onClick={() => router.push("/store")}
                type="submit"
                className="payment-btn "
              >
                {("Continue Shopping")}
              </Button>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/")}
                className="text-center my-2"
              >
                {t("Back to Home")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default OrderSuccessPage;
