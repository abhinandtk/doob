import React, { useEffect, useState } from "react";
import constants from "@/public/data/my-constants/Constants";

function TeamDoubleEliminationFixture({ data, setOnSuccess, admin }) {
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
            ) : item.match_type === "winner_round_3" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
                {item.matches.map((match, index_) => (
                  <div key={index_} className="match">
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
            ) : item.match_type === "winner_round_4" ? (
              <div className="round" style={{ position: "relative" }}>
                <div
                  className="round-name"
                  style={{ position: "absolute", top: "0" }}
                >
                  {item.match_type.replace(/_/g, " ")}
                </div>
                {item.matches.map((match, index_) => (
                  <div key={index_} className="match">
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
                      <div className="team-double" style={{ height: "130px" }}>
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
                      {/* <div className="team-double" style={{ height: "150px" }}>
                        <div className="fix-image">
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
                        </div>
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
                      </div> */}
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

export default TeamDoubleEliminationFixture;
