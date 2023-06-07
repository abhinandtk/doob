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
                      {match.team_A_logo && match.team_B_logo && (
                        <div>
                          {index > 0 && <div className="connector"></div>}
                          {index > 1 && <div className="connector2"></div>}
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
                        </div>
                      )}
                      <div className="fix">
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A}
                        </div>
                        <div
                          className={`${
                            match.team_B_score <= match.team_A_score
                              ? "group-two"
                              : "group-one"
                          }`}
                        >
                          {match.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div className="group-one">{match.team_A_score}</div>
                        <div className="group-one ">{match.team_B_score}</div>
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
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A}
                        </div>
                        <div
                          className={`${
                            match.team_B_score <= match.team_A_score
                              ? "group-two"
                              : "group-one"
                          }`}
                        >
                          {match.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div className="group-one">{match.team_A_score}</div>
                        <div className="group-one ">{match.team_B_score}</div>
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
                        <div
                          className={`${
                            match.team_A_score >= match.team_B_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_A} 
                        </div>
                        <div
                          className={`${
                            match.team_B_score <= match.team_A_score
                              ? "group-two"
                              : "group-one"
                          }`}
                        >
                          {match.team_B}
                        </div>
                      </div>
                      <div className="fix1">
                        <div className="group-one">{match.team_A_score}</div>
                        <div className="group-one ">{match.team_B_score}</div>
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
                        <div className="group-one">{match.team_A_score}</div>
                        <div className="group-two ">{match.team_B_score}</div>
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
                          <div className="group-one-final">{match.team_A}</div>
                          <div className="group-two-final">{match.team_B}</div>
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
  );
}

export default KnockoutFixture;
