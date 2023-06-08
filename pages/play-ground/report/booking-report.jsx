import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown, Card } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
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
Chart.register(CategoryScale);

function BookingReport() {
  const [selectedDays, setSelectedDays] = useState(30);
  const [bookingData, setBookingData] = useState([]);
  console.log('bookin333',bookingData)

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("DD-MM-YYYY")
  );

  const today = moment().format("DD-MM-YYYY");
  const [endDate, setEndDate] = useState(today);

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
      console.log('bookin3332222222',res,{
        start_date: startDate,
        end_date: endDate,
    });
      setBookingData(res.data.data);
      //   setBrandReport(res.data.data[0].brands);
      //   const data = res.data.data[0];
    });
  }, [startDate, endDate]);

  const data = {
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        data: [],
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
    setSelectedDays(days == 30 ?'30 days' :days == 180 ?'6 months':'1 year');
    setStartDate(moment().subtract(days, "days").format("DD-MM-YYYY"));
  };
  console.log("change", startDate);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="report" />

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
                      {`Last ${selectedDays}`}{" "}
                      <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item onClick={() => handleDayChange(30)}>
                        Last 30 days
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(180)}>
                        Last 6 months
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(365)}>
                        Last 1 year
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <button
                      onClick={() =>
                        notification.info({
                          message: constants.Info,
                          description: `${labels["This feature will added soon"]}`,
                        })
                      }
                      type="button"
                      className="export-btn"
                    >
                      Export
                    </button>
                  </span>
                </div>

                <Card className="reports">
                  <div>
                    <div className="total-order">
                      <p className="text-center">Total Bookings</p>
                      <h1 className="text-center ">{bookingData.booking_count}</h1>
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