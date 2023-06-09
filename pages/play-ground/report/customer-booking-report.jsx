import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart as chartJS, ArcElement, Tooltip, Legend } from "chart.js";
chartJS.register(ArcElement, Tooltip, Legend);
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import randomColor from "randomcolor";
import moment from "moment";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
function CustomerBookingReport() {
  const [selectedDays, setSelectedDays] = useState("30 days");

  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("DD-MM-YYYY")
  );

  const today = moment().format("DD-MM-YYYY");
  const nextDay = moment(today).add(1, "day").format("DD-MM-YYYY");
  const [endDate, setEndDate] = useState(nextDay);
  const [dataReport, setDataReport] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  const handleDayChange = (days) => {
    setSelectedDays(
      days == 30 ? "30 days" : days == 180 ? "6 months" : "1 year"
    );
    setStartDate(moment().subtract(days, "days").format("DD-MM-YYYY"));
  };
  console.log("change", startDate);
  const [customerSale, setCustomerSale] = useState([]);

  useEffect(() => {
    Axios.post(
      apis.customerReportPlay,
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
      setCustomerSale(res.data.data);
    });
  }, [startDate, endDate]);
  console.log("reportDtaaaaaaa888", dataReport);
  const url = `${constants.port}/playground/api/ad_customer_report_csv?&start_date=${startDate}&end_date=${endDate}`;

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
                Customer Booking Report
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
                        Last 6 months
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(360)}>
                        Last 1 year
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

                <br></br>
                <div className="customer-sale">
                  <div
                    id="header"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div id="logo">Customer</div>
                    <div id="header-middle ">Order Count</div>
                    <div id="header-right">Total Amount</div>
                  </div>
                  {dataReport &&
                    dataReport.map((item, index) => (
                      <div
                        key={index}
                        className=" d-flex justify-content-between  customer my-3"
                      >
                        <span className="sales-report-name">
                          {item.Game}sale
                        </span>
                        <span className="sales-order-number">
                          {item.booking_count}s
                        </span>
                        <span className="sales-order-price">
                          {item.total_amount} KDs
                        </span>
                      </div>
                    ))}
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

export default CustomerBookingReport;