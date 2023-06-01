import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import GameDetailFullWidth from "@/components/games/GameDetailFullWidth";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";

function HomePage() {
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="tour-container">
        <div className="card Game-detail">
          <div className="card-body p-4">
            <GameDetailFullWidth />
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default HomePage;
