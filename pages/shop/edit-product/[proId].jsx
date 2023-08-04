import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ProductsForm from "@/components/shop/product/ProductsForm";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { notification } from "antd";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function ProductEditPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log("router.query", router.query.id, "opo", id);
  const handleProductAdd = (formData) => {
    console.log("formedit55555", formData.variants[0].formFile);
    console.log("form888845555", formData);

    const variants = formData.variants.map((variant) => ({
      sku_code: variant.sku,
      id: variant.slug,
      quantity: variant.quantity,
      image: variant.formFile,
      primary_variant_value_id: variant.color,
      secondary_variant_value_id: variant.size,
      actual_price: variant.actualPrize,
      selling_price: variant.sellingPrice,
      status: variant.varStatus,
    }));

    Axios.put(
      apis.editProduct,
      {
        product_id: id,
        name: formData.name,
        arabic_translator: formData.nameArabic,
        description: formData.description,
        arabic_description: formData.description_ar,
        varient_type_id: formData.primary,
        multivarient_id: formData.secondary,
        product_brand_id: formData.brand,
        // product_category_id: formData.category,
        thumbnail_image: formData.thumbnail,
        product_category_id: formData.subCategory,
        tags: formData.tag,
        status: formData.status,
        variants: variants,
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
        description: "Product Edited successfully",
      });
      console.log("product8id", res, apis.addProduct, {
        product_id: id,
        name: formData.name,
        arabic_translator: formData.nameArabic,
        description: formData.description,
        arabic_description: formData.description_ar,
        varient_type_id: formData.primary,
        multivarient_id: formData.secondary,
        product_brand_id: formData.brand,
        // product_category_id: formData.category,
        thumbnail_image: formData.thumbnail,
        product_category_id: formData.subCategory,
        tags: formData.tag,
        status: formData.status,
        variants: variants,
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
          <ShopPagesSideBar currentPage="products" />
          <ProductsForm handleProductAdd={handleProductAdd} editData="true" />
        </div>
      </div>
      <MobileFooter />

    </Fragment>
  );
}

export default ProductEditPage;
