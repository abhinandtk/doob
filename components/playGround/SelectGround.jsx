import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedSlots, selectSlots } from "@/Redux/playGroundCart";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import moment from "moment";
import { Button, Modal, notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { toggle } from "@/Redux/updateNavbar";
import { useTranslation } from "next-i18next";

function SelectGround({ details, setSuccess, setDateSelected }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const inputData = router.query;
  const labels = Labels();

  const { selectedSlots } = useSelector((state) => state.slot);
  const dispatch = useDispatch();

  const [date, setDate] = useState(
    inputData.date
      ? moment(inputData.date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );
  const [gameId, setGameId] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSlotClick = (slotId) => {
    dispatch(selectSlots({ slotId }));
  };

  const addTocartHandler = () => {
    // if (inputData.sports_id || gameId) {
    if (selectedSlots.length >= 1) {
      Axios.post(
        apis.playCart,
        {
          time_slots: selectedSlots,
          stadium_name: inputData.stadium_id,
          amount: details.amount,
          slot_type: "static slot",
          game: inputData.sports_id ? inputData.sports_id : details.game[0].id,
          date: date,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        
        dispatch(toggle());
        dispatch(resetSelectedSlots());
        if (res.data.status === 1) {
          notification.success({
            message: t("Success"),
            description: `${labels["Slot Added"]}`,
          });
        } else if (res.data.status === 0) {
          notification.error({
            messsage: t("Error"),
            description: `${labels["Book one stadium"]}`,
          });
        }
      });
    } else {
      notification.info({
        messsage: t("Info"),
        description: `${labels["Please select a slot"]}`,
      });
    }
    // } else {
    //   setVisible(true);
    // }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateSelected(e.target.value);
    // dispatch(selectSlots([]));
  };
  return (
    <Fragment>
      {/* <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title={t("Please select game")}
        className="game-choose1"
        footer={
          <Button onClick={() => setVisible(false)} key="submit" type="primary">
            Select
          </Button>
        }
      >
        <div className="form-group my-2">
          <label for="exampleFormControlSelect1">{t("Games")}</label>
          <select
            placeholder="order stsu"
            className="form-control p-2 "
            style={{
              border: "0px",
              background: "#eeeeee",
              color: "#959595",
            }}
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          >
            <option value="" style={{ color: "#959595" }}>
              --Select--
            </option>
            {details.game &&
              details.game.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  style={{ color: "#959595" }}
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
      </Modal> */}
      <div className="card Grounds">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-6">
              <h5 style={{ fontWeight: "600" }}>{t("Date")}</h5>
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
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleDateChange}
                />
              </div>
              <h5
                className="my-4"
                style={{ fontSize: "15px", fontWeight: "700" }}
              >
                {t("Available time slots")}
              </h5>
              <div className="Available-slot">
                {details.timeslot !== undefined ? (
                  details.timeslot && details.timeslot.length > 0 ? (
                    details.timeslot.map((item, index) => (
                      <div
                        key={index}
                        className={`d-flex my-2 mx-2  ${
                          item.is_booked
                            ? "time-slot1"
                            : selectedSlots.includes(item.id)
                            ? "time-slot3"
                            : "time-slot2"
                        } `}
                        onClick={() => {
                          !item.is_booked && handleSlotClick(item.id);
                        }}
                      >
                        {/* <p style={{ marginTop: "13px", marginLeft: "23px" }}> */}

                        <p
                          style={{
                            marginTop: "13px",
                            marginLeft: locale === "en" ? "23px" : "",
                            marginRight: locale === "ar" ? "23px" : "",
                            direction: locale === "ar" ? "ltr" : "",
                          }}
                        >
                          {moment(item.start_time, "hh:mm:ss").format(
                            "hh:mm A"
                          )}
                          -{moment(item.end_time, "hh:mm:ss").format("hh:mm A")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <>no time slot available</>
                  )
                ) : null}
              </div>
            </div>
            <button
              onClick={addTocartHandler}
              type="button"
              className=" image-btn"
            >
              {t("Add to Cart")}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SelectGround;
