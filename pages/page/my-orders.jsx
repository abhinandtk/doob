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

        </div>
      </div>
    </div>
  );
}

export default MyOrdersPage;
