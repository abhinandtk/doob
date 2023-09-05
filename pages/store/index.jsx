import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Carousel,
  Card,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import StoreMainBanner from "@/components/stores/StoreMainBanner";
import Stores from "@/components/stores/Stores";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import StoreProductsCard from "@/components/stores/StoreProductsCard";
import StoreBannerCard from "@/components/stores/StoreBannerCard";
import constants from "@/public/data/my-constants/Constants";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Skeleton } from "antd";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}

function StorePage() {
  const [storeData, setStoreData] = useState([]);
  const [banners, setBanners] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let headers = {};
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      headers = {
        Authorization: `Token ${constants.token_id}`,
      };
    }
    Axios.get(apis.stores, {
      headers,
    })
      .then((res) => {
        setIsLoading(false);
        setStoreData([res.data.data]);
        setBanners(res.data.data.top_banner);
        console.log("rtrtrtrtrtrtrtrtrtrtrtrt", res);
      })
      .catch((error) => {
        localStorage.removeItem("user-login-tokens");
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("user-login-tokens");
        } else {
          console.log("An error occurred while fetching product details.");
        }
      });
  }, []);
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        {/* <form className="nosubmit ">
          <span>
            {" "}
            <input className="nosubmit1" type="search" placeholder="Search" />
            <img
              src="/images/store/Fil-icon.png"
              className="filters-icon"
            ></img>
          </span>
        </form> */}
        <br></br>

        {!isLoading ? (
          storeData.map((content, index) => {
            return (
              <div key={index}>
                <StoreMainBanner banners={content.top_banners} />
                <br></br>
                <Stores storeData={content.stores} title={t("Stores")} />
                <br></br>
                <StoreBannerCard banners={content.mid_banners} />
                <br></br>
                {content.favorite_store.length >= 1 && (
                  <Stores
                    storeData={content.favorite_store}
                    title={t("Favourite Stores")}
                  />
                )}
                <br></br>
                <StoreProductsCard
                  products={content.popular_products}
                  title={t("Popular Products")}
                />{" "}
                <br></br>
                {content.favorite_products.length >= 1 && (
                  <StoreProductsCard
                    products={content.favorite_products}
                    title={t("Favourite Products")}
                  />
                )}
              </div>
            );
          })
        ) : (
          <Skeleton
            active
            paragraph={{ rows: 20 }}
            className="skeleton-container"
          />
        )}
      </div>
      <MobileFooter />
    </div>
  );
}

export default StorePage;
