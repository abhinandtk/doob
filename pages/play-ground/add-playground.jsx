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

function AddPlaygroundPage() {
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

                <div class="form-group my-2 ">
                  <label for="exampleFormControlInput1">Name</label>
                  <input
                    type="email"
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div class="form-group my-2">
                  <label for="exampleFormControlInput1">City</label>
                  <input
                    type="email"
                    class="form-control p-2"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="exampleFormControlInput1"
                  />
                </div>

                <label for="exampleFormControlInput1">Location</label>
                <div
                  className="rounded border-0 d-flex w-100 p-2 align-items-center  "
                  style={{ background: "#eeeeee" }}
                >
                  <div className="ms-auto">
                    <i class="bi bi-geo-alt-fill"></i>
                  </div>
                </div>

                <div className="form-group my-2">
                  <label for="exampleFormControlInput1" id="formfile">
                    Image
                  </label>
                  <input
                    type="file"
                    id="formFile"
                    class="form-control p-2 grey"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    placeholder="No file choosen"
                  />
                </div>
                <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                  Choose File
                </h6>
                <div className="slot clearfix   mt-2 ">
                  <span className="float-start ">
                    <img src="../images/tournament/footballs.png"></img>
                    <span className="mx-1">Football</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_1" />
                    <label for="checkbox_1"></label>
                  </div>

                  {/* <input class="form-check-input float-end check" type="checkbox" value="" id="flexCheckDefault"/> */}
                </div>
                <div className="slot clearfix mt-2 ">
                  <span className="float-start " style={{ marginLeft: "-6px" }}>
                    <img src="../images/tournament/Table tennis.png"></img>
                    <span>Padel</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_2" />
                    <label for="checkbox_2"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-2 ">
                  <span className="float-start">
                    <img src="../images/tournament/Basketball.png"></img>
                    <span> Basketball</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_3" />
                    <label for="checkbox_3"></label>
                  </div>
                </div>

                <div className="form-group my-2 ">
                  <label for="exampleFormControlTextarea1">
                    {" "}
                    <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                      Description
                    </h6>
                  </label>
                  <textarea
                    class="form-control"
                    style={{
                      border: "0px",
                      background: "#eeeeee",
                      color: "grey",
                    }}
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>

                <br></br>

                <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                  Amenities
                </h6>
                <div className="slot clearfix ">
                  <span className="float-start">
                    <img src="../images/tournament/shower.png"></img>
                    <span> Shower</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_4" />
                    <label for="checkbox_4"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3">
                  <span className="float-start">
                    <img src="../images/tournament/water.png"></img>
                    <span> Purified Water</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_5" />
                    <label for="checkbox_5"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3 ">
                  <span className="float-start">
                    <img src="../images/tournament/dress.png"></img>
                    <span> Dressing Room</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_6" />
                    <label for="checkbox_6"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3 ">
                  <span className="float-start">
                    <img src="../images/tournament/car.png"></img>
                    <span> Parking Area</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_7" />
                    <label for="checkbox_7"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3 ">
                  <span className="float-start">
                    <img src="../images/tournament/lock.png"></img>
                    <span> Locker</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_8" />
                    <label for="checkbox_8"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3 ">
                  <span className="float-start">
                    <img src="../images/tournament/food.png"></img>
                    <span> Food</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_9" />
                    <label for="checkbox_9"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3 ">
                  <span className="float-start">
                    <img src="../images/tournament/store.png"></img>
                    <span> Store</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_10" />
                    <label for="checkbox_10"></label>
                  </div>
                </div>
                <div className="slot clearfix mt-3 ">
                  <span className="float-start">
                    <img src="../images/tournament/disability.png"></img>
                    <span> Accessibility for disabled</span>
                  </span>
                  <div class="checkbox float-end">
                    <input type="checkbox" id="checkbox_11" />
                    <label for="checkbox_11"></label>
                  </div>
                </div>
                <div className="bottoms">
                  <h6
                    className=" mx-4"
                    style={{ color: "#17a803", fontWeight: "700" }}
                  >
                    Slots
                  </h6>
                  <div className="play clearfix">
                    <div class="example">
                      <label class="radio-button">
                        <input
                          type="radio"
                          class="radio-button__input"
                          id="choice1-1"
                          name="choice1"
                        />
                        <span class="radio-button__control"></span>
                        <span class="radio-button__label">Static Time</span>
                      </label>
                      <br></br>
                      <label class="radio-button">
                        <input
                          type="radio"
                          class="radio-button__input"
                          id="choice1-2"
                          name="choice1"
                        />
                        <span class="radio-button__control"></span>
                        <span class="radio-button__label">Open time</span>
                      </label>
                    </div>
                    <button type="submit" className="open-btn">
                      {" "}
                      Add{" "}
                    </button>
                  </div>
                  <div className="time-slot">
                    <div
                      className="p-3 mx-auto d-flex justify-content-between  times "
                      style={{ width: "90%" }}
                    >
                      <span className="time-slot-name">
                        05:00 PM - 07.00 PM{" "}
                      </span>
                      <span className="time-edit">Edit</span>
                      <span className="time-delete">Delete</span>
                    </div>
                    <div
                      className="p-3 mx-auto d-flex justify-content-between  times1 "
                      style={{ width: "90%" }}
                    >
                      <span className="time-slot-name">
                        05:00 PM - 07.00 PM{" "}
                      </span>
                      <span className="time-edit">Edit</span>
                      <span className="time-delete">Delete</span>
                    </div>
                    <div
                      className="p-3 mx-auto d-flex justify-content-between  times  "
                      style={{ width: "90%" }}
                    >
                      <span className="time-slot-name">
                        05:00 PM - 07.00 PM{" "}
                      </span>
                      <span className="time-edit">Edit</span>
                      <span className="time-delete">Delete</span>
                    </div>
                    <div
                      className="p-3 mx-auto d-flex justify-content-between  times1 "
                      style={{ width: "90%" }}
                    >
                      <span className="time-slot-name">
                        05:00 PM - 07.00 PM{" "}
                      </span>
                      <span className="time-edit">Edit</span>
                      <span className="time-delete">Delete</span>
                    </div>
                    <div
                      className="p-3 mx-auto d-flex justify-content-between  times  "
                      style={{ width: "90%" }}
                    >
                      <span className="time-slot-name">
                        05:00 PM - 07.00 PM{" "}
                      </span>
                      <span className="time-edit">Edit</span>
                      <span className="time-delete">Delete</span>
                    </div>
                    <div
                      className="p-3 mx-auto d-flex justify-content-between  times1 "
                      style={{ width: "90%" }}
                    >
                      <span className="time-slot-name">
                        05:00 PM - 07.00 PM{" "}
                      </span>
                      <span className="time-edit">Edit</span>
                      <span className="time-delete">Delete</span>
                    </div>
                  </div>
                </div>
                <div className="product-submit my-3">
                  <button type="button" className="play-sub-btn">
                    Submit
                  </button>
                  <button type="button" className="play-cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlaygroundPage;
