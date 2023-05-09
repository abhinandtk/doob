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
function BrandSaleReport() {
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
  useEffect(() => {
    Axios.post(
      apis.brandReport,
      {
        start_date: "",
        end_date: "",
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
  }, []);
 
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
      <div className="store-container">
        <div className="bottom">
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
                      Last 30 days <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item href="#">English</Dropdown.Item>
                      <Dropdown.Item href="#">Arabic</Dropdown.Item>
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

                <ReportOrderCountTable reportData={brandReportData} title='Product'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSaleReport;
