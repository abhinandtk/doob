import "bootstrap-icons/font/bootstrap-icons.css";

import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import BookingDetailsCard from "@/components/playGround/BookingDetailsCard";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
import MobileFooter from "@/components/shared/MobileFooter";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AllBookingPage() {
  const [bookingList, setBookingList] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(1);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const apiPaginationUrl = `${apis.listAllBooking}?page=${page}`;
    Axios.get(apiPaginationUrl, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("dedede", res);
      setLoadMore(!!res.data.next);
      if (page === 1) {
        setBookingList(res.data.data);
      } else {
        setBookingList((prev) => [...prev, ...res.data.data]);
      }
    });
  }, [success, page]);
  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="tour-container">
        <div className="bottoms">
          <PagesSideBar currentPage="bookings" />

          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className="dark-theme-color mx-4"
                style={{ fontWeight: "700" }}
              >
                Bookings
              </h6>

              <BookingDetailsCard
                details={bookingList}
                setSuccess={setSuccess}
              />
              {loadMore && (
                <p
                  onClick={() => setPage((prev) => prev + 1)}
                  className="dark-theme-color my-3"
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  {t("Load More")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default AllBookingPage;
