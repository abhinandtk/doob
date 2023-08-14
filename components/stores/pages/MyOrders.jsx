import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import OrderProductCard from "../OrderProductCard";
import moment from "moment";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
function MyOrders() {
  const { t } = useTranslation();
  const [showItems, setShowItems] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [ordersList, setOrdersList] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  useEffect(() => {
    const apiPaginationUrl = `${apis.orderList}?page=${page}`;
    Axios.post(
      apiPaginationUrl,
      {
        offset: "",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setLoadMore(!!res.data.next);
      if (page === 1) {
        setOrdersList(res.data.data);
      } else {
        setOrdersList((prev) => [...prev, ...res.data.data]);
      }
      console.log("ordeeeeeeeeeeeeers", res);
    });
  }, [page]);
  console.log("ordeeeeeeeeeeeeers878", loadMore);

  const toggleOrderItem = (index) => {
    if (expandedItemIndex === index) {
      setExpandedItemIndex(null);
    } else {
      setExpandedItemIndex(index);
    }
  };

  return (
    <Fragment>
      <div class="content-topic ">
        <h5 className="mt-4 ms-4 dark-theme-color">Order History</h5>
        {ordersList.map((item, index) => {
          return (
            <div key={index} className="dark-theme-color">
              <p className="mx-auto order-code dark-theme-color">
                #{item.order_id_m}
              </p>
              <hr className="mx-auto" style={{ width: "90%" }}></hr>
              <div
                className="p-2 mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span style={{ color: "#959595" }}>{t("Order Date")}</span>
                <span>{moment(item.order_date).format("DD-MM-YYYY")}</span>
              </div>
              <div className="order-list-alt p-2 mt-2 mx-auto d-flex justify-content-between align-items-center">
                <span style={{ color: "#959595" }}>{t("Price")}</span>
                <span>{item.order_total} KD</span>
              </div>
              <div
                className="p-2 mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span style={{ color: "#959595" }}>{t("Payment Mode")}</span>
                <span>{item.mode}</span>
              </div>
              <div className="order-list-alt p-2 mx-auto d-flex justify-content-between align-items-center">
                <span style={{ color: "#959595" }}>{t("Payment Status")}</span>
                <span
                  style={{
                    color:
                      item.payment_status === "Received"
                        ? "#17A803"
                        : "#FF640D",
                  }}
                >
                  {item.payment_status}
                </span>
              </div>

              <div
                className="p-2   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span style={{ color: "#959595" }}>{t("Order Status")}</span>
                <span
                  style={{
                    color:
                      item.order_status === "Delivered" ? "#17A803" : "#FF640D",
                  }}
                >
                  {item.order_status}
                </span>
              </div>
              <div
                className="order-list-alt p-2 mx-auto d-flex justify-content-between align-items-center"
                onClick={() => toggleOrderItem(index)}
              >
                <span style={{ color: "#959595" }}>Items</span>
                {expandedItemIndex === index ? (
                  <i className="bi bi-chevron-up "></i>
                ) : (
                  <i className="bi bi-chevron-down "></i>
                )}
              </div>
              {expandedItemIndex === index && (
                <OrderProductCard products={item.products} />
              )}

              <div
                className="   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <a
                  className="mx-2"
                  href={`${constants.port}/store/Print_invoice/${item.order_id_m}`}
                  style={{
                    borderBottom: "1px solid black",
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                  download
                >
                  {t("Download Invoice")}
                </a>
              </div>
              <br></br>
            </div>
          );
        })}
        {loadMore && (
          <p
            onClick={() => setPage((prev) => prev + 1)}
            className="dark-theme-color my-3"
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            {t("Load More")}
          </p>
        )}
      </div>
    </Fragment>
  );
}

export default MyOrders;
