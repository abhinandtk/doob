import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import { Button } from "react-bootstrap";

function store() {
  
  return (
    <div>
      
      <div className="tour-container">
        <div className="Bottoms">
          <PlayGroundSideBar />

          <div className="play-topic  ">
            <div className="bottoms">
              <h6
                className=" mx-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Playground
              </h6>
              <Button type="submit" className="order1-btn ">
                
                Add Playground
              </Button>
              <div className="my-5">
              <div
                className="   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <p style={{ fontWeight: "500" }}>Muhammed Al-Hamad Stadium</p>
                <button className="playedit-btn mb-2">Edit</button>
              </div>
              <hr
                className="mx-auto "
                style={{ width: "90%", marginTop: "-2px" }}
              ></hr>
              <div className=" imx  d-flex justify-content-between align-items-center">
                <img
                  src="../images/store/soccer-players-action-professional-stadium copy.jpg"
                  style={{ width: "82px", height: "82px" }}
                ></img>
              </div>
              <br></br>
              <div
                className="p-2  mx-auto d-flex justify-content-between align-items-center"
                style={{
                  background: "#eeeeee",
                  borderRadius: "10px",
                  width: "90%",
                }}
              >
                <span>Location</span>
                <span>Hawally</span>
              </div>
              <div
                className="p-2   mx-auto d-flex justify-content-between align-items-center"
                style={{ width: "90%" }}
              >
                <span>City</span>
                <span>Kuwait</span>
              </div>
              <div
                className="p-2  mx-auto d-flex justify-content-between align-items-center"
                style={{
                  background: "#eeeeee",
                  borderRadius: "10px",
                  width: "90%",
                }}
              >
                <span> Status</span>
                <span style={{ color: "#17A803" }}>Active</span>
              </div>
              <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default store;
