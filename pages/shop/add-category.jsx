import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import CategoriesForm from "@/components/shop/category/CategoriesForm";
import { useRouter } from "next/router";
import { notification } from "antd";
function AddCategoryPage() {

  const router=useRouter()

  const categorySubmitHandler = (data) => {
    Axios.post(
      apis.addCategory,
      {
        title: data.name,
        title_arabic: data.nameArabic,
        parent_id: data.parentCat,
        display_order: data.display,
      },
      { 
        headers: { 
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      router.back();
      notification.success({
        message: "Success",
        description: "Category Added Successfully",
      });
    });
  };
  return ( 
    
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="Bottom">
          <ShopPagesSideBar currentPage='category'/>
          <CategoriesForm categorySubmitHandler={categorySubmitHandler} />
        </div>
      </div>
    </Fragment>
  );
}

export default AddCategoryPage;
