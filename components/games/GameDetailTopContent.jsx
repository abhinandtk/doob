import React from "react";
import { Fragment } from "react";
import moment from "moment";
import constants from "@/public/data/my-constants/Constants";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import { useRouter } from "next/router";
function GameDetailTopContent({ details }) {
  console.log(";909090909", details);
  const router = useRouter();
  const { gameId } = router.query;

  const timeConvertHandler = (time) => {
    const timeConvert = moment(time, "HH:mm:ss").format("h:mm A");
    console.log("answerrrrr", timeConvert);
    return timeConvert;
  };

  const dateConvertHandler = (date) => {
    const dateConvert = moment(date).format("D MMM, YYYY");
    return dateConvert;
  };

  const joinGameHandler = (id) => {
    Axios.post(
      apis.inviteUser,
      {
        user_id: [id],
        game_slug: gameId,
        type: "join",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("joingame", res);
    });
  };
  return (
    <Fragment>
      {details && (
        <>
          <div className="row">
            <div className="col-md-7 ">
              {details.game && details.game.game_image[0] && (
                <img
                  src={`${constants.port}${details.game.game_image[0].image}`}
                  style={{ objectFit: "cover",width:'100%',height:'300px' }}
                ></img>
              )}
            </div>
            <div className="col-md-4 mx-4">
              <div className="game-info">
                <h5 style={{ fontWeight: "700", fontSize: "15px" }}>
                  {details.title}
                </h5>
                <div className="field-clearfix ">
                  <p
                    className="float-start"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {details.game.game_title}
                  </p>
                  <img
                    className="logox"
                    src="../images/tournament/logox.png"
                  ></img>
                </div>

                <div className="field-info">
                  <span>
                    <img
                      src={`${constants.port}${details.created_by.profile_pic}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    ></img>
                    <span
                      className="mx-1"
                      style={{
                        color: "#17A803",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Hosted by
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      {details.created_by.hosted_by}
                    </span>
                  </span>
                  <br></br>
                  <span>
                    <i class="bi bi-clock"></i>
                    <span
                      className="mx-2"
                      style={{ fontWeight: "500", fontSize: "14px" }}
                    >
                      {dateConvertHandler(details.game_date)}
                    </span>
                    <span style={{ fontWeight: "500", fontSize: "14px" }}>
                      {details.stadium.time_slots &&
                        timeConvertHandler(
                          details.stadium.time_slots[0].start_time
                        )}
                      -
                      {details.stadium.time_slots &&
                        timeConvertHandler(
                          details.stadium.time_slots[
                            details.stadium.time_slots.length - 1
                          ].end_time
                        )}
                    </span>
                  </span>
                  <br></br>
                  <span>
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
                    <span
                      className="mx-2"
                      style={{ fontWeight: "500", fontSize: "14px" }}
                    >
                      {details.stadium.stadium_name}
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#959595",
                      }}
                    >
                      {details.stadium.location}, {details.stadium.area}
                    </span>
                  </span>

                  {details.created_by.created_by_id != constants.user_id && (
                    <>
                      <button
                        type="button"
                        onClick={() => joinGameHandler(constants.user_id)}
                        className=" field-btn"
                      >
                        Join
                      </button>
                      {/* <button type="button" className=" field-btn" style={{backgroundColor:'red'}}>
                        Left
                      </button> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="field-content">
            <h5 style={{ fontWeight: "700", fontSize: "15px" }}>Description</h5>
            <p className="col-md-12">{details.description}</p>
          </div>
          <div className="clearfix more">
            <div className="float-end">
              More <i className="bi bi-chevron-down "></i>
            </div>
          </div>
          <hr></hr>
        </>
      )}
    </Fragment>
  );
}

export default GameDetailTopContent;
