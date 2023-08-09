import RankTabContent from "@/components/tournament/homepage/RankTabContent";
import TournamentTabContent from "@/components/tournament/homepage/TournamentTabContent";
import "bootstrap-icons/font/bootstrap-icons.css";
import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
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
function TournamentHomePage() {
  const { t } = useTranslation();
  const [liveTourData, setLiveTourData] = useState([]);
  const [rankData, setRankData] = useState([]);
  const [activeTab, setActiveTab] = useState("tournaments");
  useEffect(() => {
    Axios.get(apis.tournamentHome, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setLiveTourData(res.data.data.live_tournaments);
      setRankData(res.data.data.ranks);
      console.log("ddddddata", res.data.data.setLiveTourData);
    });
  }, []);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <div className="top-head-tour dark-theme-color">
          <h5 className=" my-4" style={{ fontWeight: "600" }}>
            {t("Tournaments")}
          </h5>
          <div className="topnav">
            <span
              onClick={() => setActiveTab("tournaments")}
              className={`${
                activeTab === "tournaments" ? "active" : ""
              } dark-theme-color`}
              style={{ cursor: "pointer" }}
            >
              {t("Tournaments")}
            </span>
            <span
              onClick={() => setActiveTab("ranks")}
              className={`${
                activeTab === "ranks" ? "active" : ""
              } dark-theme-color`}
              style={{ cursor: "pointer" }}
            >
              {t("Ranks")}
            </span>
          </div>
        </div>
        {activeTab === "tournaments" && (
          <TournamentTabContent data={liveTourData} />
        )}
        {activeTab === "ranks" && <RankTabContent data={rankData} />}
      </div>

      <MobileFooter />
    </div>
  );
}

export default TournamentHomePage;
