import MobileHeader from "@/components/MobileHeader";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";

function MatchTimelinePage() {
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="tour-container">
        <div className="row ">
          <div className="col-lg-7 col-md-12">
            <div class="card  tournament2 my-5">
              <img
                src="/images/tournament/soccer-players-action-professional-stadium 2.png"
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
                      <h6 className="league">Kuwait Premier League</h6>
                      <p className="league1">Football</p>
                    </div>
                    <div className="float-end my-3 mx-3">
                      <span>
                        <img
                          src="/images/tournament/match.png"
                          className="knock-img1"
                        ></img>
                        <span className="mx-1 knock-text1">Knockout</span>
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
                      src="/images/tournament/Barcelona.png"
                      className="clubs"
                    ></img>
                    <p className="team1">Barcelona </p>
                  </div>

                  <div className="timeline-watch mx-5">
                    <p className="timeline-wins">2 - 3</p>
                    <button
                      type="button"
                      className=" btn-outline-secondary club-time"
                    >
                      45 Min
                    </button>
                  </div>

                  <div className="timeline2">
                    <img
                      src="/images/tournament/Munchen.png"
                      className="clubs"
                    ></img>
                    <p className="team2">Al-Salmiya </p>
                  </div>
                </div>

                <div class="contain ">
                  <div class="timeline-block timeline-block-left">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Game Start at 2:30 PM</span>
                    </div>
                  </div>
                  <div class="timeline-block timeline-block-left ">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Goal by Al Imran - 30’</span>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-right ">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Goal by Ali Sadath - 38</span>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-left ">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Goal by Al Imran - 40’</span>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-right ">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Goal by Ahamed - 66’</span>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-right ">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Goal by Ahamed - 66’</span>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-left ">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <span>Goal by Al Imran - 40’</span>
                    </div>
                  </div>
                </div>
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
    </div>
  );
}

export default MatchTimelinePage;
