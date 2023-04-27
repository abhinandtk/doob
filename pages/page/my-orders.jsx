import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PagesSideBar from "@/components/stores/pages/PagesSideBar";
import MyOrders from "@/components/stores/pages/MyOrders";

function MyOrdersPage() {
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container   ">
        <div className="bottom">
          <PagesSideBar />

          <MyOrders />

          {/* <p className="ms-5 order-code ">#12454</p>
          <hr className="mx-auto" style={{ width: "90%" }}></hr>
          <div
            className="   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <span style={{ color: "#959595" }}>Order Date</span>
            <span>20 Jan, 2023</span>
          </div>
          <div
            className="p-2 mt-2 mx-auto d-flex justify-content-between align-items-center"
            style={{
              background: "#eeeeee",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <span style={{ color: "#959595" }}>Price</span>
            <span>13.000 KD</span>
          </div>
          <div
            className="p-2   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <span style={{ color: "#959595" }}>Payment Mode</span>
            <span>Cash on Delivery</span>
          </div>
          <div
            className="p-2  mx-auto d-flex justify-content-between align-items-center"
            style={{
              background: "#eeeeee",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <span style={{ color: "#959595" }}>Payment Status</span>
            <span style={{ color: "#17A803" }}>Payment Recevied</span>
          </div>

          <div
            className="p-2   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <span style={{ color: "#959595" }}>Other Status</span>
            <span style={{ color: "#17A803" }}>Delivered</span>
          </div>
          <div
            className="   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <select
              className="form-control"
              style={{
                border: "0px",
                background: "#eeeeee",
                color: "#959595",
              }}
              id="exampleFormControlSelect1"
            >
              <option>Items</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div
            className="   mx-auto d-flex justify-content-between align-items-center"
            style={{ width: "90%" }}
          >
            <p className="mx-2" style={{ borderBottom: "1px solid black" }}>
              Download Invoice
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPage;
