import React from "react";
import { Fragment } from "react";

function GameParticipantsList() {
  return (
    <Fragment>
      <div className="clearfix Invite">
        <h5
          className="float-start"
          style={{ fontWeight: "700", fontSize: "15px" }}
        >
          Description
        </h5>
        <button type="button" className="Join-btn float-end">
          Invite
        </button>
      </div>
      <div className="clearfix players my-4">
        <span>
          <img src="../images/tournament/profiles.png"></img>
          <span className="mx-3">Ahmad Albedaiwi</span>{" "}
        </span>
        <p className="float-end" style={{ color: "#959595" }}>
          Remove
        </p>
      </div>
      <div className="clearfix  players ">
        <span>
          <img src="../images/tournament/profiles.png"></img>
          <span className="mx-3">Ahmad Albedaiwi</span>{" "}
        </span>
        <p className="float-end" style={{ color: "#959595" }}>
          Remove
        </p>
      </div>
      <div className="clearfix players  my-4">
        <span>
          <img src="../images/tournament/profiles.png"></img>
          <span className="mx-3">Ahmad Albedaiwi</span>{" "}
        </span>
        <p className="float-end" style={{ color: "#959595" }}>
          Remove
        </p>
      </div>
      <div className="clearfix players  my-4">
        <span>
          <img src="../images/tournament/profiles.png"></img>
          <span className="mx-3">Ahmad Albedaiwi</span>{" "}
        </span>
        <p className="float-end" style={{ color: "#959595" }}>
          Remove
        </p>
      </div>
      <div className="clearfix players  my-4">
        <span>
          <img src="../images/tournament/profiles.png"></img>
          <span className="mx-3">Ahmad Albedaiwi</span>{" "}
        </span>
        <p className="float-end" style={{ color: "#959595" }}>
          Remove
        </p>
      </div>
      <div className="clearfix players  my-4">
        <span>
          <img src="../images/tournament/profiles.png"></img>
          <span className="mx-3">Ahmad Albedaiwi</span>{" "}
        </span>
        <p className="float-end" style={{ color: "#959595" }}>
          Remove
        </p>
      </div>
      <div className="clearfix players1  my-4">
        <span>
          <img
            src="../images/tournament/profiles.png"
            style={{ opacity: "50%" }}
          ></img>
          <span className="mx-3" style={{ opacity: "50%" }}>
            Ahmad Albedaiwi
          </span>{" "}
        </span>
        <p className="float-end" style={{ color: "#FC4444" }}>
          Removed
        </p>
      </div>
      <div className="clearfix  players1 my-4">
        <span>
          <img
            src="../images/tournament/profiles.png"
            style={{ opacity: "50%" }}
          ></img>
          <span className="mx-3" style={{ opacity: "50%" }}>
            Ahmad Albedaiwi
          </span>{" "}
        </span>
        <p className="float-end" style={{ color: "#FC4444" }}>
          Left
        </p>
      </div>
      <div className="clearfix players  my-4">
        <p className="float-start">
          Share via link<br></br>
          <span>
            https://www.doob.com/bookings/file/3MDEKqi76uQxwkFZaqbl5r/Doob?node-id=282%3A802&t
          </span>
        </p>
        <svg
          width="16"
          className="float-end"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.08079 6.17646C0.427011 5.84957 0.506232 4.89236 1.20485 4.67739L14.0137 0.736219C14.6353 0.544939 15.2176 1.12722 15.0263 1.74888L11.0852 14.5577C10.8702 15.2563 9.91298 15.3355 9.58609 14.6818L6.87177 9.25312C6.79337 9.09633 6.66623 8.96918 6.50943 8.89079L1.08079 6.17646Z"
            stroke="black"
            stroke-width="1.02343"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.8125 8.94988L10.7389 5.02344"
            stroke="black"
            stroke-width="1.02343"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </Fragment>
  );
}

export default GameParticipantsList;
