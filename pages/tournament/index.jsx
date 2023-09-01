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
import Login from "@/components/user/Login";
import { useRouter } from "next/router";
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
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    let headers = {};
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      headers = {
        Authorization: `Token ${constants.token_id}`,
      };
    }
    Axios.get(apis.tournamentHome, {
      headers,
    }).then((res) => {
      setLiveTourData(res.data.data.live_tournaments);
      setRankData(res.data.data.ranks);
      console.log("ddddddata", res.data.data.setLiveTourData);
    });
  }, []);
  const rankTabHandler = () => {
    const isAuthenticated = constants.token_id;
    if (isAuthenticated) {
      setActiveTab("ranks");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="tour-container">
        <div style={{ direction: locale === 'ar' ? "rtl" : "ltr" }}>
          <div className="top-head-tour dark-theme-color">
            <h5 className=" my-4" style={{ fontWeight: "600" }}>
              {t("Tournaments")}
            </h5>
            <div className="topnav">
              <span
                onClick={() => setActiveTab("tournaments")}
                className={`${activeTab === "tournaments" ? "active" : ""
                  } dark-theme-color`}
                style={{ cursor: "pointer" }}
              >
                {t("Tournaments")}
              </span>
              <span
                onClick={() => rankTabHandler()}
                className={`${activeTab === "ranks" ? "active" : ""
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
      </div>

      <MobileFooter />
    </div>
  );
}

export default TournamentHomePage;
