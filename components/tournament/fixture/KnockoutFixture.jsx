import React from "react";
import constants from "@/public/data/my-constants/Constants";

function KnockoutFixture({ data, setOnSuccess, admin }) {
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
                    <div className="team">
                      <div className="fix-image">
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
                            match.team_B_logo.team_B_logo
                              ? `${constants.port}${match.team_B_logo.team_B_logo}`
                              : "/images/accounts/user_default.png"
                          }
                          className="group-image"
                        ></img>
                      </div>
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A.team_A}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A_score}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
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
                    <div className="team">
                      <div className="fix-image">
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
                            match.team_B_logo.team_B_logo
                              ? `${constants.port}${match.team_B_logo.team_B_logo}`
                              : "/images/accounts/user_default.png"
                          }
                          className="group-image"
                        ></img>
                      </div>
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A.team_A}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A_score}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
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
                    <div className="team">
                      <div className="fix-image">
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
                            match.team_B_logo.team_B_logo
                              ? `${constants.port}${match.team_B_logo.team_B_logo}`
                              : "/images/accounts/user_default.png"
                          }
                          className="group-image"
                        ></img>
                      </div>
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A.team_A}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A_score}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
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
                    <div className="team">
                      <div className="fix-image">
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
                            match.team_B_logo.team_B_logo
                              ? `${constants.port}${match.team_B_logo.team_B_logo}`
                              : "/images/accounts/user_default.png"
                          }
                          className="group-image"
                        ></img>
                      </div>
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A.team_A}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A_score}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
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
                      <div className="team" style={{ height: "115px" }}>
                        <div className="fix-image">
                        &nbsp; &nbsp; <img
                            src={
                              match.team_A_logo.team_A_logo
                                ? `${constants.port}${match.team_A_logo.team_A_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                          {match.team_A_score > match.team_B_score && <i className="bi bi-trophy-fill" style={{right:"15px",position:"relative" ,color:"#17A803",bottom:"5px"}} />}
                          {match.team_B_score >= match.team_A_score && <i className="bi bi-trophy-fill" style={{left:"15px",position:"relative",color:"#17A803",bottom:"5px"}} /> }
                          <img
                            src={
                              match.team_B_logo.team_B_logo
                                ? `${constants.port}${match.team_B_logo.team_B_logo}`
                                : "/images/accounts/user_default.png"
                            }
                            className="group-image"
                          ></img>
                           &nbsp;  &nbsp;
                        </div>
                        <div className="fix">
                          <div
                            className={`${
                              match.team_A_score >= match.team_B_score
                                ? "group-one"
                                : "group-two"
                            }`}
                          >
                            {match.team_A.team_A}
                          </div>
                          <div
                            className={`${
                              match.team_B_score >= match.team_A_score
                                ? "group-one"
                                : "group-two"
                            }`}
                          >
                            {match.team_B.team_B}
                          </div>
                        </div>
                        <div className="fix1">
                          <div
                            className={`${
                              match.team_A_score >= match.team_B_score
                                ? "group-one"
                                : "group-two"
                            }`}
                          >
                            {match.team_A_score}
                          </div>
                          <div
                            className={`${
                              match.team_B_score >= match.team_A_score
                                ? "group-one"
                                : "group-two"
                            }`}
                          >
                            {match.team_B_score}
                          </div>
                        </div>
                        <div className="fix1">
                          <div className="group-two-final">
                            {match.team_A_score > match.team_B_score && (
                              <i className="" />
                            )}
                          </div>
                          <div className="group-two-final">
                            {match.team_B_score > match.team_A_score && (
                              <i className="" />
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

export default KnockoutFixture;
