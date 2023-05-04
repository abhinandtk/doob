import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import CategoriesForm from "@/components/shop/category/CategoriesForm";
import { useRouter } from "next/router";
import { notification } from "antd";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
function EditCategoryPage() {
  const router = useRouter();
  // const {cid} = router.query
  const editData = router.query;
  const categorySubmitHandler = (data) => {
    if (data.parentCat) {
      Axios.put(
        apis.editSubCategory,
        {
          subcategory_id: editData.id,
          subcategory: {
            title: data.name,
            title_arabic: data.nameArabic,
            parent_id: data.parentCat,
            display_order: data.display,
          },
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
          description: "Sub Category Edited Successfully",
        });
      });
    } else {
      Axios.put(
        apis.editCategory,
        {
          category_id: editData.id,
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
          description: "Category Edited Successfully",
        });
      });
    }
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar currentPage="category" />
          <CategoriesForm
            categorySubmitHandler={categorySubmitHandler}
            editData={editData}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default EditCategoryPage;
