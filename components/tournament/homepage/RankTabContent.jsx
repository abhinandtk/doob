import { Tabs, Tab } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import RankingTable from "./RankingTable";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function RankTabContent({ data }) {
  const { t } = useTranslation();
  console.log("dfdata", data);
  const [selectedMatch, setSelectedMatch] = useState(
    data[0]?.game_type || null
  );
  const router = useRouter();
  const { locale } = router;
  return (
    <Fragment>
      <div className="row ">
        <div className="col-lg-7 col-md-12">
          <section className="my-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="btn-group me-2"
                role="group"
                aria-label="Second group"
              >
                <button
                  onClick={() => setSelectedMatch(item.game_type)}
                  type="button"
                  className={`btn btn-secondary ${
                    selectedMatch === item.game_type ? "sports" : "sports1"
                  }`}
                >
                  {item.game_type}
                </button>
              </div>
            ))}
          </section>

          {data.map(
            (content, index) =>
              content.game_type === selectedMatch && (
                <Tabs
                  defaultActiveKey="home"
                  id="my-tabs"
                  key={index}
                  className="gender2"
                  style={{ justifyContent: "initial", color: "red" }}
                >
                  <Tab eventKey="home" title={t("Male")}>
                    {content.male.length >= 1 && (
                      <RankingTable data={content.male} />
                    )}
                  </Tab>
                  <Tab eventKey="profile" title={t("Female")}>
                    {content.female.length >= 1 && (
                      <RankingTable data={content.female} />
                    )}
                  </Tab>
                  <Tab eventKey="messages" title={t("Junior")}>
                    {content.junior.length >= 1 && (
                      <RankingTable data={content.junior} />
                    )}
                  </Tab>
                </Tabs>
              )
          )}
        </div>

        <div className="col-lg-5 col-md-6">
          <div className="live-ads">
            <img
              src="../images/tournament/Group 12.png"
              className={`${
                locale === "ar" ? "tournament-imx1_ar" : "tournament-imx1"
              }`}
            ></img>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RankTabContent;
