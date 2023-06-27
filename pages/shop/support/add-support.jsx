import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import Axios from "axios";
import { useEffect } from "react";

import { Button } from "react-bootstrap";
import { Modal, Select, notification } from "antd";
import { Fragment } from "react";
import MobileFooter from "@/components/shared/MobileFooter";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import { useRouter } from "next/router";
import { Labels } from "@/public/data/my-constants/Labels";
const { Option } = Select;
function SupportPage() {
  const [supportList, setSupportList] = useState([]);
  const router = useRouter();
  const labels = Labels();
  const [formData, setFormData] = useState({
    description: "",
    category: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData({ ...newFormData });
  };
  const submitHandler = (e) => {
    console.log("uuuuuuu", formData);
    e.preventDefault();
    Axios.post(
      apis.createSupport,
      {
        description: formData.description,
        category: formData.category,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        router.back()
        notification.success({
          message: constants.Success,
          description: `${labels["Support added"]}`,
        });
      } else {
        notification.error({
          message: constants.Error,
          description: res.data.message_en,
        });
      }
      console.log("responsert", res);
    });
  };
  return (
    <Fragment>
      <MainHeader title="Doob" />
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
                Add Support
              </h6>

              <div className="my-4 mx-4 ">
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="form-group my-2">
                    <label for="exampleFormControlInput1">Description</label>
                    <input
                      type="text"
                      class="form-control p-2"
                      style={{
                        border: "0px",
                        background: "#eeeeee",
                        color: "grey",
                      }}
                      id="description"
                      onChange={(e) => handleChange(e)}
                      value={formData.description}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label for="exampleFormControlInput1">Category</label>
                    <input
                      type="text"
                      class="form-control p-2"
                      style={{
                        border: "0px",
                        background: "#eeeeee",
                        color: "grey",
                      }}
                      id="category"
                      onChange={(e) => handleChange(e)}
                      value={formData.category}
                    />
                  </div>

                  <div className="product-submit my-3">
                    <button type="submit" className="submit-cart-btn">
                      Submit
                    </button>
                    <button
                      onClick={() => router.back()}
                      type="button"
                      className="sub-cart-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default SupportPage;
