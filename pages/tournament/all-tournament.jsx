import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import TournamentCardDetails from "@/components/tournament/view/TournamentCardDetails";
import React, { Fragment } from "react";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { Labels } from "@/public/data/my-constants/Labels";
import MobileFooter from "@/components/shared/MobileFooter";
import { useTranslation } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AllTournamentPage() {
  const { t } = useTranslation();

  const [tournaments, setTournaments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ongoing");
  const [selectedType, setSelectedType] = useState("ranked");

  useEffect(() => {
    Axios.get(apis.allTournament, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setTournaments(res.data.data);
      console.log("resdata0", res);
    });
  }, []);

  const labels = Labels();

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      {tournaments && (
        <div className="tour-container">
          <div className="top-head-tour">
            <h5 className="dark-theme-color my-4" style={{ fontWeight: "600" }}>
              {t("Tournaments")}
            </h5>
            <div
              className="btn-group mx-1"
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                onClick={() => setSelectedStatus("ongoing")}
                className={`btn btn-outline-secondary ${
                  selectedStatus === "ongoing" ? "match1" : "match2"
                } `}
              >
                {t("Ongoing")}
              </button>
            </div>
            <div
              onClick={() => setSelectedStatus("future")}
              className="btn-group mx-2"
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                className={`btn btn-outline-secondary ${
                  selectedStatus === "future" ? "match1" : "match2"
                } `}
              >
                {t("Future")}
              </button>
            </div>
            <div className="topnav my-2">
              <span
                onClick={() => setSelectedType("ranked")}
                className={`${selectedType === "ranked" ? "active" : ""}`}
              >
                {t("Ranked")}
              </span>
              <span
                className={` ${selectedType === "unranked" ? "active" : ""}`}
                onClick={() => setSelectedType("unranked")}
              >
                {t("Unranked")}
              </span>
            </div>
          </div>
          <br></br>

          {}

          {selectedStatus === "ongoing" ? (
            selectedType === "ranked" ? (
              tournaments.ongoing && tournaments.ongoing.ranked.length >= 1 ? (
                tournaments.ongoing.ranked.map((item, index) => (
                  <TournamentCardDetails key={index} data={item} />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                    padding: "0 20px",
                  }}
                >
                  <p style={{ textAlign: "center", fontWeight: "500" }}>
                    {labels["Tournaments not found"]}
                  </p>
                </div>
              )
            ) : tournaments.ongoing &&
              tournaments.ongoing.unranked.length >= 1 ? (
              tournaments.ongoing.unranked.map((item, index) => (
                <TournamentCardDetails key={index} data={item} />
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  height: "40vh",
                  padding: "0 20px",
                }}
              >
                <p style={{ textAlign: "center", fontWeight: "500" }}>
                  {labels["Tournaments not found"]}
                </p>
              </div>
            )
          ) : selectedType === "ranked" ? (
            tournaments.future && tournaments.future.ranked.length >= 1 ? (
              tournaments.future.ranked.map((item, index) => (
                <TournamentCardDetails key={index} data={item} />
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  height: "40vh",
                  padding: "0 20px",
                }}
              >
                <p style={{ textAlign: "center", fontWeight: "500" }}>
                  {labels["Tournaments not found"]}
                </p>
              </div>
            )
          ) : tournaments.future && tournaments.future.unranked.length >= 1 ? (
            tournaments.future.unranked.map((item, index) => (
              <TournamentCardDetails key={index} data={item} />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                height: "40vh",
                padding: "0 20px",
              }}
            >
              <p style={{ textAlign: "center", fontWeight: "500" }}>
                {labels["Tournaments not found"]}
              </p>
            </div>
          )}
        </div>
      )}
      <MobileFooter />
    </Fragment>
  );
}

export default AllTournamentPage;
