import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import moment from "moment";
import { useTranslation } from "next-i18next";
function StockPage() {
  const { t } = useTranslation();
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    Axios.get(apis.stockApi, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("res", res);
      setStockData(res.data.data);
    });
  }, []);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="stock" />

          <div class="content-topics ">
            <div className="bottom">
              <h6
                className="dark-theme-color-grw ms-4 mb-4"
                style={{ fontWeight: "700" }}
              >
                {t("Stock")}
              </h6>
              <div className="my-1 mx-4 ">
                <div className="customer-sale">
                  <div className="report-section">
                    <div>Product</div>

                    <div>stock</div>
                  </div>
                  {stockData.map((item, index) => (
                    <div
                      key={index}
                      className="input-theme-prod d-flex justify-content-between  customer my-3"
                    >
                      <span className="sales-report-name">
                        {item.variant_name}&nbsp;{item.varient_value}&nbsp;
                        {item.multivarient}
                      </span>
                      <span className="sales-order-price">{item.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default StockPage;
