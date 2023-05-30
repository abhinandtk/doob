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
import PlayGroudSidePages from "./page/PlayGroudSidePages";
function AllBookingPage() {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    Axios.get(apis.listAllBooking, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setBookingList(res.data);
    });
  }, []);
  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="tour-container">
        <div className="bottoms">
          <PlayGroudSidePages currentPage='bookings'/>

          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className=" mx-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Bookings
              </h6>

              <BookingDetailsCard details={bookingList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBookingPage;
