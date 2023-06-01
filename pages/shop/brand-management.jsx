import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import BrandManagement from "@/components/shop/brand/BrandManagement";
import MobileFooter from "@/components/shared/MobileFooter";


function CategoryManagementPage() {
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage='brand'/>
          <BrandManagement />
        </div>
      </div>
      <MobileFooter />

    </Fragment>
  );
}

export default CategoryManagementPage;
