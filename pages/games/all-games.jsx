import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import GamesHistoryCard from "@/components/games/GamesHistoryCard";
import GameBookingCard from "@/components/games/GameBookingCard";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function AllGamesPage() {
  const router = useRouter();
  const { tab } = router.query;
  const {t}=useTranslation()
  const [myGames, setMyGames] = useState([]);
  const [gamesJoined, setGamesJoined] = useState([]);
  const [gamesInvited, setGamesInvited] = useState([]);
  const [activeTab, setActiveTab] = useState(tab);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getTabName = (tabKey) => {
    if (tabKey === "games") {
      return t("My Games");
    } else if (tabKey === "joined") {
      return t("Games I Joined");
    } else if (tabKey === "invited") {
      return t("Games I am Invited");
    }
    return "";
  };

  const tabButton = (tabKey) => (
    <div className="btn-group me-2" role="group" aria-label="Second group">
      <button
        type="button"
        className={`${
          activeTab === tabKey
            ? "btn btn-outline-secondary games2"
            : "btn btn-outline-secondary games1"
        }`}
      >
        {getTabName(tabKey)}
      </button>
    </div>
  );
  const handleTabChange = (selected) => {
    setActiveTab(selected);
  };

  useEffect(() => {
    Axios.get(apis.listAllGames, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setMyGames(res.data.my_games);
      setGamesJoined(res.data.games_i_joined);
      setGamesInvited(res.data.games_iam_invited);
      console.log("resultgames", res);
    });
  }, []);

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
      <div className="tour-detail-ar">
        <h5 className=" my-4" style={{ fontWeight: "600" }}>
          {t("All Games")}
        </h5>
        <div className="play_detail_tabs">
          <Tabs
            defaultActiveKey={activeTab}
            id="my-tabs"
            className=""
            style={{ justifyContent: "initial", color: "red" ,marginRight:'-40px' }}
            onSelect={handleTabChange}
          >
            <Tab eventKey="games" title={tabButton("games")}>
              <div className="types">
                <p
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    color: `${selectedCategory === null ? "#17A803" : ""}`,
                    cursor: "pointer",
                  }}
                >
                  {t("All")}
                </p>
                {myGames.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedCategory(item.title)}
                    style={{
                      color: `${
                        selectedCategory === item.title ? "#17A803" : ""
                      }`,
                      cursor: "pointer",
                    }}
                    className="mx-3"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
              {myGames.map((item, index) =>
                selectedCategory === null || selectedCategory === item.title ? (
                  <GameBookingCard key={index} data={item.bookings} />
                ) : null
              )}
              {myGames.map((item, index) =>
                selectedCategory === null || selectedCategory === item.title ? (
                  <GamesHistoryCard key={index} data={item.my_games} />
                ) : null
              )}
            </Tab>

            <Tab eventKey="joined" title={tabButton("joined")}>
              <div className="types">
                <p
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    color: `${selectedCategory === null ? "#17A803" : ""}`,
                    cursor: "pointer",
                  }}
                >
                  {t("All")}
                </p>
                {gamesJoined.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedCategory(item.title)}
                    style={{
                      color: `${
                        selectedCategory === item.title ? "#17A803" : ""
                      }`,
                      cursor: "pointer",
                    }}
                    className="mx-3"
                  >
                    {item.title}
                  </p>
                ))}
                </div>
                {gamesJoined.map((item, index) =>
                  selectedCategory === null ||
                  selectedCategory === item.title ? (
                    <GamesHistoryCard key={index} data={item.playgrounds} />
                  ) : null
                )}
              
            </Tab>
            <Tab eventKey="invited" title={tabButton("invited")}>
              <div className="types">
                <p
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    color: `${selectedCategory === null ? "#17A803" : ""}`,
                    cursor: "pointer",
                  }}
                >
                  {t("All")}
                </p>
                {gamesJoined.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedCategory(item.title)}
                    style={{
                      color: `${
                        selectedCategory === item.title ? "#17A803" : ""
                      }`,
                      cursor: "pointer",
                    }}
                    className="mx-3"
                  >
                    {item.title}
                  </p>
                ))}

                {gamesInvited.map((item, index) =>
                  selectedCategory === null ||
                  selectedCategory === item.title ? (
                    <GamesHistoryCard key={index} data={item.playgrounds} />
                  ) : null
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default AllGamesPage;
