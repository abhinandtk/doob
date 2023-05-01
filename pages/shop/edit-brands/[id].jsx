import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import EditBrand from "@/components/shop/brand/EditBrand";
import { useRouter } from "next/router";

function EditBrandPage() {
  const router = useRouter()
  const {id} = router.query
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar />
          <EditBrand />
        </div>
      </div>
    </Fragment>
  );
}

export default EditBrandPage;
