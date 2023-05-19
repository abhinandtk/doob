import GamesHistoryCard from "@/components/games/GamesHistoryCard";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
function HomePage() {
  const [gameDetails, setGameDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    Axios.get(apis.gameHistory, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setGameDetails([res.data]);
      console.log(res);
    });
  }, []);

  const handleCategorySelect = (title) => {
    setSelectedCategory(title);
  };

  return (
    <div>
      <div className="tour-container">
        <h5 className=" my-4" style={{ fontWeight: "600" }}>
          Game History
        </h5>

        {gameDetails.map((content, index) => (
          <>
            {content.my_games.length >= 1 ? (
              <div key={index} className="types1">
                <p style={{ color: "#17A803" }}>All</p>
                {content.my_games.map((game, index) => (
                  <p
                    className="mx-3"
                    key={index}
                    onClick={() => handleCategorySelect(game.title)}
                  >
                    {game.title}
                  </p>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="top">
              {content.my_games.length >= 1 ? (
                content.my_games.map((item,index)=>(
                <GamesHistoryCard key={index} data={item.my_games} />
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
