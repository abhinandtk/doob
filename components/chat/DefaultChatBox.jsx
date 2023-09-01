import React from "react";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";

function DefaultChatBox() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="rightSides">
        <div className="chatbox">
          <div className="tex-message">
            <img
              src="/images/share.png"
              style={{
                width: "35px",
                height: "35px",
                marginLeft: "115px",
                marginTop: "-5px",
              }}
            ></img>
            <h2
              style={{
                marginLeft: "82px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {t("Send Messages")}
            </h2>
            <p style={{ fontSize: "14px", fontWeight: "400" }}>
              {t("Send Photos and Message to Friend's or Group")}
            </p>
          </div>
          <div className="sent">{t("Send Messages")}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default DefaultChatBox;
