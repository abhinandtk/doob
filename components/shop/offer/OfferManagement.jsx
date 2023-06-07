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

function OfferManagement() {
  return (
    <div class="content-topics ">
      <div className="bottom">
        <h6 className=" ms-4" style={{ color: "#17a803", fontWeight: "700" }}>
          Offer Products
        </h6>

        <div className="my-4 mx-4 ">
          <div className="clearfix">
            <p className="order-codes">Categories</p>{" "}
            <button type="button" className="Add2-btn">
              {" "}
              Add{" "}
            </button>
            <br></br>
            <p className="foot-ball">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" /> <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <br></br>
            <p className="foot-ball">Tennis</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
            <p className="foot-ball-small">Football</p>{" "}
            <div class="toggle">
              {" "}
              <input placeholder="Active" type="checkbox" />
              <label></label>
              <span>
                <img
                  href="#"
                  src="../images/store/Edit copy.png"
                  className="edit"
                ></img>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferManagement;
