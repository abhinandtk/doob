import React from "react";
import { Fragment } from "react";

function AmenitiesList() {
  return (
    <Fragment>
      <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Amenities</h5>
      <div className="Amenties">
        <span>
          <span>
            <img src="../images/tournament/shower.png"></img>
          </span>
          <span className="mx-2">Shower</span>
        </span>
        <span className="mx-2">
          <span>
            <img src="../images/tournament/shower.png"></img>
          </span>
          <span className="mx-2">Dressing Room</span>
        </span>
        <span className="mx-2">
          <span>
            <img src="../images/tournament/shower.png"></img>
          </span>
          <span className="mx-2"> Purified Water</span>
        </span>
        <span className="mx-2">
          <span>
            <img src="../images/tournament/shower.png"></img>
          </span>
          <span className="mx-2"> Parking Area</span>
        </span>
        <span className="mx-2">
          <span>
            <img src="../images/tournament/shower.png"></img>
          </span>
          <span className="mx-1"> Food</span>
        </span>
        <span className="mx-1">
          <span>
            <img src="../images/tournament/shower.png"></img>
          </span>
          <span className="mx-1"> Accessibility for disabled</span>
        </span>
      </div>
    </Fragment>
  );
}

export default AmenitiesList;
