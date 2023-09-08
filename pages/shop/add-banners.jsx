import React, { useState } from "react";
import { Fragment } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import { notification } from "antd";
import MobileFooter from "@/components/shared/MobileFooter";
import { Labels } from "@/public/data/my-constants/Labels";
import BannerForm from "@/components/shop/banner/BannerForm";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AddBannersPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const labels = Labels();

  const bannerSubmitHandler = (data) => {
    console.log("resoffer", {
        banner_name: data.name,
        banner_url: data.bannerUrl,
        banner_display: data.display,
        banner_image: data.image,
        banner_type: "card_mid",
      })
    Axios.post(
      apis.addBanner,
      {
        banner_name: data.name,
        banner_url: data.bannerUrl,
        banner_display: data.display,
        banner_image: data.image,
        app_banner_image:data.appImage,
        banner_type: "card_mid",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("resoffer", res, {
        banner_name: data.name,
        banner_url: data.bannerUrl,
        banner_display: data.display,
        banner_image: data.image,
        banner_type: "card_mid",
      });
      if (res.data.status === 1) {
        router.push("/shop/banner-management");
        notification.success({
          message: t("Success"),
          description: `${labels["Banner added successfully"]}`,
        });
      }
    });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="banners" />
          <BannerForm bannerSubmitHandler={bannerSubmitHandler} />
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default AddBannersPage;
