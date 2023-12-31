import constants from "@/public/data/my-constants/Constants";
import React, { useEffect } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  DatePicker,
  Input,
  List,
  Modal,
  Button,
  notification,
  TimePicker,
  Select,
} from "antd";
import { CardImg } from "react-bootstrap";
import { Labels } from "@/public/data/my-constants/Labels";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import MatchTimer from "../MatchTimer";
function TournamentMatches({ data, setOnSuccess, admin, home }) {
  console.log("dddddddaaaaaaaaaata,data", data, home);
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const { tid } = router.query;

  const labels = Labels();

  let loginId;
  if (typeof localStorage !== "undefined") {
    loginId = localStorage.getItem("login-userId");
  }
  const isIdExist = admin && admin.some((item) => item.id == loginId);
  console.log("tt", isIdExist);

  const [teamAScore, setTeamAScore] = useState("");
  const [teamBScore, setTeamBScore] = useState("");
  const [matchDate, setMatchDate] = useState(null);
  const [matchTime, setMatchTime] = useState(null);
  const [matchId, setMatchId] = useState("");
  const [stadiumId, setStadiumId] = useState("");
  const [matchStatus, setMatchStatus] = useState("");

  const [teamAid, setTeamAid] = useState("");
  const [teamBid, setTeamBid] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleStadium, setVisibleStadium] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [stadium, setStadium] = useState("");
  const [liveTime, setLiveTime] = useState("");

  // const getMatchTime = (time, date) => {
  //   const startDate = moment(date, "YYYY-MM-DD");
  //   const startTime = moment(time, "HH:mm:ss");

  //   const startDateTime = startDate.clone().set({
  //     hour: startTime.hours(),
  //     minute: startTime.minutes(),
  //     second: startTime.seconds(),
  //   });

  //   const currentTime = moment();

  //   if (currentTime.isBefore(startDateTime)) {
  //     return "00:00";
  //   }

  //   const diff = moment.duration(Math.abs(startDateTime.diff(currentTime)));
  //   let totalMinutes = Math.floor(diff.asMinutes());
  //   let seconds = diff.seconds();

  //   if (totalMinutes > 90) {
  //     return "90:00";
  //   }

  //   let matchTime = `${totalMinutes}:${seconds}`;

  //   console.log("matchTime:", matchTime);
  //   return matchTime;
  // };

  const generateMatchesHandler = () => {
    console.log("ingen", tid);
    Axios.post(
      apis.generateMatch,
      {
        tournament_slug: tid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Match generated"]}`,
        });
      } else if (res.data.status === 2) {
        notification.info({
          message: t("Error"),
          description: `${labels["Maximum participants no match"]}`,
        });
      } else {
        notification.error({
          message: t("Error"),
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }

      console.log("generate", res);
    });
  };

  const handleChangeStadium = (e) => {
    e.preventDefault();
    setStadium(e.target.value);
    Axios.post(
      apis.tourStadiumSearch,
      {
        stadium_input: stadium,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("ooooooooppp", res);
      if (res.data.status === 1) {
        setSearchResult(res.data.data.results);
      }
    });
  };

  const handleModalShow = (match, teamA, teamB, status, scoreA, scoreB) => {
    if (isIdExist) {
      setVisible(true);
      setMatchId(match);
      setTeamAid(teamA);
      setTeamBid(teamB);
      setMatchStatus(
        status === "end"
          ? 0
          : status === "live"
          ? 1
          : status === "start soon"
          ? 3
          : ""
      );
      setTeamAScore(scoreA);
      setTeamBScore(scoreB);
    }
  };
  const showStadiumModalHandler = (match) => {
    if (isIdExist) {
      setMatchId(match);
      setVisibleStadium(true);
    }
  };
  const showDateModalHandler = (match) => {
    if (isIdExist) {
      setMatchId(match);
      setVisibleDate(true);
      setMatchDate(null);
    }
  };
  const showTimeModalHandler = (match) => {
    if (isIdExist) {
      setMatchId(match);
      setVisibleTime(true);
      setMatchTime(null);
    }
  };

  const handleMatchUpdate = (id, type) => {
    let updatedMatch;
    if (type === "score") {
      console.log("match76", matchStatus);
      updatedMatch = {
        tournament_slug: tid,
        match_id: matchId,
        team_a_score: teamAScore,
        team_b_score: teamBScore,
        match_status: matchStatus,
        team_a_id: teamAid,
        team_b_id: teamBid,
        game_type: home && home.tournament_details.game_name_id,
        category_game: home && home.tournament_details.tournament_category,
      };
    } else if (type === "stadium") {
      updatedMatch = {
        tournament_slug: tid,
        match_id: matchId,
        playground_id: id ? id : "",
      };
    } else if (type === "date") {
      updatedMatch = {
        tournament_slug: tid,
        match_id: matchId,
        date: matchDate ? matchDate.format("YYYY-MM-DD") : null,
      };
    } else if (type === "time") {
      updatedMatch = {
        tournament_slug: tid,
        match_id: matchId,
        time: matchTime ? matchTime.format("HH:mm:ss") : null,
      };
    }
    console.log("inpuuuut", updatedMatch);

    Axios.post(
      home.tournament_details.match_mode === "Double-Elimination"
        ? apis.doubleEliminationMatchUpdate
        : apis.updateMatchResult,
      updatedMatch,
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: t("Success"),
          description: `${labels["Match updated successfully"]}`,
        });
        setOnSuccess((prev) => !prev);
        setVisible(false);
        setVisibleStadium(false);
        setVisibleTime(false);
        setVisibleDate(false);
        setTeamAScore("");
        setTeamBScore("");
        setStadiumId("");
        setMatchDate(null);
        setMatchStatus("");
      }

      console.log("resultupdate", res);
    });
  };

  return (
    <Fragment>
      <Modal
        className="stadium__select"
        open={visibleStadium}
        onCancel={() => setVisibleStadium(false)}
        footer={null}
        centered
        title={t("Select Stadium")}
      >
        <Input
          placeholder={t("Enter Stadium")}
          // value={names}
          onChange={(e) => handleChangeStadium(e)}
        />
        <List
          dataSource={searchResult}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ padding: "0px" }}
              onClick={() => {
                setStadiumId(item.id);
                handleMatchUpdate(item.id, "stadium");
              }}
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <a className="mx-2" href="">
                  {item.stadium_image.length >= 1 && (
                    <CardImg
                      className="rounded-circle shadow-1-strong "
                      src={`${constants.port}${item.stadium_image[0].images}`}
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                      }}
                    ></CardImg>
                  )}
                </a>
                <div
                  className="flex-grow-1 flex-shrink-1 "
                  style={{ marginBottom: "-24px" }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="mb-0 dark-theme-color"
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {item.stadium_name}
                      </p>
                    </div>

                    <p
                      className="small dark-theme-color"
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        marginTop: "-3px",
                        float: "left",
                      }}
                    >
                      @{item.location}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          style={{ height: "250px", overflowY: "auto" }}
        />
      </Modal>

      <Modal
        open={visible}
        title={t("Enter Match Score")}
        onCancel={() => setVisible(false)}
        footer={
          <Button
            key="save"
            type="primary"
            style={{ backgroundColor: "#17A803" }}
            onClick={() => handleMatchUpdate(null, "score")}
          >
            {t("Save")}
          </Button>
        }
      >
        <Input.Group compact>
          <Input
            // className="cont-theme-bg"
            style={{ width: "30%" }}
            value={teamAScore}
            onChange={(e) => setTeamAScore(e.target.value)}
            placeholder={t("Team A Score")}
          />
          <span style={{ margin: "0 8px" }}>-</span>
          <Input
            // className="cont-theme-bg"
            type="number"
            style={{ width: "40%" }}
            value={teamBScore}
            onChange={(e) => setTeamBScore(e.target.value)}
            placeholder={t("Team B Score")}
          />
        </Input.Group>
        <br></br>

        <Select
          // defaultValue=""
          placeholder={t("Match Status")}
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "red",
            width: "100%",
          }}
          id="team"
          onChange={(value) => setMatchStatus(value)}
          value={matchStatus}
        >
          <Select.Option value={""}>{t("--Select--")}</Select.Option>
          <Select.Option value={0}>End</Select.Option>
          <Select.Option value={1}>Live</Select.Option>
          {/* <Select.Option value={2}>Stop</Select.Option> */}
          <Select.Option value={3}>Start soon</Select.Option>
        </Select>
      </Modal>
      <Modal
        open={visibleDate}
        title={t("Enter Date")}
        onCancel={() => setVisibleDate(false)}
        footer={
          <Button
            key="save"
            type="primary"
            style={{ backgroundColor: "#17A803" }}
            onClick={() => handleMatchUpdate(null, "date")}
          >
            {t("Save")}
          </Button>
        }
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD"
          placeholder={t("Select Date")}
          onChange={(date) => setMatchDate(date)}
          value={matchDate}
        />
      </Modal>
      <Modal
        open={visibleTime}
        title={t("Enter Time")}
        onCancel={() => setVisibleTime(false)}
        footer={
          <Button
            key="save"
            type="primary"
            style={{ backgroundColor: "#17A803" }}
            onClick={() => handleMatchUpdate(null, "time")}
          >
            {t("Save")}
          </Button>
        }
      >
        <TimePicker
          placeholder={t("Select Time")}
          format="HH:mm:ss"
          onChange={(time) => setMatchTime(time)}
          value={matchTime}
        />
      </Modal>

      {data.length >= 1
        ? data.map((item, index) => (
            <>
              <h6
                key={index}
                className="my-4"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                {item.match_type.replace(/_/g, " ")}
              </h6>

              {item.matches.map((content, index_) => (
                <>
                  <div
                    key={index_}
                    className="card  tournaments "
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/tournament/match/${content.id}`)
                    }
                  >
                    <div className="Match-content">
                      <div className="columns">
                        <div className="Teams Teams--home">
                          <div className="Teams-logo">
                            <img
                              src={
                                content.team_A_logo.team_A_logo
                                  ? `${constants.port}${content.team_A_logo.team_A_logo}`
                                  : "/images/accounts/user_default.png"
                              }
                            />
                          </div>
                          <h2 className="Teams-name">
                            {" "}
                            {content.team_A.team_A}
                          </h2>
                        </div>
                        {home &&
                          home.tournament_details.tournament_type !==
                            "Single" && (
                            <div className="Teams Teams--home">
                              <div className="Teams-logo">
                                <img
                                  src={
                                    content.team_A_logo.team_A_logo_2
                                      ? `${constants.port}${content.team_A_logo.team_A_logo_2}`
                                      : "/images/accounts/user_default.png"
                                  }
                                />
                              </div>
                              <h2 className="Teams-name">
                                {" "}
                                {content.team_A.team_A_2}
                              </h2>
                            </div>
                          )}
                      </div>
                      <div className="columns">
                        <div className="Match-details">
                          <div
                            className="Match-score"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleModalShow(
                                content.id,
                                content.team_A_id,
                                content.team_B_id,
                                content.match_status,
                                content.team_A_score,
                                content.team_B_score
                              );
                            }}
                          >
                            <span className="Match-score-number match-score-number--leading">
                              {content.team_A_score != null
                                ? content.team_A_score
                                : "____"}
                            </span>
                            <span className="Match-score-divider">-</span>
                            <span className="Match-score-number">
                              {content.team_B_score != null
                                ? content.team_B_score
                                : "____"}
                            </span>
                          </div>
                          <div
                            className="date-wins"
                            onClick={(e) => {
                              e.stopPropagation();
                              showDateModalHandler(content.id);
                            }}
                          >
                            {content.match_date ? (
                              moment(content.match_date).format("DD MMM YYYY")
                            ) : (
                              <img
                                src="/images/tournament/cals.png"
                                className="mx-5 my-2"
                              ></img>
                            )}
                          </div>
                          <div
                            className="time-wins"
                            style={{ direction: "ltr" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              showTimeModalHandler(content.id);
                            }}
                          >
                            {content.start_time ? (
                              moment(content.start_time, "hh:mm:ss").format(
                                "hh:mm A"
                              )
                            ) : (
                              <i className="bi bi-clock "></i>
                            )}
                          </div>
                          <div className="Match-referee">
                            <button
                              type="button"
                              className=" btn-outline-secondary Matches-Time "
                            >
                              <MatchTimer match={content} home={home} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="Teams Teams--away">
                          <div className="Teams-logo">
                            <img
                              src={
                                content.team_B_logo.team_B_logo
                                  ? `${constants.port}${content.team_B_logo.team_B_logo}`
                                  : "/images/accounts/user_default.png"
                              }
                            />
                          </div>
                          <h2 className="Teams-name">
                            {content.team_B.team_B}
                          </h2>
                        </div>
                        {home &&
                          home.tournament_details.tournament_type !==
                            "Single" && (
                            <div className="Teams Teams--away">
                              <div className="Teams-logo">
                                <img
                                  src={
                                    content.team_B_logo.team_B_logo_2
                                      ? `${constants.port}${content.team_B_logo.team_B_logo_2}`
                                      : "/images/accounts/user_default.png"
                                  }
                                />
                              </div>
                              <h2 className="Teams-name">
                                {content.team_B.team_B_2}
                              </h2>
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="Live-Watches">
                      <svg
                        width="16"
                        height="19"
                        viewBox="0 0 16 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.87701 12.3541C5.64479 12.3541 3.82129 10.5387 3.82129 8.29315C3.82129 6.04755 5.64479 4.24268 7.87701 4.24268C10.1092 4.24268 11.9327 6.05804 11.9327 8.30364C11.9327 10.5492 10.1092 12.3541 7.87701 12.3541ZM7.87701 5.81669C6.51462 5.81669 5.39327 6.929 5.39327 8.30364C5.39327 9.67829 6.50414 10.7906 7.87701 10.7906C9.24988 10.7906 10.3607 9.67829 10.3607 8.30364C10.3607 6.929 9.2394 5.81669 7.87701 5.81669Z"
                          fill="#17A803"
                        />
                        <path
                          d="M7.87602 18.8422C6.72413 18.8422 5.56445 18.3777 4.66161 17.4568C2.36561 15.1006 -0.171663 11.3425 0.785653 6.87079C1.64957 2.81394 4.97294 0.99707 7.87602 0.99707C7.87602 0.99707 7.87602 0.99707 7.8838 0.99707C10.7869 0.99707 14.1102 2.81394 14.9742 6.87909C15.9237 11.3508 13.3864 15.1006 11.0904 17.4568C10.1876 18.3777 9.02791 18.8422 7.87602 18.8422ZM7.87602 2.2415C5.61115 2.2415 2.70029 3.52742 1.92976 7.14457C1.08919 11.0521 3.39298 14.4204 5.47884 16.5525C6.8253 17.938 8.93451 17.938 10.281 16.5525C12.3591 14.4204 14.6628 11.0521 13.8378 7.14457C13.0595 3.52742 10.1409 2.2415 7.87602 2.2415Z"
                          fill="#17A803"
                        />
                      </svg>{" "}
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          showStadiumModalHandler(content.id);
                        }}
                        className="mx-2 stadium"
                      >
                        {content.stadium_name
                          ? content.stadium_name
                          : "_________"}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </>
          ))
        : isIdExist && (
            <div style={{ textAlign: "center", margin: "30px" }}>
              <button
                onClick={() => generateMatchesHandler()}
                type="button"
                className="matches-btn"
              >
                {t("Generate Matches")}
              </button>
            </div>
          )}
    </Fragment>
  );
}

export default TournamentMatches;
