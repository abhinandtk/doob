import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSlots } from "@/Redux/playGroundCart";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
function SelectGround({ details }) {
  const router = useRouter();
  const inputData = router.query;
  const labels = Labels();

  const { selectedSlots } = useSelector((state) => state.slot);
  const dispatch = useDispatch();
  console.log("sloooooot777777777", inputData.date);

  const [date, setDate] = useState(inputData.date);
  console.log("deeeeee", date);

  const handleSlotClick = (slotId) => {
    dispatch(selectSlots({ slotId }));
    console.log("checkkkkkkkkkkkkkkkkk");
  };

  const addTocartHandler = () => {
    console.log("inpuuuuuuuuuuuut", selectedSlots, inputData);
    Axios.post(
      apis.playCart,
      {
        time_slots: selectedSlots,
        stadium_name: inputData.stadium_id,
        amount: "50",
        slot_type: "static slot",
        game: inputData.sports_id ? inputData.sports_id :'1',
        date: date,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
          description: `${labels["Slot Added"]}`,
        });
      } else if (res.data.status === 0) {
        notification.error({
          messsage: constants.Error,
          description: `${labels["Book one stadium"]}`,
        });
      }
      console.log("success add to cart", res);
    });
  };
  return (
    <Fragment>
      <div className="card Grounds">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-6">
              <h5 style={{ fontWeight: "600" }}>Date</h5>
              <div className=" d-flex   ground-customer">
                <input
                  type="date"
                  className="form-control p-2"
                  style={{
                    border: "0px",
                    background: "#eeeeee",
                    color: "#959595",
                  }}
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <h5
                className="my-4"
                style={{ fontSize: "15px", fontWeight: "700" }}
              >
                Available time slots
              </h5>
              <div className="Available-slot">
                {details.timeslot && details.timeslot.length > 0 ? (
                  details.timeslot.map((item, index) => (
                    <div
                      key={index}
                      className={`d-flex my-2 mx-2  ${
                        selectedSlots.includes(item.id)
                          ? "time-slot3"
                          : item.is_booked
                          ? "time-slot1"
                          : "time-slot2"
                      } `}
                      onClick={() => {
                        !item.is_booked && handleSlotClick(item.id);
                      }}
                    >
                      <p style={{ marginTop: "13px", marginLeft: "23px" }}>
                        {moment(item.start_time, "hh:mm:ss").format("hh:mm A")}-
                        {moment(item.end_time, "hh:mm:ss").format("hh:mm A")}
                      </p>
                    </div>
                  ))
                ) : (
                  <>no time slot available</>
                )}
              </div>
            </div>
            <button
              onClick={addTocartHandler}
              type="button"
              className=" image-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SelectGround;
