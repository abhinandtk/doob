import { Tabs, Tab } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import RankingTable from "./RankingTable";
function RankTabContent({ data }) {
  console.log("dfdata", data);
  const [selectedMatch, setSelectedMatch] = useState(
    data[0]?.game_type || null
  );
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
                  <Tab eventKey="home" title="Male">
                    {content.male.length >= 1 && (
                      <RankingTable data={content.male} />
                    )}
                  </Tab>
                  <Tab eventKey="profile" title="Female">
                    {content.female.length >= 1 && (
                      <RankingTable data={content.male} />
                    )}
                  </Tab>
                  <Tab eventKey="messages" title="Junior">
                    {content.junior.length >= 1 && (
                      <RankingTable data={content.male} />
                    )}
                  </Tab>
                </Tabs>
              )
          )}
        </div>

        <div className="col-lg-5 col-md-6">
          <div className="live-ads">
            {/* <img
              src="../images/tournament/Group 12.png"
              className="tournament-imx1"
            ></img> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RankTabContent;
