import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import CheckoutSideSection from "@/components/stores/cart/CheckoutSideSection";
import OrderList from "@/components/stores/cart/OrderList";
import ShippingAddress from "@/components/stores/cart/ShippingAddress";
import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { useEffect } from "react";
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
function CartPage() {
  const [cartDetails, setCartDetails] = useState([]);
  const router = useRouter()
  const { locale } = router
  const [cartProducts, setCartProducts] = useState([]);
  const [cartAddress, setCartAddress] = useState([]);
  const [onSuccess, setOnSuccess] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    Axios.post(apis.viewCart, null, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCartDetails(res.data.data);
      setCartAddress(res.data.data.address);
      setCartProducts(res.data.data.products);
      console.log("rtttrtrtt", res, res.data.products);
    });
  }, [onSuccess]);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container h-100">
      <div className="tour-detail-ar">
        <div className="h-100 my-3 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <h5 fw-bold className="dark-theme-color">
                {t("My Cart")}
              </h5>
              <div className="row">
                <div className="col-lg-7">
                  <ShippingAddress
                    data={cartAddress}
                    setOnSuccess={setOnSuccess}
                  />

                  <h5 className="dark-theme-color"   style={{ fontSize: "17px"}} >
                   {t("Order List")}
                    <span   className={locale === "en" ? "view" : "view_ar"}>
                      {t("Total")} {cartDetails.cart_items} {t("items")}
                    </span>
                  </h5>
                  {cartProducts.map((product, index) => (
                    <OrderList
                      key={index}
                      product={product}
                      setOnSuccess={setOnSuccess}
                    />
                  ))}
                </div>
                <CheckoutSideSection data={cartDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default CartPage;
