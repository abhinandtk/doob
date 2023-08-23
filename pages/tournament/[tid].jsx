import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import Axios from "axios";
import MatchCards from "@/components/tournament/view/MatchCards";
import { Tab, Tabs } from "react-bootstrap";
import { useEffect } from "react";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import apis from "@/public/data/my-constants/Apis";
import TeamsCard from "@/components/tournament/view/TeamsCard";
import TournamentMatches from "@/components/tournament/view/TournamentMatches";
import FixtureView from "@/components/tournament/view/FixtureView";
import MobileFooter from "@/components/shared/MobileFooter";
import DoublesMatchCard from "@/components/tournament/view/DoublesMatchCard";
import DoublesTeamsCard from "@/components/tournament/view/DoublesTeamCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShareToUserChat from "@/components/homepage/social/share/ShareToUserChat";
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function TournamentDetailPage() {
  const { t } = useTranslation();

  const router = useRouter();
  const { tid } = router.query;

  const handleShare = async () => {
    try {
      await navigator.share({ url: window.location.href });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("Home");
  const [homeTabData, setHomeTabData] = useState(null);
  const [teamsTabData, setTeamsTabData] = useState([]);
  const [teamsTempTabData, setTeamsTempTabData] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [matchesTabData, setMatchesTabData] = useState([]);
  const [onSuccess, setOnSuccess] = useState(false);

  // useEffect(() => {
  //   Axios.post(
  //     apis.tournamentDetails,
  //     {
  //       tournament_slug: tid,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Token ${constants.token_id}`,
  //       },
  //     }
  //   ).then((res) => {
  //     if (res.data.data) {
  //       setHomeTabData(res.data.data.home);
  //       setTeamsTabData(res.data.data.teams);
  //       setMatchesTabData(res.data.data.matches);
  //       setTeamsTempTabData(res.data.data.temporary_team);
  //       setAdminList(
  //         res.data.data.home.tournament_details.tournament_admin_name
  //       );
  //     }
  //     console.log("response", res);
  //   });
  // }, [tid, onSuccess]);

  const fetchTournamentDetails = () => {
    Axios.post(
      apis.tournamentDetails,
      {
        tournament_slug: tid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.data) {
        setHomeTabData(res.data.data.home);
        setTeamsTabData(res.data.data.teams);
        setMatchesTabData(res.data.data.matches);
        setTeamsTempTabData(res.data.data.temporary_team);
        setAdminList(
          res.data.data.home.tournament_details.tournament_admin_name
        );
      }
      console.log("response", res);
    });
  };

  useEffect(() => {
    fetchTournamentDetails();

    const interval = setInterval(() => {
      fetchTournamentDetails();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [tid, onSuccess]);

  let matchGenerate = matchesTabData.length > 0;
  console.log("56r7", matchGenerate);

  const handleTabChange = (selected) => {
    setActiveTab(selected);

    console.log("567", selected);
  };

  const getTabButtonName = (tabKey) => {
    if (tabKey === "Home") {
      return t("Home");
    } else if (tabKey === "Teams") {
      return t("Teams");
    } else if (tabKey === "Matches") {
      return t("Matches");
    } else if (tabKey === "Fixture") {
      return t("Fixture");
    }
    return "";
  };

  const tabButton = (tabKey) => (
    <div
      // type="button"
      className={`${
        activeTab === tabKey
          ? "btn btn-outline-secondary match2"
          : "btn btn-outline-secondary match1"
      }`}
    >
      {getTabButtonName(tabKey)}
    </div>
  );
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="tour-container" style={{ minHeight: "600px" }}>
        <div className="row ">
          <div className="col-lg-7 col-md-12">
            {homeTabData && homeTabData.tournament_details && (
              <div class="card  tournament2 my-5">
                <img
                  src={`${constants.port}${homeTabData.tournament_details.image}`}
                  className="live-image2"
                  alt="Card image cap"
                />
                <div className="live-icon1">
                  <span
                    // onClick={() => handleShare()}
                    style={{ cursor: "pointer",padding:"10px" }}
                  >
                    <ShareToUserChat slug={tid} type="tour"/>
                    {/* <span className="mx-4">
                      <svg
                        width="5"
                        height="18"
                        viewBox="0 0 5 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.42188 2.12194C1.42188 1.3815 2.04822 0.78125 2.82085 0.78125C3.59349 0.78125 4.21983 1.3815 4.21983 2.12194C4.21983 2.86238 3.59349 3.46262 2.82085 3.46262C2.04822 3.46262 1.42188 2.86238 1.42188 2.12194Z"
                          stroke="white"
                          stroke-width="1.39898"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.42188 10.1688C1.42188 9.42837 2.04822 8.82812 2.82085 8.82812C3.59349 8.82812 4.21983 9.42837 4.21983 10.1688C4.21983 10.9093 3.59349 11.5095 2.82085 11.5095C2.04822 11.5095 1.42188 10.9093 1.42188 10.1688Z"
                          stroke="white"
                          stroke-width="1.39898"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.42188 18.2118C1.42188 17.4713 2.04822 16.8711 2.82085 16.8711C3.59349 16.8711 4.21983 17.4713 4.21983 18.2118C4.21983 18.9522 3.59349 19.5525 2.82085 19.5525C2.04822 19.5525 1.42188 18.9522 1.42188 18.2118Z"
                          stroke="white"
                          stroke-width="1.39898"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span> */}
                  </span>
                </div>

                <div class="card-body ">
                  <div className="">
                    <div className="league_clearfix">
                      <div className="float-start mx-2">
                        <h6 className="league">
                          {homeTabData.tournament_details.tournament_name}
                        </h6>
                        <p className="league1">
                          {homeTabData.tournament_details.game_name}
                        </p>
                      </div>
                      <div className="float-end my-3 mx-3">
                        <span>
                          <img
                            src="/images/tournament/match.png"
                            className="knock-img1"
                          ></img>
                          <span className="mx-1 knock-text1">
                            {homeTabData.tournament_details.match_mode}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="live-ads">
              <img
                src="../images/tournament/Group 12.png"
                className="tournament-imx2"
              ></img>
            </div>
          </div>
        </div>

        <div className="tour_detail_tabs">
          <Tabs
            defaultActiveKey="Home"
            id="my-tabs"
            className=""
            style={{ justifyContent: "initial", color: "red" }}
            onSelect={handleTabChange}
          >
            <Tab eventKey="Home" title={tabButton("Home")}>
              {homeTabData && homeTabData.next_match && (
                <>
                  <h6
                    className="my-4"
                    style={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    {t("Next Match")}
                  </h6>
                  {homeTabData &&
                  homeTabData.tournament_details.tournament_type ===
                    "Single" ? (
                    <MatchCards data={homeTabData.next_match} />
                  ) : (
                    <DoublesMatchCard data={homeTabData.next_match} />
                  )}
                </>
              )}
              {homeTabData && homeTabData.last_match && (
                <>
                  <h6
                    className="my-4"
                    style={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    {t("Last Match")}
                  </h6>
                  {homeTabData &&
                  homeTabData.tournament_details.tournament_type ===
                    "Single" ? (
                    <MatchCards data={homeTabData.last_match} />
                  ) : (
                    <DoublesMatchCard data={homeTabData.last_match} />
                  )}
                </>
              )}
            </Tab>
            <Tab eventKey="Teams" title={tabButton("Teams")}>
              {homeTabData &&
              homeTabData.tournament_details.tournament_type === "Single" ? (
                <TeamsCard
                  teamsData={teamsTabData}
                  setOnSuccess={setOnSuccess}
                  admin={adminList}
                  matchGenerate={matchGenerate}
                />
              ) : homeTabData &&
                homeTabData.tournament_details.tournament_type ===
                  "Draw_Partner" ? (
                teamsTabData.length <= 0 ? (
                  <TeamsCard
                    teamsData={teamsTempTabData}
                    setOnSuccess={setOnSuccess}
                    admin={adminList}
                    temp={true}
                    maxTeam={
                      homeTabData &&
                      homeTabData.tournament_details.maximum_participants
                    }
                  />
                ) : (
                  <DoublesTeamsCard
                    teamsData={teamsTabData}
                    setOnSuccess={setOnSuccess}
                    admin={adminList}
                    temp={true}
                  />
                )
              ) : (
                <DoublesTeamsCard
                  teamsData={teamsTabData}
                  setOnSuccess={setOnSuccess}
                  admin={adminList}
                  matchGenerate={matchGenerate}
                />
              )}
            </Tab>
            <Tab eventKey="Matches" title={tabButton("Matches")}>
              <TournamentMatches
                data={matchesTabData}
                setOnSuccess={setOnSuccess}
                admin={adminList}
                home={homeTabData}
              />
            </Tab>
            <Tab eventKey="Fixture" title={tabButton("Fixture")}>
              <FixtureView
                data={matchesTabData}
                setOnSuccess={setOnSuccess}
                admin={adminList}
                home={homeTabData}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default TournamentDetailPage;
