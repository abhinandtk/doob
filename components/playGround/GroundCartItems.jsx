import moment from "moment";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggle } from "@/Redux/updateNavbar";
import { useTranslation } from "next-i18next";
function GroundCartItems({ data, setSuccess }) {
  const { t } = useTranslation();

  const labels = Labels();
  const router = useRouter();
  const { locale } = router;
  const dispatch = useDispatch();
  const checkoutPlaygroundHandler = () => {
    Axios.post(apis.playgroundCheckout, null, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      dispatch(toggle());
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Checkout Successfully"]}`,
        });
        router.push({
          pathname: "/play-ground/page/booking-success",
          query: {
            booking_id: res.data.data.booking_id,
          },
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }

      console.log("rescheckout", res);
    });
  };

  const removeCartItemHandler = (id) => {
    Axios.post(
      apis.groundRemoveCartItems,
      {
        cart_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      dispatch(toggle());
      if (res.data.status === 1) {
        setSuccess((prev) => !prev);
        notification.success({
          message: t("Success"),
          description: `${labels["Slot removed from cart successfully"]}`,
        });
      }
      console.log("response", res);
    });
  };
  return (
    <Fragment>
      {data && (
        <div
          className={locale === "en" ? "col-md-6 order-1" : "col-md-6 order"}
        >
          <div className="clearfix numbers">
            <h5 className="float-start dark-theme-color">{t("Slots")}</h5>
            <p
              className="float-end dark-theme-color"
              style={{ fontSize: "14px" }}
            >
              {t("Total")}&nbsp;{data.cart_count}&nbsp;{t("items")}
            </p>
          </div>
          {data.cart_details.map((slot, index_) => (
            <div key={index_} className="card carts1 my-3">
              <div className="card-body cart-info p-4">
                <div className="cart-location1">
                  <img
                    src="/images/tournament/playgrounds.png"
                    className="carts-img"
                  ></img>
                  <div className="clearfix cancel">
                    <div className="float-start cancel1">
                      <p>{moment(slot.booking_date).format("DD-MM-YYYY")}</p>
                      <p>
                        {" "}
                        {moment(slot.start_time, "hh:mm:ss").format(
                          "hh:mm A"
                        )}{" "}
                        - {moment(slot.end_time, "hh:mm:ss").format("hh:mm A")}
                      </p>
                    </div>
                    <div
                      className="float-end trashs"
                      onClick={() => removeCartItemHandler(slot.cart_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src="/images/store/trash.png"></img>
                    </div>
                  </div>
                </div>
                <div className="clearfix mst my-1 sections">
                  {/* <p className="carts-group float-start">Ground A B</p> */}
                  <h5 className="float-end" style={{ fontWeight: "600" }}>
                    {slot.stadium_amount}&nbsp;KD
                  </h5>
                </div>
              </div>
            </div>
          ))}

          <div className="clearfix amounts">
            <p className="float-start">{t("Total Price")}</p>
            <h5 className="float-end" style={{ fontSize: "16px" }}>
              {data.total_amount}&nbsp;KD
            </h5>
            <button
              onClick={() => checkoutPlaygroundHandler()}
              type="button"
              className=" checks-btn"
            >
              {t("Check out")}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default GroundCartItems;
