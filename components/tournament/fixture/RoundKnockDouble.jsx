import constants from "@/public/data/my-constants/Constants";
import React from "react";

function RoundKnockDouble(matches) {
    console.log('match89',matches)
  return (
    <div className="round">
      {
        matches.matches.map((match, index) => (
          <div key={index} className="match">
            <div className="team-double">
              <div className="fix-image">
                <div
                  className={`${
                    match.team_A_score >= match.team_B_score
                      ? "group-one-double"
                      : "group-two-double"
                  }`}
                >
                  <div>
                    <img
                      src={
                        match.team_A_logo.team_A_logo
                          ? `${constants.port}${match.team_A_logo.team_A_logo}`
                          : "/images/accounts/user_default.png"
                      }
                      className="group-image"
                      style={{ width: "24px", height: "24px" }}
                    ></img>
                    <span className="mx-1 double-team-name">
                      {match.team_A.team_A}
                    </span>
                  </div>
                  <div>
                    <img
                      src={
                        match.team_A_logo.team_A_logo_2
                          ? `${constants.port}${match.team_A_logo.team_A_logo_2}`
                          : "/images/accounts/user_default.png"
                      }
                      className="group-image"
                      style={{ width: "24px", height: "24px" }}
                    ></img>
                    <span className="mx-1 double-team-name">
                      {match.team_A.team_A_2}
                    </span>
                  </div>
                </div>
                <div
                  className={`${
                    match.team_B_score >= match.team_A_score
                      ? "group-one-double"
                      : "group-two-double"
                  }`}
                >
                  <div>
                    <img
                      src={
                        match.team_B_logo.team_B_logo
                          ? `${constants.port}${match.team_B_logo.team_B_logo}`
                          : "/images/accounts/user_default.png"
                      }
                      className="group-image"
                      style={{ width: "24px", height: "24px" }}
                    ></img>
                    <span className="mx-1 double-team-name">
                      {match.team_B.team_B}
                    </span>
                  </div>
                  <div>
                    <img
                      src={
                        match.team_B_logo.team_B_logo_2
                          ? `${constants.port}${match.team_B_logo.team_B_logo_2}`
                          : "/images/accounts/user_default.png"
                      }
                      className="group-image"
                      style={{ width: "24px", height: "24px" }}
                    ></img>
                    <span className="mx-1 double-team-name">
                      {match.team_B.team_B_2}
                    </span>
                  </div>
                </div>
              </div>

              <div className="fix1">
                <div
                  className={`${
                    match.team_A_score >= match.team_B_score
                      ? "group-one-double"
                      : "group-two-double"
                  }`}
                >
                  {match.team_A_score}
                </div>
                <div
                  className={`${
                    match.team_B_score >= match.team_A_score
                      ? "group-one-double"
                      : "group-two-double"
                  }`}
                >
                  {match.team_B_score}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RoundKnockDouble;
