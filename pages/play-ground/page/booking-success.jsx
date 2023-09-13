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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  }
}
function BookingSuccessPage() {
  const router = useRouter();
  const { booking_id } = router.query;
  console.log("query", router.query,booking_id);
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
                {t("You have Successfully Booked")}
              </h5>
              <p className="text-center">
                {t("Do you want invite people to this game?")}
              </p>
              <Button
                onClick={() =>
                  router.push({
                    pathname: "/games/create-game",
                    query: {booking_id:booking_id},
                  })
                }
                type="submit"
                className="payment-btn "
                style={{ width: "100px" }}
              >
                {" "}
                {t("Yes")}{" "}
              </Button>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/play-ground")}
                className="text-center my-2"
              >
                {t("No")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default BookingSuccessPage;
