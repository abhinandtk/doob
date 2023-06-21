import React, { useEffect, useState } from "react";
import constants from "@/public/data/my-constants/Constants";

function DoubleEliminationFixture({ data, setOnSuccess, admin }) {
  console.log("dublefixture", data);

  const [fixture, setFixture] = useState([]);

  useEffect(() => {
    const modifyDataOrder = (apiData) => {
      const modifiedData = [];

      apiData.forEach((item) => {
        if (item.match_type === "third_place_1") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "loser_round_7") {
          modifiedData.push(item);
        }
      });
      apiData.forEach((item) => {
        if (item.match_type === "loser_round_6") {
          modifiedData.push(item);
        }
      });
      apiData.forEach((item) => {
        if (item.match_type === "loser_round_5") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "loser_round_4") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "loser_round_3") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "loser_round_2") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "loser_round_1") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "base_round") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "winner_round_1") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "winner_round_2") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "winner_round_3") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "winner_round_4") {
          modifiedData.push(item);
        }
      });

      apiData.forEach((item) => {
        if (item.match_type === "final_round") {
          modifiedData.push(item);
        }
      });

      // Continue adding the remaining conditions for other match types

      return modifiedData;
    };

    if (data) {
      const modifiedData = modifyDataOrder(data);
      setFixture(modifiedData);
    }
  }, [data]);

  return (
    <div className="bracket" style={{ width: "100%", overflowX: "scroll" }}>
      {fixture &&
        fixture.map((item, index) => (
          <>
            {item.match_type === "third_place_1" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
                {item.matches.map((match, index) => (
                  <div key={index} className="match">
                    <div className="team">
                      {match.team_A_logo && match.team_B_logo && (
                        <div>
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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_7" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>

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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_6" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>

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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_5" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>

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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_4" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>

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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_3" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>

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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_2" ? (
              <div
                key={index}
                className="round"
                style={{ position: "relative" }}
              >
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>

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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "loser_round_1" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "base_round" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "winner_round_1" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "winner_round_2" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
            ) : item.match_type === "winner_round_2" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
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
                            match.team_B_score >= match.team_A_score
                              ? "group-one"
                              : "group-two"
                          }`}
                        >
                          {match.team_B}
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
              item.match_type === "final_round" && (
                <div className="round" style={{ position: "relative" }}>
                  <div
                    className="round-name"
                    style={{ position: "absolute", top: "0" }}
                  >
                    {item.match_type.replace(/_/g, " ")}
                  </div>

                  {item.matches.map((match, index_) => (
                    <div key={index_} className="match">
                      <div className="team" style={{ height: "115px" }}>
                        {match.team_A_logo && match.team_B_logo && (
                          <>
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
                          </>
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
                              match.team_B_score >= match.team_A_score
                                ? "group-one"
                                : "group-two"
                            }`}
                          >
                            {match.team_B}
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

export default DoubleEliminationFixture;
