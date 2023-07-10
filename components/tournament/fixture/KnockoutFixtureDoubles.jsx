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
                    <div className="team">
                      <div className="fix-image">
                        <div>
                          {match.team_A_logo.team_A_logo && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_A_logo.team_A_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
                        <div>
                          {match.team_B_logo.team_B_logo && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_B_logo.team_B_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
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
                        <div>
                          {match.team_A_logo.team_A_logo && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_A_logo.team_A_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
                        <div>
                          {match.team_B_logo.team_B_logo && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_B_logo.team_B_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
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
                        <div>
                          {match.team_A_logo.team_A_logo && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_A_logo.team_A_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
                        <div>
                          {match.team_B_logo.team_B_logo && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_B_logo.team_B_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
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
                          {match.team_A.team_A_2}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B.team_B}
                          {match.team_B.team_B_2}
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
                        <div>
                          {match.team_A_logo.team_A_logo && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_A_logo.team_A_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_A_logo.team_A_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
                        <div>
                          {match.team_B_logo.team_B_logo && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo}`}
                              className="group-image"
                            ></img>
                          )}
                          {match.team_B_logo.team_B_logo_2 && (
                            <img
                              src={`${constants.port}${match.team_B_logo.team_B_logo_2}`}
                              className="group-image"
                            ></img>
                          )}
                        </div>
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
                          {match.team_A.team_A_2}
                        </div>
                        <div
                          className={`${
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B.team_B}
                          {match.team_B.team_B_2}
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
                          <div>
                            {match.team_A_logo.team_A_logo && (
                              <img
                                src={`${constants.port}${match.team_A_logo.team_A_logo}`}
                                className="group-image"
                              ></img>
                            )}
                            {match.team_A_logo.team_A_logo_2 && (
                              <img
                                src={`${constants.port}${match.team_A_logo.team_A_logo_2}`}
                                className="group-image"
                              ></img>
                            )}
                          </div>
                          <div>
                            {match.team_B_logo.team_B_logo && (
                              <img
                                src={`${constants.port}${match.team_B_logo.team_B_logo}`}
                                className="group-image"
                              ></img>
                            )}
                            {match.team_B_logo.team_B_logo_2 && (
                              <img
                                src={`${constants.port}${match.team_B_logo.team_B_logo_2}`}
                                className="group-image"
                              ></img>
                            )}
                          </div>
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
