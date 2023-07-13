import React from "react";
import constants from "@/public/data/my-constants/Constants";

function KnockoutFixtureDoubles({ data, setOnSuccess, admin }) {
  console.log("fixtureDtaa", data);

  return (
    <div className="bracket" style={{ width: "100%", overflowX: "scroll" }}>
      {data &&
        data.map((item, index) => (
          <>
            {item.match_type === "Round of 32" ? (
              <div key={index} className="round">
                {item.matches.map((match, index) => (
                  <div key={index} className="match">
                    <div className="team-double">
                      {/* <div className="fix-image">
                        <div>
                          <img
                            src={
                              match.team_A_logo.team_A_logo
                                ? `${constants.port}${match.team_A_logo.team_A_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_A_logo.team_A_logo_2
                                ? `${constants.port}${match.team_A_logo.team_A_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                        <div>
                          <img
                            src={
                              match.team_B_logo.team_B_logo
                                ? `${constants.port}${match.team_B_logo.team_B_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_B_logo.team_B_logo_2
                                ? `${constants.port}${match.team_B_logo.team_B_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                      </div> */}
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_A.team_A}
                          </div>
                          <div className="double-team-name">
                            {match.team_A.team_A_2}
                          </div>
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_B.team_B}
                          </div>
                          <div className="double-team-name">
                            {match.team_B.team_B_2}
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
            ) : item.match_type === "Round of 16" ? (
              <div key={index} className="round">
                {item.matches.map((match, index) => (
                  <div key={index} className="match">
                    <div className="team-double">
                      {/* <div className="fix-image">
                        <div>
                          <img
                            src={
                              match.team_A_logo.team_A_logo
                                ? `${constants.port}${match.team_A_logo.team_A_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_A_logo.team_A_logo_2
                                ? `${constants.port}${match.team_A_logo.team_A_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                        <div>
                          <img
                            src={
                              match.team_B_logo.team_B_logo
                                ? `${constants.port}${match.team_B_logo.team_B_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_B_logo.team_B_logo_2
                                ? `${constants.port}${match.team_B_logo.team_B_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                      </div> */}
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_A.team_A}
                          </div>
                          <div className="double-team-name">
                            {match.team_A.team_A_2}
                          </div>
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_B.team_B}
                          </div>
                          <div className="double-team-name">
                            {match.team_B.team_B_2}
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
            ) : item.match_type === "Quater Finals" ? (
              <div key={index} className="round">
                {item.matches.map((match, index) => (
                  <div key={index} className="match">
                    <div className="team-double">
                      {/* <div className="fix-image">
                        <div>
                          <img
                            src={
                              match.team_A_logo.team_A_logo
                                ? `${constants.port}${match.team_A_logo.team_A_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_A_logo.team_A_logo_2
                                ? `${constants.port}${match.team_A_logo.team_A_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                        <div>
                          <img
                            src={
                              match.team_B_logo.team_B_logo
                                ? `${constants.port}${match.team_B_logo.team_B_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_B_logo.team_B_logo_2
                                ? `${constants.port}${match.team_B_logo.team_B_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                      </div> */}
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_A.team_A}
                          </div>
                          <div className="double-team-name">
                            {match.team_A.team_A_2}
                          </div>
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_B.team_B}
                          </div>
                          <div className="double-team-name">
                            {match.team_B.team_B_2}
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
            ) : item.match_type === "Semi Finals" ? (
              <div className="round">
                {item.matches.map((match, index_) => (
                  <div key={index_} className="match">
                    <div className="team-double">
                      {/* <div className="fix-image">
                        <div>
                          <img
                            src={
                              match.team_A_logo.team_A_logo
                                ? `${constants.port}${match.team_A_logo.team_A_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_A_logo.team_A_logo_2
                                ? `${constants.port}${match.team_A_logo.team_A_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                        <div>
                          <img
                            src={
                              match.team_B_logo.team_B_logo
                                ? `${constants.port}${match.team_B_logo.team_B_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          <img
                            src={
                              match.team_B_logo.team_B_logo_2
                                ? `${constants.port}${match.team_B_logo.team_B_logo_2}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                        </div>
                      </div> */}
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_A.team_A}
                          </div>
                          <div className="double-team-name">
                            {match.team_A.team_A_2}
                          </div>
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one-double"
                              : "group-two-double"
                          }`}
                        >
                          <div className="double-team-name">
                            {match.team_B.team_B}
                          </div>
                          <div className="double-team-name">
                            {match.team_B.team_B_2}
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
            ) : (
              item.match_type === "Finals" && (
                <div className="round">
                  {item.matches.map((match, index_) => (
                    <div key={index_} className="match">
                      <div className="team-double" style={{ height: "150px" }}>
                        {/* <div className="fix-image">
                          <div>
                            <img
                              src={
                                match.team_A_logo.team_A_logo
                                  ? `${constants.port}${match.team_A_logo.team_A_logo}`
                                  : "/images/accounts/user_default.png"
                              }
                              className="group-image"
                            ></img>
                            <img
                              src={
                                match.team_A_logo.team_A_logo_2
                                  ? `${constants.port}${match.team_A_logo.team_A_logo_2}`
                                  : "/images/accounts/user_default.png"
                              }
                              className="group-image"
                            ></img>
                          </div>
                          <div>
                            <img
                              src={
                                match.team_B_logo.team_B_logo
                                  ? `${constants.port}${match.team_B_logo.team_B_logo}`
                                  : "/images/accounts/user_default.png"
                              }
                              className="group-image"
                            ></img>
                            <img
                              src={
                                match.team_B_logo.team_B_logo_2
                                  ? `${constants.port}${match.team_B_logo.team_B_logo_2}`
                                  : "/images/accounts/user_default.png"
                              }
                              className="group-image"
                            ></img>
                          </div>
                        </div> */}

                        <div className="fix">
                          <div
                            className={`${
                              match.team_A_score >= match.team_B_score
                                ? "group-one-double"
                                : "group-two-double"
                            }`}
                          >
                            <div className="double-team-name">
                              {match.team_A.team_A}
                            </div>
                            <div className="double-team-name">
                              {match.team_A.team_A_2}
                            </div>
                          </div>
                          <div
                            className={`${
                              match.team_B_score >= match.team_A_score
                                ? "group-one-double"
                                : "group-two-double"
                            }`}
                          >
                            <div className="double-team-name">
                              {match.team_B.team_B}
                            </div>
                            <div className="double-team-name">
                              {match.team_B.team_B_2}
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
                        <div className="fix1">
                          <div className="group-two-final">
                            {match.team_A_score > match.team_B_score && (
                              <i className="bi bi-trophy" />
                            )}
                          </div>
                          <div className="group-two-final">
                            {match.team_B_score > match.team_A_score && (
                              <i className="bi bi-trophy" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        ))}
    </div>
  );
}

export default KnockoutFixtureDoubles;
