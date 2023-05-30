import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { Button } from "react-bootstrap";
import moment from "moment";
import OrderProductCard from "@/components/stores/OrderProductCard";
import { Modal, Select } from "antd";
import { Fragment } from "react";
const { Option } = Select;
function AdminAllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    Axios.post(
      apis.ordersAdmin,
      {
        offset: "",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setAllOrders(res.data.data);
      console.log("allorders,", res);
    });
  }, [visible]);
  const showUpdateHandler = (id) => {
    setVisible(true);
    setOrderId(id);
  };

  const statusUpdateHandler = (e) => {
    e.preventDefault();
    if (orderStatus !== "" && orderStatus !== "Select an option") {
      Axios.post(
        apis.changeStatus,
        {
          order_id: orderId,
          order_status: orderStatus,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        setVisible(false);
        console.log("success update", res);
      });
    }
  };

  return (
    <Fragment>
      <MainHeader />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container">
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Update Status"
          footer={[
            <Button
              key="submit"
              type="submit"
              onClick={statusUpdateHandler}
              className="order-btn"
            >
              Ok
            </Button>,
            <Button
              key="cancel"
              onClick={() => setVisible(false)}
              className="order-btn"
            >
              Cancel
            </Button>,
          ]}
        >
          <Select
            defaultValue="Select an option"
            style={{ width: "100%" }}
            onChange={setOrderStatus}
            required
          >
            <Option value="Ordered">Ordered</Option>
            <Option value="failed">Failed</Option>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="out for delivery">Out for delivery</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <br></br>
          <br></br>
          <br></br>
        </Modal>
        <div className="bottom">
          <ShopPagesSideBar currentPage="allOrders" />

          <div className="content-topic  ">
            <div className="bottom">
              <h6
                className="All-order"
                style={{
                  color: "#17a803",
                  fontWeight: "700",
                  marginBottom: "30px",
                }}
              >
                All Orders
              </h6>
              {allOrders.length !== 0 ? (
                allOrders.map((item, index) => (
                  <>
                    <p
                      key={index}
                      className="order-code "
                      style={{ fontWeight: "500" }}
                    >
                      #{item.order_id_m}
                      <span style={{ float: "right" }}>
                        <Button
                          onClick={() => showUpdateHandler(item.order_id_m)}
                          type="button"
                          className="order-btn "
                        >
                          Update status
                        </Button>
                      </span>
                    </p>

                    <hr className="mx-auto" style={{ width: "90%" }}></hr>
                    <div
                      class="   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>Customer Name</span>
                      <span>{item.username}</span>
                    </div>
                    <div
                      className="p-2 mt-2 mx-auto d-flex justify-content-between align-items-center"
                      style={{
                        background: "#eeeeee",
                        borderRadius: "10px",
                        width: "90%",
                      }}
                    >
                      <span style={{ color: "#959595" }}>Address</span>
                      <span> {item.address} </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>Order Date</span>
                      <span>
                        {moment(item.order_date).format("DD MMM YYYY")}
                      </span>
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
                      <span> {item.order_total} </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>Payment Mode</span>
                      <span> {item.mode} </span>
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
                      <span style={{ color: "#FF640D" }}>
                        {item.payment_status}
                      </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>Order Status</span>
                      <span style={{ color: "#FF640D" }}>
                        {item.order_status}
                      </span>
                    </div>

                    <OrderProductCard products={item.products} />

                    <div
                      className=" mx-auto d-flex justify-content-between align-items-center "
                      style={{ width: "90%" }}
                    >
                      <p
                        className="mx-2"
                        style={{ borderBottom: "1px solid black" }}
                      >
                        Download Invoice
                      </p>
                    </div>
                  </>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                    padding: "0 20px",
                  }}
                >
                  <p style={{ textAlign: "center", fontWeight: "500" }}>
                    No orders found .......
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminAllOrders;
