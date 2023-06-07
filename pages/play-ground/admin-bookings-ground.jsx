import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PlayGroudSidePages from "./page/PlayGroudSidePages";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Axios from "axios";
import moment from "moment";
function AdminGroundBookings() {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    Axios.get(apis.adminAllBookings, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("res1", res);
      setBookingList(res.data);
    });
  }, []);
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <div className="bottoms">
          <PlayGroudSidePages currentPage="bookings" />
          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className=" mx-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Bookings
              </h6>
              {bookingList &&
                bookingList.map((item, index) => (
                  <div key={index}>
                    <p className="order-code " style={{ fontWeight: "500" }}>
                      #{item.id}
                    </p>
                    <hr className="mx-auto" style={{ width: "90%" }}></hr>
                    <div
                      class="p-2 mt-2  mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Customer Name</span>
                      <span>{item.customer_name}</span>
                    </div>
                    <div
                      className="p-2 mt-2 mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Date</span>
                      <span> {moment(item.date).format("DD MMM YYYY")} </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Slot </span>
                      <span>
                        {moment(
                          item.time_slot[0].start_time,
                          "hh:mm:ss"
                        ).format("hh:mm A")}{" "}
                        -{" "}
                        {moment(item.time_slot[0].end_time, "hh:mm:ss").format(
                          "hh:mm A"
                        )}
                      </span>
                    </div>
                    <div
                      className="p-2 mt-1 mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Stadium Name</span>
                      <span className="book-names"> {item.stadium_name}</span>
                    </div>

                    <div
                      className="p-2 mt-1 mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Price</span>
                      <span> {item.price}KD</span>
                    </div>

                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>Payment Mode</span>
                      <span> {item.payment_method} </span>
                    </div>
                    <div
                      className="p-2  mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Payment Status</span>
                      <span style={{ color: "#17A803" }}>
                        {item.payment_status}
                      </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>Booking Status</span>
                      <span
                        style={{
                          color: `${item.status === true ? "#17A803" : "red"} `,
                        }}
                      >{`${
                        item.status === true ? "Success" : "Cancelled"
                      }`}</span>
                    </div>
                    
                    <div
                      className=" mx-auto d-flex justify-content-between align-items-center "
                      style={{ width: "90%" }}
                    >
                      {/* <p className="mx-2" style={{ borderBottom: "1px solid black" }}>
                Download Invoice
              </p> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminGroundBookings;
