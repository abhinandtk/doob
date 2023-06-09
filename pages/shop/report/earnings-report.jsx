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

function EarningsReport() {
  const [selectedDays, setSelectedDays] = useState(30);
  const [earningsData, setEarningsData] = useState([]);
  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("YYYY-MM-DD");
  const nextDay = moment(today).add(1, "day").format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(nextDay);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
    ],
  });

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
    Axios.get(apis.earningReport, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log(res);
      setEarningsData(res.data.data);
      const resp = res.data.data;
      const data = {
        labels: resp.per_day_earnings.map((earn) => earn.date),
        datasets: [
          {
            label: "My  Earnings",
            data: resp.per_day_earnings.map((price) => price.price),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        ],
      };
      setChartData(data);
    });

   
    // Axios.post(
    //   apis.salesReport,
    //   {
    //     start_date: startDate,
    //     end_date: endDate,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Token ${constants.token_id}`,
    //     },
    //   }
    // ).then((res) => {
    //     console.log(res)
    //     setSalesData(res.data.data)
    //   //   setBrandReport(res.data.data[0].brands);
    //   //   const data = res.data.data[0];
    // });
  }, [startDate, endDate]);
  const handleCsvExport=()=>{
    console.log('logg')
    Axios.get(apis.earningReportExport,{
      headers:{
        Authorization:`Token ${constants.token_id}`
      }
    }).then((res)=>{
      console.log('qqqqqqqqqqqqqqq',res)
    })
  }

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="earnings" />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                My Earnings
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
                      <Dropdown.Item onClick={() => handleDayChange(365)}>
                        Last 1 year
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <button
                      onClick={()=>handleCsvExport()}
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
                      <p className="text-center">Total Earnings</p>
                      <h1 className="text-center ">
                        {earningsData.total_earnings}
                      </h1>
                    </div>
                  </div>
                </Card>

                <div>
                  <Line data={chartData} options={options} />
                </div>

                <br></br>
                <div className="customer-sale">
                  <p>
                    <b>Day by Report</b>
                  </p>
                  {earningsData.per_day_earnings &&
                    earningsData.per_day_earnings.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 d-flex justify-content-between  customer"
                      >
                        <span className="sales-report-name">{item.date}</span>
                        <span>{item.price}</span>
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

export default EarningsReport;
