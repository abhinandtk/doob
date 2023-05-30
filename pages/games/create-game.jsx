import "bootstrap-icons/font/bootstrap-icons.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import CreateGameForm from "@/components/games/CreateGameForm";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import PlayGroudSidePages from "../play-ground/page/PlayGroudSidePages";

function CreateGamePage() {
  return (
    <div>
      <MainHeader title='Doob' />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <div className="col ">
          <div className="card my-5 " style={{ border: "0px" }}>
            <div className="card-body p-5 ">
              <h5 style={{ fontWeight: "700" }}>Create a Game</h5>
              <CreateGameForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGamePage;
