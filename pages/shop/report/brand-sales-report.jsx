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
import MobileFooter from "@/components/shared/MobileFooter";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function BrandSaleReport() {
  const [selectedDays, setSelectedDays] = useState(30);
  const { t } = useTranslation();
  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("YYYY-MM-DD");
  const nextDay = moment(today).add(1, "day").format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(nextDay);

  const [brandReportData, setBrandReport] = useState([]);
  const [slugId, setSlugId] = useState("");
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
      days == 30 ? t("30 days") : days == 180 ? t("6 months") : t("1 year")
    );
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
      console.log("res", res);
      setSlugId(res.data.store_slug);
      if (res.data.data.length > 0) {
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
      }
    });
  }, [startDate, endDate]);

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
  const url = `${constants.port}/store/brand_report_csv?store_id=${
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
                {t("Brand Sales Report")}
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
                    <button type="button" className="export-btn">
                      <a
                        href={url}
                        style={{ textDecoration: "none", color: "inherit" }}
                        download
                      >
                        {t("Export")}
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

                <ReportOrderCountTable
                  reportData={brandReportData}
                  title={t("Brand")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default BrandSaleReport;
