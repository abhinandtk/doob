import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Axios from "axios";
import { useEffect } from "react";

import { Button } from "react-bootstrap";
import { Modal, Select } from "antd";
import { Fragment } from "react";
import MobileFooter from "@/components/shared/MobileFooter";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
const { Option } = Select;
function SupportPage() {
  const [supportList, setSupportList] = useState([]);
  useEffect(() => {
    Axios.get(apis.supportView, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setSupportList(res.data.data);
    });
  }, []);
  return (
    <Fragment>
      <MainHeader title='Doob'/>
      <MobileHeader />
      <MainSidebarFixed />

      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="support" />

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
                Support
                <span>
                  <Button type="button" className="order-btn ">
                    Add support
                  </Button>
                </span>
              </h6>

              {supportList &&
                supportList.map((item, index) => (
                  <div className="my-3" key={index}>
                    <div
                      className="   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ fontWeight: "500" }}>
                        #{item.ticket_no}
                      </span>
                      <span>{item.status ? "Active" : "Closed"}</span>
                    </div>

                    <hr className="mx-auto" style={{ width: "90%" }}></hr>
                    <div
                      className="p-2 mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>
                        {item.description}
                      </span>
                    </div>

                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>
                        {moment(item.created_at).format("DD-MMM-YYYY")}
                      </span>
                    </div>
                    <div
                      className="p-2   mx-auto d-flex justify-content-between align-items-center"
                      style={{ width: "90%" }}
                    >
                      <span style={{ color: "#959595" }}>
                        
                      </span>
                      <span style={{ color: "#17A803",fontWeight: "500",cursor:"pointer"  }}>
                        View More
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default SupportPage;
