import React, { useState } from "react";
import { Fragment } from "react";
import GameDetailTopContent from "./GameDetailTopContent";
import GameParticipantsList from "./GameParticipantsList";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
function GameDetailFullWidth() {
    const router =useRouter()
    const {gameId}=router.query

    const [gameDetials,setGameDetails]=useState(null)

  useEffect(() => {
    Axios.post(
      apis.gameDetail,
      {
        game_id:gameId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res)=>{
        setGameDetails([res.data.data])
        console.log('resforgamedetaail',res)
    })
  },[])
  return (
    <Fragment>
      <GameDetailTopContent details={gameDetials}/>
      <GameParticipantsList />
    </Fragment>
  );
}

export default GameDetailFullWidth;
