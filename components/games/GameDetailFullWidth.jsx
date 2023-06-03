import React, { useState } from "react";
import { Fragment } from "react";
import GameDetailTopContent from "./GameDetailTopContent";
import GameParticipantsList from "./GameParticipantsList";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import GameOthersParticipants from "./GameOthersParticipants";
function GameDetailFullWidth() {
  const router = useRouter();
  const { gameId } = router.query;
  console.log("popi", gameId);

  const [gameDetials, setGameDetails] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);
  // const [participantsList, setParticipantsList] = useState([]);

  useEffect(() => {
    Axios.post(
      apis.gameDetail,
      {
        game_slug: gameId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setGameDetails(res.data.data);
      // setParticipantsList(res.data.data.participants.length >=1 ?res.data.data.participants:[]);
      console.log("resforgamedetaail", res.data.data);
    });
  }, [gameId, onSuccess]);
  return (
    <Fragment>
      <GameDetailTopContent details={gameDetials} />
      {gameDetials &&
      gameDetials.created_by.created_by_id == constants.user_id ? (
        <GameParticipantsList
          participants={gameDetials.participants}
          setOnSuccess={setOnSuccess}
        />
      ) : (
        <GameOthersParticipants />
      )}
    </Fragment>
  );
}

export default GameDetailFullWidth;
