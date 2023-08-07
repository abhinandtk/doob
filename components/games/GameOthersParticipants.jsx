import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";

function GameOthersParticipants({ participants }) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <h5 style={{ fontWeight: "700", fontSize: "15px" }}>
        {t("Participants")}
      </h5>
      <div class="route d-flex ">
        {participants.map((item, index) => (
          <img
            key={index}
            className="rounded-circle default-avatar member-overlap-item"
            style={{ objectFit: "cover" }}
            src={
              item.user__userdetail__image
                ? `${constants.port}/media/${item.user__userdetail__image}`
                : "/images/accounts/user_default.png"
            }
          ></img>
        ))}
        <span className="mx-4" style={{ color: "#959595" }}>
          {participants.participants_total_count - 4 > 0
            ? `${participants.participants_total_count - 4} more participants`
            : ""}
        </span>{" "}
      </div>
    </Fragment>
  );
}

export default GameOthersParticipants;
