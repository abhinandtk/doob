import moment from "moment";
import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useRouter } from "next/router";
function GroundCartItems({ data }) {
  console.log("groundCart", data);

  const labels = Labels();
  const router = useRouter();
  const checkoutPlaygroundHandler = () => {
    Axios.post(apis.playgroundCheckout, null, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          messsage: constants.Success, 
          description: `${labels["Checkout Successfully"]}`,
        });
        router.push({
          pathname: "/play-ground/page/booking-success",
          query: { booking_id: res.data.data.booking_id },
        });
      }

      console.log("rescheckout", res);
    });
  };
  return (
    <Fragment>
      {data &&
        data.map((item, index) => (
          <div key={index} className="col-md-6">
            <div className="clearfix numbers">
              <h5 className="float-start">Slots</h5>
              <p className="float-end">Total&nbsp;{item.cart_count}&nbsp;items</p>
            </div> 
            {item.time_slots.map((slot, index_) => (
              <div key={index_} className="card carts1 my-3">
                <div className="card-body cart-info p-4">
                  <div className="cart-location1">
                    <img
                      src="/images/tournament/playgrounds.png"
                      className="carts-img"
                    ></img>
                    <div className="clearfix cancel">
                      <div className="float-start cancel1">
                        <p>{item.date}</p>
                        <p>
                          {" "} 
                          {moment(slot.start_time, "hh:mm:ss").format(
                            "hh:mm A"
                          )}{" "} 
                          -{" "}
                          {moment(slot.end_time, "hh:mm:ss").format("hh:mm A")}
                        </p>
                      </div>
                      <div className="float-end trashs">
                        <img src="/images/store/trash.png"></img>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix my-1 sections">
                    {/* <p className="carts-group float-start">Ground A B</p> */}
                    <h5 className="float-end" style={{ fontWeight: "600" }}>
                      {item.stadium_name[0].amount}
                    </h5>
                  </div>
                </div>
              </div>
            ))}

            <div className="clearfix amounts">
              <p className="float-start">Total Price</p>
              <h5 className="float-end" style={{ fontSize: "16px" }}>
                {item.amount}
              </h5>
              <button
                onClick={() => checkoutPlaygroundHandler()}
                type="button"
                className=" checks-btn"
              >
                Check out
              </button>
            </div>
          </div>
        ))}
    </Fragment>
  );
}

export default GroundCartItems;
