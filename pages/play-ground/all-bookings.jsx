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
function AllBookingPage() {
  const [bookingList, setBookingList] = useState([]);

  const [success,setSuccess]=useState(false)

  useEffect(() => {
    Axios.get(apis.listAllBooking, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log('dedede',res)
      setBookingList(res.data);
    });
  }, [success]);
  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="tour-container">
        <div className="bottoms">
          <PagesSideBar  currentPage='bookings'/>

          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className="dark-theme-color mx-4"
                style={{  fontWeight: "700" }}
              >
                Bookings
              </h6>

              <BookingDetailsCard details={bookingList} setSuccess={setSuccess}/>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default AllBookingPage;
