import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ShopDashBoardTop from "@/components/shop/ShopDashBoardTop";
import ShopDashBoardPages from "@/components/shop/ShopDashBoardPages";
import MobileFooter from "@/components/shared/MobileFooter";
import { useTheme } from "next-themes";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function ShopManagementPage() {
  const {theme}=useTheme()
  
  return (
    <div>
      <MainHeader title='Doob'/>
      <MobileHeader />
      <MainSidebarFixed />

      <div class="store-container1  my-5">
        <h5 className="dark-theme-color fw-bold shop-management">
          Shop Management
          <span className="home" >
            <svg
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
             >
              <path
                d="M16.6585 8.05321L9.6585 1.27386C9.28148 0.908715 8.71852 0.908714 8.3415 1.27386L1.3415 8.05321C1.12448 8.26338 1 8.56702 1 8.88619V18.7065C1 19.3178 1.44772 19.8133 2 19.8133H6C6.55228 19.8133 7 19.3178 7 18.7065V14.2792C7 13.6679 7.44772 13.1723 8 13.1723H10C10.5523 13.1723 11 13.6679 11 14.2792V18.7065C11 19.3178 11.4477 19.8133 12 19.8133H16C16.5523 19.8133 17 19.3178 17 18.7065V8.88619C17 8.56702 16.8755 8.26339 16.6585 8.05321Z"
                stroke={`${theme === "dark" ? "white" : "black"}`}
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </h5> 
        <h6 className="my-4 summary dark-theme-color" style={{ fontWeight: "700" }}>
          Summary
        </h6>
         
        <ShopDashBoardTop />
        <ShopDashBoardPages />
      </div>
      <MobileFooter />

    </div>
  );
}

export default ShopManagementPage;
