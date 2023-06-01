import moment from "moment";
import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Labels } from "@/public/data/my-constants/Labels";
import { notification } from "antd";
function BookingDetailsCard({ details }) {
  console.log("hai log", details);

  const lables = Labels();

  const cancelBookingHandler = (id) => {
    console.log({
      id: id,
    });

    Axios.post(
      apis.cancelBooking,
      {
        id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("book", res);
      if (res.data.status) {
        notification.success({
          message: constants.Success,
          description: `${labels["Booking Cancelled"]}`,
        });
      }
    });
  };

  return (
    <Fragment>
      {details &&
        details.map((item, index) => (
          <div key={index}>
            <p className="order-code " style={{ fontWeight: "500" }}>
              #{item.id}
            </p>
            <hr className="mx-auto" style={{ width: "90%" }}></hr>
            {/* <div
              class="   mx-auto d-flex justify-content-between align-items-center"
              style={{ width: "90%" }}
            >
              <span style={{ color: "#959595" }}>Customer Name</span>
              <span>Faisal</span>
            </div> */}
            <div
              className="p-2 mt-2 mx-auto d-flex justify-content-between align-items-center"
              style={{
                background: "#eeeeee",
                borderRadius: "10px",
                width: "90%",
              }}
            >
              <span style={{ color: "#959595" }}>Date</span>
              <span> {moment(item.date).format("DD MMM YYYY")} </span>
            </div>
            <div
              className="p-2   mx-auto d-flex justify-content-between align-items-center"
              style={{ width: "90%" }}
            >
              <span style={{ color: "#959595" }}>Slot </span>
              <span>
                {moment(item.time_slot[0].start_time, "hh:mm:ss").format(
                  "hh:mm A"
                )}{" "}
                -{" "}
                {moment(item.time_slot[0].end_time, "hh:mm:ss").format(
                  "hh:mm A"
                )}
              </span>
            </div>
            <div
              className="p-2 mt-1 mx-auto d-flex justify-content-between align-items-center"
              style={{
                background: "#eeeeee",
                borderRadius: "10px",
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
              <span style={{ color: "#17A803" }}>{item.payment_status}</span>
            </div>
            <div
              className="p-2   mx-auto d-flex justify-content-between align-items-center"
              style={{ width: "90%" }}
            >
              <span style={{ color: "#959595" }}>Booking Status</span>
              <span style={{ color: "#17A803" }}>{`${
                item.status === true ? "Success" : "Cancelled"
              }`}</span>
            </div>
            <div
              className="p-2   mx-auto d-flex justify-content-between align-items-center"
              style={{ width: "90%" }}
            >
              <span style={{ color: "#959595" }}></span>
              <span
                style={{ color: "red" }}
                onClick={() => cancelBookingHandler(item.id)}
              >
                Cancel Booking
              </span>
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
    </Fragment>
  );
}

export default BookingDetailsCard;