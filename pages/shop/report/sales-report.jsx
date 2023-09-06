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
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function SalesReport() {
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState(30);
  const [salesData, setSalesData] = useState([]);
  const [salesGraph, setSalesGraph] = useState([]);
  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(31, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("YYYY-MM-DD");
  const nextDay = moment(today).add(1, "day").format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(nextDay);

  const data = {
    labels: salesGraph && salesGraph.map((item) => item.date),
    datasets: [
      {
        label: "",
        data: salesGraph && salesGraph.map((item) => item.price),
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
      console.log("res45", res, {
        start_date: startDate,
        end_date: endDate,
      });
      setSalesData(res.data.data);
      setSalesGraph(res.data.data.per_day_earnings);
      //   setBrandReport(res.data.data[0].brands);
      //   const data = res.data.data[0];
    });
  }, [startDate, endDate]);
  const handleDayChange = (days) => {
    setSelectedDays(
      days == 31 ? t("30 days") : days == 180 ? t("6 months") : t("1 year")
    );
    setStartDate(moment().subtract(days, "days").format("YYYY-MM-DD"));
  };

  const url = `${constants.port}/store/sales_report_pdf?store_id=${
    salesData && salesData.store_slug
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
                {t("Sales Report")}
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
                      {`${t("Last")} ${selectedDays == 30 ? t("30 days") : selectedDays}`}{" "}
                      <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item onClick={() => handleDayChange(31)}>
                        {t("Last 30 days")}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(180)}>
                        {t("Last 6 months")}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(365)}>
                        {t("Last 1 year")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <button type="button" className="export-btn">
                      <a
                        href={url}
                        target="_blank"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {t("Export")}
                      </a>
                    </button>
                  </span>
                </div>
                <div>
                  <Line data={data} options={options} />
                </div>

                <Card className="reports">
                  <div>
                    <div className="total-order">
                      <p className="text-center">{t("Total Orders")}</p>
                      <h1 className="text-center ">{salesData.total_orders}</h1>
                    </div>
                  </div>
                </Card>

                <br></br>
                <div className="customer-sale">
                  <div className="p-3 d-flex justify-content-between  customer">
                    <span className="sales-report-name">{t("Customers")}</span>
                    <span>{salesData.total_customers}</span>
                  </div>
                  <div className="p-3 d-flex justify-content-between my-3 customer">
                    <span className="sales-report-name">{t("Total Products")}</span>
                    <span>{salesData.total_products}</span>
                  </div>
                  <div className="p-3 d-flex justify-content-between my-3  customer">
                    <span className="sales-report-name">{t("Total Orders")}</span>
                    <span>{salesData.total_orders}</span>
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

export default SalesReport;
