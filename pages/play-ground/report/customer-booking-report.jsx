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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function CustomerBookingReport() {
  const [selectedDays, setSelectedDays] = useState(t("30 days"));
  const { t } = useTranslation();
  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("DD-MM-YYYY")
  );

  const today = moment().format("DD-MM-YYYY");
  const nextDay = moment(today, '"DD-MM-YYYY"')
    .add(1, "day")
    .format("DD-MM-YYYY");
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
      days == 30 ? t("30 days") : days == 180 ? "6 months" : "1 year"
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
      console.log("reportDtaaaaaaa888", res, {
        start_date: startDate,
        end_date: endDate,
      });

      setCustomerSale(res.data.data.playground_report);
    });
  }, [startDate, endDate]);
  console.log("reportDtaaaaaaa888", dataReport);
  const userId = constants.user_id;
  const url = `${constants.port}/playground/api/ad_customer_report_csv?start_date=${startDate}&end_date=${endDate}&username=${userId}`;

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
                {t("Customer Booking Report")}
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
                      {`Last ${selectedDays == 30 ? t("30 days") : selectedDays}`}{" "}
                      <i className="bi bi-chevron-down "></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="center" className="Menu">
                      <Dropdown.Item onClick={() => handleDayChange(30)}>
                        {t("Last 30 days")}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(180)}>
                        {t("Last 6 months")}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDayChange(360)}>
                        {t("Last 1 year")}
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
                        {t("Export")}
                      </a>
                    </button>
                  </span>
                </div>

                <br></br>
                <div className="customer-sale">
                  <div className="report-section">
                    <div>User</div> &nbsp; &nbsp; 
                    <div>Booking Count</div> &nbsp; &nbsp;
                    <div>Cancel Count</div>  &nbsp;&nbsp;
                    <div>Wallet Bal</div>  &nbsp; &nbsp;
                    <div>Total Amount</div>  &nbsp; &nbsp;
                  </div>
                  {customerSale &&
                    customerSale.map((item, index) => (
                      <div
                        key={index}
                        className=" d-flex justify-content-between  customer my-3"
                      >
                        <span className="sales-report-name">{item.User} 
                        
                        </span>
                        <span className="sales-order-number">
                          {item.booking_count} 
                        </span>
                        <span className="sales-order-number">
                          {item.cancel_count}  
                        </span>
                        <span className="sales-order-number">
                          {item.wallet_bal} 
                        </span>
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

export default CustomerBookingReport;
