import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  CardImg,
  Card,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import Link from "next/link";
import PlayGroundSideBar from "@/components/playGround/PlayGroundSideBar";

function GroundReportPage() {
  return (
    <div>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />

      <div className="tour-container">
        <div className="bottoms">
          <PlayGroundSideBar currentPage='report' />

          <div class="play-topics  ">
            <div className="bottoms">
              <h6
                className=" ms-4"
                style={{ color: "#17a803", fontWeight: "700" }}
              >
                Report
              </h6>

              <div className="my-4 mx-4 ">
                <div className="basic">
                  <Link
                    href="/play-ground/report/booking-report"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6>
                      Booking Report{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/play-ground/report/playground-report"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6 className="my-4">
                      Playground-Bookings Report
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/play-ground/report/game-report"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6>
                      Game-Bookings Report{" "}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                  <Link
                    href="/play-ground/report/customer-booking-report"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h6 className="my-4">
                      Customer-Bookings Report
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-caret-right-fill arrow-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </span>
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default GroundReportPage;
