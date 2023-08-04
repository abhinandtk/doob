import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function PlayerDetailsPage() {
  const router = useRouter();
  const { prId } = router.query;

  const [rankDetails, setRankDetails] = useState();
  useEffect(() => {
    Axios.post(
      apis.playerDetails,
      { player_username: prId },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setRankDetails(res.data.data.player_details);
      console.log("thoughtfoundway", res);
    });
  }, [prId]);

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <h5 className="my-3 dark-theme-color" style={{ fontWeight: "700" }}>
          Rank Details
        </h5>
        {rankDetails && (
          <div className="row ">
            <div className="col-md-7">
              <div class="card  tournament4 ">
                <div className="card green">
                  <div className="card-body">
                    <div className="green-content">
                      <img
                        src={
                          rankDetails.image
                            ? `${constants.port}${rankDetails.image}`
                            : "/images/accounts/user_default.png"
                        }
                        className="green-imx"
                      ></img>
                      <div className="green-details">
                        <h5 className="green-text">
                          {rankDetails.player_name}
                        </h5>
                        <div className="green-border"></div>

                        <div className="ranks-content">
                          <div className="rank-detail">
                            <h6 className="ranks">Rank</h6>
                            <p className="ranks-number">#{rankDetails.rank}</p>
                          </div>
                          <div className="rank-detail1">
                            <h6 className="ranks">Points</h6>
                            <p className="ranks-number">{rankDetails.points}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card grey">
                  <div className="card-body">
                    <div className="grey-content">
                      <div className="grey-details">
                        <h5 className="grey-number">
                          {rankDetails.Matches_Played}
                        </h5>
                        <p className="grey-match">Matches Played</p>
                      </div>
                      <div className="grey-details1">
                        <h5 className="grey-number">
                          {rankDetails.Matches_Won}
                        </h5>
                        <p className="grey-match">Matches Won</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card grey">
                  <div className="card-body">
                    <div className="grey-content">
                      <div className="grey-details">
                        <h5 className="grey-number">{rankDetails.goal}</h5>
                        <p className="grey-match">Goals</p>
                      </div>
                      <div className="grey-details2">
                        <h5 className="grey-number">
                          {rankDetails.tournament_played}
                        </h5>
                        <p className="grey-match">Tournaments Played</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card grey">
                  <div className="card-body">
                    <div className="grey-content">
                      <div className="grey-details">
                        <h5 className="grey-number">
                          {rankDetails.final_played}
                        </h5>
                        <p className="grey-match">Finals Played</p>
                      </div>
                      <div className="grey-details3">
                        <h5 className="grey-number">
                          {rankDetails.semifinal_played}
                        </h5>
                        <p className="grey-match">Semi-finals Played</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card grey">
                  <div className="card-body">
                    <div className="grey-content">
                      <div className="grey-details">
                        <h5 className="grey-number">{rankDetails.final_won}</h5>
                        <p className="grey-match">Finals Won</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="live-ads">
                <img
                  src="/images/tournament/Group 12.png"
                  className="tournament-imx3"
                ></img>
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default PlayerDetailsPage;
