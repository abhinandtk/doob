import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import OrderProductCard from "../OrderProductCard";
import moment from "moment";
function MyOrders() {
  const [showItems, setShowItems] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  Axios.post(
    apis.orderList,
    {
      offset: "",
    },
    {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }
  ).then((res) => {
    setOrdersList(res.data.data);
    console.log("ordeeeeeeeeeeeeers", res);
  });

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
        <h5 className="mt-4 ms-4">Order History</h5>
        {ordersList.map((item, index) => {
          return (
            <div key={index}>
              <p className="mx-auto order-code ">#{item.order_id_m}</p>
              <hr className="mx-auto" style={{ width: "90%" }}></hr>
              <div
                className="p-2 mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span style={{ color: "#959595" }}>Order Date</span>
                <span>{moment(item.order_date).format("DD-MM-YYYY")}</span>
              </div>
              <div
                className="p-2 mt-2 mx-auto d-flex justify-content-between align-items-center"
                style={{
                  background: "#eeeeee",
                  borderRadius: "10px",
                  width: "90%",
                }}
              >
                <span style={{ color: "#959595" }}>Price</span>
                <span>{item.order_total} KD</span>
              </div>
              <div
                className="p-2   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span style={{ color: "#959595" }}>Payment Mode</span>
                <span>{item.mode}</span>
              </div>
              <div
                className="p-2  mx-auto d-flex justify-content-between align-items-center"
                style={{
                  background: "#eeeeee",
                  borderRadius: "10px",
                  width: "90%",
                }}
              >
                <span style={{ color: "#959595" }}>Payment Status</span>
                <span style={{ color: "#FF640D" }}>{item.payment_status}</span>
              </div>

              <div
                className="p-2   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span style={{ color: "#959595" }}>Order Status</span>
                <span style={{ color: "#FF640D" }}>{item.order_status}</span>
              </div>
              <div
                className="p-2 mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
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

              {/* <div
                className="   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <p className="mx-2" style={{ borderBottom: "1px solid black" }}>
                  Download Invoice
                </p>
              </div> */}
              <br></br>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default MyOrders;
