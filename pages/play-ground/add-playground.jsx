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
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";

function AddPlaygroundPage() {

  const labels =Labels()
  const handlePlaygroundForm = (data, game, amenity, slot) => {
   
    const formData = new FormData();
    formData.append("stadium_name", data.name);
    formData.append("city", data.city);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("description_ar", data.description_ar);
    formData.append("google_map_location_field", data.gmap);
    formData.append("opening_time", data.opening);
    formData.append("closing_time", data.closing);
    formData.append("images", data.image);
    game.map((value) => {
      formData.append("game", value);
    });
    amenity.map((value) => {
      console.log('ami67',value)
      formData.append("amnities", value);
    });
    slot.map((time,index)=>{
      formData.append(`timeslot[${index}]start_time`, time.start_time);
      formData.append(`timeslot[${index}]end_time`, time.end_time);
    })
    Axios.post(
      apis.addPlayground,
      formData,
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if(res.data.status == 1){
        notification.success({
          message:constants.Success,
          description:`${labels['PlayGround added']}`
        })
      }
      
      console.log("success4444444444444444444444", res);
    });
  };

  return (
    <div>
      <div className="tour-container">
        <div className="Bottom">
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
