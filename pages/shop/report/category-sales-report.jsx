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
function CategorySalesReport() {
  const [categoryReportData, setCategoryReportData] = useState([]);
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
        start_date: "",
        end_date: "",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setCategoryReportData(res.data.data[0].category);
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
      <MainHeader title="Doob" />
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
                <div  className="dough" >
                  <center>
                    <Doughnut data={chartData} options={options} />
                  </center>
                </div>
                      
                <div className="customer-sale">
                  <div id="header" className="d-flex justify-content-between headers">
                    <div
                      id="logo"
                      style={{ textAlign: "start" }}
                      className=""
                    >
                      Category
                    </div>
                    <div
                      id="header-middle"
                      style={{ textAlign: "start" }}
                      className=" text-center  count1"
                    >
                      Order Count
                    </div>
                    <div
                      id="header-right"
                      style={{ textAlign: "start" }}
                      className=" text-center amount1"
                    >
                      Total Amount
                    </div>
                  </div>
                  {categoryReportData.length !== 0 ? (
                    categoryReportData.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 mt-2 d-flex justify-content-between customer"
                      >
                        <span className="sales-report-name ">
                          {item.category_name}
                        </span>
                        <span className=" text-center">{item.count}</span>
                        <span className=" text-center">
                          {item.total_amount} KD
                        </span>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
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
