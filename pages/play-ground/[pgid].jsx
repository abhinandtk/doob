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
import SelectGround from "@/components/playGround/SelectGround";
import AmenitiesList from "@/components/playGround/AmenitiesList";
import PlayGroundTopDetails from "./PlayGroundTopDetails";
import { Fragment } from "react";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileHeader from "@/components/MobileHeader";

function PlayGroundDetailPage() {
  //   useEffect(() => {
  //     Axios.post(
  //       apis.stadiumDetailView,
  //       {
  //         stadium_id: date,
  //       },
  //       {
  //         headers: {
  //           'Authorization': `Token ${constants.token_id}`,
  //         }
  //       }
  //     ).then((res)=>{
  //         console.log('trrtrtrtop879',res)
  //     })
  //   })

  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MainSidebarFixed />
      <MobileHeader />
      <div className="tour-container">
        <form className="nosubmit ">
          <span>
            <input className="nosubmit1" type="search" placeholder="Search" />
            <img
              src="../images/tournament/Fil-icon.png"
              className="filters-icon"
            ></img>
          </span>
        </form>
        <PlayGroundTopDetails />
        <AmenitiesList />
        <SelectGround />
      </div>
    </Fragment>
  );
}

export default PlayGroundDetailPage;
