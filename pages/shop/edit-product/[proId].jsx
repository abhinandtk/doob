import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ProductsForm from "@/components/shop/product/ProductsForm";
import Axios from 'axios'
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { notification } from "antd";
function ProductEditPage() {
  const router =useRouter()
  const editData = router.query
  const handleProductAdd = (formData) => {
    // Axios.post(
    //   apis.editProduct,
    //   {
    //     product_name: formData.name,
    //     product_name_ar: formData.nameArabic,
    //     description: formData.description,
    //     description_ar: formData.description_ar,
    //     primary_variant_id: formData.primary,
    //     secondary_variant_id: formData.secondary,
    //     brand_id: formData.brand,
    //     category_id: formData.category,
    //     sub_category_id: formData.subCategory,
    //     tags: [formData.tag],
    //     variants: [
    //       {
    //         sku: formData.sku,
    //         quantity: formData.quantity,
    //         image: formData.formFile,
    //         primary_variant_value_id: formData.color,
    //         secondary_variant_value_id: formData.size,
    //         actual_price: formData.actualPrize,
    //         selling_price: formData.sellingPrice,
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Token ${constants.token_id}`,
    //     },
    //   }
    // ).then((res) => {
    //   router.back();
    //   notification.success({
    //     message: "Success",
    //     description: "Product Edited successfully",
    //   });
    //   console.log("product succccccccessssssssssssss", res);
    // });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar currentPage="products" />
          <ProductsForm handleProductAdd={handleProductAdd} editData={editData}/>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductEditPage;
