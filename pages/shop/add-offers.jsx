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
import MobileFooter from "@/components/shared/MobileFooter";
import OffersForm from "@/components/shop/offer/OffersForm";
import { Labels } from "@/public/data/my-constants/Labels";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AddOffersPage() {
  const router = useRouter();

  const labels = Labels();

  const OfferSubmitHandler = (data, items) => {
    Axios.post(
      apis.addOffers,
      {
        offer_name: data.name,
        arabic_translator: data.nameArabic,
        product_varient: items,
        status: true,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("resoffer", res, {
        offer_name: data.name,
        arabic_translator: data.nameArabic,
        product_varient: items,
        status: true,
        show_in_home: false,
      });
      if (res.data.status === 1) {
        router.push("/shop/offer-management");
        notification.success({
          message: constants.Success,
          description: `${labels["Offers added successfully"]}`,
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
          <ShopPagesSideBar currentPage="settings" />
          <OffersForm OfferSubmitHandler={OfferSubmitHandler} />
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default AddOffersPage;
