import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown, Card } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import Axios from "axios";
import { useEffect } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
Chart.register(CategoryScale);

function BookingReport() {
  const [selectedDays, setSelectedDays] = useState(30);
  const [bookingData, setBookingData] = useState([]);
  console.log("bookin333", bookingData);

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("DD-MM-YYYY")
  );

  const today = moment().format("DD-MM-YYYY");
  const nextDay = moment(today).add(1, "day").format("DD-MM-YYYY");
  const [endDate, setEndDate] = useState(nextDay);

  const labels = Labels();
  useEffect(() => {
    Axios.post(
      apis.bookingReport,
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("bookin3332222222", res, {
        start_date: startDate,
        end_date: endDate,
      });
      setBookingData(res.data.data);
      //   setBrandReport(res.data.data[0].brands);
      //   const data = res.data.data[0];
    });
  }, [startDate, endDate]);

  const data = {
    labels: bookingData.per_day && bookingData.per_day.map((item) => item.X),
    datasets: [
      {
        label: "My First dataset",
        data: bookingData.per_day && bookingData.per_day.map((item) => item.Y),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          borderDash: [10, 5], // 10px dash, 5px space
          borderDashOffset: 5, // offset by 5px
          drawTicks: true, // hide ticks
        },
      },
      y: {
        grid: {
          display: false,
          borderDash: [10, 5], // 10px dash, 5px space
          borderDashOffset: 5, // offset by 5px
          drawTicks: true, // hide ticks
        },
      },
    },
  };
  const handleDayChange = (days) => {
    setSelectedDays(
      days == 30 ? "30 days" : days == 180 ? "6 months" : "1 year"
    );
    setStartDate(moment().subtract(days, "days").format("DD-MM-YYYY"));
  };
  console.log("change", startDate);
  const url = `${constants.port}/playground/api/ad_booking_report_csv?&start_date=${startDate}&end_date=${endDate}`;

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <PlayGroundSideBar currentPage="report" />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Booking Report
              </h6>
              <div className="my-1 mx-4 ">
                <div className="update">
                  <Dropdown className="mx-1">
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-basic"
                      style={{
                        color: "black",
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                    >
                      {`Last ${selectedDays == 30 ? "30 days" : selectedDays}`}{" "}
                      <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item onClick={() => handleDayChange(30)}>
                        Last 30 days
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(180)}>
                        Last 1 year
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(365)}>
                        All Time
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <button type="button" className="export-btn">
                      <a
                        href={url}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          target: "_blank",
                        }}
                        download
                        target="_blank"
                      >
                        Export
                      </a>
                    </button>
                  </span>
                </div>

                <Card className="reports">
                  <div>
                    <div className="total-order">
                      <p className="text-center">Total Bookings</p>
                      <h1 className="text-center ">
                        {bookingData.booking_count}
                      </h1>
                    </div>
                  </div>
                </Card>
                <div>
                  <Line data={data} options={options} />
                </div>

                <br></br>
                <div className="customer-sale">
                  <div className="p-3 d-flex justify-content-between  customer">
                    <span className="sales-report-name">Customers</span>
                    <span>{bookingData.num_customers}</span>
                  </div>
                  <div className="p-3 d-flex justify-content-between my-3 customer">
                    <span className="sales-report-name">Total Slots</span>
                    <span>{bookingData.num_slots}</span>
                  </div>
                  <div className="p-3 d-flex justify-content-between my-3  customer">
                    <span className="sales-report-name">Total Bookings</span>
                    <span>{bookingData.booking_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default BookingReport;
