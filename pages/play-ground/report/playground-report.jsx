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
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  }
}
function PlaygroundReport() {
  const [selectedDays, setSelectedDays] = useState(30);
  const { t } = useTranslation();
  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("DD-MM-YYYY")
  );

  const today = moment().format("DD-MM-YYYY");
  const nextDay = moment(today,"DD-MM-YYYY").add(1, "day").format("DD-MM-YYYY");
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
    setSelectedDays(days == 30 ?'30 days' :days == 180 ?'6 months':'1 year');
    setStartDate(moment().subtract(days, "days").format("DD-MM-YYYY"));
  };
  console.log("change", startDate);
  useEffect(() => {
    Axios.post(
      apis.playgroundReport,
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
      if (res.data.data.playground_report.length > 0) {
        setDataReport(res.data.data.playground_report);

        const data = res.data.data;
        const brandColors = randomColor({
          count: data.playground_report.length,
          luminosity: "bright",
          format: "rgba",
        });
        const chartData = {
          labels: data.playground_report.map((play) => play.stadium_name),
          datasets: [
            {
              data: data.playground_report.map((play) => play.booking_count),
              backgroundColor: brandColors,
              hoverBackgroundColor: brandColors,
            },
          ],
        };
        setChartData(chartData);
      }
    });
  }, [startDate, endDate]);
  console.log("reportDtaaaaaaa888", dataReport);

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
  const url = `${constants.port}/playground/api/ad_playground_report_csv?&start_date=${startDate}&end_date=${endDate}&username=${constants.user_id}`;

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
                Play ground Report
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
                        style={{ textDecoration: "none", color: "inherit",target:'_blank' }}
                        download
                        target="_blank"
                      >
                        {t("Export")}
                      </a>
                    </button>
                  </span>
                </div>

                <br></br>
                <Doughnut data={chartData} options={options} />
                {/* <div className="dough" >
                  <center>
                    <Doughnut data={chartData} options={options} />
                  </center>
                </div> */}
                <div className="customer-sale">
                 
                  <div  className="report-section">
                  <div >PlayGround</div>
                    <div >Booking Count</div>
                    <div >Total Amount</div>
                  </div>
                  {dataReport && dataReport.map((item,index)=>(
                  <div
                    key={index}
                    className=" d-flex justify-content-between  customer my-3"
                  >
                    <span className="sales-report-name">{item.stadium_name}</span>
                    <span className="sales-order-number">{item.booking_count}</span>
                    <span className="sales-order-price">{item.total_amount} KD</span>
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

export default PlaygroundReport;
