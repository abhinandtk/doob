import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import TimeLineCard from "@/components/tournament/view/TimeLineCard";
import { Button, Input, Modal, Select, notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import MobileFooter from "@/components/shared/MobileFooter";
function MatchTimelinePage() {
  const router = useRouter();
  const { mId } = router.query;

  const labels = Labels();

  const [visible, setVisible] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);

  const [timeLineData, setTimelineData] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    time: "",
    team: "",
  });
  useEffect(() => {
    Axios.post(
      apis.matchDetail,
      {
        match_id: mId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setTimelineData(res.data.data);
      console.log("qqqqqqqqq", timeLineData);
    });
  }, [mId, onSuccess]);

  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData({ ...newData });
  };

  const handleTimelineSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      apis.createTimeline,
      {
        tournament_id: timeLineData.tournament_details
          ? timeLineData.tournament_details.tournament_id
          : "",
        match_id: mId,
        type: formData.type,
        text: formData.description,
        time: formData.time,
        team_a_slug:
          formData.team === timeLineData.tournament_details?.team_a.team_slug
            ? timeLineData.tournament_details.team_a.team_slug
            : "",
        team_b_slug:
          formData.team === timeLineData.tournament_details?.team_b.team_slug
            ? timeLineData.tournament_details.team_b.team_slug
            : "",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setOnSuccess((prev) => !prev);
      if (res.data.status === 1) {
        setFormData({
          type: "",
          description: "",
          time: "",
          team: "",
        });

        setVisible(false);
        notification.success({
          message: constants.Success,
          description: `${labels["Match details created"]}`,
        });
      }
      console.log("win", res);
    });
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      {timeLineData && timeLineData.tournament_details && (
        <>
          <Modal
            title="Add TimeLine"
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <form onSubmit={(e) => handleTimelineSubmit(e)}>
              <div className="form-group my-2">
                <label for="exampleFormControlInput1">Type</label>
                <input
                  required
                  type="text"
                  class="form-control p-2"
                  style={{
                    border: "0px",
                    background: "#eeeeee",
                    color: "grey",
                  }}
                  id="type"
                  onChange={(e) => handleChange(e)}
                  value={formData.type}
                />
              </div>
              <div className="form-group my-2">
                <label for="exampleFormControlInput1">Description</label>
                <input
                  required
                  type="text"
                  class="form-control p-2"
                  style={{
                    border: "0px",
                    background: "#eeeeee",
                    color: "grey",
                  }}
                  id="description"
                  onChange={(e) => handleChange(e)}
                  value={formData.description}
                />
              </div>
              <div className="form-group my-2">
                <label for="exampleFormControlInput1">Time</label>
                <input
                  required
                  type="text"
                  class="form-control p-2"
                  style={{
                    border: "0px",
                    background: "#eeeeee",
                    color: "grey",
                  }}
                  id="time"
                  onChange={(e) => handleChange(e)}
                  value={formData.time}
                />
              </div>
              <div class="form-group my-2">
                <label for="exampleFormControlSelect1">Team</label>
                <select
                  class="form-control   "
                  style={{
                    border: "0px",
                    background: "#eeeeee",
                    color: "grey",
                  }}
                  id="team"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">--select team--</option>
                  <option
                    value={timeLineData.tournament_details.team_a.team_slug}
                  >
                    {timeLineData.tournament_details.team_a.team_name}
                  </option>
                  <option
                    value={timeLineData.tournament_details.team_b.team_slug}
                  >
                    {timeLineData.tournament_details.team_b.team_name}
                  </option>
                </select>
              </div>
              <div style={{ textAlign: "end" }}>
                <button
                  key="save"
                  type="submit"
                  className="timeline-btn"
                  style={{ backgroundColor: "#17A803" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <div className="tour-container">
            <div className="row ">
              <div className="col-lg-7 col-md-12">
                <div class="card  tournament2 my-5">
                  <img
                    src={`${constants.port}/media/${timeLineData.tournament_details.image}`}
                    className="live-image2"
                    alt="Card image cap"
                  />
                  <div className="live-icon1">
                    <span>
                      <svg
                        width="16"
                        height="19"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.07134 8.26835C1.17766 7.82151 1.28596 6.51304 2.24093 6.2192L19.7499 0.831827C20.5997 0.570357 21.3956 1.3663 21.1342 2.21608L15.7468 19.725C15.4529 20.68 14.1445 20.7883 13.6976 19.8946L9.9873 12.474C9.88014 12.2596 9.70634 12.0858 9.492 11.9787L2.07134 8.26835Z"
                          stroke="white"
                          stroke-width="1.39898"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.9043 12.0586L15.2715 6.69141"
                          stroke="white"
                          stroke-width="1.39898"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span className="mx-4">
                        <svg
                          width="5"
                          height="18"
                          viewBox="0 0 5 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.42188 2.12194C1.42188 1.3815 2.04822 0.78125 2.82085 0.78125C3.59349 0.78125 4.21983 1.3815 4.21983 2.12194C4.21983 2.86238 3.59349 3.46262 2.82085 3.46262C2.04822 3.46262 1.42188 2.86238 1.42188 2.12194Z"
                            stroke="white"
                            stroke-width="1.39898"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.42188 10.1688C1.42188 9.42837 2.04822 8.82812 2.82085 8.82812C3.59349 8.82812 4.21983 9.42837 4.21983 10.1688C4.21983 10.9093 3.59349 11.5095 2.82085 11.5095C2.04822 11.5095 1.42188 10.9093 1.42188 10.1688Z"
                            stroke="white"
                            stroke-width="1.39898"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.42188 18.2118C1.42188 17.4713 2.04822 16.8711 2.82085 16.8711C3.59349 16.8711 4.21983 17.4713 4.21983 18.2118C4.21983 18.9522 3.59349 19.5525 2.82085 19.5525C2.04822 19.5525 1.42188 18.9522 1.42188 18.2118Z"
                            stroke="white"
                            stroke-width="1.39898"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>

                  <div class="card-body ">
                    <div className="">
                      <div className="league_clearfix">
                        <div className="float-start mx-2">
                          <h6 className="league">
                            {timeLineData.tournament_details.tournament_name}
                          </h6>
                          <p className="league1">
                            {timeLineData.tournament_details.game_type}
                          </p>
                        </div>
                        <div className="float-end my-3 mx-3">
                          <span>
                            <img
                              src="/images/tournament/match.png"
                              className="knock-img1"
                            ></img>
                            <span className="mx-1 knock-text1">
                              {timeLineData.tournament_details.tournament_mode}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card tournament3 ">
                  <div className="card-body  ">
                    <div className="timeline">
                      <div className="timeline1">
                        <img
                          src={`${constants.port}/media/${timeLineData.tournament_details.team_a.team_logo}`}
                          className="clubs"
                        ></img>
                        <p className="team1">
                          {timeLineData.tournament_details.team_a.team_name}{" "}
                        </p>
                      </div>

                      <div className="timeline-watch mx-5">
                        <p className="timeline-wins">
                          {timeLineData.tournament_details.team_a.score} -{" "}
                          {timeLineData.tournament_details.team_b.score}
                        </p>
                        <button
                          type="button"
                          className=" btn-outline-secondary club-time"
                        >
                          45 Min
                        </button>
                      </div>

                      <div className="timeline2">
                        <img
                          src={`${constants.port}/media/${timeLineData.tournament_details.team_b.team_logo}`}
                          className="clubs"
                        ></img>
                        <p className="team2">
                          {timeLineData.tournament_details.team_b.team_name}{" "}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: "end" }}>
                      <button
                        onClick={() => setVisible(true)}
                        type="button"
                        className="timeline-btn"
                      >
                        Add
                      </button>
                    </div>

                    <TimeLineCard data={timeLineData.time_line} />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="live-ads">
                  <img
                    src="/images/tournament/Group 12.png"
                    className="tournament-imx2"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <MobileFooter />
    </div>
  );
}

export default MatchTimelinePage;
