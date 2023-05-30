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

function ProductSalesReport() {
  const [productSale, setProductSale] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.productReport,
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
      console.log("ppppopo", res.data.data[0]);
      setProductSale(res.data.data);
    });
  });
  return (
    <div>
      <MainHeader title='Doob' />
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
                Product Sales Report
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
                    <img
                      src="../images/store/f-icon.png"
                      className="fil-icon"
                    ></img>{" "}
                    <button type="button" className="export-btn">
                      Export{" "}
                    </button>
                  </span>
                </div>

                <div className="customer-sale">
                  <div id="header">
                    <div id="logo">Product</div>
                    <div id="header-middle">Order Count</div>
                    <div id="header-right">Total Amount</div>
                  </div>
                  {productSale &&
                    productSale.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 d-flex justify-content-between  customer"
                      >
                        <span className="sales-report-name">
                          {item.product_name}
                        </span>
                        <span>{item.total_count}</span>
                        <span>{item.total_amount} KD</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSalesReport;
