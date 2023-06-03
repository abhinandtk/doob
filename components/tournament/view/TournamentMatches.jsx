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
function TournamentMatches({ data, setOnSuccess, admin, home }) {
  console.log(
    "dddddddaaaaaaaaaata,data",
    home && home.tournament_details.game_name_id
  );

  const router = useRouter();
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

  const getMatchTime = (time, date) => {
    const startDate = moment(date, "YYYY-MM-DD");
    const startTime = moment(time, "HH:mm:ss");

    const startDateTime = startDate.clone().set({
      hour: startTime.hours(),
      minute: startTime.minutes(),
      second: startTime.seconds(),
    });

    const currentTime = moment();

    if (currentTime.isBefore(startDateTime)) {
      return "00:00";
    }

    const diff = moment.duration(Math.abs(startDateTime.diff(currentTime)));
    let totalMinutes = Math.floor(diff.asMinutes());
    let seconds = diff.seconds();

    if (totalMinutes > 90) {
      return "90:00";
    }

    let matchTime = `${totalMinutes}:${seconds}`;

    console.log("matchTime:", matchTime);
    return matchTime;
  };

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
          message: constants.Success,
          description: `${labels["Match generated"]}`,
        });
      } else if (res.data.status === 2) {
        notification.info({
          message: constants.Error,
          description: `${labels["Maximum participants no match"]}`,
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

  const handleModalShow = (match, teamA, teamB) => {
    if (isIdExist) {
      setVisible(true);
      setMatchId(match);
      setTeamAid(teamA);
      setTeamBid(teamB);
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

    Axios.post(apis.updateMatchResult, updatedMatch, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: constants.Success,
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
        title="Select Stadium"
      >
        <Input
          placeholder="Enter Stadium"
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
                console.log("opppppppppppppppppppp", item.id);

                handleMatchUpdate(item.id, "stadium");
              }}
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <a className="me-2" href="">
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
                        className="mb-0"
                        style={{
                          fontWeight: "600",
                          color: "#000",
                          fontSize: "15px",
                        }}
                      >
                        {item.stadium_name}
                      </p>
                    </div>

                    <p
                      className="small "
                      style={{
                        color: "#000",
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
        title="Enter Match Score"
        onCancel={() => setVisible(false)}
        footer={
          <Button
            key="save"
            type="primary"
            style={{ backgroundColor: "#17A803" }}
            onClick={() => handleMatchUpdate(null, "score")}
          >
            Save
          </Button>
        }
      >
        <Input.Group compact>
          <Input
            style={{ width: "30%" }}
            value={teamAScore}
            onChange={(e) => setTeamAScore(e.target.value)}
            placeholder="Team A Score"
          />
          <span style={{ margin: "0 8px" }}>-</span>
          <Input
            type="number"
            style={{ width: "40%" }}
            value={teamBScore}
            onChange={(e) => setTeamBScore(e.target.value)}
            placeholder="Team B Score"
          />
        </Input.Group>
        <br></br>

        <Select
          // defaultValue=""
          placeholder="Match Status"
          style={{
            border: "0px",
            background: "#eeeeee",
            color: "grey",
            width: "100%",
          }}
          id="team"
          onChange={(value) => setMatchStatus(value)}
          value={matchStatus}
        >
          <Select.Option value={""}>--Select Status--</Select.Option>
          <Select.Option value={0}>End</Select.Option>
          <Select.Option value={1}>Live</Select.Option>
          {/* <Select.Option value={2}>Stop</Select.Option> */}
          <Select.Option value={3}>Start soon</Select.Option>
        </Select>
      </Modal>
      <Modal
        open={visibleDate}
        title="Enter Date"
        onCancel={() => setVisibleDate(false)}
        footer={
          <Button
            key="save"
            type="primary"
            style={{ backgroundColor: "#17A803" }}
            onClick={() => handleMatchUpdate(null, "date")}
          >
            Save
          </Button>
        }
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD"
          placeholder="Select Date "
          onChange={(date) => setMatchDate(date)}
          value={matchDate}
        />
      </Modal>
      <Modal
        open={visibleTime}
        title="Enter Time"
        onCancel={() => setVisibleTime(false)}
        footer={
          <Button
            key="save"
            type="primary"
            style={{ backgroundColor: "#17A803" }}
            onClick={() => handleMatchUpdate(null, "time")}
          >
            Save
          </Button>
        }
      >
        <TimePicker
          placeholder="Select Time "
          format="HH:mm:ss"
          onChange={(time) => setMatchTime(time)}
          value={matchTime}
        />
      </Modal>

      {data.length >= 1 ? (
        data.map((item, index) => (
          <>
            <h6
              key={index}
              className="my-4"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              {item.match_type}
            </h6>

            {item.matches.map((content, index_) => (
              <div key={index_} className="card football1">
                <div className="card-body p-5 mx-4">
                  <div className="live1">
                    <Link
                      href={`/tournament/match/${content.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className=" watch1 ">
                        {content.team_A_logo !== null ? (
                          <img
                            src={`${constants.port}${content.team_A_logo}`}
                            className="clubs"
                          ></img>
                        ):'Team A?'}
                        <p className="team1">{content.team_A} </p>
                      </div>

                      <div className="watch2 ">
                        {content.team_B_logo !== null ? (
                          <img
                            src={`${constants.port}${content.team_B_logo}`}
                            className="clubs"
                          ></img>
                        ):'Team B?'}
                        <p className="team2">{content.team_B}</p>
                      </div>
                    </Link>
                    <div className="live-watch1 " style={{cursor:'ponter'}}>
                      <p
                        onClick={() =>
                          handleModalShow(
                            content.id, 
                            content.team_A_id,
                            content.team_B_id
                          )
                        }
                        className="space-line"
                      >
                        {content.team_A_score !=null ? content.team_A_score : "____"}
                        &nbsp;-&nbsp;
                        {content.team_B_score !=null? content.team_B_score : "____"}
                      </p>
                      <p
                        onClick={() => showDateModalHandler(content.id)}
                        className="date-wins"
                      >
                        {content.match_date ? (
                          moment(content.match_date).format("DD MMM YYYY")
                        ) : (
                          <img
                            src="/images/tournament/cals.png"
                            className="mx-5 my-2"
                          ></img>
                        )}
                      </p>
                      <p
                        onClick={() => showTimeModalHandler(content.id)}
                        className="time-wins"
                      >
                        {content.start_time ? (
                          moment(content.start_time, "hh:mm:ss").format(
                            "hh:mm A"
                          )
                        ) : (
                          <i className="bi bi-clock "></i>
                        )}
                      </p>
                      
                      <button
                        type="button"
                        className=" btn-outline-secondary left-time"
                      >
                        {content.match_date
                          ? getMatchTime(content.start_time, content.match_date)
                          : "00:00"}
                      </button>
                    </div>
                  </div>
                  <div className="watch-play ">
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
                    </svg>
                    <p
                      onClick={() => showStadiumModalHandler(content.id)}
                      className="mx-2 stadium"
                    >
                      {content.stadium_name
                        ? content.stadium_name
                        : "_________"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))
      ) : (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <button
            onClick={() => generateMatchesHandler()}
            type="button"
            className="matches-btn"
          >
            Generate Matches
          </button>
        </div>
      )}

      {/* <div className="card football1 my-4">
        <div className="card-body p-5 mx-4">
          <div className="live1">
            <div className=" watch1 ">
              <img
                src="../images/tournament/Barcelona.png"
                className="clubs"
              ></img>
              <p className="team1">Barcelona </p>
            </div>

            <div className="live-watch ">
              <p className="club-wins">2 - 3</p>
              <p className="date-wins">13 Feb 2023</p>
              <p className="time-wins">12.00 PM</p>
              <button
                type="button"
                className=" btn-outline-secondary left-time"
              >
                45 Min
              </button>
            </div>

            <div className="watch2 ">
              <img
                src="../images/tournament/Munchen.png"
                className="clubs"
              ></img>
              <p className="team2">Al-Salmiya </p>
            </div>
          </div>
          <div className="watch-play">
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
            <p className="mx-2 stadium">Mohammed Al‑Hamad Stadium </p>
          </div>
        </div>
      </div>

      <h6 className="my-2" style={{ fontSize: "15px", fontWeight: "600" }}>
        SemiFinals
      </h6>

      <div className="card football1 my-2">
        <div className="card-body p-5 mx-4">
          <div className="live1">
            <div className=" watch1 ">
              <img
                src="../images/tournament/Barcelona.png"
                className="clubs"
              ></img>
              <p className="team1">Barcelona </p>
            </div>

            <div className="live-watch ">
              <p className="club-wins">2 - 3</p>
              <p className="date-wins">13 Feb 2023</p>
              <p className="time-wins">12.00 PM</p>
              <button
                type="button"
                className=" btn-outline-secondary left-time"
              >
                45 Min
              </button>
            </div>

            <div className="watch2 ">
              <img
                src="../images/tournament/Munchen.png"
                className="clubs"
              ></img>
              <p className="team2">Al-Salmiya </p>
            </div>
          </div>
          <div className="watch-play">
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
            <p className="mx-2 stadium">Mohammed Al‑Hamad Stadium </p>
          </div>
        </div>
      </div>

      <div className="card football1 my-3">
        <div className="card-body p-5 mx-4">
          <div className="live1">
            <div className=" watch1 ">
              <img
                src="../images/tournament/Barcelona.png"
                className="clubs"
              ></img>
              <p className="team1">Barcelona </p>
            </div>

            <div className="live-watch ">
              <p className="space-line">____ ____</p>
              <p className="date-wins">13 Feb 2023</p>
              <p className="time-wins">12.00 PM</p>
              <button
                type="button"
                className=" btn-outline-secondary left-time"
              >
                45 Min
              </button>
            </div>

            <div className="watch2 ">
              <img
                src="../images/tournament/Munchen.png"
                className="clubs"
              ></img>
              <p className="team2">Al-Salmiya </p>
            </div>
          </div>
          <div className="watch-play">
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
            <p className="mx-2 stadium">Mohammed Al‑Hamad Stadium </p>
          </div>
        </div>
      </div>

      <h6 className="my-2" style={{ fontSize: "15px", fontWeight: "600" }}>
        Finals
      </h6>

      <div className="card football1 my-2">
        <div className="card-body p-5 mx-4">
          <div className="live1">
            <div className=" watch1 ">
              <p className="team3">Team A?</p>
            </div>

            <div className="live-watch ">
              <p className="space-line">____ ____</p>
              <img
                src="../images/tournament/cals.png"
                className="mx-5 my-2"
              ></img>
              <br></br>
              <i className="bi bi-clock " style={{ marginLeft: "50px" }}></i>
            </div>

            <div className="watch2 ">
              <p className="team4">Team B? </p>
            </div>
          </div>
          <div className="watch-play1">
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
            <p className="mx-2 stadium">Mohammed Al‑Hamad Stadium </p>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
}

export default TournamentMatches;
