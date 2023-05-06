import "bootstrap-icons/font/bootstrap-icons.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import CreateGameForm from "@/components/games/CreateGameForm";

function CreateGamePage() {
  return (
    <div>
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
