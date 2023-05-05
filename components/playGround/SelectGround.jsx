import React from "react";
import { Fragment } from "react";

function SelectGround() {
  return (
    <Fragment>
      <div className="my-4">
        <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Select Ground</h5>
        <div className="group A">
          <button type="button" className=" ground-btn">
            5 A
          </button>
          <button type="button" className=" ground1-btn">
            5 A
          </button>
        </div>
      </div>

      <div className="card Grounds">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-6">
              <h5 style={{ fontWeight: "600" }}>Date</h5>
              <div className=" d-flex   ground-customer">
                <p style={{ marginTop: "12px", marginLeft: "12px" }}>
                  04-02-2023
                </p>
              </div>
              <h5
                className="my-4"
                style={{ fontSize: "15px", fontWeight: "700" }}
              >
                Available time slots
              </h5>
              <div className="Available-slot">
                <div className=" d-flex  time-slot1">
                  <p style={{ marginTop: "13px", marginLeft: "23px" }}>
                    8.00 AM - 10.00 AM{" "}
                  </p>
                </div>
                <div className=" d-flex  time-slot2 mx-3">
                  <p style={{ marginTop: "13px", marginLeft: "20px" }}>
                    8.00 AM - 10.00 AM{" "}
                  </p>
                </div>
                <br></br>

                <div className=" d-flex  time-slot3 my-2">
                  <p style={{ marginTop: "13px", marginLeft: "23px" }}>
                    8.00 AM - 10.00 AM{" "}
                  </p>
                </div>
                <div className=" d-flex  time-slot4 mx-3 my-2">
                  <p style={{ marginTop: "13px", marginLeft: "20px" }}>
                    8.00 AM - 10.00 AM{" "}
                  </p>
                </div>

                <br></br>

                <div className=" d-flex  time-slot5 ">
                  <p style={{ marginTop: "13px", marginLeft: "23px" }}>
                    8.00 AM - 10.00 AM{" "}
                  </p>
                </div>
                <div className=" d-flex  time-slot6 mx-3 ">
                  <p style={{ marginTop: "13px", marginLeft: "20px" }}>
                    18.00 AM - 10.00 AM{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="">
                <img
                  src="../images/tournament/playgrounds.png"
                  className="ground-img"
                ></img>
                <p className="img-text">5 A</p>
                <button type="button" className=" image-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SelectGround;
