import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";
import KnockoutFixture from "../fixture/KnockoutFixture";
import LeaguePointTable from "../fixture/LeaguePointTable";

function FixtureView({ data, setOnSuccess, admin }) {
  console.log("fixtureDtaa", data[0]);
  return (
    <Fragment>
      <div className="card tournament3 my-4">
        <div className="card-body p-3">
          <KnockoutFixture
            data={data}
            setOnSuccess={setOnSuccess}
            admin={admin}
          />
          {/* <LeaguePointTable /> */}
        </div>
      </div>
    </Fragment>
  );
}

export default FixtureView;
