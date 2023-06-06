import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";

function GameOthersParticipants({ participants }) {
  return (
    <Fragment>
      <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Participants</h5>
      <div class="route d-flex ">
        {participants.map((item, index) => (
          <img
            key={index}
            className="rounded-circle default-avatar member-overlap-item"
            style={{ objectFit: "cover" }}
            src={`${constants.port}/media/${item.user__userdetail__image}`}
          ></img>
        ))}
        <span className="mx-4" style={{ color: "#959595" }}>
          {participants.participants_total_count - 4 >0 ?  `${participants.participants_total_count -4} more participants`:'' } 
        </span>{" "}
      </div>
    </Fragment>
  );
}

export default GameOthersParticipants;
