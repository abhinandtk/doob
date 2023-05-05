import "bootstrap-icons/font/bootstrap-icons.css";

import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import GamesCard from "@/components/playGround/GamesCard";
import { Modal } from "antd";
import { Button } from "react-bootstrap";
import NewGameForm from "@/components/playGround/NewGameForm";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Axios from "axios";

function PlayGroundPage() {
  const [game, setGame] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [country, setCountry] = useState([]);
  useEffect(() => {
    Axios.get(apis.listGameAmenities, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setAmenity(res.data.data.amenities);
      setGame(res.data.data.games);
      console.log("ggggggggg", res.data.data);
    });

    Axios.get(apis.commonList, {
      headers: {
        'Authorization': `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCountry(res.data.country);
      console.log("fffffffffff", res);
    });
  }, []);
  return (
    <div>
      <div className="tour-container">
        <form className="nosubmit ">
          <span>
            {" "}
            <input className="nosubmit1" type="search" placeholder="Search" />
            <img
              src="../images/tournament/Fil-icon.png"
              className="filters-icon"
            ></img>
          </span>
        </form>
        <div id="carouselExampleIndicators" class="carousel slide my-2">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 5"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="../images/tournament/soccer-players-action-professional-stadium 2.png"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div className="row game">
          <div className="col-md-6">
            <button type="button" className="notification-btn ">
              <svg
                width="31"
                height="22"
                className="me-2"
                viewBox="0 0 31 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5917 18.8623C16.9643 18.8623 18.077 17.7496 18.077 16.377C18.077 15.0044 16.9643 13.8917 15.5917 13.8917C14.2191 13.8917 13.1064 15.0044 13.1064 16.377C13.1064 17.7496 14.2191 18.8623 15.5917 18.8623Z"
                  fill="#FFC850"
                />
                <path
                  d="M24.0273 19.8403C23.9002 19.8403 23.773 19.7918 23.6759 19.6947C23.4817 19.5005 23.4817 19.186 23.6759 18.9919C27.4596 15.2079 28.1028 9.20419 25.2054 4.71618C25.0564 4.48562 25.1224 4.17787 25.3535 4.02882C25.5826 3.88024 25.8913 3.9458 26.0404 4.17688C29.1901 9.05567 28.4916 15.5819 24.3789 19.6948C24.2817 19.7918 24.1545 19.8403 24.0273 19.8403Z"
                  fill="#FFF082"
                />
                <path
                  d="M24.5394 3.51376C24.4021 3.51376 24.2652 3.45723 24.1672 3.34608C24.0099 3.16822 23.8459 2.99367 23.6754 2.82332C23.4818 2.62915 23.4818 2.31441 23.676 2.12048C23.8701 1.92683 24.1851 1.92631 24.3793 2.121C24.5632 2.30544 24.7409 2.49454 24.9118 2.68743C25.0938 2.89301 25.0744 3.20705 24.869 3.38911C24.7744 3.47271 24.6569 3.51376 24.5394 3.51376Z"
                  fill="#FFF082"
                />
                <path
                  d="M5.39954 21.5978C5.27239 21.5978 5.14518 21.5493 5.04812 21.4522C-0.766041 15.6383 -0.766041 6.17825 5.04812 0.364375C5.24229 0.170208 5.5568 0.170208 5.75097 0.364375C5.94513 0.558541 5.94513 0.87305 5.75097 1.06722C0.324668 6.49351 0.324668 15.323 5.75097 20.7493C5.94513 20.9435 5.94513 21.2581 5.75097 21.4522C5.65391 21.5493 5.5267 21.5978 5.39954 21.5978Z"
                  fill="#FFF7C0"
                />
                <path
                  d="M25.7842 21.5977C25.6569 21.5977 25.5298 21.5492 25.4327 21.4521C25.2386 21.2579 25.2386 20.9434 25.4327 20.7492C30.859 15.3229 30.859 6.49345 25.4327 1.06709C25.2386 0.872928 25.2386 0.558419 25.4327 0.364253C25.6269 0.170086 25.9415 0.170086 26.1356 0.364253C31.9497 6.17813 31.9497 15.6382 26.1356 21.4521C26.0385 21.5492 25.9114 21.5977 25.7842 21.5977Z"
                  fill="#FFF7C0"
                />
                <path
                  d="M5.56103 17.8644C5.39796 17.8644 5.23826 17.7843 5.14306 17.637C1.99332 12.7583 2.69179 6.232 6.80463 2.11917C6.9988 1.925 7.3133 1.925 7.50747 2.11917C7.70164 2.31333 7.70164 2.62784 7.50747 2.82201C3.72376 6.60601 3.08059 12.6097 5.97795 17.0978C6.12694 17.3283 6.06097 17.6361 5.8299 17.7851C5.74693 17.8387 5.65331 17.8644 5.56103 17.8644Z"
                  fill="#FFF082"
                />
                <path
                  d="M7.1557 19.8391C7.02855 19.8391 6.90081 19.7906 6.80382 19.6932C6.61984 19.5088 6.44221 19.3197 6.27133 19.1268C6.08927 18.9212 6.10872 18.6072 6.31406 18.4251C6.51941 18.2433 6.83444 18.2617 7.01597 18.468C7.17323 18.6459 7.33729 18.8204 7.50771 18.9908C7.70135 19.185 7.70135 19.4997 7.50718 19.6936C7.41007 19.7906 7.28291 19.8391 7.1557 19.8391Z"
                  fill="#FFF082"
                />
                <path
                  d="M21.0591 12.3717V8.91835C21.0591 5.89867 18.6112 3.45078 15.5915 3.45078C12.5718 3.45078 10.1239 5.89867 10.1239 8.91835V12.3717C10.1239 12.7103 10.0086 13.0388 9.79719 13.3032L8.29701 15.1784C8.19262 15.3089 8.13574 15.471 8.13574 15.6382C8.13574 16.0446 8.46521 16.3742 8.87171 16.3742H22.3114C22.7178 16.3742 23.0474 16.0447 23.0474 15.6382C23.0474 15.471 22.9906 15.309 22.8861 15.1784L21.3859 13.3032C21.1744 13.0388 21.0591 12.7102 21.0591 12.3717Z"
                  fill="#FFDC64"
                />
                <path
                  d="M19.0704 10.6275C18.7273 10.6275 18.4491 10.3493 18.4491 10.0062V8.91888C18.4491 8.2466 18.2103 7.59325 17.7764 7.07898C17.555 6.81658 17.588 6.4247 17.8506 6.20328C18.1127 5.98216 18.5049 6.01564 18.7258 6.27751C19.3485 7.01581 19.6917 7.95363 19.6917 8.91888V10.0062C19.6917 10.3494 19.4137 10.6275 19.0704 10.6275ZM16.5842 6.20526C16.5255 6.20526 16.4653 6.19676 16.4066 6.17906C16.2362 6.12853 16.0605 6.09365 15.8833 6.07566C15.5421 6.04067 15.2935 5.73589 15.3285 5.39436C15.3635 5.05266 15.6741 4.80266 16.0095 4.83929C16.2638 4.86525 16.5167 4.91526 16.7609 4.98827C17.09 5.08608 17.2774 5.43221 17.1793 5.76104C17.0987 6.03072 16.8517 6.20526 16.5842 6.20526Z"
                  fill="#FFF082"
                />
                <path
                  d="M10.1239 8.91835V12.3717C10.1239 12.7103 10.0086 13.0388 9.79719 13.3032L8.29701 15.1784C8.19262 15.3089 8.13574 15.471 8.13574 15.6381C8.13574 16.0446 8.46521 16.3741 8.87171 16.3741H11.5597C11.3158 16.3741 11.1181 16.0446 11.1181 15.6381C11.1181 15.471 11.1522 15.3089 11.2149 15.1784L12.115 13.3032C12.2418 13.0388 12.311 12.7103 12.311 12.3717V8.91835C12.311 5.89867 13.7798 3.45078 15.5916 3.45078C12.5718 3.45078 10.1239 5.89861 10.1239 8.91835Z"
                  fill="#FFC850"
                />
              </svg>
              5 New Invitations
            </button>
          </div>
          <div className="col-md-6">
            <button type="button" className="notification1-btn ">
              You have 2 upcoming bookings
            </button>
          </div>
        </div>

        
        <NewGameForm  game={game} country={country} />

        <GamesCard />
        <section>
          <div className="clearfix near ">
            <h5
              className="float-start"
              style={{
                fontWeight: "700",
                fontSize: "19px",
                marginLeft: "-6px",
              }}
            >
              Games near me
            </h5>
            <p className="float-end" style={{ color: "#959595" }}>
              View all
            </p>
          </div>
        </section>
        <section className="">
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button type="button" className="btn btn-outline-secondary select ">
              Football
            </button>
          </div>
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              className="btn btn-outline-secondary select  "
            >
              Tennis
            </button>
          </div>
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button type="button" className="btn btn-outline-secondary select ">
              Cricket
            </button>
          </div>
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              className="btn btn-outline-secondary select  "
            >
              Basketball
            </button>
          </div>
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              className="btn btn-outline-secondary select  "
            >
              Billiard
            </button>
          </div>
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Second group"
          >
            <button type="button" className="btn btn-outline-secondary select ">
              Squash
            </button>
          </div>
        </section>

        <div className="card  book">
          <div className="card-body">
            <div className="clearfix">
              <div className="float-end dots">
                <span>
                  <img
                    src="../images/tournament/soccer-players-action-professional-stadium 2.png"
                    className="book-img"
                  ></img>
                </span>
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4629 19.5441C12.4629 18.9445 12.9701 18.4583 13.5959 18.4583C14.2216 18.4583 14.7289 18.9445 14.7289 19.5441C14.7289 20.1438 14.2216 20.6299 13.5959 20.6299C12.9701 20.6299 12.4629 20.1438 12.4629 19.5441Z"
                    fill="black"
                  />
                  <path
                    d="M12.4629 13.0294C12.4629 12.4297 12.9701 11.9436 13.5959 11.9436C14.2216 11.9436 14.7289 12.4297 14.7289 13.0294C14.7289 13.6291 14.2216 14.1152 13.5959 14.1152C12.9701 14.1152 12.4629 13.6291 12.4629 13.0294Z"
                    fill="black"
                  />
                  <path
                    d="M12.4629 6.5147C12.4629 5.91504 12.9701 5.42892 13.5959 5.42892C14.2216 5.42892 14.7289 5.91504 14.7289 6.5147C14.7289 7.11436 14.2216 7.60049 13.5959 7.60049C12.9701 7.60049 12.4629 7.11436 12.4629 6.5147Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div className="book-content">
              <div className="book-date">
                <h5 style={{ color: "#17A803", fontWeight: "700" }}>24</h5>
                <p>Feb</p>
              </div>
              <div className="book-details">
                <h5 style={{ fontWeight: "700" }}>Football League 2023</h5>
                <p style={{ color: "#959595" }}>9.00 AM to 12.00 PM</p>
                <p>Mohammed Al‑Hamad Stadium</p>
                <p>Hawally, Kuwait</p>
              </div>
            </div>
            <div class="route d-flex my-3">
              <img
                className="rounded-circle default-avatar member-overlap-item"
                style={{ objectFit: "cover" }}
                src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              ></img>
              <img
                className="rounded-circle default-avatar member-overlap-item"
                style={{ objectFit: "cover" }}
                src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              ></img>
              <img
                className="rounded-circle default-avatar member-overlap-item"
                style={{ objectFit: "cover" }}
                src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              ></img>
              <img
                className="rounded-circle default-avatar member-overlap-item"
                style={{ objectFit: "cover" }}
                src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              ></img>
              <span className="mx-4" style={{ color: "#959595" }}>
                +7 more participants
              </span>{" "}
            </div>
            <hr></hr>
            <div className="clearfix">
              <div className="book-profile float-start">
                <span>
                  <img
                    src="../images/tournament/c1.png"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  ></img>{" "}
                  <span className="mx-2">
                    <span style={{ color: "#17A803" }}>Hosted by</span> Muhammad
                    Alsalah
                  </span>
                </span>
              </div>
              <button type="button" className="Join-btn float-end">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="clearfix mt-3 ">
          <h5
            className="float-start"
            style={{ fontWeight: "700", fontSize: "19px", marginLeft: "-6px" }}
          >
            Playground
          </h5>
          <p className="float-end" style={{ color: "#959595" }}>
            View all
          </p>
        </div>
        <div className="playgrounds">
          <div class=" card playground-card">
            <img
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              style={{
                height: "190px",
                borderRadius: "20px 20px 0px 0px",
                objectFit: "cover",
              }}
              alt="..."
            />
            <div class="card-body play-body">
              <p>Mohammed Al‑Hamad Stadium </p>
              <div style={{ marginTop: "-5px" }}>
                <span>
                  <i class="bi bi-geo-alt" style={{ color: "green" }}></i>
                  <span className="mx-2">Hawally, Kuwait</span>
                </span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span>
                  <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                  <span className="mx-2">4.5</span>
                </span>
              </div>
            </div>
          </div>
          <div class=" card playground-card">
            <img
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              style={{
                height: "190px",
                borderRadius: "20px 20px 0px 0px",
                objectFit: "cover",
              }}
              alt="..."
            />
            <div class="card-body play-body">
              <p>Mohammed Al‑Hamad Stadium </p>
              <div style={{ marginTop: "-5px" }}>
                <span>
                  <i class="bi bi-geo-alt" style={{ color: "green" }}></i>
                  <span className="mx-2">Hawally, Kuwait</span>
                </span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span>
                  <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                  <span className="mx-2">4.5</span>
                </span>
              </div>
            </div>
          </div>
          <div class=" card playground-card">
            <img
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              style={{
                height: "190px",
                borderRadius: "20px 20px 0px 0px",
                objectFit: "cover",
              }}
              alt="..."
            />
            <div class="card-body play-body">
              <p>Mohammed Al-Hamad Stadium </p>
              <div style={{ marginTop: "-5px" }}>
                <span>
                  <i class="bi bi-geo-alt" style={{ color: "green" }}></i>
                  <span className="mx-2">Hawally, Kuwait</span>
                </span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span>
                  <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                  <span className="mx-2">4.5</span>
                </span>
              </div>
            </div>
          </div>
          <div class=" card playground-card">
            <img
              src="../images/tournament/soccer-players-action-professional-stadium 2.png"
              style={{
                height: "190px",
                borderRadius: "20px 20px 0px 0px",
                objectFit: "cover",
              }}
              alt="..."
            />
            <div class="card-body play-body">
              <p>Mohammed Al Hamad Stadium </p>
              <div style={{ marginTop: "-5px" }}>
                <span>
                  <i class="bi bi-geo-alt" style={{ color: "green" }}></i>
                  <span className="mx-2">Hawally, Kuwait</span>
                </span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span>
                  <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                  <span className="mx-2">4.5</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <h5 style={{ fontWeight: "700" }} className="my-3">
          Doob Map
        </h5>
        <section id="tabs">
          <nav>
            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
              <a
                class="nav-item nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Fields
              </a>
              <a
                class="nav-item nav-link "
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Game
              </a>
            </div>
          </nav>
          <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            ></div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            ></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PlayGroundPage;
