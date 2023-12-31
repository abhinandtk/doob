import React from "react";
import { useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import BrandForm from "./BrandForm";
import { notification } from "antd";
import { useTranslation } from "next-i18next";

function EditBrand() {
  const router = useRouter();
  const { bid } = router.query;
  const editData = router.query;
  const {t}=useTranslation()

  
 
  const handleBrandForm = (data) => {
    console.log('popopooooooooooooooo',editData)
    // console.log('88788888888888888888888',id)
    Axios.put(
      apis.editBrand, 
      {
        brand_id:editData.id,
        brand_name: data.name,
        arabic_translator: data.nameArabic,
        // icon_file: data.formFile,
        display_order: data.display,
      },
      { 
        headers: { 
          Authorization: `Token ${constants.token_id}`, 
        },
      }
    ).then((res) => {
      notification.success({
        message: "Success",
        description: "Brand Edited Successfully",
      });
      router.push("/shop/brand-management")
      console.log("brasnddddddddddddddddddddddddddddddd", res);
    });
  };
  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          {t("Edit Brands")}
        </h6>
        <BrandForm handleBrandForm={handleBrandForm} editDetails={editData} />
      </div>
    </div> 
  );
}

export default EditBrand;


