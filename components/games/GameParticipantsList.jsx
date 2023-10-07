import apis from "@/public/data/my-constants/Apis";
import { Input, List, Modal } from "antd";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import { CardImg } from "react-bootstrap";
import constants from "@/public/data/my-constants/Constants";
import GameInviteUser from "./GameInviteUser";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
function GameParticipantsList({ participants, setOnSuccess }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const { gameId } = router.query;
  const { theme } = useTheme();
  const handleShare = () => {
    // e.preventDefault();
    // e.stopPropagation();
    try {
      navigator.share({ url: window.location.href });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const removeHandler = (id) => {
    Axios.post(
      apis.removeUser,
      {
        user_id: [id],
        game_slug: gameId,
        type: "removed",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      console.log("removed success", res);
    });
  };

  return (
    <Fragment>
      <GameInviteUser setOnSuccess={setOnSuccess} />
      {participants.map((item, index) => (
        <div
          key={index}
          className="clearfix players my-4"
          style={{
            opacity: `${
              item.participation_status == 2 || item.participation_status == 5
                ? "50%"
                : ""
            }`,
          }}
        >
          <div className="participants">
            <img
              src={
                item.user__userdetail__image
                  ? `${constants.port}/media/${item.user__userdetail__image}`
                  : "/images/accounts/user_default.png"
              }
              style={{
                height: "45px",
                width: "45px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            ></img>
            <span className="mx-3 participant-name">
              {item.user__userdetail__name}
            </span>
            {item.participation_status == 2 ? (
              <p className="ms-auto removed">{t("Removed")}</p>
            ) : item.participation_status == 5 ? (
              <p className="ms-auto Left-peoples" style={{ color: "#FC4444" }}>
                {t("Left")}
              </p>
            ) : (
              <div className="ms-auto remove" style={{ display: "flex" }}>
                <p className="mx-2">
                  {item.participation_status === 1
                    ? t("Joined")
                    : item.participation_status === 3
                    ? t("Invited")
                    : ""}
                </p>
                <p
                  className="mx-2"
                  onClick={() => removeHandler(item.user_id)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-x" style={{ fontSize: "20px" }} />
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="clearfix players  my-4">
        <p className={locale === "en" ? "float-start" : "float-end"}>
          {t("Share via link")}
          <br></br>
          <span
            className="game-share dark-theme-color"
            style={{ direction: "ltr" }}
          >
            {router.asPath}
          </span>
        </p>
        <span onClick={() => handleShare()} style={{ cursor: "pointer" }}>
          <svg
            width="16"
            className={locale === "en" ? "float-end" : "float-start"}
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.08079 6.17646C0.427011 5.84957 0.506232 4.89236 1.20485 4.67739L14.0137 0.736219C14.6353 0.544939 15.2176 1.12722 15.0263 1.74888L11.0852 14.5577C10.8702 15.2563 9.91298 15.3355 9.58609 14.6818L6.87177 9.25312C6.79337 9.09633 6.66623 8.96918 6.50943 8.89079L1.08079 6.17646Z"
              stroke={theme === "dark" ? "white" : "black"}
              stroke-width="1.02343"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.8125 8.94988L10.7389 5.02344"
              stroke={theme === "dark" ? "white" : "black"}
              stroke-width="1.02343"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </Fragment>
  );
}

export default GameParticipantsList;
