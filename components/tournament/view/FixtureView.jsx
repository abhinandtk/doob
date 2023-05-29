import constants from "@/public/data/my-constants/Constants";
import React from "react";

function FixtureView({ data, setOnSuccess, admin }) {
  console.log("fixtureDtaa", data[0]);
  return (
    <div>
      <div className="card tournament3 my-4">
        <div className="card-body p-3">
          <div className="bracket">
            {data &&
              data.map((item, index) => (
                <>
                  {item.match_type === "Quater Finals" ? (
                    <div className="round">
                      {item.matches.map((match, index) => (
                        <div className="match">
                          <div className="team">
                            {match.team_A_logo && match.team_B_logo && (
                              <div className="fix-image">
                                <img
                                  src={`${constants.port}${match.team_A_logo}`}
                                  className="group-image"
                                ></img>
                                <img
                                  src={`${constants.port}${match.team_B_logo}`}
                                  className="group-image"
                                ></img>
                              </div>
                            )}
                            <div className="fix">
                              <div className="group-one">{match.team_A}</div>
                              <div className="group-two ">{match.team_B}</div>
                            </div>
                            <div className="fix1">
                              <div className="group-one">
                                {match.team_A_score}
                              </div>
                              <div className="group-two ">
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
                        <div className="match">
                          <div className="team">
                            {match.team_A_logo && match.team_B_logo && (
                              <div className="fix-image">
                                <img
                                  src={`${constants.port}${match.team_A_logo}`}
                                  className="group-image"
                                ></img>
                                <img
                                  src={`${constants.port}${match.team_B_logo}`}
                                  className="group-image"
                                ></img>
                              </div>
                            )}
                            <div className="fix">
                              <div className="group-one">{match.team_A}</div>
                              <div className="group-two ">{match.team_B}</div>
                            </div>
                            <div className="fix1">
                              <div className="group-one">
                                {match.team_A_score}
                              </div>
                              <div className="group-two ">
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
                          <div className="match">
                            <div className="team">
                              {match.team_A_logo && match.team_B_logo && (
                                <div className="fix-image">
                                  <img
                                    src={`${constants.port}${match.team_A_logo}`}
                                    className="group-image"
                                  ></img>
                                  <img
                                    src={`${constants.port}${match.team_B_logo}`}
                                    className="group-image"
                                  ></img>
                                </div>
                              )}
                              <div className="fix">
                                <div className="group-one-final">
                                  {match.team_A}
                                </div>
                                <div className="group-one-final">
                                  {match.team_B}
                                </div>
                              </div>
                              <div className="fix1">
                                <div className="group-two-final">
                                  {match.team_A_score}
                                </div>
                                <div className="group-two-final">
                                  {match.team_B_score}
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
        </div>
      </div>
    </div>
  );
}

export default FixtureView;
