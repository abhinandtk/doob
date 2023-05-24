import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart as chartJS, ArcElement, Tooltip, Legend } from "chart.js";
chartJS.register(ArcElement, Tooltip, Legend);
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import ReportOrderCountTable from "@/components/shop/report/ReportOrderCountTable";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import randomColor from "randomcolor";
import moment from "moment";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
function BrandSaleReport() {

  const [selectedDays, setSelectedDays] = useState(30);

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(today);
  const [brandReportData, setBrandReport] = useState([]);
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
    setSelectedDays(days);
    setStartDate(moment().subtract(days, "days").format("YYYY-MM-DD"));
  };
  console.log("change", startDate);
  useEffect(() => {
    Axios.post(
      apis.brandReport,
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
      setBrandReport(res.data.data[0].brands);
      const data = res.data.data[0];
      const brandColors = randomColor({
        count: data.brands.length,
        luminosity: "bright",
        format: "rgba",
      });
      const chartData = {
        labels: data.brands.map((brand) => brand.brand_name),
        datasets: [
          {
            data: data.brands.map((brand) => brand.count),
            backgroundColor: brandColors,
            hoverBackgroundColor: brandColors,
          },
        ],
      };
      setChartData(chartData);
    });
  }, [startDate, endDate]);

  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 50,
          boxHeight: 50,
          color: "black",
        },
        position: "bottom", // set the position of the legend to bottom
      },
    },
  };
  return (
    <div>
      <MainHeader title='Doob'/>
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Brand Sales Report
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

                <br></br>
                <div style={{ width: "400px", height: "400px" }}>
                  <center>
                    <Doughnut data={chartData} options={options} />
                  </center>
                </div>

                <ReportOrderCountTable
                  reportData={brandReportData}
                  title="Product"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSaleReport;
