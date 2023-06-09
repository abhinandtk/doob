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
import React, { useState } from "react";
import ShopPagesSideBar from "../pages/ShopPagesSideBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";

function OfferManagement() {
  const router = useRouter();

  const labels = Labels();

  const [listOffers, setListOffers] = useState([]);

  useEffect(() => {
    Axios.post(apis.listOffers_ad, null, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setListOffers(res.data.data);
      console.log("resall", res);
    });
  }, []);
  const deleteOfferHandler = (slug) => {
    Axios.delete(apis.deleteOffer, {
      data: {
        offer_slug: slug,
      },
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      console.log("resdelee", res);
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
          description: `${labels["Offer deleted successfully"]}`,
        });
      }
    });
  };

  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Offer Products
        </h6>

        <div className="my-4 mx-4 ">
          <div className="clearfix">
            <p className="order-codes">&nbsp;</p>{" "}
            <button
              onClick={() => router.push("/shop/add-offers")}
              type="button"
              className="Add2-btn"
            >
              {" "}
              Add{" "}
            </button>
            <br></br>
            {listOffers.length > 0 &&
              listOffers.map((item, index) => (
                <div key={index}>
                  <p className="order-codes">{item.offer_name}</p>{" "}
                  <span
                    onClick={() => deleteOfferHandler(item.slug_offer)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      href="#"
                      src="/images/store/trash.png"
                      className="edit-offer-list"
                    ></img>{" "}
                  </span>
                  <span>
                    <img
                      href="#"
                      src="/images/store/Edit copy.png"
                      className="edit-offer-list mx-4"
                    ></img>{" "}
                  </span>
                  <br></br>
                  {item.product_varient.map((pro, index_) => (
                    <p key={index_} className="foot-ball-small">
                      {pro.product_name}&nbsp;{pro.Varient_Values}&nbsp;
                      {pro.multivarient_values}
                    </p>
                  ))}{" "}
                  <br></br>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferManagement;
