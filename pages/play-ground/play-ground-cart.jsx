import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import GroundFieldAddress from "@/components/playGround/GroundFieldAddress";
import GroundCartItems from "@/components/playGround/GroundCartItems";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import MobileFooter from "@/components/shared/MobileFooter";

function PlayGroundCartPage() {
  const [cartFieldData, setCartFieldData] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    Axios.get(apis.playCart, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setCartData(res.data.data);
    });
  },[]);

  return (
    <div>
      <MainHeader doob="title" />
      <MobileHeader />
      <MainSidebarFixed />
        <div className="tour-container">
          <h5 className=" my-4" style={{ fontWeight: "600" }}>
            My Cart
          </h5>
          <div className="row">
            <GroundFieldAddress address={cartData} />
            <GroundCartItems data={cartData}/>
          </div>
        </div>
        <MobileFooter />
    </div>
  );
}

export default PlayGroundCartPage;
