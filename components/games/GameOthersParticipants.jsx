import React from "react";
import { Fragment } from "react";

function GameOthersParticipants() {
  return (
    <Fragment>
      <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Participants</h5>
      <div class="route d-flex ">
        <img
          className="rounded-circle default-avatar member-overlap-item"
          style={{ objectFit: "cover" }}
          src="../images/tournament/soccer-players-action-professional-stadium 2.png"
        ></img>
        <img
          className="rounded-circle default-avatar member-overlap-item"
          style={{ objectFit: "cover" }}
          src="../images/tournament/soccer-players-action-professional-stadium 2.png"
        ></img>
        <img
          className="rounded-circle default-avatar member-overlap-item"
          style={{ objectFit: "cover" }}
          src="../images/tournament/soccer-players-action-professional-stadium 2.png"
        ></img>
        <img
          className="rounded-circle default-avatar member-overlap-item"
          style={{ objectFit: "cover" }}
          src="../images/tournament/soccer-players-action-professional-stadium 2.png"
        ></img>
        <span className="mx-4" style={{ color: "#959595" }}>
          +7 more participants
        </span>{" "}
      </div>
    </Fragment>
  );
}

export default GameOthersParticipants;
