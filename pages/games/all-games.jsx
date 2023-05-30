import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import GamesHistoryCard from "@/components/games/GamesHistoryCard";
import GameBookingCard from "@/components/games/GameBookingCard";
function AllGamesPage() {
  const [myGames, setMyGames] = useState([]);
  const [gamesJoined, setGamesJoined] = useState([]);
  const [gamesInvited, setGamesInvited] = useState([]);
  const [activeTab, setActiveTab] = useState("games");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getTabName = (tabKey) => {
    if (tabKey === "games") {
      return "My Games";
    } else if (tabKey === "joined") {
      return "Games I Joined";
    } else if (tabKey === "invited") {
      return "Games I am Invited";
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
    });
  }, []);

  return (
    <div>
      <div className="tour-container">
        <h5 className=" my-4" style={{ fontWeight: "600" }}>
          All Games
        </h5>
        <div className="play_detail_tabs">
          <Tabs
            defaultActiveKey="Home"
            id="my-tabs"
            className=""
            style={{ justifyContent: "initial", color: "red" }}
            onSelect={handleTabChange}
          >
            <Tab eventKey="games" title={tabButton("games")}>
              <div className="types">
                <p
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    color: `${selectedCategory === null ? "#17A803" : ""}`,
                  }}
                >
                  All
                </p>
                {myGames.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedCategory(item.title)}
                    style={{
                      color: `${
                        selectedCategory === item.title ? "#17A803" : ""
                      }`,
                    }}
                    className="mx-3"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
              {myGames.map((item, index) =>
                selectedCategory === null || selectedCategory === item.title ? (
                  console.log('reeeeeeeeeeeeeeeeeeeet',item.bookings)
                  // item.bookings.length >= 1 ? (

                  //   <></>
                  //   // <GameBookingCard data={item.bookings} />
                  // ) : (
                  //   <></>
                  // )
                ) : null
              )}
              {/* {myGames.map((item, index) =>
                item.bookings.length >= 1 ? <GameBookingCard data={item.bookings}/> : <></>
              )} */}
            </Tab>

            <Tab eventKey="joined" title={tabButton("joined")}>
              <div className="types">
                <p
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    color: `${selectedCategory === null ? "#17A803" : ""}`,
                  }}
                >
                  All
                </p>
                {gamesJoined.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedCategory(item.title)}
                    style={{
                      color: `${
                        selectedCategory === item.title ? "#17A803" : ""
                      }`,
                    }}
                    className="mx-3"
                  >
                    {item.title}
                  </p>
                ))}
                {gamesJoined.map((item, index) =>
                  selectedCategory === null ||
                  selectedCategory === item.title ? (
                    <GamesHistoryCard key={index} data={item.playgrounds} />
                  ) : null
                )}
              </div>
            </Tab>
            <Tab eventKey="invited" title={tabButton("invited")}>
              <div className="types">
                <p
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    color: `${selectedCategory === null ? "#17A803" : ""}`,
                  }}
                >
                  All
                </p>
                {gamesJoined.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedCategory(item.title)}
                    style={{
                      color: `${
                        selectedCategory === item.title ? "#17A803" : ""
                      }`,
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

        <button type="button" className="history-btn ">
          View History88
        </button>
      </div>
    </div>
  );
}

export default AllGamesPage;
