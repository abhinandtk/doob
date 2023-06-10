import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart as chartJS, ArcElement, Tooltip, Legend } from "chart.js";
chartJS.register(ArcElement, Tooltip, Legend);
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import randomColor from "randomcolor";
import ReportOrderCountTable from "@/components/shop/report/ReportOrderCountTable";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { Labels } from "@/public/data/my-constants/Labels";
import moment from "moment";
function CategorySalesReport() {
  const [categoryReportData, setCategoryReportData] = useState([]);
  const [selectedDays, setSelectedDays] = useState(30);
  const [slugId, setSlugId] = useState("");

  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(31, "days").format("YYYY-MM-DD")
  );
  const today = moment().format("YYYY-MM-DD");
  const nextDay = moment(today).add(1, "day").format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(nextDay);
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
  useEffect(() => {
    Axios.post(
      apis.categoryReport,
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
      console.log("res3", res);
      if (res.data.data.length > 0) {
        setCategoryReportData(res.data.data[0].category);
        setSlugId(res.data.data[0].store_slug);
        const data = res.data.data[0];
        const brandColors = randomColor({
          count: data.category.length,
          luminosity: "bright",
          format: "rgba",
        });
        const chartData = {
          labels: data.category.map((cat) => cat.category_name),
          datasets: [
            {
              data: data.category.map((cat) => cat.count),
              backgroundColor: brandColors,
              hoverBackgroundColor: brandColors,
            },
          ],
        };
        setChartData(chartData);
      }
    });
  }, [startDate, endDate]);
  const handleDayChange = (days) => {
    setSelectedDays(
      days == 31 ? "30 days" : days == 180 ? "6 months" : "1 year"
    );
    setStartDate(moment().subtract(days, "days").format("YYYY-MM-DD"));
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 20,
          boxHeight: 20,
          color: "black",
        },
        position: "bottom", // set the position of the legend to bottom
      },
    },
  };
  const url = `${constants.port}/store/category_report_csv?store_id=${
    slugId && slugId
  }&start_date=${startDate}&end_date=${endDate}`;
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
                Category Sales Report
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
                      <Dropdown.Item onClick={() => handleDayChange(31)}>
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
                    <button type="button" className="export-btn">
                      <a
                        href={url}
                        style={{ textDecoration: "none", color: "inherit" }}
                        download
                      >
                        Export
                      </a>
                    </button>
                  </span>
                </div>

                <br></br>
                <div className="dough">
                  <center>
                    <Doughnut data={chartData} options={options} />
                  </center>
                </div>
                <div className="customer-sale">
                  <div className="report-section">
                    <div>Category</div>
                    <div>Order Count</div>
                    <div>Total Amount</div>
                  </div>
                  {categoryReportData &&
                    categoryReportData.map((item, index) => (
                      <div
                        key={index}
                        className=" d-flex justify-content-between  customer my-3"
                      >
                        <span className="sales-report-name">
                          {item.category_name}
                        </span>
                        <span className="sales-order-number">{item.count}</span>
                        <span className="sales-order-price">
                          {item.total_amount} KD
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

export default CategorySalesReport;
