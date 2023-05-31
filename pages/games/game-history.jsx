import GamesHistoryCard from "@/components/games/GamesHistoryCard";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import GameBookingCard from "@/components/games/GameBookingCard";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
function HomePage() {
  const [gameDetails, setGameDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    Axios.get(apis.gameHistory, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setGameDetails(res.data.my_games);
      console.log(res);
    });
  }, []);

  const handleCategorySelect = (title) => {
    setSelectedCategory(title);
  };

  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <h5 className=" my-4" style={{ fontWeight: "600" }}>
          Game History
        </h5>
        <div className="types1">
          <p
            onClick={() => handleCategorySelect(null)}
            style={{ color: `${selectedCategory === null ? "#17A803" : ""}` }}
          >
            All
          </p>
          {gameDetails &&
            gameDetails.map((item, index) => (
              <p
                className="mx-3"
                style={{
                  color: `${selectedCategory === item.title ? "#17A803" : ""}`,
                }}
                key={index}
                onClick={() => handleCategorySelect(item.title)}
              >
                {item.title}
              </p>
            ))}
        </div>
        {gameDetails &&
          gameDetails.map((item, index) =>
            selectedCategory === null || selectedCategory === item.title ? (
              <>
                <GamesHistoryCard key={index} data={item.my_games} />
                <GameBookingCard key={index} data={item.bookings} />
              </>
            ) : (
              <></>
            )
          )}
      </div>
      <MobileFooter />
    </div>
  );
}

export default HomePage;
