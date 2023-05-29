import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
function TournamentTabContent({data}) {
  console.log("dataLive",data)
  const router =useRouter()
  return (
    <Fragment>
      <h6 className="my-2" style={{ fontWeight: "600" }}>
        Live Tournament
      </h6>
      <div className="row ">
        <div className="col-lg-7 col-md-12">
          {data.map((item,index)=>(
            <Link key={index} href={`/tournament/${item.tournament_slug}`} style={{textDecoration:'none',color:'inherit'}}>
          <div key={index} className="card  tournaments ">
            <img
              src={`${constants.port}${item.image}`}
              className="live-image"
              alt="Card image cap"
            />
            <div className="live-contents">
              <p className="live-content1">{item.game_type}</p>
              <h6 className="live-content2">
                {item.tournament_name}
              </h6>
            </div>
            <div className="card-body ">
              <div className="live">
                <div className="ml-1">
                  <img
                    src={`${constants.port}${item.team_a.team_logo}`}
                    className="clubs"
                  ></img>
                  <p className="team1">{item.team_a.team_name} </p>
                </div>

                <div className="live-watch mx-5">
                  <p className="club-wins">{item.team_a.score} - {item.team_b.score}</p>
                  <button
                    type="button"
                    className=" btn-outline-secondary club-time"
                  >
                    {moment(item.time,"hh:mm:ss").format('hh:mm')}
                  </button>
                </div>

                <div className="ml-1">
                  <img
                    src={`${constants.port}${item.team_b.team_logo}`}
                    className="clubs"
                  ></img>
                  <p className="team2">{item.team_b.team_name} </p>
                </div>
              </div>

              <div className="video-play">
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
                <p className="mx-2 stadium">{item.playground_details.title}</p>
                <img
                  src="/images/tournament/video play.png"
                  className="live-play"
                ></img>
              </div>
            </div>
          </div>
          </Link>
          
          ))}
         
          <button onClick={()=>router.push('/tournament/all-tournament')} type="button" className="live-btn my-4">
            View all
          </button>
        </div>
        <div className="col-lg-5 col-md-6">
          <div className="live-ads">
            <img
              src="/images/tournament/Group 12.png"
              className="tournament-imx"
            ></img>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TournamentTabContent;
