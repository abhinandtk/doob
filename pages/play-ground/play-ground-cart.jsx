import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import GroundFieldAddress from "@/components/playGround/GroundFieldAddress";
import GroundCartItems from "@/components/playGround/GroundCartItems";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function PlayGroundCartPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [cartFieldData, setCartFieldData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [success, setSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get(apis.playCart, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCartData(res.data.data);
      setIsLoading(false);
    });
  }, [success]);

  return (
    <div>
      <MainHeader doob="title" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">

        <div className="row" >
          <h5 className=" my-4" style={{ fontWeight: "600", direction: locale === 'en' ? "ltr" : "rtl" }}>
            {t("My Cart")}
          </h5>
          {!isLoading ? (
            cartData.cart_details && cartData.cart_details.length != 0 ? (
              <>
                <GroundFieldAddress address={cartData.stadium} />
                <GroundCartItems data={cartData} setSuccess={setSuccess} />
              </>
            ) : (
              <div>{t("Cart is empty")}</div>
            )
          ) : null}
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default PlayGroundCartPage;
