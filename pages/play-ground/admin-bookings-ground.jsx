import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Axios from "axios";
import moment from "moment";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
import { Modal, notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AdminGroundBookings() {
  const { t } = useTranslation();
  const [bookingList, setBookingList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(1);

  const labels = Labels();

  useEffect(() => {
    const apiPaginationUrl = `${apis.adminAllBookings}?page=${page}`;
    Axios.get(apiPaginationUrl, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("responseres1", res);
      setLoadMore(!!res.data.next);
      if (page === 1) {
        setBookingList(res.data.data);
      } else {
        setBookingList((prev) => [...prev, ...res.data.data]);
      }
    });
  }, [onSuccess, page]);

  // const handleShowUpdate = (id) => {
  //   console.log("oppppppppppppp");
  //   setBookingId(id);
  //   setVisible(true);
  // };
  const statusUpdateHandler = (id) => {
    Axios.post(
      apis.adminBookingStatusChange,
      {
        booking_status: "0",
        booking_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      notification.success({
        message: constants.Success,
        description: `${labels["Booking Cancelled"]}`,
      });
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title={t("Update Status")}
        footer={
          <Button
            style={{ backgroundColor: "#17A803" }}
            key="submit"
            type="primary"
            onClick={(e) => statusUpdateHandler(e)}
          >
            {t("Submit")}
          </Button>
        }
      >
        <div className="form-group my-2">
          <label for="exampleFormControlSelect1">Booking Status</label>
          <select
            placeholder="order stsu"
            className="form-control p-2 "
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            onChange={(e) => setBookingStatus(e.target.value)}
          >
            <option value="" style={{ color: "#959595" }}>
              --Select--
            </option>
            <option value={1} style={{ color: "#959595" }}>
              Success
            </option>
            <option value={0} style={{ color: "#959595" }}>
              {t("Cancel")}
            </option>
          </select>
        </div>
      </Modal>
      <div className="tour-container">
        <div className="bottoms">
          <PlayGroundSideBar currentPage="bookings" />
          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className=" mx-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                {t("Bookings")}
              </h6>
              {bookingList &&
                bookingList.map((item, index) => (
                  <div key={index}>
                    <p className="order-code " style={{ fontWeight: "500" }}>
                      #{item.id}
                      <span style={{ float: "right" }}>
                        {" "}
                        {/* <Button
                          type="submit"
                          className="order-btn "
                          onClick={() => handleShowUpdate(item.id)}
                        >
                          {" "}
                          Update status{" "}
                        </Button> */}
                      </span>
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
                      <span style={{ color: "#959595" }}>
                        {t("Customer Name")}
                      </span>
                      <span>{item.customer_name}</span>
                    </div>
                    <div
                      className="p-2  mx-auto d-flex justify-content-between align-items-center"
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
                        {moment(item.start_time, "hh:mm:ss").format("hh:mm A")}{" "}
                        - {moment(item.end_time, "hh:mm:ss").format("hh:mm A")}
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
                      <span style={{ color: "#959595" }}>{t("Price")}</span>
                      <span> {item.price}KD</span>
                    </div>

                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>
                        {t("Payment Mode")}
                      </span>
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
                      <span style={{ color: "#959595" }}>
                        {t("Payment Status")}
                      </span>
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
                      className="p-2 mt-3  mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}></span>
                      {item.status && (
                        <span
                          style={{
                            color: `${item.status === true ? "red" : "grey"} `,
                            cursor: "pointer",
                          }}
                          onClick={() => statusUpdateHandler(item.id)}
                        >
                          Cancel Booking
                        </span>
                      )}
                    </div>

                    <div
                      className=" mx-auto d-flex justify-content-between align-items-center "
                      style={{ width: "90%" }}
                    >
                      {/* <p className="mx-2" style={{ borderBottom: "1px solid black" }}>
                {t("Download Invoice")}
              </p> */}
                    </div>
                  </div>
                ))}
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
    </div>
  );
}

export default AdminGroundBookings;
