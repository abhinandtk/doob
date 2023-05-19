import RankTabContent from "@/components/tournament/homepage/RankTabContent";
import TournamentTabContent from "@/components/tournament/homepage/TournamentTabContent";
import "bootstrap-icons/font/bootstrap-icons.css";
import Axios from 'axios'
import React, { useState } from "react";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";

function TournamentHomePage() {


    const [liveTourData,setLiveTourData]=useState([])
    useEffect(()=>{
        Axios.get(apis.tournamentHome,{
            headers:{
                Authorization:`Token ${constants.token_id}`
            }
        }).then((res)=>{
            setLiveTourData(res.data.data.live_tournaments)
            console.log('ddddddata',res.data.data.setLiveTourData)
        })
    })
  
  return (
    <div>


      <div className="tour-container">
        <h5 className=" my-4" style={{ fontWeight: "600" }}>
          Tournaments
        </h5>
        <div className="topnav">
          <a className="active" href="#home">
            Tournaments
          </a>
          <a href="#news" className="mx-5">
            Ranks
          </a>
        </div>
        <TournamentTabContent data={liveTourData}/>
        {/* <RankTabContent /> */}
      </div>
    </div>
  );
}

export default TournamentHomePage;
