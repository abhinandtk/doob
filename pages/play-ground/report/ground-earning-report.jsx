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
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  }
}
function EarningReport() {
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState(30);
  const [earningData, setEarningData] = useState([]);
  console.log("bookin333", earningData);

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("DD-MM-YYYY")
  );

  const today = moment().format("DD-MM-YYYY");
  const nextDay = moment(today,'DD-MM-YYYY').add(1, "day").format("DD-MM-YYYY");
  const [endDate, setEndDate] = useState(nextDay);

  const labels = Labels();
  useEffect(() => {
    Axios.post(
      apis.groundEarning,
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
      console.log("23bookin3332222222", res, {
        start_date: startDate,
        end_date: endDate,
      });
      setEarningData(res.data.data);
      //   setBrandReport(res.data.data[0].brands);
      //   const data = res.data.data[0];
    });
  }, [startDate, endDate]);

  const data = {
    labels:
      earningData.playground_report &&
      earningData.playground_report.map((earn) => earn.X),
    datasets: [
      {
        label: "",
        data:
          earningData.playground_report &&
          earningData.playground_report.map((earn) => earn.Y),
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
      days == 30 ? t("30 days") : days == 180 ? t("6 months") : t("1 year")
    );
    setStartDate(moment().subtract(days, "days").format("DD-MM-YYYY"));
  };
  console.log("change", startDate);
  const url = `${constants.port}/playground/api/ad_my_earning_report_csv?start_date=${startDate}&end_date=${endDate}&username=${constants.user_id}`;

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <PlayGroundSideBar currentPage="earnings" />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                {t("Earning Report")}
              </h6>
              <div className="my-1 mx-4 ">
                <div className="update">
                  <Dropdown className="mx-1">
                    <Dropdown.Toggle
                      variant=""
                      className=" dark-theme-color"
                      id="dropdown-basic"
                      style={{
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                    >
                      {`${t("Last")} ${selectedDays == 30 ? t("30 days") : selectedDays}`}{" "}
                      <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item onClick={() => handleDayChange(30)}>
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
                    <button type="button" className="export-btn input-theme-prod dark-theme-color">
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
                        {t("Export")}
                      </a>
                    </button>
                  </span>
                </div>

                <Card className="reports">
                  <div>
                    <div className="total-order">
                      <p className="text-center">{t("Total Earnings")}</p>
                      <h1 className="text-center ">
                        {earningData.total_price ?earningData.total_price:'0.000' } KD
                      </h1>
                    </div>
                  </div>
                </Card>
                <div>
                  <Line data={data} options={options} />
                </div>

                <br></br>
                <div className="customer-sale">
                  <p>
                    <b>{t("Day by Report")}</b>
                  </p>
                  {earningData.playground_report &&
                    earningData.playground_report.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 input-theme-prod d-flex justify-content-between  customer"
                      >
                        <span className="sales-report-name">{item.X}</span>
                        <span>{item.Y} KD</span>
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

export default EarningReport;
