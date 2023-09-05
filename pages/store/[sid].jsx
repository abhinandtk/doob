import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import StoreTopDetails from "@/components/stores/StoreTopDetails";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import { useRouter } from "next/router";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useEffect } from "react";
import SearchCategory from "@/components/stores/SearchCategory";
import moment from "moment";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import StoreProductsCard from "@/components/stores/StoreProductsCard";
import { Carousel, Skeleton } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function StoreDetailPage() {
  const router = useRouter();
  const { sid } = router.query;
  const { t } = useTranslation();

  const [searchInput, setSearchInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [storeDetails, setStoreDetails] = useState([]);
  const [storeCategory, setStoreCategory] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [storeBanners, setStoreBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let headers = {};
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      headers = {
        Authorization: `Token ${constants.token_id}`,
      };
    }
    Axios.post(
      apis.storeview,
      {
        store_id: sid,
      },
      {
        headers,
      }
    ).then((res) => {
      console.log("res6666", res, {
        store_id: sid,
      });
      if (res.data.data) {
        setIsLoading(false);
        setStoreDetails(res.data.data.store[0]);
        setStoreCategory(res.data.data.store[0].categories);
        setOffersData(res.data.data.offers);
        setStoreBanners(res.data.data.mid_banner);
      }
    });
  }, [success, sid]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const search = () => {
    router.push({
      pathname: "/store/search",
      query: {
        search: searchInput,
        slug: sid,
      },
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container ">
        {isLoading ? (
          <Skeleton
            active
            paragraph={{ rows: 20 }}
            className="skeleton-container"
          />
        ) : (
          <>
            <form className="nosubmit " onSubmit={(e) => handleKeyDown(e)}>
              <span>
                {" "}
                <input
                  className="nosubmit1"
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="search"
                  onKeyDown={handleKeyDown}
                  placeholder={t("Search")}
                />
                <span
                  className="dark-theme-color"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push({
                      pathname: "/store/search",
                      query: {
                        search: searchInput,
                        slug: sid,
                      },
                    })
                  }
                >
                  {/* <img
                src="/images/store/Fil-icon.png"
                className="filters-icon"
              ></img> */}
                  {t("Search")}
                </span>
              </span>
              <button type="submit" style={{ display: "none" }}></button>
            </form>
            <StoreTopDetails data={storeDetails} setSuccess={setSuccess} />

            {/* <StoreBannerCard /> */}
            {storeBanners.length > 0 && (
              <section>
                <Carousel
                  prevArrow={
                    <Button
                      className="carousel-arrow"
                      icon={<LeftOutlined />}
                    />
                  }
                  nextArrow={
                    <Button
                      className="carousel-arrow"
                      icon={<RightOutlined />}
                    />
                  }
                >
                  {storeBanners.map((ban, index) => (
                    <div key={index}>
                      <img
                        src={`${constants.port}${ban.Banner_image}`}
                        style={{ width: "100%" }}
                      />
                    </div>
                  ))}
                </Carousel>
              </section>
            )}

            {storeCategory.length >= 1 && (
              <SearchCategory category={storeCategory} />
            )}

            {offersData.length > 0 &&
              offersData.map((item, index) => (
                <div key={index} className="my-2">
                  {/* <h5>
                {item.offer_name}<span className="view">View All</span>
              </h5> */}
                  <StoreProductsCard
                    products={item.product_varient}
                    title={item.offer_name}
                  />
                </div>
              ))}
          </>
        )}
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreDetailPage;
