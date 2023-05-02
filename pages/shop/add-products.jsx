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
function AddProductPage() {
  const router =useRouter()
  const handleProductAdd = (formData) => {

    const variants = formData.variants.map((variant) => ({
      sku: variant.sku,
      quantity: variant.quantity,
      image: variant.formFile,
      primary_variant_value_id: variant.color,
      secondary_variant_value_id: variant.size,
      actual_price: variant.actualPrize,
      selling_price: variant.sellingPrice,
    }));
  
    Axios.post(
      apis.addProduct,
      {
        product_name: formData.name,
        product_name_ar: formData.nameArabic,
        description: formData.description,
        description_ar: formData.description_ar,
        primary_variant_id: formData.primary,
        secondary_variant_id: formData.secondary,
        brand_id: formData.brand,
        category_id: formData.category,
        sub_category_id: formData.subCategory,
        tags: [formData.tag],
        variants:variants
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
        description: "Product added successfully",
      });
      console.log("product succccccccessssssssssssss", res);
    });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container">
        <div className="bottom">
          <ShopPagesSideBar currentPage="products" />
          <ProductsForm handleProductAdd={handleProductAdd}/>
        </div>
      </div>
    </Fragment>
  );
}

export default AddProductPage;
