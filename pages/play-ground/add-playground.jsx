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
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
import PlayGroundsForm from "@/components/playGround/PlayGroundsForm";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";

function AddPlaygroundPage() {
  const handlePlaygroundForm = (data, game, amenity, slot) => {
    console.log("dataaaaaaaaaaaaa546", data);
    console.log("gameeeeeeee", game);
    console.log("amenityyyyyyyyyyy", amenity);
    console.log("slooooot", slot);
    // const formData = new FormData();
    // formData.append("stadium_name", data.name);
    // formData.append("city", data.city);
    // formData.append("location", data.location);
    // formData.append("description", data.description);
    // formData.append("google_map_location_field", data.gmap);
    // formData.append("opening_time", data.opening);
    // formData.append("closing_time", data.closing);
    // formData.append("images", data.image);
    // game.map((value) => {
    //   formData.append("game[]", value);
    // });
    // amenity.map((value) => {
    //   formData.append("game[]", value);
    // });
    // formData.append("timeslot[0]start_time", "09:00");
    // formData.append("timeslot[0]end_time", "10:00");
    let formdata = new FormData();
    formdata.append("amount", "20");
    formdata.append("timeslot[0]start_time", "09:00:00");
    formdata.append("timeslot[0]end_time", "11:00:00");
    formdata.append("game", "1");
    formdata.append("amnities", "2");
    formdata.append("description", "fgbgfn etgbr rh rt rtghrth rth th yh");
    formdata.append("location", "calicut");
    formdata.append("city", "1");
    formdata.append("stadium_name", "abc stadium");
    formdata.append("amnities", "1");
    formdata.append("game", "2");
    formdata.append("opening_time", "09:00:00");
    formdata.append("closing_time", "23:00:00");
    formdata.append("google_map_location_field", "vfdv");
    formdata.append("images", data.image)
      

    Axios.post(
      apis.addPlayground,
      formdata,
      // {
      //   stadium_name: data.name,
      //   city: data.city,
      //   location: data.location,
      //   description: data.description,
      //   google_map_location_field: data.gmap,
      //   opening_time: data.opening,
      //   closing_time: data.closing,
      //   images: data.image,
      //   game: [1,2],
      //   amnities: [1,2],
      //   "timeslot[0]start_time": "09:00",
      //   "timeslot[0]end_time": "10:00",
      // },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("success4444444444444444444444", res);
    });
  };

  return (
    <div>
      <div className="store-container">
        <div className="bottom">
          <PlayGroundSideBar />

          <div class="play-topic  ">
            <div className="bottoms">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Add Playground
              </h6>

              <div className="my-4 mx-4 ">
                <h6 style={{ fontSize: "14px", fontWeight: "700" }}>
                  Basic Details
                </h6>
                <PlayGroundsForm handlePlaygroundForm={handlePlaygroundForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlaygroundPage;
