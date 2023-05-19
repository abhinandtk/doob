import constants from "@/public/data/my-constants/Constants";
import React from "react";
import { Fragment } from "react";

function TournamentCardDetails({data}) {
  return (
    <Fragment>
      <div class="card  tournament1 my-2">
        <img
          src={`${constants.port}${data.image}`}
          className="live-image1"
          alt="Card image cap"
        />
        <div className="live-icon">
          <span>
            <svg
              width="22"
              height="22"
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
                height="21"
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
        <div className="contents">
          <p className="content1">{data.game_type}</p>
          <h6 className="content2">
            {data.tournament_name}
          </h6>
        </div>

        <div class="card-body ">
          <div className="my-2">
            <span>
              <img
                src="/images/tournament/match.png"
                className="knock-img"
              ></img>
              <span className="mx-1 knock-text">{data.tournament_mode}</span>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TournamentCardDetails;
