import React from "react";
import { Fragment } from "react";

function GroundCartItems({data}) {
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="clearfix numbers">
          <h5 className="float-start">Slots</h5>
          <p className="float-end">Total 2 items</p>
        </div>
        
        <div class="card carts1 my-3">
          <div class="card-body cart-info p-4">
            <div className="cart-location1">
              <img
                src="../images/tournament/playgrounds.png"
                className="carts-img"
              ></img>
              <div className="clearfix cancel">
                <div className="float-start cancel1">
                  <p>04-02-2023</p>
                  <p>14.00 PM - 3.00 PM </p>
                </div>
                
              </div>
              <div className="float-end trashs">
                  <img src="../images/store/trash.png"></img>
                </div>
            </div>
            
            <div className="clearfix my-1 sections">
              <p className="carts-group float-start">Ground A B</p>
              <h5 className="float-end " style={{ fontWeight: "600" }}>
                5.000 KD
              </h5>
            </div>
          </div>
        </div>

        <div className="clearfix amounts">
          <p className="float-start">Total Price</p>
          <h5 className="float-end" style={{ fontSize: "16px" }}>
            10.000 KD
          </h5>
          <button type="button" className=" checks-btn">
            Check out
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default GroundCartItems;
