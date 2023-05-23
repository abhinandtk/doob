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
Chart.register(CategoryScale);

function SalesReport() {
  const [selectedDays, setSelectedDays] = useState(30);
  const [salesData, setSalesData] = useState([]);

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(today);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
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
    setSelectedDays(days);
    setStartDate(moment().subtract(days, "days").format("YYYY-MM-DD"));
  };
  console.log("change", startDate);
  useEffect(() => {
    Axios.post(
      apis.salesReport,
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
      console.log(res);
      setSalesData(res.data.data);
      //   setBrandReport(res.data.data[0].brands);
      //   const data = res.data.data[0];
    });
  }, [startDate, endDate]);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="Bottom">
          <ShopPagesSideBar />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Product Sales Report
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
                      {`Last ${selectedDays} days`}{" "}
                      <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item onClick={() => handleDayChange(30)}>
                        Last 30 days
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(60)}>
                        Last 60 days
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(120)}>
                        Last 120 days
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <button type="button" className="export-btn">
                      Export
                    </button>
                  </span>
                </div>
                <div>
                  <Line data={data} options={options} />
                </div>

                <Card className="reports">
                  <div>
                    <div className="total-order">
                      <p className="text-center">Total Orders</p>
                      <h1 className="text-center ">{salesData.total_orders}</h1>
                    </div>
                  </div>
                </Card>

                <br></br>
                <div className="customer-sale">
                  <div className="p-3 d-flex justify-content-between  customer">
                    <span className="sales-report-name">Customers</span>
                    <span>{salesData.total_customers}</span>
                  </div>
                  <div className="p-3 d-flex justify-content-between  customer">
                    <span className="sales-report-name">Total Products</span>
                    <span>{salesData.total_products}</span>
                  </div>
                  <div className="p-3 d-flex justify-content-between  customer">
                    <span className="sales-report-name">Total Orders</span>
                    <span>{salesData.total_orders}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
