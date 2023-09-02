import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function PlayerDetailsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { locale } = router;
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
        <div className="tour-detail-ar">
          <h5 className="my-3 dark-theme-color" style={{ fontWeight: "700" }}>
            {t("Rank Details")}
          </h5>
          {rankDetails && (
            <div className="row ">
              <div className="col-md-7">
                <div class="card  tournament4 ">

                  <div className={locale === "ar" ? "card green_ar" : "card green"}>
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
                        <div className={locale === "ar" ? "green-details_ar" : "green-details"}>

                          <h5 className="green-text">
                            {rankDetails.player_name}
                          </h5>
                          <div className="green-border"></div>


                          <div className={locale === "ar" ? "ranks-content_ar" : "ranks-content"}>
                            <div className="rank-detail">
                              <h6 className="ranks">{t("Rank")}</h6>
                              <p className="ranks-number">#{rankDetails.rank}</p>
                            </div>
                            <div className="rank-detail1">
                              <h6 className="ranks">{t("Points")}</h6>
                              <p className="ranks-number">{rankDetails.points}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className={locale === "ar" ? "card grey_ar" : "card grey"}>
                    <div className="card-body">
                      <div className={locale === "ar" ? "grey-content_ar" : "grey-content"} style={{ direction: locale === 'ar' ? "ltr" : "" }}>
                        <div className="grey-details">
                          <h5 className="grey-number">
                            {rankDetails.Matches_Played}
                          </h5>
                          <p className="grey-match">{t("Matches Played")}</p>
                        </div>
                        
                        <div className={locale === "ar" ? "grey-details1_ar" : "grey-details1"}>
                          <h5 className="grey-number">
                            {rankDetails.Matches_Won}
                          </h5>
                          <p className="grey-match">{t("Matches Won")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={locale === "ar" ? "card grey_ar" : "card grey"}>
                    <div className="card-body">
                      <div className={locale === "ar" ? "grey-content_ar" : "grey-content"} style={{ direction: locale === 'ar' ? "ltr" : "" }}>
                        <div className="grey-details">
                          <h5 className="grey-number">{rankDetails.goal}</h5>
                          <p className="grey-match">{t("Goals")}</p>
                        </div>
                        <div className="grey-details2">
                          <h5 className="grey-number">
                            {rankDetails.tournament_played}
                          </h5>
                          <p className="grey-match">{t("Tournaments Played")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={locale === "ar" ? "card grey_ar" : "card grey"}>
                    <div className="card-body">
                      <div className={locale === "ar" ? "grey-content_ar" : "grey-content"} style={{ direction: locale === 'ar' ? "ltr" : "" }}>
                        <div className="grey-details">
                          <h5 className="grey-number">
                            {rankDetails.final_played}
                          </h5>
                          <p className="grey-match">{t("Finals Played")}</p>
                        </div>
                        <div className={locale === "ar" ? "grey-details3_ar" : "grey-details3"}>
                          <h5 className="grey-number">
                            {rankDetails.semifinal_played}
                          </h5>
                          <p className="grey-match">{t("Semi-finals Played")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={locale === "ar" ? "card grey_ar" : "card grey"}>
                    <div className="card-body">
                      <div className={locale === "ar" ? "grey-content_ar" : "grey-content"}>
                        <div className="grey-details">
                          <h5 className="grey-number">{rankDetails.final_won}</h5>
                          <p className="grey-match">{t("Finals Won")}</p>
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
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default PlayerDetailsPage;
