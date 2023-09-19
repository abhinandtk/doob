import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Carousel,
  Card,
  Button,
  Form,
  CardImg,
  Tabs,
  Tab,
  Modal,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";

function HomePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="tour-container">
        <h5 className=" my-4" style={{ fontWeight: "600" }}>
          Tournaments
        </h5>
        <div className="topnav">
          <a className="active" href="#home">
            Tournaments
          </a>
          <a href="#news" className="mx-5">
            Ranks
          </a>
        </div>

        <h6 className="my-2" style={{ fontWeight: "600" }}>
          Live Tournament
        </h6>

        <div className="row ">
          <div className="col-lg-7 col-md-12">
            <div className="card  tournaments ">
              <div className="Match-content">
                <div className="columns">
                  <div className="Teams Teams--home">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/whufc.svg" />
                    </div>
                    <h2 className="Teams-name"> West Ham Chelsea Chelsea</h2>
                  </div>
                  <div className="Teams Teams--home">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/whufc.svg" />
                    </div>
                    <h2 className="Teams-name"> West Ham Chelsea Chelsea</h2>
                  </div>
                </div>
                <div className="columns">
                  <div className="Match-details">
                    <div className="Match-score">
                      <span className="Match-score-number match-score-number--leading">
                        ___
                      </span>
                      <span className="Match-score-divider">-</span>
                      <span className="Match-score-number">___</span>
                    </div>
                    <div className="Match-date">
                      <img src="/images/tournament/cals.png" />
                    </div>
                    <div className="Match-time-lapsed">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div className="Match-referee">
                      <button
                        type="button"
                        className=" btn-outline-secondary Matches-Time "
                      >
                        00:00
                      </button>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="Teams Teams--away">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/chelsea.svg" />
                    </div>
                    <h2 className="Teams-name">Chelsea Chelsea Chelsea Chelsea</h2>
                  </div>
                  <div className="Teams Teams--away">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/chelsea.svg" />
                    </div>
                    <h2 className="Teams-name">Chelsea Chelsea Chelsea Chelsea</h2>
                  </div>
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
                <p className="mx-2 stadium">Mohammed Al-Hamad Stadium </p>
              </div>
            </div>

            <div className="card  tournaments ">
              <div className="Match-content">
                <div className="columns">
                  <div className="Teams Teams--home">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/whufc.svg" />
                    </div>
                    <h2 className="Teams-name"> West Ham Chelsea Chelsea</h2>
                  </div>
                  <div className="Teams Teams--home">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/whufc.svg" />
                    </div>
                    <h2 className="Teams-name"> West Ham Chelsea Chelsea</h2>
                  </div>
                </div>

                <div className="columns">
                  <div className="Match-details">
                    <div className="Match-score1">
                      <span className="Match-score-number match-score-number--leading">
                        1
                      </span>
                      <span className="Match-score-divider">-</span>
                      <span className="Match-score-number">0</span>
                    </div>
                    <div className="Match-date">
                      <img src="/images/tournament/cals.png" />
                    </div>
                    <div className="Match-time-lapsed">
                      <i className="bi bi-clock"></i>
                    </div>

                    <div className="Match-referee">
                      <button
                        type="button"
                        className=" btn-outline-secondary Matches-Time "
                      >
                        45 Min
                      </button>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="Teams Teams--away">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/chelsea.svg" />
                    </div>
                    <h2 className="Teams-name">Chelsea Chelsea Chelsea Chelsea</h2>
                  </div>

                  <div className="Teams Teams--away">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/chelsea.svg" />
                    </div>
                    <h2 className="Teams-name">Chelsea Chelsea Chelsea Chelsea</h2>
                  </div>
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
                <p className="mx-2 stadium">Mohammed Al-Hamad Stadium </p>
              </div>
            </div>

            <div className="card  tournaments ">
              <img
                src="https://doobapi.9pc.in/media/tournament_image/Kuwait_Premier_League_1wuzQ6z.png"
                className="live-image"
              ></img>
              <div className="live-contents">
                <p className="live-content1">Football</p>
                <h6 className="live-content2">Kuwait Premier League</h6>
              </div>
              <div className="Match-contents">
                <div className="columns">
                  <div className="Teams Teams--home">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/whufc.svg" />
                    </div>
                    <h2 className="Teams-name"> West Ham Chelsea Chelsea</h2>
                  </div>
                </div>

                <div className="columns">
                  <div className="Match-details">
                    <div className="Match-score1">
                      <span className="Match-score-number match-score-number--leading">
                        1
                      </span>
                      <span className="Match-score-divider">-</span>
                      <span className="Match-score-number">0</span>
                    </div>

                    <div className="Match-referee">
                      <button
                        type="button"
                        className=" btn-outline-secondary Matches-Time "
                      >
                        45 Min
                      </button>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="Teams Teams--away">
                    <div className="Teams-logo">
                      <img src="https://assets.codepen.io/285131/chelsea.svg" />
                    </div>
                    <h2 className="Teams-name">Chelsea Chelsea Chelsea Chelsea</h2>
                  </div>
                </div>
              </div>

              <div className="Live-Watching">
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
                <img
                  src="/images/tournament/video play.png"
                  className="play-tour"
                ></img>
              </div>
            </div>

            <button type="button" className="live-btn ">
              View all
            </button>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="live-ads">
              <img
                src="../images/tournament/Group 12.png"
                className="tournament-imx"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
