import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Card,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
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
import StoreBannerCard from "@/components/stores/StoreBannerCard";
import moment from "moment";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import StoreProductsCard from "@/components/stores/StoreProductsCard";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
function StoreDetailPage() {
  const router = useRouter();
  const { sid } = router.query;

  const [searchInput, setSearchInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [storeDetails, setStoreDetails] = useState([]);
  const [storeCategory, setStoreCategory] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [storeBanners, setStoreBanners] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.storeview,
      {
        store_id: sid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("res6666", res, {
        store_id: sid,
      });
      if (res.data.data) {
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
      },
    });
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container ">
        <form className="nosubmit " onSubmit={(e) => handleKeyDown(e)}>
          <span>
            {" "}
            <input
              className="nosubmit1"
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              onKeyDown={handleKeyDown}
              placeholder="Search"
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.push({
                  pathname: "/store/search",
                  query: {
                    search: searchInput,
                  },
                })
              }
            >
              {/* <img
                src="/images/store/Fil-icon.png"
                className="filters-icon"
              ></img> */}
              search
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
                <Button className="carousel-arrow" icon={<LeftOutlined />} />
              }
              nextArrow={
                <Button className="carousel-arrow" icon={<RightOutlined />} />
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
      </div>
      <MobileFooter />
    </div>
  );
}

export default StoreDetailPage;
