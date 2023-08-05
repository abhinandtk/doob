import React from "react";
import { useState } from "react";
import Axios from 'axios'
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import BrandForm from "./BrandForm";
import { notification } from "antd";
import { useTranslation } from "next-i18next";

function AddBrand() {
  const {t}=useTranslation()
  const router = useRouter()
 
  const handleBrandForm=(data)=>{
    
    Axios.post(apis.createBrand,{
        brand_name:data.name,
        arabic_translator:data.nameArabic,
        icon_file:data.formFile,
        display_order:data.display
    },
    {
        headers:{
            'Authorization':`Token ${constants.token_id}`,
        }
    }).then((res)=>{
        notification.success({
          message:'Success',
          description:'Brand Added Successfully'
        })
        router.back()
        console.log('brasnddddddddddddddddddddddddddddddd',res)
    })
  }
  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          {t("Add Brands")}
        </h6>
        <BrandForm handleBrandForm={handleBrandForm}/>
      </div>
    </div>
  );
}

export default AddBrand;
