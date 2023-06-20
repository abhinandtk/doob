import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";
import KnockoutFixture from "../fixture/KnockoutFixture";
import LeaguePointTable from "../fixture/LeaguePointTable";
import DoubleEliminationFixture from "../fixture/DoubleEliminationFixture";

function FixtureView({ data, setOnSuccess, admin, home }) {
  console.log("fixtureDtaa", data[0]);
  return (
    <Fragment>
      <div className="card tournament3 my-4">
        <div className="card-body p-3">
          {home && home.tournament_details.match_mode === "Knock-Out" && (
            <KnockoutFixture
              data={data}
              setOnSuccess={setOnSuccess}
              admin={admin}
            />
          )}
          {home &&
            home.tournament_details.match_mode === "Double-Elimination" && (
              <DoubleEliminationFixture
                data={data}
                setOnSuccess={setOnSuccess}
                admin={admin}
              />
            )}
          {home && home.tournament_details.match_mode === "League" && (
            <LeaguePointTable />
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default FixtureView;
