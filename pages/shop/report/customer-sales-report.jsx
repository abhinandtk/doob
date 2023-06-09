import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import moment from "moment";

function CustomerSalesReport() {
  const [customerSale, setCustomerSale] = useState([]);
  const [selectedDays, setSelectedDays] = useState(30);
  const [slugId, setSlugId] = useState("");

  const labels = Labels();

  const [startDate, setStartDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  const today = moment().format("YYYY-MM-DD");
  const nextDay = moment(today).add(1, "day").format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(nextDay);
  useEffect(() => {
    Axios.post(
      apis.customerReport,
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
      console.log("res4", res);
      if (res.data.data[0]) {
        setSlugId(res.data.data[0].store_slug);
      }
      setCustomerSale(res.data.data);
    });
  }, [startDate, endDate]);
  const handleDayChange = (days) => {
    setSelectedDays(
      days == 30 ? "30 days" : days == 180 ? "6 months" : "1 year"
    );
    setStartDate(moment().subtract(days, "days").format("YYYY-MM-DD"));
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
                Customer Sales Report
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
                    {/* <img
                      src="/images/store/f-icon.png"
                      className="fil-icon"
                    ></img> */}
                    <button type="button" className="export-btn">
                      <a
                        href={url}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          target: "_blank",
                        }}
                        download
                      >
                        Export
                      </a>
                    </button>
                  </span>
                </div>
                <div className="customer-sale">
                <div  className="report-section">
                    <div >Game</div>
                    <div >Order Count</div>
                    <div>Total Amount</div>
                  </div>
                  {customerSale &&
                    customerSale.map((item, index) => (
                      <div
                        key={index}
                        className=" d-flex justify-content-between  customer my-3"
                      >
                        <span className="sales-report-name">
                          {item.customer_name}
                        </span>
                        <span className="sales-order-number">
                          {item.total_count}
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

export default CustomerSalesReport;
