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
import MobileFooter from "@/components/shared/MobileFooter";
const { Option } = Select;
function AdminAllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

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
  const showUpdateHandler = (id, pay, order) => {
    setPaymentStatus(pay);
    setOrderStatus(order);
    setVisible(true);
    setOrderId(id);
  };

  const statusUpdateHandler = (e) => {
    console.log("success", orderId, orderStatus);
    e.preventDefault();
    Axios.post(
      apis.changeStatus,
      {
        order_id: orderId,
        order_status: orderStatus,
        order_payment: paymentStatus,
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
  };

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container1">
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Update Status"
          footer={
            <Button
              style={{ backgroundColor: "#17A803" }}
              key="submit"
              type="primary"
              onClick={(e) => statusUpdateHandler(e)}
            >
              Submit
            </Button>
          }
          // footer={[
          //   <Button
          //     key="submit"
          //     type="submit"
          //     onClick={(e)=>statusUpdateHandler(e)}
          //     className="order-btn"
          //   >
          //     Ok
          //   </Button>,
          //   <Button
          //     key="cancel"
          //     onClick={() => setVisible(false)}
          //     className="order-btn"
          //   >
          //     Cancel
          //   </Button>,
          // ]}
        >
          <div className="form-group my-2">
            <label for="exampleFormControlSelect1">Payment Status</label>
            <select
              placeholder="order stsu"
              className="form-control p-2 "
              style={{
                border: "0px",
                background: "#eeeeee",
                color: "#959595",
              }}
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="" style={{ color: "#959595" }}>
                --Select--
              </option>
              <option value="Pending" style={{ color: "#959595" }}>
                Pending
              </option>
              <option value="Received" style={{ color: "#959595" }}>
                Received
              </option>
            </select>
          </div>
          <div className="form-group my-2">
            <label for="exampleFormControlSelect1">Order Status</label>
            <select
              placeholder="order stsu"
              className="form-control p-2 "
              style={{
                border: "0px",
                background: "#eeeeee",
                color: "#959595",
              }}
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="" style={{ color: "#959595" }}>
                --Select--
              </option>
              <option value="Ordered" style={{ color: "#959595" }}>
                Ordered
              </option>
              <option value="failed" style={{ color: "#959595" }}>
                Failed
              </option>
              <option value="processing" style={{ color: "#959595" }}>
                Processing
              </option>
              <option value="shipped" style={{ color: "#959595" }}>
                Shipped
              </option>
              <option value="out for delivery" style={{ color: "#959595" }}>
                Out for delivery
              </option>
              <option value="delivered" style={{ color: "#959595" }}>
                Delivered
              </option>
              <option value="cancelled" style={{ color: "#959595" }}>
                Cancelled
              </option>
            </select>
          </div>
        </Modal>
        <div className="Bottom">
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
                      className="order-code pode "
                      style={{ fontWeight: "500" }}
                    >
                      #{item.order_id_m}
                      <span>
                        <Button
                          onClick={() =>
                            showUpdateHandler(
                              item.order_id_m,
                              item.payment_status,
                              item.order_status
                            )
                          }
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
                      <span className="address-admin"> {item.address} </span>
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
                      <span> {item.order_total} KD </span>
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
                        Download Invoice
                      </a>
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
      <MobileFooter />
    </Fragment>
  );
}

export default AdminAllOrders;
